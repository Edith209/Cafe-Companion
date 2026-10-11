/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Café Companion — Unified Lightweight Router & Dev Switcher
 * Supports responsive transitions between Customer and Operations experiences.
 */

import React, { useState, useEffect, createContext, useContext } from 'react';
import { CustomerHome } from '../components/customer/CustomerHome';
import { SmartRecommendations } from '../components/customer/SmartRecommendations';
import { OrderBuilderCheckout } from '../components/customer/OrderBuilderCheckout';
import { LiveOrderTracking } from '../components/customer/LiveOrderTracking';
import { RoasteryCommandCenter } from '../components/operations/RoasteryCommandCenter';
import { CafePulseIntelligence } from '../components/operations/CafePulseIntelligence';

interface NavigationContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
  isDevToolbarOpen: boolean;
  setIsDevToolbarOpen: (open: boolean) => void;
  viewportMode: 'auto' | 'mobile_frame' | 'desktop';
  setViewportMode: (mode: 'auto' | 'mobile_frame' | 'desktop') => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const AppRouter: React.FC = () => {
  // Normalize initial path from window.location
  const getInitialPath = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return '/discover';
    return path;
  };

  const [currentPath, setCurrentPath] = useState<string>(getInitialPath);
  const [isDevToolbarOpen, setIsDevToolbarOpen] = useState<boolean>(false);
  const [viewportMode, setViewportMode] = useState<'auto' | 'mobile_frame' | 'desktop'>('auto');

  // Synchronize with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path === '/' || path === '' ? '/discover' : path);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Extract route parameters
  const getRouteInfo = (path: string): { route: string; params: Record<string, string> } => {
    if (path === '/' || path === '/discover') {
      return { route: '/discover', params: {} };
    }
    if (path === '/recommendations') {
      return { route: '/recommendations', params: {} };
    }
    if (path === '/checkout') {
      return { route: '/checkout', params: {} };
    }
    if (path.startsWith('/orders/')) {
      const orderId = path.split('/orders/')[1] || 'CC-1048';
      return { route: '/orders/:orderId', params: { orderId } };
    }
    if (path === '/operations') {
      return { route: '/operations', params: {} };
    }
    if (path === '/cafe-pulse') {
      return { route: '/cafe-pulse', params: {} };
    }
    return { route: '404', params: {} };
  };

  const { route, params } = getRouteInfo(currentPath);

  const screens = [
    { path: '/discover', label: '1. Customer Home', audience: 'Customer (Mobile)' },
    { path: '/recommendations', label: '2. Smart Recs', audience: 'Customer (Mobile)' },
    { path: '/checkout', label: '3. Order Checkout', audience: 'Customer (Mobile)' },
    { path: '/orders/CC-1048', label: '4. Live Tracking', audience: 'Customer (Mobile)' },
    { path: '/operations', label: '5. Roastery KDS', audience: 'Operations (Desktop)' },
    { path: '/cafe-pulse', label: '6. Café Pulse', audience: 'Operations (Desktop)' },
  ];

  // Render content according to route
  const renderScreen = () => {
    switch (route) {
      case '/discover':
        return <CustomerHome onNavigate={navigate} />;
      case '/recommendations':
        return <SmartRecommendations onNavigate={navigate} />;
      case '/checkout':
        return <OrderBuilderCheckout onNavigate={navigate} />;
      case '/orders/:orderId':
        return <LiveOrderTracking orderId={params.orderId} onNavigate={navigate} />;
      case '/operations':
        return <RoasteryCommandCenter onNavigate={navigate} />;
      case '/cafe-pulse':
        return <CafePulseIntelligence onNavigate={navigate} />;
      default:
        return (
          <div className="min-h-screen bg-[#FCF9F3] text-[#1C1C18] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[#F9DDD3] text-[#874D27] flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[32px]">near_me_disabled</span>
            </div>
            <h1 className="font-serif font-bold text-[28px] text-[#1C1C18]">Route Not Found</h1>
            <p className="text-[14px] text-[#52443C] max-w-sm mt-1 mb-6">
              The requested extraction path <code className="bg-[#F0EEE8] px-2 py-0.5 rounded font-mono text-[#874D27]">{currentPath}</code> does not exist in the roastery terminal.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate('/discover')}
                className="px-4 py-2.5 rounded-xl bg-[#874D27] text-white font-bold text-[13px]"
              >
                Go to Customer Home
              </button>
              <button
                type="button"
                onClick={() => navigate('/operations')}
                className="px-4 py-2.5 rounded-xl bg-[#F0EEE8] text-[#1C1C18] font-bold text-[13px] border border-[#E8E0D6]"
              >
                Roastery Command
              </button>
            </div>
          </div>
        );
    }
  };

  const isCustomerScreen = ['/discover', '/recommendations', '/checkout', '/orders/:orderId'].includes(route);

  return (
    <NavigationContext.Provider
      value={{
        currentPath,
        navigate,
        params,
        isDevToolbarOpen,
        setIsDevToolbarOpen,
        viewportMode,
        setViewportMode,
      }}
    >
      {/* Quick Development Switcher & Viewport Toolbar */}
      <div className="fixed bottom-20 right-4 z-50 pointer-events-none">
        <div className="max-w-2xl mx-auto">
          {isDevToolbarOpen ? (
            <div className="bg-[#1C1C18]/95 backdrop-blur-md text-[#FFFEFA] rounded-2xl p-3 shadow-2xl border border-[#52443C]/40 flex flex-col gap-2.5 pointer-events-auto">
              <div className="flex items-center justify-between gap-2 border-b border-[#52443C]/40 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#874D27] text-white flex items-center justify-center text-[12px] font-bold">
                    CC
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold tracking-tight text-white leading-none">
                      Milestone 1 Screen Switcher
                    </span>
                    <span className="text-[9px] text-[#D8C2B7] uppercase tracking-wider mt-0.5">
                      Route: {currentPath}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {isCustomerScreen && (
                    <button
                      type="button"
                      onClick={() =>
                        setViewportMode(viewportMode === 'mobile_frame' ? 'auto' : 'mobile_frame')
                      }
                      className={`px-2 py-1 rounded-md text-[10px] font-bold flex items-center gap-1 transition-colors ${
                        viewportMode === 'mobile_frame'
                          ? 'bg-[#41644A] text-white'
                          : 'bg-[#31312D] text-[#D8C2B7] hover:text-white'
                      }`}
                      title="Toggle mobile device canvas preview"
                    >
                      <span className="material-symbols-outlined text-[13px]">stay_current_portrait</span>
                      <span>{viewportMode === 'mobile_frame' ? 'Device Frame' : 'Fluid View'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsDevToolbarOpen(false)}
                    className="w-6 h-6 rounded-md bg-[#31312D] text-[#D8C2B7] hover:text-white flex items-center justify-center transition-colors"
                    title="Minimize Switcher"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              </div>

              {/* 6 Screen Quick-Nav Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 py-0.5">
                {screens.map((s) => {
                  const isActive =
                    (s.path === '/orders/CC-1048' && currentPath.startsWith('/orders')) ||
                    currentPath === s.path;
                  return (
                    <button
                      key={s.path}
                      type="button"
                      onClick={() => {
                        navigate(s.path);
                        setIsDevToolbarOpen(false);
                      }}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all text-left flex flex-col ${
                        isActive
                          ? 'bg-[#874D27] text-white shadow-xs'
                          : 'bg-[#31312D] text-[#D8C2B7] hover:text-white hover:bg-[#52443C]'
                      }`}
                    >
                      <span className="truncate">{s.label}</span>
                      <span className="text-[9px] opacity-75 font-normal">{s.audience}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-end pointer-events-auto">
              <button
                type="button"
                onClick={() => setIsDevToolbarOpen(true)}
                className="px-3.5 py-2 rounded-full bg-[#1C1C18]/95 backdrop-blur-md text-[#FFFEFA] border border-[#52443C] shadow-2xl text-[11px] font-bold flex items-center gap-2 hover:bg-black active:scale-95 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-[#41644A] animate-pulse"></span>
                <span>Screens (6)</span>
                <span className="material-symbols-outlined text-[14px]">tune</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Viewport Content */}
      {viewportMode === 'mobile_frame' && isCustomerScreen ? (
        <div className="min-h-screen bg-[#29211D] flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-[420px] bg-[#FCF9F3] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-[#35251F] relative min-h-[844px]">
            {/* Mobile notch simulator */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-[#35251F] rounded-full z-50"></div>
            <div className="overflow-y-auto max-h-[820px] no-scrollbar">
              {renderScreen()}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full min-h-screen">
          {renderScreen()}
        </div>
      )}
    </NavigationContext.Provider>
  );
};
