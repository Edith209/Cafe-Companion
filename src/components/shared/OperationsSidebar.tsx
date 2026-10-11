/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface OperationsSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const OperationsSidebar: React.FC<OperationsSidebarProps> = ({
  currentPath,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'overview',
      path: '/operations',
      label: 'Overview',
      icon: 'dashboard',
      badge: null,
    },
    {
      id: 'live-orders',
      path: '/operations',
      label: 'Live Orders',
      icon: 'receipt_long',
      badge: '14',
    },
    {
      id: 'preparation-stations',
      path: '/operations',
      label: 'Preparation Stations',
      icon: 'skillet',
      badge: null,
    },
    {
      id: 'menu-and-availability',
      path: '/operations',
      label: 'Menu & Availability',
      icon: 'menu_book',
      badge: null,
    },
    {
      id: 'cafe-pulse',
      path: '/cafe-pulse',
      label: 'Café Pulse',
      icon: 'insights',
      badge: null,
    },
    {
      id: 'roastery-settings',
      path: '/operations',
      label: 'Roastery Settings',
      icon: 'tune',
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-xs"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-72 bg-surface-container-lowest z-50 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 px-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-on-primary text-[22px]">coffee</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">
                Café Companion
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                Roastery Core OS
              </span>
            </div>
            {onCloseMobile && (
              <button
                type="button"
                onClick={onCloseMobile}
                className="ml-auto lg:hidden p-1 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>

          <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between mx-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0">
                storefront
              </span>
              <div className="flex flex-col truncate">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate">
                  Koramangala Roastery
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  Bengaluru · Bar 01
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0">
              unfold_more
            </span>
          </div>

          <nav className="flex flex-col gap-1.5 mt-2">
            {navItems.map((item) => {
              const isActive =
                (item.id === 'cafe-pulse' && currentPath === '/cafe-pulse') ||
                (item.id === 'overview' && currentPath === '/operations');

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onNavigate(item.path);
                    if (onCloseMobile) onCloseMobile();
                  }}
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all text-left ${
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-body-md text-body-md">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto bg-primary text-on-primary text-label-sm font-label-sm px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick link to Customer Experience */}
          <div className="px-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onNavigate('/discover');
                if (onCloseMobile) onCloseMobile();
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">
                  smartphone
                </span>
                <span>Open Customer App</span>
              </div>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                arrow_forward
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3 px-2">
          <div className="bg-surface-container rounded-xl p-3 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                Extraction Temp
              </span>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                93.4°C · Stable
              </span>
            </div>
            <span className="material-symbols-outlined text-tertiary text-[20px]">
              check_circle
            </span>
          </div>
          <div className="text-center font-label-sm text-label-sm text-on-surface-variant py-1">
            Terminal build v2.4.12 · KDS Active
          </div>
        </div>
      </aside>
    </>
  );
};
