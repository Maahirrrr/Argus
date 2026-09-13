import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ShieldAlert,
  Sparkles,
  ArrowRight,
  FlaskConical
} from 'lucide-react';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndCreatePrd: () => void;
}

export const ChallengeModal: React.FC<ChallengeModalProps> = ({
  isOpen,
  onClose,
  onAcceptAndCreatePrd,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl flex flex-col overflow-hidden max-h-[92vh]"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1D1D1D] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-[2px] bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] flex-shrink-0">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xs sm:text-sm font-bold text-[#F5F5F0] font-display truncate">
                  CHALLENGE AI ASSUMPTIONS & CRITIQUE
                </h2>
                <p className="text-[10px] sm:text-[11px] font-mono-tech text-[#8A8A8A] truncate">
                  Initiative #014: Dynamic Multi-Bank Failover
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#8A8A8A] hover:text-[#F5F5F0] rounded-[2px] hover:bg-[#141414] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Split-Screen Analysis (Section 30 requirement) */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1D] p-4 sm:p-6 gap-5 overflow-y-auto max-h-[60vh] no-scrollbar">
            {/* Left: PM Assumption */}
            <div className="flex flex-col gap-3 sm:gap-4">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#8A8A8A] font-bold">
                PM ASSUMPTION
              </span>
              <div className="p-3.5 rounded-[3px] bg-[#101010] border border-[#1D1D1D] text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                "Payment routing to secondary bank switches is the primary cause of checkout drops, and implementing automated retry logic will recover 85%+ of failed volume."
              </div>

              <div className="flex flex-col gap-2 pt-1">
                <span className="text-[10px] font-mono-tech text-[#525252] uppercase">EVALUATED EVIDENCE</span>
                <ul className="text-xs font-mono-tech text-[#8A8A8A] space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0" />
                    <span>Bank X timeout rate: 18.4% above threshold</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] flex-shrink-0" />
                    <span>ClickHouse retry log: 42k dropped intent signals</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: AI Counterargument & Missing Variables */}
            <div className="flex flex-col gap-3 sm:gap-4 pt-4 md:pt-0">
              <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#0066FF] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                AI COUNTERARGUMENT & SENSITIVITY
              </span>
              <div className="p-3.5 rounded-[3px] bg-[#0D0E14] border border-[#0066FF]/30 text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                "Evidence supports this hypothesis at <strong>74% confidence</strong>, but 2 confounding variables are unaccounted for that could reduce expected lift by up to 35%."
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono-tech text-[#EF4444] uppercase font-bold">
                  MISSING CONFOUNDING VARIABLES:
                </span>
                <div className="space-y-2 text-xs font-mono-tech">
                  <div className="p-2.5 rounded-[2px] bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A]">
                    <strong className="text-[#F5F5F0]">1. Device Network Quality:</strong> 31% of Android 15 timeouts coincide with degraded 4G carrier handshakes during evening peak.
                  </div>
                  <div className="p-2.5 rounded-[2px] bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A]">
                    <strong className="text-[#F5F5F0]">2. Merchant Category Rules:</strong> Regulated NBFC payments reject secondary rerouting without explicit re-auth.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Suggested Validation Experiment & Footer Actions */}
          <div className="p-4 sm:p-5 bg-[#080808] border-t border-[#1D1D1D] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A]">
              <FlaskConical className="w-4 h-4 text-[#10B981] flex-shrink-0" />
              <span className="text-[11px] sm:text-xs">
                <strong>Suggested Validation:</strong> 10% canary with P99 timeout guardrail.
              </span>
            </div>

            <div className="flex items-center gap-2.5 pt-1 sm:pt-0">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-[3px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer min-h-[44px]"
              >
                Dismiss
              </button>
              <button
                onClick={onAcceptAndCreatePrd}
                className="btn-magnetic flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-[3px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-semibold cursor-pointer shadow-md shadow-[#0066FF]/20 min-h-[44px]"
              >
                <span>Accept & Create PRD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
