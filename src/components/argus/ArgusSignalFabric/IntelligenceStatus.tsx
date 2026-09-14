import React from 'react';

interface IntelligenceStatusProps {
  onNavigateToIntelligence: () => void;
}

export const IntelligenceStatus: React.FC<IntelligenceStatusProps> = ({
  onNavigateToIntelligence,
}) => {
  return (
    <div className="w-full bg-[var(--surface-1)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] p-3 flex flex-col justify-between select-none h-full">
      {/* Panel Header: "Intelligence" left, "Active" right */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)] text-[11px] font-sans">
        <span className="font-medium text-[var(--text-tertiary)]">
          Intelligence
        </span>
        <div className="flex items-center gap-1.5 text-[var(--signal-green)]">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--signal-green)]" />
          <span className="font-normal">Active</span>
        </div>
      </div>

      {/* Metrics Row: Three values in flush horizontal layout, NO boxes */}
      <div className="grid grid-cols-3 gap-3 my-3 text-left">
        <div>
          <div className="text-[20px] font-bold font-mono text-[var(--text-primary)] leading-none">
            92%
          </div>
          <div className="text-[10px] font-normal text-[var(--text-tertiary)] font-sans mt-1">
            Conviction
          </div>
        </div>

        <div>
          <div className="text-[20px] font-bold font-mono text-[var(--text-primary)] leading-none">
            +18.4%
          </div>
          <div className="text-[10px] font-normal text-[var(--text-tertiary)] font-sans mt-1 truncate">
            Strongest
          </div>
        </div>

        <div>
          <div className="text-[20px] font-bold font-mono text-[var(--text-primary)] leading-none">
            04
          </div>
          <div className="text-[10px] font-normal text-[var(--text-tertiary)] font-sans mt-1 truncate">
            Active
          </div>
        </div>
      </div>

      {/* Action: Plain text link, Inter 13px/400, --text-accent, NO button bg, NO border, NO arrow */}
      <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center justify-start">
        <button
          type="button"
          onClick={onNavigateToIntelligence}
          className="text-[13px] font-normal font-sans text-[var(--text-accent)] hover:underline transition-colors cursor-pointer bg-transparent border-0 p-0"
        >
          View insights
        </button>
      </div>
    </div>
  );
};
