import React, { useState } from 'react';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Terminal,
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface InteractiveProductDemoProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

interface DemoStep {
  stepNumber: number;
  stageName: string;
  badge: string;
  badgeColor: string;
  title: string;
  summary: string;
  targetTab: NavigationTab;
  tabLabel: string;
  details: {
    label: string;
    value: string;
    sub?: string;
    highlight?: boolean;
  }[];
  systemOutput: string;
  terminalCode?: string;
}

const DEMO_STEPS: DemoStep[] = [
  {
    stepNumber: 1,
    stageName: 'RAW SIGNAL',
    badge: 'ANOMALY DETECTED',
    badgeColor: 'bg-rose-950/60 text-rose-400 border border-rose-800/50',
    title: 'Payment failure surge concentrated in high-value checkout intents',
    summary: 'ClickHouse Telemetry Sentry detected an abnormal failure spike on transactions >₹10,000 between 20:14–20:36 IST.',
    targetTab: 'signals',
    tabLabel: 'Inspect in Signals Sentry',
    details: [
      { label: 'FAILURE RATE DELTA', value: '+7.4pp', sub: 'Baseline 5.8% → Current 13.2%', highlight: true },
      { label: 'AFFECTED TRANSACTIONS', value: '18,421', sub: 'Across 4,200 unique merchants' },
      { label: 'ESTIMATED AT-RISK GMV', value: '₹38.4 Lakhs', sub: 'Calculated over 22-min window' },
      { label: 'TELEMETRY SOURCE', value: 'ClickHouse Sentry', sub: 'Table: transactions_v2' },
    ],
    systemOutput: 'EVENT: Anomaly score 0.94 breaches P0 threshold. Rolling 60s window confirms server-side timeouts on primary switch.',
  },
  {
    stepNumber: 2,
    stageName: 'CAUSAL INSIGHT',
    badge: 'ROOT CAUSE ISOLATED',
    badgeColor: 'bg-amber-950/60 text-amber-400 border border-amber-800/50',
    title: 'HDFC gateway connection pool exhaustion causing cascading 504 drops',
    summary: 'Argus decomposed 14,200 failure logs: 52% clustered in HDFC switch timeout queues where response latency deteriorated from 280ms to 4,200ms.',
    targetTab: 'insights',
    tabLabel: 'Inspect Causal Decomposition',
    details: [
      { label: 'PRIMARY CONTRIBUTOR', value: 'HDFC Bank Switch', sub: '52% total error share', highlight: true },
      { label: 'P99 LATENCY DEGRADATION', value: '4,280ms', sub: 'Normal p99 baseline: 340ms' },
      { label: 'SECONDARY CLUSTER', value: 'Android 15 Client SDK', sub: '24% error share (HTTP retry bug)' },
      { label: 'CONFIDENCE LEVEL', value: '94.2%', sub: 'Deterministic causal correlation' },
    ],
    systemOutput: 'DEDUCTION: Binary TCP drop not detected. Switch is in "slow bleed" state—client connections hold for 60s before timing out.',
    terminalCode: `SELECT gateway, count() AS failures, quantile(0.99)(latency_ms) AS p99
FROM raw_payment_events WHERE status = 'FAILED' AND timestamp >= now() - INTERVAL 30 MINUTE
GROUP BY gateway ORDER BY failures DESC LIMIT 3;
-- HDFC_PRIMARY | 9,568 errs | 4,280ms p99 [52% cluster]`,
  },
  {
    stepNumber: 3,
    stageName: 'OPPORTUNITY',
    badge: 'OPPORTUNITY SIZED',
    badgeColor: 'bg-blue-950/60 text-[#0066FF] border border-[#0066FF]/40',
    title: 'Autonomous Multi-Bank Failover & Circuit Breaker Switch',
    summary: 'Direct bridge from telemetry to strategy: Argus converted the HDFC outage into high-impact Opportunity #014.',
    targetTab: 'opportunities',
    tabLabel: 'Open Opportunity Tree',
    details: [
      { label: 'OPPORTUNITY NUMBER', value: 'OPP-014', sub: 'Type: Reliability & Orchestration' },
      { label: 'ANNUALIZED RECOVERY', value: '₹1.84 Cr', sub: 'Prevented lost GMV', highlight: true },
      { label: 'SUCCESS RATE RECOVERY', value: '+3.8pp', sub: 'Restores checkout conversion to 99.2%' },
      { label: 'STRATEGIC PILLAR', value: 'Payments Resiliency', sub: 'Supports Q4 OKR #2' },
    ],
    systemOutput: 'STRATEGY LINK: Sub-second circuit breaker prevents manual war-room delay (average 34-minute historical failover lag eliminated).',
  },
  {
    stepNumber: 4,
    stageName: 'DECISION & RICE',
    badge: 'RANKED #1 IN BACKLOG',
    badgeColor: 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50',
    title: 'Prioritization Workbench: High conviction score over competing bets',
    summary: 'RICE score dynamically computed at 74.6, ranking above Refund Visibility (68.2) and Biometric Auth (54.1) due to massive reach and 95% confidence.',
    targetTab: 'prioritize',
    tabLabel: 'View RICE Workbench',
    details: [
      { label: 'REACH (USERS/QTR)', value: '82,000', sub: '82k affected checkout sessions' },
      { label: 'IMPACT MULTIPLIER', value: '8.5 / 10', sub: 'Direct GMV preservation', highlight: true },
      { label: 'CONFIDENCE SCORE', value: '91%', sub: 'Backed by ClickHouse logs' },
      { label: 'ENGINEERING EFFORT', value: '5 sprints', sub: 'Redis lock + switch router' },
    ],
    systemOutput: 'RICE SCORE = (82k × 8.5 × 0.91) / 5 = 74.6. Recommendation: Greenlight immediate architecture RFC.',
  },
  {
    stepNumber: 5,
    stageName: 'PRD SPECIFICATION',
    badge: 'SPEC SYNTHESIZED',
    badgeColor: 'bg-purple-950/60 text-purple-400 border border-purple-800/50',
    title: 'PRD-2026-041: Dynamic Multi-Bank Gateway Routing Engine',
    summary: 'Argus drafted an engineering-ready specification complete with Redis idempotency lock constraints, latency thresholds, and Gherkin BDD test cases.',
    targetTab: 'prds',
    tabLabel: 'Inspect in PRD Studio',
    details: [
      { label: 'DOCUMENT ID', value: 'PRD-2026-041', sub: 'Status: Approved for Sprint 42' },
      { label: 'CIRCUIT THRESHOLD', value: '< 450ms', sub: 'Trips when error rate > 4.5% over 60s', highlight: true },
      { label: 'IDEMPOTENCY LOCK', value: 'Redis Cluster NX', sub: '120s TTL eliminates double debits' },
      { label: 'BDD TEST CASES', value: '14 Executable', sub: 'Verified across chaos simulators' },
    ],
    systemOutput: 'ENGINEERING SPEC: "When HDFC p99 exceeds 2,500ms, route 85% traffic to ICICI secondary switch. Maintain Redis lock to guarantee single-debit integrity."',
  },
  {
    stepNumber: 6,
    stageName: 'EXPERIMENT & SHIP',
    badge: 'EXPERIMENT GUARDED',
    badgeColor: 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/50',
    title: 'EXP-088: Canary rollout with automated latency circuit breaker',
    summary: 'Statistically powered 10/90 traffic split with automated kill-switch guardrail configured in Statsig.',
    targetTab: 'experiments',
    tabLabel: 'Open Experiment Lab',
    details: [
      { label: 'EXPERIMENT KEY', value: 'EXP-088', sub: 'Canary rollout v2.4' },
      { label: 'TRAFFIC SPLIT', value: '10% Treatment', sub: '90% Control (Vanilla routing)' },
      { label: 'EXPECTED LIFT', value: '+3.2% SR', sub: 'MDE: 1.4% with 95% power', highlight: true },
      { label: 'AUTOMATED GUARDRAIL', value: 'p99 < 3,000ms', sub: 'Auto-reverts to control if breached' },
    ],
    systemOutput: 'CLOSED-LOOP: Outcome metrics will stream back into ClickHouse telemetry to update the Opportunity conviction score.',
  },
];

export const InteractiveProductDemo: React.FC<InteractiveProductDemoProps> = ({
  onNavigateTab,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const currentStep = DEMO_STEPS[activeStepIndex];

  return (
    <div className="w-full bg-[#0A0A0A] border border-[#1D1D1D] rounded-[8px] overflow-hidden text-[#F5F5F0]">
      {/* 1. Header Bar with Explicit DEMO WORKSPACE Tag */}
      <div className="bg-[#0E0E0E] px-4 sm:px-6 py-3 border-b border-[#1D1D1D] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[#141414] border border-[#262626]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-wider font-semibold text-amber-300">
              DEMO WORKSPACE
            </span>
          </div>
          <span className="text-xs font-mono text-[#8A8A8A]">
            Interactive Walkthrough: The Complete Product Intelligence Loop
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[#666]">
          <span>Step {currentStep.stepNumber} of {DEMO_STEPS.length}</span>
          <span className="text-[#333]">/</span>
          <span className="text-[#AAA]">{currentStep.stageName}</span>
        </div>
      </div>

      {/* 2. Step Navigation Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-[#1D1D1D] divide-x divide-y sm:divide-y-0 divide-[#1D1D1D]">
        {DEMO_STEPS.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 text-left transition-all cursor-pointer relative ${
                isActive
                  ? 'bg-[#121212] border-b-2 border-b-[#0066FF]'
                  : 'bg-[#070707] hover:bg-[#0E0E0E]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-[#666]">
                  0{step.stepNumber}
                </span>
                {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />}
              </div>
              <p
                className={`text-xs font-display font-medium truncate ${
                  isActive ? 'text-white font-bold' : 'text-[#8A8A8A]'
                }`}
              >
                {step.stageName}
              </p>
            </button>
          );
        })}
      </div>

      {/* 3. Main Stage Content Area */}
      <div className="p-5 sm:p-8 space-y-6">
        {/* Top Stage Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-[3px] ${currentStep.badgeColor}`}>
                {currentStep.badge}
              </span>
              <span className="text-xs font-mono text-[#666]">
                STAGE 0{currentStep.stepNumber} / {currentStep.stageName}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight leading-snug">
              {currentStep.title}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#8A8A8A] leading-relaxed">
              {currentStep.summary}
            </p>
          </div>

          {/* Jump directly into actual workspace */}
          <button
            onClick={() => onNavigateTab(currentStep.targetTab)}
            className="self-start lg:self-center flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#2D2D2D] text-xs font-mono text-white transition-colors cursor-pointer flex-shrink-0"
            title={`Navigate directly into the ${currentStep.tabLabel} screen`}
          >
            <span>{currentStep.tabLabel}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#0066FF]" />
          </button>
        </div>

        {/* Structured Data Metric Grid (Card Discipline: 4 distinct metrics, not generic cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {currentStep.details.map((d, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-[4px] border ${
                d.highlight
                  ? 'bg-[#0066FF]/8 border-[#0066FF]/40'
                  : 'bg-[#111111] border-[#1D1D1D]'
              }`}
            >
              <span className="text-[10px] font-mono text-[#666] uppercase block mb-1">
                {d.label}
              </span>
              <p className="text-lg font-mono font-bold text-white tracking-tight">
                {d.value}
              </p>
              {d.sub && (
                <p className="text-[11px] font-sans text-[#8A8A8A] mt-1 leading-tight">
                  {d.sub}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Optional Live SQL / Telemetry Snippet */}
        {currentStep.terminalCode && (
          <div className="bg-[#050505] border border-[#1D1D1D] rounded-[4px] overflow-hidden">
            <div className="bg-[#0D0D0D] px-3 py-1.5 border-b border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono text-[#666]">
              <span>ClickHouse Raw Query Attribution</span>
              <Terminal className="w-3 h-3 text-[#555]" />
            </div>
            <pre className="p-3 text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed">
              <code>{currentStep.terminalCode}</code>
            </pre>
          </div>
        )}

        {/* System Rationale Box */}
        <div className="p-3.5 bg-[#0E0E0E] border-l-2 border-[#0066FF] rounded-[2px] text-xs font-mono text-[#CCC] flex items-start gap-2.5">
          <Activity className="w-4 h-4 text-[#0066FF] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">{currentStep.systemOutput}</p>
        </div>
      </div>

      {/* 4. Bottom Stepper Controls */}
      <div className="bg-[#0E0E0E] px-5 py-3.5 border-t border-[#1D1D1D] flex items-center justify-between">
        <button
          onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
          disabled={activeStepIndex === 0}
          className="px-3.5 py-1.5 text-xs font-mono rounded-[3px] border border-[#222] text-[#8A8A8A] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous Stage
        </button>

        <div className="flex items-center gap-1.5">
          {DEMO_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStepIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === activeStepIndex
                  ? 'w-6 bg-[#0066FF]'
                  : i < activeStepIndex
                  ? 'bg-emerald-500/60'
                  : 'bg-[#262626]'
              }`}
              title={`Jump to step ${i + 1}`}
            />
          ))}
        </div>

        {activeStepIndex < DEMO_STEPS.length - 1 ? (
          <button
            onClick={() => setActiveStepIndex((prev) => Math.min(DEMO_STEPS.length - 1, prev + 1))}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded-[3px] bg-[#0066FF] hover:bg-[#0052CC] text-white transition-colors cursor-pointer shadow-sm"
          >
            <span>Next: {DEMO_STEPS[activeStepIndex + 1].stageName}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={() => onNavigateTab('overview')}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono font-medium rounded-[3px] bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer"
          >
            <span>Enter Argus Operating System</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
