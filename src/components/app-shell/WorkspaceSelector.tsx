import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Check, Plus, ShieldCheck } from 'lucide-react';

interface WorkspaceSelectorProps {
  currentWorkspaceName?: string;
  onSelectWorkspace?: (workspaceId: string) => void;
  isCollapsed?: boolean;
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  currentWorkspaceName = 'My ARGUS Workspace',
  onSelectWorkspace,
  isCollapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const workspaces = [
    { id: 'ws-main', name: currentWorkspaceName, role: 'Owner' },
    { id: 'ws-demo', name: 'ARGUS Demo Workspace', role: 'Simulation' },
  ];

  const [selectedId, setSelectedId] = useState('ws-main');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsOpen(false);
    if (onSelectWorkspace) onSelectWorkspace(id);
  };

  if (isCollapsed) {
    return (
      <div className="flex justify-center py-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-[6px] bg-[#141414] border border-[#222222] flex items-center justify-center text-xs font-bold text-[#EDEDED] hover:border-[#333333] transition-colors"
          title={currentWorkspaceName}
        >
          {currentWorkspaceName.charAt(0)}
        </button>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-[6px] bg-[#0A0A0A] hover:bg-[#121212] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.14)] text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2 truncate">
          <div className="w-5 h-5 rounded-[4px] bg-[#141414] border border-[#262626] flex items-center justify-center text-[10px] font-bold text-[#EDEDED] flex-shrink-0">
            {currentWorkspaceName.charAt(0)}
          </div>
          <div className="truncate">
            <div className="text-[12px] font-medium text-[#EDEDED] truncate leading-tight">
              {currentWorkspaceName}
            </div>
            <div className="text-[10px] text-[#666666] font-mono-tech leading-none mt-0.5">
              Enterprise · PROD
            </div>
          </div>
        </div>
        <ChevronsUpDown className="w-3.5 h-3.5 text-[#666666] flex-shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 p-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.10)] rounded-[8px] shadow-2xl animate-fade-in-scale">
          <div className="px-2 py-1 text-[10px] uppercase font-mono-tech tracking-wider text-[#666666]">
            Workspaces
          </div>
          <div className="space-y-0.5 mt-0.5">
            {workspaces.map((ws) => {
              const isSelected = selectedId === ws.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => handleSelect(ws.id)}
                  className={`w-full flex items-center justify-between px-2 py-1.5 rounded-[4px] text-xs transition-colors cursor-pointer ${
                    isSelected ? 'bg-[#141414] text-[#EDEDED]' : 'text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#0F0F0F]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate text-[12px] font-medium">{ws.name}</span>
                    <span className="text-[10px] font-mono-tech text-[#666666]">({ws.role})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#0070F3] flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-1 pt-1 border-t border-[rgba(255,255,255,0.08)]">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-1.5 px-2 py-1.5 text-xs text-[#A1A1A1] hover:text-[#EDEDED] hover:bg-[#0F0F0F] rounded-[4px] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#666666]" />
              <span className="text-[11px]">Create workspace</span>
            </button>
            <div className="px-2 py-1 flex items-center gap-1.5 text-[9.5px] font-mono-tech text-[#666666]">
              <ShieldCheck className="w-3 h-3 text-[#46A758]" />
              <span>Row-Level Security Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
