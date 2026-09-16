import React, { useState } from 'react';
import {
  ExternalLink,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface ProductShowcaseLoopProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

interface ShowcaseModule {
  id: string;
  tab: NavigationTab;
  label: string;
  headline: string;
  tagline: string;
  badge: string;
  highlights: { title: string; desc: string }[];
  previewComponent: 'sentry' | 'opportunity' | 'rice' | 'prd' | 'experiment';
}

const MODULES: ShowcaseModule[] = [
  {
    id: 'sentry',
    tab: 'signals',
    label: 'Telemetry Sentry',
    headline: 'See what broke before customer support gets flooded.',
    tagline: 'Continuous ClickHouse surveillance correlating 4.2M daily transactional events to isolate p99 latency spikes and gateway circuit degradation.',
    badge: '100ms ANOMALY ATTRIBUTION',
    highlights: [
      { title: 'Sub-second switch monitoring', desc: 'Isolates gateway degradation before binary TCP failure' },
      { title: 'Causal log decomposition', desc: 'Groups error clusters by bank switch, device OS, and transaction band' },
      { title: 'Deterministic alert filtering', desc: 'Zero false-positive noise; only surfaces statistically significant anomalies' },
    ],
    previewComponent: 'sentry',
  },
  {
    id: 'opportunity',
    tab: 'opportunities',
    label: 'Opportunity Tree',
    headline: 'Convert operational incidents into high-conviction bets.',
    tagline: 'Continuous product discovery connecting customer support feedback, bank telemetry, and competitor launches into structured opportunity nodes.',
    badge: 'CONTINUOUS DISCOVERY',
    highlights: [
      { title: 'Teresa Torres tree model', desc: 'Direct linkage from Business Outcome to Customer Needs and Experiments' },
      { title: 'Quantified at-risk ARR/GMV', desc: 'Every opportunity is backed by real transaction and customer dispute data' },
      { title: 'Confidence calibration', desc: 'Automated evidence weighting prevents opinion-driven roadmapping' },
    ],
    previewComponent: 'opportunity',
  },
  {
    id: 'rice',
    tab: 'prioritize',
    label: 'RICE Workbench',
    headline: 'Test roadmap trade-offs with dynamic slider sensitivity.',
    tagline: 'Prioritize initiatives across Reach, Impact, Confidence, and Effort with live sensitivity recalculation and causal rank commentary.',
    badge: 'DYNAMIC RANKING',
    highlights: [
      { title: '4-slider sensitivity grid', desc: 'Instant feedback as you tune parameters' },
      { title: 'Multi-model benchmarking', desc: 'Switch instantly between RICE, ICE, and MoSCoW criteria' },
      { title: 'Causal rationale strip', desc: 'Explains why initiative ranks shifted and surfaces hidden trade-offs' },
    ],
    previewComponent: 'rice',
  },
  {
    id: 'prd',
    tab: 'prds',
    label: 'PRD Studio',
    headline: 'Engineering-ready specs with adversarial AI critique.',
    tagline: 'Generate battle-tested specifications with Gherkin BDD test cases, Redis idempotency contracts, and automated edge-case red-teaming.',
    badge: 'ADVERSARIAL CRITIQUE',
    highlights: [
      { title: 'Adversarial red-teamer', desc: 'Proactively finds missing failover states and race conditions' },
      { title: '1-click Jira/Linear sync', desc: 'Pushes user stories and acceptance criteria directly into sprint backlogs' },
      { title: 'Diff tracking v1 → v2', desc: 'Track exactly what changed between iterations and incidents' },
    ],
    previewComponent: 'prd',
  },
  {
    id: 'experiment',
    tab: 'experiments',
    label: 'Experiment Lab',
    headline: 'Causal inference rollouts with circuit breaker guardrails.',
    tagline: 'Configure guarded canary deployments in Statsig. Define latency kill-switches that automatically revert traffic if p99 degrades.',
    badge: 'GUARDED ROLLOUTS',
    highlights: [
      { title: 'Automated kill-switches', desc: 'p99 latency ceilings automatically protect GMV conversion' },
      { title: 'MDE & sample size math', desc: 'Statistically powered experiment durations before launch' },
      { title: 'Telemetry closed loop', desc: 'Feeds live treatment lift directly back into North Star metrics' },
    ],
    previewComponent: 'experiment',
  },
];

export const ProductShowcaseLoop: React.FC<ProductShowcaseLoopProps> = ({
  onNavigateTab,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>(MODULES[0].id);
  const activeMod = MODULES.find((m) => m.id === selectedModuleId) || MODULES[0];

  return (
    <div className="w-full bg-[#080808] border border-[#1D1D1D] rounded-[8px] overflow-hidden text-[#F5F5F0]">
      {/* 1. Module Switcher Header Tabs */}
      <div className="bg-[#0D0D0D] px-4 sm:px-6 py-2 border-b border-[#1D1D1D] flex items-center justify-between overflow-x-auto gap-2">
        <div className="flex items-center gap-1 sm:gap-2">
          {MODULES.map((mod) => {
            const isActive = mod.id === selectedModuleId;
            return (
              <button
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`px-3 py-2 text-xs font-mono rounded-[3px] transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#181818] text-white border border-[#2A2A2A] font-medium shadow-sm'
                    : 'text-[#8A8A8A] hover:text-[#CCC] hover:bg-[#111]'
                }`}
              >
                {mod.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onNavigateTab(activeMod.tab)}
          className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-[#0066FF] hover:underline flex-shrink-0"
        >
          <span>Open {activeMod.label}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Content Split: Left Explanation (40%), Right Realistic UI Surface (60%) */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Explanation Column (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-2">
            <span className="text-[10px] font-mono tracking-wider text-[#0066FF] bg-[#0066FF]/10 border border-[#0066FF]/30 px-2 py-0.5 rounded-[3px] font-bold">
              {activeMod.badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight leading-tight">
              {activeMod.headline}
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#8A8A8A] leading-relaxed">
              {activeMod.tagline}
            </p>
          </div>

          {/* Highlights List */}
          <div className="space-y-3 pt-2">
            {activeMod.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-[#F5F5F0]">
                    {h.title}
                  </h4>
                  <p className="text-[11px] font-sans text-[#777] mt-0.5">
                    {h.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => onNavigateTab(activeMod.tab)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-[4px] bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono transition-colors cursor-pointer shadow-sm"
            >
              <span>Launch {activeMod.label} Workspace</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Realistic UI Preview Surface (7 cols) */}
        <div className="lg:col-span-7 bg-[#050505] border border-[#1D1D1D] rounded-[6px] p-4 sm:p-5 space-y-4 shadow-xl select-none">
          {/* Mock Window Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#141414] text-[11px] font-mono text-[#666]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[#AAA]">{activeMod.label} / Active View</span>
            </div>
            <span>ARGUS PRODUCTION SYSTEM</span>
          </div>

          {/* Conditional Mini-UI Simulation based on selected module */}
          {activeMod.previewComponent === 'sentry' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D0D0D] border border-[#1A1A1A] rounded-[4px] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#666] block">PRIMARY INCIDENT</span>
                  <span className="text-white font-bold">HDFC Bank Switch 504 Timeout Surge</span>
                </div>
                <span className="text-[10px] text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded-[2px] border border-rose-800/40">
                  +7.4pp Error Rate
                </span>
              </div>

              {/* Sparkline Simulation */}
              <div className="p-3 bg-[#0A0A0A] border border-[#141414] rounded-[4px] space-y-2">
                <div className="flex justify-between text-[10px] text-[#666]">
                  <span>24h Latency Distribution</span>
                  <span className="text-amber-400">p99: 4,280ms (Breached)</span>
                </div>
                <div className="h-14 flex items-end gap-1 pt-2">
                  {[20, 22, 19, 25, 24, 21, 28, 30, 26, 29, 32, 38, 42, 92, 88, 75, 40, 35].map((val, idx) => (
                    <div
                      key={idx}
                      style={{ height: `${val}%` }}
                      className={`flex-1 rounded-t-[1px] transition-all ${
                        val > 60 ? 'bg-rose-500' : val > 35 ? 'bg-amber-500' : 'bg-[#0066FF]'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-[#444]">
                  <span>00:00</span>
                  <span>12:00</span>
                  <span>20:30 (Peak Outage)</span>
                  <span>Now</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
                <div className="p-2 bg-[#0D0D0D] rounded-[2px] border border-[#181818]">
                  <span className="text-[#666] block">Users Impacted</span>
                  <span className="text-white font-bold">18,421</span>
                </div>
                <div className="p-2 bg-[#0D0D0D] rounded-[2px] border border-[#181818]">
                  <span className="text-[#666] block">Switch Error Share</span>
                  <span className="text-amber-400 font-bold">52.4%</span>
                </div>
                <div className="p-2 bg-[#0D0D0D] rounded-[2px] border border-[#181818]">
                  <span className="text-[#666] block">Causal Attribution</span>
                  <span className="text-emerald-400 font-bold">Connection Pool</span>
                </div>
              </div>
            </div>
          )}

          {activeMod.previewComponent === 'opportunity' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D0D0D] border border-[#0066FF]/30 rounded-[4px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#0066FF] font-bold">OPP-014 · HIGH IMPACT</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-1.5 py-0.2 rounded-[2px]">
                    Conviction: 91%
                  </span>
                </div>
                <h4 className="text-xs text-white font-bold">Autonomous Multi-Bank Failover & Circuit Breaker</h4>
                <p className="text-[11px] font-sans text-[#8A8A8A]">
                  Directly addresses the 52% HDFC timeout cluster by auto-routing to ICICI switch under 450ms.
                </p>
                <div className="flex items-center gap-3 pt-1 text-[10px] text-[#777]">
                  <span>At-risk GMV: ₹38.4L</span>
                  <span>·</span>
                  <span>Est. SR Lift: +3.8%</span>
                  <span>·</span>
                  <span>Linked Sprints: 42</span>
                </div>
              </div>

              <div className="p-3 bg-[#0A0A0A] border border-[#141414] rounded-[4px] text-[11px] text-[#AAA] flex items-center justify-between">
                <span>Secondary: OPP-015 Instant Refund SLA Tracking</span>
                <span className="text-[#666]">RICE 68.2</span>
              </div>
            </div>
          )}

          {activeMod.previewComponent === 'rice' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">Dynamic Routing Engine</span>
                  <span className="text-sm font-bold text-[#0066FF]">RICE 74.6</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <div className="flex justify-between text-[#777] mb-1">
                      <span>Reach</span>
                      <span className="text-white">82k</span>
                    </div>
                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0066FF] w-[82%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#777] mb-1">
                      <span>Impact</span>
                      <span className="text-white">8.5/10</span>
                    </div>
                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0066FF] w-[85%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#777] mb-1">
                      <span>Confidence</span>
                      <span className="text-white">91%</span>
                    </div>
                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0066FF] w-[91%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[#777] mb-1">
                      <span>Effort</span>
                      <span className="text-white">5 sprints</span>
                    </div>
                    <div className="h-1 bg-[#1A1A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#0066FF] w-[50%]" />
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-[#8A8A8A] italic pt-1 border-t border-[#181818]">
                  Causal Rationale: Massive reach and confirmed telemetry data give this initiative clear priority.
                </p>
              </div>
            </div>
          )}

          {activeMod.previewComponent === 'prd' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#0066FF] font-bold">PRD-2026-041 (v2.2)</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.2 rounded-[2px]">
                    Status: Approved
                  </span>
                </div>
                <h4 className="text-xs text-white font-bold">Sub-second Gateway Failover Engine</h4>
                <div className="p-2 bg-[#050505] rounded-[2px] border border-[#141414] text-[10px] text-emerald-400 space-y-1">
                  <div>Scenario: HDFC switch response degrades past 2,500ms</div>
                  <div>Given rolling 60-second p99 latency &gt; 2,500ms</div>
                  <div>When error threshold exceeds 4.5%</div>
                  <div>Then trip circuit breaker and route 85% traffic to ICICI secondary switch</div>
                </div>
              </div>
            </div>
          )}

          {activeMod.previewComponent === 'experiment' && (
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[#0D0D0D] border border-[#1D1D1D] rounded-[4px] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-cyan-400 font-bold">EXP-088 · STATSIG CANARY</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.2 rounded-[2px]">
                    Passing Guardrails
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-2 bg-[#080808] rounded-[2px] border border-[#141414]">
                    <span className="text-[#666] block">Control (Vanilla)</span>
                    <span className="text-white font-bold">90% · SR: 94.2%</span>
                  </div>
                  <div className="p-2 bg-[#080808] rounded-[2px] border border-[#0066FF]/30">
                    <span className="text-[#0066FF] block">Treatment (Circuit Breaker)</span>
                    <span className="text-emerald-400 font-bold">10% · SR: 97.4% (+3.2%)</span>
                  </div>
                </div>
                <div className="p-2 bg-[#050505] border border-amber-900/30 rounded-[2px] text-[10px] text-amber-300 flex items-center justify-between">
                  <span>Guardrail: p99 &lt; 3,000ms</span>
                  <span>Active: 840ms (OK)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
