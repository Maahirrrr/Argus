import React from 'react';

interface SignalParticleProps {
  pathD: string;
  color?: string;
  duration?: string;
  size?: number;
  reducedMotion?: boolean;
}

export const SignalParticle: React.FC<SignalParticleProps> = ({
  pathD,
  color = '#0066FF',
  duration = '0.95s',
  size = 2,
  reducedMotion = false,
}) => {
  if (reducedMotion) return null;

  return (
    <circle r={size} fill={color} filter="url(#argusParticleGlow)">
      <animateMotion
        path={pathD}
        dur={duration}
        repeatCount="1"
        fill="freeze"
        keyPoints="0; 0.7; 1"
        keyTimes="0; 0.6; 1"
        calcMode="spline"
        keySplines="0.16 1 0.3 1; 0.42 0 1 1"
      />
    </circle>
  );
};
