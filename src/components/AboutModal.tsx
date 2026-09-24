import React from 'react';
import {
  X,
  ShieldCheck,
  Scale,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  FileText
} from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            <h2 className="text-2xl font-serif-heading text-slate-100">
              About LEXGLOBAL & Research Methodology
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            Source-Grounded Retrieval Augmented Generation for Public International Law
          </p>
        </div>

        {/* Mission Statement */}
        <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <p>
            <strong className="text-white">LEXGLOBAL</strong> is an specialized legal research platform
            built to make international maritime law and dispute resolution transparent, traceable,
            and provable. Every answer is synthesized strictly against authenticated treaty instruments
            and landmark judicial rulings from the International Court of Justice (ICJ) and the
            International Tribunal for the Law of the Sea (ITLOS).
          </p>
        </div>

        {/* Evidence Status Standards */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-slate-200 uppercase font-mono tracking-wider">
            Evidence Status Transparency Standard
          </h3>
          <div className="grid grid-cols-1 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 space-y-1">
              <span className="font-semibold text-emerald-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                🟢 Strong Source Support
              </span>
              <p className="text-slate-300">
                Governed directly by 2+ verified treaty provisions (e.g. UNCLOS Arts 15, 74, 83) and 2+ established ICJ/ITLOS judgments with full citation provenance.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 space-y-1">
              <span className="font-semibold text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                🟡 Limited Source Support
              </span>
              <p className="text-slate-300">
                Addressed by general doctrines or secondary principles, but lacks direct binding treaty text or specific case precedents in the knowledge base.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-red-950/30 border border-red-500/30 space-y-1">
              <span className="font-semibold text-red-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                🔴 Insufficient Evidence
              </span>
              <p className="text-slate-300">
                Out-of-scope, culinary, entertainment, or fictional sovereign entities (such as Atlantis or Mu). The system strictly declines answering rather than hallucinating facts.
              </p>
            </div>
          </div>
        </div>

        {/* Strict Anti-Hallucination Rules */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            Strict Anti-Hallucination Safeguards
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span><strong>Zero Invented Authorities:</strong> No fabricated treaty articles, judicial quotes, or imaginary court cases.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span><strong>No Judicial Outcome Predictions:</strong> Does not predict case outcomes or declare which State is "right" in active sovereign disputes.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400">•</span>
              <span><strong>Explicit Refusal of Fiction:</strong> Questions involving fictional states or non-legal topics are rejected immediately with standard refusal notices.</span>
            </li>
          </ul>
        </div>

        {/* Legal Disclaimer */}
        <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold font-mono text-[11px] uppercase">
            <AlertTriangle className="w-4 h-4" />
            <span>Official Legal Disclaimer</span>
          </div>
          <p className="leading-relaxed text-slate-300 font-medium">
            LEXGLOBAL is an AI-powered legal research tool and is not a substitute for qualified legal advice.
          </p>
          <p className="leading-relaxed text-slate-400 text-[11px]">
            LEXGLOBAL does not provide formal legal representation, legal opinions, or counsel. It does not predict the outcomes of pending or future contentious litigation before the International Court of Justice or arbitral tribunals. For binding boundary determinations, sovereign treaties, or active disputes, consult licensed international law counsel and official United Nations treaty deposits.
          </p>
        </div>

        <div className="text-right pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
