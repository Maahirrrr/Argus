import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { GlobalCommandPalette } from './GlobalCommandPalette';
import type { NavigationTab } from '../../types/argus';

interface AppShellProps {
  activeTab: NavigationTab;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenShortcuts: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  activeTab,
  onNavigateTab,
  onOpenShortcuts,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('argus_sidebar_collapsed') === 'true';
  });

  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('argus_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen w-full bg-[#050505] text-[#FFFFFF] overflow-hidden select-none">
      {/* 1. Persistent Left Sidebar (240px / 48px rail) */}
      <Sidebar
        activeTab={activeTab}
        onNavigateTab={onNavigateTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* 2. Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-[#050505]">
        {/* TopBar (strictly 48px) */}
        <TopBar
          activeTab={activeTab}
          onNavigateTab={onNavigateTab}
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          onOpenShortcuts={onOpenShortcuts}
        />

        {/* Dynamic Tool Workspace: Left-aligned, max-width 1200px, 24px top / 32px side padding */}
        <main className="flex-1 overflow-y-auto bg-[#050505] pt-6 px-4 sm:px-8 pb-20 md:pb-8">
          <div className="max-w-[1200px] w-full mr-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 3. Global Command Palette (⌘K) */}
      <GlobalCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigateTab={onNavigateTab}
      />
    </div>
  );
};
