import React from 'react';
import {
  Activity,
  Sparkles,
  Server,
  Smartphone,
  CreditCard,
  Clock,
  FileCode2,
  SlidersHorizontal,
  TrendingDown
} from 'lucide-react';
import type { ProductProblem, ModuleType } from '../types/finpilot';

interface ProductIntelligenceProps {
  problem: ProductProblem;
  onNavigateToModule: (m: ModuleType) => void;
}

export const ProductIntelligence: React.FC<ProductIntelligenceProps> = ({
  problem,
  onNavigateToModule,
}) => {
  const getContributorIcon = (type: string) => {
    switch (type) {
      case 'bank': return Server;
      case 'os': return Smartphone;
      case 'tier': return CreditCard;
      case 'time': return Clock;
      default: return Activity;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner: Incident Alert */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/5 blur-[100px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                Live Incident Detected · {problem.detectedAt}
              </span>
              <span className="text-[10px] font-mono text-zinc-400 border border-white/10 px-2 py-0.5 rounded-full">
                {problem.scope}
              </span>
            </div>
            <h1 className="font-syne text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {problem.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {problem.summary}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0 bg-white/[0.02] p-4 rounded-2xl border border-white/[0.06]">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 block mb-0.5">METRIC SHIFT</span>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-mono text-zinc-500 line-through">{problem.baseline}</span>
                <span className="text-2xl font-mono font-black text-rose-400">{problem.current}</span>
              </div>
            </div>
            <div className="pl-4 border-l border-white/[0.08] text-right">
              <span className="text-[10px] font-mono text-zinc-500 block mb-0.5">NET DELTA</span>
              <span className="text-sm font-mono font-bold text-rose-400 flex items-center justify-end gap-1">
                <TrendingDown className="w-3.5 h-3.5" />
                {problem.delta}
              </span>
            </div>
          </div>
        </div>

        {/* Likely Contributors Section */}
        <div className="pt-6 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <span className="section-label">Root Cause Decomposition (ClickHouse Event Logs)</span>
            <span className="text-[10px] font-mono text-zinc-500">4.2M events analyzed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {problem.contributors.map((c, idx) => {
              const Icon = getContributorIcon(c.type);
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.06] transition-all flex items-start gap-3.5 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 text-cyan-400 group-hover:border-cyan-500/40 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs font-bold text-white font-syne truncate">{c.label}</h4>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 flex-shrink-0">
                        {c.impact}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{c.detail}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-rose-400 rounded-full"
                          style={{ width: `${c.sharePercent}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 font-semibold">
                        {c.sharePercent}% share
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recommendation Banner */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/25 to-indigo-950/40 border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center flex-shrink-0 text-cyan-300 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                  AI Recommendation
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Decision Confidence: 94%
                </span>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-mono">
                {problem.aiRecommendation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigateToModule('prd')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/25 transition-all"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Create PRD →</span>
            </button>

            <button
              onClick={() => onNavigateToModule('prioritization')}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 text-zinc-200 cursor-pointer transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Prioritize Initiative</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
