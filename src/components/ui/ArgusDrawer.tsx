import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ArgusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  width?: 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export const ArgusDrawer: React.FC<ArgusDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  width = 'lg',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const widthMap = {
    md: 'max-w-md',
    lg: 'max-w-xl',
    xl: 'max-w-3xl',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className={`relative w-full ${widthMap[width]} bg-[#080808] border-l border-[#1D1D1D] h-full flex flex-col shadow-2xl z-10`}
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[#1D1D1D] flex items-center justify-between bg-[#0A0A0A]">
              <div className="space-y-1 pr-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono-tech text-[#0066FF] tracking-widest uppercase">
                    DRAWER INSPECTION
                  </span>
                  {badge && (
                    <span className="text-[9px] font-mono-tech font-bold px-1.5 py-0.2 rounded-[2px] bg-[#1D1D1D] text-[#8A8A8A]">
                      {badge}
                    </span>
                  )}
                </div>
                <h2 className="text-base font-bold font-display text-[#F5F5F0] tracking-tight">
                  {title}
                </h2>
                {subtitle && (
                  <p className="text-xs font-mono-tech text-[#8A8A8A]">{subtitle}</p>
                )}
              </div>

              <button
                onClick={onClose}
                className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414] rounded-[2px] transition-colors"
                title="Close drawer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {children}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-[#1D1D1D] bg-[#0A0A0A] flex items-center justify-between text-[10px] font-mono-tech text-[#525252]">
              <span>⌘+CLICK / DIRECT DRILLDOWN</span>
              <span>ESC TO CLOSE</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
