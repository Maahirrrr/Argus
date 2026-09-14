import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  isPositive?: boolean;
  subtext?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  delta,
  isPositive = true,
  subtext,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="p-5 sm:px-6 rounded-[var(--radius-md)] bg-[var(--surface-2)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors cursor-pointer select-none flex flex-col justify-between"
    >
      {/* Top Row: Label left, Delta right */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
          {label}
        </span>
        <div
          className={`inline-flex items-center gap-1 text-[11px] font-medium font-sans ${
            isPositive ? 'text-[var(--signal-green)]' : 'text-[var(--signal-red)]'
          }`}
        >
          {isPositive ? (
            <TrendingUp className="w-2.5 h-2.5" />
          ) : (
            <TrendingDown className="w-2.5 h-2.5" />
          )}
          <span>{delta}</span>
        </div>
      </div>

      {/* Bottom Row: Value left, Sub-label */}
      <div className="flex items-baseline justify-between mt-3">
        <div className="text-[28px] font-bold font-mono text-[var(--text-primary)] leading-none">
          {value}
        </div>
        {subtext && (
          <div className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
            {subtext}
          </div>
        )}
      </div>
    </div>
  );
};
