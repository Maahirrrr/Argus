import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Radar
} from 'lucide-react';
import type { CustomerVoiceItem, CompetitorIntel, ModuleType } from '../types/finpilot';
import { CUSTOMER_VOICE_FEEDBACK, COMPETITOR_INTEL } from '../data/fintechScenarios';

interface FintechBrainFeedProps {
  onNavigateToModule: (m: ModuleType) => void;
}

export const FintechBrainFeed: React.FC<FintechBrainFeedProps> = ({ onNavigateToModule }) => {
  const [activeTab, setActiveTab] = useState<'customer_voice' | 'competitor_intel'>('customer_voice');
  const [filterSentiment, setFilterSentiment] = useState<'all' | 'negative' | 'positive'>('all');

  const filteredCustomerVoice: CustomerVoiceItem[] = CUSTOMER_VOICE_FEEDBACK.filter((item: CustomerVoiceItem) => {
    if (filterSentiment === 'all') return true;
    return item.sentiment === filterSentiment;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b0c12] border border-white/[0.08] relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/5 blur-[90px] pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08] relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="section-label">External Market & User Feedback Signals</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                Fintech Brain Feed
              </span>
            </div>
            <h2 className="font-syne text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Customer Voice & Competitor Radar
            </h2>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              Real-time clustering of Play Store reviews, Zendesk support tickets, Twitter/X complaints, and competitive moves across PhonePe, CRED, GPay, and Razorpay.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] flex-shrink-0">
            <button
              onClick={() => setActiveTab('customer_voice')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'customer_voice'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <MessageSquareQuote className="w-3.5 h-3.5" />
              <span>Customer Voice ({CUSTOMER_VOICE_FEEDBACK.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('competitor_intel')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'competitor_intel'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Radar className="w-3.5 h-3.5" />
              <span>Competitor Radar ({COMPETITOR_INTEL.length})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Customer Voice Feed */}
        {activeTab === 'customer_voice' && (
          <div className="pt-6 flex flex-col gap-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                Aggregated User Verbatims
              </span>
              <div className="flex items-center gap-2">
                {(['all', 'negative', 'positive'] as const).map((sent) => (
                  <button
                    key={sent}
                    onClick={() => setFilterSentiment(sent)}
                    className={`text-[11px] font-mono px-2.5 py-1 rounded-lg capitalize cursor-pointer transition-all ${
                      filterSentiment === sent
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'bg-white/[0.02] text-zinc-500 hover:text-zinc-300 border border-white/[0.04]'
                    }`}
                  >
                    {sent}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCustomerVoice.map((item: CustomerVoiceItem) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-[#08090d] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-zinc-400 border border-white/[0.06]">
                          {item.source}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.sentiment === 'negative'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        }`}>
                          {item.sentiment.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">{item.timeAgo}</span>
                    </div>

                    <p className="text-xs text-zinc-200 font-serif italic mb-3">
                      "{item.quote}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                    <span className="text-[10px] font-mono text-indigo-300">
                      Cluster: {item.cluster}
                    </span>
                    <button
                      onClick={() => onNavigateToModule('intelligence')}
                      className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      Investigate Incident →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Competitor Radar */}
        {activeTab === 'competitor_intel' && (
          <div className="pt-6 flex flex-col gap-4 relative z-10">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Live Competitor Landscape & Counter-Strategies
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMPETITOR_INTEL.map((comp: CompetitorIntel, idx: number) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#08090d] border border-white/[0.06] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-base font-bold font-syne text-white">
                        {comp.competitor}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {comp.statusDate}
                      </span>
                    </div>

                    <h4 className="text-xs font-semibold text-cyan-300 mb-1 font-mono">
                      {comp.featureName}
                    </h4>
                    <p className="text-xs text-zinc-300 leading-relaxed mb-2">
                      {comp.recentMove}
                    </p>
                    <p className="text-[11px] text-zinc-500 leading-relaxed mb-3">
                      Impact: {comp.impactOnUs}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block mb-1">
                      FinPilot Recommended Response:
                    </span>
                    <p className="text-xs text-zinc-200 font-mono leading-relaxed">
                      {comp.recommendedResponse}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
