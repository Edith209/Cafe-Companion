/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface OperationsHeaderProps {
  onSimulateRush?: () => void;
  isRushActive?: boolean;
  onNotificationClick?: () => void;
  onToggleMobileSidebar?: () => void;
  onSwitchToCustomer?: () => void;
}

export const OperationsHeader: React.FC<OperationsHeaderProps> = ({
  onSimulateRush,
  isRushActive = false,
  onNotificationClick,
  onToggleMobileSidebar,
  onSwitchToCustomer,
}) => {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-xl z-40 px-gutter-desktop flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-3 sm:gap-4">
        {onToggleMobileSidebar && (
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>
        )}

        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
          Café Companion · Staff Terminal
        </span>
        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed shrink-0">
          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
          <span className="font-label-sm text-label-sm font-semibold tracking-wide uppercase">
            Accepting Orders
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-5">
        {onSwitchToCustomer && (
          <button
            type="button"
            onClick={onSwitchToCustomer}
            title="Switch to Customer App"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-all font-semibold"
          >
            <span className="material-symbols-outlined text-[16px] text-primary">smartphone</span>
            <span>Customer App</span>
          </button>
        )}

        <div className="hidden xl:flex items-center gap-2 text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-lg">
          <span className="material-symbols-outlined text-[18px]">schedule</span>
          <span className="font-label-md text-label-md font-semibold text-on-surface">
            Sunday Service · 11:38 AM
          </span>
        </div>

        <button
          type="button"
          onClick={onSimulateRush}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-lg font-label-md text-label-md font-semibold transition-all active:scale-95 ${
            isRushActive
              ? 'bg-primary text-on-primary ring-2 ring-primary-fixed'
              : 'bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span>{isRushActive ? 'Rush Spiked' : 'Simulate Rush'}</span>
        </button>

        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="Staff Notifications"
          className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary"></span>
        </button>

        <div className="h-6 w-px bg-surface-container-high hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col text-right">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Lead Barista Varun
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Espresso Bar 01
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
