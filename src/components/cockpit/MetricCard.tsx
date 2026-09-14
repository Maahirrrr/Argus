import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  isPositive?: boolean;
  subtext?: string;
  sparklineData?: number[];
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  isPositive = true,
  subtext = 'vs previous period',
  sparklineData = [20, 24, 22, 28, 30, 26, 34, 38, 42],
  onClick,
}) => {
  // Generate simple SVG sparkline path
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 80;
  const height = 24;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 4) - 2;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-[8px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[#0A0A0A] transition-all cursor-pointer select-none group flex flex-col justify-between"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-mono-tech uppercase tracking-wider text-[#666666]">
          {label}
        </span>
        <div
          className={`inline-flex items-center gap-0.5 text-[11px] font-mono-tech font-bold ${
            isPositive ? 'text-[#46A758]' : 'text-[#E5484D]'
          }`}
        >
          {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{delta}</span>
        </div>
      </div>

      <div className="flex items-end justify-between mt-3">
        <div>
          <div className="text-[28px] font-semibold tracking-tight text-[#EDEDED] leading-none">
            {value}
          </div>
          <div className="text-[11px] text-[#666666] font-mono-tech mt-1">
            {subtext}
          </div>
        </div>

        {/* Mini SVG Sparkline */}
        <div className="w-20 h-6 flex items-center">
          <svg className="w-full h-full overflow-visible" viewBox={`0 0 ${width} ${height}`}>
            <polyline
              fill="none"
              stroke="#0070F3"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
