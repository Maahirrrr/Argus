import React from 'react';
import type { NavigationTab } from '../../types/argus';
import { ArgusTooltip } from '../argus/ArgusTooltip';

interface SidebarItemProps {
  id: NavigationTab;
  label: string;
  icon: React.FC<{ className?: string }>;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number | string;
  badgeType?: 'inbox' | 'opportunities' | 'today';
  badgeColor?: string;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  isActive,
  isCollapsed,
  badge,
  badgeType,
  badgeColor,
  onClick,
}) => {
  const renderBadge = () => {
    if (badge === undefined || badge === null) return null;

    if (badgeType === 'inbox' || badge === 4 || badge === '4') {
      return (
        <span className="w-4 h-4 rounded-full bg-[var(--signal-red)] text-white text-[11px] font-semibold font-sans flex items-center justify-center flex-shrink-0">
          {badge}
        </span>
      );
    }

    if (badgeType === 'today' || badge === 'NEW') {
      return (
        <span className="h-5 px-1.5 rounded-full bg-[var(--signal-blue)] text-white text-[10px] font-semibold font-sans flex items-center justify-center flex-shrink-0">
          {badge}
        </span>
      );
    }

    if (badgeType === 'opportunities' || badge === 19 || badge === '19') {
      return (
        <span className="h-4 px-1.5 rounded-full bg-[var(--surface-3)] text-[var(--text-secondary)] text-[11px] font-medium font-sans flex items-center justify-center flex-shrink-0">
          {badge}
        </span>
      );
    }

    return (
      <span
        className={`h-4 px-1.5 rounded-full text-[11px] font-medium font-sans flex items-center justify-center flex-shrink-0 ${
          badgeColor || 'bg-[var(--surface-3)] text-[var(--text-secondary)]'
        }`}
      >
        {badge}
      </span>
    );
  };

  if (isCollapsed) {
    return (
      <ArgusTooltip content={label} position="right">
        <button
          onClick={onClick}
          className={`w-full h-8 flex items-center justify-center transition-colors duration-150 cursor-pointer select-none relative group ${
            isActive
              ? 'border-l-2 border-[var(--signal-blue)] bg-transparent'
              : 'border-l-2 border-transparent hover:bg-[var(--surface-2)]'
          }`}
        >
          <Icon
            className={`w-4 h-4 transition-colors ${
              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'
            }`}
          />
        </button>
      </ArgusTooltip>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full h-8 flex items-center justify-between px-3 rounded-[var(--radius-sm)] transition-colors duration-150 cursor-pointer select-none relative group ${
        isActive
          ? 'bg-transparent border-l-2 border-[var(--signal-blue)] rounded-l-none'
          : 'bg-transparent border-l-2 border-transparent hover:bg-[var(--surface-2)]'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)] group-hover:text-[var(--text-primary)]'
          }`}
        />
        <span
          className={`truncate text-[13px] font-sans transition-colors ${
            isActive
              ? 'text-[var(--text-primary)] font-medium'
              : 'text-[var(--text-secondary)] font-normal group-hover:text-[var(--text-primary)]'
          }`}
        >
          {label}
        </span>
      </div>

      {renderBadge()}
    </button>
  );
};
