import React from 'react';
import { Search, X } from 'lucide-react';

export interface ArgusInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const ArgusInput = React.forwardRef<HTMLInputElement, ArgusInputProps>(
  ({ className = '', leftIcon, rightElement, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 text-[#666666] pointer-events-none flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full bg-[#080808] border border-[rgba(255,255,255,0.08)] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]/30 text-xs text-[#EDEDED] placeholder-[#555555] rounded-[6px] py-2 transition-all outline-none ${
            leftIcon ? 'pl-9' : 'pl-3'
          } ${rightElement ? 'pr-9' : 'pr-3'} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2.5 flex items-center">
            {rightElement}
          </div>
        )}
      </div>
    );
  }
);
ArgusInput.displayName = 'ArgusInput';

export interface ArgusSearchProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
}

export const ArgusSearch: React.FC<ArgusSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  onClear,
}) => {
  return (
    <ArgusInput
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={className}
      leftIcon={<Search className="w-3.5 h-3.5" />}
      rightElement={
        value ? (
          <button
            onClick={() => {
              onChange('');
              if (onClear) onClear();
            }}
            className="p-0.5 rounded text-[#666] hover:text-[#EDEDED] cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <kbd className="text-[10px] font-mono-tech px-1.5 py-0.5 rounded bg-[#161616] text-[#666666] border border-[rgba(255,255,255,0.06)] pointer-events-none">
            /
          </kbd>
        )
      }
    />
  );
};
