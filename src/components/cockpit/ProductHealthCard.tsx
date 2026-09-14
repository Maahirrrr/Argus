import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ProductHealthCard: React.FC = () => {
  const pillars = [
    { name: 'Acquisition', score: 88, status: 'Good' },
    { name: 'Retention', score: 76, status: 'Warning' },
    { name: 'Activation', score: 92, status: 'Optimal' },
    { name: 'Engagement', score: 84, status: 'Good' },
  ];

  return (
    <div className="p-4 rounded-[6px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0C0C0C] transition-all duration-200 select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="text-[13px] font-medium text-[#EDEDED]">Product Health</span>
          </div>
          <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded-[3px] bg-[#10B981]/10 text-[#10B981] font-bold border border-[#10B981]/20">
            82 / 100
          </span>
        </div>

        <div className="mt-3 space-y-2">
          {pillars.map((p) => (
            <div key={p.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#A1A1A1]">{p.name}</span>
                <span className="text-[#EDEDED] font-bold">{p.score}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#141414] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    p.score > 85 ? 'bg-[#10B981]' : p.score > 75 ? 'bg-[#0066FF]' : 'bg-[#F59E0B]'
                  }`}
                  style={{ width: `${p.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.06)] text-[11px] text-[#666666] font-mono-tech flex items-center justify-between">
        <span>Status: Nominal</span>
        <span>ClickHouse Telemetry</span>
      </div>
    </div>
  );
};
