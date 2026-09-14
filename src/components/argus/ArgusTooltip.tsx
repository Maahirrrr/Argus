import React, { useState } from 'react';

export interface ArgusTooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
  delayMs?: number;
}

export const ArgusTooltip: React.FC<ArgusTooltipProps> = ({
  content,
  position = 'top',
  children,
  delayMs = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => setIsVisible(true), delayMs);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2 py-1 text-[11px] font-mono-tech text-[#EDEDED] bg-[#111111] border border-[rgba(255,255,255,0.12)] rounded-[4px] shadow-xl whitespace-nowrap pointer-events-none transition-all duration-150 animate-in fade-in zoom-in-95 ${positionStyles[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
};
