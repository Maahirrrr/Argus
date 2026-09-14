import React from 'react';
import { ExternalLink } from 'lucide-react';

interface IntelligenceStatusProps {
  onNavigateToIntelligence: () => void;
}

export const IntelligenceStatus: React.FC<IntelligenceStatusProps> = ({
  onNavigateToIntelligence,
}) => {
  return (
    <div className="w-full bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-2.5 flex flex-col justify-between select-none">
      <div className="text-[9px] font-mono-tech font-bold uppercase tracking-wider text-[#8A8A8A] flex items-center justify-between pb-1.5 border-b border-[#1D1D1D]">
        <span>INTELLIGENCE</span>
        <span className="text-[#10B981]">ACTIVE</span>
      </div>

      <div className="grid grid-cols-3 gap-2 my-2 text-left">
        <div>
          <div className="text-sm sm:text-base font-bold font-display text-[#10B981] leading-none">
            92%
          </div>
          <div className="text-[8px] font-mono-tech uppercase text-[#555] mt-0.5">
            CONVICTION
          </div>
        </div>

        <div>
          <div className="text-sm sm:text-base font-bold font-display text-[#F5F5F0] leading-none">
            +18.4%
          </div>
          <div className="text-[8px] font-mono-tech uppercase text-[#555] mt-0.5 truncate">
            STRONGEST SIGNAL
          </div>
        </div>

        <div>
          <div className="text-sm sm:text-base font-bold font-display text-[#0066FF] leading-none">
            04
          </div>
          <div className="text-[8px] font-mono-tech uppercase text-[#555] mt-0.5 truncate">
            ACTIVE INSIGHTS
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onNavigateToIntelligence}
        className="w-full py-1.5 px-2 rounded-[2px] bg-[#121212] hover:bg-[#181818] border border-[#222] hover:border-[#333] text-[9px] font-mono-tech text-[#F5F5F0] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
      >
        <span>Explore Intelligence</span>
        <ExternalLink className="w-3 h-3 text-[#0066FF]" />
      </button>
    </div>
  );
};
