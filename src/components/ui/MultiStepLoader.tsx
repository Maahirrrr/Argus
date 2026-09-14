import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';

export interface LoadingStep {
  text: string;
}

export interface MultiStepLoaderProps {
  loadingStates: LoadingStep[];
  loading: boolean;
  currentStep?: number;
  title?: string;
  onClose?: () => void;
}

export const MultiStepLoader: React.FC<MultiStepLoaderProps> = ({
  loadingStates,
  loading,
  currentStep = 0,
  title = 'ARGUS COCKPIT ENGINE',
  onClose,
}) => {
  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-sm p-6 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1D1D1D]">
              <span className="text-[10px] font-mono-tech uppercase tracking-widest text-[#0066FF] font-bold">
                {title}
              </span>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="text-[10px] font-mono-tech text-[#525252] hover:text-[#8A8A8A]"
                >
                  ESC
                </button>
              )}
            </div>

            <div className="space-y-3">
              {loadingStates.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div
                    key={step.text}
                    className={`flex items-center gap-3 text-xs font-mono-tech transition-opacity duration-200 ${
                      isCurrent
                        ? 'text-[#F5F5F0] font-semibold'
                        : isCompleted
                        ? 'text-[#8A8A8A]'
                        : 'text-[#444444]'
                    }`}
                  >
                    <div className="flex-shrink-0 w-4 h-4 flex items-center justify-center">
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5 text-[#10B981]" />
                      ) : isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 text-[#0066FF] animate-spin" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#333333]" />
                      )}
                    </div>
                    <span>{step.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
