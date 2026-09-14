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
import { OnboardingModal } from './components/layout/OnboardingModal';
import { GuidedProductLoop } from './components/layout/GuidedProductLoop';
import { HelpCenterModal } from './components/layout/HelpCenterModal';

import { LandingPage } from './components/landing/LandingPage';
import { OverviewDashboard } from './components/modules/OverviewDashboard';
import { UnifiedInbox } from './components/modules/UnifiedInbox';
import { CustomerFeedback } from './components/modules/CustomerFeedback';
import { ResearchLab } from './components/modules/ResearchLab';
import { IntelligencePage } from './components/modules/IntelligencePage';
import { PageTransition } from './components/ui/PageTransition';
import { OpportunityTree } from './components/modules/OpportunityTree';
import { PrioritizationModule } from './components/modules/PrioritizationModule';
import { RoadmapModule } from './components/modules/RoadmapModule';
import { PrdWorkspace } from './components/modules/PrdWorkspace';
import { PrototypeLab } from './components/modules/PrototypeLab';
import { AiProductLab } from './components/modules/AiProductLab';
import { ExperimentLab } from './components/modules/ExperimentLab';
import { AnalyticsCopilot } from './components/modules/AnalyticsCopilot';
import { ContextualCopilot } from './components/modules/ContextualCopilot';
import { LaunchCenter } from './components/modules/LaunchCenter';
import { DecisionLog } from './components/modules/DecisionLog';
import { DocumentHub } from './components/modules/DocumentHub';
import { SettingsPage } from './components/modules/SettingsPage';
import { SignalsModule } from './components/modules/SignalsModule';
import { InsightsModule } from './components/modules/InsightsModule';

export default function App() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);

  // 1. Clean URL Hash Routing Engine
  const tabToHash = (tab: NavigationTab): string => {
    if (tab === 'home' || tab === 'overview') return '#/cockpit';
    if (tab === 'landing') return '#/landing';
    if (tab === 'ai_lab') return '#/ai-lab';
    if (tab === 'ai_copilot') return '#/copilot';
    return `#/${tab}`;
  };

  const hashToTab = (hashStr: string): NavigationTab => {
    const clean = hashStr.replace(/^#\/?/, '').toLowerCase();
    if (clean === 'landing') return 'landing';
    if (clean === 'ai-lab' || clean === 'ai_lab') return 'ai_lab';
    if (clean === 'copilot' || clean === 'ai_copilot') return 'ai_copilot';
    if (clean === 'cockpit' || clean === 'home' || clean === 'overview' || clean === '') return 'home';
    if (clean === 'feedback' || clean === 'customers') return 'customers';
    if (clean === 'radar') return 'intelligence';
    const validTabs: NavigationTab[] = [
      'home', 'inbox', 'customers', 'research', 'intelligence', 'signals', 'insights',
      'opportunities', 'prioritize', 'roadmap', 'prds', 'prototypes', 'ai_lab',
      'experiments', 'analytics', 'ai_copilot', 'launch', 'decisions', 'documents', 'settings'
    ];
    return validTabs.includes(clean as NavigationTab) ? (clean as NavigationTab) : 'home';
  };

  const initialTab = hashToTab(window.location.hash);
  const [activeTab, setActiveTab] = useState<NavigationTab>(initialTab);
  const [isLandingMode, setIsLandingMode] = useState<boolean>(() => initialTab === 'landing');
  const [historyStack, setHistoryStack] = useState<NavigationTab[]>([initialTab]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Density Engine (Compact, Balanced, Comfortable)
  const [density, setDensity] = useState<'compact' | 'balanced' | 'comfortable'>(() => {
    const saved = localStorage.getItem('argus_density');
    return (saved as any) || 'balanced';
  });

  const handleCycleDensity = () => {
    setDensity((prev) => {
      const next = prev === 'compact' ? 'balanced' : prev === 'balanced' ? 'comfortable' : 'compact';
      localStorage.setItem('argus_density', next);
      showToast(`Information density set to ${next}.`);
      return next;
    });
  };

  useEffect(() => {
    document.body.classList.remove('density-compact', 'density-balanced', 'density-comfortable');
    document.body.classList.add(`density-${density}`);
  }, [density]);

  // Modals & Guided Loop
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState<boolean>(false);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState<boolean>(false);
  const [isChaosSimulatorOpen, setIsChaosSimulatorOpen] = useState<boolean>(false);
  const [isHelpCenterOpen, setIsHelpCenterOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(() => {
    return !localStorage.getItem('argus_onboarding_completed');
  });
  const [showGuidedLoop, setShowGuidedLoop] = useState<boolean>(() => {
    return !localStorage.getItem('argus_guided_loop_dismissed');
  });

  // Settings & Customization
  const [aiPmMode, setAiPmMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('argus_ai_pm_mode');
    return saved !== null ? saved === 'true' : true;
  });

  const [enabledModules, setEnabledModules] = useState<NavigationTab[]>([
    'home', 'inbox', 'customers', 'research', 'intelligence',
    'opportunities', 'prioritize', 'roadmap', 'prds', 'prototypes',
    'ai_lab', 'experiments', 'analytics', 'launch', 'decisions', 'documents', 'settings'
  ]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [initiatives] = useState<PrioritizationInitiative[]>(DEMO_INITIATIVES);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleAiPmMode = () => {
    setAiPmMode((prev) => {
      const next = !prev;
      localStorage.setItem('argus_ai_pm_mode', String(next));
      showToast(next ? 'AI Product Manager Mode enabled.' : 'AI PM Mode disabled.');
      return next;
    });
  };

  const handleToggleModule = (mod: NavigationTab) => {
    setEnabledModules((prev) => {
      const exists = prev.includes(mod);
      const next = exists ? prev.filter((m) => m !== mod) : [...prev, mod];
      showToast(`${exists ? 'Disabled' : 'Enabled'} workspace module.`);
      return next;
    });
  };

  // 2. Centralized Navigation Handler with Clean URL Hash
  const navigateTo = (tab: NavigationTab, replace: boolean = false) => {
    if (tab === 'landing') {
      setIsLandingMode(true);
      setActiveTab('landing');
      if (window.location.hash !== '#/landing') {
        window.history.pushState({ tab: 'landing' }, '', '#/landing');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (tab === activeTab && !isLandingMode) return;

    setIsLandingMode(false);
    setActiveTab(tab);

    const hashUrl = tabToHash(tab);
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

  // 3. Browser Back / Forward (popstate & hashchange) Listener
  useEffect(() => {
    const handleHashSync = () => {
      const targetTab = hashToTab(window.location.hash);
      setActiveTab(targetTab);
      setIsLandingMode(targetTab === 'landing');
    };

    window.addEventListener('popstate', handleHashSync);
    window.addEventListener('hashchange', handleHashSync);
    return () => {
      window.removeEventListener('popstate', handleHashSync);
      window.removeEventListener('hashchange', handleHashSync);
    };
  }, []);

  // 4. In-App History Controls
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

  const handleOpenApp = (targetTab: NavigationTab = 'home') => {
    navigateTo(targetTab);
  };

  const handleToggleMode = () => {
    if (isLandingMode) {
      navigateTo('home');
    } else {
      navigateTo('landing');
    }
  };

  // ───── GLOBAL KEYBOARD SHORTCUTS ─────
  useEffect(() => {
    let lastKey = '';
    let lastKeyTime = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;

      const now = Date.now();

      // Alt + Left -> Back
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
        return;
      }

      // Alt + Right -> Forward
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

      // Two-key sequence starting with 'G' (Go to ...)
      if (e.key.toLowerCase() === 'g') {
        lastKey = 'g';
        lastKeyTime = now;
        return;
      }

      if (lastKey === 'g' && now - lastKeyTime < 1000) {
        const char = e.key.toLowerCase();
        let targetTab: NavigationTab | null = null;
        if (char === 'h') targetTab = 'home';
        else if (char === 'b') targetTab = 'inbox';
        else if (char === 'c') targetTab = 'customers';
        else if (char === 'r') targetTab = 'research';
        else if (char === 'i') targetTab = 'intelligence';
        else if (char === 'o') targetTab = 'opportunities';
        else if (char === 'p') targetTab = 'prioritize';
        else if (char === 'm') targetTab = 'roadmap';
        else if (char === 'd') targetTab = 'prds';
        else if (char === 't') targetTab = 'prototypes';
        else if (char === 'l') targetTab = 'ai_lab';
        else if (char === 'e') targetTab = 'experiments';
        else if (char === 'a') targetTab = 'analytics';
        else if (char === 'u') targetTab = 'launch';
        else if (char === 'j') targetTab = 'decisions';
        else if (char === 'k') targetTab = 'documents';
        else if (char === 's') targetTab = 'settings';

        if (targetTab) {
          e.preventDefault();
          navigateTo(targetTab);
          showToast(`Navigated to ${targetTab}`);
          lastKey = '';
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, historyStack]);

  const handleInvestigateSignal = (signalId: string) => {
    navigateTo('insights');
    showToast(`Signal ${signalId} isolated. Bayesian causal decomposition complete.`);
  };

  const handleCreateOpportunityFromInsight = (oppId: string) => {
    setOpportunities((prev) =>
      prev.map((o) => (o.id === oppId ? { ...o, status: 'prioritized' as const } : o))
    );
    navigateTo('prioritize');
    showToast('Opportunity promoted to Prioritization Matrix.');
  };

  const handleSelectInitiativeForPrd = (init: PrioritizationInitiative) => {
    navigateTo('prds');
    showToast(`PRD generated for ${init.title}. Embedded AI tools ready.`);
  };

  const handleDeployExperiment = () => {
    showToast('A/B experiment deployed to feature flag. Circuit breakers active.');
  };

  const handleCommandPaletteAction = (tab: NavigationTab, actionId?: string) => {
    if (actionId === 'cmd-tutorial') {
      setIsTutorialOpen(true);
      return;
    }
    if (actionId === 'cmd-chaos') {
      setIsChaosSimulatorOpen(true);
      return;
    }
    navigateTo(tab);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white pb-20 md:pb-0">
      {/* 1. Cinematic Loading Sequence */}
      {!hasLoaded && <LoadingSequence onComplete={() => setHasLoaded(true)} />}

      {/* 2. Global Texture Noise */}
      <div className="argus-noise" aria-hidden="true" />

      {/* 3. First Decision Flywheel Guided Checklist */}
      {showGuidedLoop && !isLandingMode && hasLoaded && (
        <GuidedProductLoop
          onNavigateTab={(t) => navigateTo(t)}
          onDismiss={() => {
            setShowGuidedLoop(false);
            localStorage.setItem('argus_guided_loop_dismissed', 'true');
          }}
        />
      )}

      {/* 4. Global Action Toast */}
      {toastMessage && (
        <div className="fixed top-18 sm:top-20 left-4 right-4 sm:left-auto sm:right-6 z-50 px-4 py-2.5 rounded-[3px] bg-[#0A0A0A] border border-[#0066FF]/40 text-xs font-mono-tech text-[#F5F5F0] shadow-2xl flex items-center justify-center sm:justify-start gap-2.5 animate-fade-in max-w-md mx-auto sm:mx-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse-dot flex-shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* 5. Institutional App Header */}
      <AppHeader
        activeTab={activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
        onOpenKeyboardShortcuts={() => setIsShortcutsOpen(true)}
        onOpenHelpCenter={() => setIsHelpCenterOpen(true)}
        isLandingMode={isLandingMode}
        onToggleMode={handleToggleMode}
        onToggleMobileDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        aiPmMode={aiPmMode}
        density={density}
        onCycleDensity={handleCycleDensity}
      />

      {/* 6. Main Workspace Layout */}
      {isLandingMode ? (
        <main className="flex-1 w-full relative z-10">
          <LandingPage onOpenApp={handleOpenApp} onOpenCaseStudy={() => setIsCaseStudyOpen(true)} />
        </main>
      ) : (
        <div className="flex-1 flex w-full relative z-10">
          {/* Grouped Modular Sidebar (Desktop) */}
          <AppSidebar
            activeTab={activeTab}
            onSelectTab={(tab) => navigateTo(tab)}
            unresolvedSignalsCount={2}
            unresolvedOpportunitiesCount={opportunities.filter((o) => o.status === 'inbox').length}
            enabledModules={enabledModules}
            aiPmMode={aiPmMode}
          />

          {/* Module Content Viewport */}
          <main className="flex-1 overflow-x-hidden min-w-0 bg-[#050505]">
            {/* WORK GROUP */}
            {(activeTab === 'home' || activeTab === 'overview') && (
              <PageTransition>
                <OverviewDashboard
                onNavigateTab={(t) => navigateTo(t)}
                onInvestigateSignal={handleInvestigateSignal}
                onOpenChaosSimulator={() => setIsChaosSimulatorOpen(true)}
              />
              </PageTransition>
            )}

            {activeTab === 'inbox' && (
              <UnifiedInbox
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {/* DISCOVER GROUP */}
            {(activeTab === 'customers' || activeTab === 'feedback') && (
              <CustomerFeedback
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'research' && (
              <ResearchLab
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'intelligence' && (
              <PageTransition>
                <IntelligencePage
                  onNavigateTab={(t) => navigateTo(t)}
                  onShowToast={showToast}
                />
              </PageTransition>
            )}

            {activeTab === 'signals' && (
              <SignalsModule
                onNavigateTab={(t) => navigateTo(t)}
                onInvestigateSignal={handleInvestigateSignal}
              />
            )}

            {activeTab === 'insights' && (
              <InsightsModule
                onNavigateTab={(t) => navigateTo(t)}
                onCreateOpportunityFromInsight={handleCreateOpportunityFromInsight}
              />
            )}

            {/* DECIDE GROUP */}
            {activeTab === 'opportunities' && (
              <OpportunityTree
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'prioritize' && (
              <PrioritizationModule
                initiatives={initiatives}
                onNavigateTab={(t) => navigateTo(t)}
                onSelectInitiativeForPrd={handleSelectInitiativeForPrd}
              />
            )}

            {activeTab === 'roadmap' && (
              <RoadmapModule
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {/* BUILD GROUP */}
            {activeTab === 'prds' && (
              <PrdWorkspace
                onNavigateTab={(t) => navigateTo(t)}
                onDeployExperiment={handleDeployExperiment}
              />
            )}

            {activeTab === 'prototypes' && (
              <PrototypeLab
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'ai_lab' && (
              <AiProductLab
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {/* MEASURE GROUP */}
            {activeTab === 'experiments' && (
              <ExperimentLab
                onNavigateTab={(t) => navigateTo(t)}
              />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsCopilot
                onNavigateTab={(t) => navigateTo(t)}
                onCreateOpportunity={() => navigateTo('opportunities')}
              />
            )}

            {activeTab === 'ai_copilot' && (
              <ContextualCopilot
                activeTab={activeTab}
                onNavigateTab={(t) => navigateTo(t)}
                onCreateOpportunity={() => navigateTo('opportunities')}
              />
            )}

            {activeTab === 'launch' && (
              <LaunchCenter
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {/* WORKSPACE GROUP */}
            {activeTab === 'decisions' && (
              <DecisionLog
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'documents' && (
              <DocumentHub
                onNavigateTab={(t) => navigateTo(t)}
                onShowToast={showToast}
              />
            )}

            {(activeTab === 'settings' || activeTab === 'data_sources') && (
              <SettingsPage
                onShowToast={showToast}
                aiPmMode={aiPmMode}
                onToggleAiPmMode={handleToggleAiPmMode}
                enabledModules={enabledModules}
                onToggleModule={handleToggleModule}
              />
            )}
          </main>
        </div>
      )}

      {/* 7. Touch-Optimized Mobile Navigation Bar & Drawer */}
      <MobileNavigation
        activeTab={activeTab}
        onSelectTab={(tab) => navigateTo(tab)}
        isDrawerOpen={isMobileDrawerOpen}
        onToggleDrawer={() => setIsMobileDrawerOpen(!isMobileDrawerOpen)}
        onOpenCaseStudy={() => {
          setIsMobileDrawerOpen(false);
          setIsCaseStudyOpen(true);
        }}
        unresolvedSignalsCount={2}
        unresolvedOpportunitiesCount={opportunities.filter((o) => o.status === 'inbox').length}
      />

      {/* 8. Global Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleCommandPaletteAction}
      />

      <KeyboardShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
      />

      <CaseStudyModal
        isOpen={isCaseStudyOpen}
        onClose={() => setIsCaseStudyOpen(false)}
      />

      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        onNavigateTab={(tab) => navigateTo(tab)}
      />

      <ChaosSimulatorModal
        isOpen={isChaosSimulatorOpen}
        onClose={() => setIsChaosSimulatorOpen(false)}
        onNavigateTab={(tab) => navigateTo(tab)}
        onShowToast={showToast}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={(pType, r, g) => {
          showToast(`Argus configured for ${r} in ${pType} (Goal: ${g}). Welcome.`);
        }}
      />

      <HelpCenterModal
        isOpen={isHelpCenterOpen}
        onClose={() => setIsHelpCenterOpen(false)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
      />
    </div>
  );
}
