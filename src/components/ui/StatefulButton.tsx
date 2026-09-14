import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Loader2 } from 'lucide-react';

export type ButtonActionState = 'idle' | 'analyzing' | 'generating' | 'success';

export interface StatefulButtonProps {
  idleText: string;
  analyzingText?: string;
  generatingText?: string;
  successText?: string;
  onTrigger: () => Promise<void> | void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ai';
  disabled?: boolean;
}

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  idleText,
  analyzingText = 'Analyzing context...',
  generatingText = 'Generating...',
  successText = 'Ready ✓',
  onTrigger,
  className = '',
  variant = 'ai',
  disabled = false,
}) => {
  const [state, setState] = useState<ButtonActionState>('idle');

  const handleClick = async () => {
    if (state !== 'idle' || disabled) return;
    setState('analyzing');
    await new Promise((r) => setTimeout(r, 450));
    setState('generating');
    await new Promise((r) => setTimeout(r, 550));
    try {
      await onTrigger();
      setState('success');
      setTimeout(() => setState('idle'), 2200);
    } catch {
      setState('idle');
    }
  };

  const variantStyles = {
    primary: 'bg-[#F5F5F0] text-[#050505] hover:bg-white border-[#F5F5F0]',
    secondary: 'bg-[#0E0E0E] text-[#F5F5F0] hover:bg-[#161616] border-[#1D1D1D]',
    ai: 'bg-[#0066FF]/15 text-[#0066FF] hover:bg-[#0066FF]/25 border-[#0066FF]/35 font-semibold',
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={state !== 'idle' || disabled}
      whileHover={{ y: state === 'idle' && !disabled ? -1 : 0 }}
      whileTap={{ scale: state === 'idle' && !disabled ? 0.98 : 1 }}
      className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-mono-tech rounded-[2px] border transition-colors select-none ${
        variantStyles[variant]
      } ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
          >
            {idleText}
          </motion.span>
        )}
        {state === 'analyzing' && (
          <motion.span
            key="analyzing"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{analyzingText}</span>
          </motion.span>
        )}
        {state === 'generating' && (
          <motion.span
            key="generating"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-[#0066FF]"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{generatingText}</span>
          </motion.span>
        )}
        {state === 'success' && (
          <motion.span
            key="success"
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5 text-[#10B981]"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{successText}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
