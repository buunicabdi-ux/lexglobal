import React from 'react';
import {
  BookmarkCheck,
  Clock,
  ArrowRight,
  Trash2,
  Scale,
  BookOpen,
  Database,
  ExternalLink
} from 'lucide-react';
import { Bookmark, ResearchQuery } from '../types/legal';

interface HistoryAndBookmarksProps {
  bookmarks: Bookmark[];
  history: ResearchQuery[];
  onSelectQuery: (queryId: string) => void;
  onRemoveBookmark: (bookmark: Bookmark) => void;
  onSelectTab: (tab: 'research' | 'cases' | 'treaties' | 'sources') => void;
}

export const HistoryAndBookmarks: React.FC<HistoryAndBookmarksProps> = ({
  bookmarks,
  history,
  onSelectQuery,
  onRemoveBookmark,
  onSelectTab
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookmarkCheck className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-serif-heading text-slate-100">
            Research History & Saved Legal Items
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-light">
          Your saved jurisprudence, treaty articles, authoritative sources, and past research inquiries.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Bookmarks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-amber-400" />
              Saved Bookmarks ({bookmarks.length})
            </h3>
            <span className="text-xs text-slate-500 font-mono">Pinned</span>
          </div>

          <div className="space-y-2.5">
            {bookmarks.map((bm) => (
              <div
                key={bm.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between gap-3 shadow hover:border-slate-700 transition"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-amber-400 border border-slate-800 uppercase">
                      {bm.targetType}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(bm.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-200">
                    {bm.title}
                  </h4>
                  {bm.subtitle && (
                    <p className="text-xs text-slate-400 line-clamp-1 font-light">
                      {bm.subtitle}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => onRemoveBookmark(bm)}
                  className="p-2 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-950 transition"
                  title="Remove bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {bookmarks.length === 0 && (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-xl text-slate-500 text-xs">
                No bookmarked items yet. Click the "Bookmark" button during legal research to save items here.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Research Query History */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              Recent Research Queries ({history.length})
            </h3>
            <span className="text-xs text-slate-500 font-mono">Log</span>
          </div>

          <div className="space-y-2.5">
            {history.map((q) => (
              <div
                key={q.id}
                onClick={() => onSelectQuery(q.id)}
                className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-4 cursor-pointer group shadow transition flex items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {q.analysis?.subDomain || 'International Law'}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(q.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">
                    "{q.question}"
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 font-light">
                    Issue: {q.analysis?.legalIssue}
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 group-hover:text-indigo-400 transition" />
              </div>
            ))}

            {history.length === 0 && (
              <div className="p-8 text-center bg-slate-900/40 border border-slate-800/80 rounded-xl text-slate-500 text-xs">
                No past research queries in this session.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
