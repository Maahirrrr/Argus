import React, { useState } from 'react';
import {
  Search,
  Share2,
  Plus,
  BookOpen
} from 'lucide-react';
import type { DocumentItem, NavigationTab } from '../../types/argus';
import { DEMO_DOCUMENTS } from '../../data/demoData';

interface DocumentHubProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const DocumentHub: React.FC<DocumentHubProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [docs] = useState<DocumentItem[]>(DEMO_DOCUMENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const types = ['ALL', 'PRD', 'Strategy', 'User Research', 'Meeting', 'Launch Playbook'];

  const filteredDocs = docs.filter((d) => {
    const textToMatch = (d.title + ' ' + (d.content || d.excerpt || '')).toLowerCase();
    const matchesSearch = textToMatch.includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'ALL' || d.type === typeFilter || d.category === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 animate-fade-in text-[#F5F5F0]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1D1D1D]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Knowledge Hub & Product Specs</h1>
            <p className="text-xs font-mono-tech text-[#8A8A8A]">
              Centralized repository for PRDs, Strategic Briefs, Architecture RFCs & One-Pagers
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('prds')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-tech font-medium bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-[2px] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Product Spec</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]" />
          <input
            type="text"
            placeholder="Search documents, specifications and RFCs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A0A0A] border border-[#1D1D1D] focus:border-[#0066FF] pl-9 pr-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
          />
        </div>

        <div className="flex items-center bg-[#0A0A0A] p-1 rounded-[2px] border border-[#1D1D1D] overflow-x-auto">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-2.5 py-1 text-[11px] font-mono-tech rounded-[2px] transition-colors whitespace-nowrap ${
                typeFilter === t ? 'bg-[#0066FF] text-white font-medium' : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#0A0A0A] border border-[#1D1D1D] hover:border-[#0066FF]/60 rounded-[2px] p-4 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono-tech text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded-[2px]">
                  {doc.type || doc.category || 'PRD'}
                </span>
                <span className="text-[10px] font-mono-tech text-[#8A8A8A]">
                  v{doc.version || '1.0'} · {doc.updatedAt || doc.lastEdited}
                </span>
              </div>

              <h3 className="text-sm font-bold font-display text-[#F5F5F0] line-clamp-1">{doc.title}</h3>
              <p className="text-xs text-[#8A8A8A] mt-1 line-clamp-3 leading-relaxed">
                {doc.content || doc.excerpt}
              </p>

              <div className="flex flex-wrap gap-1 mt-3">
                {doc.tags.map((tag) => (
                  <span key={tag} className="text-[9px] font-mono-tech text-[#8A8A8A] bg-[#141414] px-1.5 py-0.2 rounded-[2px]">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#1D1D1D] flex items-center justify-between text-xs font-mono-tech">
              <span className="text-[#8A8A8A] text-[11px]">{doc.author}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onShowToast('Document link copied.')}
                  className="p-1 hover:text-[#0066FF] text-[#8A8A8A]"
                  title="Share Link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onNavigateTab('prds')}
                  className="px-2 py-1 bg-[#141414] hover:bg-[#1D1D1D] border border-[#222] text-[#F5F5F0] rounded-[2px]"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
