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
        { keys: ['G', 'S'], label: 'Go to Product Signals Queue' },
        { keys: ['G', 'I'], label: 'Go to Causal Insights Module' },
        { keys: ['G', 'P'], label: 'Go to Prioritization Workbench' },
        { keys: ['G', 'R'], label: 'Go to PRD Workspace' },
        { keys: ['G', 'E'], label: 'Go to Experiment Lab' },
        { keys: ['G', 'A'], label: 'Go to ClickHouse Analytics' },
        { keys: ['G', 'C'], label: 'Go to AI Copilot' },
      ],
    },
    {
      title: 'ACTION SHORTCUTS',
      shortcuts: [
        { keys: ['C'], label: 'Create / Accept Action' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm select-none">
      <div className="w-full max-w-md bg-[#0A0A0A] border border-[#1D1D1D] rounded-[4px] shadow-2xl overflow-hidden flex flex-col">
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
            className="p-1 text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#141414] rounded-[2px] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-4 space-y-4 max-h-[75vh] overflow-y-auto font-mono-tech text-xs">
          {shortcutGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[10px] text-[#525252] uppercase tracking-wider block font-bold">
                {group.title}
              </span>
              <div className="space-y-1.5">
                {group.shortcuts.map((s, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between py-1 border-b border-[#141414]">
                    <span className="text-[#8A8A8A] text-[11px]">{s.label}</span>
                    <div className="flex items-center gap-1">
                      {s.keys.map((k, kIdx) => (
                        <kbd
                          key={kIdx}
                          className="px-1.5 py-0.5 rounded-[2px] bg-[#141414] border border-[#2E2E2E] text-[10px] text-[#F5F5F0] font-bold"
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
        <div className="p-3 border-t border-[#1D1D1D] bg-[#050505] text-[10px] font-mono-tech text-[#525252] flex items-center justify-between">
          <span>Press ESC anytime to close</span>
          <span className="text-[#8A8A8A]">TAPWISE OS</span>
        </div>
      </div>
    </div>
  );
};
