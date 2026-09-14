import type { SignalEvent, SignalSourceNode, DownstreamNode, SignalMetrics } from './signalTypes';

export interface ISignalProvider {
  subscribe(listener: (event: SignalEvent) => void): () => void;
  getMetrics(): SignalMetrics;
  getSources(): SignalSourceNode[];
  getDownstream(): DownstreamNode[];
  isSimulating(): boolean;
  toggleSimulation(): void;
  getLatestEvents(count?: number): SignalEvent[];
}

export const SIGNAL_SOURCES: SignalSourceNode[] = [
  {
    id: 'payments',
    name: 'PAYMENTS',
    category: 'NPCI / PG',
    rate: '1.42M txns/d',
    status: 'anomaly',
    description: 'Timeout rates increased on UPI fallback route in APAC',
    confidence: 92,
    lastEventTime: '08:42:16',
    yRatio: 0.12,
  },
  {
    id: 'transactions',
    name: 'TRANSACTIONS',
    category: 'ClickHouse',
    rate: '18.4Cr vol',
    status: 'normal',
    description: 'High-volume transaction streams operating within latency bounds',
    confidence: 98,
    lastEventTime: '08:42:11',
    yRatio: 0.28,
  },
  {
    id: 'support',
    name: 'SUPPORT',
    category: 'Zendesk',
    rate: '47 user cluster',
    status: 'high',
    description: 'User complaints clustering on manual PRD and BDD specification writing',
    confidence: 89,
    lastEventTime: '08:41:59',
    yRatio: 0.44,
  },
  {
    id: 'retention',
    name: 'RETENTION',
    category: 'Segment Cohort',
    rate: '61.2% W4',
    status: 'normal',
    description: 'Returning power user retention up +5.1% after cockpit release',
    confidence: 94,
    lastEventTime: '08:41:45',
    yRatio: 0.60,
  },
  {
    id: 'feedback',
    name: 'FEEDBACK',
    category: 'App Store / CSAT',
    rate: '520 reports/wk',
    status: 'high',
    description: 'Theme "Checkout Fallback" highlighted in 74% of enterprise interviews',
    confidence: 91,
    lastEventTime: '08:41:30',
    yRatio: 0.76,
  },
  {
    id: 'competitor',
    name: 'COMPETITOR',
    category: 'Radar Feed',
    rate: 'Superhuman v2',
    status: 'high',
    description: 'Superhuman deployed automated AI triage for power teams',
    confidence: 86,
    lastEventTime: '08:40:55',
    yRatio: 0.90,
  },
];

export const DOWNSTREAM_NODES: DownstreamNode[] = [
  {
    id: 'opportunity',
    name: 'OPPORTUNITIES',
    label: 'Opportunity #014',
    tab: 'opportunities',
    description: 'Zero-friction checkout fallback (+₹32L ARR)',
    yRatio: 0.16,
  },
  {
    id: 'decision',
    name: 'DECISIONS',
    label: 'Decision ADR-041',
    tab: 'decisions',
    description: 'ClickHouse Columnar Migration Sign-off',
    yRatio: 0.38,
  },
  {
    id: 'prd',
    name: 'SPECS / PRD',
    label: 'PRD Studio',
    tab: 'prds',
    description: 'Autonomous BDD scenario generation spec',
    yRatio: 0.62,
  },
  {
    id: 'experiment',
    name: 'EXPERIMENTS',
    label: 'A/B Exp #104',
    tab: 'experiments',
    description: 'Instant POS routing reaching 99.2% stat sig',
    yRatio: 0.84,
  },
];

export const SEED_EVENTS: SignalEvent[] = [
  {
    id: 'sig-001',
    sourceId: 'payments',
    sourceName: 'PAYMENTS',
    timestamp: '08:42:16',
    type: 'ANOMALY DETECTED',
    severity: 'high',
    confidence: 0.92,
    impact: 'HIGH (+$320k ARR)',
    destination: 'opportunities',
    title: 'Payment spike +18.4%',
    metricDelta: '+18.4%',
    usersAffected: '18.2K returning users',
    evidence: [
      '3 independent telemetry signals in Razorpay UPI flow',
      'Timeout rate elevated from 0.4% to 2.8% at peak checkout',
      '47 matching customer feedback tickets in Zendesk',
    ],
    description:
      'Payment increase and timeout clustering concentrated in returning users following the latest checkout release.',
  },
  {
    id: 'sig-002',
    sourceId: 'retention',
    sourceName: 'RETENTION',
    timestamp: '08:42:11',
    type: 'COHORT LIFT',
    severity: 'medium',
    confidence: 0.94,
    impact: 'MODERATE (+5.1% W4)',
    destination: 'roadmap',
    title: 'Retention signal HIGH',
    metricDelta: '+5.1%',
    usersAffected: '3,420 PM power users',
    evidence: [
      'Daily Active User engagement up 28 min/day average',
      'PRD generation frequency increased 2.4x MoM',
    ],
    description:
      'Returning power users showing elevated retention correlation with autonomous PRD Studio adoption.',
  },
  {
    id: 'sig-003',
    sourceId: 'support',
    sourceName: 'SUPPORT',
    timestamp: '08:42:04',
    type: 'CLUSTERING',
    severity: 'high',
    confidence: 0.89,
    impact: 'HIGH',
    destination: 'prds',
    title: 'SUPPORT CLUSTER (47 users)',
    metricDelta: '47 users',
    usersAffected: 'Enterprise PM teams',
    evidence: [
      'Top phrase: "Manual BDD scenarios taking 3 hours per sprint"',
      'CSAT score degraded -4 pts in enterprise cohort',
    ],
    description:
      'Enterprise PMs requesting automated Gherkin BDD scenario compilation directly from opportunity trees.',
  },
  {
    id: 'sig-004',
    sourceId: 'competitor',
    sourceName: 'COMPETITOR',
    timestamp: '08:41:59',
    type: 'MARKET MOVE',
    severity: 'medium',
    confidence: 0.86,
    impact: 'STRATEGIC',
    destination: 'intelligence',
    title: 'COMPETITOR MOVE DETECTED',
    metricDelta: 'Superhuman v2',
    usersAffected: 'Market positioning',
    evidence: [
      'Changelog update detected at 07:30 UTC',
      'Launched AI Smart Triage targeting product teams',
    ],
    description:
      'Superhuman deployed automated email triage. Opportunity exists to counter-position with deep telemetry integration.',
  },
  {
    id: 'sig-005',
    sourceId: 'feedback',
    sourceName: 'FEEDBACK',
    timestamp: '08:41:52',
    type: 'USER THEME',
    severity: 'high',
    confidence: 0.91,
    impact: 'HIGH (₹42L at risk)',
    destination: 'customers',
    title: 'FEEDBACK THEME "CHECKOUT"',
    metricDelta: '74% share',
    usersAffected: '14 enterprise accounts',
    evidence: [
      '14 enterprise customers submitted feedback on fine-print exclusions',
      'Negative review sentiment up 12% on gateway retry failures',
    ],
    description:
      'Fine-print exclusions on reward cards leading to merchant checkout abandonment and user churn.',
  },
];

class DemoSignalProvider implements ISignalProvider {
  private listeners: Set<(event: SignalEvent) => void> = new Set();
  private events: SignalEvent[] = [...SEED_EVENTS];
  private isRunning: boolean = true;
  private intervalId: any = null;

  constructor() {
    this.startSimulation();
  }

  private startSimulation() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.isRunning) return;

      const randomSource = SIGNAL_SOURCES[Math.floor(Math.random() * SIGNAL_SOURCES.length)];
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];

      const newEvent: SignalEvent = {
        id: 'sig-' + Date.now(),
        sourceId: randomSource.id,
        sourceName: randomSource.name,
        timestamp: timeStr,
        type: randomSource.status === 'anomaly' ? 'ANOMALY DETECTED' : 'SIGNAL DETECTED',
        severity: randomSource.status === 'anomaly' ? 'high' : 'medium',
        confidence: randomSource.confidence / 100,
        impact: 'Calculated in real time',
        destination: randomSource.id === 'payments' ? 'opportunities' : randomSource.id === 'support' ? 'prds' : 'intelligence',
        title: `${randomSource.name} EVENT · ${randomSource.rate}`,
        metricDelta: '+14.2%',
        usersAffected: 'Active cohorts',
        evidence: [
          `Live ingestion from ${randomSource.category}`,
          'Automated Bayesian filter matched historical correlation',
        ],
        description: randomSource.description,
      };

      this.events = [newEvent, ...this.events.slice(0, 19)];
      this.listeners.forEach((listener) => listener(newEvent));
    }, 4500);
  }

  subscribe(listener: (event: SignalEvent) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  getMetrics(): SignalMetrics {
    return {
      activeStreams: 6,
      eventsPerDay: '4.2M',
      latencyMs: 17,
      healthPercent: 99.98,
      status: 'SIMULATION',
    };
  }

  getSources(): SignalSourceNode[] {
    return SIGNAL_SOURCES;
  }

  getDownstream(): DownstreamNode[] {
    return DOWNSTREAM_NODES;
  }

  isSimulating(): boolean {
    return this.isRunning;
  }

  toggleSimulation(): void {
    this.isRunning = !this.isRunning;
  }

  getLatestEvents(count: number = 5): SignalEvent[] {
    return this.events.slice(0, count);
  }
}

export const signalProvider = new DemoSignalProvider();
