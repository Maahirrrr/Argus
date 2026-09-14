import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AIRecommendationCardProps {
  onReviewEvidence: () => void;
  onCreateOpportunity: () => void;
}

export const AIRecommendationCard: React.FC<AIRecommendationCardProps> = ({
  onReviewEvidence,
  onCreateOpportunity,
}) => {
  return (
    <div className="p-4 rounded-[6px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0C0C0C] transition-all duration-200 select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono-tech uppercase font-bold text-[#0066FF] px-1.5 py-0.5 rounded-[3px] bg-[#0066FF]/10 border border-[#0066FF]/30">
              Argus intelligence
            </span>
            <span className="text-xs font-semibold text-[#EDEDED]">Recommendation</span>
          </div>
          <span className="text-xs font-mono-tech text-[#10B981] font-bold">91% Conviction</span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-sm font-semibold text-[#F5F5F5] leading-snug">
            Investigate onboarding friction before expanding acquisition spend.
          </div>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Correlated telemetry shows 18.2% drop-off at Aadhaar Face-RD step. Expanding paid traffic now would amplify funnel churn.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono-tech text-[#666666]">
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[rgba(255,255,255,0.06)] text-[#8A8A8A]">
              3 signals
            </span>
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[rgba(255,255,255,0.06)] text-[#8A8A8A]">
              17 feedback reports
            </span>
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[rgba(255,255,255,0.06)] text-[#8A8A8A]">
              1 A/B experiment
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-3">
        <button
          onClick={onReviewEvidence}
          className="px-3 py-1.5 rounded-[4px] bg-[#F5F5F5] hover:bg-[#FFFFFF] text-[#050505] text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors group/btn"
        >
          <span>Review Evidence</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform duration-150" />
        </button>

        <button
          onClick={onCreateOpportunity}
          className="px-3 py-1.5 rounded-[4px] bg-[#0E0E0E] hover:bg-[#161616] text-[#EDEDED] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)] text-xs font-medium cursor-pointer transition-colors"
        >
          Create opportunity
        </button>
      </div>
    </div>
  );
};
