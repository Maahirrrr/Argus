import React from 'react';
import { motion } from 'motion/react';

export interface TracingBeamProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  active?: boolean;
}

export const TracingBeam: React.FC<TracingBeamProps> = ({
  orientation = 'horizontal',
  className = '',
  active = true,
}) => {
  if (orientation === 'horizontal') {
    return (
      <div className={`relative w-full h-[2px] bg-[#1D1D1D] overflow-hidden ${className}`} aria-hidden="true">
        {active && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: 'easeInOut',
            }}
            className="absolute top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-[#0066FF] to-transparent"
          />
        )}
      </div>
    );
  }

  return (
    <div className={`relative h-full w-[2px] bg-[#1D1D1D] overflow-hidden ${className}`} aria-hidden="true">
      {active && (
        <motion.div
          initial={{ y: '-100%' }}
          animate={{ y: '200%' }}
          transition={{
            repeat: Infinity,
            duration: 2.2,
            ease: 'easeInOut',
          }}
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-[#0066FF] to-transparent"
        />
      )}
    </div>
  );
};
