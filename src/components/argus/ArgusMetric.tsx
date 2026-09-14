import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { ArgusCard } from './ArgusCard';

export interface ArgusMetricProps {
  label: string;
  value: string | number;
  delta?: string;
  isPositive?: boolean;
  subtext?: string;
  sparklineData?: number[];
  onClick?: () => void;
}

export const ArgusMetric: React.FC<ArgusMetricProps> = ({
  label,
  value,
  delta,
  isPositive,
  subtext,
  sparklineData = [12, 14, 18, 16, 22, 28, 26, 32],
  onClick,
}) => {
  const minVal = Math.min(...sparklineData);
  const maxVal = Math.max(...sparklineData);
  const range = maxVal - minVal || 1;
  const height = 24;
  const width = 80;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - minVal) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <ArgusCard
      interactive={!!onClick}
      onClick={onClick}
      showArrowOnHover={!!onClick}
      className="p-4"
    >
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-mono-tech font-bold uppercase tracking-wider text-[#8A8A8A]">
          {label}
        </span>
        {sparklineData && (
          <svg width={width} height={height} className="overflow-visible opacity-70">
            <polyline
              fill="none"
              stroke="#0066FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold font-mono-tech text-[#F5F5F5] tracking-tight">
          {value}
        </span>
        {delta && (
          <span
            className={`inline-flex items-center text-xs font-mono-tech font-bold ${
              isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}
          >
            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {delta}
          </span>
        )}
      </div>

      {subtext && (
        <p className="text-[11px] text-[#666666] font-mono-tech mt-1">{subtext}</p>
      )}
    </ArgusCard>
  );
};
