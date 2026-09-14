import React, { useState, useRef, useEffect } from 'react';
import { Plus, Activity, Lightbulb, FileText, FlaskConical, GitBranch } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface QuickCreateMenuProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const QuickCreateMenu: React.FC<QuickCreateMenuProps> = ({ onNavigateTab }) => {
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

  const items = [
    { label: 'New Signal', icon: Activity, tab: 'signals' as NavigationTab },
    { label: 'New Opportunity', icon: Lightbulb, tab: 'opportunities' as NavigationTab },
    { label: 'New PRD / Spec', icon: FileText, tab: 'prds' as NavigationTab },
    { label: 'New Experiment', icon: FlaskConical, tab: 'experiments' as NavigationTab },
    { label: 'New Decision', icon: GitBranch, tab: 'decisions' as NavigationTab },
  ];

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#EDEDED] hover:bg-[#FFFFFF] text-[#000000] text-xs font-semibold cursor-pointer shadow-sm transition-all select-none"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Create</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-48 p-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[8px] shadow-2xl animate-fade-in-scale">
          <div className="px-2 py-1 text-[10px] uppercase font-mono-tech tracking-wider text-[#666666]">
            Quick Create
          </div>
          <div className="space-y-0.5 mt-0.5">
            {items.map((it) => {
              const Icon = it.icon;
              return (
                <button
                  key={it.label}
                  onClick={() => {
                    setIsOpen(false);
                    onNavigateTab(it.tab);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] rounded-[4px] transition-colors text-left cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-[#666666]" />
                  <span>{it.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
