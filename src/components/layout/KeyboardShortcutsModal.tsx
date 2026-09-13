import React, { useEffect } from 'react';
import { X, Command } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsModal: React.FC<KeyboardShortcutsModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shortcutGroups = [
    {
      title: 'GLOBAL COMMANDS',
      shortcuts: [
        { keys: ['⌘', 'K'], label: 'Open Command Palette' },
        { keys: ['?'], label: 'Toggle Keyboard Shortcuts' },
        { keys: ['Esc'], label: 'Close Active Modal / Drawer' },
      ],
    },
    {
      title: 'NAVIGATION SHORTCUTS (G then ...)',
      shortcuts: [
        { keys: ['G', 'O'], label: 'Go to Overview Cockpit' },
        { keys: ['G', 'S'], label: 'Go to Signals Queue' },
        { keys: ['G', 'I'], label: 'Go to Causal Insights' },
        { keys: ['G', 'P'], label: 'Go to Opportunities Inbox' },
        { keys: ['G', 'R'], label: 'Go to Prioritization' },
        { keys: ['G', 'D'], label: 'Go to PRD Workspace' },
        { keys: ['G', 'E'], label: 'Go to Experiment Lab' },
        { keys: ['G', 'C'], label: 'Go to AI Copilot & SQL' },
        { keys: ['G', 'K'], label: 'Go to Workspace Settings' },
      ],
    },
    {
      title: 'ACTION SHORTCUTS',
      shortcuts: [
        { keys: ['C'], label: 'Quick Navigate to Opportunities' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-[#1D1D1D] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Command className="w-4 h-4 text-[#0066FF]" />
            <h2 className="text-xs font-bold text-[#F5F5F0] font-mono-tech tracking-wider uppercase">
              KEYBOARD SHORTCUTS
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414] rounded cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs font-mono-tech no-scrollbar">
          {shortcutGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <span className="text-[10px] text-[#525252] uppercase tracking-wider font-bold block">
                {group.title}
              </span>
              <div className="space-y-1.5">
                {group.shortcuts.map((sc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-[2px] bg-[#070707] border border-[#141414]"
                  >
                    <span className="text-[#8A8A8A]">{sc.label}</span>
                    <div className="flex items-center gap-1">
                      {sc.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-1.5 py-0.5 rounded-[2px] bg-[#161616] border border-[#2E2E2E] text-[10px] font-bold text-[#F5F5F0]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#070707] border-t border-[#1D1D1D] text-[11px] font-mono-tech text-center text-[#525252]">
          Press <kbd className="px-1 py-0.2 bg-[#141414] rounded text-[#8A8A8A]">Esc</kbd> or click X to dismiss
        </div>
      </div>
    </div>
  );
};
