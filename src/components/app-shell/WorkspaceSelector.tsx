import React, { useState, useRef, useEffect } from 'react';
import { ChevronsUpDown, Check } from 'lucide-react';

interface WorkspaceSelectorProps {
  currentWorkspaceName?: string;
  onSelectWorkspace?: (workspaceId: string) => void;
  isCollapsed?: boolean;
}

export const WorkspaceSelector: React.FC<WorkspaceSelectorProps> = ({
  currentWorkspaceName = 'My Argus Workspace',
  onSelectWorkspace,
  isCollapsed = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const workspaces = [
    { id: 'ws-main', name: currentWorkspaceName, role: 'Owner' },
    { id: 'ws-demo', name: 'Argus Demo Workspace', role: 'Simulation' },
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
          className="w-7 h-7 rounded-[4px] bg-[var(--surface-2)] border border-[var(--border-subtle)] flex items-center justify-center text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
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
        className="group w-full flex items-center justify-between px-2.5 py-1.5 rounded-[4px] bg-transparent hover:bg-[var(--surface-2)] text-left transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="w-5 h-5 rounded-[4px] bg-[var(--surface-2)] border border-[var(--border-subtle)] flex items-center justify-center text-[11px] font-semibold text-[var(--text-primary)] flex-shrink-0">
            {currentWorkspaceName.charAt(0)}
          </div>
          <div className="truncate">
            <div className="text-[13px] font-medium text-[var(--text-primary)] font-sans truncate leading-tight">
              {currentWorkspaceName}
            </div>
            <div className="text-[11px] font-normal text-[var(--text-tertiary)] font-sans leading-none mt-0.5">
              Enterprise · Prod
            </div>
          </div>
        </div>
        <ChevronsUpDown className="w-3.5 h-3.5 text-[var(--text-tertiary)] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 p-1 bg-[var(--surface-3)] border border-[var(--border-default)] rounded-[4px] shadow-xl">
          <div className="px-2 py-1 text-[11px] font-medium text-[var(--text-tertiary)] font-sans">
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
                    isSelected ? 'bg-[var(--surface-2)] text-[var(--text-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-2)]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate text-[12px] font-medium font-sans">{ws.name}</span>
                    <span className="text-[11px] text-[var(--text-tertiary)] font-sans">({ws.role})</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[var(--signal-blue)] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
