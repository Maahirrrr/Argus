import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ArgusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
  children: React.ReactNode;
}

export const ArgusDialog: React.FC<ArgusDialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  footer,
  maxWidth = 'max-w-lg',
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-[3px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={`relative z-10 w-full ${maxWidth} bg-[#0A0A0A] border border-[rgba(255,255,255,0.12)] rounded-[8px] shadow-2xl overflow-hidden`}
          >
            <div className="flex items-start justify-between p-5 border-b border-[rgba(255,255,255,0.08)] bg-[#050505]">
              <div>
                <h2 className="text-sm font-semibold text-[#F5F5F5]">{title}</h2>
                {description && <p className="text-xs text-[#8A8A8A] font-mono-tech mt-0.5">{description}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-[4px] text-[#666666] hover:text-[#EDEDED] hover:bg-[#141414] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5">{children}</div>

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
