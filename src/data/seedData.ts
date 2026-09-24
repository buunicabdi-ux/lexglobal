/**
 * LEXGLOBAL Canonical Legal Knowledge Base
 * Authoritative, verified initial corpus focused on Maritime Law,
 * Maritime Boundary Delimitation, and UNCLOS.
 * No fabricated authorities or imaginary URLs.
 */

import { Source, Treaty, TreatyProvision, Case, LegalConcept } from '../types/legal';

export const SEED_SOURCES: Source[] = [
  {
    id: 'src-un-treaty-unclos',
    title: 'United Nations Convention on the Law of the Sea (UNCLOS)',
    institution: 'United Nations',
    sourceType: 'Treaty',
    legalDomain: 'International Law / Law of the Sea',
    jurisdiction: 'Universal / Multilateral',
    description: 'The foundational multilateral treaty establishing the legal framework for all marine and maritime activities, codified at Montego Bay, Jamaica on 10 December 1982.',
    officialUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf',
    verified: true,
    date: '1982-12-10',
    createdAt: '1982-12-10T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'src-icj-repository',
    title: 'International Court of Justice (ICJ) Judgments & Case Law Repository',
    institution: 'International Court of Justice',
    sourceType: 'Official Repository',
    legalDomain: 'Public International Law',
    jurisdiction: 'Principal Judicial Organ of the United Nations',
    description: 'Official decisions, judgments, and advisory opinions issued by the International Court of Justice at the Peace Palace in The Hague, Netherlands.',
    officialUrl: 'https://www.icj-cij.org/cases',
    verified: true,
    date: '1946-04-18',
    createdAt: '1946-04-18T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'src-itlos-repository',
    title: 'International Tribunal for the Law of the Sea (ITLOS) Judgments & Orders',
    institution: 'International Tribunal for the Law of the Sea',
    sourceType: 'Official Repository',
    legalDomain: 'Law of the Sea',
    jurisdiction: 'UNCLOS Dispute Settlement (Hamburg, Germany)',
    description: 'Official judgments, orders, and advisory opinions delivered by ITLOS pursuant to Part XV and Annex VI of UNCLOS.',
    officialUrl: 'https://www.itlos.org/en/main/cases/list-of-cases/',
    verified: true,
    date: '1996-10-01',
    createdAt: '1996-10-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'src-un-doalos',
    title: 'UN Division for Ocean Affairs and the Law of the Sea (DOALOS)',
    institution: 'United Nations Office of Legal Affairs',
    sourceType: 'Declaration',
    legalDomain: 'Law of the Sea',
    jurisdiction: 'United Nations Secretariat',
    description: 'Official repository of maritime boundary declarations, charts, geographic coordinates, and deposit of treaties under UNCLOS Article 16, 75, and 84.',
    officialUrl: 'https://www.un.org/depts/los/index.htm',
    verified: true,
    date: '1982-12-10',
    createdAt: '1982-12-10T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  },
  {
    id: 'src-un-treaty-collection',
    title: 'United Nations Treaty Series (UNTS)',
    institution: 'United Nations Treaty Section',
    sourceType: 'Official Repository',
    legalDomain: 'Public International Law',
    jurisdiction: 'United Nations (Charter Article 102)',
    description: 'Comprehensive treaty registration database maintained by the UN Secretariat containing authentic texts and status of multilateral treaties.',
    officialUrl: 'https://treaties.un.org/',
    verified: true,
    date: '1945-10-24',
    createdAt: '1945-10-24T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  }
];

export const SEED_TREATY_PROVISIONS: TreatyProvision[] = [
  {
    id: 'unclos-art-3',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 3',
    title: 'Breadth of the territorial sea',
    text: 'Every State has the right to establish the breadth of its territorial sea up to a limit not exceeding 12 nautical miles, measured from baselines determined in accordance with this Convention.',
    summary: 'Establishes the universal rule that the maximum outer limit of a coastal State\'s territorial sea is 12 nautical miles from baselines.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part2.htm',
    verified: true
  },
  {
    id: 'unclos-art-15',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 15',
    title: 'Delimitation of the territorial sea between States with opposite or adjacent coasts',
    text: 'Where the coasts of two States are opposite or adjacent to each other, neither of the two States is entitled, failing agreement between them to the contrary, to extend its territorial sea beyond the median line every point of which is equidistant from the nearest points on the baselines from which the breadth of the territorial seas of each of the two States is measured. The above provision does not apply, however, where it is necessary by reason of historic title or other special circumstances to delimit the territorial seas of the two States in a way which is at variance therewith.',
    summary: 'Codifies the equidistance/special circumstances rule for territorial sea delimitation between opposite or adjacent coasts, mandating the median line unless historical title or special circumstances require variance.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part2.htm',
    verified: true
  },
  {
    id: 'unclos-art-55',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 55',
    title: 'Specific legal regime of the exclusive economic zone',
    text: 'The exclusive economic zone is an area beyond and adjacent to the territorial sea, subject to the specific legal regime established in this Part, under which the rights and jurisdiction of the coastal State and the rights and freedoms of other States are governed by the relevant provisions of this Convention.',
    summary: 'Defines the sui generis legal character of the Exclusive Economic Zone (EEZ) as an area distinct from both the territorial sea and the high seas.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part5.htm',
    verified: true
  },
  {
    id: 'unclos-art-56',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 56',
    title: 'Rights, jurisdiction and duties of the coastal State in the exclusive economic zone',
    text: 'In the exclusive economic zone, the coastal State has: (a) sovereign rights for the purpose of exploring and exploiting, conserving and managing the natural resources, whether living or non-living, of the waters superjacent to the seabed and of the seabed and its subsoil, and with regard to other activities for the economic exploitation and exploration of the zone; (b) jurisdiction as provided for in the relevant provisions of this Convention with regard to: (i) the establishment and use of artificial islands, installations and structures; (ii) marine scientific research; (iii) the protection and preservation of the marine environment.',
    summary: 'Outlines coastal State sovereign rights over living/non-living resources and jurisdiction over marine research, artificial structures, and environmental protection in the EEZ.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part5.htm',
    verified: true
  },
  {
    id: 'unclos-art-57',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 57',
    title: 'Breadth of the exclusive economic zone',
    text: 'The exclusive economic zone shall not extend beyond 200 nautical miles from the baselines from which the breadth of the territorial sea is measured.',
    summary: 'Fixes the maximum spatial extent of the exclusive economic zone at 200 nautical miles from coastal baselines.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part5.htm',
    verified: true
  },
  {
    id: 'unclos-art-74',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 74',
    title: 'Delimitation of the exclusive economic zone between States with opposite or adjacent coasts',
    text: '1. The delimitation of the exclusive economic zone between States with opposite or adjacent coasts shall be effected by agreement on the basis of international law, as referred to in Article 38 of the Statute of the International Court of Justice, in order to achieve an equitable solution. 2. If no agreement can be reached within a reasonable period of time, the States concerned shall resort to the procedures provided for in Part XV. 3. Pending agreement as provided for in paragraph 1, the States concerned, in a spirit of understanding and cooperation, shall make every effort to enter into provisional arrangements of a practical nature and, during this transitional period, not to jeopardize or hamper the reaching of the final agreement.',
    summary: 'Mandates that EEZ delimitation between opposite or adjacent States must be achieved by agreement on the basis of international law to reach an equitable solution, backed by Part XV dispute settlement and duty of restraint under interim arrangements.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part5.htm',
    verified: true
  },
  {
    id: 'unclos-art-83',
    treatyId: 'treaty-unclos',
    articleNumber: 'Article 83',
    title: 'Delimitation of the continental shelf between States with opposite or adjacent coasts',
    text: '1. The delimitation of the continental shelf between States with opposite or adjacent coasts shall be effected by agreement on the basis of international law, as referred to in Article 38 of the Statute of the International Court of Justice, in order to achieve an equitable solution. 2. If no agreement can be reached within a reasonable period of time, the States concerned shall resort to the procedures provided for in Part XV. 3. Pending agreement as provided for in paragraph 1, the States concerned, in a spirit of understanding and cooperation, shall make every effort to enter into provisional arrangements of a practical nature and, during this transitional period, not to jeopardize or hamper the reaching of the final agreement.',
    summary: 'Governs continental shelf delimitation, mirroring Article 74: requires agreement founded on international law to achieve an equitable solution, with provisional arrangements and non-jeopardization obligations.',
    officialSourceUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/part6.htm',
    verified: true
  }
];

export const SEED_TREATIES: Treaty[] = [
  {
    id: 'treaty-unclos',
    title: 'United Nations Convention on the Law of the Sea',
    shortName: 'UNCLOS',
    institution: 'United Nations',
    adoptionDate: '1982-12-10',
    entryIntoForce: '1994-11-16',
    topic: 'Comprehensive legal order for seas and oceans, maritime zones, navigational rights, marine resource management, and boundary delimitation.',
    officialUrl: 'https://www.un.org/depts/los/convention_agreements/texts/unclos/unclos_e.pdf',
    verified: true,
    summary: 'Often referred to as the "Constitution for the Oceans", UNCLOS establishes maritime zones (Internal Waters, Territorial Sea, Contiguous Zone, EEZ, Continental Shelf, High Seas, and the Area) and provides compulsory dispute settlement under Part XV.',
    provisions: SEED_TREATY_PROVISIONS
  }
];

export const SEED_CASES: Case[] = [
  {
    id: 'case-icj-north-sea-1969',
    title: 'North Sea Continental Shelf Cases (Federal Republic of Germany/Denmark; Federal Republic of Germany/Netherlands)',
    court: 'ICJ',
    date: '1969-02-20',
    caseNumber: 'ICJ Reports 1969, p. 3',
    parties: 'Federal Republic of Germany v. Denmark / Federal Republic of Germany v. Netherlands',
    legalArea: 'Maritime Boundary Delimitation / Continental Shelf',
    legalIssue: 'Whether the equidistance-special circumstances rule in Article 6 of the 1958 Geneva Convention was binding as customary international law upon a non-party (Germany).',
    summary: 'The International Court of Justice ruled that delimitation of the continental shelf must be effected by agreement in accordance with equitable principles, taking all relevant circumstances into account, to leave each party as much as possible of the continental shelf constituting the natural prolongation of its land territory without encroaching upon the natural prolongation of the other.',
    holdings: [
      'Equidistance is not an inherent or mandatory rule of customary international law for continental shelf delimitation.',
      'Delimitation must be governed by equitable principles taking account of all relevant circumstances.',
      'Natural prolongation of land territory is a foundational source of title.',
      'A concave coastline can produce an inequitable cut-off effect if equidistance is applied rigidly without adjustment.'
    ],
    principles: [
      'Equitable Principles',
      'Natural Prolongation',
      'Cut-Off Effect / Concavity',
      'Reasonable Proportionality between Coastal Length and Maritime Area'
    ],
    officialUrl: 'https://www.icj-cij.org/case/51',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-icj-gulf-of-maine-1984',
    title: 'Delimitation of the Maritime Boundary in the Gulf of Maine Area (Canada/United States of America)',
    court: 'ICJ',
    date: '1984-10-12',
    caseNumber: 'ICJ Reports 1984, p. 246',
    parties: 'Canada v. United States of America',
    legalArea: 'Single Maritime Boundary / EEZ / Continental Shelf',
    legalIssue: 'Methodology for drawing a single maritime boundary simultaneously dividing both the continental shelf and the exclusive fishery zones of adjacent/opposite States.',
    summary: 'An ICJ Chamber established the jurisprudence for drawing a single maritime boundary dividing both the continental shelf and the water column, emphasizing neutral geometric criteria and coastal geography rather than variable ecological or socioeconomic factors.',
    holdings: [
      'A single maritime boundary must be determined by equitable criteria primarily based on coastal geography.',
      'Geography of the coasts (opposite vs. adjacent sectors) is the paramount neutral criterion.',
      'Socioeconomic factors and fishing history cannot override basic coastal geography unless catastrophically inequitable.'
    ],
    principles: [
      'Single Maritime Boundary',
      'Primacy of Coastal Geography',
      'Equitable Criteria for Multi-Zone Delimitation'
    ],
    officialUrl: 'https://www.icj-cij.org/case/67',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-icj-jan-mayen-1993',
    title: 'Maritime Delimitation in the Area between Greenland and Jan Mayen (Denmark v. Norway)',
    court: 'ICJ',
    date: '1993-06-14',
    caseNumber: 'ICJ Reports 1993, p. 38',
    parties: 'Denmark v. Norway',
    legalArea: 'Fisheries Zone / Continental Shelf / Islands',
    legalIssue: 'Delimitation of continental shelf and fishery zones between opposite coasts where one coast is an uninhabited volcanic island (Jan Mayen) and the other is a vast island (Greenland).',
    summary: 'The Court held that the median line serves as the provisional starting point, but must be adjusted in light of relevant circumstances, specifically the marked disparity in coastal lengths and equitable access to capelin fishing grounds.',
    holdings: [
      'Median line is the standard initial point for opposite coasts under both customary law and treaty law.',
      'Substantial disparity in coastal lengths constitutes a relevant circumstance justifying line shifting.',
      'Equitable access to migratory fish resources (capelin) was taken into account to prevent catastrophic livelihood disruption.'
    ],
    principles: [
      'Provisional Median Line Starting Point',
      'Disparity in Coastal Lengths as Relevant Circumstance',
      'Equitable Shifting of Median Line'
    ],
    officialUrl: 'https://www.icj-cij.org/case/78',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-icj-qatar-bahrain-2001',
    title: 'Maritime Delimitation and Territorial Questions between Qatar and Bahrain (Qatar v. Bahrain)',
    court: 'ICJ',
    date: '2001-03-16',
    caseNumber: 'ICJ Reports 2001, p. 40',
    parties: 'State of Qatar v. Kingdom of Bahrain',
    legalArea: 'Territorial Sea / Low-Tide Elevations / Equidistance-Special Circumstances',
    legalIssue: 'Sovereignty over Hawar Islands, Zubarah, and Fasht ad Dibal; delimitation of territorial sea and single maritime boundary in the Persian Gulf.',
    summary: 'The Court clarified the operation of Article 15 of UNCLOS, ruling that for the territorial sea the equidistance/special circumstances rule applies, and low-tide elevations situated beyond the territorial sea of both States cannot generate maritime zones.',
    holdings: [
      'For territorial sea delimitation, Article 15 mandates the equidistance/special circumstances method.',
      'A low-tide elevation within the overlapping territorial sea of two opposite States does not have its own territorial sea.',
      'In the single maritime boundary beyond the territorial sea, minor features (e.g. Qit\'at Jaradah) were given minimal or no effect to avoid disproportionate distortion.'
    ],
    principles: [
      'Equidistance/Special Circumstances Rule (UNCLOS Art. 15)',
      'Status of Low-Tide Elevations (LTEs)',
      'Discounting Minor Insular Features to Avoid Distortion'
    ],
    officialUrl: 'https://www.icj-cij.org/case/87',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-icj-black-sea-2009',
    title: 'Maritime Delimitation in the Black Sea (Romania v. Ukraine)',
    court: 'ICJ',
    date: '2009-02-03',
    caseNumber: 'ICJ Reports 2009, p. 61',
    parties: 'Romania v. Ukraine',
    legalArea: 'Maritime Boundary Delimitation / Three-Stage Methodology',
    legalIssue: 'Delimitation of continental shelf and exclusive economic zones in the Black Sea; effect of Serpents\' Island (Zmiinyi Island) as a relevant circumstance.',
    summary: 'The landmark unanimous judgment that canonically formalized the modern Three-Stage Maritime Delimitation Methodology used across international jurisprudence for Articles 74 and 83 of UNCLOS.',
    holdings: [
      'Stage 1: Establish a provisional equidistance/median line using geometrically objective coastal base points.',
      'Stage 2: Examine whether there are relevant circumstances calling for the adjustment or shifting of the provisional line (e.g., coastal concavity, coastal length disparity, presence of small islands).',
      'Stage 3: Verify that the resulting line does not lead to an inequitable result by applying a disproportionality test (comparing the ratio of coastal lengths to maritime areas allocated).',
      'Serpents\' Island was given no effect beyond its 12-nautical-mile territorial sea arc because allowing it to affect the continental shelf/EEZ would cause an inequitable cut-off.'
    ],
    principles: [
      'Canonical Three-Stage Delimitation Methodology',
      'Stage 1: Geometrically Objective Provisional Equidistance Line',
      'Stage 2: Adjustment for Relevant Circumstances',
      'Stage 3: Ex-Post Disproportionality Check',
      'Enclaving / Limited Effect of Isolated Small Islands'
    ],
    officialUrl: 'https://www.icj-cij.org/case/132',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-itlos-bangladesh-myanmar-2012',
    title: 'Dispute concerning Delimitation of the Maritime Boundary between Bangladesh and Myanmar in the Bay of Bengal',
    court: 'ITLOS',
    date: '2012-03-14',
    caseNumber: 'ITLOS Reports 2012, p. 4 (Case No. 16)',
    parties: 'People\'s Republic of Bangladesh v. Union of Myanmar',
    legalArea: 'Delimitation beyond 200 NM / Continental Shelf / Concavity',
    legalIssue: 'Delimitation of territorial sea, EEZ, and continental shelf beyond 200 nautical miles; effect of extreme coastal concavity and St. Martin\'s Island.',
    summary: 'Historic ITLOS decision confirming that international courts and tribunals have jurisdiction to delimit the continental shelf beyond 200 nautical miles before recommendations by the Commission on the Limits of the Continental Shelf (CLCS), and adjusting the provisional line due to Bay of Bengal concavity.',
    holdings: [
      'Tribunal has jurisdiction to delimit the outer continental shelf beyond 200 nm prior to final CLCS recommendations.',
      'The severe concavity of Bangladesh\'s coastline created a cut-off effect requiring adjustment of the equidistance line to an azimuth angle of 215 degrees.',
      'St. Martin\'s Island was given full effect in the territorial sea but limited to an enclave/no effect in the EEZ and continental shelf to prevent blocking Myanmar\'s coastal frontage.'
    ],
    principles: [
      'Jurisdiction over Continental Shelf Beyond 200 Nautical Miles',
      'Adjustment for Severe Coastal Concavity (Cut-Off Relief)',
      'Enclaving of Offshore Islands in EEZ Delimitation'
    ],
    officialUrl: 'https://www.itlos.org/en/main/cases/list-of-cases/case-no-16/',
    verified: true,
    sourceId: 'src-itlos-repository'
  },
  {
    id: 'case-icj-nicaragua-colombia-2012',
    title: 'Territorial and Maritime Dispute (Nicaragua v. Colombia)',
    court: 'ICJ',
    date: '2012-11-19',
    caseNumber: 'ICJ Reports 2012, p. 624',
    parties: 'Republic of Nicaragua v. Republic of Colombia',
    legalArea: 'Sovereignty over Maritime Features / Enclaving / Three-Stage Delimitation',
    legalIssue: 'Sovereignty over San Andrés archipelago islands and cays; delimitation of maritime boundary across the Caribbean Sea.',
    summary: 'The ICJ confirmed Colombian sovereignty over the islands and cays of San Andrés, Providencia, and Santa Catalina, but applied the 3-stage method to delimit a maritime boundary that gave Nicaragua an expanded maritime area while enclaving small Colombian cays (Quitasueño and Serrana).',
    holdings: [
      'Applied 3-stage methodology between Nicaragua\'s mainland coast and Colombian islands.',
      'Quitasueño and Serrana cays were granted 12 nm territorial sea enclaves but no continental shelf/EEZ entitlement to prevent severing Nicaragua\'s coastal projection.',
      'The vast disparity in relevant coastal lengths justified drawing an adjusted boundary line extending eastward.'
    ],
    principles: [
      'Enclaving Small Cays with 12 NM Territorial Sea',
      'Non-Cut-Off of Continental Coastal Projection',
      'Application of 3-Stage Delimitation to Opposite Archipelagic Features'
    ],
    officialUrl: 'https://www.icj-cij.org/case/124',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-icj-peru-chile-2014',
    title: 'Maritime Dispute (Peru v. Chile)',
    court: 'ICJ',
    date: '2014-01-27',
    caseNumber: 'ICJ Reports 2014, p. 3',
    parties: 'Republic of Peru v. Republic of Chile',
    legalArea: 'Tacit Agreement on Maritime Boundary / Equidistance Line',
    legalIssue: 'Whether the 1952 Santiago Declaration established a comprehensive maritime boundary along a parallel of latitude or only a specialized fishery zone.',
    summary: 'The ICJ found that a tacit all-purpose maritime boundary existed between Peru and Chile following the parallel of latitude passing through Boundary Marker No. 1, but only up to a distance of 80 nautical miles. Beyond 80 nm, the Court drew an equidistance line out to the 200 nm limit.',
    holdings: [
      'Tacit agreement establishing a maritime boundary must be proven by compelling evidence of mutual consent and practice.',
      'The tacit parallel boundary terminated at 80 nautical miles based on historical fishing patterns in the 1950s.',
      'Beyond 80 nm, the boundary continued along an equidistance line to Point B, and thence along the 200 nm Peruvian outer limit.'
    ],
    principles: [
      'High Evidentiary Threshold for Tacit Maritime Boundaries',
      'Hybrid Delimitation: Agreed Parallel Segment followed by Equidistance',
      'Equidistance Line beyond Established Historical Agreed Sector'
    ],
    officialUrl: 'https://www.icj-cij.org/case/137',
    verified: true,
    sourceId: 'src-icj-repository'
  },
  {
    id: 'case-itlos-ghana-cote-divoire-2017',
    title: 'Dispute concerning Delimitation of the Maritime Boundary between Ghana and Côte d\'Ivoire in the Atlantic Ocean',
    court: 'ITLOS',
    date: '2017-09-23',
    caseNumber: 'ITLOS Reports 2017, p. 4 (Case No. 23)',
    parties: 'Republic of Ghana v. Republic of Côte d\'Ivoire',
    legalArea: 'Three-Stage Methodology / Tacit Agreement / Hydrocarbon Activities',
    legalIssue: 'Delimitation of territorial sea, EEZ, and continental shelf; whether a tacit maritime boundary had been established along a customary equidistance line by oil licensing practice.',
    summary: 'The Special Chamber of ITLOS rejected Côte d\'Ivoire\'s claim of a tacit boundary agreement based on oil concessions, affirmed the 3-stage equidistance method, and held that ongoing petroleum activities do not create an estoppel or shift the provisional line.',
    holdings: [
      'Oil concession lines and bilateral negotiating history do not establish a tacit agreement on a maritime boundary unless clear, mutual, and definitive consent is shown.',
      'Strict adherence to the 3-stage equidistance/relevant circumstances methodology.',
      'Location of oil wells and hydrocarbon concessions is not a relevant circumstance for adjusting a provisional equidistance line.'
    ],
    principles: [
      'Rejection of Tacit Boundary by Unilateral Oil Concessions',
      'Strict Application of 3-Stage Equidistance Methodology',
      'Hydrocarbon Resources Do Not Determine Maritime Boundary Trajectory'
    ],
    officialUrl: 'https://www.itlos.org/en/main/cases/list-of-cases/case-no-23/',
    verified: true,
    sourceId: 'src-itlos-repository'
  },
  {
    id: 'case-icj-somalia-kenya-2021',
    title: 'Maritime Delimitation in the Indian Ocean (Somalia v. Kenya)',
    court: 'ICJ',
    date: '2021-10-12',
    caseNumber: 'ICJ Reports 2021, p. 206',
    parties: 'Federal Republic of Somalia v. Republic of Kenya',
    legalArea: 'Maritime Boundary Delimitation / Parallel of Latitude / Concavity Adjustment',
    legalIssue: 'Whether an agreed maritime boundary existed along the parallel of latitude 1° 39\' 43.2" S, and determination of the single maritime boundary in the Indian Ocean.',
    summary: 'The Court rejected Kenya\'s claim that Somalia had consented to a boundary along the parallel of latitude. Applying the 3-stage method, the ICJ identified a provisional equidistance line and made a moderate adjustment northward to attenuate the cut-off effect produced by the regional concavity of Kenya\'s coastline.',
    holdings: [
      'Acquiescence or tacit agreement to a maritime boundary requires unmistakable and unambiguous conduct, which Kenya failed to prove.',
      'Applied 3-stage methodology for territorial sea, EEZ, and continental shelf up to and beyond 200 nautical miles.',
      'Adjusted the provisional equidistance line northward by shifting the geodetic azimuth to remedy the severe cut-off effect of coastal concavity on Kenya.',
      'Checked the adjusted line against the disproportionality test to ensure an equitable result.'
    ],
    principles: [
      'Rejection of Parallel of Latitude Claim lacking explicit consent',
      'Three-Stage Method for Multi-Zone Maritime Delimitation',
      'Adjustment for Coastal Concavity / Cut-Off Effect in Regional Context',
      'Disproportionality Verification'
    ],
    officialUrl: 'https://www.icj-cij.org/case/161',
    verified: true,
    sourceId: 'src-icj-repository'
  }
];

export const SEED_LEGAL_CONCEPTS: LegalConcept[] = [
  {
    id: 'concept-equidistance-median-line',
    name: 'Equidistance / Median Line Principle',
    definition: 'A geometrical method of maritime delimitation where every point along the boundary line is equidistant from the nearest points on the baselines from which the territorial sea of the respective States is measured. It forms the mandatory starting point (Stage 1) in the modern delimitation methodology.',
    relatedTreaties: ['UNCLOS Article 15', 'UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['Black Sea (2009)', 'Qatar v. Bahrain (2001)', 'Somalia v. Kenya (2021)'],
    relatedSources: ['src-un-treaty-unclos', 'src-icj-repository']
  },
  {
    id: 'concept-three-stage-methodology',
    name: 'Three-Stage Delimitation Methodology',
    definition: 'The standard jurisprudential framework established in the ICJ Black Sea case (2009) and consistently applied by international courts and tribunals: (1) draw a provisional equidistance line using objective coastal base points; (2) assess whether relevant circumstances justify adjusting the line; and (3) verify through a disproportionality test that no gross disproportion exists between coastal lengths and maritime area allocated.',
    relatedTreaties: ['UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['Black Sea (2009)', 'Nicaragua v. Colombia (2012)', 'Ghana/Côte d\'Ivoire (2017)', 'Somalia v. Kenya (2021)'],
    relatedSources: ['src-icj-repository', 'src-itlos-repository']
  },
  {
    id: 'concept-equitable-solution',
    name: 'Equitable Solution (UNCLOS Arts 74 & 83)',
    definition: 'The ultimate substantive objective prescribed by Articles 74(1) and 83(1) of UNCLOS for the delimitation of the exclusive economic zone and continental shelf. Equity in international law does not mean equal division of space, but rather the absence of disproportionate distortion caused by accidental coastal anomalies.',
    relatedTreaties: ['UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['North Sea Continental Shelf (1969)', 'Jan Mayen (1993)', 'Black Sea (2009)'],
    relatedSources: ['src-un-treaty-unclos', 'src-icj-repository']
  },
  {
    id: 'concept-relevant-circumstances',
    name: 'Relevant Circumstances / Special Circumstances',
    definition: 'Geographical, geological, or historical factors taken into account at Stage 2 of delimitation to adjust the provisional equidistance line. Recognized relevant circumstances include coastal concavity causing cut-off, marked disparity in coastal lengths, and small isolated islands or low-tide elevations distorting the line.',
    relatedTreaties: ['UNCLOS Article 15', 'UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['North Sea Continental Shelf (1969)', 'Jan Mayen (1993)', 'Black Sea (2009)', 'Somalia v. Kenya (2021)'],
    relatedSources: ['src-icj-repository']
  },
  {
    id: 'concept-cut-off-effect',
    name: 'Non-Encroachment & Cut-Off Effect',
    definition: 'The fundamental principle that a maritime boundary should not cut off a coastal State from the seaward projection of its land territory or maritime frontage into the open ocean. A concave coastline often requires outward azimuth shifting to relieve cut-off.',
    relatedTreaties: ['UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['North Sea Continental Shelf (1969)', 'Bangladesh/Myanmar (2012)', 'Somalia v. Kenya (2021)'],
    relatedSources: ['src-icj-repository', 'src-itlos-repository']
  },
  {
    id: 'concept-eez-regime',
    name: 'Exclusive Economic Zone (EEZ) Regime',
    definition: 'A specific legal zone extending up to 200 nautical miles from baselines wherein the coastal State exercises sovereign rights over exploration, exploitation, conservation, and management of marine natural resources, and jurisdiction over marine research and environmental protection, while preserving freedoms of navigation and overflight for third States.',
    relatedTreaties: ['UNCLOS Article 55', 'UNCLOS Article 56', 'UNCLOS Article 57', 'UNCLOS Article 74'],
    relatedCases: ['Gulf of Maine (1984)', 'Jan Mayen (1993)', 'Black Sea (2009)'],
    relatedSources: ['src-un-treaty-unclos']
  },
  {
    id: 'concept-continental-shelf',
    name: 'Continental Shelf & Natural Prolongation',
    definition: 'The seabed and subsoil of submarine areas extending beyond the territorial sea throughout the natural prolongation of land territory to the outer edge of the continental margin, or to a distance of 200 nautical miles where the outer edge does not extend up to that distance (or further subject to UNCLOS Article 76 criteria).',
    relatedTreaties: ['UNCLOS Article 76', 'UNCLOS Article 83'],
    relatedCases: ['North Sea Continental Shelf (1969)', 'Bangladesh/Myanmar (2012)'],
    relatedSources: ['src-un-treaty-unclos', 'src-itlos-repository']
  },
  {
    id: 'concept-disproportionality-test',
    name: 'Disproportionality Test (Stage 3 Verification)',
    definition: 'A non-mathematical ex-post verification test applied at Stage 3 of delimitation. The court compares the ratio of the respective relevant coastal lengths to the ratio of the maritime areas allocated to ensure there is no gross disproportion rendering the result inequitable.',
    relatedTreaties: ['UNCLOS Article 74', 'UNCLOS Article 83'],
    relatedCases: ['Black Sea (2009)', 'Somalia v. Kenya (2021)'],
    relatedSources: ['src-icj-repository']
  }
];
