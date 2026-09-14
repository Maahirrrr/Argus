import React from 'react';

export interface GlowingEffectProps {
  active?: boolean;
  color?: string;
  blur?: number;
  className?: string;
}

export const GlowingEffect: React.FC<GlowingEffectProps> = ({
  active = false,
  color = 'rgba(0, 102, 255, 0.4)',
  blur = 8,
  className = '',
}) => {
  if (!active) return null;

  return (
    <div
      className={`pointer-events-none absolute -inset-[1px] rounded-[inherit] transition-opacity duration-200 ${className}`}
      style={{
        boxShadow: `0 0 ${blur}px 1px ${color}`,
        border: `1px solid ${color}`,
      }}
      aria-hidden="true"
    />
  );
};
