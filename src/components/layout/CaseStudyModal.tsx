import React, { useState } from 'react';
import {
  X,
  BookOpen
} from 'lucide-react';
import { PORTFOLIO_CASE_STUDY } from '../../data/portfolioCaseStudy';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<'problem' | 'architecture' | 'decisions' | 'impact'>('problem');

  if (!isOpen) return null;

  const data = PORTFOLIO_CASE_STUDY;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-[4px] bg-[#0A0A0A] border border-[#1D1D1D] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#1D1D1D] flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-[2px] bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#F5F5F0] tracking-tight font-display">{data.title}</h2>
              <p className="text-[11px] text-[#8A8A8A] font-mono-tech">
                {data.role} · {data.timeline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-[#1D1D1D] bg-[#070707] overflow-x-auto text-xs font-mono-tech">
          {[
            { id: 'problem', label: '1. Problem & User Research' },
            { id: 'architecture', label: '2. Multi-Agent Architecture' },
            { id: 'decisions', label: '3. PM Decisions & Trade-offs' },
            { id: 'impact', label: '4. Metrics & Roadmap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-[2px] cursor-pointer transition-colors whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-xs font-mono-tech text-[#8A8A8A] leading-relaxed">
          {activeSection === 'problem' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase text-[#0066FF] font-bold block mb-1">THE PROBLEM STATEMENT</span>
                <p className="text-xs text-[#F5F5F0] leading-relaxed bg-[#050505] p-3 rounded-[3px] border border-[#161616]">
                  {data.problem}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-[#8A8A8A] font-bold block">USER RESEARCH & FIELD INTERVIEWS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.userResearch.map((ur, i) => (
                    <div key={i} className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                      <span className="text-xs font-bold text-[#F5F5F0] block mb-1">{ur.persona}</span>
                      <p className="text-[11px] text-[#8A8A8A] italic mb-2">{ur.quote}</p>
                      <span className="text-[10px] text-[#EF4444]">Pain point: {ur.painPoint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase text-[#0066FF] font-bold block mb-1">PRODUCT HYPOTHESIS</span>
                <p className="text-xs text-[#F5F5F0] leading-relaxed bg-[#050505] p-3 rounded-[3px] border border-[#161616]">
                  {data.productHypothesis}
                </p>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-[#8A8A8A] font-bold block">SYSTEM ARCHITECTURE LAYERS</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {data.solutionArchitecture.map((sa, i) => (
                    <div key={i} className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                      <span className="text-xs font-bold text-[#F5F5F0] block mb-1">{sa.layer}</span>
                      <p className="text-[11px] text-[#8A8A8A] mb-2">{sa.purpose}</p>
                      <span className="text-[10px] text-[#0066FF]">Stack: {sa.technologies}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'decisions' && (
            <div className="space-y-3">
              <span className="text-[10px] uppercase text-[#0066FF] font-bold block">KEY PM DECISIONS & STRATEGIC TRADE-OFFS</span>
              {data.keyProductDecisions.map((kd, i) => (
                <div key={i} className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                  <span className="text-xs font-bold text-[#F5F5F0] block mb-1">{kd.decision}</span>
                  <p className="text-[11px] text-[#8A8A8A] mb-1.5"><strong>Rationale:</strong> {kd.rationale}</p>
                  <p className="text-[10px] text-[#525252]"><strong>Trade-off:</strong> {kd.tradeoff}</p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'impact' && (
            <div className="space-y-4">
              <span className="text-[10px] uppercase text-[#0066FF] font-bold block">EVALUATED OUTCOMES & IMPACT</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.metricsAndImpact.map((mi, i) => (
                  <div key={i} className="p-3.5 rounded-[3px] bg-[#050505] border border-[#1D1D1D]">
                    <span className="text-[10px] text-[#525252] block mb-1">{mi.metric}</span>
                    <p className="text-lg font-bold text-[#10B981]">{mi.result}</p>
                    <p className="text-[10px] text-[#8A8A8A] mt-1">{mi.context}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-[#1D1D1D] bg-[#050505] flex items-center justify-between text-[11px] font-mono-tech text-[#525252]">
          <span>PORTFOLIO SHOWCASE · TAPWISE</span>
          <button
            onClick={onClose}
            className="text-[#8A8A8A] hover:text-[#F5F5F0] cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
