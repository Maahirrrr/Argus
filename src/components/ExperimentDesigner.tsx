import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Percent,
  Clock,
  Users,
  BarChart2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  TrendingUp
} from 'lucide-react';
import type { ExperimentConfig, ModuleType } from '../types/finpilot';
import { DEFAULT_EXPERIMENT } from '../data/fintechScenarios';

interface ExperimentDesignerProps {
  onNavigateToModule: (m: ModuleType) => void;
}

export const ExperimentDesigner: React.FC<ExperimentDesignerProps> = ({ onNavigateToModule }) => {
  const [exp] = useState<ExperimentConfig>(DEFAULT_EXPERIMENT);
  const [trafficAllocation, setTrafficAllocation] = useState<number>(50); // 50% split
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 blur-[90px] pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="section-label">A/B Testing & Causal Inference</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                {exp.status.toUpperCase()}
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {exp.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Define causal hypotheses, guardrail metrics, and statistical power before deploying routing changes to live UPI transaction volume.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={() => onNavigateToModule('analytics')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 cursor-pointer transition-all"
            >
              View Telemetry →
            </button>
            <button
              onClick={handleLaunch}
              disabled={isLaunched}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg ${
                isLaunched
                  ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/25'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white shadow-cyan-600/25'
              }`}
            >
              {isLaunched ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>Experiment Active (Live)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Deploy to Feature Flag</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Hypothesis Callout */}
        <div className="my-6 p-5 rounded-2xl bg-[#08090d] border border-cyan-500/30 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
              Causal Hypothesis
            </span>
          </div>
          <p className="text-sm text-zinc-200 font-mono leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/[0.05]">
            "{exp.hypothesis}"
          </p>
        </div>

        {/* Statistical Power & Sample Size Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 relative z-10">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">Required Sample</span>
              <Users className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <p className="text-base font-mono font-bold text-white">
              {exp.sampleSize}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Two-sample Z-test</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">Estimated Duration</span>
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-xl font-mono font-black text-white">
              {exp.estimatedDuration}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">At current volume</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">Expected Lift</span>
              <Percent className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <p className="text-xl font-mono font-black text-emerald-400">
              {exp.primaryMetric.expectedLift}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">MDE: {exp.primaryMetric.mde}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[10px] font-mono uppercase tracking-wider">Decision Rule</span>
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <p className="text-xs font-mono font-medium text-cyan-300 line-clamp-2">
              {exp.decisionFramework.shipRule}
            </p>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Automatic ship threshold</p>
          </div>
        </div>

        {/* Variant Breakdown & Traffic Allocation */}
        <div className="mb-6 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Variant Architecture & Dynamic Traffic Split
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              Variant A Allocation: {trafficAllocation}%
            </span>
          </div>

          {/* Interactive Traffic Split Slider */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] mb-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
              <span>Control: {100 - trafficAllocation}%</span>
              <span>Variant A (Reversal Radar): {trafficAllocation}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={trafficAllocation}
              onChange={(e) => setTrafficAllocation(Number(e.target.value))}
              className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exp.variants.map((v, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-2xl border ${
                  v.type !== 'Control'
                    ? 'bg-gradient-to-b from-indigo-950/30 to-[#08090d] border-cyan-500/40'
                    : 'bg-[#08090d] border-white/[0.08]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    v.type !== 'Control'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {v.name}
                  </span>
                  <span className="text-xs font-mono font-bold text-zinc-400">
                    {v.type !== 'Control' ? `${trafficAllocation}%` : `${100 - trafficAllocation}%`}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 font-medium mb-3">{v.description}</p>

                <div className="p-3 rounded-xl bg-black/50 border border-white/[0.04]">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-1">
                    Visual Experience:
                  </span>
                  <p className="text-xs text-zinc-300 font-mono leading-relaxed">{v.mockVisual}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary & Guardrail Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {/* Primary Metric */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
                Primary North Star Metric
              </span>
            </div>
            <h4 className="text-base font-bold text-white font-syne mb-1">
              {exp.primaryMetric.name}
            </h4>
            <div className="flex items-baseline gap-3 my-2 font-mono">
              <span className="text-xs text-zinc-400">Baseline: {exp.primaryMetric.baseline}</span>
              <ArrowRight className="w-3 h-3 text-zinc-600" />
              <span className="text-base font-black text-emerald-400">{exp.primaryMetric.expectedLift}</span>
            </div>
          </div>

          {/* Guardrail Metrics */}
          <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-300">
                Guardrail Constraints (Circuit Breakers)
              </span>
            </div>
            <div className="flex flex-col gap-2.5 mt-2">
              {exp.guardrailMetrics.map((gm, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/[0.04] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white block">{gm.name}</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-1 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    {gm.threshold}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
