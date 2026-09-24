/**
 * LEXGLOBAL Server Entry Point
 * Express API backend + Vite middleware dev integration on port 3000
 */

import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db';
import { executeResearch } from './server/researchEngine';
import { generateContentJson } from './server/geminiService';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// Body parsing with generous limit for legal text/documents
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';

// ==========================================
// API ROUTES
// ==========================================

// Health & System Statistics (Exact dynamic counts from database)
app.get('/api/stats', (req: Request, res: Response) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Primary Research Pipeline
app.post('/api/research', async (req: Request, res: Response) => {
  try {
    const { question } = req.body;
    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ success: false, error: 'Question is required' });
    }

    const answer = await executeResearch(question.trim());
    res.json({ success: true, answer });
  } catch (error) {
    console.error('Research error:', error);
    res.status(500).json({ success: false, error: 'Failed to process legal research query' });
  }
});

// Cases Explorer
app.get('/api/cases', (req: Request, res: Response) => {
  try {
    const court = req.query.court as string;
    const legalArea = req.query.legalArea as string;
    const query = req.query.q as string;

    const cases = db.getAllCases({ court, legalArea, query });
    res.json({ success: true, cases });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.get('/api/cases/:id', (req: Request, res: Response) => {
  try {
    const caseItem = db.getCaseById(req.params.id);
    if (!caseItem) {
      return res.status(404).json({ success: false, error: 'Case not found' });
    }
    res.json({ success: true, case: caseItem });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Treaties Explorer
app.get('/api/treaties', (req: Request, res: Response) => {
  try {
    const treaties = db.getAllTreaties();
    res.json({ success: true, treaties });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.get('/api/treaties/:id', (req: Request, res: Response) => {
  try {
    const treaty = db.getTreatyById(req.params.id);
    if (!treaty) {
      return res.status(404).json({ success: false, error: 'Treaty not found' });
    }
    res.json({ success: true, treaty });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Sources Explorer
app.get('/api/sources', (req: Request, res: Response) => {
  try {
    const institution = req.query.institution as string;
    const sourceType = req.query.type as string;
    const verified = req.query.verified === 'true' ? true : req.query.verified === 'false' ? false : undefined;

    const sources = db.getAllSources({ institution, sourceType, verified });
    res.json({ success: true, sources });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Legal Concepts Explorer
app.get('/api/concepts', (req: Request, res: Response) => {
  try {
    const concepts = db.getAllConcepts();
    res.json({ success: true, concepts });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Query History
app.get('/api/history', (req: Request, res: Response) => {
  try {
    const queries = db.getRecentQueries(20);
    res.json({ success: true, history: queries });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.get('/api/history/:queryId', (req: Request, res: Response) => {
  try {
    const answer = db.getAnswerByQueryId(req.params.queryId);
    if (!answer) {
      return res.status(404).json({ success: false, error: 'Research result not found' });
    }
    res.json({ success: true, answer });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Bookmarks
app.get('/api/bookmarks', (req: Request, res: Response) => {
  try {
    const userId = (req.query.userId as string) || 'usr-demo';
    const bookmarks = db.getBookmarks(userId);
    res.json({ success: true, bookmarks });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.post('/api/bookmarks', (req: Request, res: Response) => {
  try {
    const { userId = 'usr-demo', targetType, targetId, title, subtitle } = req.body;
    if (!targetType || !targetId || !title) {
      return res.status(400).json({ success: false, error: 'targetType, targetId, and title are required' });
    }
    const result = db.toggleBookmark(userId, targetType, targetId, title, subtitle);
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Document Q&A Section (Upload, Text Extraction & Grounded Q&A)
app.get('/api/documents', (req: Request, res: Response) => {
  try {
    const documents = db.getAllDocuments();
    res.json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.get('/api/documents/:id', (req: Request, res: Response) => {
  try {
    const doc = db.getDocumentById(req.params.id);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }
    res.json({ success: true, document: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.post('/api/documents/upload', (req: Request, res: Response) => {
  try {
    const { name, content, fileType = 'text/plain', summary } = req.body;
    if (!name || !content) {
      return res.status(400).json({ success: false, error: 'Document name and content are required' });
    }

    const doc = db.addDocument({
      name,
      content,
      fileType,
      size: Buffer.byteLength(content, 'utf8'),
      summary: summary || `Uploaded document containing ${content.split(/\s+/).length} words.`
    });

    res.json({ success: true, document: doc });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Document Q&A Endpoint: Grounded strictly in the uploaded document
app.post('/api/documents/qa', async (req: Request, res: Response) => {
  try {
    const { documentId, question } = req.body;
    if (!documentId || !question) {
      return res.status(400).json({ success: false, error: 'documentId and question are required' });
    }

    const doc = db.getDocumentById(documentId);
    if (!doc) {
      return res.status(404).json({ success: false, error: 'Document not found' });
    }

    let answerText = '';
    let supportingPassage = '';

    if (apiKey) {
      try {
        const prompt = `You are a strict international legal document analysis engine.
You are given an uploaded legal document and a user question.

MANDATORY RULES:
1. Ground your answer ONLY in the provided document text below.
2. If the document text does NOT explicitly provide information to answer the question, you MUST output verbatim:
"The requested information was not found in the uploaded document."
3. Do NOT make assumptions or use external knowledge outside the document.
4. Extract the exact supporting passage from the document that justifies the answer.

DOCUMENT NAME: "${doc.name}"
DOCUMENT TEXT:
"""
${doc.content}
"""

USER QUESTION: "${question}"

Provide a JSON response:
{
  "found": true | false,
  "answer": "Grounded answer or 'The requested information was not found in the uploaded document.'",
  "supportingPassage": "Exact excerpt from the document or empty string if not found"
}`;

        const parsed = await generateContentJson<{
          found?: boolean;
          answer?: string;
          supportingPassage?: string;
        }>(prompt, 'gemini-3.1-flash-lite');

        if (parsed) {
          answerText = parsed.answer || 'The requested information was not found in the uploaded document.';
          supportingPassage = parsed.supportingPassage || '';
        }
      } catch {
        // Fallback search below will handle it cleanly
      }
    }

    // Fallback search inside doc
    if (!answerText) {
      const lowerDoc = doc.content.toLowerCase();
      const lowerQ = question.toLowerCase();
      const qWords = lowerQ.split(/\s+/).filter((w: string) => w.length > 3);
      const matched = qWords.filter((w: string) => lowerDoc.includes(w));

      if (matched.length >= 2) {
        // Find matching paragraph
        const paragraphs = doc.content.split('\n\n');
        const bestPara = paragraphs.find((p) => matched.some((w: string) => p.toLowerCase().includes(w))) || paragraphs[0];
        answerText = `Based on the document "${doc.name}":\n${bestPara}`;
        supportingPassage = bestPara.substring(0, 300) + '...';
      } else {
        answerText = 'The requested information was not found in the uploaded document.';
        supportingPassage = '';
      }
    }

    db.addDocumentQA(doc.id, question, answerText, supportingPassage);

    res.json({
      success: true,
      answer: answerText,
      supportingPassage,
      documentName: doc.name
    });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// Admin Operations (Add/verify sources, add cases, add provisions)
app.post('/api/admin/source', (req: Request, res: Response) => {
  try {
    const { title, institution, sourceType, legalDomain, jurisdiction, description, officialUrl, verified, date } = req.body;
    if (!title || !institution || !officialUrl) {
      return res.status(400).json({ success: false, error: 'Title, institution, and officialUrl are required' });
    }
    const newSource = db.addSource({
      title,
      institution,
      sourceType: sourceType || 'Treaty',
      legalDomain: legalDomain || 'Public International Law',
      jurisdiction: jurisdiction || 'Universal',
      description: description || '',
      officialUrl,
      verified: verified !== false,
      date: date || new Date().toISOString().split('T')[0]
    });
    res.json({ success: true, source: newSource });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

app.post('/api/admin/case', (req: Request, res: Response) => {
  try {
    const { title, court, date, caseNumber, parties, legalArea, legalIssue, summary, holdings, principles, officialUrl, sourceId } = req.body;
    if (!title || !court || !parties) {
      return res.status(400).json({ success: false, error: 'Title, court, and parties are required' });
    }
    const newCase = db.addCase({
      title,
      court: court || 'ICJ',
      date: date || new Date().toISOString().split('T')[0],
      caseNumber: caseNumber || 'General List',
      parties,
      legalArea: legalArea || 'Maritime Boundary Delimitation',
      legalIssue: legalIssue || '',
      summary: summary || '',
      holdings: Array.isArray(holdings) ? holdings : [holdings || ''],
      principles: Array.isArray(principles) ? principles : [principles || ''],
      officialUrl: officialUrl || 'https://www.icj-cij.org',
      verified: true,
      sourceId: sourceId || 'src-icj-repository'
    });
    res.json({ success: true, case: newCase });
  } catch (error) {
    res.status(500).json({ success: false, error: String(error) });
  }
});

// ==========================================
// VITE INTEGRATION (DEV & PROD)
// ==========================================
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT
      },
      appType: 'spa'
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LEXGLOBAL Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
  process.exit(1);
});
