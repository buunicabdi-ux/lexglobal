import React from 'react';
import {
  Compass,
  Scale,
  BookOpen,
  FileText,
  BookmarkCheck,
  ShieldAlert,
  Info,
  Layers,
  Sparkles,
  Database
} from 'lucide-react';

export type ActiveTab = 'research' | 'cases' | 'treaties' | 'sources' | 'documents' | 'bookmarks' | 'admin';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAbout: () => void;
  stats?: {
    casesCount: number;
    treatiesCount: number;
    provisionsCount: number;
    sourcesCount: number;
  };
  currentUserRole: 'user' | 'admin';
  setCurrentUserRole: (role: 'user' | 'admin') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAbout,
  stats,
  currentUserRole,
  setCurrentUserRole
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Banner with Disclaimers & Official Corpus Metric */}
      <div className="hidden sm:flex items-center justify-between border-b border-slate-800/60 px-4 py-1.5 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Grounded Corpus
          </span>
          <span className="text-slate-300">
            {stats ? `${stats.casesCount} Judgments (ICJ/ITLOS) • ${stats.provisionsCount} UNCLOS Provisions` : 'Verified UNCLOS & ICJ Jurisprudence'}
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">Official Repositories: UN DOALOS, ICJ-CIJ, ITLOS</span>
          <button
            onClick={() => setCurrentUserRole(currentUserRole === 'admin' ? 'user' : 'admin')}
            className={`px-2 py-0.5 rounded transition border text-[11px] font-mono ${
              currentUserRole === 'admin'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Demonstration role only. Does not confer formal legal certification."
          >
            Role: {currentUserRole === 'admin' ? '🛡️ Admin Registrar' : '👤 Researcher (Demo Mode)'}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab('research')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-950/50 group-hover:border-indigo-400 transition-colors">
              <Compass className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-brand font-bold text-lg tracking-wider text-slate-100 group-hover:text-indigo-300 transition-colors">
                  LEXGLOBAL
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  RAG
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                Understand International Law. Trace Every Answer.
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('research')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'research'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Research
            </button>

            <button
              onClick={() => setActiveTab('cases')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'cases'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Scale className="w-4 h-4 text-sky-400" />
              Cases
            </button>

            <button
              onClick={() => setActiveTab('treaties')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'treaties'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-400" />
              Treaties (UNCLOS)
            </button>

            <button
              onClick={() => setActiveTab('sources')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'sources'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Database className="w-4 h-4 text-amber-400" />
              Sources
            </button>

            <button
              onClick={() => setActiveTab('documents')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'documents'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <FileText className="w-4 h-4 text-purple-400" />
              Document Q&A
            </button>

            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === 'bookmarks'
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookmarkCheck className="w-4 h-4 text-amber-300" />
              Bookmarks
            </button>

            {currentUserRole === 'admin' && (
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'admin'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-amber-400 hover:text-amber-200 hover:bg-slate-900/60'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Admin
              </button>
            )}
          </nav>

          {/* Right Action: About modal */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition"
              title="Methodology, anti-hallucination rules, and disclaimer"
            >
              <Info className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">About & Rules</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto py-2.5 gap-2 border-t border-slate-800/80 scrollbar-none">
          <button
            onClick={() => setActiveTab('research')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'research' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setActiveTab('cases')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'cases' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Cases
          </button>
          <button
            onClick={() => setActiveTab('treaties')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'treaties' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Treaties
          </button>
          <button
            onClick={() => setActiveTab('sources')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'sources' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Sources
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'documents' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Doc Q&A
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
              activeTab === 'bookmarks' ? 'bg-indigo-600 text-white' : 'text-slate-400 bg-slate-900'
            }`}
          >
            Saved
          </button>
          {currentUserRole === 'admin' && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1 rounded text-xs whitespace-nowrap font-medium ${
                activeTab === 'admin' ? 'bg-amber-600 text-white' : 'text-amber-400 bg-slate-900'
              }`}
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
