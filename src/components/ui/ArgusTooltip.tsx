import React, { useState } from 'react';

export interface ArgusTooltipProps {
  what: string;
  why?: string;
  children: React.ReactNode;
}

export const ArgusTooltip: React.FC<ArgusTooltipProps> = ({
  what,
  why,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none w-max max-w-xs p-2 bg-[#121212] border border-[#262626] rounded-[2px] shadow-xl text-left">
          <p className="text-[11px] font-mono-tech text-[#F5F5F0] font-semibold">{what}</p>
          {why && (
            <p className="text-[10px] font-mono-tech text-[#8A8A8A] mt-0.5 leading-tight">{why}</p>
          )}
        </div>
      )}
    </div>
  );
};
