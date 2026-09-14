import React, { useState, useRef, useCallback } from 'react';
import { ArrowUpRight } from 'lucide-react';

export interface ArgusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  density?: 'compact' | 'balanced' | 'comfortable';
  interactive?: boolean;
  active?: boolean;
  spotlight?: boolean;
  showArrowOnHover?: boolean;
  children: React.ReactNode;
}

export const ArgusCard: React.FC<ArgusCardProps> = ({
  density = 'balanced',
  interactive = false,
  active = false,
  spotlight = true,
  showArrowOnHover = false,
  className = '',
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const densityPadding = {
    compact: 'p-3',
    balanced: 'p-4 sm:p-5',
    comfortable: 'p-5 sm:p-6',
  };

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!spotlight || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    if (onMouseMove) onMouseMove(e);
  }, [spotlight, onMouseMove]);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos(null);
    if (onMouseLeave) onMouseLeave(e);
  }, [onMouseLeave]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[6px] transition-all duration-200 select-none ${
        active
          ? 'bg-[#0E0E0E] border border-[#0066FF] shadow-sm shadow-[#0066FF]/20'
          : 'bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:bg-[#0C0C0C]'
      } ${
        interactive ? 'cursor-pointer group hover:-translate-y-[1px]' : ''
      } ${densityPadding[density]} ${className}`}
      {...props}
    >
      {spotlight && mousePos && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.04), transparent 80%)`,
          }}
        />
      )}

      {showArrowOnHover && interactive && (
        <div className="absolute top-3.5 right-3.5 text-[#666666] group-hover:text-[#F5F5F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 pointer-events-none z-10">
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const ArgusCardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <div
    className={`flex items-center justify-between pb-3 mb-3 border-b border-[rgba(255,255,255,0.06)] ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const ArgusCardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <h3
    className={`text-xs font-mono-tech font-bold uppercase tracking-wider text-[#A1A1A1] flex items-center gap-2 ${className}`}
    {...props}
  >
    {children}
  </h3>
);

export const ArgusCardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p className={`text-xs text-[#666666] font-mono-tech leading-relaxed ${className}`} {...props}>
    {children}
  </p>
);
