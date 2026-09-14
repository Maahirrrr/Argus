import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { SignalEvent } from './signalTypes';

export interface SignalEventStreamProps {
  events: SignalEvent[];
  onSelectEvent?: (event: SignalEvent) => void;
  className?: string;
}

export const SignalEventStream: React.FC<SignalEventStreamProps> = ({
  events,
  onSelectEvent,
  className = '',
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="text-[9px] font-mono-tech text-[#525252] uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-[#1A1A1A]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
        <span>LIVE EVENT STREAM</span>
      </div>

      <div className="space-y-1 overflow-hidden">
        <AnimatePresence initial={false}>
          {events.slice(0, 5).map((ev) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, x: -10, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectEvent && onSelectEvent(ev)}
              className="text-[10px] font-mono-tech p-1.5 rounded-[2px] bg-[#0A0A0A] hover:bg-[#121212] border border-[#1A1A1A] hover:border-[#2D2D2D] flex items-center justify-between gap-2 cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="text-[#525252] font-mono">{ev.timestamp}</span>
                <span className="text-[#F5F5F0] group-hover:text-white truncate font-medium">
                  {ev.title}
                </span>
              </div>
              <span
                className={`px-1 py-0.2 rounded text-[9px] font-bold whitespace-nowrap ${
                  ev.severity === 'high'
                    ? 'text-[#EF4444] bg-[#EF4444]/10'
                    : 'text-[#0066FF] bg-[#0066FF]/10'
                }`}
              >
                {ev.metricDelta}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
