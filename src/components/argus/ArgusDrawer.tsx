import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ArgusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  children: React.ReactNode;
}

export const ArgusDrawer: React.FC<ArgusDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  footer,
  width = 'w-full sm:w-[460px]',
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-[2px]"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className={`relative z-10 flex flex-col h-full bg-[#080808] border-l border-[rgba(255,255,255,0.10)] shadow-2xl ${width}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 border-b border-[rgba(255,255,255,0.08)] bg-[#050505]">
              <div className="space-y-1 pr-4">
                <div className="text-sm font-semibold text-[#F5F5F5]">{title}</div>
                {subtitle && <div className="text-xs text-[#8A8A8A] font-mono-tech">{subtitle}</div>}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-[4px] text-[#666666] hover:text-[#EDEDED] hover:bg-[#141414] transition-colors cursor-pointer"
                title="Close drawer (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none text-xs text-[#CCCCCC]">
              {children}
            </div>

            {/* Optional Footer */}
            {footer && (
              <div className="p-4 border-t border-[rgba(255,255,255,0.08)] bg-[#050505] flex items-center justify-end gap-2">
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
