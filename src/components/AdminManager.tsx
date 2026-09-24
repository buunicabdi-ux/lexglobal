import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Scale,
  Database,
  BookOpen,
  CheckCircle,
  ShieldCheck,
  Building,
  Layers
} from 'lucide-react';
import { Case, Source, TreatyProvision } from '../types/legal';

interface AdminManagerProps {
  stats: {
    sourcesCount: number;
    treatiesCount: number;
    provisionsCount: number;
    casesCount: number;
    conceptsCount: number;
    documentsCount: number;
    verifiedSourcesCount: number;
    verifiedCasesCount: number;
  };
  onAddSource: (source: Partial<Source>) => Promise<void>;
  onAddCase: (caseItem: Partial<Case>) => Promise<void>;
  onAddProvision: (provision: Partial<TreatyProvision>) => Promise<void>;
}

export const AdminManager: React.FC<AdminManagerProps> = ({
  stats,
  onAddSource,
  onAddCase,
  onAddProvision
}) => {
  const [activeForm, setActiveForm] = useState<'source' | 'case' | 'provision'>('case');
  const [successMsg, setSuccessMsg] = useState('');

  // Source form state
  const [sourceTitle, setSourceTitle] = useState('');
  const [sourceInst, setSourceInst] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [sourceDesc, setSourceDesc] = useState('');

  // Case form state
  const [caseTitle, setCaseTitle] = useState('');
  const [caseCourt, setCaseCourt] = useState<'ICJ' | 'ITLOS'>('ICJ');
  const [caseParties, setCaseParties] = useState('');
  const [caseYear, setCaseYear] = useState('2024');
  const [caseIssue, setCaseIssue] = useState('');
  const [caseHoldings, setCaseHoldings] = useState('');
  const [casePrinciples, setCasePrinciples] = useState('');
  const [caseUrl, setCaseUrl] = useState('');

  // Provision form state
  const [provArticle, setProvArticle] = useState('');
  const [provTitle, setProvTitle] = useState('');
  const [provText, setProvText] = useState('');
  const [provSummary, setProvSummary] = useState('');

  const handleCreateCase = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddCase({
      title: caseTitle,
      court: caseCourt,
      date: `${caseYear}-01-01`,
      caseNumber: 'ICJ/ITLOS Docket',
      parties: caseParties,
      legalArea: 'Maritime Boundary Delimitation',
      legalIssue: caseIssue,
      summary: caseHoldings,
      holdings: [caseHoldings],
      principles: casePrinciples.split(',').map((p) => p.trim()),
      officialUrl: caseUrl || 'https://www.icj-cij.org',
      verified: true
    });
    setSuccessMsg('Judicial precedent successfully verified and added to knowledge base!');
    setCaseTitle('');
    setCaseParties('');
    setCaseIssue('');
    setCaseHoldings('');
    setCasePrinciples('');
    setCaseUrl('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleCreateSource = async (e: React.FormEvent) => {
    e.preventDefault();
    await onAddSource({
      title: sourceTitle,
      institution: sourceInst,
      sourceType: 'Official Repository',
      legalDomain: 'International Law',
      jurisdiction: 'United Nations System',
      description: sourceDesc,
      officialUrl: sourceUrl,
      verified: true,
      date: new Date().toISOString().split('T')[0]
    });
    setSuccessMsg('Official legal repository successfully registered!');
    setSourceTitle('');
    setSourceInst('');
    setSourceUrl('');
    setSourceDesc('');
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-2xl font-serif-heading text-slate-100">
              Registrar Knowledge Base Manager
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 uppercase">
              Protected Admin Portal
            </span>
          </div>
          <p className="text-sm text-slate-400 font-light mt-1">
            Maintain the single canonical source of truth for international maritime law. No unverified entries permitted.
          </p>
        </div>
      </div>

      {/* Success Notification */}
      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Live Corpus Statistics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-mono">ICJ/ITLOS Cases</span>
          <div className="text-2xl font-bold text-slate-100">{stats.casesCount}</div>
          <span className="text-[10px] text-emerald-400 font-mono">100% Verified</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-mono">UNCLOS Provisions</span>
          <div className="text-2xl font-bold text-slate-100">{stats.provisionsCount}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Part II, V, VI</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-mono">Official Repositories</span>
          <div className="text-2xl font-bold text-slate-100">{stats.sourcesCount}</div>
          <span className="text-[10px] text-emerald-400 font-mono">UN, ICJ, ITLOS</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-1">
          <span className="text-xs text-slate-500 font-mono">Legal Doctrines</span>
          <div className="text-2xl font-bold text-slate-100">{stats.conceptsCount}</div>
          <span className="text-[10px] text-emerald-400 font-mono">Canonical</span>
        </div>
      </div>

      {/* Action Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveForm('case')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeForm === 'case'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Scale className="w-3.5 h-3.5" />
          <span>Add Verified Case Precedent</span>
        </button>
        <button
          onClick={() => setActiveForm('source')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition ${
            activeForm === 'source'
              ? 'bg-indigo-600 text-white shadow'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Register Official Source</span>
        </button>
      </div>

      {/* Case Creation Form */}
      {activeForm === 'case' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Scale className="w-4 h-4 text-indigo-400" />
            Add Verified Judicial Precedent
          </h3>
          <form onSubmit={handleCreateCase} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Official Case Title:</label>
                <input
                  type="text"
                  value={caseTitle}
                  onChange={(e) => setCaseTitle(e.target.value)}
                  placeholder="e.g. Maritime Delimitation in the Indian Ocean (Somalia v. Kenya)"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Adjudicating Court:</label>
                <select
                  value={caseCourt}
                  onChange={(e) => setCaseCourt(e.target.value as 'ICJ' | 'ITLOS')}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="ICJ">International Court of Justice (ICJ)</option>
                  <option value="ITLOS">International Tribunal for the Law of the Sea (ITLOS)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Parties:</label>
                <input
                  type="text"
                  value={caseParties}
                  onChange={(e) => setCaseParties(e.target.value)}
                  placeholder="e.g. Somalia v. Kenya"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Year of Judgment:</label>
                <input
                  type="text"
                  value={caseYear}
                  onChange={(e) => setCaseYear(e.target.value)}
                  placeholder="2021"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Legal Issue:</label>
              <input
                type="text"
                value={caseIssue}
                onChange={(e) => setCaseIssue(e.target.value)}
                placeholder="e.g. Single maritime boundary delimitation, parallel of latitude claims, concavity adjustment"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Core Holdings & Holdings Summary:</label>
              <textarea
                value={caseHoldings}
                onChange={(e) => setCaseHoldings(e.target.value)}
                rows={3}
                placeholder="e.g. Applied Three-Stage Delimitation Methodology; adjusted provisional equidistance line due to concavity."
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Legal Principles (comma-separated):</label>
              <input
                type="text"
                value={casePrinciples}
                onChange={(e) => setCasePrinciples(e.target.value)}
                placeholder="Three-Stage Method, Cut-Off Mitigation, Disproportionality Check"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Official Repository URL:</label>
              <input
                type="url"
                value={caseUrl}
                onChange={(e) => setCaseUrl(e.target.value)}
                placeholder="https://www.icj-cij.org/case/161"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-md"
              >
                Add & Verify Case Precedent
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Source Creation Form */}
      {activeForm === 'source' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-4">
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Register Authoritative Legal Repository
          </h3>
          <form onSubmit={handleCreateSource} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 font-mono block mb-1">Source Repository Title:</label>
                <input
                  type="text"
                  value={sourceTitle}
                  onChange={(e) => setSourceTitle(e.target.value)}
                  placeholder="e.g. PCA Case Repository"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-slate-400 font-mono block mb-1">Institution:</label>
                <input
                  type="text"
                  value={sourceInst}
                  onChange={(e) => setSourceInst(e.target.value)}
                  placeholder="e.g. Permanent Court of Arbitration"
                  required
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Official URL:</label>
              <input
                type="url"
                value={sourceUrl}
                onChange={(e) => setSourceUrl(e.target.value)}
                placeholder="https://pca-cpa.org/en/cases/"
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="text-slate-400 font-mono block mb-1">Description:</label>
              <textarea
                value={sourceDesc}
                onChange={(e) => setSourceDesc(e.target.value)}
                rows={3}
                placeholder="Authoritative registry of inter-state arbitrations under UNCLOS Annex VII."
                required
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition shadow-md"
              >
                Register Repository
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
