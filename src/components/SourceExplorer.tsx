import React, { useState } from 'react';
import {
  Database,
  Search,
  ExternalLink,
  ShieldCheck,
  Building,
  Filter,
  Globe
} from 'lucide-react';
import { Source } from '../types/legal';

interface SourceExplorerProps {
  sources: Source[];
}

export const SourceExplorer: React.FC<SourceExplorerProps> = ({ sources }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState<string>('all');

  const institutions = ['all', ...Array.from(new Set(sources.map((s) => s.institution)))];

  const filteredSources = sources.filter((s) => {
    const matchesInst = selectedInstitution === 'all' || s.institution === selectedInstitution;
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      s.title.toLowerCase().includes(q) ||
      s.institution.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.sourceType.toLowerCase().includes(q);
    return matchesInst && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" />
          <h2 className="text-2xl font-serif-heading text-slate-100">
            Authoritative Sources Directory
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-light">
          Verified international judicial bodies, treaty deposits, and official legal registries.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verified legal repositories..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-lg text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            Institution:
          </span>
          <select
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {institutions.map((inst, idx) => (
              <option key={idx} value={inst}>
                {inst === 'all' ? 'All Institutions' : inst}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source) => (
          <div
            key={source.id}
            className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 rounded-xl p-5 shadow-lg space-y-4 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {source.sourceType}
                </span>
                {source.verified ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Official Source
                  </span>
                ) : (
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    Structured Reference
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-semibold text-slate-100">
                  {source.title}
                </h3>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                  <Building className="w-3.5 h-3.5 text-slate-500" />
                  <span>{source.institution}</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Jurisdiction: <span className="text-slate-300">{source.jurisdiction}</span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-light">
                {source.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                Domain: {source.legalDomain}
              </span>
              <a
                href={source.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-amber-400 hover:text-amber-300 hover:border-amber-500/30 transition text-xs font-medium"
              >
                <span>Access Repository</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
