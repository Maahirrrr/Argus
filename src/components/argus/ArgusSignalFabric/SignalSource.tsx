import React, { useState } from 'react';
import type { SignalSource as SignalSourceType } from './signalData';

interface SignalSourceProps {
  source: SignalSourceType;
  isHovered: boolean;
  isDimmed: boolean;
  isActiveAnomaly: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export const SignalSource: React.FC<SignalSourceProps> = ({
  source,
  isHovered,
  isDimmed,
  isActiveAnomaly,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const getStatusDot = () => {
    if (isActiveAnomaly || source.status === 'critical') {
      return 'bg-[#EF4444] shadow-[0_0_6px_rgba(239,68,68,0.8)]';
    }
    if (source.status === 'warning') {
      return 'bg-[#F59E0B] shadow-[0_0_6px_rgba(245,158,11,0.6)]';
    }
    return 'bg-[#10B981] shadow-[0_0_4px_rgba(16,185,129,0.4)]';
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        onMouseEnter();
        setTooltipOpen(true);
      }}
      onMouseLeave={() => {
        onMouseLeave();
        setTooltipOpen(false);
      }}
    >
      <div
        onClick={onClick}
        className={`p-1.5 sm:p-2 rounded-[2px] bg-[#0A0A0A] border cursor-pointer transition-all duration-150 select-none ${
          isHovered
            ? 'border-[#0066FF] bg-[#101014] translate-x-0.5 shadow-sm'
            : isActiveAnomaly
            ? 'border-[#EF4444]/60 bg-[#120a0a]'
            : isDimmed
            ? 'border-[#1D1D1D]/50 opacity-25'
            : 'border-[#1D1D1D] hover:border-[#2D2D2D]'
        }`}
      >
        <div className="flex items-center justify-between gap-1 text-[9px] font-mono-tech">
          <span className="font-bold text-[#F5F5F0] truncate">{source.name}</span>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getStatusDot()} ${
            isActiveAnomaly ? 'animate-pulse' : ''
          }`} />
        </div>
        <div className="text-[8.5px] font-mono-tech text-[#8A8A8A] truncate mt-0.5 flex items-center justify-between">
          <span>{source.metric}</span>
          {isActiveAnomaly && (
            <span className="text-[#EF4444] font-bold text-[8px]">{source.anomalyDelta || '+18.4%'}</span>
          )}
        </div>
      </div>

      {/* Compact Technical Tooltip */}
      {tooltipOpen && (
        <div className="pointer-events-none absolute left-full ml-2 top-1/2 -translate-y-1/2 z-50 w-52 p-2 bg-[#0E0E0E] border border-[#262626] rounded-[2px] shadow-2xl text-left animate-fade-in-scale">
          <div className="text-[10px] font-mono-tech font-bold text-[#F5F5F0] flex items-center justify-between">
            <span>{source.name}</span>
            <span className="text-[8px] text-[#555] uppercase">{source.category}</span>
          </div>
          <div className="text-[9px] font-mono-tech text-[#8A8A8A] mt-0.5">
            {source.metric}
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-[#1D1D1D] grid grid-cols-2 gap-1 text-[8.5px] font-mono-tech">
            <div>
              <span className="text-[#555]">STATUS: </span>
              <span className={isActiveAnomaly || source.status === 'critical' ? 'text-[#EF4444] font-bold' : 'text-[#10B981]'}>
                {isActiveAnomaly ? 'ANOMALY DETECTED' : source.status.toUpperCase()}
              </span>
            </div>
            <div>
              <span className="text-[#555]">CHANGE: </span>
              <span className="text-[#F5F5F0] font-mono-tech">{source.anomalyDelta || '0.0%'}</span>
            </div>
          </div>
          <div className="mt-1 flex items-center justify-between text-[8px] font-mono-tech pt-1 border-t border-[#1D1D1D]/60 text-[#8A8A8A]">
            <span>CONFIDENCE: {source.confidence || 90}%</span>
            <span className="text-[#0066FF] font-semibold">→ Open signal</span>
          </div>
        </div>
      )}
    </div>
  );
};
