import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Calendar,
  Building
} from 'lucide-react';
import { Treaty, TreatyProvision } from '../types/legal';

interface TreatyExplorerProps {
  treaties: Treaty[];
}

export const TreatyExplorer: React.FC<TreatyExplorerProps> = ({ treaties }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArticle, setExpandedArticle] = useState<string | null>('unclos-art-15');

  const unclos = treaties[0];
  const provisions = unclos?.provisions || [];

  const filteredProvisions = provisions.filter((p) => {
    const q = searchTerm.toLowerCase();
    return (
      p.articleNumber.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q) ||
      p.text.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-400" />
          <h2 className="text-2xl font-serif-heading text-slate-100">
            Multilateral Treaty Explorer
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-light">
          Official statutory treaty text codified under the United Nations Convention on the Law of the Sea (UNCLOS).
        </p>
      </div>

      {/* Treaty Overview Card */}
      {unclos && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sm:p-6 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {unclos.shortName}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Multilateral Convention
                </span>
              </div>
              <h3 className="text-xl font-serif-heading text-slate-100 mt-1">
                {unclos.title}
              </h3>
            </div>
            <a
              href={unclos.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition shadow"
            >
              <span>Authentic Treaty Text (UN)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 font-mono block">Institution</span>
              <span className="text-slate-200 font-medium">{unclos.institution}</span>
            </div>
            <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 font-mono block">Adoption Date</span>
              <span className="text-slate-200 font-medium">{unclos.adoptionDate}</span>
            </div>
            <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 font-mono block">Entry into Force</span>
              <span className="text-slate-200 font-medium">{unclos.entryIntoForce}</span>
            </div>
            <div className="p-3 rounded bg-slate-950/60 border border-slate-800">
              <span className="text-slate-500 font-mono block">Key Status</span>
              <span className="text-slate-200 font-medium">168+ States Parties</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {unclos.summary}
          </p>
        </div>
      )}

      {/* Search Input for Provisions */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter provisions by article (e.g. Article 15, Article 74, Article 83, EEZ)..."
          className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Provisions List */}
      <div className="space-y-3">
        {filteredProvisions.map((provision) => {
          const isExpanded = expandedArticle === provision.id;

          return (
            <div
              key={provision.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition"
            >
              <div
                onClick={() => setExpandedArticle(isExpanded ? null : provision.id)}
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-850 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {provision.articleNumber}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-100">
                      {provision.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {provision.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={provision.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded text-slate-400 hover:text-emerald-300 hover:bg-slate-800 transition"
                    title="View official UN Part on DOALOS"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-slate-950/40 space-y-3 text-xs">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                      Authentic Treaty Provision Text:
                    </span>
                    <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-serif leading-relaxed italic text-xs sm:text-sm">
                      "{provision.text}"
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-slate-500 block mb-1">
                      Legal Commentary & Operational Scope:
                    </span>
                    <p className="text-slate-300 leading-relaxed font-light">
                      {provision.summary}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">
                      Source: United Nations Treaty Series
                    </span>
                    <a
                      href={provision.officialSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span>Direct DOALOS Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
