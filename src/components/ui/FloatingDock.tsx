import React from 'react';
import { motion } from 'motion/react';

export interface FloatingDockItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick: () => void;
}

export interface FloatingDockProps {
  items: FloatingDockItem[];
  className?: string;
}

export const FloatingDock: React.FC<FloatingDockProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`fixed bottom-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 p-1.5 rounded-[4px] bg-[#070707]/90 backdrop-blur-md border border-[#1D1D1D] shadow-2xl select-none ${className}`}
    >
      {items.map((item) => (
        <motion.button
          key={item.id}
          type="button"
          onClick={item.onClick}
          whileTap={{ scale: 0.94 }}
          className={`relative p-2 rounded-[2px] text-xs font-mono-tech flex flex-col items-center justify-center transition-colors cursor-pointer ${
            item.active
              ? 'text-white bg-[#141414]'
              : 'text-[#8A8A8A] hover:text-[#F5F5F0] hover:bg-[#0E0E0E]'
          }`}
          title={item.title}
        >
          {item.icon}
          {item.active && (
            <motion.div
              layoutId="activeDockPill"
              className="absolute -bottom-0.5 w-3 h-[2px] bg-[#0066FF] rounded-full"
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
