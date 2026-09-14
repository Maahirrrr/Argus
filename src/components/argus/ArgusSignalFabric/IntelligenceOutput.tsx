import React from 'react';
import { ArrowRight } from 'lucide-react';
import type { IntelligenceOutput as OutputType } from './signalData';

interface IntelligenceOutputProps {
  output: OutputType;
  isHovered: boolean;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const IntelligenceOutput: React.FC<IntelligenceOutputProps> = ({
  output,
  isHovered,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`p-1.5 sm:p-2 rounded-[2px] bg-[#0A0A0A] border cursor-pointer transition-all duration-150 select-none group ${
        isHovered
          ? 'border-[#0066FF] bg-[#101014] -translate-x-0.5 shadow-sm'
          : isHighlighted
          ? 'border-[#0066FF] bg-[#0c101a] shadow-[0_0_10px_rgba(0,102,255,0.25)]'
          : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
      }`}
      title={`Click to navigate to ${output.title}`}
    >
      <div className="flex items-center justify-between text-[9px] font-mono-tech text-[#0066FF] font-bold">
        <span>{output.title}</span>
        <ArrowRight className="w-2.5 h-2.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
      </div>
      <div className="text-[10px] font-bold text-[#F5F5F0] truncate mt-0.5">
        {output.code}
      </div>
      {output.subtitle && (
        <div className="text-[8px] font-mono-tech text-[#8A8A8A] truncate mt-0.5">
          {output.subtitle}
        </div>
      )}
    </div>
  );
};
