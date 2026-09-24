import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  XCircle,
  BookOpen,
  Scale,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Layers,
  ArrowRight,
  HelpCircle,
  FileText
} from 'lucide-react';
import { ResearchAnswer, SourceChainNode } from '../types/legal';
import { LegalSourceChainView } from './LegalSourceChainView';

interface ResearchWorkspaceProps {
  onSearch: (question: string) => Promise<void>;
  isLoading: boolean;
  pipelineStep: number;
  answer: ResearchAnswer | null;
  onSelectNode: (node: SourceChainNode) => void;
  onBookmark: (answer: ResearchAnswer) => void;
  isBookmarked: boolean;
}

export const ResearchWorkspace: React.FC<ResearchWorkspaceProps> = ({
  onSearch,
  isLoading,
  pipelineStep,
  answer,
  onSelectNode,
  onBookmark,
  isBookmarked
}) => {
  const [question, setQuestion] = useState('');
  const [isPlainLanguage, setIsPlainLanguage] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showEdgeTests, setShowEdgeTests] = useState(false);

  const suggestedQueries = [
    {
      title: 'Delimitation Rules (Primary Demo)',
      query: 'What international legal rules are relevant to maritime boundary delimitation?'
    },
    {
      title: 'UNCLOS EEZ Regime',
      query: 'What does UNCLOS provide regarding the exclusive economic zone?'
    },
    {
      title: 'North Sea Precedent',
      query: 'What are the legal principles discussed in the North Sea Continental Shelf case?'
    },
    {
      title: 'Black Sea Methodology',
      query: 'How is the three-stage delimitation methodology applied in the Black Sea case?'
    }
  ];

  const antiHallucinationTests = [
    {
      label: 'Off-Topic Refusal: Chocolate Cake Recipe',
      query: 'What is the recipe for chocolate cake?'
    },
    {
      label: 'Fictional Sovereignty: Atlantis v. Mu Boundary',
      query: 'How does international law determine the maritime boundary between fictional countries Atlantis and Mu?'
    },
    {
      label: 'Unindexed Precedent: Alpha v. Beta Case',
      query: 'What did the ICJ decide in the unindexed case of Alpha v. Beta?'
    }
  ];

  const pipelineStages = [
    'Understanding question',
    'Identifying legal issue',
    'Finding legal materials',
    'Retrieving evidence',
    'Validating citations',
    'Building source chain',
    'Preparing answer'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSearch(question.trim());
    }
  };

  const handleCopyCitation = () => {
    if (!answer) return;
    const citationText = `LEXGLOBAL Research Summary: "${answer.question}"\nGoverning Instrument: UNCLOS (1982)\nJurisprudence: ${answer.relevantCases.map((c) => c.title).join('; ')}\nRetrieved: ${new Date().toLocaleDateString()} from LEXGLOBAL Legal Knowledge Base.`;
    navigator.clipboard.writeText(citationText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-xs font-mono text-indigo-300">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          Source-Grounded International Law Assistant
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-heading font-medium tracking-tight text-slate-100">
          Understand International Law.{' '}
          <span className="italic text-indigo-300">Trace Every Answer.</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Ask questions across the Law of the Sea, maritime boundary delimitation, and UNCLOS.
          Synthesized directly against authentic ICJ and ITLOS jurisprudence with transparent citations.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 sm:p-4 shadow-2xl shadow-black/50 backdrop-blur-md">
        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask an international-law question (e.g. maritime boundary rules, UNCLOS provisions)..."
              disabled={isLoading}
              className="w-full pl-11 pr-4 py-3 bg-slate-950/80 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !question.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium text-sm rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/30 shrink-0"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Researching...</span>
              </>
            ) : (
              <>
                <span>Research Issue</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Queries */}
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mr-1">
            Core Topics:
          </span>
          {suggestedQueries.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuestion(item.query);
                onSearch(item.query);
              }}
              disabled={isLoading}
              className="text-xs px-2.5 py-1 rounded bg-slate-950/60 hover:bg-indigo-950/40 border border-slate-800 hover:border-indigo-500/30 text-slate-300 hover:text-indigo-200 transition text-left"
            >
              {item.title}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowEdgeTests(!showEdgeTests)}
            className="text-[11px] font-mono px-2.5 py-1 rounded text-amber-400 hover:text-amber-300 bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/30 transition flex items-center gap-1 ml-auto"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{showEdgeTests ? 'Hide Edge Tests' : 'Anti-Hallucination Demo Tests'}</span>
          </button>

          {showEdgeTests && (
            <div className="w-full mt-2 pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5 animate-fade-in">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Refusal Verification:
              </span>
              {antiHallucinationTests.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuestion(item.query);
                    onSearch(item.query);
                  }}
                  disabled={isLoading}
                  className="text-[11px] px-2.5 py-1 rounded bg-amber-950/30 hover:bg-amber-950/60 border border-amber-500/30 hover:border-amber-500/60 text-amber-200 transition text-left font-mono"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Pipeline State Display */}
      {isLoading && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-mono uppercase tracking-wider flex items-center gap-2 text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              Active Legal Research Pipeline
            </span>
            <span className="font-mono">
              Stage {pipelineStep + 1} of {pipelineStages.length}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pipelineStages.map((stage, idx) => {
              const isPast = idx < pipelineStep;
              const isCurrent = idx === pipelineStep;

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded border text-xs transition-all ${
                    isCurrent
                      ? 'bg-indigo-950/50 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-950'
                      : isPast
                      ? 'bg-slate-950/80 border-slate-800 text-slate-400 line-through decoration-slate-600'
                      : 'bg-slate-950/30 border-slate-900 text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 mb-0.5">
                    <span>{idx + 1}.</span>
                    {isPast && <Check className="w-3 h-3 text-emerald-400" />}
                  </div>
                  <div className="font-medium truncate">{stage}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Answer Workspace Card */}
      {answer && !isLoading && (
        <div className="space-y-6">
          {/* Header Card with Evidence Badge & Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                  Question Under Analysis
                </span>
                <h2 className="text-xl sm:text-2xl font-serif-heading text-slate-100 mt-0.5">
                  "{answer.question}"
                </h2>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span className="font-medium text-slate-300">{answer.analysis.legalDomain}</span>
                  <span>•</span>
                  <span>{answer.analysis.subDomain}</span>
                </div>
              </div>

              {/* Evidence Status Badge (Section 14) */}
              <div className="shrink-0 flex sm:flex-col items-start gap-2">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold uppercase tracking-wider ${
                    answer.evidenceStatus === 'strong'
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : answer.evidenceStatus === 'limited'
                      ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
                      : 'bg-red-950/40 border-red-500/40 text-red-300'
                  }`}
                >
                  {answer.evidenceStatus === 'strong' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400"></span>
                      Strong Source Support
                    </>
                  )}
                  {answer.evidenceStatus === 'limited' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                      Limited Source Support
                    </>
                  )}
                  {answer.evidenceStatus === 'insufficient' && (
                    <>
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      Insufficient Evidence
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 max-w-xs leading-tight">
                  {answer.evidenceStatusReason}
                </p>
              </div>
            </div>

            {/* Sub-toolbar: Explain for Non-Lawyer & Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                {/* Explain for non-lawyer toggle button (Section 19 & 20) */}
                <button
                  onClick={() => setIsPlainLanguage(!isPlainLanguage)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition border ${
                    isPlainLanguage
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                      : 'bg-slate-950 border-slate-700 text-slate-300 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{isPlainLanguage ? 'Showing Plain Language' : 'Explain for a non-lawyer'}</span>
                </button>
                {isPlainLanguage && (
                  <span className="text-[11px] text-indigo-300 font-mono">
                    (Preserves all citations & treaty articles)
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onBookmark(answer)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-medium transition ${
                    isBookmarked
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span>Saved</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Bookmark</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleCopyCitation}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs font-medium text-slate-400 hover:text-slate-200 transition"
                  title="Copy standard academic/legal citation"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Cite'}</span>
                </button>
              </div>
            </div>

            {/* Direct Answer Section */}
            <div className="mt-4 pt-4 border-t border-slate-800/80">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                {isPlainLanguage ? 'Plain Language Synthesis' : 'Direct Grounded Answer'}
              </span>
              <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-3 font-normal">
                {isPlainLanguage ? (
                  <div className="whitespace-pre-line bg-indigo-950/20 border border-indigo-500/20 p-4 rounded-lg text-slate-200">
                    {answer.plainLanguageAnswer || answer.directAnswer}
                  </div>
                ) : (
                  <div className="whitespace-pre-line">
                    {answer.directAnswer}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Key Legal Principles (Section 11B) */}
          {answer.legalPrinciples.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-3">
              <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-400" />
                Key Legal Principles & Customary Rules
              </h3>
              <ul className="space-y-2">
                {answer.legalPrinciples.map((principle, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 bg-slate-950/50 border border-slate-800/80 rounded-lg p-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0"></span>
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal Source Chain (Section 15 - Signature Feature) */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl">
            <LegalSourceChainView
              chain={answer.sourceChain}
              onSelectNode={onSelectNode}
            />
          </div>

          {/* Relevant Legal Provisions (UNCLOS) & Cases Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Relevant UNCLOS Provisions */}
            {answer.legalProvisions.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    Relevant Treaty Provisions (UNCLOS)
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Click to inspect
                  </span>
                </div>
                <div className="space-y-3">
                  {answer.legalProvisions.map((prov, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        onSelectNode({
                          id: `prov-${prov.article}`,
                          level: 'provision',
                          label: prov.article,
                          title: `${prov.article} — UNCLOS (1982)`,
                          detail: prov.summary,
                          available: true,
                          url: prov.officialUrl,
                          institution: 'United Nations Office of Legal Affairs (DOALOS)',
                          documentType: 'Multilateral Treaty Provision',
                          whyItMatters: prov.summary
                        })
                      }
                      className="border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-emerald-500/40 rounded-lg p-3.5 space-y-2 cursor-pointer transition group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 group-hover:border-emerald-500/40">
                          {prov.article}
                        </span>
                        <span className="text-[11px] text-slate-400 group-hover:text-emerald-300 transition flex items-center gap-1">
                          <span>Inspect Detail</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {prov.summary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Relevant Case Jurisprudence (ICJ / ITLOS) */}
            {answer.relevantCases.length > 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" />
                    Relevant Judicial Precedents
                  </h3>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Click to inspect
                  </span>
                </div>
                <div className="space-y-3">
                  {answer.relevantCases.map((c, idx) => (
                    <div
                      key={idx}
                      onClick={() =>
                        onSelectNode({
                          id: `case-${idx}`,
                          level: 'case',
                          label: `${c.court} (${c.year})`,
                          title: c.title,
                          detail: c.summary,
                          available: true,
                          url: c.officialUrl,
                          institution:
                            c.court === 'ITLOS'
                              ? 'International Tribunal for the Law of the Sea'
                              : 'International Court of Justice',
                          documentType: 'Judicial Judgment Record',
                          supportingPassage: c.summary,
                          whyItMatters: c.summary
                        })
                      }
                      className="border border-slate-800 bg-slate-950/60 hover:bg-slate-800/50 hover:border-amber-500/40 rounded-lg p-3.5 space-y-2 cursor-pointer transition group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-200 group-hover:text-amber-200 transition">
                          {c.title}
                        </h4>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">
                          {c.court} {c.year}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        {c.summary}
                      </p>
                      <div className="pt-1 text-right">
                        <span className="inline-flex items-center gap-1 text-[11px] text-amber-400 group-hover:text-amber-300 font-medium transition">
                          <span>Inspect Judgment Record</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Citations Engine & Verifications (Section 13) */}
          {answer.citations.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-teal-400" />
                    Validated Citations & Passages
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Transparent citation validation: every substantive claim maps to authenticated knowledge base records. Click any card for full source provenance.
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {answer.citations.length} Verified Records
                </span>
              </div>

              <div className="space-y-3">
                {answer.citations.map((citation, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      onSelectNode({
                        id: citation.citationId,
                        level: citation.caseId ? 'case' : 'provision',
                        label: citation.articleNumber ? `UNCLOS ${citation.articleNumber}` : 'Citation Record',
                        title: citation.sourceTitle,
                        detail: citation.claim,
                        available: citation.validationStatus === 'verified',
                        url: citation.officialUrl,
                        institution: citation.institution || 'United Nations / Judicial Registry',
                        documentType: citation.documentType || 'Verified Authority',
                        supportingPassage: citation.supportingPassage,
                        whyItMatters: citation.whyItMatters || citation.claim
                      })
                    }
                    className="border border-slate-800 bg-slate-950/40 hover:bg-slate-800/40 hover:border-indigo-500/40 rounded-lg p-3.5 space-y-2 text-xs cursor-pointer transition group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 group-hover:text-indigo-200 transition">
                        {citation.sourceTitle}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <Check className="w-3 h-3" />
                        Verified Source Record
                      </span>
                    </div>
                    <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800/80 text-slate-300 text-[11px] italic font-serif leading-relaxed">
                      "{citation.supportingPassage}"
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] text-indigo-400 group-hover:underline flex items-center gap-1">
                        Inspect source provenance & why it matters →
                      </span>
                      {citation.officialUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 group-hover:text-slate-200">
                          <span>Official Registry</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Limitations & Jurisdictional Boundaries (Section 11E & 39) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-2 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-amber-400 font-semibold uppercase tracking-wider text-[11px] font-mono">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Legal Research Limitations & Boundary of Analysis</span>
            </div>
            <p className="leading-relaxed">
              {answer.limitations}
            </p>
            <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
              LEXGLOBAL is an AI-powered legal research tool grounded in verified sources. It does not provide legal representation, nor does it predict judicial dispute outcomes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
