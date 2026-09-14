import React, { useRef, useState } from 'react';

export interface DirectionAwareHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const DirectionAwareHover: React.FC<DirectionAwareHoverProps> = ({
  children,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [borderOrigin, setBorderOrigin] = useState<string>('center');

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    const rad = Math.atan2(y, x);
    const deg = (rad * (180 / Math.PI) + 180) % 360;

    if (deg >= 45 && deg < 135) setBorderOrigin('top');
    else if (deg >= 135 && deg < 225) setBorderOrigin('right');
    else if (deg >= 225 && deg < 315) setBorderOrigin('bottom');
    else setBorderOrigin('left');
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      data-origin={borderOrigin}
      className={`relative transition-transform duration-150 ease-out hover:-translate-y-[1px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
