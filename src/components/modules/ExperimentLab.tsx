import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import type { NavigationTab, ExperimentItem } from '../../types/finpilot';
import { DEMO_EXPERIMENT } from '../../data/demoData';

interface ExperimentLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ExperimentLab: React.FC<ExperimentLabProps> = ({ onNavigateTab }) => {
  const [exp] = useState<ExperimentItem>(DEMO_EXPERIMENT);
  const [split, setSplit] = useState<number>(50);
  const [isDeployed, setIsDeployed] = useState(false);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              EXPERIMENT LAB · CAUSAL INFERENCE
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/25">
              {isDeployed ? 'ACTIVE IN STATSIG' : exp.status.toUpperCase()}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {exp.title}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Verify causal impact and statistical significance before 100% rollout.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-mono text-zinc-300 cursor-pointer"
          >
            Telemetry Chat →
          </button>
          <button
            onClick={() => setIsDeployed(true)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold cursor-pointer shadow-sm transition-all ${
              isDeployed
                ? 'bg-emerald-600 text-white cursor-default shadow-emerald-600/20'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
            }`}
          >
            {isDeployed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isDeployed ? 'Deployed to Feature Flag' : 'Deploy to Flag'}</span>
          </button>
        </div>
      </div>

      {/* Hypothesis Banner */}
      <div className="p-5 rounded-2xl bg-[#090a0d] border border-blue-500/30 shadow-xl">
        <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block mb-1">
          Causal Hypothesis Statement:
        </span>
        <p className="text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed bg-black/40 p-3.5 rounded-xl border border-white/[0.04]">
          "{exp.hypothesis}"
        </p>
      </div>

      {/* Stats Grid: Sample Size, MDE, Duration, Decision Rule */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Sample Size</span>
          <p className="text-base font-bold font-mono text-white">{exp.sampleSize}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">80% statistical power (β)</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Duration</span>
          <p className="text-xl font-bold font-mono text-white">{exp.duration}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">At 18k daily volume</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Expected Lift</span>
          <p className="text-xl font-bold font-mono text-emerald-400">{exp.primaryMetric.expectedLift}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">MDE: {exp.primaryMetric.mde}</p>
        </div>

        <div className="p-4 rounded-xl bg-[#090a0d] border border-white/[0.08]">
          <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">Decision Rule</span>
          <p className="text-xs font-mono text-blue-300 line-clamp-2">{exp.decisionRule}</p>
          <p className="text-[10px] text-zinc-500 font-mono mt-0.5">Automatic ship threshold</p>
        </div>
      </div>

      {/* Traffic Split & Variant Comparison */}
      <div className="p-6 rounded-2xl bg-[#090a0d] border border-white/[0.08] shadow-xl space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-zinc-400">Traffic Allocation:</span>
          <span className="text-blue-400 font-bold">Control: {100 - split}% | Treatment: {split}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          step="5"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="w-full accent-blue-500 h-2 bg-zinc-800 rounded cursor-pointer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-zinc-300 font-mono">{exp.control.name}</span>
              <span className="text-xs font-mono text-zinc-500">{100 - split}% Traffic</span>
            </div>
            <p className="text-xs text-zinc-400">{exp.control.description}</p>
          </div>

          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-blue-300 font-mono">{exp.treatment.name}</span>
              <span className="text-xs font-mono text-blue-400 font-bold">{split}% Traffic</span>
            </div>
            <p className="text-xs text-zinc-300">{exp.treatment.description}</p>
          </div>
        </div>
      </div>

      {/* Guardrail Circuit Breakers */}
      <div className="p-5 rounded-2xl bg-red-950/10 border border-red-500/25 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          <span className="text-xs font-mono font-bold text-red-300 uppercase tracking-wider">
            Guardrail Constraints (Automated Circuit Breakers)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {exp.guardrails.map((g, i) => (
            <div key={i} className="p-3 rounded-lg bg-black/40 border border-white/[0.04]">
              <span className="text-xs font-semibold text-white block mb-0.5">{g.name}</span>
              <span className="text-[10px] font-mono text-red-400">{g.threshold}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
