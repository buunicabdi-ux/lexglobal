import React from 'react';
import {
  HelpCircle,
  AlertCircle,
  FileText,
  Bookmark,
  Scale,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building
} from 'lucide-react';
import { LegalSourceChain, SourceChainNode } from '../types/legal';

interface LegalSourceChainViewProps {
  chain: LegalSourceChain;
  onSelectNode: (node: SourceChainNode) => void;
}

export const LegalSourceChainView: React.FC<LegalSourceChainViewProps> = ({
  chain,
  onSelectNode
}) => {
  const nodes = [
    { ...chain.questionNode, step: 1, icon: HelpCircle, color: 'text-indigo-400', border: 'border-indigo-500/40', bg: 'bg-indigo-950/30' },
    { ...chain.issueNode, step: 2, icon: AlertCircle, color: 'text-sky-400', border: 'border-sky-500/40', bg: 'bg-sky-950/30' },
    { ...chain.instrumentNode, step: 3, icon: FileText, color: 'text-emerald-400', border: 'border-emerald-500/40', bg: 'bg-emerald-950/30' },
    { ...chain.provisionNode, step: 4, icon: Bookmark, color: 'text-teal-400', border: 'border-teal-500/40', bg: 'bg-teal-950/30' },
    { ...chain.caseNode, step: 5, icon: Scale, color: 'text-amber-400', border: 'border-amber-500/40', bg: 'bg-amber-950/30' },
    { ...chain.sourceNode, step: 6, icon: Building, color: 'text-purple-400', border: 'border-purple-500/40', bg: 'bg-purple-950/30' }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Legal Source Chain
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
              Signature Feature
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Deterministic provenance: from initial query to official institutional authority. Click any step to inspect.
          </p>
        </div>
      </div>

      {/* Chain Nodes Container - Grid/Flex on Desktop, Stack with Connectors on Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isAvailable = node.available;

          return (
            <div
              key={node.id || index}
              onClick={() => onSelectNode(node)}
              className={`relative group rounded-lg border p-3.5 transition-all cursor-pointer ${
                isAvailable
                  ? `${node.bg} ${node.border} hover:border-slate-500 hover:shadow-lg`
                  : 'bg-red-950/10 border-red-500/20 opacity-80'
              }`}
            >
              {/* Header inside node card */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-[10px] font-mono text-slate-300">
                    {node.step}
                  </span>
                  <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
                    {node.label}
                  </span>
                </div>
                {node.url && (
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-300 transition-colors" />
                )}
              </div>

              {/* Title */}
              <div className="flex items-start gap-2">
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isAvailable ? node.color : 'text-red-400'}`} />
                <h4 className="text-xs font-semibold text-slate-200 line-clamp-2 leading-relaxed">
                  {node.title}
                </h4>
              </div>

              {/* Detail snippet */}
              <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-normal">
                {node.detail}
              </p>

              {/* Footer hint */}
              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400">
                <span>{isAvailable ? 'Click to inspect node' : 'No link available'}</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
