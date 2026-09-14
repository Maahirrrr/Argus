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
  badgeColor?: string;
  onClick: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  icon: Icon,
  isActive,
  isCollapsed,
  badge,
  badgeColor,
  onClick,
}) => {
  const buttonElement = (
    <button
      onClick={onClick}
      className={`w-full flex items-center ${
        isCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
      } rounded-[6px] text-xs font-mono-tech transition-all duration-150 cursor-pointer select-none relative group border ${
        isActive
          ? 'bg-[rgba(255,255,255,0.07)] border-[rgba(255,255,255,0.10)] text-[#FFFFFF] font-medium shadow-sm'
          : 'border-transparent text-[#8A8A8A] hover:text-[#EDEDED] hover:bg-[rgba(255,255,255,0.04)] hover:border-[rgba(255,255,255,0.06)]'
      }`}
    >
      {/* ARGUS blue active indicator bar on left */}
      {isActive && !isCollapsed && (
        <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-[#0066FF] rounded-r" />
      )}

      <div className="flex items-center gap-2.5 truncate">
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isActive ? 'text-[#FFFFFF]' : 'text-[#666666] group-hover:text-[#A1A1A1]'
          }`}
        />
        {!isCollapsed && <span className="truncate text-[13px]">{label}</span>}
      </div>

      {!isCollapsed && badge !== undefined && (
        <span
          className={`text-[9px] font-mono-tech font-bold px-1.5 py-0.5 rounded-[3px] text-white flex-shrink-0 ${
            badgeColor || 'bg-[#1D1D1D]'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <ArgusTooltip content={label} position="right" delayMs={100}>
        {buttonElement}
      </ArgusTooltip>
    );
  }

  return buttonElement;
};
