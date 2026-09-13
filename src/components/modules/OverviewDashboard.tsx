import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';
import { DEMO_METRICS, DEMO_SIGNALS } from '../../data/demoData';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
}) => {
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Good evening, Product Team.
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Here's what changed across your product this week · Updated {DEMO_METRICS.date}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Health Score: <strong>{DEMO_METRICS.healthScore}</strong>/100 (GOOD)</span>
          </div>

          <button
            onClick={() => onNavigateTab('weekly_review')}
            className="px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/25 text-xs font-semibold cursor-pointer transition-colors"
          >
            Weekly Brief →
          </button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Payment Success
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">94.2%</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +1.8%
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Baseline: 92.4%</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            DAU
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">284K</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +6.2%
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">4.8M WAU transacting</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            7D Retention
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">41.8%</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +2.4%
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">New transactor cohort</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Revenue (GMV)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">₹12.8Cr</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +9.7%
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">MDR & fee capture</span>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08] col-span-2 md:col-span-1">
          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-1">
            Support Tickets
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">1,284</span>
            <span className="text-xs font-mono text-emerald-400 font-bold flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -8.1%
            </span>
          </div>
          <span className="text-[10px] text-zinc-500 font-mono mt-1 block">Zendesk dispute volume</span>
        </div>
      </div>

      {/* Product Signals Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight uppercase font-mono">
              PRODUCT SIGNALS
            </h2>
            <p className="text-xs text-zinc-400">
              5 anomalies & telemetry trends flagged by FinPilot Sentry
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('insights')}
            className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            View all 7 signals →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DEMO_SIGNALS.map((signal) => (
            <div
              key={signal.id}
              className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                signal.severity === 'HIGH'
                  ? 'bg-red-950/10 border-red-500/25 hover:border-red-500/40'
                  : signal.severity === 'MEDIUM'
                  ? 'bg-amber-950/10 border-amber-500/25 hover:border-amber-500/40'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      signal.severity === 'HIGH'
                        ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                        : signal.severity === 'MEDIUM'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {signal.severity} SEVERITY
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-200">
                      {signal.delta}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{signal.timestamp.split('·')[0]}</span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-white mb-1">
                  {signal.title}
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">
                  {signal.description}
                </p>

                <div className="p-2.5 rounded-lg bg-black/40 border border-white/[0.04] text-[11px] font-mono text-zinc-300 space-y-1 mb-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Users affected:</span>
                    <span className="text-white font-medium">{signal.usersAffected}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Likely cause:</span>
                    <span className="text-blue-300 font-medium">{signal.likelyCause}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/[0.04]">
                <span className="text-[10px] font-mono text-zinc-500">{signal.metric}</span>
                <button
                  onClick={() => onInvestigateSignal(signal.id)}
                  className="flex items-center gap-1 text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 cursor-pointer"
                >
                  <span>Investigate</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
