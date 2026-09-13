import React, { useState } from 'react';
import {
  TrendingDown,
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  UserCheck,
  FileCode2
} from 'lucide-react';
import type { WeeklyProductReview, ModuleType } from '../types/finpilot';
import { WEEKLY_REVIEW_DATA } from '../data/fintechScenarios';

interface WeeklyAgentReviewProps {
  onNavigateToModule: (m: ModuleType) => void;
}

export const WeeklyAgentReview: React.FC<WeeklyAgentReviewProps> = ({ onNavigateToModule }) => {
  const [review] = useState<WeeklyProductReview>(WEEKLY_REVIEW_DATA);
  const [signedOff, setSignedOff] = useState<Record<string, boolean>>({
    'Engineering Lead': true,
    'Risk & Compliance': false,
    'Product VP': false,
  });

  const toggleSignOff = (role: string) => {
    setSignedOff(prev => ({ ...prev, [role]: !prev[role] }));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/5 blur-[90px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="section-label">Autonomous Product Agent</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                {review.weekDate}
              </span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25">
                HEALTH: {review.overallHealth.toUpperCase()} (Score {review.overallScore}/100)
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Weekly Fintech Health & Anomaly Brief
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Synthesized by FinPilot Agent at Monday 08:00 AM IST. Correlating 4.2M events, 480+ Zendesk tickets, and gateway health across 6 partner banks.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => onNavigateToModule('prioritization')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg shadow-indigo-600/25 transition-all"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              <span>Review Sprint Backlog →</span>
            </button>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="my-6 p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300">
              Agent Executive Summary
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
            {review.executiveSummary}
          </p>
        </div>

        {/* Key Metric Shifts Table */}
        <div className="mb-6 relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Core Metric Drift This Week
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {review.keyMetricShifts.map((shift, i) => (
              <div
                key={i}
                className={`p-4 rounded-2xl border ${
                  !shift.isGood
                    ? 'bg-rose-950/10 border-rose-500/30'
                    : 'bg-white/[0.02] border-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-xs font-semibold text-white font-syne">{shift.name}</span>
                  <span className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    !shift.isGood ? 'text-rose-400' : 'text-emerald-400'
                  }`}>
                    {!shift.isGood ? <TrendingDown className="w-3.5 h-3.5" /> : <TrendingUp className="w-3.5 h-3.5" />}
                    {shift.delta}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 font-mono mb-2">
                  <span className="text-xs text-zinc-500 line-through">{shift.previous}</span>
                  <ArrowRight className="w-3 h-3 text-zinc-600" />
                  <span className="text-xl font-bold text-white">{shift.current}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Root Cause & Recommended Action */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
          <div className="p-5 rounded-2xl bg-[#08090d] border border-white/[0.08]">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                What Matters Most
              </span>
            </div>
            <h4 className="text-xs font-bold text-white font-syne mb-1">{review.whatMatters.headline}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-2">{review.whatMatters.evidence}</p>
            <span className="text-[10px] font-mono text-indigo-300">Target Cohort: {review.whatMatters.affectedCohort}</span>
          </div>

          <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300">
                Recommended Experiment ({review.recommendedExperiment.effortEstimate})
              </span>
            </div>
            <h4 className="text-xs font-bold text-white font-syne mb-1">{review.recommendedExperiment.title}</h4>
            <p className="text-xs text-zinc-200 leading-relaxed mb-2 font-mono">{review.recommendedExperiment.description}</p>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">Outcome: {review.recommendedExperiment.expectedOutcome}</span>
          </div>
        </div>

        {/* Stakeholder Sign-Offs */}
        <div className="p-5 rounded-2xl bg-[#08090d] border border-white/[0.08] relative z-10">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block mb-3">
            Cross-Functional PM Review Sign-Off
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {Object.entries(signedOff).map(([role, isApproved]) => (
              <button
                key={role}
                onClick={() => toggleSignOff(role)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isApproved
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold block">{role}</span>
                  <span className="text-[10px] font-mono opacity-70">
                    {isApproved ? 'Approved & Signed' : 'Pending Review'}
                  </span>
                </div>
                <UserCheck className={`w-4 h-4 ${isApproved ? 'text-emerald-400' : 'text-zinc-600'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
