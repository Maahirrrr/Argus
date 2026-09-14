import React from 'react';
import {
  Sparkles,
  Command,
  HelpCircle,
  BookOpen,
  Keyboard,
  ChevronLeft,
  ChevronRight,
  Compass,
  LayoutDashboard,
  Menu,
  GraduationCap
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface AppHeaderProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenCommandPalette: () => void;
  onOpenCaseStudy: () => void;
  onOpenKeyboardShortcuts: () => void;
  onOpenHelpCenter: () => void;
  isLandingMode: boolean;
  onToggleMode: () => void;
  onToggleMobileDrawer: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onOpenTutorial: () => void;
  aiPmMode: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenCommandPalette,
  onOpenCaseStudy,
  onOpenKeyboardShortcuts,
  onOpenHelpCenter,
  isLandingMode,
  onToggleMode,
  onToggleMobileDrawer,
  canGoBack,
  canGoForward,
  onGoBack,
  onGoForward,
  onOpenTutorial,
  aiPmMode,
}) => {
  const getTabBreadcrumb = (tab: NavigationTab): string => {
    switch (tab) {
      case 'home':
      case 'overview':
        return 'WORK / Cockpit';
      case 'inbox':
        return 'WORK / Triage Inbox';
      case 'customers':
      case 'feedback':
        return 'DISCOVER / Feedback';
      case 'research':
        return 'DISCOVER / Research Lab';
      case 'intelligence':
        return 'DISCOVER / Radar';
      case 'signals':
        return 'DISCOVER / Signals';
      case 'insights':
        return 'DISCOVER / Insights';
      case 'opportunities':
        return 'DECIDE / Opportunities';
      case 'prioritize':
        return 'DECIDE / Prioritize';
      case 'roadmap':
        return 'DECIDE / Roadmap';
      case 'prds':
        return 'BUILD / PRD Studio';
      case 'prototypes':
        return 'BUILD / Prototypes';
      case 'ai_lab':
        return 'BUILD / AI Lab';
      case 'experiments':
        return 'MEASURE / Experiments';
      case 'analytics':
        return 'MEASURE / Analytics';
      case 'ai_copilot':
        return 'MEASURE / Copilot';
      case 'launch':
        return 'MEASURE / Release';
      case 'decisions':
        return 'WORKSPACE / Decision Log';
      case 'documents':
        return 'WORKSPACE / Specs';
      case 'settings':
      case 'data_sources':
        return 'WORKSPACE / Settings';
      default:
        return 'ARGUS / Operating System';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/95 backdrop-blur-md border-b border-[#1D1D1D] px-3 sm:px-6 h-14 flex items-center justify-between">
      {/* Left: Brand & Browser History */}
      <div className="flex items-center gap-3">
        {/* Mobile drawer trigger */}
        <button
          onClick={onToggleMobileDrawer}
          className="md:hidden p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0]"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Brand */}
        <div
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-6 h-6 rounded-[2px] bg-[#0066FF] flex items-center justify-center text-white font-bold text-xs tracking-wider shadow-md shadow-[#0066FF]/20">
            A
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-sm tracking-widest text-[#F5F5F0] group-hover:text-[#0066FF] transition-colors">
              ARGUS
            </span>
          </div>
        </div>

        {/* Browser History Nav Buttons */}
        {!isLandingMode && (
          <div className="hidden sm:flex items-center gap-0.5 ml-2 pl-2 border-l border-[#1D1D1D]">
            <button
              onClick={onGoBack}
              disabled={!canGoBack}
              className={`p-1 rounded-[2px] transition-colors ${
                canGoBack ? 'text-[#8A8A8A] hover:text-[#F5F5F0]' : 'text-[#333] cursor-not-allowed'
              }`}
              title="Go Back (Alt + Left)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onGoForward}
              disabled={!canGoForward}
              className={`p-1 rounded-[2px] transition-colors ${
                canGoForward ? 'text-[#8A8A8A] hover:text-[#F5F5F0]' : 'text-[#333] cursor-not-allowed'
              }`}
              title="Go Forward (Alt + Right)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Active Workspace Breadcrumb */}
        {!isLandingMode && (
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono-tech text-[#8A8A8A] ml-2">
            <span className="text-[#333]">/</span>
            <span className="text-[#F5F5F0] font-medium">{getTabBreadcrumb(activeTab)}</span>
          </div>
        )}
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between bg-[#0D0D0D] hover:bg-[#121212] border border-[#1D1D1D] hover:border-[#0066FF]/40 rounded-[2px] px-3 py-1.5 text-xs text-[#8A8A8A] transition-all group"
        >
          <div className="flex items-center gap-2 truncate">
            <Command className="w-3.5 h-3.5 text-[#0066FF] group-hover:scale-105 transition-transform" />
            <span className="truncate">Search workspaces, PRDs, models...</span>
          </div>
          <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono-tech px-1.5 py-0.5 rounded-[2px] bg-[#171717] border border-[#262626] text-[#8A8A8A]">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right: AI PM Status & Utilities */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* AI PM Status Pill */}
        {aiPmMode && (
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 text-[10px] font-mono-tech text-[#0066FF]">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>AI PM</span>
          </div>
        )}

        {/* Interactive Tutorial Button */}
        <button
          onClick={onOpenTutorial}
          className="hidden sm:flex items-center gap-1 p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#121212] rounded-[2px] transition-colors"
          title="Guided Tutorial (T)"
        >
          <GraduationCap className="w-4 h-4" />
        </button>

        {/* Help Center */}
        <button
          onClick={onOpenHelpCenter}
          className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#121212] rounded-[2px] transition-colors"
          title="Argus Help Center"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Keyboard Shortcuts */}
        <button
          onClick={onOpenKeyboardShortcuts}
          className="hidden sm:block p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#121212] rounded-[2px] transition-colors"
          title="Keyboard Shortcuts (?)"
        >
          <Keyboard className="w-4 h-4" />
        </button>

        {/* Case Study */}
        <button
          onClick={onOpenCaseStudy}
          className="hidden md:flex items-center gap-1 px-2.5 py-1 text-xs font-mono-tech text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#121212] border border-transparent hover:border-[#1D1D1D] rounded-[2px] transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Case Study</span>
        </button>

        {/* Landing / App View Mode Toggle */}
        <button
          onClick={onToggleMode}
          className="flex items-center gap-1 px-2.5 py-1 text-xs font-mono-tech bg-[#121212] hover:bg-[#1A1A1A] border border-[#222] text-[#F5F5F0] rounded-[2px] transition-colors ml-1"
        >
          {isLandingMode ? (
            <>
              <LayoutDashboard className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="hidden sm:inline">Open Cockpit</span>
            </>
          ) : (
            <>
              <Compass className="w-3.5 h-3.5 text-[#0066FF]" />
              <span className="hidden sm:inline">Tour</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};
