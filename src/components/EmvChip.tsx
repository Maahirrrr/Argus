import React from 'react';

export const EmvChip: React.FC<{ variant?: 'gold' | 'silver'; className?: string }> = ({ variant = 'gold', className = '' }) => {
  const isGold = variant === 'gold';
  return (
    <div className={`relative w-11 h-8 rounded-md overflow-hidden shadow-inner flex items-center justify-center p-[2px] ${className}`}
      style={{
        background: isGold
          ? 'linear-gradient(135deg, #d4af37 0%, #aa8c2c 50%, #f3e5ab 100%)'
          : 'linear-gradient(135deg, #e2e8f0 0%, #94a3b8 50%, #f8fafc 100%)',
        border: `1px solid ${isGold ? '#b8972f' : '#64748b'}`,
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)',
      }}
    >
      {/* Micro-printed chip circuit lines */}
      <svg viewBox="0 0 44 32" className="w-full h-full opacity-70" fill="none">
        <rect x="2" y="2" width="40" height="28" rx="3" stroke="#262626" strokeWidth="0.8" />
        <line x1="2" y1="11" x2="42" y2="11" stroke="#262626" strokeWidth="0.8" />
        <line x1="2" y1="21" x2="42" y2="21" stroke="#262626" strokeWidth="0.8" />
        <line x1="16" y1="2" x2="16" y2="30" stroke="#262626" strokeWidth="0.8" />
        <line x1="28" y1="2" x2="28" y2="30" stroke="#262626" strokeWidth="0.8" />
        <circle cx="22" cy="16" r="3.5" fill="#262626" opacity="0.3" />
      </svg>
    </div>
  );
};

export const ContactlessIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 text-zinc-400' }) => {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={className}>
      <path d="M8.5 16.5a5 5 0 0 1 0-9" />
      <path d="M12 19a8.5 8.5 0 0 1 0-14" />
      <path d="M15.5 21.5a12 12 0 0 1 0-19" />
    </svg>
  );
};
