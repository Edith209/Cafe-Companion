/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Button } from './Buttons';

export const LoadingIndicator: React.FC<{ message?: string; className?: string }> = ({
  message = 'Brewing your experience...',
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center p-8 gap-3 text-center ${className}`}>
    <div className="w-12 h-12 rounded-2xl bg-[#F9DDD3] flex items-center justify-center text-[#874D27] animate-bounce">
      <span className="material-symbols-outlined text-[24px]">coffee</span>
    </div>
    <span className="text-[13px] font-semibold text-[#52443C]">{message}</span>
  </div>
);

export const ErrorMessage: React.FC<{
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({
  title = 'Something went wrong',
  message = 'We encountered an issue communicating with the roastery station.',
  onRetry,
  className = '',
}) => (
  <div className={`p-5 rounded-2xl bg-[#FFDAD6]/40 border border-[#FFDAD6] text-[#93000A] flex flex-col items-center text-center gap-3 ${className}`}>
    <span className="material-symbols-outlined text-[28px] text-[#BA1A1A]">error</span>
    <div className="flex flex-col">
      <span className="font-bold text-[14px] text-[#93000A]">{title}</span>
      <span className="text-[12px] text-[#52443C] mt-0.5 max-w-sm">{message}</span>
    </div>
    {onRetry && (
      <Button variant="secondary" size="sm" onClick={onRetry}>
        Try Again
      </Button>
    )}
  </div>
);

export const EmptyState: React.FC<{
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}> = ({
  icon = 'shopping_bag',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => (
  <div className={`p-8 rounded-2xl bg-[#F6F3ED] border border-[#E8E0D6] flex flex-col items-center text-center gap-3 ${className}`}>
    <div className="w-12 h-12 rounded-full bg-[#F0EEE8] text-[#874D27] flex items-center justify-center">
      <span className="material-symbols-outlined text-[24px]">{icon}</span>
    </div>
    <div className="flex flex-col">
      <h3 className="font-serif font-bold text-[17px] text-[#1C1C18]">{title}</h3>
      <p className="text-[13px] text-[#52443C] mt-0.5 max-w-xs">{description}</p>
    </div>
    {actionLabel && onAction && (
      <Button variant="primary" size="sm" onClick={onAction}>
        {actionLabel}
      </Button>
    )}
  </div>
);
