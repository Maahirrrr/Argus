import { useState, useEffect } from 'react';
import type { NavigationTab, Opportunity, PrioritizationInitiative } from './types/tapwise';
import { DEMO_OPPORTUNITIES, DEMO_INITIATIVES } from './data/demoData';

import { LoadingSequence } from './components/landing/LoadingSequence';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { MobileNavigation } from './components/layout/MobileNavigation';
import { CommandPalette } from './components/layout/CommandPalette';
import { KeyboardShortcutsModal } from './components/layout/KeyboardShortcutsModal';
import { CaseStudyModal } from './components/layout/CaseStudyModal';

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

export function App() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [isLandingMode, setIsLandingMode] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [initiatives] = useState<PrioritizationInitiative[]>(DEMO_INITIATIVES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenApp = (targetTab: NavigationTab = 'overview') => {
    setIsLandingMode(false);
    setActiveTab(targetTab);
  };

  const handleToggleMode = () => {
    if (isLandingMode) {
      setIsLandingMode(false);
      setActiveTab('overview');
    } else {
      setIsLandingMode(true);
      setActiveTab('landing');
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

      // '?' opens keyboard shortcuts modal
      if (e.key === '?' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        setIsShortcutsOpen((prev) => !prev);
        return;
      }

      // 'C' triggers create opportunity / PRD action
      if (e.key === 'c' || e.key === 'C') {
        if (!e.metaKey && !e.ctrlKey) {
          setIsLandingMode(false);
          setActiveTab('opportunities');
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
          setIsLandingMode(false);
          setActiveTab(targetTab);
          showToast(`Navigated to ${targetTab.toUpperCase()}`);
          lastKey = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ───── INTERACTIVE DECISION LOOP HANDLERS ─────
  const handleInvestigateSignal = (_signalId?: string) => {
    setIsLandingMode(false);
    setActiveTab('insights');
    showToast('Signal 014: 4.2M events analyzed across ClickHouse & NPCI telemetry.');
  };

  const handleCreateOpportunityFromInsight = (_insightId?: string) => {
    setActiveTab('opportunities');
    showToast('Opportunity #014 added to Discovery Inbox with empirical evidence.');
  };

  const handlePrioritizeOpportunity = (_oppId?: string) => {
    setActiveTab('prioritize');
    showToast('Opportunity prioritized at #1 on RICE roadmap.');
  };

  const handleDismissOpportunity = (oppId: string) => {
    setOpportunities((prev) => prev.filter((o) => o.id !== oppId));
    showToast('Opportunity dismissed from inbox.');
  };

  const handleSelectInitiativeForPrd = (init: PrioritizationInitiative) => {
    setActiveTab('prds');
    showToast(`PRD generated for "${init.title}". Embedded AI tools ready.`);
  };

  const handleDeployExperiment = () => {
    showToast('A/B experiment deployed to feature flag. Circuit breakers active.');
  };

  const handleSelectCommandAction = (tab: NavigationTab, _payload?: any) => {
    if (tab === 'landing') {
      setIsCaseStudyOpen(true);
      return;
    }
    setIsLandingMode(false);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white pb-20 md:pb-0">
      {/* 1.2s Fast Initial Loading Sequence */}
      {!hasLoaded && <LoadingSequence onComplete={() => setHasLoaded(true)} />}

      {/* Subtle Noise Texture */}
      <div className="tapwise-noise" aria-hidden="true" />

      {/* Toast Notification Banner (Centered on phone, top-right on desktop) */}
      {toastMessage && (
        <div className="fixed top-18 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 px-4 py-2.5 rounded-[3px] bg-[#0A0A0A] border border-[#0066FF]/40 text-xs font-mono-tech text-[#F5F5F0] shadow-2xl flex items-center justify-center sm:justify-start gap-2.5 animate-fade-in max-w-md mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse-dot flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Minimalist Sticky Header */}
      <AppHeader
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'landing') {
            setIsLandingMode(true);
            setActiveTab('landing');
          } else {
            setIsLandingMode(false);
            setActiveTab(tab);
          }
        }}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onOpenKeyboardShortcuts={() => setIsShortcutsOpen(true)}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        isLandingMode={isLandingMode}
        onToggleMode={handleToggleMode}
      />

      {/* Main Layout: Landing Page OR Operating System */}
      {isLandingMode ? (
        <main className="flex-1 w-full relative z-10">
          <LandingPage
            onOpenApp={handleOpenApp}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
            onInvestigateSignal={handleInvestigateSignal}
          />
        </main>
      ) : (
        /* Operating System Shell */
        <div className="flex-1 flex w-full relative z-10">
          <AppSidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            unresolvedSignalsCount={5}
            unresolvedOpportunitiesCount={opportunities.filter((o) => o.status === 'inbox').length}
          />

          <main className="flex-1 overflow-x-hidden min-h-[calc(100vh-68px)] bg-[#050505]">
            {activeTab === 'overview' && (
              <OverviewDashboard
                onNavigateTab={setActiveTab}
                onInvestigateSignal={handleInvestigateSignal}
              />
            )}

            {activeTab === 'signals' && (
              <SignalsModule
                onNavigateTab={setActiveTab}
                onInvestigateSignal={handleInvestigateSignal}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsModule
                onNavigateTab={setActiveTab}
                onCreateOpportunityFromInsight={handleCreateOpportunityFromInsight}
              />
            )}

            {activeTab === 'opportunities' && (
              <OpportunitiesInbox
                opportunities={opportunities}
                onNavigateTab={setActiveTab}
                onPrioritizeOpportunity={handlePrioritizeOpportunity}
                onDismissOpportunity={handleDismissOpportunity}
              />
            )}

            {activeTab === 'prioritize' && (
              <PrioritizationModule
                initiatives={initiatives}
                onNavigateTab={setActiveTab}
                onSelectInitiativeForPrd={handleSelectInitiativeForPrd}
              />
            )}

            {activeTab === 'prds' && (
              <PrdWorkspace
                onNavigateTab={setActiveTab}
                onDeployExperiment={handleDeployExperiment}
              />
            )}

            {activeTab === 'experiments' && (
              <ExperimentLab
                onNavigateTab={setActiveTab}
              />
            )}

            {(activeTab === 'ai_copilot' || (activeTab as any) === 'analytics') && (
              <ContextualCopilot
                activeTab={activeTab}
                onNavigateTab={setActiveTab}
                onCreateOpportunity={() => handleCreateOpportunityFromInsight('ins-001')}
              />
            )}

            {(activeTab === 'settings' || (activeTab as any) === 'data_sources' || (activeTab as any) === 'weekly_review') && (
              <SettingsPage />
            )}
          </main>
        </div>
      )}

      {/* Mobile Bottom Quick Bar and Slide-Over Drawer */}
      {!isLandingMode && (
        <MobileNavigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          isDrawerOpen={isMobileDrawerOpen}
          onToggleDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
          onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
          unresolvedSignalsCount={5}
          unresolvedOpportunitiesCount={opportunities.filter((o) => o.status === 'inbox').length}
        />
      )}

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectCommandAction}
      />

      {/* Global Keyboard Shortcuts Modal (?) */}
      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      {/* AI PM Portfolio Case Study Modal */}
      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />
    </div>
  );
}

export default App;
