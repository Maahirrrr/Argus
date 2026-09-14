import React from 'react';

export interface ArgusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'neutral' | 'blue' | 'green' | 'amber' | 'red' | 'purple';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const ArgusBadge: React.FC<ArgusBadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantStyles = {
    neutral: 'bg-[#141414] text-[#8A8A8A] border-[#222]',
    blue: 'bg-[#0066FF]/12 text-[#0066FF] border-[#0066FF]/25',
    green: 'bg-[#10B981]/12 text-[#10B981] border-[#10B981]/25',
    amber: 'bg-[#F59E0B]/12 text-[#F59E0B] border-[#F59E0B]/25',
    red: 'bg-[#EF4444]/12 text-[#EF4444] border-[#EF4444]/25',
    purple: 'bg-[#8B5CF6]/12 text-[#8B5CF6] border-[#8B5CF6]/25',
  };

  const sizeStyles = {
    sm: 'text-[9px] px-1.5 py-0.2',
    md: 'text-[10px] px-2 py-0.5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-mono-tech font-bold uppercase tracking-wider border rounded-[2px] whitespace-nowrap ${
        variantStyles[variant]
      } ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
