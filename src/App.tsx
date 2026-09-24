/**
 * LEXGLOBAL — Public International Law Research Assistant
 * Root React Application
 */

import React, { useState, useEffect } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { ResearchWorkspace } from './components/ResearchWorkspace';
import { CaseExplorer } from './components/CaseExplorer';
import { TreatyExplorer } from './components/TreatyExplorer';
import { SourceExplorer } from './components/SourceExplorer';
import { DocumentQA } from './components/DocumentQA';
import { HistoryAndBookmarks } from './components/HistoryAndBookmarks';
import { AdminManager } from './components/AdminManager';
import { AboutModal } from './components/AboutModal';
import { NodeDetailModal } from './components/NodeDetailModal';

import {
  ResearchAnswer,
  Case,
  Treaty,
  Source,
  UploadedDoc,
  Bookmark,
  ResearchQuery,
  SourceChainNode
} from './types/legal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('research');
  const [currentUserRole, setCurrentUserRole] = useState<'user' | 'admin'>('user');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState<SourceChainNode | null>(null);

  // Core Data States
  const [stats, setStats] = useState({
    sourcesCount: 5,
    treatiesCount: 1,
    provisionsCount: 7,
    casesCount: 10,
    conceptsCount: 8,
    documentsCount: 1,
    verifiedSourcesCount: 5,
    verifiedCasesCount: 10
  });
  const [cases, setCases] = useState<Case[]>([]);
  const [treaties, setTreaties] = useState<Treaty[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [documents, setDocuments] = useState<UploadedDoc[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [history, setHistory] = useState<ResearchQuery[]>([]);

  // Active Research State
  const [answer, setAnswer] = useState<ResearchAnswer | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(0);

  // Fetch initial system state
  useEffect(() => {
    fetchStats();
    fetchCases();
    fetchTreaties();
    fetchSources();
    fetchDocuments();
    fetchBookmarks();
    fetchHistory();

    // Run initial search so the application opens directly with a rich grounded workspace
    handleSearch('What international legal rules are relevant to maritime boundary delimitation?');
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      if (data.success && data.stats) setStats(data.stats);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/cases');
      const data = await res.json();
      if (data.success && data.cases) setCases(data.cases);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTreaties = async () => {
    try {
      const res = await fetch('/api/treaties');
      const data = await res.json();
      if (data.success && data.treaties) setTreaties(data.treaties);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchSources = async () => {
    try {
      const res = await fetch('/api/sources');
      const data = await res.json();
      if (data.success && data.sources) setSources(data.sources);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      const data = await res.json();
      if (data.success && data.documents) setDocuments(data.documents);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchBookmarks = async () => {
    try {
      const res = await fetch('/api/bookmarks');
      const data = await res.json();
      if (data.success && data.bookmarks) setBookmarks(data.bookmarks);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/history');
      const data = await res.json();
      if (data.success && data.history) setHistory(data.history);
    } catch (e) {
      console.error(e);
    }
  };

  // Primary Legal Research Executor
  const handleSearch = async (questionText: string) => {
    setIsLoading(true);
    setPipelineStep(0);

    // Realistic pipeline progression across 7 distinct stages
    const interval = setInterval(() => {
      setPipelineStep((prev) => {
        if (prev < 6) return prev + 1;
        return prev;
      });
    }, 280);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: questionText })
      });
      const data = await res.json();
      if (data.success && data.answer) {
        setAnswer(data.answer);
        fetchHistory();
        fetchStats();
      }
    } catch (err) {
      console.error('Search request failed:', err);
    } finally {
      clearInterval(interval);
      setPipelineStep(6);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  // Toggle Bookmark for current research result
  const handleBookmarkAnswer = async (ans: ResearchAnswer) => {
    try {
      const res = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo',
          targetType: 'query',
          targetId: ans.queryId,
          title: `Research: "${ans.question}"`,
          subtitle: `${ans.analysis.subDomain} (${ans.citations.length} verified citations)`
        })
      });
      const data = await res.json();
      if (data.success) {
        fetchBookmarks();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectHistoryQuery = async (queryId: string) => {
    try {
      const res = await fetch(`/api/history/${queryId}`);
      const data = await res.json();
      if (data.success && data.answer) {
        setAnswer(data.answer);
        setActiveTab('research');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemoveBookmark = async (bm: Bookmark) => {
    try {
      await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'usr-demo',
          targetType: bm.targetType,
          targetId: bm.targetId,
          title: bm.title
        })
      });
      fetchBookmarks();
    } catch (e) {
      console.error(e);
    }
  };

  const handleUploadDocument = async (name: string, content: string) => {
    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, content })
      });
      const data = await res.json();
      if (data.success) {
        fetchDocuments();
        fetchStats();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAskDocQuestion = async (documentId: string, questionText: string) => {
    const res = await fetch('/api/documents/qa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentId, question: questionText })
    });
    const data = await res.json();
    return {
      answer: data.answer || 'The requested information was not found in the uploaded document.',
      supportingPassage: data.supportingPassage || ''
    };
  };

  const handleAddCase = async (caseData: Partial<Case>) => {
    const res = await fetch('/api/admin/case', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData)
    });
    const data = await res.json();
    if (data.success) {
      fetchCases();
      fetchStats();
    }
  };

  const handleAddSource = async (sourceData: Partial<Source>) => {
    const res = await fetch('/api/admin/source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sourceData)
    });
    const data = await res.json();
    if (data.success) {
      fetchSources();
      fetchStats();
    }
  };

  const isCurrentAnswerBookmarked = !!bookmarks.find(
    (b) => b.targetType === 'query' && b.targetId === answer?.queryId
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
        stats={stats}
        currentUserRole={currentUserRole}
        setCurrentUserRole={setCurrentUserRole}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'research' && (
          <ResearchWorkspace
            onSearch={handleSearch}
            isLoading={isLoading}
            pipelineStep={pipelineStep}
            answer={answer}
            onSelectNode={(node) => setSelectedNode(node)}
            onBookmark={handleBookmarkAnswer}
            isBookmarked={isCurrentAnswerBookmarked}
          />
        )}

        {activeTab === 'cases' && (
          <CaseExplorer cases={cases} />
        )}

        {activeTab === 'treaties' && (
          <TreatyExplorer treaties={treaties} />
        )}

        {activeTab === 'sources' && (
          <SourceExplorer sources={sources} />
        )}

        {activeTab === 'documents' && (
          <DocumentQA
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onAskDocQuestion={handleAskDocQuestion}
          />
        )}

        {activeTab === 'bookmarks' && (
          <HistoryAndBookmarks
            bookmarks={bookmarks}
            history={history}
            onSelectQuery={handleSelectHistoryQuery}
            onRemoveBookmark={handleRemoveBookmark}
            onSelectTab={setActiveTab}
          />
        )}

        {activeTab === 'admin' && (
          <AdminManager
            stats={stats}
            onAddSource={handleAddSource}
            onAddCase={handleAddCase}
            onAddProvision={async () => {}}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-brand font-bold text-slate-300">LEXGLOBAL</span>
            <span>•</span>
            <span>Grounded Public International Law Research</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="hover:text-indigo-400 transition"
            >
              Methodology & Anti-Hallucination
            </button>
            <a
              href="https://www.un.org/depts/los/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              UN DOALOS
            </a>
            <a
              href="https://www.icj-cij.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              ICJ Registry
            </a>
            <a
              href="https://www.itlos.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition"
            >
              ITLOS Registry
            </a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <NodeDetailModal
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
}
