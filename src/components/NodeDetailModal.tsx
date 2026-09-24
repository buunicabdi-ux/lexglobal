import React from 'react';
import {
  X,
  ExternalLink,
  ShieldCheck,
  HelpCircle,
  AlertCircle,
  FileText,
  Bookmark,
  Scale,
  Building,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { SourceChainNode } from '../types/legal';

interface NodeDetailModalProps {
  node: SourceChainNode | null;
  onClose: () => void;
}

export const NodeDetailModal: React.FC<NodeDetailModalProps> = ({ node, onClose }) => {
  if (!node) return null;

  const getIcon = () => {
    switch (node.level) {
      case 'question': return HelpCircle;
      case 'issue': return AlertCircle;
      case 'instrument': return FileText;
      case 'provision': return Bookmark;
      case 'case': return Scale;
      case 'source': return Building;
      default: return ShieldCheck;
    }
  };

  const Icon = getIcon();

  const institution = node.institution || (
    node.referenceType === 'case'
      ? 'International Court of Justice / ITLOS'
      : node.referenceType === 'treaty' || node.referenceType === 'provision'
      ? 'United Nations (DOALOS)'
      : 'Official International Law Registry'
  );

  const documentType = node.documentType || (
    node.referenceType === 'case'
      ? 'Judicial Precedent & Judgment Record'
      : node.referenceType === 'provision'
      ? 'Codified Treaty Article'
      : node.referenceType === 'treaty'
      ? 'Multilateral Convention'
      : 'Authoritative Legal Authority'
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Provenance Badge */}
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-xs text-indigo-400">
            <Icon className="w-4 h-4" />
          </span>
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">
              Source Provenance Detail • {node.label}
            </span>
          </div>
        </div>

        {/* Source Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-serif-heading font-medium text-slate-100">
            {node.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            {node.detail}
          </p>
        </div>

        {/* Metadata Grid: Institution & Document Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Authoritative Institution
            </span>
            <span className="text-slate-200 font-medium flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span className="truncate">{institution}</span>
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
              Document Type
            </span>
            <span className="text-slate-200 font-medium flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{documentType}</span>
            </span>
          </div>
        </div>

        {/* Verification Status */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Verification Status:</span>
          {node.available ? (
            <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              Verified Official Authority in Knowledge Base
            </span>
          ) : (
            <span className="text-red-400 flex items-center gap-1.5 font-semibold">
              <AlertTriangle className="w-4 h-4" />
              Not Available in Current Knowledge Base
            </span>
          )}
        </div>

        {/* Supporting Passage (if available) */}
        {node.supportingPassage && (
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
              Authentic Supporting Passage
            </span>
            <div className="p-3.5 rounded-lg bg-slate-950/90 border border-teal-500/20 text-slate-300 font-serif italic text-xs leading-relaxed max-h-48 overflow-y-auto">
              "{node.supportingPassage}"
            </div>
          </div>
        )}

        {/* Why it Matters (Significance) */}
        {node.whyItMatters && (
          <div className="space-y-1.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Why It Matters (Legal Significance)
            </span>
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 leading-relaxed">
              {node.whyItMatters}
            </div>
          </div>
        )}

        {/* Action Buttons & Official Portal Link */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
          {node.url ? (
            <a
              href={node.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition shadow-md shadow-indigo-900/30"
            >
              <span>Access Official Registry Record</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-slate-500 italic">No external URL required for this node</span>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-slate-700 text-xs text-slate-300 hover:bg-slate-800 transition text-center"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
