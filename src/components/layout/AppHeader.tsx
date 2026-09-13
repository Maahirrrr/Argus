import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ArrowUpRight,
  Terminal
} from 'lucide-react';
import type { NavigationTab } from '../../types/finpilot';

interface AppHeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: () => void;
  isLandingMode: boolean;
  onToggleMode: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  onSelectTab,
  onOpenCommandPalette,
  onOpenCaseStudy,
  isLandingMode,
  onToggleMode,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-[68px] transition-all duration-300 ${
        scrolled || !isLandingMode
          ? 'bg-[#050505]/90 backdrop-blur-md border-b border-[#1D1D1D]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab(isLandingMode ? 'landing' : 'overview')}
            className="flex items-center gap-2.5 cursor-pointer group text-left"
          >
            <div className="w-6 h-6 bg-[#F5F5F0] rounded-[2px] flex items-center justify-center font-bold text-xs text-[#050505] tracking-wider">
              TW
            </div>
            <span className="font-bold text-sm tracking-[0.15em] text-[#F5F5F0] group-hover:text-white transition-colors font-display">
              TAPWISE
            </span>
          </button>

          {/* Landing Mode Desktop Links */}
          {isLandingMode && (
            <nav className="hidden md:flex items-center gap-6 text-xs text-[#8A8A8A]">
              <a href="#problem" className="hover:text-[#F5F5F0] transition-colors">
                Problem
              </a>
              <a href="#system" className="hover:text-[#F5F5F0] transition-colors">
                Platform
              </a>
              <a href="#system" className="hover:text-[#F5F5F0] transition-colors">
                Intelligence
              </a>
              <button
                onClick={onOpenCaseStudy}
                className="hover:text-[#F5F5F0] transition-colors cursor-pointer"
              >
                Case Study
              </button>
            </nav>
          )}

          {/* App Mode Contextual Pill */}
          {!isLandingMode && (
            <div className="hidden md:flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A] pl-4 border-l border-[#1D1D1D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
              <span>UPI ACQUIRING & TELEMETRY</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#8A8A8A]" />
            <span className="hidden sm:inline font-mono-tech text-[11px]">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono-tech bg-[#1A1A1A] px-1.5 py-0.5 rounded-[2px] text-[#8A8A8A] border border-[#2E2E2E]">
              ⌘K
            </kbd>
          </button>

          {/* Portfolio Case Study */}
          <button
            onClick={onOpenCaseStudy}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>AI PM Case Study</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onToggleMode}
            className="btn-magnetic flex items-center gap-1.5 px-3.5 py-1.5 rounded-[3px] bg-[#F5F5F0] hover:bg-white text-[#050505] text-xs font-semibold cursor-pointer shadow-sm transition-all"
          >
            {isLandingMode ? (
              <>
                <span>Launch App</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Exit to Landing</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
