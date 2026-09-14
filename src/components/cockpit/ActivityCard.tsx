import React from 'react';
import { Activity, GitBranch, FileText, FlaskConical, Lightbulb } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface ActivityCardProps {
  onNavigateTab?: (tab: NavigationTab) => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ onNavigateTab }) => {
  const activities: { time: string; title: string; author: string; icon: React.FC<{ className?: string }>; tab: NavigationTab }[] = [
    { time: '08:42', title: 'Payment anomaly signal flagged', author: 'ARGUS Sentry', icon: Activity, tab: 'signals' },
    { time: '08:37', title: 'Opportunity #014 prioritized to High', author: 'Mahir K.', icon: Lightbulb, tab: 'opportunities' },
    { time: '08:32', title: 'PRD Studio generated spec v2.1', author: 'AI Copilot', icon: FileText, tab: 'prds' },
    { time: '08:18', title: 'Circuit breaker experiment deployed', author: 'Arjun S.', icon: FlaskConical, tab: 'experiments' },
    { time: '07:55', title: 'ClickHouse migration ADR-041 signed off', author: 'Team', icon: GitBranch, tab: 'decisions' },
  ];

  return (
    <div className="p-4 rounded-[8px] bg-[#080808] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] hover:bg-[#0A0A0A] transition-all select-none flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-2 border-b border-[rgba(255,255,255,0.06)]">
          <span className="text-[13px] font-medium text-[#EDEDED]">Recent Activity</span>
          <span className="text-[11px] font-mono-tech text-[#666666]">Chronological</span>
        </div>

        <div className="mt-2 space-y-1.5">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.time + act.title}
                onClick={() => onNavigateTab && onNavigateTab(act.tab)}
                className="flex items-center justify-between p-1.5 rounded-[4px] hover:bg-[#121212] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 truncate">
                  <span className="text-[10px] font-mono-tech text-[#666666]">{act.time}</span>
                  <Icon className="w-3.5 h-3.5 text-[#A1A1A1] flex-shrink-0" />
                  <span className="text-xs text-[#EDEDED] truncate">{act.title}</span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#666666] flex-shrink-0 ml-2">
                  {act.author}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[rgba(255,255,255,0.06)] text-[11px] text-[#666666] font-mono-tech flex items-center justify-between">
        <span>Activity Log Active</span>
        <span>Audit Trail Enabled</span>
      </div>
    </div>
  );
};
