import React, { useState } from 'react';
import {
  ShieldAlert,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';
import type { CompetitorItem, NavigationTab } from '../../types/argus';
import { DEMO_COMPETITORS } from '../../data/demoData';

interface CompetitiveIntelProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const CompetitiveIntel: React.FC<CompetitiveIntelProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [competitors] = useState<CompetitorItem[]>(DEMO_COMPETITORS);
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorItem>(competitors[0]);
  const [activeTab, setActiveTab] = useState<'PROFILES' | 'MATRIX' | 'RADAR'>('PROFILES');

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Competitive Intelligence Radar</h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Feature comparisons, market positioning, weekly release telemetry & strategic opportunity gaps
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#101010] p-0.5 rounded-[2px] border border-[#1D1D1D]">
            <button
              onClick={() => setActiveTab('PROFILES')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech cursor-pointer transition-colors ${
                activeTab === 'PROFILES'
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Competitor Profiles
            </button>
            <button
              onClick={() => setActiveTab('MATRIX')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech cursor-pointer transition-colors ${
                activeTab === 'MATRIX'
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Feature Matrix
            </button>
            <button
              onClick={() => setActiveTab('RADAR')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech cursor-pointer transition-colors ${
                activeTab === 'RADAR'
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Weekly Market Delta
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'PROFILES' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Competitor List */}
          <div className="lg:col-span-4 space-y-2.5">
            <span className="text-[10px] font-mono-tech uppercase text-[#525252] block px-1">Tracked Competitors</span>
            {competitors.map((comp) => {
              const isSelected = selectedCompetitor.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => setSelectedCompetitor(comp)}
                  className={`p-4 rounded-[2px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#0066FF]'
                      : 'bg-[#0A0A0A] border-[#1D1D1D] hover:border-[#2E2E2E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-sm font-bold text-white">{comp.name}</h3>
                    <span className="text-[10px] font-mono-tech text-[#0066FF] bg-[#0066FF]/10 px-1.5 py-0.5 rounded-[2px]">
                      {comp.marketShare}
                    </span>
                  </div>
                  <p className="text-xs text-[#8A8A8A] line-clamp-2 leading-relaxed mb-2">{comp.positioning}</p>
                  <div className="text-[11px] font-mono-tech text-[#525252]">
                    Pricing: <span className="text-[#CCCCCC]">{comp.pricing}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Competitor Detail Inspector */}
          <div className="lg:col-span-8 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
            <div className="pb-3 border-b border-[#1D1D1D] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-tech text-[#0066FF] uppercase font-bold block mb-1">
                  Competitor Profile
                </span>
                <h2 className="text-xl font-bold font-display text-white">{selectedCompetitor.name}</h2>
                <p className="text-xs text-[#8A8A8A] mt-0.5">{selectedCompetitor.positioning}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono-tech text-[#525252] block">Market Share</span>
                <span className="text-base font-bold font-mono-tech text-[#0066FF]">{selectedCompetitor.marketShare}</span>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-2">
                <span className="text-[10px] font-mono-tech text-[#10B981] uppercase block font-bold">
                  Core Strengths
                </span>
                <ul className="space-y-1.5">
                  {selectedCompetitor.strengths.map((st, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-2">
                <span className="text-[10px] font-mono-tech text-[#EF4444] uppercase block font-bold">
                  Vulnerabilities & Weaknesses
                </span>
                <ul className="space-y-1.5">
                  {selectedCompetitor.weaknesses.map((wk, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                      <XCircle className="w-3.5 h-3.5 text-[#EF4444] mt-0.5 flex-shrink-0" />
                      <span>{wk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Launches */}
            <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-2">
              <span className="text-[10px] font-mono-tech text-[#525252] uppercase block">
                Recent Product Launches & Releases
              </span>
              <div className="space-y-2">
                {selectedCompetitor.recentLaunches.map((launch, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D] text-xs">
                    <span className="text-white font-medium">{launch.feature}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono-tech text-[#525252]">{launch.date}</span>
                      <span
                        className={`text-[9px] font-mono-tech px-1.5 py-0.2 rounded-[2px] font-bold ${
                          launch.threatLevel === 'HIGH'
                            ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                            : 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}
                      >
                        {launch.threatLevel} THREAT
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Opportunity Gap */}
            <div className="p-4 rounded-[2px] bg-[#091528] border border-[#0066FF]/40 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#0066FF] font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Argus Opportunity Gap
              </div>
              <p className="text-xs text-[#8AB4F8] leading-relaxed">
                {selectedCompetitor.opportunityGap}
              </p>
              <button
                onClick={() => {
                  onShowToast('Created strategic opportunity based on competitor gap analysis.');
                  onNavigateTab('opportunities');
                }}
                className="btn-magnetic flex items-center gap-1 px-3 py-1.5 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-mono-tech font-bold cursor-pointer transition-colors shadow-sm shadow-[#0066FF]/30"
              >
                <span>Exploit Opportunity in Prioritization →</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'MATRIX' && (
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-tech">
            <thead className="bg-[#070707] border-b border-[#1D1D1D] text-[#525252] uppercase">
              <tr>
                <th className="p-3.5">Capability / Feature</th>
                <th className="p-3.5 text-[#0066FF] font-bold">Argus</th>
                <th className="p-3.5">PhonePe</th>
                <th className="p-3.5">Google Pay</th>
                <th className="p-3.5">Razorpay</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#161616]">
              <tr>
                <td className="p-3.5 font-bold text-white">Dynamic Bank-Health Rerouting</td>
                <td className="p-3.5 text-[#10B981] font-bold">Autonomous Sub-Second</td>
                <td className="p-3.5 text-[#CCCCCC]">Dual Switch Polling</td>
                <td className="p-3.5 text-[#525252]">Static Round-Robin</td>
                <td className="p-3.5 text-[#10B981]">Optimizer AI</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Adversarial PRD Critic & Diff</td>
                <td className="p-3.5 text-[#10B981] font-bold">Native Spec Hardening</td>
                <td className="p-3.5 text-[#525252]">None</td>
                <td className="p-3.5 text-[#525252]">None</td>
                <td className="p-3.5 text-[#525252]">None</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Real-Time Chaos Failover Simulator</td>
                <td className="p-3.5 text-[#10B981] font-bold">Live GMV Ticker</td>
                <td className="p-3.5 text-[#525252]">None (Internal Only)</td>
                <td className="p-3.5 text-[#525252]">None</td>
                <td className="p-3.5 text-[#525252]">Sandbox Mock only</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Dynamic RICE Sensitivity Sliders</td>
                <td className="p-3.5 text-[#10B981] font-bold">Causal Sensitivity AI</td>
                <td className="p-3.5 text-[#525252]">Manual Spreadsheets</td>
                <td className="p-3.5 text-[#525252]">Manual Jira</td>
                <td className="p-3.5 text-[#525252]">Productboard</td>
              </tr>
              <tr>
                <td className="p-3.5 font-bold text-white">Zero KYC Telemetry Processing</td>
                <td className="p-3.5 text-[#10B981] font-bold">RBI Tokenized Privacy</td>
                <td className="p-3.5 text-[#F59E0B]">Proprietary Data Vault</td>
                <td className="p-3.5 text-[#F59E0B]">Google Cloud Vault</td>
                <td className="p-3.5 text-[#F59E0B]">PCI-DSS Level 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'RADAR' && (
        <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#0066FF] font-bold uppercase">
            <TrendingUp className="w-4 h-4" />
            Argus Weekly Market Delta Report (Week 37)
          </div>
          <p className="text-xs text-[#8A8A8A] leading-relaxed">
            Summary of notable shifts across competing fintech platforms, new gateway API policies, and consumer expectations:
          </p>

          <div className="space-y-3">
            <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">1. PhonePe pushes hardware soundbox screen updates</span>
                <span className="text-[10px] font-mono-tech text-[#EF4444] font-bold">HIGH PRIORITY</span>
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                PhonePe launched interactive LCD dynamic QR screen soundboxes to combat fake screenshot fraud. Suggestion: Prioritize our soundbox WebSocket acknowledgment PRD to maintain parity.
              </p>
            </div>

            <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">2. NPCI releases Biometric Intent specification</span>
                <span className="text-[10px] font-mono-tech text-[#F59E0B] font-bold">MEDIUM PRIORITY</span>
              </div>
              <p className="text-xs text-[#CCCCCC] leading-relaxed">
                National Payments Corporation of India drafted circular 44/2026 recommending FIDO2 intent handshakes for transactions under ₹2,000. Reduces MPIN steps by 100%.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
