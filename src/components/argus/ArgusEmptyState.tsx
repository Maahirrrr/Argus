import React from 'react';
import { AlertCircle, PlusCircle, RefreshCw } from 'lucide-react';
import { ArgusButton } from './ArgusButton';

export interface ArgusEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const ArgusEmptyState: React.FC<ArgusEmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 border border-dashed border-[rgba(255,255,255,0.10)] rounded-[8px] bg-[#070707] ${className}`}
    >
      <div className="w-10 h-10 rounded-full bg-[#121212] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#8A8A8A] mb-3">
        {icon || <PlusCircle className="w-5 h-5 text-[#8A8A8A]" />}
      </div>
      <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1">{title}</h4>
      <p className="text-xs text-[#8A8A8A] max-w-sm mb-4 leading-relaxed font-mono-tech">
        {description}
      </p>
      {actionLabel && onAction && (
        <ArgusButton variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </ArgusButton>
      )}
    </div>
  );
};

export interface ArgusErrorStateProps {
  title?: string;
  message?: string;
  lastSync?: string;
  onRetry?: () => void;
  className?: string;
}

export const ArgusErrorState: React.FC<ArgusErrorStateProps> = ({
  title = 'Service Connection Interrupted',
  message = 'Unable to ingest latest telemetry events from upstream pipeline.',
  lastSync = '12 minutes ago',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 border border-[#EF4444]/25 rounded-[8px] bg-[#EF4444]/5 text-[#EF4444] ${className}`}
    >
      <AlertCircle className="w-6 h-6 mb-2 text-[#EF4444]" />
      <h4 className="text-xs font-semibold uppercase tracking-wider mb-1">{title}</h4>
      <p className="text-xs text-[#A1A1A1] max-w-sm mb-2">{message}</p>
      <span className="text-[10px] font-mono-tech text-[#666666] mb-3">Last successful sync: {lastSync}</span>
      {onRetry && (
        <ArgusButton
          variant="outline"
          size="xs"
          onClick={onRetry}
          leftIcon={<RefreshCw className="w-3 h-3" />}
        >
          Retry Connection
        </ArgusButton>
      )}
    </div>
  );
};
