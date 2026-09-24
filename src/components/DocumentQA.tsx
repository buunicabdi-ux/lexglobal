import React, { useState } from 'react';
import {
  FileText,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { UploadedDoc } from '../types/legal';

interface DocumentQAProps {
  documents: UploadedDoc[];
  onUploadDocument: (name: string, content: string) => Promise<void>;
  onAskDocQuestion: (documentId: string, question: string) => Promise<{ answer: string; supportingPassage: string }>;
}

export const DocumentQA: React.FC<DocumentQAProps> = ({
  documents,
  onUploadDocument,
  onAskDocQuestion
}) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const [question, setQuestion] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [currentQA, setCurrentQA] = useState<{
    answer: string;
    supportingPassage: string;
    question: string;
  } | null>(null);

  // Upload modal / text paste states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadContent, setUploadContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const selectedDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc || !question.trim() || isAsking) return;

    setIsAsking(true);
    try {
      const res = await onAskDocQuestion(selectedDoc.id, question.trim());
      setCurrentQA({
        question: question.trim(),
        answer: res.answer,
        supportingPassage: res.supportingPassage
      });
      setQuestion('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsAsking(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim() || !uploadContent.trim()) return;

    setIsUploading(true);
    try {
      await onUploadDocument(uploadTitle.trim(), uploadContent.trim());
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadContent('');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadTitle(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setUploadContent(text || '');
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <h2 className="text-2xl font-serif-heading text-slate-100">
              Grounded Document Q&A
            </h2>
          </div>
          <p className="text-sm text-slate-400 font-light mt-1">
            Upload treaty texts, arbitration briefs, or judgments. Answers are grounded exclusively within the uploaded document.
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition shadow-lg shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Legal Document</span>
        </button>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Documents Selector & Document Inspector */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
              Active Legal Documents ({documents.length})
            </span>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {documents.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDocId(doc.id);
                    setCurrentQA(null);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                    selectedDocId === doc.id
                      ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold truncate">{doc.name}</span>
                    <span className="text-[10px] font-mono text-slate-500 shrink-0">
                      {(doc.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-1 font-light">
                    {doc.summary}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Document Content Preview */}
          {selectedDoc && (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs font-mono text-slate-400">
                  Extracted Document Text
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {selectedDoc.content.split(/\s+/).length} words
                </span>
              </div>
              <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 text-slate-300 font-mono text-[11px] leading-relaxed max-h-72 overflow-y-auto whitespace-pre-wrap selection:bg-purple-800">
                {selectedDoc.content}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Q&A Engine */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400">
                Strict Grounded Q&A
              </span>
              <h3 className="text-lg font-serif-heading text-slate-100">
                Ask a Question About: {selectedDoc?.name || 'Selected Document'}
              </h3>
              <p className="text-xs text-slate-400">
                The model only answers if the exact answer is contained in the text above. If absent, it will explicitly decline.
              </p>
            </div>

            <form onSubmit={handleAsk} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="e.g. What does Article 15 provide regarding median line? Or, What were the three stages in Black Sea?"
                  disabled={isAsking || !selectedDoc}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Strict anti-hallucination guard active</span>
                </div>
                <button
                  type="submit"
                  disabled={isAsking || !question.trim() || !selectedDoc}
                  className="px-5 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 text-white text-xs font-medium transition shadow flex items-center gap-2"
                >
                  {isAsking ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Checking Text...</span>
                    </>
                  ) : (
                    <>
                      <span>Inspect Document</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Answer Display */}
            {currentQA && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-4 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase text-slate-500">
                    Query:
                  </span>
                  <div className="text-xs font-semibold text-slate-200">
                    "{currentQA.question}"
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-[11px] font-mono uppercase text-purple-400 block font-semibold">
                    Document Grounded Result:
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                    {currentQA.answer}
                  </p>

                  {/* Supporting Passage Highlight */}
                  {currentQA.supportingPassage && (
                    <div className="mt-2 pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 flex items-center gap-1 mb-1">
                        <FileCheck className="w-3.5 h-3.5" />
                        Exact Supporting Passage in Document:
                      </span>
                      <div className="bg-slate-900/90 p-2.5 rounded border border-emerald-500/20 text-slate-300 font-serif italic text-xs leading-relaxed">
                        "{currentQA.supportingPassage}"
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-serif-heading text-slate-100">
              Upload Legal Document or Brief
            </h3>
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Upload file (.txt, .md):
                </label>
                <input
                  type="file"
                  accept=".txt,.md,.text"
                  onChange={handleFileUpload}
                  className="w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-500 cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Document Title:
                </label>
                <input
                  type="text"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. ICJ_Memorial_Excerpt_Somalia_Kenya.txt"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">
                  Document Content (or paste legal text):
                </label>
                <textarea
                  value={uploadContent}
                  onChange={(e) => setUploadContent(e.target.value)}
                  placeholder="Paste treaty provisions, memorial submissions, or case judgments here..."
                  rows={8}
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !uploadTitle.trim() || !uploadContent.trim()}
                  className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition"
                >
                  {isUploading ? 'Saving...' : 'Add to Knowledge Base'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
