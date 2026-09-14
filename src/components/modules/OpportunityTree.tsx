import React, { useState } from 'react';
import {
  GitFork,
  ChevronDown,
  ChevronRight,
  Plus,
  FlaskConical,
  SlidersHorizontal
} from 'lucide-react';
import type { OpportunityTreeNode, NavigationTab } from '../../types/argus';
import { DEMO_OPPORTUNITY_TREE } from '../../data/demoData';

interface OpportunityTreeProps {
  onNavigateTab: (tab: NavigationTab) => void;
  onShowToast: (msg: string) => void;
}

export const OpportunityTree: React.FC<OpportunityTreeProps> = ({
  onNavigateTab,
  onShowToast,
}) => {
  const [treeData] = useState<OpportunityTreeNode>(DEMO_OPPORTUNITY_TREE);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'tree-root': true,
    'tree-prob-1': true,
    'tree-need-1': true,
    'tree-opp-1': true,
    'tree-sol-1': true,
    'tree-prob-2': true,
  });

  const toggleNode = (id: string) => {
    setExpandedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getNodeColor = (type: OpportunityTreeNode['type']) => {
    switch (type) {
      case 'Outcome': return 'bg-[#0066FF]/10 text-[#0066FF] border-[#0066FF]/40';
      case 'Problem': return 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30';
      case 'Need': return 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30';
      case 'Opportunity': return 'bg-[#0070F3]/10 text-[#0070F3] border-[#0070F3]/30';
      case 'Solution': return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30';
      case 'Experiment': return 'bg-[#181818] text-[#D4D4D4] border-[#333333]';
      default: return 'bg-[#141414] text-[#8A8A8A] border-[#1D1D1D]';
    }
  };

  const renderNode = (node: OpportunityTreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes[node.id];
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-2 relative">
        <div
          style={{ marginLeft: `${depth * 20}px` }}
          className={`p-3.5 rounded-[2px] bg-[#0A0A0A] border transition-all ${
            node.type === 'Opportunity'
              ? 'border-[#0066FF]/60 shadow-sm shadow-[#0066FF]/10'
              : 'border-[#1D1D1D] hover:border-[#2E2E2E]'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              {hasChildren ? (
                <button
                  onClick={() => toggleNode(node.id)}
                  className="p-1 rounded-[2px] text-[#525252] hover:text-white hover:bg-[#141414] cursor-pointer mt-0.5"
                >
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              ) : (
                <span className="w-5 h-5 flex items-center justify-center text-[#525252] mt-0.5">•</span>
              )}

              <div>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className={`text-[9px] font-mono-tech px-2 py-0.5 rounded-[2px] font-bold border uppercase ${getNodeColor(node.type)}`}>
                    {node.type}
                  </span>
                  <span className="text-[10px] font-mono-tech text-[#525252]">
                    Confidence: <strong className="text-white">{node.confidence}%</strong>
                  </span>
                  {node.metricImpact && (
                    <span className="text-[10px] font-mono-tech text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.2 rounded-[2px]">
                      {node.metricImpact}
                    </span>
                  )}
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-[#F5F5F0] mb-0.5">{node.title}</h3>
                <p className="text-xs text-[#8A8A8A] leading-relaxed">{node.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              {node.type === 'Opportunity' && (
                <button
                  onClick={() => {
                    onShowToast(`Routing ${node.title} to Prioritization Matrix.`);
                    onNavigateTab('prioritize');
                  }}
                  className="btn-magnetic flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-[11px] font-mono-tech font-bold cursor-pointer transition-colors shadow-sm shadow-[#0066FF]/20"
                >
                  <SlidersHorizontal className="w-3 h-3" />
                  <span>Prioritize</span>
                </button>
              )}

              {node.type === 'Solution' && (
                <button
                  onClick={() => {
                    onShowToast('Opening PRD Spec Workspace for this solution.');
                    onNavigateTab('prds');
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] text-[#CCCCCC] hover:text-white text-[11px] font-mono-tech cursor-pointer transition-colors"
                >
                  <span>View PRD</span>
                </button>
              )}

              {node.type === 'Experiment' && (
                <button
                  onClick={() => {
                    onShowToast('Navigating to Experiment Lab.');
                    onNavigateTab('experiments');
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-[2px] bg-[#161616] hover:bg-[#202020] border border-[#2D2D2D] text-[#CCCCCC] hover:text-white text-[11px] font-mono-tech font-medium cursor-pointer transition-colors"
                >
                  <FlaskConical className="w-3 h-3 text-[#0066FF]" />
                  <span>Run Test</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="space-y-2 border-l border-[#1D1D1D]/70 ml-2.5 pl-2.5">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 animate-fade-in text-[#F5F5F0]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1D1D1D]">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[2px] bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#0066FF]">
              <GitFork className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight text-[#F5F5F0]">Visual Opportunity Solution Tree</h1>
              <p className="text-xs font-mono-tech text-[#8A8A8A]">
                Teresa Torres OST methodology: Business outcome · User problem · Need · Opportunity · Solution · Experiment
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onShowToast('Tree export generated in SVG / Markdown.')}
            className="px-2.5 py-1 rounded-[2px] bg-[#101010] hover:bg-[#141414] border border-[#1D1D1D] text-xs font-mono-tech text-[#CCCCCC] cursor-pointer transition-colors"
          >
            Export Diagram
          </button>
          <button
            onClick={() => {
              onShowToast('Created new branch in Opportunity Tree.');
            }}
            className="btn-magnetic flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] bg-[#0066FF] hover:bg-[#1A75FF] text-white text-xs font-mono-tech font-medium cursor-pointer transition-colors shadow-sm shadow-[#0066FF]/30"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Branch</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 p-3 rounded-[2px] bg-[#0A0A0A] border border-[#1D1D1D] overflow-x-auto text-[10px] font-mono-tech uppercase">
        <span className="text-[#525252]">Tree Hierarchy:</span>
        <span className="text-[#0066FF]">1. Outcome</span>
        <span className="text-[var(--text-tertiary)] px-0.5 font-sans">/</span>
        <span className="text-[#EF4444]">2. Problem</span>
        <span className="text-[var(--text-tertiary)] px-0.5 font-sans">/</span>
        <span className="text-[#F59E0B]">3. User Need</span>
        <span className="text-[var(--text-tertiary)] px-0.5 font-sans">/</span>
        <span className="text-[#0070F3]">4. Opportunity</span>
        <span className="text-[var(--text-tertiary)] px-0.5 font-sans">/</span>
        <span className="text-[#10B981]">5. Solution</span>
        <span className="text-[var(--text-tertiary)] px-0.5 font-sans">/</span>
        <span className="text-[#D4D4D4]">6. Experiment</span>
      </div>

      {/* Interactive Tree Hierarchy */}
      <div className="space-y-3">{renderNode(treeData)}</div>
    </div>
  );
};
