import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Lightbulb, FileText, FlaskConical, LayoutDashboard, Radar, Shield, Settings, Activity } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface GlobalCommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const GlobalCommandPalette: React.FC<GlobalCommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const actions = [
    { category: 'Navigate', label: 'Cockpit Dashboard', tab: 'home' as NavigationTab, icon: LayoutDashboard },
    { category: 'Navigate', label: 'Opportunities Tree', tab: 'opportunities' as NavigationTab, icon: Lightbulb },
    { category: 'Navigate', label: 'PRD Studio', tab: 'prds' as NavigationTab, icon: FileText },
    { category: 'Navigate', label: 'Intelligence Center', tab: 'intelligence' as NavigationTab, icon: Radar },
    { category: 'Navigate', label: 'Experiments Lab', tab: 'experiments' as NavigationTab, icon: FlaskConical },
    { category: 'Create', label: 'Create New Opportunity', tab: 'opportunities' as NavigationTab, icon: Lightbulb },
    { category: 'Create', label: 'Generate PRD Spec', tab: 'prds' as NavigationTab, icon: FileText },
    { category: 'Create', label: 'Log Incident Signal', tab: 'signals' as NavigationTab, icon: Activity },
    { category: 'Workspace', label: 'Workspace Settings & Profile', tab: 'settings' as NavigationTab, icon: Settings },
    { category: 'Workspace', label: 'Verify Row-Level Security', tab: 'settings' as NavigationTab, icon: Shield },
  ];

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          onNavigateTab(filtered[selectedIndex].tab);
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onNavigateTab, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-sm animate-fade-in-scale">
      <div className="w-full max-w-xl bg-[#080808] border border-[rgba(255,255,255,0.12)] rounded-[8px] shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-2 px-3.5 py-3 border-b border-[rgba(255,255,255,0.08)] bg-[#0A0A0A]">
          <Search className="w-4 h-4 text-[#666666]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search workspace..."
            className="w-full bg-transparent text-sm text-[#EDEDED] placeholder-[#666666] outline-none font-mono-tech"
          />
          <kbd className="px-1.5 py-0.5 rounded-[3px] bg-[#141414] border border-[#222222] text-[10px] font-mono-tech text-[#8A8A8A]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-72 overflow-y-auto p-1.5 space-y-0.5 scrollbar-none">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-[#666666] font-mono-tech">
              No matching actions found
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              const Icon = item.icon;
              return (
                <div
                  key={`${item.category}-${item.label}`}
                  onClick={() => {
                    onNavigateTab(item.tab);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between px-3 py-2 rounded-[4px] cursor-pointer transition-colors ${
                    isSelected ? 'bg-[#141414] text-[#EDEDED]' : 'text-[#A1A1A1] hover:bg-[#0F0F0F]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0070F3]' : 'text-[#666666]'}`} />
                    <span className="text-xs truncate">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech text-[#666666] uppercase">{item.category}</span>
                    {isSelected && <ArrowRight className="w-3 h-3 text-[#0070F3]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-3 py-2 border-t border-[rgba(255,255,255,0.08)] bg-[#050505] flex items-center justify-between text-[10px] font-mono-tech text-[#666666]">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>ARGUS Command Engine</span>
        </div>
      </div>
    </div>
  );
};
