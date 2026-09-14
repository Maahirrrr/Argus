import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { Loader2 } from 'lucide-react';

export interface ArgusButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'ai';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const ArgusButton: React.FC<ArgusButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  loadingText,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-[#F5F5F5] text-[#050505] hover:bg-[#FFFFFF] border border-[#F5F5F5] font-semibold shadow-sm',
    secondary:
      'bg-[#0E0E0E] text-[#EDEDED] hover:bg-[#161616] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.16)]',
    outline:
      'bg-transparent text-[#EDEDED] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.18)]',
    ghost:
      'bg-transparent text-[#8A8A8A] hover:text-[#EDEDED] hover:bg-[#121212] border border-transparent',
    destructive:
      'bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25 border border-[#EF4444]/30',
    ai:
      'bg-[#0066FF]/15 text-[#0066FF] hover:bg-[#0066FF]/25 border border-[#0066FF]/35 font-semibold',
  };

  const sizeStyles = {
    xs: 'px-2 py-0.5 text-[11px] font-mono-tech gap-1 rounded-[4px]',
    sm: 'px-2.5 py-1 text-xs font-mono-tech gap-1.5 rounded-[4px]',
    md: 'px-3 py-1.5 text-xs font-mono-tech gap-2 rounded-[6px]',
    lg: 'px-4 py-2 text-sm font-mono-tech gap-2 rounded-[6px]',
    icon: 'p-1.5 rounded-[6px] w-8 h-8 flex items-center justify-center',
  };

  return (
    <motion.button
      whileHover={{ y: disabled || isLoading ? 0 : -1 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center select-none cursor-pointer transition-colors ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${
        disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          {loadingText ? <span>{loadingText}</span> : children}
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};
