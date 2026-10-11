/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface StatusBadgeProps {
  label: string;
  variant?: 'budget_safe' | 'warning' | 'success' | 'station' | 'live' | 'pill';
  icon?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  variant = 'pill',
  icon,
  className = '',
}) => {
  const styles = {
    budget_safe: 'bg-[#C5ECCB] text-[#00210D] font-bold',
    warning: 'bg-[#F9DDD3] text-[#756058] font-semibold',
    success: 'bg-[#C5ECCB] text-[#00210D] font-bold',
    station: 'bg-[#F0EEE8] text-[#52443C] font-semibold',
    live: 'bg-[#597D61]/15 text-[#41644A] font-bold',
    pill: 'bg-[#F6F3ED] text-[#52443C] border border-[#E8E0D6] font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] tracking-wide uppercase shrink-0 ${styles[variant]} ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-[13px]">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};
