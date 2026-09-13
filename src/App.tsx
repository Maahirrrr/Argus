import { useState, useEffect } from 'react';
import type { NavigationTab, Opportunity, PrioritizationInitiative } from './types/argus';
import { DEMO_OPPORTUNITIES, DEMO_INITIATIVES } from './data/demoData';

import { LoadingSequence } from './components/landing/LoadingSequence';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { CommandPalette } from './components/layout/CommandPalette';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';
import { CaseStudyModal } from './components/layout/CaseStudyModal';
import { TutorialModal } from './components/layout/TutorialModal';
import { ChaosSimulatorModal } from './components/modules/ChaosSimulatorModal';

import { LandingPage } from './components/landing/LandingPage';
import { OverviewDashboard } from './components/modules/OverviewDashboard';
import { SignalsModule } from './components/modules/SignalsModule';
import { InsightsModule } from './components/modules/InsightsModule';
import { OpportunitiesInbox } from './components/modules/OpportunitiesInbox';
import { PrioritizationModule } from './components/modules/PrioritizationModule';
import { PrdWorkspace } from './components/modules/PrdWorkspace';
import { ExperimentLab } from './components/modules/ExperimentLab';
import { ContextualCopilot } from './components/modules/ContextualCopilot';
import { SettingsPage } from './components/modules/SettingsPage';
import { Compass, X } from 'lucide-react';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // 1. Initial State from URL Hash or Default
  const getInitialTab = (): NavigationTab => {
    const hash = window.location.hash.replace('#', '') as NavigationTab;
    const validTabs: NavigationTab[] = [
      'overview', 'signals', 'insights', 'opportunities',
      'prioritize', 'prds', 'experiments', 'ai_copilot', 'settings', 'landing'
    ];
    return validTabs.includes(hash) ? hash : 'landing';
  };

  const [activeTab, setActiveTab] = useState<NavigationTab>(getInitialTab);
  const [isLandingMode, setIsLandingMode] = useState<boolean>(() => getInitialTab() === 'landing');
  const [historyStack, setHistoryStack] = useState<NavigationTab[]>(() => [getInitialTab()]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isChaosSimulatorOpen, setIsChaosSimulatorOpen] = useState<boolean>(false);
  const [showOnboardingPrompt, setShowOnboardingPrompt] = useState<boolean>(() => {
    return !localStorage.getItem('argus_onboarding_shown');
  });

  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [initiatives] = useState<PrioritizationInitiative[]>(DEMO_INITIATIVES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 2. Centralized Navigation Handler with Browser History Push
  const navigateTo = (tab: NavigationTab, replace: boolean = false) => {
    if (tab === activeTab && isLandingMode === (tab === 'landing')) return;

    if (tab === 'landing') {
      setIsLandingMode(true);
    } else {
      setIsLandingMode(false);
    }
    setActiveTab(tab);

    const hashUrl = tab === 'landing' ? '#' : `#${tab}`;
    if (replace) {
      window.history.replaceState({ tab }, '', hashUrl);
    } else {
      window.history.pushState({ tab }, '', hashUrl);
      setHistoryStack((prev) => {
        const next = [...prev.slice(0, historyIndex + 1), tab];
        return next;
      });
      setHistoryIndex((prev) => prev + 1);
    }
  };

  // 3. Browser Back / Forward (popstate) Listener
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      const targetTab = (e.state?.tab || hash || 'landing') as NavigationTab;
      setActiveTab(targetTab);
      setIsLandingMode(targetTab === 'landing');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // 4. Back / Forward In-App Controls
  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < historyStack.length - 1;

  const handleGoBack = () => {
    if (canGoBack) {
      const newIndex = historyIndex - 1;
      const targetTab = historyStack[newIndex];
      setHistoryIndex(newIndex);
      setActiveTab(targetTab);
      setIsLandingMode(targetTab === 'landing');
      window.history.replaceState({ tab: targetTab }, '', targetTab === 'landing' ? '#' : `#${targetTab}`);
    } else {
      window.history.back();
    }
  };

  const handleGoForward = () => {
    if (canGoForward) {
      const newIndex = historyIndex + 1;
      const targetTab = historyStack[newIndex];
      setHistoryIndex(newIndex);
      setActiveTab(targetTab);
      setIsLandingMode(targetTab === 'landing');
      window.history.replaceState({ tab: targetTab }, '', targetTab === 'landing' ? '#' : `#${targetTab}`);
    } else {
      window.history.forward();
    }
  };

  const handleOpenApp = (targetTab: NavigationTab = 'overview') => {
    navigateTo(targetTab);
  };

  const handleToggleMode = () => {
    if (isLandingMode) {
      navigateTo('overview');
    } else {
      navigateTo('landing');
    }
  };

  // ───── GLOBAL KEYBOARD SHORTCUTS ─────
  useEffect(() => {
    let lastKey = '';
    let lastKeyTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const now = Date.now();

      // Alt + Left Arrow -> Back
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
        return;
      }

      // Alt + Right Arrow -> Forward
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleGoForward();
        return;
      }

      // 'T' opens tutorial modal
      if ((e.key === 't' || e.key === 'T') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setIsTutorialOpen(true);
        return;
      }

      // '?' opens keyboard shortcuts modal
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // 'C' triggers create opportunity / PRD action
      if (e.key === 'c' || e.key === 'C') {
        if (!e.metaKey && !e.ctrlKey) {
          navigateTo('opportunities');
          showToast('Navigated to Opportunities');
          return;
        }
      }

      // Two-key sequence starting with 'G' (Go to ...)
      if (e.key.toLowerCase() === 'g') {
        lastKey = 'g';
        lastKeyTime = now;
        return;
      }

      if (lastKey === 'g' && now - lastKeyTime < 1000) {
        const char = e.key.toLowerCase();
        let targetTab: NavigationTab | null = null;
        if (char === 'o') targetTab = 'overview';
        else if (char === 's') targetTab = 'signals';
        else if (char === 'i') targetTab = 'insights';
        else if (char === 'p') targetTab = 'opportunities';
        else if (char === 'r') targetTab = 'prioritize';
        else if (char === 'd') targetTab = 'prds';
        else if (char === 'e') targetTab = 'experiments';
        else if (char === 'c') targetTab = 'ai_copilot';
        else if (char === 'k') targetTab = 'settings';

        if (targetTab) {
          e.preventDefault();
          navigateTo(targetTab);
          showToast(`Navigated to ${targetTab.toUpperCase()}`);
          lastKey = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, historyStack]);

  // ───── INTERACTIVE DECISION LOOP HANDLERS ─────
  const handleInvestigateSignal = (_signalId: string) => {
    navigateTo('insights');
    showToast('Signal #001 isolated. Bayesian causal decomposition complete.');
  };

  const handlePromoteToOpportunity = (targetOppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === targetOppId ? { ...opp, status: 'prioritized' } : opp))
    );
    navigateTo('prioritize');
    showToast('Opportunity #014 promoted to Prioritization Matrix.');
  };

  const handlePrioritizeOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === oppId ? { ...opp, status: 'prioritized' } : opp))
    );
    navigateTo('prioritize');
    showToast('Opportunity added to RICE Matrix. Sensitivity simulator active.');
  };

  const handleDismissOpportunity = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === oppId ? { ...opp, status: 'dismissed' } : opp))
    );
    showToast('Opportunity dismissed.');
  };

  const handleSelectInitiativeForPrd = (init: PrioritizationInitiative) => {
    navigateTo('prds');
    showToast(`PRD generated for "${init.title}". Embedded AI tools ready.`);
  };

  const handleDeployExperiment = () => {
    showToast('A/B experiment deployed to feature flag. Circuit breakers active.');
  };

  const handleSelectCommandAction = (tab: NavigationTab, payload?: any) => {
    if (payload === 'cmd-tutorial') {
      setIsTutorialOpen(true);
      return;
    }
    if (payload === 'cmd-chaos') {
      setIsChaosSimulatorOpen(true);
      return;
    }
    if (tab === 'landing') {
      setIsCaseStudyOpen(true);
      return;
    }
    navigateTo(tab);
  };

  const dismissOnboarding = () => {
    setShowOnboardingPrompt(false);
    localStorage.setItem('argus_onboarding_shown', 'true');
  };

  const startTutorialFromPrompt = () => {
    dismissOnboarding();
    setIsTutorialOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white pb-20 md:pb-0">
      {/* 1.2s Fast Initial Loading Sequence */}
      {!hasLoaded && <LoadingSequence onComplete={() => setHasLoaded(true)} />}

      {/* Subtle Noise Texture */}
      <div className="argus-noise" aria-hidden="true" />

      {/* Onboarding Welcome Prompt Banner (Shown until dismissed) */}
      {showOnboardingPrompt && hasLoaded && (
        <div className="bg-[#091528] border-b border-[#0066FF]/30 px-4 py-2.5 text-xs font-mono-tech flex items-center justify-between gap-3 text-[#8AB4F8] select-none animate-fade-in z-30">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#0066FF] flex-shrink-0" />
            <span>
              <strong>Welcome to Argus.</strong> Take a 60-second interactive tour of how to use every feature.
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={startTutorialFromPrompt}
              className="px-2.5 py-1 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white font-bold text-[11px] cursor-pointer shadow-sm shadow-[#0066FF]/30 transition-colors"
            >
              Start Tour →
            </button>
            <button
              onClick={dismissOnboarding}
              className="p-1 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification Banner (Centered on phone, top-right on desktop) */}
      {toastMessage && (
        <div className="fixed top-18 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 px-4 py-2.5 rounded-[3px] bg-[#0A0A0A] border border-[#0066FF]/40 text-xs font-mono-tech text-[#F5F5F0] shadow-2xl flex items-center justify-center sm:justify-start gap-2.5 animate-fade-in max-w-md mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse-dot flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Minimalist Sticky Header with Back/Forward + Tutorial */}
      <AppHeader
        activeTab={activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onOpenKeyboardShortcuts={() => setIsShortcutsOpen(true)}
        isLandingMode={isLandingMode}
        onToggleMode={handleToggleMode}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />

      {/* Main Layout: Landing Page OR Operating System */}
      {isLandingMode ? (
        <main className="flex-1 w-full relative z-10">
          <LandingPage
            onOpenApp={handleOpenApp}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
          />
        </main>
      ) : (
        <div className="flex-1 flex w-full relative z-10">
          {/* Institutional Sidebar (Desktop >= 768px) */}
          <AppSidebar
            activeTab={activeTab}
            onSelectTab={(tab) => navigateTo(tab)}
            unresolvedSignalsCount={5}
            unresolvedOpportunitiesCount={opportunities.filter((o) => o.status === 'inbox').length}
          />

          {/* Module Canvas */}
          <main className="flex-1 overflow-x-hidden min-w-0 bg-[#050505]">
            {activeTab === 'overview' && (
              <OverviewDashboard
                onNavigateTab={(tab) => navigateTo(tab)}
                onInvestigateSignal={handleInvestigateSignal}
                onOpenChaosSimulator={() => setIsChaosSimulatorOpen(true)}
              />
            )}

            {activeTab === 'signals' && (
              <SignalsModule
                onNavigateTab={(tab) => navigateTo(tab)}
                onInvestigateSignal={handleInvestigateSignal}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsModule onNavigateTab={(tab) => navigateTo(tab)} onCreateOpportunityFromInsight={handlePromoteToOpportunity} />
            )}

            {activeTab === 'opportunities' && (
              <OpportunitiesInbox
                opportunities={opportunities}
                onNavigateTab={(tab) => navigateTo(tab)}
                onPrioritizeOpportunity={handlePrioritizeOpportunity}
                onDismissOpportunity={handleDismissOpportunity}
              />
            )}

            {activeTab === 'prioritize' && (
              <PrioritizationModule
                initiatives={initiatives}
                onNavigateTab={(tab) => navigateTo(tab)}
                onSelectInitiativeForPrd={handleSelectInitiativeForPrd}
              />
            )}

            {activeTab === 'prds' && (
              <PrdWorkspace
                onNavigateTab={(tab) => navigateTo(tab)}
                onDeployExperiment={handleDeployExperiment}
              />
            )}

            {activeTab === 'experiments' && (
              <ExperimentLab
                onNavigateTab={(tab) => navigateTo(tab)}
              />
            )}

            {(activeTab === 'ai_copilot' || activeTab === 'analytics') && (
              <ContextualCopilot activeTab={activeTab} onNavigateTab={(tab) => navigateTo(tab)} onCreateOpportunity={() => navigateTo("opportunities")} />
            )}

            {(activeTab === 'settings' || activeTab === 'data_sources') && (
              <SettingsPage />
            )}
          </main>
        </div>
      )}

      {/* Touch-First Mobile Bottom Navigation Bar (< 768px) */}
      <MobileNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
        isDrawerOpen={isMobileDrawerOpen}
        onToggleDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        onOpenCaseStudy={() => {
          setIsMobileDrawerOpen(false);
          setIsCaseStudyOpen(true);
        }}
        
      />

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectCommandAction}
      />

      {/* Keyboard Shortcuts Cheat Sheet (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* AI Product Management Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      {/* Feature Onboarding Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => navigateTo(tab)}
      />

      {/* Advanced Live Chaos & Failover Simulator Modal */}
      <ChaosSimulatorModal
        isOpen={isChaosSimulatorOpen}
        onClose={() => setIsChaosSimulatorOpen(false)}
        onNavigateTab={(tab) => navigateTo(tab)}
        onShowToast={showToast}
      />
    </div>
  );
}
