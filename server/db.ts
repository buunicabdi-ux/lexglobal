/**
 * LEXGLOBAL Server Database & Repository Layer
 * Manages the canonical legal knowledge base, user bookmarks,
 * research history, and uploaded documents.
 */

import {
  Source,
  Treaty,
  TreatyProvision,
  Case,
  LegalConcept,
  ResearchQuery,
  ResearchAnswer,
  Bookmark,
  UploadedDoc,
  UserProfile
} from '../src/types/legal';
import {
  SEED_SOURCES,
  SEED_TREATIES,
  SEED_TREATY_PROVISIONS,
  SEED_CASES,
  SEED_LEGAL_CONCEPTS
} from '../src/data/seedData';

class LegalDatabase {
  private sources: Map<string, Source> = new Map();
  private treaties: Map<string, Treaty> = new Map();
  private provisions: Map<string, TreatyProvision> = new Map();
  private cases: Map<string, Case> = new Map();
  private concepts: Map<string, LegalConcept> = new Map();
  private queries: Map<string, ResearchQuery> = new Map();
  private answers: Map<string, ResearchAnswer> = new Map();
  private bookmarks: Map<string, Bookmark> = new Map();
  private documents: Map<string, UploadedDoc> = new Map();
  private users: Map<string, UserProfile> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    // Seed sources
    SEED_SOURCES.forEach((s) => this.sources.set(s.id, { ...s }));

    // Seed treaties
    SEED_TREATIES.forEach((t) => this.treaties.set(t.id, { ...t }));

    // Seed provisions
    SEED_TREATY_PROVISIONS.forEach((p) => this.provisions.set(p.id, { ...p }));

    // Seed cases
    SEED_CASES.forEach((c) => this.cases.set(c.id, { ...c }));

    // Seed concepts
    SEED_LEGAL_CONCEPTS.forEach((lc) => this.concepts.set(lc.id, { ...lc }));

    // Seed demo user and admin
    this.users.set('usr-demo', {
      id: 'usr-demo',
      email: 'researcher@lexglobal.org',
      displayName: 'International Law Scholar',
      role: 'user',
      createdAt: new Date().toISOString()
    });

    this.users.set('usr-admin', {
      id: 'usr-admin',
      email: 'admin@lexglobal.org',
      displayName: 'Chief Legal Registrar',
      role: 'admin',
      createdAt: new Date().toISOString()
    });

    // Seed sample uploaded document for immediate Document Q&A demo
    const sampleDoc: UploadedDoc = {
      id: 'doc-unclos-sample-brief',
      name: 'Summary_UNCLOS_Article_15_and_74_Commentary.txt',
      size: 4280,
      fileType: 'text/plain',
      content: `INTERNATIONAL MARITIME BOUNDARY DELIMITATION: A BRIEF FOR LEGAL SCHOLARS

1. TERRITORIAL SEA DELIMITATION UNDER UNCLOS ARTICLE 15:
Article 15 of UNCLOS codifies the standard equidistance/special circumstances rule. Where coasts are opposite or adjacent, neither State may extend its territorial sea beyond the median line unless historical title or special geographical circumstances dictate another line. As confirmed in Qatar v. Bahrain (2001), low-tide elevations situated beyond the territorial sea cannot generate sovereign maritime entitlements.

2. EXCLUSIVE ECONOMIC ZONE AND CONTINENTAL SHELF DELIMITATION (ARTICLES 74 AND 83):
Articles 74(1) and 83(1) of UNCLOS provide that delimitation of the EEZ and continental shelf shall be effected by agreement on the basis of international law in order to achieve an equitable solution. In the landmark 2009 Black Sea case (Romania v. Ukraine), the ICJ established the definitive Three-Stage Delimitation Methodology:
- Stage 1: Construct a provisional equidistance line using objective coastal base points.
- Stage 2: Assess whether relevant circumstances (such as coastal concavity or disproportionate coastal lengths) justify shifting or adjusting the line to prevent cut-off effects.
- Stage 3: Apply the disproportionality test to ensure that the ratio of allocated maritime areas does not lead to a grossly inequitable result when compared to relative coastal lengths.

3. INTERIM OBLIGATIONS AND DISPUTE SETTLEMENT:
Pending final agreement, States have an obligation under Articles 74(3) and 83(3) to make practical provisional arrangements and not jeopardize the conclusion of a permanent boundary treaty. Unilateral commercial hydrocarbon exploitation within contested zones must not cause irreparable physical harm to the marine seabed.`,
      summary: 'Executive brief on UNCLOS Article 15 (territorial sea) and Articles 74/83 (EEZ and continental shelf), analyzing the 3-stage delimitation methodology from Black Sea (2009).',
      createdAt: new Date().toISOString(),
      qaHistory: []
    };
    this.documents.set(sampleDoc.id, sampleDoc);
  }

  // --- Statistics ---
  public getStats() {
    return {
      sourcesCount: this.sources.size,
      treatiesCount: this.treaties.size,
      provisionsCount: this.provisions.size,
      casesCount: this.cases.size,
      conceptsCount: this.concepts.size,
      documentsCount: this.documents.size,
      verifiedSourcesCount: Array.from(this.sources.values()).filter((s) => s.verified).length,
      verifiedCasesCount: Array.from(this.cases.values()).filter((c) => c.verified).length
    };
  }

  // --- Sources ---
  public getAllSources(filter?: { institution?: string; sourceType?: string; verified?: boolean }) {
    let list = Array.from(this.sources.values());
    if (filter?.institution) {
      list = list.filter((s) => s.institution.toLowerCase().includes(filter.institution!.toLowerCase()));
    }
    if (filter?.sourceType) {
      list = list.filter((s) => s.sourceType === filter.sourceType);
    }
    if (filter?.verified !== undefined) {
      list = list.filter((s) => s.verified === filter.verified);
    }
    return list;
  }

  public getSourceById(id: string) {
    return this.sources.get(id);
  }

  public addSource(source: Omit<Source, 'id' | 'createdAt' | 'updatedAt'>) {
    const id = `src-custom-${Date.now()}`;
    const newSource: Source = {
      ...source,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.sources.set(id, newSource);
    return newSource;
  }

  // --- Treaties & Provisions ---
  public getAllTreaties() {
    const treaties = Array.from(this.treaties.values());
    return treaties.map((t) => ({
      ...t,
      provisions: Array.from(this.provisions.values()).filter((p) => p.treatyId === t.id)
    }));
  }

  public getTreatyById(id: string) {
    const treaty = this.treaties.get(id);
    if (!treaty) return undefined;
    const provisions = Array.from(this.provisions.values()).filter((p) => p.treatyId === id);
    return { ...treaty, provisions };
  }

  public getAllProvisions() {
    return Array.from(this.provisions.values());
  }

  public getProvisionById(id: string) {
    return this.provisions.get(id);
  }

  public addProvision(provision: Omit<TreatyProvision, 'id'>) {
    const id = `prov-custom-${Date.now()}`;
    const newProv: TreatyProvision = { ...provision, id };
    this.provisions.set(id, newProv);
    return newProv;
  }

  // --- Cases ---
  public getAllCases(filter?: { court?: string; legalArea?: string; query?: string }) {
    let list = Array.from(this.cases.values());
    if (filter?.court && filter.court !== 'all') {
      list = list.filter((c) => c.court === filter.court);
    }
    if (filter?.legalArea && filter.legalArea !== 'all') {
      list = list.filter((c) => c.legalArea.toLowerCase().includes(filter.legalArea!.toLowerCase()));
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.parties.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.legalIssue.toLowerCase().includes(q) ||
          c.principles.some((p) => p.toLowerCase().includes(q))
      );
    }
    return list;
  }

  public getCaseById(id: string) {
    return this.cases.get(id);
  }

  public addCase(caseData: Omit<Case, 'id'>) {
    const id = `case-custom-${Date.now()}`;
    const newCase: Case = { ...caseData, id };
    this.cases.set(id, newCase);
    return newCase;
  }

  // --- Concepts ---
  public getAllConcepts() {
    return Array.from(this.concepts.values());
  }

  public getConceptById(id: string) {
    return this.concepts.get(id);
  }

  // --- Research Queries & Answers ---
  public saveQuery(query: ResearchQuery) {
    this.queries.set(query.id, query);
  }

  public saveAnswer(answer: ResearchAnswer) {
    this.answers.set(answer.id, answer);
  }

  public getAnswerById(id: string) {
    return this.answers.get(id);
  }

  public getRecentQueries(limit = 10) {
    return Array.from(this.queries.values())
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }

  public getAnswerByQueryId(queryId: string) {
    return Array.from(this.answers.values()).find((a) => a.queryId === queryId);
  }

  // --- Bookmarks ---
  public getBookmarks(userId = 'usr-demo') {
    return Array.from(this.bookmarks.values()).filter((b) => b.userId === userId);
  }

  public toggleBookmark(userId = 'usr-demo', targetType: Bookmark['targetType'], targetId: string, title: string, subtitle?: string) {
    const existing = Array.from(this.bookmarks.values()).find(
      (b) => b.userId === userId && b.targetType === targetType && b.targetId === targetId
    );
    if (existing) {
      this.bookmarks.delete(existing.id);
      return { bookmarked: false, id: existing.id };
    } else {
      const id = `bm-${Date.now()}`;
      const newBm: Bookmark = {
        id,
        userId,
        targetType,
        targetId,
        title,
        subtitle,
        createdAt: new Date().toISOString()
      };
      this.bookmarks.set(id, newBm);
      return { bookmarked: true, bookmark: newBm };
    }
  }

  // --- Uploaded Documents ---
  public getAllDocuments() {
    return Array.from(this.documents.values());
  }

  public getDocumentById(id: string) {
    return this.documents.get(id);
  }

  public addDocument(doc: Omit<UploadedDoc, 'id' | 'createdAt' | 'qaHistory'>) {
    const id = `doc-${Date.now()}`;
    const newDoc: UploadedDoc = {
      ...doc,
      id,
      createdAt: new Date().toISOString(),
      qaHistory: []
    };
    this.documents.set(id, newDoc);
    return newDoc;
  }

  public addDocumentQA(docId: string, question: string, answer: string, supportingPassage: string) {
    const doc = this.documents.get(docId);
    if (!doc) return false;
    if (!doc.qaHistory) doc.qaHistory = [];
    doc.qaHistory.unshift({
      question,
      answer,
      supportingPassage,
      createdAt: new Date().toISOString()
    });
    return true;
  }

  // --- Users & Roles ---
  public getUser(id: string) {
    return this.users.get(id);
  }
}

export const db = new LegalDatabase();
