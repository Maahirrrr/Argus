import React from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface OpportunityCardProps {
  onOpenOpportunity: (id: string) => void;
  onNavigateTab: () => void;
}

export const OpportunityCard: React.FC<OpportunityCardProps> = ({
  onOpenOpportunity,
  onNavigateTab,
}) => {
  return (
    <div className="p-4 rounded-[8px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[#0A0A0A] transition-all select-none flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#46A758]" />
            <span className="text-[13px] font-medium text-[#EDEDED]">Top Opportunity</span>
          </div>
          <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded-[3px] bg-[#10B981]/10 text-[#46A758] font-bold">
            #014 PRIORITY
          </span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-sm font-semibold text-[#EDEDED] leading-snug">
            Reduce high-value checkout drop-off
          </div>
          <p className="text-xs text-[#A1A1A1] line-clamp-2 leading-relaxed">
            Deploy dynamic secondary gateway failover when HDFC response latency exceeds 1,800ms.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[rgba(255,255,255,0.04)] text-xs font-mono-tech">
            <div>
              <span className="text-[#666666]">CONVICTION: </span>
              <span className="text-[#46A758] font-bold">94%</span>
            </div>
            <div>
              <span className="text-[#666666]">IMPACT: </span>
              <span className="text-[#EDEDED] font-bold">High (₹4.2Cr)</span>
            </div>
            <div>
              <span className="text-[#666666]">EVIDENCE: </span>
              <span className="text-[#EDEDED]">3 signals</span>
            </div>
            <div>
              <span className="text-[#666666]">STATUS: </span>
              <span className="text-[#0070F3]">In Review</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
        <button
          onClick={() => onOpenOpportunity('opp-014')}
          className="text-xs text-[#0070F3] hover:underline flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>View opportunity</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={onNavigateTab}
          className="text-xs text-[#666666] hover:text-[#EDEDED] transition-colors cursor-pointer"
        >
          All 19 →
        </button>
      </div>
    </div>
  );
};
