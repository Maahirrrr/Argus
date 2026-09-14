import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SignalEvent } from './signalData';

interface SignalEventStreamProps {
  events: SignalEvent[];
  onSelectEvent?: (ev: SignalEvent) => void;
}

export const SignalEventStream: React.FC<SignalEventStreamProps> = ({
  events,
  onSelectEvent,
}) => {
  const getBadgeClass = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'text-[#EF4444] bg-[#EF4444]/10 border-[#EF4444]/30';
      case 'warning':
        return 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      default:
        return 'text-[#0066FF] bg-[#0066FF]/10 border-[#0066FF]/30';
    }
  };

  return (
    <div className="w-full bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-2.5 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between pb-1.5 border-b border-[#1D1D1D] text-[9px] font-mono-tech">
        <div className="flex items-center gap-1.5 text-[#F5F5F0] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
          <span>LIVE EVENT STREAM</span>
        </div>
        <span className="text-[#555] text-[8.5px]">AUTO-CORRELATED</span>
      </div>

      <div className="space-y-1 mt-1.5 max-h-[105px] overflow-hidden">
        <AnimatePresence initial={false}>
          {events.slice(0, 4).map((ev) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectEvent && onSelectEvent(ev)}
              className="flex items-center justify-between py-1 px-1.5 rounded-[2px] bg-[#0E0E0E] hover:bg-[#141414] border border-[#181818] text-[9px] font-mono-tech transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#555] font-mono-tech">{ev.timestamp}</span>
                <span className="font-bold text-[#D0D0D0] truncate">{ev.title}</span>
              </div>
              <span
                className={`px-1.5 py-0.2 rounded-[2px] border text-[8.5px] font-mono-tech font-bold flex-shrink-0 ${getBadgeClass(
                  ev.severity
                )}`}
              >
                {ev.value}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
