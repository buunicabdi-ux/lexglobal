/**
 * LEXGLOBAL Gemini AI Service
 * Handles server-side generation with model failover and resilient error handling.
 */

import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build'
    }
  }
});

// Supported models for basic/complex text tasks per @google/genai guidelines
const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash'
];

// Track temporarily throttled/unavailable models with cooldown
const modelCoolDowns = new Map<string, number>();
const COOL_DOWN_MS = 60 * 1000; // 60 seconds cooldown for 503/429

function isModelAvailable(model: string): boolean {
  const coolDownUntil = modelCoolDowns.get(model);
  if (!coolDownUntil) return true;
  if (Date.now() > coolDownUntil) {
    modelCoolDowns.delete(model);
    return true;
  }
  return false;
}

function markModelUnavailable(model: string, durationMs: number = COOL_DOWN_MS) {
  modelCoolDowns.set(model, Date.now() + durationMs);
}

/**
 * Clean potential markdown backticks from JSON string
 */
function extractJsonString(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith('```')) {
    const firstNewline = cleaned.indexOf('\n');
    const lastBackticks = cleaned.lastIndexOf('```');
    if (firstNewline !== -1 && lastBackticks > firstNewline) {
      cleaned = cleaned.substring(firstNewline + 1, lastBackticks).trim();
    }
  }
  return cleaned;
}

/**
 * Generate JSON response using Gemini with automatic failover between valid models.
 * Returns null if all attempts fail or if API key is absent, allowing deterministic fallback.
 */
export async function generateContentJson<T = any>(
  prompt: string,
  preferredModel: string = 'gemini-3.1-flash-lite'
): Promise<T | null> {
  if (!apiKey) {
    return null;
  }

  // Order candidate models starting with preferred
  const modelsToTry = [
    preferredModel,
    ...CANDIDATE_MODELS.filter((m) => m !== preferredModel)
  ];

  for (const model of modelsToTry) {
    if (!isModelAvailable(model)) {
      continue;
    }

    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text;
      if (!text) continue;

      const parsed = JSON.parse(extractJsonString(text)) as T;
      return parsed;
    } catch (err: any) {
      const errorMsg = String(err?.message || err);
      const isCapacityOrThrottling =
        errorMsg.includes('503') ||
        errorMsg.includes('UNAVAILABLE') ||
        errorMsg.includes('429') ||
        errorMsg.includes('RESOURCE_EXHAUSTED') ||
        errorMsg.includes('high demand');

      if (isCapacityOrThrottling) {
        // Mark model on temporary cool-down so alternate model handles immediate queries
        markModelUnavailable(model);
        console.info(`[LEXGLOBAL AI Service] Model ${model} currently under high demand. Swapping to alternate model.`);
      } else {
        console.info(`[LEXGLOBAL AI Service] Generation issue with ${model}: ${errorMsg.slice(0, 120)}`);
      }
    }
  }

  return null;
}
