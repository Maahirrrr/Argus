import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, Keyboard, HelpCircle, LogOut } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { useAuth } from '../../context/AuthContext';

interface AccountMenuProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenShortcuts: () => void;
  userName?: string;
  userEmail?: string;
}

export const AccountMenu: React.FC<AccountMenuProps> = ({
  onNavigateTab,
  onOpenShortcuts,
  userName: propUserName,
  userEmail: propUserEmail,
}) => {
  const { profile, signOut } = useAuth();
  const userName = propUserName || profile?.display_name || 'Mahir Kadia';
  const userEmail = propUserEmail || profile?.email || 'maahir@argus.ai';
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-7 h-7 rounded-full bg-[#181818] hover:bg-[#202020] border border-[rgba(255,255,255,0.12)] flex items-center justify-center text-xs font-bold text-[#EDEDED] cursor-pointer transition-colors select-none"
        title={userName}
      >
        {userName.charAt(0)}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-52 p-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[8px] shadow-2xl animate-fade-in-scale">
          {/* User Details */}
          <div className="px-2.5 py-2 border-b border-[rgba(255,255,255,0.08)]">
            <div className="text-xs font-semibold text-[#EDEDED] truncate">{userName}</div>
            <div className="text-[11px] text-[#666666] font-mono-tech truncate">{userEmail}</div>
          </div>

          <div className="space-y-0.5 mt-1">
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateTab('settings');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors text-left cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-[#666666]" />
              <span>Profile Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateTab('settings');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors text-left cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5 text-[#666666]" />
              <span>Workspace Settings</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                onOpenShortcuts();
              }}
              className="w-full flex items-center justify-between px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Keyboard className="w-3.5 h-3.5 text-[#666666]" />
                <span>Shortcuts</span>
              </div>
              <span className="text-[10px] font-mono-tech text-[#666666]">?</span>
            </button>

            <a
              href="https://github.com/Maahirrrr/Argus"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors text-left"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#666666]" />
              <span>Documentation</span>
            </a>
          </div>

          <div className="mt-1 pt-1 border-t border-[rgba(255,255,255,0.08)]">
            <button
              onClick={async () => {
                setIsOpen(false);
                await signOut();
                onNavigateTab('landing');
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#E5484D] hover:bg-[#EF4444]/10 rounded-[4px] transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
