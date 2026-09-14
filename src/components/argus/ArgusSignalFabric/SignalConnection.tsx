import React from 'react';

interface SignalConnectionProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isHighlighted?: boolean;
  isDimmed?: boolean;
  isActiveFlow?: boolean;
}

export const SignalConnection: React.FC<SignalConnectionProps> = ({
  startX,
  startY,
  endX,
  endY,
  isHighlighted = false,
  isDimmed = false,
  isActiveFlow = false,
}) => {
  const midX = (startX + endX) / 2;
  const pathD = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

  const strokeColor = isHighlighted || isActiveFlow ? '#0066FF' : '#1D1D1D';
  const strokeWidth = isHighlighted || isActiveFlow ? 1.5 : 1;
  const opacity = isDimmed ? 0.15 : isHighlighted || isActiveFlow ? 1 : 0.6;

  return (
    <path
      d={pathD}
      fill="none"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeOpacity={opacity}
      strokeDasharray={isActiveFlow ? '3 3' : undefined}
      className="transition-all duration-200"
    />
  );
};
