import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1200; // 1.2s max

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const current = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(current);

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 400);
        }, 150);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center select-none"
        >
          <div className="w-full max-w-xs px-6 flex flex-col items-center">
            {/* Wordmark */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl font-bold tracking-[0.25em] text-[#F5F5F0] mb-2 font-display"
            >
              TAPWISE
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
              className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-[#8A8A8A] mb-8"
            >
              PRODUCT INTELLIGENCE / 001
            </motion.p>

            {/* Thin Horizontal Progress Line */}
            <div className="w-full h-[1px] bg-[#1D1D1D] relative overflow-hidden">
              <div
                className="absolute top-0 left-0 bottom-0 bg-[#F5F5F0] transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Numeric readout */}
            <div className="w-full flex justify-between items-center mt-3 text-[10px] font-mono-tech text-[#525252]">
              <span>INITIALIZING CORE</span>
              <span className="text-[#8A8A8A]">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
