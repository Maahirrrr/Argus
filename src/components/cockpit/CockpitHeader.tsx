import React, { useState } from 'react';
import { Calendar, RefreshCw, SlidersHorizontal, ChevronDown, Zap } from 'lucide-react';

interface CockpitHeaderProps {
  onRefresh?: () => void;
  onToggleCustomize?: () => void;
  isCustomizing?: boolean;
  onOpenChaosSimulator?: () => void;
}

export const CockpitHeader: React.FC<CockpitHeaderProps> = ({
  onRefresh,
  onToggleCustomize,
  isCustomizing = false,
  onOpenChaosSimulator,
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 days');
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const ranges = ['Last 7 days', 'Last 30 days', 'Last 90 days', 'Year to date'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)] select-none">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-green)]" />
          <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
            System optimal
          </span>
        </div>
        <h1 className="text-[20px] font-bold font-['Space_Grotesk',sans-serif] tracking-tight text-[var(--text-primary)] mt-0.5">
          Cockpit
        </h1>
        <p className="text-[12px] text-[var(--text-secondary)] font-sans mt-0.5">
          Product intelligence across your workspace.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--border-default)] text-xs text-[var(--text-primary)] font-sans transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-[var(--text-tertiary)]" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-40 w-36 p-1 bg-[var(--surface-3)] border border-[var(--border-default)] rounded-[var(--radius-sm)] shadow-xl">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setDateRange(r);
                    setDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs rounded-[var(--radius-sm)] font-sans transition-colors cursor-pointer ${
                    dateRange === r
                      ? 'bg-[var(--surface-2)] text-[var(--text-primary)] font-medium'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button
          onClick={handleRefresh}
          className="p-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          title="Refresh workspace telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[var(--signal-blue)]' : ''}`} />
        </button>

        {/* Customize Toggle */}
        <button
          onClick={onToggleCustomize}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[var(--radius-sm)] border text-xs font-sans transition-colors cursor-pointer ${
            isCustomizing
              ? 'bg-[var(--surface-2)] border-[var(--signal-blue)] text-[var(--signal-blue)]'
              : 'bg-[var(--surface-1)] border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Customize</span>
        </button>

        {/* Chaos Mode shortcut */}
        {onOpenChaosSimulator && (
          <button
            onClick={onOpenChaosSimulator}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-[var(--radius-sm)] bg-[var(--surface-1)] hover:bg-[var(--surface-2)] border border-[var(--border-default)] text-xs font-sans text-[var(--signal-amber)] transition-colors cursor-pointer"
            title="Simulate failure mode"
          >
            <Zap className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Chaos test</span>
          </button>
        )}
      </div>
    </div>
  );
};
