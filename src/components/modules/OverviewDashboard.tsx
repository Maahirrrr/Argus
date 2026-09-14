import React from 'react';
import {
  Activity,
  TrendingUp,
  AlertTriangle,
  Sparkles,
  Zap,
  Target,
  Clock,
  ChevronRight,
  Flame
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
  onOpenChaosSimulator: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Top Banner / Hero PM Cockpit */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00CC66] animate-pulse-dot" />
            <span className="text-[11px] font-mono-tech text-[#0066FF] tracking-wider uppercase">
              OPERATING COCKPIT · Q3 2026 CYCLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-[#F5F5F0]">
            Good morning, Lead PM.
          </h1>
          <p className="text-xs sm:text-sm font-mono-tech text-[#8A8A8A]">
            Argus telemetry active across 14 modules. 2 causal anomalies detected in production.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('inbox')}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech font-medium rounded-[2px] transition-colors shadow-lg shadow-[#0066FF]/10"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Triage Inbox (4 New)</span>
          </button>

          <button
            onClick={onOpenChaosSimulator}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#FF3333]/15 hover:bg-[#FF3333]/25 border border-[#FF3333]/30 text-[#FF3333] text-xs font-mono-tech rounded-[2px] transition-colors"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Simulate Outage</span>
          </button>
        </div>
      </div>

      {/* 1. North Star Metrics HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-4 rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase">DECISION-TO-SHIP VELOCITY</span>
            <Target className="w-3.5 h-3.5 text-[#0066FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">4.2 Days</span>
            <span className="text-xs font-mono-tech text-[#00CC66] flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> -38% vs target
            </span>
          </div>
          <div className="text-[11px] text-[#8A8A8A]">
            PRD spec to canary deployment elapsed cycle
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-4 rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase">LLM EVAL PASS RATE</span>
            <Zap className="w-3.5 h-3.5 text-[#00CC66]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">98.8%</span>
            <span className="text-xs font-mono-tech text-[#00CC66] flex items-center">
              +1.4%
            </span>
          </div>
          <div className="text-[11px] text-[#8A8A8A]">
            Across 1,240 automated test assertions
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-4 rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase">EXPERIMENT WIN RATE</span>
            <Activity className="w-3.5 h-3.5 text-[#0066FF]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">74.2%</span>
            <span className="text-xs font-mono-tech text-[#00CC66]">
              3 active A/B tests
            </span>
          </div>
          <div className="text-[11px] text-[#8A8A8A]">
            +18.4 bps gross conversion margin impact
          </div>
        </div>

        <div className="bg-[#0A0A0A] border border-[#1D1D1D] p-4 rounded-[2px] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase">DISPUTE AUTO-REFUND SLA</span>
            <Clock className="w-3.5 h-3.5 text-[#FF9900]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">18.4s</span>
            <span className="text-xs font-mono-tech text-[#00CC66]">
              -99.8% vs 48hr
            </span>
          </div>
          <div className="text-[11px] text-[#8A8A8A]">
            Zero human intervention refund resolution
          </div>
        </div>
      </div>

      {/* 2. Urgent Causal Signals & Anomalies */}
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-4 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#FF9900]" />
            <span className="text-xs font-bold font-mono-tech text-[#F5F5F0]">
              HIGH-CONFIDENCE TELEMETRY SIGNALS (REQUIRES PM DECISION)
            </span>
          </div>
          <button
            onClick={() => onNavigateTab('signals')}
            className="text-[11px] font-mono-tech text-[#0066FF] hover:underline"
          >
            Inspect All Signals →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3.5 bg-[#0D0D0D] border border-[#FF3333]/30 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech text-[#FF3333] bg-[#FF3333]/10 px-1.5 py-0.2 rounded-[2px]">
                ANOMALY DETECTED (+2.4σ)
              </span>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A]">38m ago</span>
            </div>
            <h3 className="text-xs font-bold font-display text-[#F5F5F0]">
              NPCI Switch Settlement Delay in Karnataka Region
            </h3>
            <p className="text-[11px] text-[#8A8A8A] leading-relaxed">
              p99 latency spiked from 180ms to 920ms for UPI intent calls. 14% drop in second-attempt checkout retry.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono-tech text-[#0066FF]">Causal Prob: 0.94</span>
              <button
                onClick={() => onInvestigateSignal('sig-npci-latency')}
                className="text-xs font-mono-tech text-[#0066FF] hover:text-[#0052CC] font-semibold flex items-center gap-1"
              >
                Investigate & Mitigate →
              </button>
            </div>
          </div>

          <div className="p-3.5 bg-[#0D0D0D] border border-[#0066FF]/30 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-tech text-[#0066FF] bg-[#0066FF]/10 px-1.5 py-0.2 rounded-[2px]">
                OPPORTUNITY SIGNAL
              </span>
              <span className="text-[10px] font-mono-tech text-[#8A8A8A]">2h ago</span>
            </div>
            <h3 className="text-xs font-bold font-display text-[#F5F5F0]">
              Quick-Commerce POS Surge (Blinkit & Zepto)
            </h3>
            <p className="text-[11px] text-[#8A8A8A] leading-relaxed">
              31,200 transactions misclassified as Miscellaneous POS instead of Supermarket MCC 5411, costing users 5% cashbacks.
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono-tech text-[#00CC66]">+₹1.24 Cr GMV Opportunity</span>
              <button
                onClick={() => onNavigateTab('opportunities')}
                className="text-xs font-mono-tech text-[#0066FF] hover:text-[#0052CC] font-semibold flex items-center gap-1"
              >
                Promote to Opportunity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Product Flywheel Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {/* DISCOVER */}
        <div
          onClick={() => onNavigateTab('customers')}
          className="bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#0066FF]/50 p-4 rounded-[2px] cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold">1. DISCOVER</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
          </div>
          <div className="text-sm font-bold font-display text-[#F5F5F0]">Feedback Engine</div>
          <p className="text-xs text-[#8A8A8A]">
            1,480 qualitative user feedback tickets parsed across App Store, Reddit, and Zendesk.
          </p>
          <div className="text-[10px] font-mono-tech text-[#00CC66] pt-1">
            Top Theme: Card Exclusion Fine-Print
          </div>
        </div>

        {/* DECIDE */}
        <div
          onClick={() => onNavigateTab('opportunities')}
          className="bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#0066FF]/50 p-4 rounded-[2px] cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold">2. DECIDE</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
          </div>
          <div className="text-sm font-bold font-display text-[#F5F5F0]">Opportunity Tree</div>
          <p className="text-xs text-[#8A8A8A]">
            Hierarchical Teresa Torres trees mapping user pain points to technical bets.
          </p>
          <div className="text-[10px] font-mono-tech text-[#0066FF] pt-1">
            7 Prioritized Initiatives in RICE
          </div>
        </div>

        {/* BUILD */}
        <div
          onClick={() => onNavigateTab('prds')}
          className="bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#0066FF]/50 p-4 rounded-[2px] cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold">3. BUILD</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
          </div>
          <div className="text-sm font-bold font-display text-[#F5F5F0]">PRD & BDD Studio</div>
          <p className="text-xs text-[#8A8A8A]">
            Autonomous specification writer with automated Gherkin scenarios & edge cases.
          </p>
          <div className="text-[10px] font-mono-tech text-[#00CC66] pt-1">
            3 Ready for Eng Review
          </div>
        </div>

        {/* MEASURE */}
        <div
          onClick={() => onNavigateTab('experiments')}
          className="bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#0066FF]/50 p-4 rounded-[2px] cursor-pointer transition-all space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono-tech text-[#0066FF] font-bold">4. MEASURE</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8A8A8A]" />
          </div>
          <div className="text-sm font-bold font-display text-[#F5F5F0]">A/B Experiments</div>
          <p className="text-xs text-[#8A8A8A]">
            Bayesian sequential testing with automated rollback circuit breakers.
          </p>
          <div className="text-[10px] font-mono-tech text-[#FF9900] pt-1">
            Exp #104 reaching 99% significance
          </div>
        </div>
      </div>

      {/* 4. Quick Action Dock */}
      <div className="p-4 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech">
        <div className="text-[#8A8A8A]">INSTANT PM ACTIONS:</div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigateTab('ai_lab')}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px] transition-colors"
          >
            ⚡ Run LLM Evals
          </button>
          <button
            onClick={() => onNavigateTab('prds')}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px] transition-colors"
          >
            📝 Draft New PRD
          </button>
          <button
            onClick={() => onNavigateTab('roadmap')}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px] transition-colors"
          >
            🗺️ Inspect Roadmaps
          </button>
          <button
            onClick={() => onNavigateTab('launch')}
            className="px-2.5 py-1.5 bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px] transition-colors"
          >
            🚀 Launch Center
          </button>
        </div>
      </div>
    </div>
  );
};
