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
        isCollapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
      } text-xs font-mono-tech transition-colors duration-150 cursor-pointer select-none relative group border-l-2 ${
        isActive
          ? 'border-[#0066FF] text-[#FFFFFF] font-medium bg-[#0A0A0A]'
          : 'border-transparent text-[#6B7280] hover:text-[#FFFFFF] hover:bg-[#0A0A0A]/50'
      }`}
    >
      <div className="flex items-center gap-2.5 truncate">
        <Icon
          className={`w-4 h-4 flex-shrink-0 transition-colors ${
            isActive ? 'text-[#0066FF]' : 'text-[#6B7280] group-hover:text-[#FFFFFF]'
          }`}
        />
        {!isCollapsed && <span className="truncate text-[13px] tracking-tight">{label}</span>}
      </div>

      {!isCollapsed && badge !== undefined && (
        <span
          className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded-[2px] text-white flex-shrink-0 ${
            badgeColor || 'bg-[#1A1A1A] text-[#9CA3AF]'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );

  if (isCollapsed) {
    return (
      <ArgusTooltip content={label} position="right">
        {buttonElement}
      </ArgusTooltip>
    );
  }

  return buttonElement;
};
