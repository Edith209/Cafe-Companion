/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CustomerNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  ordersBadge?: boolean;
}

export const CustomerNav: React.FC<CustomerNavProps> = ({
  currentPath,
  onNavigate,
  ordersBadge = true,
}) => {
  const tabs = [
    {
      id: 'discover',
      path: '/discover',
      label: 'Discover',
      icon: 'local_cafe',
    },
    {
      id: 'menu',
      path: '/recommendations',
      label: 'Menu',
      icon: 'menu_book',
    },
    {
      id: 'my-orders',
      path: '/orders/CC-1048',
      label: 'My Orders',
      icon: 'receipt_long',
      hasBadge: ordersBadge,
    },
    {
      id: 'cafe-pulse',
      path: '/cafe-pulse',
      label: 'Café Pulse',
      icon: 'sensors',
    },
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(53,37,31,0.04)] border-t border-outline-variant/30">
      <div className="flex justify-around items-center h-16 px-space-xs max-w-lg mx-auto">
        {tabs.map((tab) => {
          const isActive =
            (tab.id === 'discover' && currentPath === '/discover') ||
            (tab.id === 'menu' && currentPath === '/recommendations') ||
            (tab.id === 'my-orders' && currentPath.startsWith('/orders')) ||
            (tab.id === 'cafe-pulse' && currentPath === '/cafe-pulse');

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onNavigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-[44px] transition-colors relative ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[22px] ${
                  isActive ? 'material-symbols-filled' : ''
                }`}
              >
                {tab.icon}
              </span>
              <span className="font-label-md text-label-md mt-0.5">
                {tab.label}
              </span>
              {tab.hasBadge && (
                <span className="absolute top-2 right-1/4 w-2 h-2 rounded-full bg-primary ring-2 ring-surface animate-pulse"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
