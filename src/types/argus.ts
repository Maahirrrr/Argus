export type NavigationTab =
  | 'landing'
  | 'overview'
  | 'home'
  | 'inbox'
  | 'signals'
  | 'chaos'
  | 'insights'
  | 'customers'
  | 'feedback'
  | 'research'
  | 'intelligence'
  | 'opportunities'
  | 'prioritize'
  | 'roadmap'
  | 'prds'
  | 'prototypes'
  | 'ai_lab'
  | 'experiments'
  | 'analytics'
  | 'launch'
  | 'decisions'
  | 'documents'
  | 'ai_copilot'
  | 'weekly_review'
  | 'data_sources'
  | 'settings';

export interface ProductSignal {
  id: string;
  title: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  delta: string;
  metric: string;
  usersAffected: string;
  likelyCause: string;
  description: string;
  timestamp: string;
  status: 'active' | 'investigated' | 'resolved';
}

export interface ProductInsight {
  id: string;
  signalId: string;
  signalTitle: string;
  evidence: {
    label: string;
    value: string;
    sharePercent: number;
  }[];
  impact: string;
  impactGmv: string;
  confidence: number;
  recommendation: string;
  targetOpportunityId: string;
}

export interface Opportunity {
  id: string;
  number: string;
  title: string;
  source: ('Product Analytics' | 'Support Tickets' | 'Transaction Data' | 'Customer Feedback')[];
  potentialImpact: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  usersAffected: string;
  estimatedOpportunity: string;
  evidence: string[];
  aiRecommendation: string;
  status: 'inbox' | 'prioritized' | 'dismissed';
}

export interface PrioritizationInitiative {
  id: string;
  title: string;
  category: 'Reliability' | 'Growth' | 'Monetization' | 'CX' | 'Retention';
  description: string;
  reach: string;
  reachCount: number; // in thousands e.g. 82
  impact: number; // 1 to 10
  confidence: number; // in percent e.g. 91
  effort: number; // in sprints e.g. 5
  riceScore: number;
  iceScore: number;
  status: 'Active' | 'Under Review' | 'Backlog';
  whyRanking: string;
}

export interface PRDDocument {
  id: string;
  title: string;
  version: string;
  status: 'Draft' | 'In Review' | 'Approved';
  targetSprint: string;
  author: string;
  problem: string;
  userImpact: string;
  evidence: string[];
  goals: string[];
  nonGoals: string[];
  userStories: {
    asA: string;
    iWantTo: string;
    soThat: string;
    acceptanceCriteria: string[];
  }[];
  requirements: {
    id: string;
    title: string;
    priority: 'P0' | 'P1' | 'P2';
    description: string;
  }[];
  metrics: {
    name: string;
    current: string;
    target: string;
  }[];
  risks: {
    risk: string;
    mitigation: string;
  }[];
  rolloutPlan: {
    phase: string;
    audience: string;
    criteria: string;
  }[];
}

export interface PRDChallenge {
  potentialWeakness: string;
  confidenceNote: string;
  missingConsiderations: string[];
  suggestedExperiment: string;
}

export interface ExperimentItem {
  id: string;
  title: string;
  status: 'Draft' | 'Running' | 'Completed';
  hypothesis: string;
  primaryMetric: {
    name: string;
    baseline: string;
    expectedLift: string;
    mde: string;
  };
  secondaryMetrics: string[];
  control: {
    name: string;
    description: string;
  };
  treatment: {
    name: string;
    description: string;
  };
  expectedOutcome: string;
  duration: string;
  sampleSize: string;
  trafficSplit: number; // e.g. 50
  guardrails: {
    name: string;
    threshold: string;
  }[];
  decisionRule: string;
}

export interface DataSourceItem {
  id: string;
  name: string;
  type: string;
  status: 'Connected' | 'Not connected';
  lastSync: string;
  eventCount: string;
  description: string;
}

export interface WeeklyReviewData {
  week: string;
  dateRange: string;
  healthScore: number;
  healthGrade: 'GOOD' | 'WARNING' | 'CRITICAL';
  executiveSummary: string;
  whatImproved: { metric: string; delta: string; detail: string }[];
  whatWorsened: { metric: string; delta: string; detail: string }[];
  biggestOpportunity: { title: string; impact: string };
  biggestRisk: { title: string; impact: string };
  recommendedPriorities: string[];
}

// ───── NEW EXPANDED WORKSPACE TYPES ─────

export interface InboxItem {
  id: string;
  title: string;
  type: 'Customer Feedback' | 'Support Ticket' | 'Bug Report' | 'Competitor Alert' | 'Analytics Anomaly' | 'Stakeholder';
  source: string;
  snippet: string;
  sentiment: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT';
  urgency: 'P0' | 'P1' | 'P2' | 'P3';
  usersAffected: string;
  timestamp: string;
  status: 'unread' | 'read' | 'converted' | 'archived';
  category: string;
  evidenceQuote?: string;
}

export interface CustomerFeedbackItem {
  id: string;
  customerName: string;
  company: string;
  segment: 'Enterprise' | 'Growth' | 'SMB' | 'Prosumer';
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  painSeverity: 'Critical' | 'High' | 'Moderate' | 'Low';
  category: string;
  quote: string;
  frequency: number;
  arrAtRisk: string;
  timestamp: string;
  linkedOpportunityId?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  objective: string;
  status: 'In Progress' | 'Synthesized' | 'Archived';
  interviewCount: number;
  persona: string;
  jtbd: string;
  keyPainPoints: string[];
  opportunityDiscovered: string;
  lastUpdated: string;
}

export interface InterviewRecord {
  id: string;
  projectId: string;
  participantName: string;
  role: string;
  company: string;
  duration: string;
  date: string;
  transcriptSnippet: string;
  keyQuotes: string[];
  aiSynthesizedInsights: string[];
  objections: string[];
}

export interface CompetitorItem {
  id: string;
  name: string;
  marketShare: string;
  pricing: string;
  positioning: string;
  targetUsers: string;
  strengths: string[];
  weaknesses: string[];
  recentLaunches: { feature: string; date: string; threatLevel: 'HIGH' | 'MEDIUM' | 'LOW' }[];
  opportunityGap: string;
}

export interface OpportunityTreeNode {
  id: string;
  type: 'Outcome' | 'Problem' | 'Need' | 'Opportunity' | 'Solution' | 'Experiment';
  title: string;
  description: string;
  metricImpact?: string;
  confidence: number;
  status: 'Validated' | 'Testing' | 'Backlog' | 'Active';
  children?: OpportunityTreeNode[];
}

export interface RoadmapItem {
  id: string;
  title: string;
  problem: string;
  description?: string;
  status: 'Now' | 'Next' | 'Later' | 'Shipped';
  quarter: 'Q3 2026' | 'Q4 2026' | 'Q1 2027';
  targetDate: string;
  owner: string;
  priority: 'P0' | 'P1' | 'P2';
  impact: 'High' | 'Medium' | 'Low';
  effortSprints: number;
  dependencies: string[];
  conflictAlert?: string;
  linkedPrdId?: string;
  linkedExperimentId?: string;
  risk?: 'HIGH' | 'MEDIUM' | 'LOW';
  progress?: number;
}

export interface PrototypeMockup {
  id: string;
  title: string;
  prompt: string;
  description: string;
  status: 'Prototype' | 'Experimental' | 'Production';
  category: 'Onboarding' | 'Checkout & Routing' | 'AI Copilot' | 'Fraud Prevention' | string;
  previewType?: 'interactive_flow' | 'drawer' | 'settings_card';
  version?: string;
  codeSnippet?: string;
  gherkinSpec?: string;
}

export interface AiModelBenchmark {
  id: string;
  name: string;
  provider: string;
  latencyP95Ms?: number;
  ttftMs?: number;
  tokensPerSecond?: number;
  costPer1kTokens?: number;
  costPer1kInput?: number;
  costPer1kOutput?: number;
  accuracyScore?: number;
  qualityScore?: number;
  hallucinationRate: number;
  contextWindow: string;
  recommendedUse: string;
}

export interface PromptVersion {
  id: string;
  name?: string;
  feature?: string;
  version: string;
  model?: string;
  targetModel?: string;
  systemPrompt: string;
  userPromptTemplate?: string;
  latencyMs?: number;
  costPerCall?: string;
  evalScore?: number;
  evalPassRate?: number;
  temperature?: number;
  active?: boolean;
  notes?: string;
}

export interface EvaluationTestCase {
  id: string;
  name?: string;
  metric?: string;
  input?: string;
  expectedOutput?: string;
  inputCase?: string;
  expectedBehavior?: string;
  actualOutput?: string;
  latencyMs: number;
  cost?: string;
  score?: number;
  status: 'PASS' | 'FAIL';
  guardrailViolations?: string[];
}

export interface LaunchItem {
  id: string;
  title: string;
  category: 'Product' | 'Engineering' | 'Design' | 'Marketing' | 'Support' | 'Compliance' | 'QA';
  owner: string;
  status: 'Completed' | 'In Progress' | 'Blocked' | 'ACTIVE_ROLLOUT' | 'CANARY';
  dueDate: string;
  critical: boolean;
  rolloutPercentage?: number;
  description?: string;
  health?: string;
  signoffs?: { role: string; owner: string; signed: boolean }[];
}

export interface DecisionRecord {
  id: string;
  title: string;
  context: string;
  category?: string;
  optionsEvaluated?: {
    option: string;
    pros: string;
    cons: string;
    estimatedCost: string;
  }[];
  options?: string[];
  chosenOption?: string;
  decision?: string;
  rationale: string;
  date: string;
  owner: string;
  outcomeMetric?: string;
  retrospectiveStatus?: 'Validated' | 'Monitoring' | 'Reversed';
  linkedPrdId?: string;
  signoffs?: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category?: 'PRD' | 'Strategy' | 'User Research' | 'Meeting' | 'Launch Playbook' | string;
  type?: string;
  author: string;
  lastEdited?: string;
  updatedAt?: string;
  version?: string;
  tags: string[];
  readTime?: string;
  excerpt?: string;
  content?: string;
}

export interface WorkspaceConfig {
  name: string;
  role: 'Founder' | 'Product Manager' | 'AI PM' | 'Product Lead' | 'Designer' | 'Engineer' | 'Researcher';
  productType: 'AI Product' | 'Fintech' | 'B2B SaaS' | 'Mobile App' | 'Marketplace';
  workspaceMode: 'Solo PM' | 'Team' | 'Enterprise';
  aiPmMode: boolean;
  enabledModules: NavigationTab[];
  aiPersonality: 'Concise' | 'Balanced' | 'Detailed';
  decisionStyle: 'Conservative' | 'Balanced' | 'Aggressive';
  riskTolerance: number;
  isDemoMode: boolean;
  todayFocus: { id: string; text: string; completed: boolean }[];
}
