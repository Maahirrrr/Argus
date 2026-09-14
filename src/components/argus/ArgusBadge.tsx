import React from 'react';

export interface ArgusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'blue' | 'green' | 'amber' | 'red';
  size?: 'sm' | 'md';
  dot?: boolean;
  children: React.ReactNode;
}

export const ArgusBadge: React.FC<ArgusBadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    neutral: 'bg-[#141414] text-[#A1A1A1] border-[rgba(255,255,255,0.08)]',
    blue: 'bg-[#0066FF]/12 text-[#0066FF] border-[#0066FF]/25',
    green: 'bg-[#10B981]/12 text-[#10B981] border-[#10B981]/25',
    amber: 'bg-[#F59E0B]/12 text-[#F59E0B] border-[#F59E0B]/25',
    red: 'bg-[#EF4444]/12 text-[#EF4444] border-[#EF4444]/25',
  };

  const dotColors = {
    neutral: 'bg-[#8A8A8A]',
    blue: 'bg-[#0066FF]',
    green: 'bg-[#10B981]',
    amber: 'bg-[#F59E0B]',
    red: 'bg-[#EF4444]',
  };

  const sizeStyles = {
    sm: 'text-[9px] px-1.5 py-0.5',
    md: 'text-[10px] px-2 py-0.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono-tech font-bold uppercase tracking-wider border rounded-[4px] whitespace-nowrap ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
