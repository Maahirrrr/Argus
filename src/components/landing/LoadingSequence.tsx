import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MONOGRAM_SVG_PATH } from '../ui/ArgusLogo';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [bootStatus, setBootStatus] = useState('INITIALIZING ARGUS KERNEL...');

  useEffect(() => {
    const s1 = setTimeout(() => setBootStatus('CONNECTING SUPABASE POSTGRESQL...'), 200);
    const s2 = setTimeout(() => setBootStatus('SYNCHRONIZING TELEMETRY FABRIC...'), 400);
    const s3 = setTimeout(() => setBootStatus('COCKPIT READY'), 580);

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 180);
    }, 640);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      clearTimeout(s3);
      clearTimeout(timer);
    };
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
          <div className="flex flex-col items-center space-y-4">
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
              transition={{ delay: 0.15, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h1 className="text-sm font-extrabold tracking-[0.3em] text-[#F5F5F0] font-display">
                ARGUS
              </h1>
              <p className="text-[9px] font-mono-tech uppercase tracking-[0.25em] text-[#666666] mt-0.5">
                AI PRODUCT MANAGER OS
              </p>
            </motion.div>

            {/* Progress line */}
            <div className="w-36 h-[1.5px] bg-[#141414] rounded-full overflow-hidden mt-2">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.55, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-[#0066FF] to-[#EDEDED]"
              />
            </div>

            {/* Technical Boot Status Ticker */}
            <motion.p
              key={bootStatus}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[9px] font-mono-tech tracking-[0.2em] text-[#555555] uppercase"
            >
              {bootStatus}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
