import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MONOGRAM_SVG_PATH } from '../ui/ArgusLogo';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Total duration 650ms (well within the 400–800ms max requirement)
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 180);
    }, 620);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center select-none"
        >
          <div className="flex flex-col items-center space-y-5">
            {/* SVG Monogram Drawing Animation */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                aria-label="Argus Monogram Boot"
              >
                <motion.path
                  d={MONOGRAM_SVG_PATH}
                  stroke="#FFFFFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#FFFFFF"
                  initial={{ pathLength: 0, fillOpacity: 0 }}
                  animate={{ pathLength: 1, fillOpacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    fillOpacity: { delay: 0.38, duration: 0.2, ease: 'easeOut' },
                  }}
                />
              </svg>
            </div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="text-sm font-extrabold tracking-[0.3em] text-[#F5F5F0] font-display">
                ARGUS
              </h1>
              <p className="text-[9px] font-mono-tech uppercase tracking-[0.25em] text-[#525252] mt-1">
                AI PRODUCT MANAGER OS
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
