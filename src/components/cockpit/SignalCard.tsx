import React from 'react';
import { Activity, ArrowRight } from 'lucide-react';

interface SignalCardProps {
  onOpenSignal: (id: string) => void;
  onNavigateTab: () => void;
}

export const SignalCard: React.FC<SignalCardProps> = ({ onOpenSignal, onNavigateTab }) => {
  const events = [
    { id: 's1', time: '08:42', title: 'Checkout failure surge', delta: '+18.4%', status: 'critical' },
    { id: 's2', time: '08:39', title: 'Refund complaints spike', delta: '+21%', status: 'warning' },
    { id: 's3', time: '08:31', title: 'Android 15 callback drop', delta: '+12.2%', status: 'critical' },
  ];

  return (
    <div className="p-4 rounded-[6px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0C0C0C] transition-all duration-200 select-none flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#0066FF]" />
            <span className="text-[13px] font-medium text-[#EDEDED]">Telemetry Signals</span>
          </div>
          <span className="text-[11px] font-mono-tech text-[#666666]">124 active</span>
        </div>

        {/* Status Breakdown Pills */}
        <div className="flex items-center gap-3 my-3 text-[11px] font-mono-tech">
          <div className="flex items-center gap-1.5 text-[#EDEDED]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
            <span>18 New</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#EF4444]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            <span>4 Critical</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#A1A1A1]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            <span>102 Stable</span>
          </div>
        </div>

        {/* Mini event list */}
        <div className="space-y-1.5">
          {events.map((ev) => (
            <div
              key={ev.id}
              onClick={() => onOpenSignal(ev.id)}
              className="flex items-center justify-between p-2 rounded-[4px] bg-[#0C0C0C] hover:bg-[#141414] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.08)] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[10px] font-mono-tech text-[#666666]">{ev.time}</span>
                <span className="text-xs text-[#EDEDED] font-medium truncate">{ev.title}</span>
              </div>
              <span
                className={`text-[10px] font-mono-tech font-bold px-1 py-0.5 rounded-[2px] ${
                  ev.status === 'critical' ? 'text-[#EF4444] bg-[#EF4444]/10' : 'text-[#F59E0B] bg-[#F59E0B]/10'
                }`}
              >
                {ev.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onNavigateTab}
        className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between text-xs text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer group/link"
      >
        <span>View all 124 signals</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#0066FF] group-hover/link:translate-x-0.5 transition-transform duration-150" />
      </button>
    </div>
  );
};
