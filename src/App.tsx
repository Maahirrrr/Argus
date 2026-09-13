import { useState } from 'react';
import type { NavigationTab, Opportunity, PrioritizationInitiative } from './types/finpilot';
import { DEMO_OPPORTUNITIES, DEMO_INITIATIVES } from './data/demoData';

import { AppHeader } from './components/layout/AppHeader';
import { Navigation } from './components/layout/Navigation';
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

  // ───── INTERACTIVE DEMO WORKFLOW HANDLERS (Section 35) ─────
  const handleInvestigateSignal = (_signalId?: string) => {
    setIsLandingMode(false);
    setActiveTab('insights');
    showToast('Signal investigated: 4.2M events analyzed across ClickHouse telemetry.');
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
    setOpportunities(prev => prev.filter(o => o.id !== oppId));
    showToast('Opportunity dismissed from inbox.');
  };

  const handleSelectInitiativeForPrd = (init: PrioritizationInitiative) => {
    setActiveTab('prds');
    showToast(`PRD generated for "${init.title}". AI Critic ready.`);
  };

  const handleDeployExperiment = () => {
    showToast('A/B experiment configured. Guardrail circuit breakers active.');
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
    <div className="min-h-screen bg-[#07080a] text-zinc-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-white">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 p-3 rounded-xl bg-blue-950 border border-blue-500/40 text-xs font-mono text-blue-200 shadow-2xl flex items-center gap-2 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
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

      {/* OS Navigation Tabs (shown when in app mode) */}
      {!isLandingMode && (
        <Navigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          unresolvedSignalsCount={5}
          unresolvedOpportunitiesCount={opportunities.filter(o => o.status === 'inbox').length}
        />
      )}

      {/* Main Screen Router */}
      <main className="flex-1 w-full relative z-10">
        {isLandingMode ? (
          <LandingPage
            onOpenApp={handleOpenApp}
            onOpenCaseStudy={() => setIsCaseStudyOpen(true)}
            onInvestigateSignal={handleInvestigateSignal}
          />
        ) : (
          <>
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
          </>
        )}
      </main>

      {/* Global Command Palette (⌘K) */}
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

      {/* Footer */}
      <footer className="mt-16 border-t border-white/[0.06] py-6 px-4 sm:px-6 bg-[#050608] text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-zinc-300">FinPilot OS</span>
            <span>· AI Operating System for Fintech Teams</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsCaseStudyOpen(true)}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              AI PM Case Study
            </button>
            <button
              onClick={() => {
                setIsLandingMode(!isLandingMode);
                setActiveTab(isLandingMode ? 'overview' : 'landing');
              }}
              className="text-zinc-400 hover:text-white cursor-pointer"
            >
              {isLandingMode ? 'Switch to App' : 'Switch to Landing'}
            </button>
            <span>Linear × Stripe × Bloomberg Design</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
