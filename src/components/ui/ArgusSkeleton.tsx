import React from 'react';

export interface ArgusSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const ArgusSkeleton: React.FC<ArgusSkeletonProps> = ({
  className = '',
  ...props
}) => {
  return (
    <div
      className={`animate-pulse bg-[#141414] rounded-[2px] ${className}`}
      {...props}
    />
  );
};
