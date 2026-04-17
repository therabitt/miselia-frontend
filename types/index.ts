// ═════════════════════════════════════════════════════════════════════════════
// File    : types/index.ts
// Desc    : TypeScript types untuk seluruh frontend Miselia.
//           Mencakup semua entity, enum, dan utility types dari Blueprint §2.3.
// Layer   : Types
// Step    : STEP 10 — Frontend: Struktur Direktori & Setup
// Ref     : Blueprint §2.3, §6.x, §7.1
// ═════════════════════════════════════════════════════════════════════════════

// ═════════════════════════════════════════════════════════════════════════════
// ENUMS
// ═════════════════════════════════════════════════════════════════════════════

export type SubscriptionTier = "free" | "sarjana" | "magister" | "institutional";

export type SubscriptionStatus = "active" | "grace_period" | "expired";

export type PlanType = "free" | "monthly" | "biannual" | "institutional";

export type StageType =
  | "literature_review"      // P1
  | "research_gap"           // P2
  | "methodology_advisor"    // P3
  | "hypothesis_variable"    // P4 kuantitatif
  | "proposisi_tema"         // P4 kualitatif
  | "chapter_outline"        // P5
  | "bab1_writer"            // P6
  | "systematic_review"      // P7 — Magister only
  | "sidang_preparation";    // P8 — semua tier berbayar

export type StageStatus = "queued" | "running" | "completed" | "failed";

export type ReviewType = "narrative" | "systematic"; // Decision #19

export type PipelineMode = "kuantitatif" | "kualitatif" | "mixed"; // Decision #18

export type LibraryPaperSource =
  | "find_papers"
  | "stage_run"
  | "csv_import"   // Fase 5 — Decision #28
  | "bib_import"   // Tier A — Decision #28
  | "ris_import";  // Tier A — Decision #28

export type BillingPeriod = "monthly" | "biannual";

export type UpgradeModalTrigger =
  | "pipeline_locked"
  | "systematic_review_locked"
  | "re_run"
  | "chat_session_limit"
  | "chat_message_limit"
  | "project_quota"
  | "library_quota";

export type AuthModalTrigger =
  | "save_library"
  | "chat"
  | "push_project"
  | "more_results";

export type EducationLevel = "s1" | "s2" | "s3";

// ═════════════════════════════════════════════════════════════════════════════
// CORE ENTITIES
// ═════════════════════════════════════════════════════════════════════════════

export interface User {
  id: string;
  supabaseId: string;
  email: string;
  fullName: string | null;
  university: string | null;
  fieldOfStudy: string | null;
  educationLevel: EducationLevel | null;
  emailVerified: boolean;
  onboardingStep: number;  // 0–5, ref: Blueprint §6.1
  onboardingCompletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  planType: PlanType;
  status: SubscriptionStatus;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;  // null untuk free tier
  institutionalAccountId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface InstitutionalAccount {
  id: string;
  name: string;
  orgCode: string;
  contactEmail: string;
  seatsPurchased: number;
  seatsUsed: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
}

export interface Project {
  id: string;
  userId: string;
  title: string;
  fieldOfStudy: string | null;
  educationLevel: string | null;
  citationStyle: string | null;
  reviewType: ReviewType;  // final setelah dibuat — Decision #19
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
  // Enriched fields dari GET /projects/{id}
  stalenessInfo?: StalenessInfo[];
}

export interface StageRun {
  id: string;
  projectId: string;
  userId: string;
  stageType: StageType;
  status: StageStatus;
  topic: string;
  filters: Record<string, unknown> | null;
  constraints: Record<string, unknown> | null;
  inputParams: StageRunInputParams | null;
  citationStyle: string | null;
  sourceStageRunId: string | null;  // Decision #14
  progressStep: number;
  progressDetail: string | null;
  idempotencyKey: string | null;
  celeryTaskId: string | null;
  createdAt: string;
  completedAt: string | null;
  updatedAt: string;
}

export interface StageRunInputParams {
  topic?: string;
  sourceStageRunId?: string;
  methodologyMode?: PipelineMode;  // Decision #18
  modeSource?: "p3_auto" | "p3_auto_mixed" | "user_override";
  userOverrides?: UserOverrides;   // Decision #24
  hasDivergence?: boolean;
  [key: string]: unknown;
}

export interface StageOutput {
  id: string;
  stageRunId: string;
  outputData: Record<string, unknown>;
  docxPath: string | null;    // NULL untuk P8
  pdfPath: string | null;     // Untuk P8
  diagramPath: string | null; // PNG statis P4 (export) — [M1 FIX]
  prismaPath: string | null;  // SVG PRISMA P7
  promptVersionId: string | null;
  qualityWarning: boolean;
  qualityWarningReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Paper {
  id: string;
  semanticScholarId: string | null;
  openalexId: string | null;
  title: string;
  titleHash: string | null;
  authors: string[];
  year: number | null;
  venue: string | null;
  citationCount: number;
  abstract: string | null;
  doi: string | null;
  pdfUrl: string | null;
  isOpenAccess: boolean;
  createdAt: string;
}

export interface SearchSession {
  id: string;
  userId: string;
  query: string;
  filters: Record<string, unknown> | null;
  paperIds: string[];
  resultCount: number;
  createdAt: string;
}

export interface LibraryPaper {
  id: string;
  userId: string;
  paperId: string;
  paper?: Paper;  // joined
  source: LibraryPaperSource;
  sourceStageRunId: string | null;
  importBatchId: string | null;
  notes: string | null;
  tags: string[] | null;
  isIncomplete: boolean;
  isVisible: boolean;
  expiresAt: string | null;
  expiredAt: string | null;
  addedAt: string;
}

export interface ImportBatch {
  id: string;
  userId: string;
  fileFormat: "csv" | "bib" | "ris";
  originalFilename: string;
  totalParsed: number;
  importedCount: number;
  skippedDuplicate: number;
  skippedQuota: number;
  incompleteCount: number;
  status: "pending" | "processing" | "done" | "failed";
  errorMessage: string | null;
  createdAt: string;
  completedAt: string | null;
}

export interface ChatSession {
  id: string;
  userId: string;
  title: string | null;
  paperIds: string[];
  source: "find_papers" | "library" | "stage_run" | null;
  sourceRefId: string | null;
  status: "active" | "limit_reached" | "closed";
  messageCount: number;
  createdAt: string;
  lastMessageAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  chatSessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface PaymentTransaction {
  id: string;
  userId: string;
  subscriptionId: string | null;
  orderId: string;
  amount: number;  // IDR
  currency: string;
  status: "pending" | "settlement" | "expire" | "cancel" | "deny" | "refund";
  planType: PlanType | null;
  tier: SubscriptionTier | null;
  snapToken: string | null;
  createdAt: string;
  updatedAt: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// CONFIRMATION GATE TYPES — Decision #24
// ═════════════════════════════════════════════════════════════════════════════

export interface UserOverrides {
  gapDescription?: string;
  researchQuestion?: string;
  noveltyStatement?: string;
  methodologyModeOverride?: PipelineMode;
  researchQuestions?: string[];
}

export interface DivergenceInfo {
  hasDivergence: boolean;
  divergenceFields: string[];
}

// ═════════════════════════════════════════════════════════════════════════════
// STALENESS — Decision #22
// ═════════════════════════════════════════════════════════════════════════════

export interface StalenessInfo {
  stageType: StageType;
  isStale: boolean;
  sourceStageRunId: string | null;
  newerRunExists: boolean;
  lastRunAt: string | null;
}

export interface StageRunWithStaleness extends StageRun {
  staleness: StalenessInfo;
}

export interface ProjectWithStaleness extends Project {
  stageRuns: StageRunWithStaleness[];
}

// ═════════════════════════════════════════════════════════════════════════════
// TIER CONFIG — Blueprint §7.1 (client-side mirror)
// CATATAN: Hanya untuk UI rendering — enforcement tetap di backend
// ═════════════════════════════════════════════════════════════════════════════

export interface TierConfig {
  maxActiveProjects: number;
  allowedStageTypes: StageType[];
  maxPapersPerStage: number;
  maxRerunsPerStage: number | null;  // null = unlimited
  canUseSystematicReview: boolean;
  chatEnabled: boolean;
  chatMessagesPerSession: number | null;
  chatSessionsPerMonth: number | null;
  chatPapersPerSession: number;
  libraryRetentionDays: number | null;
  maxLibraryPapers: number | null;
  docxWatermark: boolean;
  priceMonthly: number | null;
  priceBiannual: number | null;
}

// ═════════════════════════════════════════════════════════════════════════════
// FIND PAPERS — Blueprint §3.2
// ═════════════════════════════════════════════════════════════════════════════

export interface PaperResult {
  paperId: string;
  title: string;
  authors: string[];
  year: number | null;
  venue: string | null;
  citationCount: number;
  abstract: string | null;
  relevanceScore: number;
  source: string;
  doi: string | null;
  pdfUrl: string | null;
  isOpenAccess: boolean;
}

export interface FindPapersFilters {
  yearFrom?: number;
  yearTo?: number;
  documentTypes?: string[];
  minCitations?: number;
  language?: string;
}

export interface FindPapersResponse {
  sessionId: string | null;  // null jika guest
  papers: PaperResult[];
  totalFound: number;
  searchDurationMs: number;
}

// ═════════════════════════════════════════════════════════════════════════════
// API RESPONSE WRAPPER
// ═════════════════════════════════════════════════════════════════════════════

export interface ApiError {
  error: string;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
