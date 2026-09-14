import React from 'react';
import { Map, ArrowRight } from 'lucide-react';

interface RoadmapCardProps {
  onNavigateTab: () => void;
}

export const RoadmapCard: React.FC<RoadmapCardProps> = ({ onNavigateTab }) => {
  const roadmapStages = [
    { label: 'NOW', count: 3, title: 'Smart Failover Engine', color: 'bg-[#10B981]' },
    { label: 'NEXT', count: 4, title: 'Aadhaar Face-RD Compliant Flow', color: 'bg-[#0066FF]' },
    { label: 'LATER', count: 6, title: 'Autonomous PRD Synthesizer', color: 'bg-[#666666]' },
  ];

  return (
    <div className="p-4 rounded-[6px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0C0C0C] transition-all duration-200 select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <Map className="w-3.5 h-3.5 text-[#EDEDED]" />
            <span className="text-[13px] font-medium text-[#EDEDED]">Roadmap Health</span>
          </div>
          <span className="text-[11px] font-mono-tech text-[#666666]">13 initiatives</span>
        </div>

        <div className="mt-3 space-y-2.5">
          {roadmapStages.map((st) => (
            <div key={st.label} className="p-2 rounded-[4px] bg-[#0C0C0C] border border-[rgba(255,255,255,0.04)]">
              <div className="flex items-center justify-between text-[11px] font-mono-tech">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${st.color}`} />
                  <span className="font-bold text-[#EDEDED]">{st.label}</span>
                </div>
                <span className="text-[#666666]">{st.count} items</span>
              </div>
              <div className="text-xs text-[#A1A1A1] truncate mt-1">
                {st.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNavigateTab}
        className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer group/link"
      >
        <span>Open roadmap studio</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#0066FF] group-hover/link:translate-x-0.5 transition-transform duration-150" />
      </button>
    </div>
  );
};
