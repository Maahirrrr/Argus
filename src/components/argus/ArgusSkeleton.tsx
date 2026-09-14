import React from 'react';

export interface ArgusSkeletonProps {
  className?: string;
  count?: number;
}

export const ArgusSkeleton: React.FC<ArgusSkeletonProps> = ({ className = '', count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`relative overflow-hidden rounded-[4px] bg-[#111111] animate-pulse ${className}`}
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.03)] to-transparent animate-[shimmer_2s_infinite]" />
        </div>
      ))}
    </>
  );
};

export const ArgusPageLoader: React.FC<{ message?: string }> = ({ message = 'INITIALIZING...' }) => {
  return (
    <div className="w-full h-72 flex flex-col items-center justify-center gap-3">
      <div className="w-6 h-6 border-2 border-[rgba(255,255,255,0.1)] border-t-[#0066FF] rounded-full animate-spin" />
      <span className="text-[11px] font-mono-tech tracking-wider text-[#666666]">{message}</span>
    </div>
  );
};
