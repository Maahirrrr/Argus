import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AnimatedTooltipProps {
  what: string;
  why?: string;
  children: React.ReactNode;
  side?: 'top' | 'bottom';
}

export const AnimatedTooltip: React.FC<AnimatedTooltipProps> = ({
  what,
  why,
  children,
  side = 'top',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: side === 'top' ? 4 : -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: side === 'top' ? 2 : -2, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 w-max max-w-xs p-2 bg-[#0E0E0E] border border-[#222] rounded-[2px] shadow-xl text-left ${
              side === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}
          >
            <div className="text-[11px] font-mono-tech text-[#F5F5F0] font-semibold">{what}</div>
            {why && (
              <div className="text-[10px] font-mono-tech text-[#8A8A8A] mt-0.5 leading-tight">
                {why}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
