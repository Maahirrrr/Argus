import React from 'react';
import type { IntelligenceOutput as OutputType } from './signalData';

interface IntelligenceOutputProps {
  output: OutputType;
  isHovered: boolean;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  opportunity: 'Opportunity',
  decision: 'Decision',
  prd: 'Spec',
  experiment: 'Experiment',
};

export const IntelligenceOutput: React.FC<IntelligenceOutputProps> = ({
  output,
  isHovered,
  isHighlighted,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) => {
  const categoryLabel = CATEGORY_LABELS[output.type] || output.type;
  // Clean up ID: e.g. "OPPORTUNITY #014" -> "#014"
  const cleanId = output.title.replace(/^[A-Z\s/]+/, '').trim() || output.title;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`p-2.5 sm:px-3 sm:py-2.5 bg-[var(--surface-1)] border-l-2 cursor-pointer select-none transition-colors rounded-none ${
        isHighlighted || isHovered
          ? 'border-l-[var(--signal-blue)] bg-[var(--surface-2)]'
          : 'border-l-[var(--border-subtle)] hover:border-l-[var(--signal-blue)] hover:bg-[var(--surface-2)]'
      }`}
      title={`Open ${categoryLabel} ${cleanId}`}
    >
      {/* Top Row: category label left, ID right */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans">
          {categoryLabel}
        </span>
        <span className="text-[11px] font-mono text-[var(--text-secondary)]">
          {cleanId}
        </span>
      </div>

      {/* Bottom: Title */}
      <div className="text-[13px] font-semibold font-['Space_Grotesk',sans-serif] text-[var(--text-primary)] truncate mt-1">
        {output.code}
      </div>

      {/* Sub: Truncated description */}
      {output.subtitle && (
        <div className="text-[12px] font-normal text-[var(--text-secondary)] font-sans truncate mt-0.5">
          {output.subtitle}
        </div>
      )}
    </div>
  );
};
