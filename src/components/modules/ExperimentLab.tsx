import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import type { NavigationTab, ExperimentItem } from '../../types/tapwise';
import { DEMO_EXPERIMENT } from '../../data/demoData';

interface ExperimentLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ExperimentLab: React.FC<ExperimentLabProps> = ({ onNavigateTab }) => {
  const [exp] = useState<ExperimentItem>(DEMO_EXPERIMENT);
  const [split, setSplit] = useState<number>(50);
  const [isDeployed, setIsDeployed] = useState(false);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* 32 Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              EXPERIMENT LAB · CAUSAL INFERENCE
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#0066FF]/15 text-[#0066FF] border border-[#0066FF]/30">
              {isDeployed ? 'ACTIVE IN STATSIG' : exp.status.toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            EXPERIMENT 012 · {exp.title}
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Verify causal impact and statistical significance before 100% rollout.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('analytics')}
            className="px-3 py-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            Telemetry Chat →
          </button>
          <button
            onClick={() => setIsDeployed(true)}
            className={`btn-magnetic flex items-center gap-1.5 px-4 py-2 rounded-[3px] text-xs font-semibold cursor-pointer shadow-md transition-all ${
              isDeployed
                ? 'bg-[#10B981] text-white cursor-default shadow-[#10B981]/20'
                : 'bg-[#0066FF] hover:bg-[#1A75FF] text-white shadow-[#0066FF]/25'
            }`}
          >
            {isDeployed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isDeployed ? 'Deployed to Flag' : 'Deploy to Feature Flag'}</span>
          </button>
        </div>
      </div>

      {/* 32 Structured Fields Banner: Hypothesis */}
      <div className="p-5 bg-[#0A0A0A] border border-[#0066FF]/30 rounded-[4px]">
        <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] font-bold block mb-1">
          HYPOTHESIS STATEMENT:
        </span>
        <p className="text-xs sm:text-sm text-[#F5F5F0] font-mono-tech leading-relaxed bg-[#050505] p-3.5 rounded-[3px] border border-[#161616]">
          "{exp.hypothesis}"
        </p>
      </div>

      {/* Structured Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-[3px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">SAMPLE SIZE</span>
          <p className="text-base font-bold font-mono-tech text-[#F5F5F0]">{exp.sampleSize}</p>
          <p className="text-[10px] text-[#525252] font-mono-tech mt-0.5">80% statistical power (β)</p>
        </div>

        <div className="p-4 rounded-[3px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">DURATION</span>
          <p className="text-xl font-bold font-mono-tech text-[#F5F5F0]">{exp.duration}</p>
          <p className="text-[10px] text-[#525252] font-mono-tech mt-0.5">At 18k daily volume</p>
        </div>

        <div className="p-4 rounded-[3px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">EXPECTED IMPACT</span>
          <p className="text-xl font-bold font-mono-tech text-[#10B981]">{exp.primaryMetric.expectedLift}</p>
          <p className="text-[10px] text-[#525252] font-mono-tech mt-0.5">MDE: {exp.primaryMetric.mde}</p>
        </div>

        <div className="p-4 rounded-[3px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase block mb-1">DECISION RULE</span>
          <p className="text-xs font-mono-tech text-[#0066FF] line-clamp-2">{exp.decisionRule}</p>
          <p className="text-[10px] text-[#525252] font-mono-tech mt-0.5">Automatic ship threshold</p>
        </div>
      </div>

      {/* Traffic Allocation & Variants */}
      <div className="p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-4">
        <div className="flex items-center justify-between text-xs font-mono-tech">
          <span className="text-[#8A8A8A]">Traffic Allocation Split:</span>
          <span className="text-[#0066FF] font-bold">Control: {100 - split}% | Treatment: {split}%</span>
        </div>
        <input
          type="range"
          min="10"
          max="90"
          step="5"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          className="w-full accent-[#0066FF] h-1.5 bg-[#1D1D1D] rounded cursor-pointer"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#F5F5F0] font-mono-tech">{exp.control.name}</span>
              <span className="text-xs font-mono-tech text-[#525252]">{100 - split}% Traffic</span>
            </div>
            <p className="text-xs text-[#8A8A8A] font-mono-tech">{exp.control.description}</p>
          </div>

          <div className="p-4 rounded-[3px] bg-[#0E1016] border border-[#0066FF]/30">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-[#0066FF] font-mono-tech">{exp.treatment.name}</span>
              <span className="text-xs font-mono-tech text-[#0066FF] font-bold">{split}% Traffic</span>
            </div>
            <p className="text-xs text-[#F5F5F0] font-mono-tech">{exp.treatment.description}</p>
          </div>
        </div>
      </div>

      {/* Guardrail Circuit Breakers */}
      <div className="p-5 bg-[#0A0A0A] border border-[#EF4444]/25 rounded-[4px] space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#EF4444]" />
          <span className="text-xs font-mono-tech font-bold text-[#EF4444] uppercase tracking-wider">
            GUARDRAIL CONSTRAINTS (AUTOMATED CIRCUIT BREAKERS)
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {exp.guardrails.map((g, i) => (
            <div key={i} className="p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
              <span className="text-xs font-semibold text-[#F5F5F0] block mb-0.5">{g.name}</span>
              <span className="text-[10px] font-mono-tech text-[#EF4444]">{g.threshold}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
