import React, { useState } from 'react';
import {
  MessageSquareQuote,
  Building2,
  Sparkles,
  Search,
  Quote
} from 'lucide-react';
import type { CustomerFeedbackItem, NavigationTab } from '../../types/argus';
import { DEMO_CUSTOMER_FEEDBACK } from '../../data/demoData';

interface CustomerFeedbackProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [feedbackList] = useState<CustomerFeedbackItem[]>(DEMO_CUSTOMER_FEEDBACK);
  const [activeSegment, setActiveSegment] = useState<'ALL' | 'Enterprise' | 'Growth' | 'Prosumer'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = feedbackList.filter((fb) => {
    if (activeSegment !== 'ALL' && fb.segment !== activeSegment) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        fb.customerName.toLowerCase().includes(q) ||
        fb.company.toLowerCase().includes(q) ||
        fb.quote.toLowerCase().includes(q) ||
        fb.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handlePromoteToOpportunity = (item: CustomerFeedbackItem) => {
    onShowToast(`Created Opportunity from feedback by ${item.customerName} (${item.company}).`);
    onNavigateTab('opportunities');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <MessageSquareQuote className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Customer Feedback Engine</h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Voice of customer clustering, ARR churn impact, sentiment distribution & quote extraction
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D] text-[11px] font-mono-tech text-[#8A8A8A]">
            ARR AT RISK: <strong className="text-[#EF4444]">₹2.96 Cr</strong>
          </span>
          <button
            onClick={() => onShowToast('Syncing Zendesk, Play Store and Sales notes...')}
            className="px-2.5 py-1 rounded-[2px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#CCCCCC] cursor-pointer transition-colors"
          >
            Sync Live Sources
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Negative Sentiment Ratio</span>
          <div className="text-xl font-bold font-mono-tech text-[#EF4444]">68.4%</div>
          <span className="text-[10px] text-[#8A8A8A]">Concentrated in evening checkout timeouts</span>
        </div>

        <div className="p-3.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Top Recurring Category</span>
          <div className="text-xl font-bold font-mono-tech text-[#0066FF]">Payment Routing</div>
          <span className="text-[10px] text-[#8A8A8A]">142 mentions across 18 enterprise accounts</span>
        </div>

        <div className="p-3.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Total Mentions / Wk</span>
          <div className="text-xl font-bold font-mono-tech text-[#F5F5F0]">1,284</div>
          <span className="text-[10px] text-[#10B981]">-8.1% vs previous week</span>
        </div>

        <div className="p-3.5 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D]">
          <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Promoted to Opportunities</span>
          <div className="text-xl font-bold font-mono-tech text-[#10B981]">4 Initiatives</div>
          <span className="text-[10px] text-[#8A8A8A]">Linked to active PRDs & Roadmaps</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'Enterprise', 'Growth', 'Prosumer'] as const).map((segment) => (
            <button
              key={segment}
              onClick={() => setActiveSegment(segment)}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech uppercase transition-colors cursor-pointer whitespace-nowrap ${
                activeSegment === segment
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'bg-[#101010] text-[#8A8A8A] hover:text-[#F5F5F0] border border-[#1D1D1D]'
              }`}
            >
              {segment === 'ALL' ? 'All Segments' : segment}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#525252] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search feedback quotes..."
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] pl-8 pr-3 py-1.5 text-xs text-[#F5F5F0] placeholder:text-[#525252] focus:border-[#0066FF] focus:outline-none font-mono-tech"
          />
        </div>
      </div>

      {/* Feedback Feed Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#2E2E2E] transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded-[2px] font-bold ${
                      item.painSeverity === 'Critical'
                        ? 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                        : item.painSeverity === 'High'
                        ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                        : 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                    }`}
                  >
                    {item.painSeverity.toUpperCase()} PAIN
                  </span>
                  <span className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded-[2px] bg-[#141414] text-[#8A8A8A]">
                    {item.segment}
                  </span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#525252]">{item.timestamp}</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5F5F0] mb-2">
                <Building2 className="w-3.5 h-3.5 text-[#0066FF]" />
                <span>{item.company}</span>
                <span className="text-[#525252] font-normal font-mono-tech">({item.customerName})</span>
              </div>

              {/* Direct Quote Box */}
              <div className="p-3 rounded-[2px] bg-[#070707] border border-[#161616] relative text-xs text-[#CCCCCC] italic leading-relaxed">
                <Quote className="w-3.5 h-3.5 text-[#0066FF]/40 absolute top-2 right-2" />
                "{item.quote}"
              </div>
            </div>

            <div className="pt-2 border-t border-[#161616] flex items-center justify-between gap-2">
              <div className="text-[11px] font-mono-tech text-[#8A8A8A]">
                ARR at risk: <strong className="text-white">{item.arrAtRisk}</strong> · Freq:{' '}
                <strong className="text-[#0066FF]">{item.frequency}x</strong>
              </div>

              <button
                onClick={() => handlePromoteToOpportunity(item)}
                className="btn-magnetic flex items-center gap-1 px-2.5 py-1.5 rounded-[2px] bg-[#0066FF]/10 hover:bg-[#0066FF]/20 border border-[#0066FF]/30 text-xs font-mono-tech text-[#0066FF] hover:text-[#3B82F6] cursor-pointer transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                <span>Promote to Opportunity →</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
