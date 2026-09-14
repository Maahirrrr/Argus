import React, { useState } from 'react';
import {
  Microscope,
  Layers,
  ChevronRight,
  Plus
} from 'lucide-react';
import type { ResearchProject, InterviewRecord, NavigationTab } from '../../types/argus';
import { DEMO_RESEARCH_PROJECTS, DEMO_INTERVIEWS } from '../../data/demoData';

interface ResearchLabProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const ResearchLab: React.FC<ResearchLabProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [projects] = useState<ResearchProject[]>(DEMO_RESEARCH_PROJECTS);
  const [selectedProject, setSelectedProject] = useState<ResearchProject>(projects[0]);
  const [interviews] = useState<InterviewRecord[]>(DEMO_INTERVIEWS);
  const [selectedInterview, setSelectedInterview] = useState<InterviewRecord>(interviews[0]);
  const [activeView, setActiveView] = useState<'PROJECTS' | 'INTERVIEW_ASSISTANT'>('PROJECTS');

  const handleCreateOpportunity = (title: string) => {
    onShowToast(`Opportunity created from research insight: "${title}".`);
    onNavigateTab('opportunities');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <Microscope className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">User Research Lab & Interview Assistant</h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Qualitative interview analysis, transcript synthesis, JTBD extraction & recurring pain detection
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#101010] p-0.5 rounded-[2px] border border-[#1D1D1D]">
            <button
              onClick={() => setActiveView('PROJECTS')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech cursor-pointer transition-colors ${
                activeView === 'PROJECTS'
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Research Projects
            </button>
            <button
              onClick={() => setActiveView('INTERVIEW_ASSISTANT')}
              className={`px-3 py-1.5 rounded-[2px] text-xs font-mono-tech cursor-pointer transition-colors ${
                activeView === 'INTERVIEW_ASSISTANT'
                  ? 'bg-[#0066FF] text-white font-bold'
                  : 'text-[#8A8A8A] hover:text-[#F5F5F0]'
              }`}
            >
              Interview Assistant ({interviews.length})
            </button>
          </div>
          <button
            onClick={() => onShowToast('New research project wizard opened.')}
            className="btn-magnetic flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-mono-tech text-white cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#0066FF]" />
            <span>New Study</span>
          </button>
        </div>
      </div>

      {activeView === 'PROJECTS' ? (
        /* Research Projects View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Project List */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[10px] font-mono-tech uppercase text-[#525252] block px-1">Active Research Initiatives</span>
            {projects.map((proj) => {
              const isSelected = selectedProject.id === proj.id;
              return (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`p-4 rounded-[2px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#0066FF]'
                      : 'bg-[#0A0A0A] border-[#1D1D1D] hover:border-[#2E2E2E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[9px] font-mono-tech px-1.5 py-0.5 rounded-[2px] bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 font-bold">
                      {proj.status.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono-tech text-[#525252]">{proj.lastUpdated}</span>
                  </div>

                  <h3 className="text-sm font-bold text-[#F5F5F0] mb-1.5">{proj.title}</h3>
                  <p className="text-xs text-[#8A8A8A] line-clamp-2 leading-relaxed mb-3">{proj.objective}</p>

                  <div className="flex items-center justify-between text-[11px] font-mono-tech text-[#8A8A8A] pt-2 border-t border-[#161616]">
                    <span>{proj.interviewCount} Interviews</span>
                    <span className="text-[#0066FF] flex items-center gap-1">
                      Inspect Synthesis <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Project Synthesis Inspector */}
          <div className="lg:col-span-7 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
            <div className="pb-3 border-b border-[#1D1D1D]">
              <span className="text-[10px] font-mono-tech text-[#0066FF] uppercase font-bold block mb-1">
                Project Synthesis Report
              </span>
              <h2 className="text-lg font-bold font-display text-white">{selectedProject.title}</h2>
              <p className="text-xs text-[#8A8A8A] mt-1">{selectedProject.objective}</p>
            </div>

            {/* Target Persona & JTBD */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 rounded-[2px] bg-[#070707] border border-[#161616]">
                <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Target Persona</span>
                <p className="text-xs font-bold text-[#F5F5F0]">{selectedProject.persona}</p>
              </div>
              <div className="p-3 rounded-[2px] bg-[#070707] border border-[#161616]">
                <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1">Jobs To Be Done (JTBD)</span>
                <p className="text-xs text-[#CCCCCC] leading-relaxed italic">"{selectedProject.jtbd}"</p>
              </div>
            </div>

            {/* Recurring Pain Points */}
            <div className="p-3.5 rounded-[2px] bg-[#070707] border border-[#161616] space-y-2">
              <span className="text-[10px] font-mono-tech text-[#525252] uppercase block">
                Recurring Friction Signals (Extracted Across {selectedProject.interviewCount} Sessions)
              </span>
              <ul className="space-y-1.5">
                {selectedProject.keyPainPoints.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#CCCCCC]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 flex-shrink-0" />
                    <span>{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opportunity Discovered Card */}
            <div className="p-4 rounded-[2px] bg-[#091528] border border-[#0066FF]/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono-tech text-[#0066FF] font-bold uppercase">
                  <Layers className="w-3.5 h-3.5" />
                  Opportunity Discovered
                </div>
                <span className="text-[10px] font-mono-tech text-[#10B981] bg-[#10B981]/15 px-2 py-0.5 rounded-[2px]">
                  High Conviction
                </span>
              </div>
              <p className="text-sm font-bold text-white font-display">
                {selectedProject.opportunityDiscovered}
              </p>
              <button
                onClick={() => handleCreateOpportunity(selectedProject.opportunityDiscovered)}
                className="btn-magnetic flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-mono-tech font-bold cursor-pointer transition-colors shadow-sm shadow-[#0066FF]/30"
              >
                <span>Promote to Opportunities Tree →</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Interview Assistant View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-[10px] font-mono-tech uppercase text-[#525252] block px-1">Recorded User Sessions</span>
            {interviews.map((intItem) => {
              const isSelected = selectedInterview.id === intItem.id;
              return (
                <div
                  key={intItem.id}
                  onClick={() => setSelectedInterview(intItem)}
                  className={`p-3.5 rounded-[2px] border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121212] border-[#0066FF]'
                      : 'bg-[#0A0A0A] border-[#1D1D1D] hover:border-[#2E2E2E]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-bold text-white">{intItem.participantName}</span>
                    <span className="text-[10px] font-mono-tech text-[#525252]">{intItem.duration}</span>
                  </div>
                  <div className="text-xs text-[#8A8A8A] font-mono-tech mb-2">
                    {intItem.role} · {intItem.company}
                  </div>
                  <p className="text-[11px] text-[#525252] line-clamp-1 italic font-sans">{intItem.transcriptSnippet}</p>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-7 bg-[#0A0A0A] border border-[#1D1D1D] rounded-[2px] p-5 space-y-4">
            <div className="pb-3 border-b border-[#1D1D1D] flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold font-display text-white">{selectedInterview.participantName}</h2>
                <p className="text-xs text-[#8A8A8A] font-mono-tech">
                  {selectedInterview.role} at {selectedInterview.company} · {selectedInterview.date}
                </p>
              </div>
              <span className="text-[11px] font-mono-tech text-[#0066FF] bg-[#0066FF]/10 px-2 py-1 rounded-[2px] border border-[#0066FF]/25">
                {selectedInterview.duration} Recorded
              </span>
            </div>

            {/* Transcript Snippet */}
            <div className="p-3 rounded-[2px] bg-[#050505] border border-[#161616]">
              <span className="text-[10px] font-mono-tech text-[#525252] uppercase block mb-1.5">Transcript Audio Snippet</span>
              <p className="text-xs text-[#CCCCCC] leading-relaxed font-mono-tech">{selectedInterview.transcriptSnippet}</p>
            </div>

            {/* AI Synthesized Insights */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tech text-[#525252] uppercase block">AI Synthesized Insights</span>
              <div className="space-y-1.5">
                {selectedInterview.aiSynthesizedInsights.map((insight, idx) => (
                  <div key={idx} className="p-2.5 rounded-[2px] bg-[#070707] border border-[#161616] flex items-start gap-2 text-xs text-[#CCCCCC]">
                    <Layers className="w-3.5 h-3.5 text-[#0066FF] mt-0.5 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Quotes */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono-tech text-[#525252] uppercase block">Key Verbatim Quotes</span>
              <div className="space-y-1.5">
                {selectedInterview.keyQuotes.map((q, idx) => (
                  <div key={idx} className="p-2.5 rounded-[2px] bg-[#070707] border border-[#161616] text-xs text-[#8AB4F8] italic">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
