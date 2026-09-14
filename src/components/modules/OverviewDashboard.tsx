import React, { useState } from 'react';
import {
  Sparkles,
  Target,
  ChevronRight,
  Flame,
  GitFork,
  Cpu,
  TestTube2,
  Rocket,
  History,
  FlaskConical,
  SlidersHorizontal,
  Info,
  ExternalLink,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Maximize2,
  Minimize2,
  ArrowRight
} from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { ArgusDrawer } from '../ui/ArgusDrawer';
import { ArgusBadge } from '../ui/ArgusBadge';
import { ArgusButton } from '../ui/ArgusButton';
import { CardSpotlight } from '../ui/CardSpotlight';
import { FocusCards, FocusCardItem } from '../ui/FocusCards';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal: (signalId: string) => void;
  onOpenChaosSimulator: () => void;
}

type CockpitPreset = 'default' | 'ai_pm' | 'research' | 'founder';

interface DrawerContentData {
  title: string;
  subtitle: string;
  badge: string;
  targetTab: NavigationTab;
  what: string;
  state: string;
  whyThisMatters: string;
  evidence: string[];
  recommendation: string;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal: _onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  const [preset, setPreset] = useState<CockpitPreset>('default');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<DrawerContentData | null>(null);

  // Expandable card preview state (without navigating away)
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const toggleExpand = (e: React.MouseEvent, cardId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  const handleBoxInteraction = (
    e: React.MouseEvent,
    tab: NavigationTab,
    drawerData: DrawerContentData
  ) => {
    if (e.metaKey || e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      setActiveDrawer(drawerData);
    } else {
      onNavigateTab(tab);
    }
  };

  const handleOpenDrawerDirect = (e: React.MouseEvent, drawerData: DrawerContentData) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDrawer(drawerData);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none text-[#F5F5F0]">
      {/* ─── Top Header: Cockpit Status & Controls ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse-dot" />
            <span className="text-[10px] font-mono-tech text-[#8A8A8A] tracking-wider uppercase">
              OPERATING COCKPIT · <span className="text-[#F5F5F0]">PROD-CYCLE-09</span>
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#F5F5F0]">
            AI Product Manager Cockpit
          </h1>
          <p className="text-xs font-mono-tech text-[#8A8A8A]">
            Telemetry active across 14 modules. Tip: Click any box to open workspace, or <kbd className="px-1.5 py-0.5 rounded bg-[#141414] border border-[#262626] text-[10px] text-zinc-300">⌘+Click</kbd> for instant drawer inspection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Preset Selector */}
          <div className="inline-flex items-center bg-[#0E0E0E] border border-[#1D1D1D] rounded-[2px] p-0.5 text-xs font-mono-tech">
            {(['default', 'ai_pm', 'research', 'founder'] as CockpitPreset[]).map((p) => (
              <button
                key={p}
                onClick={() => setPreset(p)}
                className={`px-2.5 py-1 rounded-[2px] transition-colors uppercase text-[10px] font-bold cursor-pointer ${
                  preset === p
                    ? 'bg-[#1D1D1D] text-[#F5F5F0]'
                    : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
                }`}
              >
                {p === 'ai_pm' ? 'AI PM' : p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowCustomizer(!showCustomizer)}
            className={`p-1.5 border rounded-[2px] text-xs font-mono-tech transition-colors cursor-pointer ${
              showCustomizer
                ? 'bg-[#141414] border-[#0066FF] text-[#0066FF]'
                : 'bg-[#0E0E0E] border-[#1D1D1D] text-[#8A8A8A] hover:text-[#F5F5F0]'
            }`}
            title="Customize Cockpit Layout"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenChaosSimulator}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/25 text-[#EF4444] text-xs font-mono-tech rounded-[2px] transition-colors cursor-pointer"
          >
            <Flame className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simulate Outage</span>
          </button>
        </div>
      </div>

      {/* Optional Customizer Toolbar */}
      {showCustomizer && (
        <div className="p-3 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] flex flex-wrap items-center justify-between gap-3 text-xs font-mono-tech text-[#8A8A8A]">
          <div className="flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>Active Preset: <strong className="text-white uppercase">{preset}</strong></span>
          </div>
          <div className="text-[11px] text-[#525252]">
            Layout automatically adapts card priority and visibility for your current role.
          </div>
        </div>
      )}

      {/* ─── 1. LARGE CARD: ARGUS DAILY BRIEF ─── */}
      <CardSpotlight className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5F5F0]" />
            <span className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
              DAILY BRIEFING · IMMEDIATE ATTENTION
            </span>
          </div>
          <ArgusBadge variant="blue" size="sm">5 ACTION ITEMS</ArgusBadge>
        </div>

        <p className="text-xs font-mono-tech text-[#8A8A8A] leading-relaxed">
          Here is what requires your judgment before today's standup. Click any item to jump directly to its resolution:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-1">
          {[
            {
              tab: 'signals' as NavigationTab,
              label: '3 Signals Worth Reviewing',
              desc: 'Checkout timeout spike in APAC (+14%)',
              color: 'text-[#EF4444]',
              border: 'border-[#EF4444]/30',
            },
            {
              tab: 'roadmap' as NavigationTab,
              label: '2 Roadmap Blockers',
              desc: 'Vector Search dependency unaligned',
              color: 'text-[#F59E0B]',
              border: 'border-[#F59E0B]/30',
            },
            {
              tab: 'experiments' as NavigationTab,
              label: '1 Experiment Ready',
              desc: 'Exp #104 reached 99.2% stat sig',
              color: 'text-[#10B981]',
              border: 'border-[#10B981]/30',
            },
            {
              tab: 'intelligence' as NavigationTab,
              label: '1 Competitor Move',
              desc: 'Superhuman launched Smart Triage v2',
              color: 'text-[#0066FF]',
              border: 'border-[#0066FF]/30',
            },
            {
              tab: 'decisions' as NavigationTab,
              label: '4 Decisions Waiting',
              desc: 'ADR-041 schema migration sign-off',
              color: 'text-[#8B5CF6]',
              border: 'border-[#8B5CF6]/30',
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onNavigateTab(item.tab)}
              className={`text-left p-2.5 rounded-[2px] bg-[#0E0E0E] hover:bg-[#141414] border ${item.border} transition-colors group cursor-pointer space-y-1`}
            >
              <div className={`text-xs font-mono-tech font-bold flex items-center justify-between ${item.color}`}>
                <span className="truncate">{item.label}</span>
                <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[11px] font-mono-tech text-[#8A8A8A] leading-tight truncate">
                {item.desc}
              </div>
            </button>
          ))}
        </div>
      </CardSpotlight>

      {/* ─── 2. LARGE CARD: PRODUCT HEALTH HUD ─── */}
      <CardSpotlight className="p-4 sm:p-5 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#10B981]" />
            <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
              PRODUCT HEALTH HUD · NORTH STAR METRICS
            </h2>
          </div>
          <span className="text-[10px] font-mono-tech text-[#525252]">ROLLING 30-DAY COHORT</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0E0E0E] border border-[#1D1D1D] p-3.5 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8A8A8A]">
              <span>ACTIVATION RATE</span>
              <span className="text-[#10B981] font-bold">+2.4% MoM</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">43.8%</span>
              <span className="text-[11px] font-mono-tech text-[#525252]">/ 40.0% goal</span>
            </div>
            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#10B981] h-full rounded-full" style={{ width: '87.6%' }} />
            </div>
            <div className="text-[10px] font-mono-tech text-[#8A8A8A] flex justify-between">
              <span>Time to first PRD created</span>
              <span className="text-zinc-400">14.2 min</span>
            </div>
          </div>

          <div className="bg-[#0E0E0E] border border-[#1D1D1D] p-3.5 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8A8A8A]">
              <span>WEEK 4 RETENTION</span>
              <span className="text-[#10B981] font-bold">+5.1% MoM</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">61.2%</span>
              <span className="text-[11px] font-mono-tech text-[#525252]">/ 55.0% goal</span>
            </div>
            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#0066FF] h-full rounded-full" style={{ width: '92%' }} />
            </div>
            <div className="text-[10px] font-mono-tech text-[#8A8A8A] flex justify-between">
              <span>Core power users</span>
              <span className="text-zinc-400">3,420 PMs</span>
            </div>
          </div>

          <div className="bg-[#0E0E0E] border border-[#1D1D1D] p-3.5 rounded-[2px] space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8A8A8A]">
              <span>FEATURE ENGAGEMENT</span>
              <span className="text-[#0066FF] font-bold">Stable</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono-tech text-[#F5F5F0]">72.4%</span>
              <span className="text-[11px] font-mono-tech text-[#525252]">DAU/MAU</span>
            </div>
            <div className="w-full bg-[#1A1A1A] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#8B5CF6] h-full rounded-full" style={{ width: '72.4%' }} />
            </div>
            <div className="text-[10px] font-mono-tech text-[#8A8A8A] flex justify-between">
              <span>Avg session length</span>
              <span className="text-zinc-400">28 min/day</span>
            </div>
          </div>
        </div>
      </CardSpotlight>

      {/* ─── 3. STRATEGIC ROADMAP Q4 (EXPANDABLE LARGE CARD) ─── */}
      <CardSpotlight
        onClick={(e) =>
          handleBoxInteraction(e, 'roadmap', {
            title: 'Strategic Roadmap Q4 2026',
            subtitle: 'Initiative status, milestones, and blockers',
            badge: 'ROADMAP',
            targetTab: 'roadmap',
            what: 'Roadmap execution tracking across 3 cross-functional product pillars.',
            state: '78% completed for current milestone. 2 critical blockers awaiting architecture sign-off.',
            whyThisMatters:
              'Delivering the autonomous PRD compiler on time directly unblocks enterprise adoption targets for Q4.',
            evidence: [
              'Sprint 24 velocity: 48 story points shipped (+12% above estimate)',
              'Dependency on Vector Search pipeline requires ADR-041 approval',
              'Beta customer interest: 18 design partners waiting for canary release',
            ],
            recommendation:
              'Review and merge ADR-041 to release the engineering blocker before Friday cutoff.',
          })
        }
        className="p-4 sm:p-5 space-y-3 cursor-pointer group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#F5F5F0]" />
            <h2 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
              STRATEGIC ROADMAP · Q4 EXECUTION
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => toggleExpand(e, 'roadmap')}
              className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#141414] border border-[#222]"
            >
              {expandedCard === 'roadmap' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              <span>{expandedCard === 'roadmap' ? 'Collapse' : 'Expand'}</span>
            </button>
            <button
              onClick={(e) =>
                handleOpenDrawerDirect(e, {
                  title: 'Strategic Roadmap Q4 2026',
                  subtitle: 'Initiative status, milestones, and blockers',
                  badge: 'ROADMAP',
                  targetTab: 'roadmap',
                  what: 'Roadmap execution tracking across 3 cross-functional product pillars.',
                  state: '78% completed for current milestone. 2 critical blockers awaiting architecture sign-off.',
                  whyThisMatters:
                    'Delivering the autonomous PRD compiler on time directly unblocks enterprise adoption targets for Q4.',
                  evidence: [
                    'Sprint 24 velocity: 48 story points shipped (+12% above estimate)',
                    'Dependency on Vector Search pipeline requires ADR-041 approval',
                    'Beta customer interest: 18 design partners waiting for canary release',
                  ],
                  recommendation:
                    'Review and merge ADR-041 to release the engineering blocker before Friday cutoff.',
                })
              }
              className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1"
            >
              <Info className="w-3 h-3" />
              <span>Why</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-3 bg-[#0E0E0E] rounded-[2px] border border-[#1D1D1D] space-y-1">
            <div className="flex justify-between text-[11px] font-mono-tech">
              <span className="text-[#8A8A8A]">Pillar 1: Discovery</span>
              <span className="text-[#10B981]">92% Done</span>
            </div>
            <div className="text-xs font-bold text-[#F5F5F0]">Realtime POS Parser</div>
            <div className="w-full bg-[#1A1A1A] h-1 rounded-full overflow-hidden mt-2">
              <div className="bg-[#10B981] h-full" style={{ width: '92%' }} />
            </div>
          </div>

          <div className="p-3 bg-[#0E0E0E] rounded-[2px] border border-[#1D1D1D] space-y-1">
            <div className="flex justify-between text-[11px] font-mono-tech">
              <span className="text-[#8A8A8A]">Pillar 2: AI Core</span>
              <span className="text-[#0066FF]">74% In Progress</span>
            </div>
            <div className="text-xs font-bold text-[#F5F5F0]">PRD & BDD Autonomous Studio</div>
            <div className="w-full bg-[#1A1A1A] h-1 rounded-full overflow-hidden mt-2">
              <div className="bg-[#0066FF] h-full" style={{ width: '74%' }} />
            </div>
          </div>

          <div className="p-3 bg-[#0E0E0E] rounded-[2px] border border-[#1D1D1D] space-y-1">
            <div className="flex justify-between text-[11px] font-mono-tech">
              <span className="text-[#8A8A8A]">Pillar 3: Infrastructure</span>
              <span className="text-[#F59E0B]">Blocked (ADR-041)</span>
            </div>
            <div className="text-xs font-bold text-[#F5F5F0]">ClickHouse Telemetry Sync</div>
            <div className="w-full bg-[#1A1A1A] h-1 rounded-full overflow-hidden mt-2">
              <div className="bg-[#F59E0B] h-full" style={{ width: '45%' }} />
            </div>
          </div>
        </div>

        {/* Expandable inline view */}
        {expandedCard === 'roadmap' && (
          <div className="pt-3 border-t border-[#1D1D1D] space-y-2 bg-[#0C0C0C] p-3 rounded-[2px] text-xs font-mono-tech animate-fade-in">
            <div className="flex items-center justify-between text-[#10B981]">
              <span>CURRENT SPRINT VELOCITY: 48 SP (Target: 42 SP)</span>
              <span>ESTIMATED SHIP: OCT 28</span>
            </div>
            <p className="text-[#8A8A8A] leading-relaxed">
              Active engineering blocker identified: ADR-041 schema migration required before Vector Search integration can proceed.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigateTab('roadmap')}
                className="px-3 py-1 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech rounded-[2px] cursor-pointer flex items-center gap-1.5"
              >
                <span>Open Roadmap Module</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </CardSpotlight>

      {/* ─── 4. FOCUS CARDS GROUP: MEDIUM CARDS (OPPORTUNITIES, AI LAB, SIGNALS, RESEARCH) ─── */}
      <FocusCards className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Opportunities with Expandable Preview */}
        <FocusCardItem index={0}>
          <CardSpotlight
            onClick={(e) =>
              handleBoxInteraction(e, 'opportunities', {
                title: 'Opportunity Tree Execution',
                subtitle: 'Validated problems with expected business yield',
                badge: 'OPPORTUNITIES',
                targetTab: 'opportunities',
                what: 'Structured opportunity solution tree mapping customer churn to validated bets.',
                state: '82% of current quarterly opportunity value allocated to active initiatives.',
                whyThisMatters:
                  'Focusing exclusively on high-leverage opportunities prevents engineering drift and feature creep.',
                evidence: [
                  'Top bet: Zero-friction checkout fallback has estimated +$320k ARR impact',
                  'Validation score: 9.4/10 based on 42 customer interview transcripts',
                  'Engineering complexity: Low (estimated 1.5 sprints)',
                ],
                recommendation:
                  'Promote Zero-friction checkout from Tree into sprint backlog.',
              })
            }
            className="p-4 sm:p-5 space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <GitFork className="w-4 h-4 text-[#0066FF]" />
                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
                  OPPORTUNITIES · PIPELINE HEALTH
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleExpand(e, 'opportunities')}
                  className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#141414] border border-[#222]"
                >
                  {expandedCard === 'opportunities' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{expandedCard === 'opportunities' ? 'Collapse' : 'Expand'}</span>
                </button>
                <button
                  onClick={(e) =>
                    handleOpenDrawerDirect(e, {
                      title: 'Opportunity Tree Execution',
                      subtitle: 'Validated problems with expected business yield',
                      badge: 'OPPORTUNITIES',
                      targetTab: 'opportunities',
                      what: 'Structured opportunity solution tree mapping customer churn to validated bets.',
                      state: '82% of current quarterly opportunity value allocated to active initiatives.',
                      whyThisMatters:
                        'Focusing exclusively on high-leverage opportunities prevents engineering drift and feature creep.',
                      evidence: [
                        'Top bet: Zero-friction checkout fallback has estimated +$320k ARR impact',
                        'Validation score: 9.4/10 based on 42 customer interview transcripts',
                        'Engineering complexity: Low (estimated 1.5 sprints)',
                      ],
                      recommendation:
                        'Promote Zero-friction checkout from Tree into sprint backlog.',
                    })
                  }
                  className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Why</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="flex items-baseline justify-between text-xs font-mono-tech">
              <span className="text-[#8A8A8A]">Active Opportunity Allocation</span>
              <span className="text-sm font-bold text-[#F5F5F0]">82% Allocated</span>
            </div>

            {/* Explicit 82% Progress Bar */}
            <div className="w-full bg-[#1A1A1A] h-2 rounded-full overflow-hidden">
              <div className="bg-[#0066FF] h-full rounded-full" style={{ width: '82%' }} />
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8A8A8A] pt-1">
              <span>Top Bet: POS Fallback</span>
              <span className="text-[#10B981] font-bold">+$320k ARR Est.</span>
            </div>

            {/* Expandable inline view */}
            {expandedCard === 'opportunities' && (
              <div className="pt-3 border-t border-[#1D1D1D] space-y-2 bg-[#0C0C0C] p-3 rounded-[2px] text-xs font-mono-tech animate-fade-in">
                <div className="text-[10px] font-mono-tech text-[#0066FF] font-bold uppercase">
                  TOP OPPORTUNITY BET: ZERO-FRICTION CHECKOUT
                </div>
                <ul className="space-y-1 text-xs text-[#8A8A8A]">
                  <li>• Evidence: 42 interview transcripts + 3 gateway telemetry spikes</li>
                  <li>• Impact: High (+$320k ARR) | Confidence: 94%</li>
                  <li>• Recommended Action: Promote from Tree to Sprint Backlog</li>
                </ul>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('opportunities')}
                    className="px-3 py-1 bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-mono-tech rounded-[2px] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Open Opportunities →</span>
                  </button>
                </div>
              </div>
            )}
          </CardSpotlight>
        </FocusCardItem>

        {/* Card 2: AI Product Lab with Expandable Preview */}
        <FocusCardItem index={1}>
          <CardSpotlight
            onClick={(e) =>
              handleBoxInteraction(e, 'ai_lab', {
                title: 'AI Product Lab & Model Telemetry',
                subtitle: 'LLM benchmark evaluations, latency, and drift monitoring',
                badge: 'AI LAB',
                targetTab: 'ai_lab',
                what: 'Automated evaluation harness verifying prompt accuracy and hallucination rates.',
                state: '98.8% eval pass rate across 1,240 automated test assertions.',
                whyThisMatters:
                  'Maintains rigorous model trust and prevents regressions before prompts are deployed to production.',
                evidence: [
                  'Latency p95: 340ms (comfortably within 500ms budget)',
                  'Drift score: 0.012 (statistically negligible)',
                  'Cost per execution: $0.0014 (-40% after prompt distillation)',
                ],
                recommendation:
                  'Promote distilled system prompt v4 to canary rollout.',
              })
            }
            className="p-4 sm:p-5 space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#10B981]" />
                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
                  AI PRODUCT LAB · EVAL BENCHMARK
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleExpand(e, 'ai_lab')}
                  className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#141414] border border-[#222]"
                >
                  {expandedCard === 'ai_lab' ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                  <span>{expandedCard === 'ai_lab' ? 'Collapse' : 'Expand'}</span>
                </button>
                <button
                  onClick={(e) =>
                    handleOpenDrawerDirect(e, {
                      title: 'AI Product Lab & Model Telemetry',
                      subtitle: 'LLM benchmark evaluations, latency, and drift monitoring',
                      badge: 'AI LAB',
                      targetTab: 'ai_lab',
                      what: 'Automated evaluation harness verifying prompt accuracy and hallucination rates.',
                      state: '98.8% eval pass rate across 1,240 automated test assertions.',
                      whyThisMatters:
                        'Maintains rigorous model trust and prevents regressions before prompts are deployed to production.',
                      evidence: [
                        'Latency p95: 340ms (comfortably within 500ms budget)',
                        'Drift score: 0.012 (statistically negligible)',
                        'Cost per execution: $0.0014 (-40% after prompt distillation)',
                      ],
                      recommendation:
                        'Promote distilled system prompt v4 to canary rollout.',
                    })
                  }
                  className="text-[10px] font-mono-tech text-[#8A8A8A] hover:text-white flex items-center gap-1"
                >
                  <Info className="w-3 h-3" />
                  <span>Why</span>
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="bg-[#0E0E0E] p-2.5 rounded-[2px] border border-[#1D1D1D]">
                <div className="text-base font-bold font-mono-tech text-[#10B981]">98.8%</div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] mt-0.5">Eval Pass</div>
              </div>
              <div className="bg-[#0E0E0E] p-2.5 rounded-[2px] border border-[#1D1D1D]">
                <div className="text-base font-bold font-mono-tech text-[#F5F5F0]">340ms</div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] mt-0.5">p95 Latency</div>
              </div>
              <div className="bg-[#0E0E0E] p-2.5 rounded-[2px] border border-[#1D1D1D]">
                <div className="text-base font-bold font-mono-tech text-[#0066FF]">0.012</div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] mt-0.5">Drift Score</div>
              </div>
            </div>

            <div className="text-[11px] font-mono-tech text-[#8A8A8A] flex justify-between">
              <span>Model in Prod: Sonnet-3.5-Turbo</span>
              <span className="text-[#10B981]">Zero Hallucination Flag</span>
            </div>

            {/* Expandable inline view */}
            {expandedCard === 'ai_lab' && (
              <div className="pt-3 border-t border-[#1D1D1D] space-y-2 bg-[#0C0C0C] p-3 rounded-[2px] text-xs font-mono-tech animate-fade-in">
                <div className="text-[10px] font-mono-tech text-[#10B981] font-bold uppercase">
                  ACTIVE BENCHMARK SUITE (1,240 ASSERTIONS)
                </div>
                <p className="text-[#8A8A8A] leading-relaxed">
                  System prompt v4 distilled from 2,800 tokens to 840 tokens with zero accuracy degradation.
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => onNavigateTab('ai_lab')}
                    className="px-3 py-1 bg-[#10B981] hover:bg-[#059669] text-white text-xs font-mono-tech rounded-[2px] cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Open AI Lab →</span>
                  </button>
                </div>
              </div>
            )}
          </CardSpotlight>
        </FocusCardItem>

        {/* Card 3: Telemetry Signals */}
        <FocusCardItem index={2}>
          <CardSpotlight
            onClick={(e) =>
              handleBoxInteraction(e, 'signals', {
                title: 'Production Telemetry Signals',
                subtitle: 'Causal anomaly detection and event streaming',
                badge: 'SIGNALS',
                targetTab: 'signals',
                what: 'Automated telemetry ingestion highlighting deviations from steady-state user behavior.',
                state: '2 active anomalies flagged in APAC payment checkout pipeline.',
                whyThisMatters:
                  'Early detection allows PMs to triage issues before they degrade App Store ratings or user trust.',
                evidence: [
                  'Timeout rates increased from 0.4% to 2.8% at 04:15 UTC',
                  'Impacted gateway: Razorpay UPI fallback route',
                  'Affected users: ~480 active checkouts in India region',
                ],
                recommendation:
                  'Inspect Telemetry Signals to review trace logs or trigger circuit breaker.',
              })
            }
            className="p-4 sm:p-5 space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EF4444]" />
                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
                  TELEMETRY SIGNALS · LIVE FEED
                </h3>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
            </div>

            <div className="space-y-2">
              <div className="p-2.5 bg-[#0E0E0E] rounded-[2px] border border-[#EF4444]/25 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#EF4444] font-bold">APAC Checkout Drop</span>
                <span className="text-[#8A8A8A]">45m ago</span>
              </div>
              <div className="p-2.5 bg-[#0E0E0E] rounded-[2px] border border-[#1D1D1D] flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#10B981]">Onboarding Flow Normal</span>
                <span className="text-[#525252]">Steady</span>
              </div>
            </div>
          </CardSpotlight>
        </FocusCardItem>

        {/* Card 4: Research & Radar */}
        <FocusCardItem index={3}>
          <CardSpotlight
            onClick={(e) =>
              handleBoxInteraction(e, 'research', {
                title: 'Customer Research & Competitive Radar',
                subtitle: 'Synthesized qualitative feedback and market monitoring',
                badge: 'DISCOVER',
                targetTab: 'research',
                what: 'Qualitative customer research synthesis paired with automated competitor changelog analysis.',
                state: '18 customer interviews synthesized. Superhuman changelog updated.',
                whyThisMatters:
                  'Ensures product decisions reflect actual user pain points while anticipating competitor strategic moves.',
                evidence: [
                  'Cluster #1 theme: 74% of enterprise PMs request automated BDD scenario generation',
                  'Competitor alert: Superhuman added AI automated triage',
                  'NPS qualitative sentiment: 68 (+4 pts this month)',
                ],
                recommendation:
                  'Synthesize BDD scenario user requests directly into PRD Studio backlog.',
              })
            }
            className="p-4 sm:p-5 space-y-3 cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-[#8B5CF6]" />
                <h3 className="text-xs font-mono-tech font-bold uppercase tracking-wider text-[#F5F5F0]">
                  RESEARCH & RADAR · SYNTHESIS
                </h3>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#525252] group-hover:text-white transition-colors" />
            </div>

            <div className="space-y-1.5 text-xs font-mono-tech">
              <div className="flex justify-between text-[#8A8A8A]">
                <span>Customer Pain Point:</span>
                <span className="text-[#F5F5F0]">Manual BDD Writing</span>
              </div>
              <div className="flex justify-between text-[#8A8A8A]">
                <span>Competitor Signal:</span>
                <span className="text-[#0066FF]">Superhuman v2 Triage</span>
              </div>
              <div className="flex justify-between text-[#8A8A8A]">
                <span>Qualitative Sentiment:</span>
                <span className="text-[#10B981] font-bold">NPS 68 (Strong)</span>
              </div>
            </div>
          </CardSpotlight>
        </FocusCardItem>
      </FocusCards>

      {/* ─── 5. COMPACT CARDS (EXPERIMENTS, LAUNCH, DECISIONS) ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <CardSpotlight
          onClick={(e) =>
            handleBoxInteraction(e, 'experiments', {
              title: 'A/B Experimentation Engine',
              subtitle: 'Bayesian sequential analysis and guardrail protection',
              badge: 'EXPERIMENTS',
              targetTab: 'experiments',
              what: 'Live statistical hypothesis testing on new product flows.',
              state: 'Exp #104 reaching 99.2% statistical significance (+4.8% conversion lift).',
              whyThisMatters:
                'Prevents subjective opinion from dictating product launches; relies on cold hard causal evidence.',
              evidence: [
                'Sample size: 48,200 unique sessions evaluated',
                'Bayesian probability to beat control: 99.2%',
                'Guardrail metrics (crash rate, latency): Zero degradation',
              ],
              recommendation: 'Graduate Exp #104 from 50% to 100% full rollout.',
            })
          }
          className="p-3.5 space-y-2 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-mono-tech">
            <div className="flex items-center gap-1.5 text-[#10B981]">
              <TestTube2 className="w-3.5 h-3.5" />
              <span className="font-bold">EXPERIMENTS</span>
            </div>
            <span className="text-[10px] text-[#10B981]">99.2% SIG</span>
          </div>
          <div className="text-xs font-bold text-[#F5F5F0] truncate">Exp #104: Instant POS</div>
          <p className="text-[11px] font-mono-tech text-[#8A8A8A] leading-tight">
            +4.8% conversion lift detected over control. Ready to ship.
          </p>
        </CardSpotlight>

        <CardSpotlight
          onClick={(e) =>
            handleBoxInteraction(e, 'launch', {
              title: 'Release Center & Canary Deployments',
              subtitle: 'Feature flag progression and rollback circuit breakers',
              badge: 'LAUNCH',
              targetTab: 'launch',
              what: 'Progressive canary deployment controller with automated health checks.',
              state: 'Canary v2.4 running at 15% traffic with zero rollbacks.',
              whyThisMatters:
                'Enables safe continuous shipping without risking widespread customer disruption.',
              evidence: [
                'Error rate in canary cohort: 0.02% (below 0.1% SLA threshold)',
                'Health score: 99.8/100',
                'Next progression: Automatically expand to 50% at 14:00 UTC',
              ],
              recommendation:
                'Monitor canary telemetry for another 60 minutes, then proceed to 50% stage.',
            })
          }
          className="p-3.5 space-y-2 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-mono-tech">
            <div className="flex items-center gap-1.5 text-[#0066FF]">
              <Rocket className="w-3.5 h-3.5" />
              <span className="font-bold">RELEASE CENTER</span>
            </div>
            <span className="text-[10px] text-[#0066FF]">15% CANARY</span>
          </div>
          <div className="text-xs font-bold text-[#F5F5F0] truncate">Argus OS v2.4 Rollout</div>
          <p className="text-[11px] font-mono-tech text-[#8A8A8A] leading-tight">
            15% user cohort active. 0 rollbacks. Healthy error budget.
          </p>
        </CardSpotlight>

        <CardSpotlight
          onClick={(e) =>
            handleBoxInteraction(e, 'decisions', {
              title: 'Architectural & Product Decision Log (ADR)',
              subtitle: 'Immutable record of product trade-offs and rationale',
              badge: 'DECISIONS',
              targetTab: 'decisions',
              what: 'Structured record of high-stakes architectural and product decisions.',
              state: '4 ADRs waiting for stakeholder sign-off (ADR-041 is highest urgency).',
              whyThisMatters:
                'Eliminates circular debates and prevents teams from re-litigating settled trade-offs 6 months later.',
              evidence: [
                'ADR-041: Schema migration for ClickHouse columnar telemetry',
                'Stakeholders: Lead Architect (Signed), Security Lead (Signed), Lead PM (Pending)',
                'Deadline: Today before sprint close',
              ],
              recommendation:
                'Sign off ADR-041 to unblock infrastructure engineering sprint.',
            })
          }
          className="p-3.5 space-y-2 cursor-pointer group"
        >
          <div className="flex items-center justify-between text-[11px] font-mono-tech">
            <div className="flex items-center gap-1.5 text-[#8B5CF6]">
              <History className="w-3.5 h-3.5" />
              <span className="font-bold">DECISION LOG</span>
            </div>
            <span className="text-[10px] text-[#F59E0B]">4 PENDING</span>
          </div>
          <div className="text-xs font-bold text-[#F5F5F0] truncate">ADR-041 Schema Migration</div>
          <p className="text-[11px] font-mono-tech text-[#8A8A8A] leading-tight">
            Awaiting Lead PM sign-off to release engineering blocker.
          </p>
        </CardSpotlight>
      </div>

      {/* ─── 6. Slide-Out Inspection Drawer ─── */}
      {activeDrawer && (
        <ArgusDrawer
          isOpen={Boolean(activeDrawer)}
          onClose={() => setActiveDrawer(null)}
          title={activeDrawer.title}
          subtitle={activeDrawer.subtitle}
          badge={activeDrawer.badge}
          width="lg"
        >
          <div className="space-y-5 select-text">
            <div className="space-y-1.5 bg-[#0E0E0E] p-3.5 rounded-[2px] border border-[#1D1D1D]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase font-bold">
                WHAT IS HAPPENING
              </div>
              <p className="text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                {activeDrawer.what}
              </p>
              <div className="text-xs font-mono-tech text-[#0066FF] pt-1">
                Current Status: <strong>{activeDrawer.state}</strong>
              </div>
            </div>

            <div className="space-y-1.5 bg-[#0E0E0E] p-3.5 rounded-[2px] border border-[#0066FF]/30">
              <div className="text-[10px] font-mono-tech text-[#0066FF] uppercase font-bold flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>WHY THIS MATTERS</span>
              </div>
              <p className="text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                {activeDrawer.whyThisMatters}
              </p>
            </div>

            <div className="space-y-2 bg-[#0E0E0E] p-3.5 rounded-[2px] border border-[#1D1D1D]">
              <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase font-bold">
                EVIDENCE & DATA POINTS
              </div>
              <ul className="space-y-1.5 text-xs font-mono-tech text-[#8A8A8A]">
                {activeDrawer.evidence.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 bg-[#121212] p-3.5 rounded-[2px] border border-[#2E2E2E]">
              <div className="text-[10px] font-mono-tech text-[#10B981] uppercase font-bold">
                RECOMMENDED ACTION
              </div>
              <p className="text-xs font-mono-tech text-[#F5F5F0] leading-relaxed">
                {activeDrawer.recommendation}
              </p>

              <div className="pt-2 flex items-center gap-2">
                <ArgusButton
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const tab = activeDrawer.targetTab;
                    setActiveDrawer(null);
                    onNavigateTab(tab);
                  }}
                  rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Open Full Workspace
                </ArgusButton>
                <ArgusButton
                  variant="secondary"
                  size="sm"
                  onClick={() => setActiveDrawer(null)}
                >
                  Dismiss
                </ArgusButton>
              </div>
            </div>
          </div>
        </ArgusDrawer>
      )}
    </div>
  );
};
