import React, { useState } from 'react';
import {
  CheckCircle2,
  FileText,
  Download
} from 'lucide-react';
import type { NavigationTab, WeeklyReviewData } from '../../types/argus';
import { DEMO_WEEKLY_REVIEW } from '../../data/demoData';

interface WeeklyReviewPageProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const WeeklyReviewPage: React.FC<WeeklyReviewPageProps> = ({ onNavigateTab }) => {
  const [data] = useState<WeeklyReviewData>(DEMO_WEEKLY_REVIEW);
  const [approvals, setApprovals] = useState<Record<string, boolean>>({
    'Engineering Lead': true,
    'Risk & Compliance': false,
    'VP Product': false,
  });
  const [exported, setExported] = useState(false);

  const toggleApproval = (role: string) => {
    setApprovals(prev => ({ ...prev, [role]: !prev[role] }));
  };

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto py-8 px-4 sm:px-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-[#1D1D1D] gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-[#0066FF] font-bold">
              AUTONOMOUS PM AGENT BRIEFING
            </span>
            <span className="text-[10px] font-mono-tech px-2 py-0.2 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/25">
              {data.week} · {data.dateRange}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F5F5F0] tracking-tight font-display">
            WEEKLY PRODUCT REVIEW
          </h1>
          <p className="text-xs text-[#8A8A8A] font-mono-tech mt-1">
            Product Health Score: <strong className="text-[#F5F5F0]">{data.healthScore}/100</strong> ({data.healthGrade})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{exported ? 'Exported MD' : 'Export Briefing'}</span>
          </button>
          <button
            onClick={() => onNavigateTab('prioritize')}
            className="btn-magnetic flex items-center gap-1.5 px-4 py-1.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20"
          >
            <span>Review Roadmap Priorities →</span>
          </button>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="p-6 bg-[#0A0A0A] border border-[#0066FF]/30 rounded-[4px] space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#0066FF]" />
          <span className="text-[10px] font-mono-tech font-bold uppercase tracking-wider text-[#0066FF]">
            Executive Summary
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#F5F5F0] font-mono-tech leading-relaxed">
          {data.executiveSummary}
        </p>
      </div>

      {/* What Improved vs What Worsened */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-3">
          <span className="text-xs font-bold text-[#10B981] font-mono-tech uppercase tracking-wider block">
            What Improved This Week
          </span>
          {data.whatImproved.map((item, i) => (
            <div key={i} className="p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-[#F5F5F0]">{item.metric}</span>
                <span className="font-mono-tech text-[#10B981] font-bold">{item.delta}</span>
              </div>
              <p className="text-[11px] text-[#8A8A8A] font-mono-tech">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-3">
          <span className="text-xs font-bold text-[#EF4444] font-mono-tech uppercase tracking-wider block">
            What Worsened This Week
          </span>
          {data.whatWorsened.map((item, i) => (
            <div key={i} className="p-3 rounded-[3px] bg-[#050505] border border-[#161616]">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-[#F5F5F0]">{item.metric}</span>
                <span className="font-mono-tech text-[#EF4444] font-bold">{item.delta}</span>
              </div>
              <p className="text-[11px] text-[#8A8A8A] font-mono-tech">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Biggest Opportunity & Biggest Risk */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#0A0A0A] border border-[#0066FF]/30 rounded-[4px]">
          <span className="text-[10px] font-mono-tech uppercase text-[#0066FF] font-bold block mb-1">
            Biggest Opportunity:
          </span>
          <h4 className="text-xs font-bold text-[#F5F5F0] mb-1 font-display">{data.biggestOpportunity.title}</h4>
          <p className="text-[11px] text-[#8A8A8A] font-mono-tech">{data.biggestOpportunity.impact}</p>
        </div>

        <div className="p-4 bg-[#0A0A0A] border border-[#F59E0B]/30 rounded-[4px]">
          <span className="text-[10px] font-mono-tech uppercase text-[#F59E0B] font-bold block mb-1">
            Biggest Product Risk:
          </span>
          <h4 className="text-xs font-bold text-[#F5F5F0] mb-1 font-display">{data.biggestRisk.title}</h4>
          <p className="text-[11px] text-[#8A8A8A] font-mono-tech">{data.biggestRisk.impact}</p>
        </div>
      </div>

      {/* Cross-Functional Sign-Offs */}
      <div className="p-5 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] space-y-3">
        <span className="text-[10px] font-mono-tech uppercase text-[#525252] font-bold block">
          CROSS-FUNCTIONAL SIGN-OFFS:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {Object.entries(approvals).map(([role, approved]) => (
            <button
              key={role}
              onClick={() => toggleApproval(role)}
              className={`p-3 rounded-[3px] border text-left cursor-pointer transition-all flex items-center justify-between ${
                approved
                  ? 'bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981]'
                  : 'bg-[#050505] border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{role}</span>
                <span className="text-[10px] font-mono-tech opacity-70">
                  {approved ? 'Approved & Signed' : 'Pending Review'}
                </span>
              </div>
              <CheckCircle2 className={`w-4 h-4 ${approved ? 'text-[#10B981]' : 'text-[#525252]'}`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
