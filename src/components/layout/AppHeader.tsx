import React, { useState, useEffect } from 'react';
import {
  Search,
    ArrowUpRight,
  Terminal,
  Keyboard,
  Menu,
  ChevronLeft,
  ChevronRight,
  Compass
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface AppHeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: () => void;
  onOpenKeyboardShortcuts: () => void;
  onToggleMobileDrawer: () => void;
  isLandingMode: boolean;
  onToggleMode: () => void;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
  onOpenTutorial?: () => void;
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
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward,
  onOpenTutorial,
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
      case 'signals': return 'SIGNALS / ANOMALIES';
      case 'insights': return 'INSIGHTS / ROOT CAUSE';
      case 'opportunities': return 'OPPORTUNITIES / INBOX';
      case 'prioritize': return 'PRIORITIZE / RICE';
      case 'prds': return 'PRDS / SPEC EDITOR';
      case 'experiments': return 'EXPERIMENTS / CAUSAL';
      case 'ai_copilot':
      case 'analytics': return 'AI COPILOT & SQL';
      case 'settings':
      case 'data_sources': return 'SETTINGS & SOURCES';
      default: return 'PRODUCT INTELLIGENCE';
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 h-14 sm:h-16 transition-all duration-200 select-none ${
        scrolled
          ? 'bg-[#050505]/95 backdrop-blur-xl border-b border-[#1D1D1D]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-full flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand & History & Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <button
            onClick={() => onSelectTab(isLandingMode ? 'landing' : 'overview')}
            className="flex items-center gap-2 cursor-pointer group text-left flex-shrink-0"
          >
            <div className="w-6 h-6 bg-[#0066FF] rounded-[2px] flex items-center justify-center font-bold text-xs text-white tracking-wider shadow-sm shadow-[#0066FF]/30">A</div>
            <span className="font-bold text-sm tracking-[0.15em] text-[#F5F5F0] group-hover:text-white transition-colors font-display">
              ARGUS
            </span>
          </button>

          {/* In-App Back & Forward History Controls */}
          <div className="flex items-center gap-0.5 pl-1 border-l border-[#1D1D1D]/70">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1.5 rounded-[2px] transition-colors flex items-center justify-center min-h-[34px] min-w-[34px] ${
                canGoBack
                  ? 'text-[#CCCCCC] hover:text-white bg-[#101010] hover:bg-[#181818] border border-[#1D1D1D] cursor-pointer'
                  : 'text-[#383838] bg-transparent border border-transparent cursor-not-allowed opacity-40'
              }`}
              title="Go Back in History (Alt+Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1.5 rounded-[2px] transition-colors flex items-center justify-center min-h-[34px] min-w-[34px] ${
                canGoForward
                  ? 'text-[#CCCCCC] hover:text-white bg-[#101010] hover:bg-[#181818] border border-[#1D1D1D] cursor-pointer'
                  : 'text-[#383838] bg-transparent border border-transparent cursor-not-allowed opacity-40'
              }`}
              title="Go Forward in History (Alt+Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Landing Mode Desktop Links */}
          {isLandingMode ? (
            <nav className="hidden md:flex items-center gap-6 text-xs text-[#8A8A8A] font-mono-tech pl-2">
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
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tech text-[#8A8A8A] pl-3 border-l border-[#1D1D1D] truncate">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse-dot flex-shrink-0" />
              <span className="tracking-wider truncate">{getBreadcrumb(activeTab)}</span>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          {/* Interactive Feature Tutorial Trigger */}
          {onOpenTutorial && (
            <button
              onClick={onOpenTutorial}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-[3px] bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/30 text-xs text-[#0066FF] hover:text-[#3B82F6] cursor-pointer transition-colors min-h-[40px]"
              title="Feature Tutorial & Onboarding Guide (T)"
            >
              <Compass className="w-3.5 h-3.5" />
              <span className="hidden sm:inline font-mono-tech text-[11px] font-bold">Tutorial</span>
            </button>
          )}

          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[40px]"
            title="Open Command Palette (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-[#8A8A8A]" />
            <span className="hidden sm:inline font-mono-tech text-[11px]">Search</span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono-tech bg-[#1A1A1A] px-1.5 py-0.5 rounded-[2px] text-[#8A8A8A] border border-[#2E2E2E]">
              ⌘K
            </kbd>
          </button>

          {/* Mode Switcher: Landing vs OS Mode */}
          <button
            onClick={onToggleMode}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[40px]"
          >
            {isLandingMode ? (
              <>
                <Terminal className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>Open OS</span>
              </>
            ) : (
              <>
                <ArrowUpRight className="w-3.5 h-3.5" />
                <span>Landing</span>
              </>
            )}
          </button>

          {/* Keyboard Shortcuts Trigger (Desktop only) */}
          <button
            onClick={onOpenKeyboardShortcuts}
            className="hidden sm:flex p-2 rounded-[3px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer transition-colors min-h-[40px] min-w-[40px] items-center justify-center"
            title="Keyboard Shortcuts (?)"
          >
            <Keyboard className="w-4 h-4" />
          </button>

          {/* Mobile Navigation Drawer Trigger (Visible < 768px) */}
          <button
            onClick={onToggleMobileDrawer}
            className="md:hidden p-2 rounded-[3px] bg-[#101010] border border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
            title="Open Mobile Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
