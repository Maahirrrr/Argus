import React, { useState, useEffect } from 'react';
import {
  Search,
  BookOpen,
  ArrowUpRight,
  Terminal,
  Keyboard,
  Menu
} from 'lucide-react';
import type { NavigationTab } from '../../types/tapwise';

interface AppHeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: () => void;
  onOpenKeyboardShortcuts: () => void;
  onToggleMobileDrawer: () => void;
  isLandingMode: boolean;
  onToggleMode: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCommandPalette,
  onOpenCaseStudy,
  onOpenKeyboardShortcuts,
  onToggleMobileDrawer,
  isLandingMode,
  onToggleMode,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getBreadcrumb = (tab: NavigationTab) => {
    switch (tab) {
      case 'overview': return 'OVERVIEW / COCKPIT';
      case 'signals': return 'SIGNALS / ANOMALY TRIAGE';
      case 'insights': return 'INSIGHTS / CAUSAL ROOT CAUSE';
      case 'opportunities': return 'OPPORTUNITIES / DISCOVERY';
      case 'prioritize': return 'PRIORITIZE / RICE WORKBENCH';
      case 'prds': return 'PRDS / SPEC EDITOR & CRITIC';
      case 'experiments': return 'EXPERIMENTS / CAUSAL A/B';
      case 'analytics': return 'ANALYTICS / CLICKHOUSE';
      case 'ai_copilot': return 'AI COPILOT / PM ADVISOR';
      case 'weekly_review': return 'WEEKLY REVIEW / BRIEFING';
      case 'data_sources': return 'DATA SOURCES / TELEMETRY';
      case 'settings': return 'SETTINGS / SENTRY CONFIG';
      default: return 'PRODUCT INTELLIGENCE';
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 h-[68px] transition-all duration-200 ${
        scrolled || !isLandingMode
          ? 'bg-[#050505]/95 backdrop-blur-md border-b border-[#1D1D1D]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-4">
        {/* Brand & Breadcrumb */}
        <div className="flex items-center gap-4 sm:gap-6">
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
          {isLandingMode ? (
            <nav className="hidden md:flex items-center gap-6 text-xs text-[#8A8A8A] font-mono-tech">
              <a href="#problem" className="hover:text-[#F5F5F0] transition-colors">
                The Problem
              </a>
              <a href="#system" className="hover:text-[#F5F5F0] transition-colors">
                Platform Architecture
              </a>
              <button
                onClick={onOpenCaseStudy}
                className="hover:text-[#F5F5F0] transition-colors cursor-pointer"
              >
                AI PM Case Study
              </button>
            </nav>
          ) : (
            /* App Mode Breadcrumb */
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A] pl-4 border-l border-[#1D1D1D]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot" />
              <span className="tracking-wider">{getBreadcrumb(activeTab)}</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#8A8A8A]" />
            <span className="hidden sm:inline font-mono-tech text-[11px]">Search</span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono-tech bg-[#1A1A1A] px-1.5 py-0.5 rounded-[2px] text-[#8A8A8A] border border-[#2E2E2E]">
              ⌘K
            </kbd>
          </button>

          {/* Keyboard Shortcuts Trigger */}
          <button
            onClick={onOpenKeyboardShortcuts}
            className="hidden sm:flex items-center p-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-3.5 h-3.5" />
          </button>

          {/* Portfolio Case Study */}
          <button
            onClick={onOpenCaseStudy}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>AI PM Case Study</span>
          </button>

          {/* Primary Action Button (Launch App / Exit) */}
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

          {/* Mobile Drawer Trigger */}
          {!isLandingMode && (
            <button
              onClick={onToggleMobileDrawer}
              className="md:hidden p-1.5 rounded-[3px] bg-[#101010] border border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
