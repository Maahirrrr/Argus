import React, { createContext, useContext, useState } from 'react';

interface FocusContextType {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const FocusContext = createContext<FocusContextType>({
  hoveredIndex: null,
  setHoveredIndex: () => {},
});

export interface FocusCardsProps {
  children: React.ReactNode;
  className?: string;
}

export const FocusCards: React.FC<FocusCardsProps> = ({ children, className = '' }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <FocusContext.Provider value={{ hoveredIndex, setHoveredIndex }}>
      <div className={className}>{children}</div>
    </FocusContext.Provider>
  );
};

export interface FocusCardItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  children: React.ReactNode;
}

export const FocusCardItem: React.FC<FocusCardItemProps> = ({
  index,
  children,
  className = '',
  ...props
}) => {
  const { hoveredIndex, setHoveredIndex } = useContext(FocusContext);
  const isHovered = hoveredIndex === index;
  const isOtherHovered = hoveredIndex !== null && !isHovered;

  return (
    <div
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      className={`transition-all duration-200 transform-gpu ${
        isHovered
          ? 'scale-[1.008] brightness-105 z-10'
          : isOtherHovered
          ? 'opacity-95 brightness-95'
          : 'opacity-100 brightness-100'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
