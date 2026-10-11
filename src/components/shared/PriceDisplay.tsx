/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { formatPaiseToRupees } from '../../lib/currency';

interface PriceDisplayProps {
  paise: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'espresso' | 'muted' | 'success';
  className?: string;
  prefix?: string;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  paise,
  size = 'md',
  weight = 'bold',
  color = 'espresso',
  className = '',
  prefix = '',
}) => {
  const sizeMap = {
    sm: 'text-[12px]',
    md: 'text-[15px]',
    lg: 'text-[18px]',
    xl: 'text-[24px]',
  };

  const weightMap = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorMap = {
    primary: 'text-[#874D27]',
    espresso: 'text-[#1C1C18]',
    muted: 'text-[#6E5A53]',
    success: 'text-[#41644A]',
  };

  const formatted = formatPaiseToRupees(paise);

  return (
    <span className={`tabular-nums font-sans ${sizeMap[size]} ${weightMap[weight]} ${colorMap[color]} ${className}`}>
      {prefix}{formatted}
    </span>
  );
};
