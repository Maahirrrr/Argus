export type NavigationTab =
  | 'landing'
  | 'overview'
  | 'insights'
  | 'opportunities'
  | 'prioritize'
  | 'prds'
  | 'experiments'
  | 'analytics'
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
