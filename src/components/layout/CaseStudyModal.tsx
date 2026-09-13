import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Target,
  Users,
  Cpu,
  GitBranch,
  ShieldCheck
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0a0b0e] border border-white/[0.12] shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-tight">{data.title}</h2>
              <p className="text-[11px] text-zinc-400 font-mono">
                {data.role} · {data.timeline}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1 px-6 py-2 border-b border-white/[0.06] bg-black/30 overflow-x-auto">
          {[
            { id: 'problem', label: '1. Problem & User Research' },
            { id: 'architecture', label: '2. Multi-Agent Architecture' },
            { id: 'decisions', label: '3. PM Decisions & Trade-offs' },
            { id: 'impact', label: '4. Metrics & Roadmap' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs leading-relaxed text-zinc-300">
          {activeSection === 'problem' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-400" />
                  The Problem
                </h3>
                <p className="text-zinc-300 leading-relaxed">{data.problem}</p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  User Research & Key Personas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {data.userResearch.map((res, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#0e1015] border border-white/[0.06]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-400 block mb-1">
                        {res.persona}
                      </span>
                      <p className="text-xs italic text-zinc-200 mb-2">{res.quote}</p>
                      <p className="text-[11px] text-zinc-400">
                        <strong className="text-zinc-300">Pain point:</strong> {res.painPoint}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-300 block mb-1">
                  Product Hypothesis
                </span>
                <p className="text-xs text-zinc-200 font-mono leading-relaxed">{data.productHypothesis}</p>
              </div>
            </div>
          )}

          {activeSection === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-blue-400" />
                  Multi-Agent Fintech Intelligence Architecture
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  FinPilot replaces generic chat interfaces with specialized deterministic + statistical agent pipelines:
                </p>

                <div className="flex flex-col gap-3">
                  {data.solutionArchitecture.map((arch, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#0e1015] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-white block">{arch.layer}</span>
                        <p className="text-[11px] text-zinc-400">{arch.purpose}</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-blue-300 border border-white/[0.08] flex-shrink-0">
                        {arch.technologies}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'decisions' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-blue-400" />
                Strategic Product Decisions & Trade-Offs
              </h3>
              {data.keyProductDecisions.map((dec, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#0e1015] border border-white/[0.06] space-y-2">
                  <h4 className="text-xs font-bold text-white">{dec.decision}</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    <strong className="text-blue-400 font-semibold">Rationale:</strong> {dec.rationale}
                  </p>
                  <p className="text-[11px] text-zinc-400 font-mono">
                    <strong className="text-amber-400 font-semibold">Trade-off:</strong> {dec.tradeoff}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'impact' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Product Metrics & Business Impact
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {data.metricsAndImpact.map((met, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#0e1015] border border-white/[0.06]">
                      <span className="text-[10px] font-mono text-zinc-400 block mb-1">{met.metric}</span>
                      <p className="text-xl font-bold font-mono text-emerald-400 mb-1">{met.result}</p>
                      <p className="text-[11px] text-zinc-400">{met.context}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h3 className="text-sm font-bold text-white mb-2">Future Product Roadmap</h3>
                <ul className="space-y-2 text-xs text-zinc-300">
                  {data.futureRoadmap.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-400 font-bold">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.08] bg-black/40 flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <span>Designed as an AI Product Manager Portfolio System</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-white/[0.06] hover:bg-white/[0.1] text-white text-xs font-semibold cursor-pointer"
          >
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};
