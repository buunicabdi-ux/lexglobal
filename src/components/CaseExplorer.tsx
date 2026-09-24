import React, { useState } from 'react';
import {
  Scale,
  Search,
  ExternalLink,
  ChevronRight,
  Filter,
  ShieldCheck,
  Calendar,
  Layers,
  X
} from 'lucide-react';
import { Case } from '../types/legal';

interface CaseExplorerProps {
  cases: Case[];
  onBookmarkCase?: (caseItem: Case) => void;
}

export const CaseExplorer: React.FC<CaseExplorerProps> = ({ cases, onBookmarkCase }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourt, setSelectedCourt] = useState<'all' | 'ICJ' | 'ITLOS'>('all');
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const filteredCases = cases.filter((c) => {
    const matchesCourt = selectedCourt === 'all' || c.court === selectedCourt;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.title.toLowerCase().includes(q) ||
      c.parties.toLowerCase().includes(q) ||
      c.legalIssue.toLowerCase().includes(q) ||
      c.principles.some((p) => p.toLowerCase().includes(q));
    return matchesCourt && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-400" />
          <h2 className="text-2xl font-serif-heading text-slate-100">
            International Jurisprudence Explorer
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-light">
          Authoritative decisions, judgments, and awards delivered by the International Court of Justice (ICJ)
          and the International Tribunal for the Law of the Sea (ITLOS).
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search case, party (e.g. Somalia, Romania, Ghana), or principle..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            Court:
          </span>
          <div className="flex rounded-lg bg-slate-950 border border-slate-800 p-0.5 text-xs">
            <button
              onClick={() => setSelectedCourt('all')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                selectedCourt === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Courts
            </button>
            <button
              onClick={() => setSelectedCourt('ICJ')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                selectedCourt === 'ICJ'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ICJ (The Hague)
            </button>
            <button
              onClick={() => setSelectedCourt('ITLOS')}
              className={`px-3 py-1 rounded-md font-medium transition ${
                selectedCourt === 'ITLOS'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ITLOS (Hamburg)
            </button>
          </div>
        </div>
      </div>

      {/* Case Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCases.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedCase(c)}
            className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-5 transition-all cursor-pointer group shadow-lg flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {c.court} • {c.date.substring(0, 4)}
                </span>
                <span className="text-[11px] font-mono text-slate-500">
                  {c.caseNumber}
                </span>
              </div>

              <h3 className="text-base font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-2">
                {c.title}
              </h3>

              <div className="text-xs text-slate-400 font-mono">
                <span className="text-slate-500">Parties: </span>
                <span className="text-slate-300">{c.parties}</span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
                {c.summary}
              </p>

              {/* Principles badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.principles.slice(0, 2).map((p, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 truncate max-w-[200px]"
                  >
                    {p}
                  </span>
                ))}
                {c.principles.length > 2 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 border border-slate-800">
                    +{c.principles.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-indigo-400 font-medium">
              <span>View full holdings & citations</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}

        {filteredCases.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 space-y-2">
            <p>No jurisprudence found matching "{searchTerm}".</p>
            <p className="text-xs">Try searching for "North Sea", "Black Sea", or "Somalia".</p>
          </div>
        )}
      </div>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  {selectedCase.court} Judgment
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {selectedCase.date} • {selectedCase.caseNumber}
                </span>
              </div>
              <h2 className="text-2xl font-serif-heading text-slate-100">
                {selectedCase.title}
              </h2>
              <div className="text-xs text-slate-400">
                Parties: <span className="text-slate-200 font-medium">{selectedCase.parties}</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Core Legal Issue
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 bg-slate-950 p-3.5 rounded-lg border border-slate-800 leading-relaxed">
                {selectedCase.legalIssue}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Executive Judicial Summary
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                {selectedCase.summary}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Binding Holdings & Rulings
              </h4>
              <ul className="space-y-2">
                {selectedCase.holdings.map((h, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg p-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Recognized Customary Principles
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedCase.principles.map((p, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-indigo-300 font-mono"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <a
                href={selectedCase.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-md"
              >
                <span>View Official Judgment on {selectedCase.court} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
