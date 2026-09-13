import React, { useState } from 'react';
import { X, BookOpen } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-4xl max-h-[92vh] rounded-[4px] bg-[#0A0A0A] border border-[#1D1D1D] shadow-2xl flex flex-col overflow-hidden">
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#1D1D1D] flex items-center justify-between bg-[#0A0A0A]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-7 h-7 rounded-[2px] bg-[#0066FF]/15 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF] flex-shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xs sm:text-sm font-bold text-[#F5F5F0] tracking-tight font-display truncate">{data.title}</h2>
              <p className="text-[10px] sm:text-[11px] text-[#8A8A8A] font-mono-tech truncate">
                {data.role} · {data.timeline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-[2px] text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414] cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-1.5 px-4 sm:px-6 py-2 border-b border-[#1D1D1D] bg-[#070707] overflow-x-auto text-xs font-mono-tech no-scrollbar">
          {[
            { id: 'problem', label: '1. Problem & Research' },
            { id: 'architecture', label: '2. Architecture' },
            { id: 'decisions', label: '3. PM Trade-offs' },
            { id: 'impact', label: '4. Metrics & Roadmap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={'px-3 py-2 rounded-[2px] cursor-pointer transition-colors whitespace-nowrap min-h-[38px] flex-shrink-0 ' + (activeSection === tab.id ? 'bg-[#141414] text-[#F5F5F0] font-bold border border-[#2E2E2E]' : 'text-[#8A8A8A] hover:text-[#F5F5F0]')}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 text-xs font-mono-tech text-[#8A8A8A] leading-relaxed no-scrollbar">
          {activeSection === 'problem' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0066FF] block mb-1">
                  BACKGROUND & PROBLEM STATEMENT
                </span>
                <p className="text-sm text-[#F5F5F0] font-sans font-normal leading-relaxed">
                  {data.problem}
                </p>
              </div>

              <div className="p-4 bg-[#050505] border border-[#161616] rounded-[3px] space-y-3">
                <span className="text-[10px] uppercase font-bold text-[#EF4444] block">
                  USER RESEARCH & FIELD FINDINGS:
                </span>
                <div className="space-y-2.5">
                  {data.userResearch.map((res, i) => (
                    <div key={i} className="p-3 bg-[#0A0A0A] border border-[#141414] rounded-[2px]">
                      <span className="text-[#0066FF] font-bold block mb-1">{res.persona}</span>
                      <p className="text-[#F5F5F0] italic mb-1.5">{res.quote}</p>
                      <p className="text-[11px] text-[#EF4444]">Pain point: {res.painPoint}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-[#10B981] block mb-1">
                  PRODUCT HYPOTHESIS
                </span>
                <p className="text-[#F5F5F0] leading-relaxed">{data.productHypothesis}</p>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0066FF] block mb-1">
                  SOLUTION ARCHITECTURE & AGENT SYSTEM
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.solutionArchitecture.map((arch, i) => (
                  <div key={i} className="p-3.5 bg-[#050505] border border-[#161616] rounded-[3px] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-[#0066FF] font-bold block mb-0.5">{arch.layer}</span>
                      <p className="text-[#F5F5F0] font-bold mb-1">{arch.purpose}</p>
                    </div>
                    <span className="text-[11px] text-[#525252] mt-2 pt-1 border-t border-[#141414]">
                      Stack: {arch.technologies}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'decisions' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#0066FF] block mb-1">
                  HARD PRODUCT TRADE-OFFS & ARCHITECTURAL CHOICES
                </span>
              </div>

              <div className="space-y-3">
                {data.keyProductDecisions.map((dec, i) => (
                  <div key={i} className="p-4 bg-[#050505] border border-[#161616] rounded-[3px] space-y-1.5">
                    <span className="text-xs font-bold text-[#F5F5F0] block">{dec.decision}</span>
                    <p><strong className="text-[#8A8A8A]">Trade-off:</strong> {dec.tradeoff}</p>
                    <p><strong className="text-[#0066FF]">Why this path:</strong> {dec.rationale}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'impact' && (
            <div className="space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#10B981] block mb-1">
                  QUANTIFIED PRODUCT METRICS & OUTCOMES
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {data.metricsAndImpact.map((m, i) => (
                  <div key={i} className="p-4 bg-[#050505] border border-[#161616] rounded-[3px] flex flex-col justify-between">
                    <span className="text-[10px] text-[#525252] block mb-1">{m.metric}</span>
                    <div>
                      <p className="text-xl font-bold text-[#10B981] font-mono-tech mb-0.5">{m.result}</p>
                      <p className="text-[10px] text-[#8A8A8A]">{m.context}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-[#050505] border border-[#161616] rounded-[3px]">
                <span className="text-[10px] text-[#0066FF] font-bold uppercase block mb-2">
                  Future Roadmap Evolution
                </span>
                <ul className="space-y-1 list-disc pl-4 text-xs">
                  {data.futureRoadmap.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className="px-4 sm:px-6 py-3 border-t border-[#1D1D1D] bg-[#070707] flex items-center justify-between text-[11px] font-mono-tech text-[#525252]">
          <span>Argus AI Product Management Portfolio</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-[2px] bg-[#141414] hover:bg-[#1A1A1A] border border-[#2E2E2E] text-xs font-mono-tech text-[#F5F5F0] cursor-pointer min-h-[40px]"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};