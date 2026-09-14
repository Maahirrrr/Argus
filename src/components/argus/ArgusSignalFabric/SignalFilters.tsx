import React from 'react';
import type { SignalCategory } from './signalData';

export type FilterCategory = 'all' | SignalCategory;

interface SignalFiltersProps {
  selected: FilterCategory;
  onSelect: (category: FilterCategory) => void;
  className?: string;
}

const FILTERS: { id: FilterCategory; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'product', label: 'PRODUCT' },
  { id: 'users', label: 'USERS' },
  { id: 'market', label: 'MARKET' },
];

export const SignalFilters: React.FC<SignalFiltersProps> = ({
  selected,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-1 p-0.5 rounded-[2px] bg-[#0E0E0E] border border-[#1D1D1D] ${className}`}>
      {FILTERS.map((f) => {
        const isActive = selected === f.id;
        return (
          <button
            key={f.id}
            type="button"
            onClick={() => onSelect(f.id)}
            className={`px-2 py-0.5 text-[9px] font-mono-tech tracking-wider uppercase rounded-[2px] transition-all duration-150 cursor-pointer ${
              isActive
                ? 'bg-[#1D1D1D] text-[#F5F5F0] font-bold shadow-sm'
                : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414]'
            }`}
          >
            {f.label}
          </button>
        );
      })}
    </div>
  );
};
