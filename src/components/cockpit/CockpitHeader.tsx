import React, { useState } from 'react';
import { Calendar, RefreshCw, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CockpitHeaderProps {
  onRefresh?: () => void;
  onToggleCustomize?: () => void;
  isCustomizing?: boolean;
}

export const CockpitHeader: React.FC<CockpitHeaderProps> = ({
  onRefresh,
  onToggleCustomize,
  isCustomizing = false,
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[rgba(255,255,255,0.08)] select-none">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-wider text-[#666666]">
            OVERVIEW
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#46A758]" />
          <span className="text-[10px] font-mono-tech text-[#46A758]">SYSTEM OPTIMAL</span>
        </div>
        <h1 className="text-[20px] font-semibold tracking-tight text-[#EDEDED] mt-0.5">
          Cockpit
        </h1>
        <p className="text-xs text-[#A1A1A1] mt-0.5">
          Product intelligence across your workspace.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Date Range Selector */}
        <div className="relative">
          <button
            onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] text-xs text-[#EDEDED] font-mono-tech transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#666666]" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-[#666666]" />
          </button>

          {dateDropdownOpen && (
            <div className="absolute right-0 top-full mt-1 z-40 w-36 p-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[6px] shadow-2xl animate-fade-in-scale">
              {ranges.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setDateRange(r);
                    setDateDropdownOpen(false);
                  }}
                  className={`w-full text-left px-2 py-1 text-xs rounded-[3px] font-mono-tech transition-colors cursor-pointer ${
                    dateRange === r ? 'bg-[#141414] text-[#EDEDED] font-bold' : 'text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#101010]'
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
          className="p-1.5 rounded-[6px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] text-[#A1A1A1] hover:text-[#EDEDED] transition-colors cursor-pointer"
          title="Refresh workspace telemetry"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0070F3]' : ''}`} />
        </button>

        {/* Customize Toggle */}
        <button
          onClick={onToggleCustomize}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-[6px] border text-xs font-mono-tech transition-colors cursor-pointer ${
            isCustomizing
              ? 'bg-[#121214] border-[#0070F3] text-[#0070F3]'
              : 'bg-[#0A0A0A] border-[rgba(255,255,255,0.08)] text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Customize</span>
        </button>
      </div>
    </div>
  );
};
