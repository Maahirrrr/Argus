import React, { useState } from 'react';
import {
  History,
  Plus,
  Search
} from 'lucide-react';
import type { DecisionRecord, NavigationTab } from '../../types/argus';
import { DEMO_DECISIONS } from '../../data/demoData';

interface DecisionLogProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const DecisionLog: React.FC<DecisionLogProps> = ({
  onShowToast,
}) => {
  const [decisions] = useState<DecisionRecord[]>(DEMO_DECISIONS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDecision, setSelectedDecision] = useState<DecisionRecord | null>(DEMO_DECISIONS[0]);

  const categories = ['ALL', 'Architecture', 'AI Strategy', 'Pricing', 'Infrastructure'];

  const filteredDecisions = decisions.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.context.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || d.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const optionsList = selectedDecision
    ? (selectedDecision.options || selectedDecision.optionsEvaluated?.map(o => o.option) || ['Option A', 'Option B'])
    : [];

  const signoffsList = selectedDecision
    ? (selectedDecision.signoffs || ['Tech Lead', 'Staff Systems Engineer', 'Compliance Lead'])
    : [];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Decision Log (ADR Repository)</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Institutional memory, architectural tradeoffs & consensus records for PMs & Tech Leads
            </p>
          </div>
        </div>

        <button
          onClick={() => onShowToast('New ADR template created.')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Record ADR</span>
        </button>
      </div>

      {/* Search & Category filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder="Search decisions by title, keyword, or rationale..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] pl-9 pr-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
          />
        </div>

        <div className="flex items-center bg-[#0A0A0A] p-1 rounded-[2px] border border-[#1D1D1D]">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-[2px] transition-colors ${
                selectedCategory === c ? 'bg-[#0066FF] text-white font-medium' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Decisions List */}
        <div className="lg:col-span-5 space-y-2.5">
          {filteredDecisions.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDecision(d)}
              className={`p-3.5 bg-[#0A0A0A] border rounded-[2px] cursor-pointer transition-all ${
                selectedDecision?.id === d.id ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#1D1D1D] hover:border-[#333]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono-tech text-[#0066FF]">{d.category || 'Architecture'}</span>
                <span className="text-[10px] font-mono-tech text-[#8A8A8A]">{d.date}</span>
              </div>
              <h3 className="text-xs font-bold text-[#F5F5F0] font-display">{d.title}</h3>
              <p className="text-[11px] text-[#8A8A8A] mt-1 line-clamp-2">{d.context}</p>
              <div className="mt-2 text-[10px] font-mono-tech text-[#00CC66]">
                Outcome: {d.decision || d.chosenOption}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Decision Detail */}
        {selectedDecision && (
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
            <div className="border-b border-[#1D1D1D] pb-3">
              <div className="flex items-center gap-2 text-[10px] font-mono-tech text-[#0066FF]">
                <span>{selectedDecision.category || 'Architecture'}</span>
                <span>•</span>
                <span>ADR-{selectedDecision.id.toUpperCase()}</span>
                <span>•</span>
                <span>{selectedDecision.date}</span>
              </div>
              <h2 className="text-base font-bold font-display text-[#F5F5F0] mt-1">
                {selectedDecision.title}
              </h2>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase mb-1">Context & Problem Statement</div>
                <p className="text-[#CCCCCC] leading-relaxed">{selectedDecision.context}</p>
              </div>

              <div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase mb-1">Options Evaluated</div>
                <div className="space-y-1">
                  {optionsList.map((opt, idx) => (
                    <div key={idx} className="p-2 bg-[#050505] border border-[#141414] rounded-[2px] text-[#F5F5F0] font-mono-tech text-[11px]">
                      {idx + 1}. {opt}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono-tech text-[#00CC66] uppercase mb-1">Winning Consensus Decision</div>
                <div className="p-2.5 bg-[#00CC66]/10 border border-[#00CC66]/30 rounded-[2px] text-[#00CC66] font-mono-tech font-bold text-xs">
                  {selectedDecision.decision || selectedDecision.chosenOption}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase mb-1">Strategic Rationale</div>
                <p className="text-[#CCCCCC] leading-relaxed">{selectedDecision.rationale}</p>
              </div>

              <div>
                <div className="text-[10px] font-mono-tech text-[#8A8A8A] uppercase mb-1">Sign-offs & Approvals</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {signoffsList.map((s, idx) => (
                    <span key={idx} className="text-[10px] font-mono-tech px-2 py-0.5 bg-[#141414] border border-[#222] text-[#F5F5F0] rounded-[2px]">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
