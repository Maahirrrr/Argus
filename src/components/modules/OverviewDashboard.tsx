import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';
import { DEMO_INITIATIVES } from '../../data/demoData';

interface OverviewDashboardProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onInvestigateSignal?: (signalId: string) => void;
  onOpenChaosSimulator?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateTab,
  onInvestigateSignal,
  onOpenChaosSimulator,
}) => {
  // 4 Live KPIs in horizontal strip
  const kpis = [
    {
      label: 'UPI SR',
      value: '94.2%',
      delta: '-4.1%',
      isNegative: true,
      updated: '14s ago',
    },
    {
      label: 'GMV at Risk',
      value: '₹4.2 Cr/hr',
      delta: '+₹1.8 Cr',
      isNegative: true,
      updated: '22s ago',
    },
    {
      label: 'Active Incidents',
      value: '2',
      delta: '+1 new',
      isWarning: true,
      updated: '1m ago',
    },
    {
      label: 'Experiments Running',
      value: '5',
      delta: 'Stable',
      isPositive: true,
      updated: '4m ago',
    },
  ];

  // Active incidents feed
  const activeIncidents = [
    {
      id: 'inc-01',
      name: 'HDFC Core Gateway Latency Spike (+1,400ms)',
      system: 'HDFC Acquiring Switch · ₹10k+ Mandates',
      severity: 'CRITICAL',
      since: '8m ago',
      impact: '₹14,200/sec at risk',
      signalId: 'sig-001',
    },
    {
      id: 'inc-02',
      name: 'Android 15 Biometric Authorization Timeout',
      system: 'Merchant Android App v4.19 · OS Policy',
      severity: 'DEGRADED',
      since: '24m ago',
      impact: '18,400 transactors affected',
      signalId: 'sig-003',
    },
    {
      id: 'inc-03',
      name: 'NPCI Central Switch Intermittent Choke (U30)',
      system: 'NPCI National Rail · Thread Exhaustion',
      severity: 'MONITORING',
      since: '1h ago',
      impact: 'Elevated retry rate (3.2x)',
      signalId: 'sig-002',
    },
  ];

  // Pending RICE decisions (top items)
  const pendingDecisions = DEMO_INITIATIVES.slice(0, 3);

  return (
    <div className="space-y-8 select-none">
      {/* 1. Status-First 4 Live KPIs: Single Horizontal Strip with 1px Vertical Dividers */}
      <section className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1A1A1A]">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="argus-section-label">{kpi.label}</span>
                <span className="argus-data-sm text-[11px] text-[#6B7280]">{kpi.updated}</span>
              </div>
              <div className="flex items-baseline justify-between mt-1">
                <span
                  className={`argus-data-lg ${
                    kpi.isNegative
                      ? 'text-[#FF3B30]'
                      : kpi.isWarning
                      ? 'text-[#F59E0B]'
                      : 'text-[#00FF88]'
                  }`}
                >
                  {kpi.value}
                </span>
                <div
                  className={`flex items-center gap-1 text-xs font-mono font-medium ${
                    kpi.isNegative
                      ? 'text-[#FF3B30]'
                      : kpi.isWarning
                      ? 'text-[#F59E0B]'
                      : 'text-[#00FF88]'
                  }`}
                >
                  {kpi.isNegative ? (
                    <ArrowDown className="w-3 h-3" />
                  ) : kpi.isWarning ? (
                    <Minus className="w-3 h-3" />
                  ) : (
                    <ArrowUp className="w-3 h-3" />
                  )}
                  <span>{kpi.delta}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Asymmetric 70/30 Layout: Left Active Incidents Feed, Right Pending Decisions */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 items-start">
        {/* Left 70%: Active Incidents Feed */}
        <section className="lg:col-span-7 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <span className="argus-status-dot bg-[#FF3B30] argus-status-dot-pulse-danger" />
              <h2 className="argus-module-title text-[15px]">Active Incidents</h2>
            </div>
            <span className="argus-data-sm text-[11px] text-[#6B7280]">Real-time Telemetry Feed</span>
          </div>

          <div className="divide-y divide-[#1A1A1A]">
            {activeIncidents.map((incident) => (
              <div
                key={incident.id}
                className="py-3.5 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        incident.severity === 'CRITICAL'
                          ? 'bg-[#FF3B30]'
                          : incident.severity === 'DEGRADED'
                          ? 'bg-[#F59E0B]'
                          : 'bg-[#6B7280]'
                      }`}
                    />
                    <span className="text-[14px] font-medium text-[#FFFFFF] group-hover:text-[#0066FF] transition-colors">
                      {incident.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#6B7280]">{incident.since}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#9CA3AF] pl-4">
                    <span>{incident.system}</span>
                    <span className="text-[#1A1A1A]">|</span>
                    <span className="text-[#FF3B30]">{incident.impact}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-4 sm:pl-0">
                  <button
                    onClick={() => {
                      if (incident.signalId && onInvestigateSignal) {
                        onInvestigateSignal(incident.signalId);
                      }
                      onNavigateTab('signals');
                    }}
                    className="argus-btn-secondary py-1.5 px-3 text-xs"
                  >
                    Investigate
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenChaosSimulator) {
                        onOpenChaosSimulator();
                      } else {
                        onNavigateTab('chaos');
                      }
                    }}
                    className="argus-btn-primary py-1.5 px-3 text-xs"
                  >
                    Failover
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right 30%: Pending Decisions */}
        <section className="lg:col-span-3 bg-[#0A0A0A] border border-[#1A1A1A] rounded-[6px] p-5">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1A1A1A]">
            <h2 className="argus-module-title text-[15px]">Pending Decisions</h2>
            <button
              onClick={() => onNavigateTab('prioritize')}
              className="text-xs font-sans text-[#0066FF] hover:underline cursor-pointer"
            >
              Workbench
            </button>
          </div>

          <div className="space-y-3">
            {pendingDecisions.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#111111] border border-[#1A1A1A] rounded-[4px] space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[13px] font-medium text-[#FFFFFF] leading-snug">
                    {item.title}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#00FF88] flex-shrink-0">
                    RICE {item.riceScore}
                  </span>
                </div>
                <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <button
                  onClick={() => onNavigateTab('prioritize')}
                  className="w-full argus-btn-secondary py-1.5 text-xs text-center justify-center cursor-pointer"
                >
                  Prioritize Initiative
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
