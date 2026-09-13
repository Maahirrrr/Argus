import { useState } from 'react';
import type { NavigationTab, Opportunity, PrioritizationInitiative } from './types/finpilot';
import { DEMO_OPPORTUNITIES, DEMO_INITIATIVES } from './data/demoData';

import { LoadingSequence } from './components/landing/LoadingSequence';
import { AppHeader } from './components/layout/AppHeader';
import { AppSidebar } from './components/layout/AppSidebar';
import { CommandPalette } from './components/layout/CommandPalette';
import { CaseStudyModal } from './components/layout/CaseStudyModal';

import { LandingPage } from './components/landing/LandingPage';
import { OverviewDashboard } from './components/modules/OverviewDashboard';
import { InsightsModule } from './components/modules/InsightsModule';
import { OpportunitiesInbox } from './components/modules/OpportunitiesInbox';
import { PrioritizationModule } from './components/modules/PrioritizationModule';
import { PrdWorkspace } from './components/modules/PrdWorkspace';
import { ExperimentLab } from './components/modules/ExperimentLab';
import { AnalyticsCopilot } from './components/modules/AnalyticsCopilot';
import { WeeklyReviewPage } from './components/modules/WeeklyReviewPage';
import { DataSourcesPage } from './components/modules/DataSourcesPage';
import { SettingsPage } from './components/modules/SettingsPage';

export function App() {
  const [hasLoaded, setHasLoaded] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [isLandingMode, setIsLandingMode] = useState<boolean>(true);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState<boolean>(false);

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

  // ───── INTERACTIVE DEMO WORKFLOW HANDLERS (Section 59) ─────
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
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#0066FF] selection:text-white">
      {/* 05 Short Loading Sequence (1.2s max on first visit) */}
      {!hasLoaded && <LoadingSequence onComplete={() => setHasLoaded(true)} />}

      {/* Subtle Noise Texture */}
      <div className="tapwise-noise" aria-hidden="true" />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-[3px] bg-[#0A0A0A] border border-[#0066FF]/40 text-xs font-mono-tech text-[#F5F5F0] shadow-2xl flex items-center gap-2.5 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse-dot" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 06 Minimalist Sticky Header */}
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
        isLandingMode={isLandingMode}
        onToggleMode={handleToggleMode}
      />

      {/* Main Experience: Landing Page OR Operating System with Left Sidebar */}
      {isLandingMode ? (
        <main className="flex-1 w-full relative z-10">
          <LandingPage
            onOpenApp={handleOpenApp}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
            onInvestigateSignal={handleInvestigateSignal}
          />
        </main>
      ) : (
        /* 19 Application OS Layout: Left Sidebar + Large Content Canvas */
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

            {activeTab === 'analytics' && (
              <AnalyticsCopilot
                onNavigateTab={setActiveTab}
                onCreateOpportunity={() => handleCreateOpportunityFromInsight('ins-001')}
              />
            )}

            {activeTab === 'weekly_review' && (
              <WeeklyReviewPage
                onNavigateTab={setActiveTab}
              />
            )}

            {activeTab === 'data_sources' && (
              <DataSourcesPage />
            )}

            {activeTab === 'settings' && (
              <SettingsPage />
            )}
          </main>
        </div>
      )}

      {/* 33 Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectAction={handleSelectCommandAction}
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
