import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import type { NavigationTab, WeeklyReviewData } from '../../types/finpilot';
import { DEMO_WEEKLY_REVIEW } from '../../data/demoData';

interface WeeklyReviewPageProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const WeeklyReviewPage: React.FC<WeeklyReviewPageProps> = ({ onNavigateTab }) => {
  const [data] = useState<WeeklyReviewData>(DEMO_WEEKLY_REVIEW);
  const [approvals, setApprovals] = useState({
    'Engineering Lead': true,
    'Risk & Compliance': false,
    'VP Product': false,
  });

  const toggleApproval = (role: string) => {
    setApprovals(prev => ({ ...prev, [role]: !prev[role as keyof typeof prev] }));
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto py-6 px-4 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/[0.08] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400">
              AUTONOMOUS PM AGENT BRIEFING
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/25">
              {data.week} · {data.dateRange}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Weekly Product Review
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Product Health Score: <strong className="text-white">{data.healthScore}/100</strong> ({data.healthGrade})
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('prioritize')}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer shadow-sm shadow-blue-600/30"
        >
          <span>Review Roadmap Priorities →</span>
        </button>
      </div>

      {/* Executive Summary */}
      <div className="p-5 rounded-2xl bg-[#090a0d] border border-blue-500/30 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300">
            Executive Summary
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-200 font-mono leading-relaxed">
          {data.executiveSummary}
        </p>
      </div>

      {/* What Improved vs What Worsened */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.08] space-y-3">
          <span className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider block">
            What Improved This Week
          </span>
          {data.whatImproved.map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/20">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">{item.metric}</span>
                <span className="font-mono text-emerald-400 font-bold">{item.delta}</span>
              </div>
              <p className="text-[11px] text-zinc-400">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.08] space-y-3">
          <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider block">
            What Worsened This Week
          </span>
          {data.whatWorsened.map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-red-950/10 border border-red-500/20">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-white">{item.metric}</span>
                <span className="font-mono text-red-400 font-bold">{item.delta}</span>
              </div>
              <p className="text-[11px] text-zinc-400">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biggest Opportunity & Biggest Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-blue-950/15 border border-blue-500/30">
          <span className="text-[10px] font-mono uppercase text-blue-300 font-bold block mb-1">
            Biggest Opportunity:
          </span>
          <h4 className="text-xs font-bold text-white mb-1">{data.biggestOpportunity.title}</h4>
          <p className="text-[11px] text-zinc-300 font-mono">{data.biggestOpportunity.impact}</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-950/15 border border-amber-500/30">
          <span className="text-[10px] font-mono uppercase text-amber-300 font-bold block mb-1">
            Biggest Product Risk:
          </span>
          <h4 className="text-xs font-bold text-white mb-1">{data.biggestRisk.title}</h4>
          <p className="text-[11px] text-zinc-300 font-mono">{data.biggestRisk.impact}</p>
        </div>
      </div>

      {/* Stakeholder Sign-Offs */}
      <div className="p-5 rounded-xl bg-[#090a0d] border border-white/[0.08] space-y-3">
        <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block">
          Cross-Functional Sign-Offs:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(approvals).map(([role, approved]) => (
            <button
              key={role}
              onClick={() => toggleApproval(role)}
              className={`p-3 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                approved
                  ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:text-white'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{role}</span>
                <span className="text-[10px] font-mono opacity-70">
                  {approved ? 'Approved & Signed' : 'Pending Review'}
                </span>
              </div>
              <CheckCircle2 className={`w-4 h-4 ${approved ? 'text-emerald-400' : 'text-zinc-600'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
