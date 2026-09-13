import React from 'react';
import {
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';
import { DEMO_METRICS } from '../../data/demoData';

interface LandingPageProps {
  onOpenApp: (tab?: NavigationTab) => void;
  onOpenCaseStudy: () => void;
  onInvestigateSignal: (signalId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onOpenApp,
  onOpenCaseStudy,
  onInvestigateSignal,
}) => {
  return (
    <div className="flex flex-col gap-16 py-8 px-4 sm:px-6 max-w-7xl mx-auto text-zinc-100">
      {/* ───── SECTION 1: HERO ───── */}
      <section className="text-center max-w-4xl mx-auto pt-6 pb-2">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/25 text-blue-400 text-xs font-mono font-semibold tracking-wide mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI PRODUCT INTELLIGENCE FOR FINTECH
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
          Turn fintech signals into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-zinc-100 to-blue-200">
            better product decisions.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-8">
          FinPilot connects product analytics, customer feedback, support data and fintech signals to help PMs discover opportunities, prioritize what matters and ship with confidence.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenApp('overview')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold cursor-pointer shadow-lg shadow-blue-600/25 transition-all"
          >
            <span>Open FinPilot OS</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenCaseStudy}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium text-zinc-300 hover:text-white cursor-pointer transition-colors"
          >
            <span>View AI PM Case Study</span>
            <ArrowUpRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>
      </section>

      {/* ───── SECTION 2: HERO PRODUCT DEMO ───── */}
      <section className="relative">
        <div className="rounded-2xl bg-[#090a0f] border border-white/[0.12] shadow-2xl p-6 sm:p-8 overflow-hidden">
          {/* Top Bar of Demo Widget */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-white/[0.08] gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-mono font-bold text-xs text-white">
                FP
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 block">
                  Product Health
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {DEMO_METRICS.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-mono text-xs font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {DEMO_METRICS.healthGrade} · Score {DEMO_METRICS.healthScore}/100
              </span>
            </div>
          </div>

          {/* Metric Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Payment Success</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">{DEMO_METRICS.paymentSuccess.value}</span>
                <span className="text-xs font-mono text-emerald-400">{DEMO_METRICS.paymentSuccess.delta}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">7D Retention</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">{DEMO_METRICS.retention7D.value}</span>
                <span className="text-xs font-mono text-emerald-400">{DEMO_METRICS.retention7D.delta}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Support Tickets</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">{DEMO_METRICS.supportTickets.value}</span>
                <span className="text-xs font-mono text-emerald-400">{DEMO_METRICS.supportTickets.delta}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Transaction Volume</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold font-mono text-white">{DEMO_METRICS.volume.value}</span>
                <span className="text-xs font-mono text-emerald-400">{DEMO_METRICS.volume.delta}</span>
              </div>
            </div>
          </div>

          {/* AI Product Signal Callout Card */}
          <div className="p-5 rounded-xl bg-gradient-to-r from-red-950/20 via-black to-[#0b0c10] border border-red-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider">
                  AI PRODUCT SIGNAL DETECTED
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Payment failures increased 7.4% in users attempting transactions above ₹10,000.
              </h3>

              <div className="flex flex-wrap gap-2 text-[11px] font-mono text-zinc-400 pt-1">
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                  01 Bank timeout errors
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                  02 Increased evening traffic (8–10 PM)
                </span>
                <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                  03 Android 15 timeout cluster
                </span>
              </div>

              <p className="text-xs text-zinc-300 font-mono pt-1">
                <strong className="text-blue-400">AI Recommendation:</strong> Investigate payment routing before prioritizing checkout UI changes.
              </p>
            </div>

            <div className="flex-shrink-0">
              <button
                onClick={() => onInvestigateSignal('sig-001')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs cursor-pointer shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2"
              >
                <span>Investigate Signal →</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SECTION 3: THE FINPILOT STORY (PROBLEM → DECISIONS) ───── */}
      <section className="border-t border-white/[0.08] pt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
            The Decision Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How FinPilot turns noise into roadmap momentum
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            {
              step: '01',
              stage: 'PROBLEM',
              headline: 'Fintech PMs have too much data and too little clarity.',
              sub: 'Logs in ClickHouse, errors in Sentry, tickets in Zendesk, webhooks from 18 banks.',
            },
            {
              step: '02',
              stage: 'SIGNALS',
              headline: 'Continuous Telemetry Ingestion',
              sub: 'Correlates failure codes (U30, U69), OS versions, and user cohorts across 4.2M daily events.',
            },
            {
              step: '03',
              stage: 'AI SYNTHESIS',
              headline: 'Causal Anomaly Decomposition',
              sub: 'Isolates root causes: 48% Bank X switch latency vs 24% Android 15 background service drops.',
            },
            {
              step: '04',
              stage: 'DECISION',
              headline: 'RICE Prioritization & Simulator',
              sub: 'Model trade-offs in real time. Modify effort or reach to simulate expected ROI ranking shifts.',
            },
            {
              step: '05',
              stage: 'OUTCOME',
              headline: 'Ship Verified PRD & Experiment',
              sub: 'Production specs with Gherkin BDD criteria, AI Critic review, and guardrailed A/B metrics.',
            },
          ].map((col, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">{col.step}</span>
                  <span className="text-[10px] font-mono font-bold text-blue-400">{col.stage}</span>
                </div>
                <h3 className="text-xs font-bold text-white mb-1.5 leading-snug">{col.headline}</h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">{col.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── SECTION 4: REAL FINTECH PM PROBLEMS (CASE STUDIES) ───── */}
      <section className="border-t border-white/[0.08] pt-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
            Real Problem Scenarios
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Built for real fintech PM problems
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-3 font-mono text-xs font-bold">
                01
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Payment Failure Diagnostics</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                FinPilot detects abnormal payment failure patterns, correlates them with bank switch timeouts, and recommends dynamic fallback routing over UI redesigns.
              </p>
            </div>
            <button
              onClick={() => onOpenApp('insights')}
              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Explore Failure Insights →
            </button>
          </div>

          <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3 font-mono text-xs font-bold">
                02
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Customer Voice Clustering</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                AI clusters thousands of Zendesk dispute tickets, Play Store reviews, and Twitter complaints into quantified product opportunities with estimated GMV at risk.
              </p>
            </div>
            <button
              onClick={() => onOpenApp('opportunities')}
              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              View Opportunity Inbox →
            </button>
          </div>

          <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.06] flex flex-col justify-between">
            <div>
              <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3 font-mono text-xs font-bold">
                03
              </div>
              <h3 className="text-sm font-bold text-white mb-1">Roadmap Prioritization & Simulator</h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                Dynamic RICE sensitivity engine with live engineering effort simulations. Explains why items move in natural language and generates production PRDs.
              </p>
            </div>
            <button
              onClick={() => onOpenApp('prioritize')}
              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Test Decision Simulator →
            </button>
          </div>
        </div>
      </section>

      {/* ───── SECTION 5: ARCHITECTURE DIAGRAM ───── */}
      <section className="border-t border-white/[0.08] pt-12 pb-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block mb-2">
            System Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How the FinPilot OS is architected
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-[#08090d] border border-white/[0.08] font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-zinc-500 block mb-1">INGESTION LAYER</span>
              <p className="text-white font-bold">ClickHouse Events</p>
              <p className="text-[10px] text-zinc-400 mt-1">Zendesk Tickets · Bank Webhooks</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-zinc-500 block mb-1">INTELLIGENCE LAYER</span>
              <p className="text-blue-400 font-bold">Causal Decomposition</p>
              <p className="text-[10px] text-zinc-400 mt-1">Opportunity Scoring · Sentry</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-zinc-500 block mb-1">DECISION LAYER</span>
              <p className="text-cyan-400 font-bold">RICE Simulator</p>
              <p className="text-[10px] text-zinc-400 mt-1">PRD Generator · AI Critic</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] text-zinc-500 block mb-1">EXECUTION LAYER</span>
              <p className="text-emerald-400 font-bold">A/B Experiment Lab</p>
              <p className="text-[10px] text-zinc-400 mt-1">Guardrail Rollback · Feature Flags</p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── SECTION 6: RESPONSIBLE AI NOTICE ───── */}
      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 font-mono">
        <span className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          FinPilot AI recommendations are decision support tools for PMs, not autonomous financial systems.
        </span>
        <span className="hidden sm:inline text-zinc-500">Human in the loop required</span>
      </div>
    </div>
  );
};
