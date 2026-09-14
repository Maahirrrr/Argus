import React, { useState } from 'react';
import {
  HelpCircle,
  Search,
  X,
  Play
} from 'lucide-react';
import { HELP_ARTICLES } from '../../data/helpCenterData';

interface HelpCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenTutorial: () => void;
}

export const HelpCenterModal: React.FC<HelpCenterModalProps> = ({
  isOpen,
  onClose,
  onOpenTutorial,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>(HELP_ARTICLES[0].id);

  const filtered = HELP_ARTICLES.filter((a) =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase()) ||
    a.summary.toLowerCase().includes(query.toLowerCase())
  );

  const activeArticle = HELP_ARTICLES.find((a) => a.id === selectedArticleId) || HELP_ARTICLES[0];

  return !isOpen ? null : (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-[#F5F5F0]">
      <div className="bg-[#0A0A0A] border border-[#1D1D1D] rounded-[3px] w-full max-w-4xl shadow-2xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1D1D1D]">
          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-5 h-5 text-[#0066FF]" />
            <h2 className="text-sm font-bold font-display tracking-wide text-[#F5F5F0]">
              ARGUS OPERATING MANUAL & HELP CENTER
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenTutorial();
              }}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#0066FF] text-white text-xs font-mono-tech rounded-[2px] hover:bg-[#0052CC]"
            >
              <Play className="w-3 h-3" />
              <span>Interactive Tutorial</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 text-[#8A8A8A] hover:text-[#F5F5F0]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 bg-[#080808] border-b border-[#1D1D1D]">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8A8A8A] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search help articles (e.g. 'Teresa Torres', 'BDD Gherkin', 'Canary Rollout')..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#050505] border border-[#1D1D1D] focus:border-[#0066FF] pl-9 pr-3 py-2 text-xs font-mono-tech text-[#F5F5F0] rounded-[2px] outline-none"
            />
          </div>
        </div>

        {/* Body: Article list + content */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Article List */}
          <div className="md:col-span-5 border-r border-[#1D1D1D] overflow-y-auto p-2 space-y-1">
            {filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`p-3 rounded-[2px] cursor-pointer transition-all border ${
                  selectedArticleId === art.id
                    ? 'bg-[#0066FF]/10 border-[#0066FF]/40 text-[#F5F5F0]'
                    : 'bg-[#0D0D0D] border-transparent hover:border-[#1D1D1D] text-[#8A8A8A]'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono-tech mb-1">
                  <span className="text-[#0066FF]">{art.category}</span>
                  <span>3 min read</span>
                </div>
                <h4 className="text-xs font-bold font-display text-[#F5F5F0]">{art.title}</h4>
                <p className="text-[11px] text-[#8A8A8A] mt-1 line-clamp-2">{art.summary}</p>
              </div>
            ))}
          </div>

          {/* Article Content */}
          <div className="md:col-span-7 p-6 overflow-y-auto space-y-4">
            <div className="border-b border-[#1D1D1D] pb-3">
              <span className="text-[10px] font-mono-tech text-[#0066FF] uppercase">
                {activeArticle.category} · 3 MIN READ
              </span>
              <h1 className="text-lg font-bold font-display text-[#F5F5F0] mt-1">
                {activeArticle.title}
              </h1>
            </div>

            <p className="text-xs text-[#8A8A8A] leading-relaxed">
              {activeArticle.summary}
            </p>

            <div className="text-xs text-[#CCCCCC] space-y-3 leading-relaxed whitespace-pre-line font-sans bg-[#050505] p-4 rounded-[2px] border border-[#141414]">
              {activeArticle.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
