import React from 'react';

export interface ArgusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: 'compact' | 'balanced' | 'comfortable';
  interactive?: boolean;
  active?: boolean;
  children: React.ReactNode;
}

export const ArgusCard: React.FC<ArgusCardProps> = ({
  density = 'balanced',
  interactive = false,
  active = false,
  className = '',
  children,
  ...props
}) => {
  const densityPadding = {
    compact: 'p-3',
    balanced: 'p-4 sm:p-5',
    comfortable: 'p-5 sm:p-6',
  };

  return (
    <div
      className={`bg-[#0A0A0A] border rounded-[2px] ${
        active
          ? 'border-[#0066FF] shadow-sm shadow-[#0066FF]/20 bg-[#0E0E12]'
          : 'border-[#1D1D1D]'
      } ${interactive ? 'argus-card-interactive cursor-pointer' : ''} ${
        densityPadding[density]
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const ArgusCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div className={`flex items-center justify-between pb-3 mb-3 border-b border-[#1D1D1D] ${className}`} {...props}>
    {children}
  </div>
);

export const ArgusCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3 className={`text-sm font-bold font-display tracking-tight text-[#F5F5F0] ${className}`} {...props}>
    {children}
  </h3>
);

export const ArgusCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p className={`text-xs text-[#8A8A8A] font-mono-tech leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);
