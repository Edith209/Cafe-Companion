/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrandEmblem } from './BrandEmblem';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onTableClick?: () => void;
  onProfileClick?: () => void;
  cartCount?: number;
  onCartClick?: () => void;
  onSwitchToOperations?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  subtitle = 'Koramangala Roastery · Open',
  onTableClick,
  onProfileClick,
  cartCount = 0,
  onCartClick,
  onSwitchToOperations,
}) => {
  return (
    <header className="fixed top-0 w-full z-40 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] pt-safe">
      <div className="h-20 px-gutter flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-space-sm">
          <BrandEmblem size="sm" useImage={true} />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-on-surface leading-none tracking-tight">
                Café Companion
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                {subtitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          {/* Quick toggle to Roastery Operations KDS */}
          {onSwitchToOperations && (
            <button
              type="button"
              onClick={onSwitchToOperations}
              title="Open Roastery Staff KDS Terminal"
              className="px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-label-sm font-label-sm font-bold flex items-center gap-1 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
              <span className="hidden sm:inline">KDS Staff</span>
            </button>
          )}

          <button
            type="button"
            onClick={onTableClick}
            aria-label="Table Service Control"
            className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
          </button>

          {cartCount > 0 && onCartClick && (
            <button
              type="button"
              onClick={onCartClick}
              aria-label="Active Cart"
              className="w-11 h-11 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>
          )}

          <button
            type="button"
            onClick={onProfileClick}
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
