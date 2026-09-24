/**
 * LEXGLOBAL Legal Data Types
 * Standard canonical data model for international law research
 */

export type EvidenceStatusType = 'strong' | 'limited' | 'insufficient';

export interface Source {
  id: string;
  title: string;
  institution: string; // e.g., 'International Court of Justice', 'ITLOS', 'United Nations'
  sourceType: 'Treaty' | 'Judgment' | 'Advisory Opinion' | 'Arbitral Award' | 'Declaration' | 'Official Repository';
  legalDomain: string; // 'International Law', 'Law of the Sea'
  jurisdiction: string;
  description: string;
  officialUrl: string;
  verified: boolean;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  sourceId: string;
  title: string;
  documentType: 'Treaty Text' | 'Court Judgment' | 'Statute' | 'Resolution';
  institution: string;
  date: string;
  officialUrl: string;
  content: string;
  summary: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TreatyProvision {
  id: string;
  treatyId: string;
  articleNumber: string; // e.g. "Article 15", "Article 74", "Article 83"
  title: string;
  text: string;
  summary: string;
  officialSourceUrl: string;
  verified: boolean;
}

export interface Treaty {
  id: string;
  title: string;
  shortName: string; // e.g., 'UNCLOS'
  institution: string; // 'United Nations'
  adoptionDate: string;
  entryIntoForce: string;
  topic: string;
  officialUrl: string;
  verified: boolean;
  summary: string;
  provisions?: TreatyProvision[];
}

export interface Case {
  id: string;
  title: string;
  court: 'ICJ' | 'ITLOS' | 'PCA' | 'Ad Hoc Arbitral Tribunal';
  date: string;
  caseNumber: string;
  parties: string; // e.g. "Romania v. Ukraine", "Somalia v. Kenya"
  legalArea: string; // e.g. "Maritime Boundary Delimitation"
  legalIssue: string;
  summary: string;
  holdings: string[];
  principles: string[];
  officialUrl: string;
  verified: boolean;
  sourceId: string;
}

export interface LegalConcept {
  id: string;
  name: string;
  definition: string;
  relatedTreaties: string[];
  relatedCases: string[];
  relatedSources: string[];
}

export interface QueryAnalysis {
  legalDomain: string;
  subDomain: string;
  legalIssue: string;
  institutions: string[];
  legalConcepts: string[];
  searchTerms: string[];
  isOffTopic?: boolean;
}

export interface Citation {
  citationId: string;
  claim: string;
  sourceId?: string;
  documentId?: string;
  caseId?: string;
  treatyId?: string;
  articleNumber?: string;
  sourceTitle: string;
  supportingPassage: string;
  officialUrl: string;
  validationStatus: 'verified' | 'structured_reference' | 'unverified';
  institution?: string;
  documentType?: string;
  whyItMatters?: string;
}

export interface SourceChainNode {
  id: string;
  level: 'question' | 'issue' | 'instrument' | 'provision' | 'case' | 'source';
  label: string;
  title: string;
  detail: string;
  referenceId?: string;
  referenceType?: 'treaty' | 'provision' | 'case' | 'source';
  url?: string;
  available: boolean;
  institution?: string;
  documentType?: string;
  supportingPassage?: string;
  whyItMatters?: string;
}

export interface LegalSourceChain {
  questionNode: SourceChainNode;
  issueNode: SourceChainNode;
  instrumentNode: SourceChainNode;
  provisionNode: SourceChainNode;
  caseNode: SourceChainNode;
  sourceNode: SourceChainNode;
}

export interface ResearchAnswer {
  id: string;
  queryId: string;
  question: string;
  directAnswer: string;
  plainLanguageAnswer?: string;
  legalPrinciples: string[];
  legalProvisions: {
    article: string;
    treatyName: string;
    summary: string;
    officialUrl: string;
  }[];
  relevantCases: {
    title: string;
    court: string;
    year: string;
    summary: string;
    officialUrl: string;
  }[];
  limitations: string;
  evidenceStatus: EvidenceStatusType;
  evidenceStatusReason: string;
  citations: Citation[];
  sourceChain: LegalSourceChain;
  sources: {
    id: string;
    title: string;
    institution: string;
    officialUrl: string;
    verified: boolean;
    type: string;
  }[];
  createdAt: string;
  analysis: QueryAnalysis;
}

export interface ResearchQuery {
  id: string;
  userId?: string;
  question: string;
  analysis: QueryAnalysis;
  createdAt: string;
  durationMs: number;
}

export interface UploadedDoc {
  id: string;
  name: string;
  size: number;
  fileType: string;
  content: string;
  summary: string;
  createdAt: string;
  qaHistory?: {
    question: string;
    answer: string;
    supportingPassage: string;
    createdAt: string;
  }[];
}

export interface Bookmark {
  id: string;
  userId: string;
  targetType: 'case' | 'treaty' | 'source' | 'query';
  targetId: string;
  title: string;
  subtitle?: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: 'user' | 'admin';
  createdAt: string;
}
