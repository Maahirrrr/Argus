import React from 'react';
import { motion } from 'motion/react';

export interface ArgusLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  variant?: 'default' | 'monochrome' | 'subtle' | 'drawing' | 'white' | 'dark';
  className?: string;
  withText?: boolean;
  showWordmark?: boolean;
  textClassName?: string;
  animated?: boolean;
  onClick?: () => void;
}

export const MONOGRAM_SVG_PATH = 'M 49.42 10 L 60.73 10.33 L 61.73 11.83 L 61.56 18.15 L 60.23 19.48 L 52.25 19.65 L 50.25 21.31 L 24.14 77.86 L 24.14 79.19 L 25.14 80.19 L 74.86 80.19 L 75.86 79.36 L 75.86 77.86 L 69.21 63.89 L 49.25 63.89 L 48.59 64.39 L 43.43 75.36 L 34.62 75.36 L 33.95 74.86 L 55.07 27.46 L 55.9 26.8 L 62.56 26.8 L 63.72 28.13 L 71.04 45.09 L 70.37 45.76 L 61.73 45.76 L 60.06 42.77 L 58.73 42.27 L 53.41 54.07 L 54.41 54.91 L 75.03 54.91 L 76.03 55.57 L 86.67 79.02 L 86.84 81.68 L 86.01 84.68 L 84.84 86.51 L 81.68 89 L 78.86 89.83 L 21.14 89.83 L 16.65 88 L 13.99 84.68 L 13.16 81.68 L 13.83 77.36 L 41.77 16.65 L 43.1 13.99 L 44.93 12 L 49.42 10 Z';

export const ArgusLogo: React.FC<ArgusLogoProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  withText,
  showWordmark,
  textClassName = '',
  animated = false,
  onClick,
}) => {
  const hasWordmark = showWordmark !== undefined ? showWordmark : Boolean(withText);

  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
    custom: '',
  };

  const isDark = variant === 'dark';

  const variantClassMap: Record<string, string> = {
    default: 'text-white argus-logo-hover',
    monochrome: 'text-white',
    white: 'text-white argus-logo-hover',
    dark: 'text-[#050505]',
    subtle: 'text-zinc-400 hover:text-white transition-colors duration-150',
    drawing: 'text-white',
  };

  const logoMarkup = variant === 'drawing' ? (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      className={`${sizeMap[size]} ${className} select-none`}
      aria-label="Argus Monogram"
    >
      <motion.path
        d={MONOGRAM_SVG_PATH}
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="#FFFFFF"
        initial={{ pathLength: 0, fillOpacity: 0 }}
        animate={{ pathLength: 1, fillOpacity: 1 }}
        transition={{
          pathLength: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          fillOpacity: { delay: 0.35, duration: 0.25, ease: 'easeOut' },
        }}
      />
    </svg>
  ) : animated ? (
    <motion.svg
      viewBox="0 0 100 100"
      fill="currentColor"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`${sizeMap[size]} ${variantClassMap[variant] || 'text-white'} ${className} select-none cursor-pointer`}
      aria-label="Argus Logo"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={MONOGRAM_SVG_PATH} />
    </motion.svg>
  ) : (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={`${sizeMap[size]} ${variantClassMap[variant] || 'text-white'} ${className} select-none`}
      aria-label="Argus Logo"
    >
      <path fillRule="evenodd" clipRule="evenodd" d={MONOGRAM_SVG_PATH} />
    </svg>
  );

  if (!hasWordmark) {
    return onClick ? (
      <button
        type="button"
        onClick={onClick}
        className="inline-flex items-center justify-center p-0 bg-transparent border-0 cursor-pointer focus:outline-none"
      >
        {logoMarkup}
      </button>
    ) : (
      logoMarkup
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 ${onClick ? 'cursor-pointer group' : ''}`}
    >
      {logoMarkup}
      <span
        className={`font-display font-extrabold tracking-widest ${
          isDark ? 'text-[#050505]' : 'text-[#F5F5F0]'
        } ${onClick && !isDark ? 'group-hover:text-white' : ''} ${textClassName || 'text-sm'}`}
      >
        ARGUS
      </span>
    </div>
  );
};
