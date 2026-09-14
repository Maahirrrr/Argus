import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, Radio } from 'lucide-react';
import type { NavigationTab } from '../../types/argus';

interface NotificationCenterProps {
  onNavigateTab: (tab: NavigationTab) => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const notifications = [
    {
      id: 'n1',
      title: 'Retention Anomaly Flagged',
      desc: 'APAC checkout latency correlation (+18.4%)',
      time: '8m ago',
      unread: true,
      tab: 'signals' as NavigationTab,
    },
    {
      id: 'n2',
      title: 'Opportunity Priority Shift',
      desc: 'Zero-friction checkout failover moved to #1',
      time: '24m ago',
      unread: true,
      tab: 'opportunities' as NavigationTab,
    },
    {
      id: 'n3',
      title: 'PRD Ready for Engineering',
      desc: 'Checkout redesign passed validation',
      time: '1h ago',
      unread: false,
      tab: 'prds' as NavigationTab,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={popoverRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-[6px] text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#121212] transition-colors relative cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#0070F3]" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 z-50 w-80 p-2 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[8px] shadow-2xl animate-fade-in-scale">
          <div className="flex items-center justify-between pb-2 mb-1 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#EDEDED]">
              <Radio className="w-3.5 h-3.5 text-[#0070F3]" />
              <span>Intelligence Feed</span>
            </div>
            <span className="text-[10px] font-mono-tech text-[#666666]">2 unread</span>
          </div>

          <div className="space-y-1">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  setIsOpen(false);
                  onNavigateTab(n.tab);
                }}
                className={`p-2 rounded-[4px] transition-colors cursor-pointer ${
                  n.unread ? 'bg-[#101010] hover:bg-[#141414]' : 'hover:bg-[#0F0F0F]'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#EDEDED] truncate">{n.title}</span>
                  <span className="text-[10px] font-mono-tech text-[#666666] flex-shrink-0 ml-2">
                    {n.time}
                  </span>
                </div>
                <div className="text-[11px] text-[#A1A1A1] mt-0.5 line-clamp-1">
                  {n.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-1.5 border-t border-[rgba(255,255,255,0.08)] flex items-center justify-between text-[11px] text-[#666666]">
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-[#EDEDED] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Check className="w-3 h-3" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigateTab('intelligence');
              }}
              className="text-[#0070F3] hover:underline cursor-pointer"
            >
              Open Center →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
