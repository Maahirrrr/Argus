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
    <div className="p-4 rounded-[8px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[#0A0A0A] transition-all select-none flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono-tech uppercase font-bold text-[#0070F3] px-1.5 py-0.5 rounded-[2px] bg-[#0070F3]/10 border border-[#0070F3]/30">
              ARGUS INTELLIGENCE
            </span>
            <span className="text-xs font-semibold text-[#EDEDED]">Recommendation</span>
          </div>
          <span className="text-xs font-mono-tech text-[#46A758] font-bold">91% Conviction</span>
        </div>

        <div className="mt-3 space-y-2">
          <div className="text-sm font-semibold text-[#EDEDED] leading-snug">
            Investigate onboarding friction before expanding acquisition spend.
          </div>
          <p className="text-xs text-[#A1A1A1] leading-relaxed">
            Correlated telemetry shows 18.2% drop-off at Aadhaar Face-RD step. Expanding paid traffic now would amplify funnel churn.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono-tech text-[#666666]">
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[#222]">
              3 signals
            </span>
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[#222]">
              17 feedback reports
            </span>
            <span className="px-2 py-0.5 rounded-[3px] bg-[#121212] border border-[#222]">
              1 A/B experiment
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center gap-3">
        <button
          onClick={onReviewEvidence}
          className="argus-btn-primary text-xs flex items-center gap-1.5 cursor-pointer"
        >
          <span>Review Evidence</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        <button
          onClick={onCreateOpportunity}
          className="argus-btn-secondary text-xs cursor-pointer"
        >
          Create Opportunity
        </button>
      </div>
    </div>
  );
};
