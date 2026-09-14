import type { NavigationTab } from '../../../types/argus';

export type SignalCategory = 'product' | 'users' | 'market';
export type SignalStatus = 'healthy' | 'warning' | 'critical';
export type Severity = 'info' | 'warning' | 'critical';
export type OutputType = 'opportunity' | 'decision' | 'prd' | 'experiment';

export interface SignalSource {
  id: string;
  name: string;
  category: SignalCategory;
  metric: string;
  status: SignalStatus;
  value: string;
  anomalyDelta?: string;
  confidence?: number;
  description?: string;
}

export interface SignalEvent {
  id: string;
  timestamp: string;
  sourceId: string;
  title: string;
  value: string;
  severity: Severity;
}

export interface IntelligenceOutput {
  id: string;
  type: OutputType;
  title: string;
  code: string;
  subtitle?: string;
  confidence?: number;
  route: string;
  tab: NavigationTab;
}

export const INITIAL_SIGNAL_SOURCES: SignalSource[] = [
  {
    id: 'src-payments',
    name: 'Payments',
    category: 'product',
    metric: '1.42M txns/day',
    status: 'critical',
    value: '1.42M txns/day',
    anomalyDelta: '+18.4%',
    confidence: 94,
    description: 'Payment switch failover latency exceeding standard nominal threshold',
  },
  {
    id: 'src-transactions',
    name: 'Transactions',
    category: 'product',
    metric: '18.4K vol',
    status: 'healthy',
    value: '18.4K vol',
    anomalyDelta: '+1.2%',
    confidence: 88,
    description: 'Settlement pipeline velocity operating within target variance',
  },
  {
    id: 'src-support',
    name: 'Support',
    category: 'users',
    metric: '47 users',
    status: 'healthy',
    value: '47 users',
    anomalyDelta: '-3.1%',
    confidence: 85,
    description: 'Ticket cluster regarding recovery notifications and receipt status',
  },
  {
    id: 'src-retention',
    name: 'Retention',
    category: 'users',
    metric: '61.2% WAU',
    status: 'healthy',
    value: '61.2% WAU',
    anomalyDelta: '+0.4%',
    confidence: 91,
    description: 'Day-30 cohort retention holding above target baseline',
  },
  {
    id: 'src-feedback',
    name: 'Feedback',
    category: 'users',
    metric: '520 reports/wk',
    status: 'healthy',
    value: '520 reports/wk',
    anomalyDelta: '+14.2%',
    confidence: 89,
    description: 'Semantic cluster on multi-step checkout navigation friction',
  },
  {
    id: 'src-competitor',
    name: 'Competitor',
    category: 'market',
    metric: 'Superhuman v2',
    status: 'healthy',
    value: 'Superhuman v2',
    anomalyDelta: 'NEW RELEASE',
    confidence: 82,
    description: 'Competitor launched sub-second command palette with triage',
  },
];

export const INITIAL_OUTPUTS: IntelligenceOutput[] = [
  {
    id: 'out-opportunity',
    type: 'opportunity',
    title: 'Opportunity',
    code: '#014',
    subtitle: 'Zero-friction checkout failover',
    confidence: 94,
    route: '#/opportunities',
    tab: 'opportunities',
  },
  {
    id: 'out-decision',
    type: 'decision',
    title: 'Decision',
    code: 'ADR-041',
    subtitle: 'ClickHouse telemetry columnar migration',
    confidence: 91,
    route: '#/decisions',
    tab: 'decisions',
  },
  {
    id: 'out-prd',
    type: 'prd',
    title: 'Spec',
    code: 'Checkout redesign',
    subtitle: 'Autonomous PRD & Gherkin user stories',
    confidence: 89,
    route: '#/prds',
    tab: 'prds',
  },
  {
    id: 'out-experiment',
    type: 'experiment',
    title: 'Experiment',
    code: '#104',
    subtitle: 'Instant POS routing circuit breaker',
    confidence: 92,
    route: '#/experiments',
    tab: 'experiments',
  },
];

export const INITIAL_EVENTS: SignalEvent[] = [
  {
    id: 'ev-1',
    timestamp: '10:21:56',
    sourceId: 'src-payments',
    title: 'Payment spike',
    value: '+18.4%',
    severity: 'critical',
  },
  {
    id: 'ev-2',
    timestamp: '10:21:52',
    sourceId: 'src-feedback',
    title: 'Feedback cluster',
    value: '520 reports',
    severity: 'warning',
  },
  {
    id: 'ev-3',
    timestamp: '10:21:48',
    sourceId: 'src-retention',
    title: 'Retention signal',
    value: 'HIGH',
    severity: 'info',
  },
  {
    id: 'ev-4',
    timestamp: '10:21:43',
    sourceId: 'src-support',
    title: 'Support cluster',
    value: '47 users',
    severity: 'info',
  },
];
