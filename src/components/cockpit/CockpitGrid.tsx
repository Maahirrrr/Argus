import React, { useState } from 'react';
import {
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  GitPullRequest,
  ChevronRight,
  Sparkles,
  Layers,
  Activity,
  Sliders
} from 'lucide-react';
import { CockpitHeader } from './CockpitHeader';
import { CockpitDrawer, type CockpitDrawerData } from './CockpitDrawer';
import { CockpitCustomizer, DEFAULT_CARDS, type CockpitCardConfig } from './CockpitCustomizer';
import type { NavigationTab } from '../../types/argus';

interface CockpitGridProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal?: (signalId: string) => void;
  onOpenChaosSimulator?: () => void;
}

interface SignalTableRow {
  id: string;
  name: string;
  source: string;
  type: string;
  severity: 'critical' | 'warning' | 'normal';
  delta: string;
  affected: string;
  conviction: number;
  evidence: string;
}

const SIGNALS_TABLE_DATA: SignalTableRow[] = [
  {
    id: 'SIG-884',
    name: 'HDFC UPI Switch Latency Spike',
    source: 'Payment Switch',
    type: 'Timeout Anomaly',
    severity: 'critical',
    delta: '+18.4% failure',
    affected: '14,200 txns',
    conviction: 94,
    evidence: '52% failure concentration in HDFC UPI switch timeout queues during 8-10 PM spike.',
  },
  {
    id: 'SIG-792',
    name: 'Refund Webhook Callback Queue Lag',
    source: 'Razorpay Webhook',
    type: 'Queue Congestion',
    severity: 'warning',
    delta: '+21.0% delay',
    affected: '3,840 txns',
    conviction: 88,
    evidence: 'Worker thread starvation on secondary webhook receiver pool causing 45s ack lag.',
  },
  {
    id: 'SIG-651',
    name: 'Android 15 Biometric Callback Drop',
    source: 'Mobile Client',
    type: 'SDK Crash / Drop',
    severity: 'critical',
    delta: '+12.2% drop',
    affected: '2,190 users',
    conviction: 91,
    evidence: 'CryptoObject signature verification null pointer exception on Pixel/Samsung devices.',
  },
  {
    id: 'SIG-518',
    name: 'SmartBuy Instant Reward Sync Delay',
    source: 'Loyalty Engine',
    type: 'Ledger Drift',
    severity: 'normal',
    delta: '+3.1% latency',
    affected: '850 users',
    conviction: 79,
    evidence: 'Async event log lag between core transaction db and loyalty partner API.',
  },
  {
    id: 'SIG-409',
    name: 'Competitor Superhuman Instant Checkout',
    source: 'Market Intelligence',
    type: 'Feature Parity Risk',
    severity: 'warning',
    delta: '4.2s vs 11.4s',
    affected: 'Total Funnel',
    conviction: 85,
    evidence: 'Competitor rolled out 1-click biometric passkey auth across tier-1 merchants.',
  },
];

interface OpportunityLedgerItem {
  id: string;
  title: string;
  conviction: number;
  riceScore: number;
  reach: string;
  impact: string;
  status: 'PRD Ready' | 'In Experiment' | 'Review Required';
  tags: string[];
  prdId?: string;
}

const OPPORTUNITIES_LEDGER: OpportunityLedgerItem[] = [
  {
    id: 'OPP-014',
    title: 'Autonomous Multi-Switch Fallback & Circuit Breaker',
    conviction: 94,
    riceScore: 74.6,
    reach: '180K txns/wk',
    impact: '₹4.2Cr GMV saved',
    status: 'PRD Ready',
    tags: ['Core Payments', 'Reliability'],
    prdId: 'PRD-014',
  },
  {
    id: 'OPP-009',
    title: 'Passkey & Biometric Zero-Friction MPIN Flow',
    conviction: 88,
    riceScore: 68.2,
    reach: '95K users/wk',
    impact: '+3.4% checkout CR',
    status: 'In Experiment',
    tags: ['Mobile UX', 'Activation'],
    prdId: 'PRD-009',
  },
  {
    id: 'OPP-004',
    title: 'Real-Time SmartBuy Point Reconciliation',
    conviction: 82,
    riceScore: 59.4,
    reach: '42K users/wk',
    impact: '-28% support load',
    status: 'Review Required',
    tags: ['Loyalty', 'Retention'],
    prdId: 'PRD-004',
  },
];

export const CockpitGrid: React.FC<CockpitGridProps> = ({
  onNavigateTab,
  onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [drawerData, setDrawerData] = useState<CockpitDrawerData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter state for operational table
  const [activeSignalFilter, setActiveSignalFilter] = useState<string>('all');
  const [timelineRange, setTimelineRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Cards layout configuration persisted in localStorage
  const [cards, setCards] = useState<CockpitCardConfig[]>(() => {
    try {
      const saved = localStorage.getItem('argus_cockpit_cards');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_CARDS;
  });

  const [density, setDensity] = useState<'compact' | 'balanced' | 'comfortable'>(() => {
    return (localStorage.getItem('argus_density') as any) || 'balanced';
  });

  const handleToggleCardVisibility = (id: string) => {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, visible: !c.visible } : c));
      localStorage.setItem('argus_cockpit_cards', JSON.stringify(next));
      return next;
    });
  };

  const handleToggleCardPin = (id: string) => {
    setCards((prev) => {
      const next = prev.map((c) => (c.id === id ? { ...c, pinned: !c.pinned } : c));
      localStorage.setItem('argus_cockpit_cards', JSON.stringify(next));
      return next;
    });
  };

  const handleResetLayout = () => {
    setCards(DEFAULT_CARDS);
    localStorage.removeItem('argus_cockpit_cards');
  };

  const handleSelectDensity = (d: 'compact' | 'balanced' | 'comfortable') => {
    setDensity(d);
    localStorage.setItem('argus_density', d);
    document.body.classList.remove('density-compact', 'density-balanced', 'density-comfortable');
    document.body.classList.add(`density-${d}`);
  };

  const openDrawerWithData = (data: CockpitDrawerData) => {
    setDrawerData(data);
    setIsDrawerOpen(true);
  };

  const filteredSignals = activeSignalFilter === 'all'
    ? SIGNALS_TABLE_DATA
    : SIGNALS_TABLE_DATA.filter((s) => s.severity === activeSignalFilter || s.source.toLowerCase().includes(activeSignalFilter));

  return (
    <div className="max-w-7xl mx-auto space-y-4 select-none pb-12">
      {/* 1. Cockpit Header */}
      <CockpitHeader
        onRefresh={() => {}}
        onToggleCustomize={() => setIsCustomizing(true)}
        isCustomizing={isCustomizing}
        onOpenChaosSimulator={onOpenChaosSimulator}
      />

      {/* 2. Flush 88px Horizontal KPI Strip with Vertical Dividers */}
      <section className="w-full min-h-[88px] flex flex-col sm:flex-row rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
        {/* Cell 1: Active Signals */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'signal',
              title: 'Active Telemetry Signals',
              subtitle: '124 correlated events flagged across ClickHouse pipeline.',
              category: 'Telemetry Anomaly',
              metrics: [
                { label: 'Active Signals', value: '124' },
                { label: 'Critical Severity', value: '4' },
                { label: 'Ingestion Rate', value: '8.4k/sec' },
                { label: 'P99 Latency', value: '142ms' },
              ],
              evidence: [
                'Drop in UPI success rate on secondary payment gateway (HDFC switch).',
                'Surge in checkout latency during evening 8-10 PM transaction spike.',
                '342 verified users encountered unexpected session timeout.',
              ],
              payload: {
                cluster_id: 'sig_cluster_091',
                source: 'sentry_clickhouse',
                metric_deviation: '+18.4%',
                status: 'INVESTIGATING',
              },
              targetTab: 'signals',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Active signals
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+18.4%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              124
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              4 anomalies flagged today
            </span>
          </div>
        </div>

        {/* Cell 2: Opportunity Conviction */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'opportunity',
              title: 'Opportunity Conviction Index',
              subtitle: '92% weighted average conviction across backlog items.',
              category: 'Strategic Prioritization',
              metrics: [
                { label: 'High Conviction', value: '8' },
                { label: 'Expected ARR', value: '₹14.6Cr' },
                { label: 'Confidence', value: '92%' },
                { label: 'Review Stage', value: 'Quarterly' },
              ],
              evidence: [
                'Strong cross-channel support ticket volume validating checkout friction.',
                'Competitor analysis demonstrates instant-settlement standard adoption.',
                'Quantitative churn surveys cite payment timeout as top abandonment factor.',
              ],
              targetTab: 'opportunities',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Opportunity conviction
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+4.1%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              92%
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              19 opportunities active
            </span>
          </div>
        </div>

        {/* Cell 3: Product Health */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'health',
              title: 'Product Health Architecture',
              subtitle: 'Continuous health telemetry across core user journeys.',
              category: 'Core Telemetry',
              metrics: [
                { label: 'Overall Score', value: '82/100' },
                { label: 'Acquisition', value: '88/100' },
                { label: 'Activation', value: '76/100' },
                { label: 'Retention', value: '84/100' },
              ],
              evidence: [
                'Acquisition funnel is performing within top decile benchmarks.',
                'Activation step requires MPIN flow simplification to reach >85 score.',
                'D30 Retention rate remains stable at 44.2%.',
              ],
              targetTab: 'analytics',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              Product health
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-green)]">
              <TrendingUp className="w-2.5 h-2.5" />
              <span>+1.2%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              82/100
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              Across 4 critical pillars
            </span>
          </div>
        </div>

        {/* Cell 4: System Availability & Throughput */}
        <div
          onClick={() =>
            openDrawerWithData({
              type: 'generic',
              title: 'Telemetry Infrastructure Availability',
              subtitle: '4.2M events ingested past 24h with zero event loss.',
              category: 'Infrastructure SLA',
              metrics: [
                { label: 'Availability', value: '99.98%' },
                { label: 'P99 Latency', value: '142ms' },
                { label: 'Failover SLA', value: 'Sub-450ms' },
                { label: 'Audit Compliance', value: 'SOC2 Type II' },
              ],
              evidence: [
                'ClickHouse cluster healthy: 12 nodes reporting 0 dropped partitions.',
                'Zero PII retention policy strictly enforced on tokenization boundary.',
              ],
              targetTab: 'analytics',
            })
          }
          className="flex-1 p-4 sm:py-4 sm:px-6 flex flex-col justify-between hover:bg-[var(--surface-2)] transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
              System availability
            </span>
            <div className="flex items-center gap-1 text-[11px] font-medium font-sans text-[var(--signal-blue)]">
              <span>99.98%</span>
            </div>
          </div>
          <div className="flex items-baseline justify-between mt-2">
            <span className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
              142<span className="text-sm font-normal text-[#8A8A8A]">ms</span>
            </span>
            <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
              P99 global latency
            </span>
          </div>
        </div>
      </section>

      {/* 3. STRUCTURAL PRIMITIVE 1: Horizontal Telemetry Anomaly Timeline / Sparkline */}
      <section className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
              Telemetry Ingestion & Failure Rate Timeline
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
              / 4.2M events · ClickHouse hourly aggregate
            </span>
          </div>

          <div className="flex items-center gap-2">
            {(['24h', '7d', '30d'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimelineRange(r)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-[2px] cursor-pointer transition-colors ${
                  timelineRange === r
                    ? 'bg-[#1D1D1D] text-[#F5F5F0] border border-[#333]'
                    : 'text-[#666] hover:text-[#AAA]'
                }`}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Real Anomaly Timeline Chart Visualization */}
        <div className="relative w-full h-[120px] bg-[#070707] border border-[#171717] rounded-[3px] p-3 flex flex-col justify-between overflow-hidden">
          {/* Subtle Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-20">
            <div className="w-full h-px bg-[#333]" />
            <div className="w-full h-px bg-[#333]" />
            <div className="w-full h-px bg-[#333]" />
          </div>

          {/* SVG Sparkline Curve */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="failureGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 90 Q 150 85, 300 88 T 450 82 T 550 40 T 600 25 T 650 45 T 750 80 T 900 82 L 1000 85 L 1000 120 L 0 120 Z"
              fill="url(#failureGrad)"
            />
            <path
              d="M 0 90 Q 150 85, 300 88 T 450 82 T 550 40 T 600 25 T 650 45 T 750 80 T 900 82 L 1000 85"
              fill="none"
              stroke="#EF4444"
              strokeWidth="1.8"
            />
            {/* Baseline Normal Volume */}
            <path
              d="M 0 105 Q 200 100, 400 102 T 700 98 T 1000 100"
              fill="none"
              stroke="#0066FF"
              strokeWidth="1"
              strokeDasharray="3 3"
              strokeOpacity="0.5"
            />
          </svg>

          {/* Annotated Incident Flags on Timeline */}
          <div className="relative z-10 flex items-start justify-between text-[9px] font-mono text-[#666]">
            <span>00:00</span>
            <span>06:00</span>
            <div
              onClick={() =>
                openDrawerWithData({
                  type: 'signal',
                  title: 'HDFC UPI Switch Latency Spike (14:22)',
                  subtitle: '52% failure concentration in HDFC UPI switch timeout queues.',
                  category: 'Critical Anomaly',
                  metrics: [
                    { label: 'Timestamp', value: '14:22:04 IST' },
                    { label: 'Failure Rate', value: '18.4%' },
                    { label: 'P99 Latency', value: '14.2s' },
                    { label: 'Impacted GMV', value: '₹4.2Cr' },
                  ],
                  evidence: [
                    'Switch queue backlog crossed 10,000 threshold.',
                    'Connection pool exhaustion on secondary gateway.',
                  ],
                  targetTab: 'signals',
                })
              }
              className="bg-[#141414] border border-[#EF4444] px-2 py-0.5 rounded text-[#EF4444] font-bold cursor-pointer hover:bg-[#1E1E1E] transition-colors"
            >
              ● 14:22 HDFC SPIKE (+18.4%)
            </div>
            <span>18:00</span>
            <span>23:59</span>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-[#8A8A8A] pt-4">
            <span className="text-[#EF4444] font-semibold">Peak Anomaly: 18.4% Failure @ 14:22</span>
            <span className="text-[#0066FF]">Baseline: 0.12% failure · Mean P99: 142ms</span>
          </div>
        </div>
      </section>

      {/* 4. STRUCTURAL PRIMITIVE 2: Active Signals Operational Table */}
      <section className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-[#EF4444]" />
            <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
              Active Signals Operational Table
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              ({filteredSignals.length} filtered / 124 total)
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Signals' },
              { id: 'critical', label: 'Critical (2)' },
              { id: 'warning', label: 'Warnings (2)' },
              { id: 'payment', label: 'Gateways' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveSignalFilter(f.id)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-[3px] cursor-pointer transition-colors whitespace-nowrap ${
                  activeSignalFilter === f.id
                    ? 'bg-[#1B1B1B] text-[#F5F5F0] border border-[#333] font-semibold'
                    : 'text-[#777] hover:text-[#AAA] bg-transparent'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tabular Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#1A1A1A] text-[10px] text-[#555] uppercase tracking-wider">
                <th className="py-2 px-3 font-semibold">SIGNAL / STREAM</th>
                <th className="py-2 px-3 font-semibold">CLASSIFICATION</th>
                <th className="py-2 px-3 font-semibold">METRIC DELTA</th>
                <th className="py-2 px-3 font-semibold">AFFECTED</th>
                <th className="py-2 px-3 font-semibold">CONVICTION</th>
                <th className="py-2 px-3 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#141414]">
              {filteredSignals.map((sig) => (
                <tr
                  key={sig.id}
                  className="hover:bg-[#0D0D0D] transition-colors group cursor-pointer"
                  onClick={() =>
                    openDrawerWithData({
                      type: 'signal',
                      title: sig.name,
                      subtitle: sig.evidence,
                      category: sig.source,
                      conviction: sig.conviction,
                      metrics: [
                        { label: 'Signal ID', value: sig.id },
                        { label: 'Deviation', value: sig.delta },
                        { label: 'Affected Users/Txns', value: sig.affected },
                        { label: 'Conviction', value: `${sig.conviction}%` },
                      ],
                      evidence: [sig.evidence],
                      targetTab: 'signals',
                    })
                  }
                >
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-[#F5F5F0] group-hover:text-[#0066FF] transition-colors flex items-center gap-1.5">
                      <span className="text-[10px] text-[#0066FF]">{sig.id}</span>
                      <span className="truncate max-w-[200px] sm:max-w-xs">{sig.name}</span>
                    </div>
                    <div className="text-[10px] text-[#525252]">{sig.source}</div>
                  </td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`inline-block px-1.5 py-0.5 rounded-[2px] text-[9px] uppercase font-bold border ${
                        sig.severity === 'critical'
                          ? 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                          : sig.severity === 'warning'
                          ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                          : 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                      }`}
                    >
                      {sig.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-[#EF4444] font-bold">{sig.delta}</td>
                  <td className="py-2.5 px-3 text-[#A3A3A3]">{sig.affected}</td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[#10B981] font-bold">{sig.conviction}%</span>
                      <div className="w-12 h-1.5 bg-[#1C1C1C] rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="h-full bg-[#10B981]"
                          style={{ width: `${sig.conviction}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onInvestigateSignal) {
                          onInvestigateSignal(sig.id);
                        } else {
                          onNavigateTab('signals');
                        }
                      }}
                      className="px-2 py-1 rounded-[2px] bg-[#141414] hover:bg-[#1E1E1E] border border-[#2D2D2D] text-[10px] text-[#F5F5F0] hover:text-[#0066FF] transition-colors cursor-pointer"
                    >
                      Investigate →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. STRUCTURAL PRIMITIVE 3: Split-Pane Command Row (Opportunity Ledger + Causal Sentry) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column (7 cols): Opportunity & Decision Queue Ledger */}
        <section className="lg:col-span-7 p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
                  Ranked Opportunity Ledger
                </span>
                <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
                  / Sorted by Conviction & RICE
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab('opportunities')}
                className="text-[11px] font-mono text-[#0066FF] hover:underline cursor-pointer"
              >
                View all 19 →
              </button>
            </div>

            <div className="space-y-2 mt-3">
              {OPPORTUNITIES_LEDGER.map((opp) => (
                <div
                  key={opp.id}
                  onClick={() =>
                    openDrawerWithData({
                      type: 'opportunity',
                      title: opp.title,
                      subtitle: `${opp.reach} · ${opp.impact}`,
                      category: 'Product Opportunity',
                      conviction: opp.conviction,
                      metrics: [
                        { label: 'RICE Score', value: opp.riceScore.toString() },
                        { label: 'Reach', value: opp.reach },
                        { label: 'Impact', value: opp.impact },
                        { label: 'Status', value: opp.status },
                      ],
                      evidence: [
                        'Correlated against 14,200 payment switch failure events.',
                        'Validated by Zendesk checkout issue reports.',
                      ],
                      targetTab: 'opportunities',
                    })
                  }
                  className="p-3 rounded-[3px] bg-[#0A0A0A] border border-[#1B1B1B] hover:border-[#0066FF]/60 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-mono">
                      <span className="font-bold text-[#0066FF]">{opp.id}</span>
                      <span className="text-[#555]">|</span>
                      <span className="text-[#888]">{opp.tags.join(' · ')}</span>
                      <span className="text-[#10B981] font-bold">RICE {opp.riceScore}</span>
                    </div>
                    <div className="text-xs font-bold text-[#F5F5F0] font-display">
                      {opp.title}
                    </div>
                    <div className="text-[10px] font-mono text-[#666]">
                      Reach: {opp.reach} · Impact: {opp.impact}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <span className="px-2 py-0.5 rounded-[2px] bg-[#121212] border border-[#262626] text-[10px] font-mono text-[#AAA]">
                      {opp.status}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateTab('prds');
                      }}
                      className="px-2 py-1 rounded-[2px] bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/40 text-[10px] font-mono text-[#0066FF] cursor-pointer"
                    >
                      PRD Spec →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#191919] flex items-center justify-between text-[11px] font-mono text-[#666]">
            <span>Conviction threshold: ≥ 80% for sprint commitment</span>
            <button
              onClick={() => onNavigateTab('prioritize')}
              className="text-[#F5F5F0] hover:text-[#0066FF] flex items-center gap-1 cursor-pointer"
            >
              <span>Open Prioritize Workbench</span>
              <ArrowRight className="w-3 h-3 text-[#0066FF]" />
            </button>
          </div>
        </section>

        {/* Right Column (5 cols): Live Causal Deduction & Anomaly Sentry */}
        <section className="lg:col-span-5 p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0066FF]" />
                <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
                  Argus Causal Deduction Sentry
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#10B981] font-bold">● ACTIVE</span>
            </div>

            {/* Causal Chain Card */}
            <div className="mt-3 p-3.5 rounded-[3px] bg-[#0A0A0A] border border-[#222] space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#888] uppercase">CORRELATED INCIDENT</span>
                <span className="text-[#EF4444] font-bold">94% Causal Confidence</span>
              </div>
              <p className="text-xs font-bold text-[#F5F5F0] leading-snug">
                Checkout Abandonment Spike correlated with HDFC Acquiring Switch Timeouts
              </p>

              {/* Deductive Evidence Steps */}
              <div className="space-y-1.5 text-[11px] font-mono pt-1 text-[#AAA]">
                <div className="flex items-start gap-1.5">
                  <span className="text-[#0066FF] font-bold">01</span>
                  <span>14,200 switch timeouts logged in ClickHouse telemetry buffer.</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#0066FF] font-bold">02</span>
                  <span>Zendesk support tickets spiked +34% with query "bank deducted money".</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <span className="text-[#0066FF] font-bold">03</span>
                  <span>Zero code changes deployed in last 48h; upstream gateway issue confirmed.</span>
                </div>
              </div>

              {/* Prescribed PM Action */}
              <div className="p-2.5 rounded-[2px] bg-[#121212] border border-[#1E1E1E] mt-2">
                <span className="text-[10px] font-mono text-[#555] block uppercase">Recommended PM Action</span>
                <span className="text-xs font-mono text-[#10B981] font-semibold block mt-0.5">
                  Promote OPP-014: Deploy multi-switch fallback circuit breaker
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#191919] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('prds')}
              className="flex-1 py-2 rounded-[2px] bg-[#0066FF] hover:bg-[#0055D4] text-white text-xs font-mono font-semibold text-center transition-colors cursor-pointer"
            >
              Open PRD Spec →
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('intelligence')}
              className="py-2 px-3 rounded-[2px] bg-[#141414] hover:bg-[#1E1E1E] border border-[#2D2D2D] text-xs font-mono text-[#AAA] transition-colors cursor-pointer"
            >
              Inspect Graph
            </button>
          </div>
        </section>
      </div>

      {/* 6. STRUCTURAL PRIMITIVE 4: Roadmap Dependency & Release Matrix */}
      <section className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
              Quarterly Roadmap & Dependency Matrix
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)]">
              / Q1-Q2 Execution Pipeline
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('roadmap')}
            className="text-[11px] font-mono text-[#0066FF] hover:underline cursor-pointer"
          >
            Full Roadmap View →
          </button>
        </div>

        {/* Matrix Grid of Horizons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Column 1: In Flight */}
          <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[3px] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#1A1A1A] pb-1.5">
              <span className="text-[#F5F5F0] font-bold">IN FLIGHT · SPRINT 4</span>
              <span className="text-[#10B981]">2 items</span>
            </div>
            <div
              onClick={() => onNavigateTab('prds')}
              className="p-2 bg-[#0F0F0F] border border-[#222] rounded-[2px] hover:border-[#0066FF] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#0066FF]">
                <span>PRD-014</span>
                <span className="text-[#10B981]">● On Track</span>
              </div>
              <div className="text-xs font-bold text-[#F5F5F0] font-display mt-0.5">
                Gateway Circuit Breakers
              </div>
              <div className="text-[9px] font-mono text-[#666] mt-1">
                Blocker: None · PR #412 merged
              </div>
            </div>
          </div>

          {/* Column 2: Staged */}
          <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[3px] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#1A1A1A] pb-1.5">
              <span className="text-[#F5F5F0] font-bold">STAGED · SPRINT 5</span>
              <span className="text-[#F59E0B]">1 item</span>
            </div>
            <div
              onClick={() => onNavigateTab('prds')}
              className="p-2 bg-[#0F0F0F] border border-[#222] rounded-[2px] hover:border-[#0066FF] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#0066FF]">
                <span>PRD-009</span>
                <span className="text-[#F59E0B]">▲ Blocked</span>
              </div>
              <div className="text-xs font-bold text-[#F5F5F0] font-display mt-0.5">
                Passkey & Biometric Flow
              </div>
              <div className="text-[9px] font-mono text-[#EF4444] mt-1">
                Blocker: RBI 2FA Compliance Signoff
              </div>
            </div>
          </div>

          {/* Column 3: Shipping Canary */}
          <div className="p-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[3px] space-y-2">
            <div className="flex items-center justify-between text-[10px] font-mono border-b border-[#1A1A1A] pb-1.5">
              <span className="text-[#F5F5F0] font-bold">CANARY · 10% SPLIT</span>
              <span className="text-[#0066FF]">1 active</span>
            </div>
            <div
              onClick={() => onNavigateTab('experiments')}
              className="p-2 bg-[#0F0F0F] border border-[#222] rounded-[2px] hover:border-[#0066FF] cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between text-[9px] font-mono text-[#0066FF]">
                <span>EXP-04</span>
                <span className="text-[#0066FF]">● Statsig Guardrail</span>
              </div>
              <div className="text-xs font-bold text-[#F5F5F0] font-display mt-0.5">
                Real-Time POS Parser v2
              </div>
              <div className="text-[9px] font-mono text-[#10B981] mt-1">
                Latency delta: -42ms · Zero rollbacks
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STRUCTURAL PRIMITIVE 5: Live Activity & Execution Audit Stream */}
      <section className="p-4 sm:p-5 rounded-[var(--radius-md)] bg-[var(--surface-1)] border border-[var(--border-subtle)] space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <GitPullRequest className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[13px] font-bold font-sans text-[var(--text-primary)]">
              Operational Activity & Audit Stream
            </span>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] hidden sm:inline">
              / Synchronized with GitHub, Linear, ClickHouse, Statsig
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#10B981]">● Real-time sync</span>
        </div>

        {/* Monospace Audit Log entries */}
        <div className="space-y-1.5 font-mono text-xs">
          {[
            {
              time: '10:14:02',
              action: 'MERGE_PR',
              detail: 'PR #412 merged into main: "feat: autonomous switch circuit breaker retry policy"',
              actor: 'eng-lead/ananya',
              tab: 'sprints' as NavigationTab,
            },
            {
              time: '09:48:11',
              action: 'EXP_SIG',
              detail: 'Experiment EXP-04 reached 95% statistical significance (p=0.012, +3.8% CR)',
              actor: 'statsig-bot',
              tab: 'experiments' as NavigationTab,
            },
            {
              time: '08:30:00',
              action: 'INGEST',
              detail: 'ClickHouse daily partition re-indexed: 4,219,840 events processed (0 loss)',
              actor: 'system/pipeline',
              tab: 'analytics' as NavigationTab,
            },
            {
              time: '07:15:22',
              action: 'DECISION',
              detail: 'PM Mahir updated Conviction Score for OPP-014 from 86% to 94%',
              actor: 'pm/mahir',
              tab: 'decisions' as NavigationTab,
            },
          ].map((log, idx) => (
            <div
              key={idx}
              onClick={() => onNavigateTab(log.tab)}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded-[2px] bg-[#070707] hover:bg-[#111111] border border-[#161616] transition-colors cursor-pointer text-[11px] gap-1"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#555]">{log.time}</span>
                <span className="px-1.5 py-0.2 rounded bg-[#161616] text-[#0066FF] text-[9px] font-bold">
                  {log.action}
                </span>
                <span className="text-[#CCC] truncate max-w-md sm:max-w-xl">{log.detail}</span>
              </div>
              <div className="text-[10px] text-[#555] flex items-center gap-1 self-end sm:self-auto">
                <span>{log.actor}</span>
                <ChevronRight className="w-3 h-3 text-[#0066FF]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cockpit Customizer Modal */}
      <CockpitCustomizer
        isOpen={isCustomizing}
        onClose={() => setIsCustomizing(false)}
        cards={cards}
        onToggleCardVisibility={handleToggleCardVisibility}
        onToggleCardPin={handleToggleCardPin}
        onResetLayout={handleResetLayout}
        density={density}
        onSelectDensity={handleSelectDensity}
      />

      {/* Deep Dive Drawer */}
      <CockpitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        data={drawerData}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
};
