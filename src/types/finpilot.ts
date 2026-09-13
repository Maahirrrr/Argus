export type ModuleType = 
  | 'intelligence'
  | 'prioritization'
  | 'prd'
  | 'experiment'
  | 'analytics'
  | 'weekly_agent'
  | 'brain_feed';

export interface Contributor {
  label: string;
  impact: string;
  sharePercent: number;
  type: 'bank' | 'os' | 'tier' | 'time' | 'gateway';
  severity: 'critical' | 'high' | 'medium';
  detail: string;
}

export interface ProductProblem {
  id: string;
  title: string;
  metric: string;
  baseline: string;
  current: string;
  delta: string;
  status: 'critical' | 'warning' | 'resolved';
  detectedAt: string;
  scope: string;
  summary: string;
  contributors: Contributor[];
  aiRecommendation: string;
  strategicAction: string;
  defaultPrdSlug: string;
}

export interface PrioritizationInitiative {
  id: string;
  title: string;
  category: 'Reliability' | 'Growth' | 'Monetization' | 'CX' | 'Retention';
  description: string;
  reach: number; // in thousands/millions e.g. 1500 (1.5M users)
  impact: number; // 1 to 10
  confidence: number; // 1 to 10
  effort: number; // 1 to 10 (Person-weeks or sprint points)
  riceScore: number;
  iceScore: number;
  moscow: 'Must-Have' | 'Should-Have' | 'Could-Have' | "Won't-Have";
  suggestedBy: string;
  whyRanking: string;
}

export interface UserStory {
  id: string;
  title: string;
  asA: string;
  iWantTo: string;
  soThat: string;
  acceptanceCriteria: string[]; // Given / When / Then
}

export interface PRDDocument {
  id: string;
  title: string;
  author: string;
  version: string;
  lastUpdated: string;
  status: 'Draft' | 'In Review' | 'Approved' | 'Ready for Dev';
  targetRelease: string;
  problemStatement: string;
  userImpact: string;
  goals: string[];
  nonGoals: string[];
  requirements: {
    id: string;
    title: string;
    priority: 'P0' | 'P1' | 'P2';
    description: string;
  }[];
  userStories: UserStory[];
  edgeCases: {
    scenario: string;
    expectedBehavior: string;
  }[];
  successMetrics: {
    metric: string;
    current: string;
    target: string;
    window: string;
  }[];
  risksAndMitigations: {
    risk: string;
    mitigation: string;
  }[];
  rolloutPlan: {
    phase: string;
    audience: string;
    duration: string;
    exitCriteria: string;
  }[];
}

export interface ExperimentConfig {
  id: string;
  title: string;
  problemRef: string;
  hypothesis: string;
  status: 'Draft' | 'Running' | 'Concluded';
  trafficSplit: string; // e.g. "50% / 50%"
  sampleSize: string;
  estimatedDuration: string;
  variants: {
    name: string;
    type: 'Control' | 'Variant A' | 'Variant B';
    description: string;
    mockVisual: string;
  }[];
  primaryMetric: {
    name: string;
    baseline: string;
    expectedLift: string;
    mde: string;
  };
  guardrailMetrics: {
    name: string;
    threshold: string;
  }[];
  decisionFramework: {
    shipRule: string;
    killSwitch: string;
  };
}

export interface AnalyticsQueryPreset {
  id: string;
  query: string;
  category: 'conversion' | 'failures' | 'retention' | 'competitors';
  answer: string;
  chartType: 'funnel' | 'heatmap' | 'bar' | 'line';
  dataPoints: { label: string; value: number; secondary?: number }[];
}

export interface WeeklyProductReview {
  weekDate: string;
  overallHealth: 'Critical' | 'Warning' | 'Healthy';
  overallScore: number;
  executiveSummary: string;
  keyMetricShifts: {
    name: string;
    previous: string;
    current: string;
    delta: string;
    trend: 'up' | 'down';
    isGood: boolean;
  }[];
  whatMatters: {
    headline: string;
    evidence: string;
    affectedCohort: string;
  };
  rootHypothesis: string;
  recommendedExperiment: {
    title: string;
    description: string;
    expectedOutcome: string;
    effortEstimate: string;
  };
}

export interface CustomerVoiceItem {
  id: string;
  source: 'PlayStore' | 'Twitter' | 'Zendesk' | 'Interview';
  userTier: string;
  quote: string;
  sentiment: 'negative' | 'neutral' | 'positive';
  category: string;
  timeAgo: string;
  cluster: string;
}

export interface CompetitorIntel {
  competitor: 'PhonePe' | 'Google Pay' | 'Paytm' | 'CRED' | 'Razorpay';
  featureName: string;
  recentMove: string;
  impactOnUs: string;
  recommendedResponse: string;
  statusDate: string;
}
