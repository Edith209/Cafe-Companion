/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 4: Live Order Tracking (/orders/:orderId)
 * Real-time order progress, station routing telemetry, and live stress adaptation demo.
 */

import React, { useState } from 'react';
import { Header } from '../shared/Header';
import { CustomerNav } from '../shared/CustomerNav';
import { formatPaiseToRupees } from '../../lib/currency';
import { DEMO_ORDER_CC_1048 } from '../../data/demoFixtures';

interface LiveOrderTrackingProps {
  orderId?: string;
  onNavigate: (path: string) => void;
}

export const LiveOrderTracking: React.FC<LiveOrderTrackingProps> = ({
  orderId = 'CC-1048',
  onNavigate,
}) => {
  const [isRushSimulated, setIsRushSimulated] = useState<boolean>(false);
  const [isSummaryExpanded, setIsSummaryExpanded] = useState<boolean>(false);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);

  const order = DEMO_ORDER_CC_1048;

  const toggleRush = () => {
    setIsRushSimulated(!isRushSimulated);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#1C1C18] flex flex-col pb-28 selection:bg-[#F9DDD3] selection:text-[#756058]">
      <Header
        subtitle="Koramangala Roastery · Open"
        cartCount={0}
        onSwitchToOperations={() => onNavigate('/operations')}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 px-4 flex flex-col space-y-5">
        {/* Order Identity Header */}
        <section className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F9DDD3] text-[#756058]">
              <span className="w-2 h-2 rounded-full bg-[#41644A] animate-ping"></span>
              <span className="text-[10px] uppercase tracking-wider font-bold">
                DEMO ORDER #{orderId}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#41644A] text-[11px] font-bold">
              <span className="material-symbols-outlined text-[15px]">sensors</span>
              <span>Active in Roastery</span>
            </div>
          </div>

          <div>
            <h1 className="font-serif font-bold text-[28px] sm:text-[32px] text-[#1C1C18] leading-tight tracking-tight">
              Good things are brewing.
            </h1>
            <p className="text-[13px] text-[#52443C] mt-0.5">
              We'll keep you posted. Your next great coffee is on its way.
            </p>
          </div>

          {/* Fulfillment Pill */}
          <div className="p-3 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#874D27]/10 text-[#874D27] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </div>
              <div className="min-w-0">
                <div className="text-[12px] text-[#1C1C18] font-bold truncate">
                  Koramangala · Express Grab & Go (Station A)
                </div>
                <div className="text-[11px] text-[#41644A] font-semibold">
                  Target: 11:41 AM (Safe for 12:00 PM Meeting)
                </div>
              </div>
            </div>
            <div className="shrink-0 px-2.5 py-1 rounded-lg bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold flex items-center gap-1 uppercase">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              <span>On Schedule</span>
            </div>
          </div>
        </section>

        {/* Hero Readiness Panel ("Roastery Pulse") */}
        <section className="relative overflow-hidden rounded-2xl bg-[#FFFEFA] p-5 space-y-4 border border-[#E8E0D6] shadow-[0_8px_24px_rgba(53,37,31,0.05)]">
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#874D27]/10 blur-2xl pointer-events-none"></div>

          <div className="flex items-start justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                Estimated Hand-off Window
              </div>
              <div className="font-serif font-bold text-[28px] sm:text-[32px] text-[#874D27] leading-tight tracking-tight mt-0.5">
                {isRushSimulated ? 'Ready in 9–11 min' : 'Ready in 5–8 min'}
              </div>
              <div className="text-[12px] text-[#52443C] font-medium">
                {isRushSimulated
                  ? 'Updated window: 11:43 AM – 11:45 AM'
                  : 'Estimated window: 11:39 AM – 11:42 AM'}
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#F9DDD3] text-[#756058] flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-[26px]">coffee</span>
            </div>
          </div>

          <p className="text-[13px] text-[#52443C] leading-relaxed">
            Your order is smoothly moving through our single-origin extraction workflow and kitchen station.
          </p>

          {/* Visual Coffee Extraction Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-[#874D27] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#874D27]"></span>
                <span>Stage 2: Active Extraction & Toasting</span>
              </span>
              <span className="text-[#52443C] font-semibold">
                {isRushSimulated ? '42% Complete (Compensating)' : '55% Complete'}
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#F0EEE8] overflow-hidden p-0.5 border border-[#E8E0D6]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#874D27] to-[#A5653C] transition-all duration-700 ease-out relative"
                style={{ width: isRushSimulated ? '42%' : '55%' }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="pt-1 flex items-start gap-2 text-[#52443C] text-[11px]">
            <span className="material-symbols-outlined text-[16px] text-[#41644A] shrink-0 mt-0.5">
              speed
            </span>
            <span className="leading-tight">
              Estimated readiness calculated from live station workload (Cold Bar Tap 01 & Bakery Warmer).
            </span>
          </div>
        </section>

        {/* Live Queue Adaptation Toggle */}
        <section className="rounded-2xl bg-[#F0EEE8] p-4 space-y-3 border border-[#E8E0D6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#874D27] text-[20px]">
                smart_toy
              </span>
              <span className="text-[13px] font-bold text-[#1C1C18]">
                Roastery Intelligence System
              </span>
            </div>
            <div
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                isRushSimulated
                  ? 'bg-[#F9DDD3] text-[#756058]'
                  : 'bg-[#C5ECCB] text-[#00210D]'
              }`}
            >
              {isRushSimulated ? 'Cold Bar Spike (7 Ahead)' : 'Normal Pace (3 Ahead)'}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 bg-[#FFFEFA] p-3 rounded-xl border border-[#E8E0D6] shadow-xs">
            <div className="min-w-0">
              <div className="text-[12px] text-[#1C1C18] font-bold">
                Live Stress Adaptation Demo
              </div>
              <div className="text-[11px] text-[#52443C] leading-tight">
                Simulate kitchen rush to see ETA adapt dynamically
              </div>
            </div>

            <button
              type="button"
              onClick={toggleRush}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 active:scale-95 transition-all ${
                isRushSimulated
                  ? 'bg-[#874D27] text-white'
                  : 'bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#874D27]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">bolt</span>
              <span>{isRushSimulated ? 'Reset Normal' : 'Simulate Rush'}</span>
            </button>
          </div>

          {/* Dynamic Alert Box */}
          {isRushSimulated && (
            <div className="p-3 rounded-xl bg-[#F9DDD3] text-[#756058] space-y-1 border border-[#874D27]/30">
              <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#874D27]">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Queue Auto-Adaptation Triggered</span>
              </div>
              <p className="text-[11px] text-[#756058] leading-relaxed">
                Rush detected at Cold Bar. Window gently adjusted to <strong>9–11 mins</strong>. Rest easy: you still remain <strong>8 minutes safe</strong> ahead of your 12:00 PM calendar event.
              </p>
            </div>
          )}
        </section>

        {/* Four-Stage Order Timeline */}
        <section className="rounded-2xl bg-[#FFFEFA] p-5 space-y-4 border border-[#E8E0D6] shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
              Brewing Milestones
            </h2>
            <span className="text-[11px] text-[#52443C] font-semibold">Real-time Telemetry</span>
          </div>

          <div className="relative pl-7 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-3 before:w-0.5 before:bg-[#E5E2DC]">
            {/* Stage 1 */}
            <div className="relative">
              <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#41644A] text-white flex items-center justify-center shadow-xs ring-4 ring-[#FFFEFA]">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#1C1C18]">
                    Stage 1 · Order Confirmed
                  </h3>
                  <span className="text-[11px] text-[#41644A] font-bold">11:34 AM ✓</span>
                </div>
                <p className="text-[12px] text-[#52443C] mt-0.5">
                  Order #CC-1048 verified & routed to barista queue. Budget verified at ₹200 (Saved ₹50).
                </p>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="relative">
              <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#874D27] text-white flex items-center justify-center shadow-md ring-4 ring-[#FFDBC8] animate-pulse">
                <span className="material-symbols-outlined text-[14px]">local_cafe</span>
              </div>
              <div className="p-3 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6] space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#874D27] flex items-center gap-1.5">
                    <span>Stage 2 · Being Prepared</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#874D27] animate-ping"></span>
                  </h3>
                  <span className="text-[10px] text-[#874D27] font-bold uppercase">Active Now</span>
                </div>
                <p className="text-[12px] text-[#1C1C18] leading-snug">
                  Single-origin Chikmagalur cold brew pouring from nitro tap; sourdough bread toasted at 220°C.
                </p>
                <div className="text-[11px] text-[#52443C] font-medium pt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">timer</span>
                  <span>Est. ~4 min remaining on extraction</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="relative opacity-80">
              <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#F0EEE8] text-[#52443C] flex items-center justify-center ring-4 ring-[#FFFEFA]">
                <span className="material-symbols-outlined text-[14px]">shopping_bag</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#1C1C18]">
                    Stage 3 · Ready for Pickup
                  </h3>
                  <span className="text-[11px] text-[#52443C]">Est. 11:41 AM</span>
                </div>
                <p className="text-[12px] text-[#52443C] mt-0.5">
                  Packaged at Express Collection Station A. Show your pickup code to barista.
                </p>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="relative opacity-60">
              <div className="absolute -left-7 top-0.5 w-6 h-6 rounded-full bg-[#F0EEE8] text-[#52443C] flex items-center justify-center ring-4 ring-[#FFFEFA]">
                <span className="material-symbols-outlined text-[14px]">celebration</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-[#1C1C18]">Stage 4 · Collected</h3>
                  <span className="text-[11px] text-[#52443C]">Final</span>
                </div>
                <p className="text-[12px] text-[#52443C] mt-0.5">
                  Enjoy your handcrafted coffee moment. Cheers to productive meetings!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inside the Roastery (Station Breakdown) */}
        <section className="rounded-2xl bg-[#FFFEFA] p-5 space-y-3.5 border border-[#E8E0D6] shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                Inside the Roastery
              </h2>
              <p className="text-[11px] text-[#52443C]">Kitchen station routing telemetry</p>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#F0EEE8] text-[#52443C] text-[10px] font-bold uppercase">
              2 Stations Active
            </span>
          </div>

          {/* Station 1: Cold Brew */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeJBh8xjt4k_-D-BmmK_4iAwQjmQEfPHa-e0QGyP3k5v19UQh35Q9xOX8LGM_uZTLzP-Zq6ic2xU4k5-kODzx1F5a6cOS42YFQ2HPGlEAKQUxuNa-iZUAzzNOcqrRotVltf1MeobxZIE-tT9HPkGa9RxqtHfR3JWmY63DYe44-MdZPeyfzaP1Bz-XiWZad0BM-6fw1EINy_NcDf6zhFv4nSoyGzffQa6odxZD8rcpfwaWBSutSljsTdA"
              alt="Classic Cold Brew"
              className="w-14 h-14 rounded-lg object-cover shrink-0 shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#1C1C18] truncate">
                  Classic Cold Brew
                </h3>
                <span className="text-[11px] text-[#874D27] font-bold">Cold Bar 01</span>
              </div>
              <div className="text-[11px] text-[#52443C] truncate">
                Regular 350ml · 50% Simple Sweetness
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-[#41644A] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#41644A] animate-pulse"></span>
                  <span>Nitro Tap Pouring</span>
                </span>
                <span className="text-[#52443C] text-[10px]">· Active extraction</span>
              </div>
            </div>
          </div>

          {/* Station 2: Toast */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6]">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAALCuCmiIZlcfZZMzOdz8PE6yZGGq2WGAXuXOevHtdc-IWzXtQW52elTU4kHhvVn9slQ6-jRq5L-XOt_LGU6pO4dvZZSI9jpopZuI5KaDK6-qWNjC6i6ZM0kSOYTXC-uakea-vlbSLxv5G-9-Bf_POH7xkW4r8xbk1bDWIVGMfgc24eyGFil4ttlXrcjXjrzN-_5saxrj85aWoNNHAs8DeFzl1vyKnZRek0VPBSK99ElKYXkXmUNr0gA"
              alt="Herbed Toast Fingers"
              className="w-14 h-14 rounded-lg object-cover shrink-0 shadow-xs"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-[#1C1C18] truncate">
                  Herbed Toast Fingers
                </h3>
                <span className="text-[11px] text-[#52443C] font-bold">Bakery Warmer</span>
              </div>
              <div className="text-[11px] text-[#52443C] truncate">
                100% Veg · Extra Crisp sourdough
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex items-center gap-1 text-[10px] text-[#874D27] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#874D27] animate-pulse"></span>
                  <span>Warming & Buttering</span>
                </span>
                <span className="text-[#52443C] text-[10px]">· 2 min left</span>
              </div>
            </div>
          </div>

          {/* Barista Note */}
          <div className="p-3 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] flex items-center gap-2.5">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5TcAXd2vm-oDLKP8R6zZQ8AWWMIZXFX5gctzhiTp-6r1PX9o2tH0YbFh3OlMPOoLX3wGuCJ-KL-vFPUqJ9vuHvysw84H9RilbBMle7HbhNKYLfvcU3OGM9ARvTGK-LJu6BS-bijLEq-s3lOjItaPs3m5NSEA0u3JVhvDDMKkzsgVe3OtMBOR2XvL5yVpMdztI3DlmCoXt4AvET2O8d36IlD_E8jJBMCb6YbAD60yyMFicpsmcBZ7ryQ"
              alt="Lead Barista"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
            <p className="text-[11px] text-[#1C1C18] leading-tight">
              Crafted by <strong>Barista Varun</strong>: "Your Chikmagalur batch rested 18 hours. Smooth notes of dried fig & cocoa."
            </p>
          </div>
        </section>

        {/* Express Pickup Pass */}
        <section className="rounded-2xl bg-[#FFFEFA] p-5 space-y-4 border border-[#E8E0D6] shadow-[0_4px_20px_rgba(53,37,31,0.06)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#874D27] text-[22px]">
                confirmation_number
              </span>
              <div>
                <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                  Express Pickup Pass
                </h2>
                <p className="text-[11px] text-[#52443C]">
                  Direct collection without register waiting
                </p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-bold">
              Counter A
            </span>
          </div>

          {/* Ticket Card */}
          <div className="p-4 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6] flex items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                Pickup Code
              </div>
              <div className="font-serif font-bold text-[32px] text-[#1C1C18] tracking-wider">
                EXP-48
              </div>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="text-[12px] text-[#41644A] font-bold flex items-center gap-1 hover:underline"
              >
                <span className="material-symbols-outlined text-[15px]">touch_app</span>
                <span>Tap to show full screen</span>
              </button>
            </div>

            {/* Stylized Inline SVG QR Code */}
            <div
              onClick={() => setShowQrModal(true)}
              className="p-2 bg-white rounded-xl border border-[#E8E0D6] shadow-2xs shrink-0 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <svg className="w-18 h-18 text-[#1C1C18]" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="13" y="13" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="67" y="5" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="75" y="13" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="5" y="67" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="13" y="75" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="42" y="10" width="8" height="8" fill="currentColor" />
                <rect x="52" y="18" width="6" height="6" fill="currentColor" />
                <rect x="44" y="32" width="14" height="6" fill="currentColor" />
                <rect x="12" y="44" width="8" height="8" fill="currentColor" />
                <rect x="26" y="48" width="10" height="6" fill="currentColor" />
                <rect x="40" y="46" width="20" height="8" fill="currentColor" />
                <rect x="68" y="42" width="12" height="6" fill="currentColor" />
                <rect x="84" y="48" width="8" height="12" fill="currentColor" />
                <rect x="46" y="64" width="8" height="18" fill="currentColor" />
                <rect x="60" y="68" width="14" height="8" fill="currentColor" />
                <rect x="78" y="76" width="12" height="12" fill="currentColor" />
                <rect x="64" y="84" width="8" height="8" fill="currentColor" />
              </svg>
              <span className="text-[8px] font-bold text-[#52443C] mt-1 tracking-tight">
                SCAN AT COUNTER
              </span>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#F6F3ED] border border-[#E8E0D6] flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-[#874D27] shrink-0 mt-0.5">
              info
            </span>
            <p className="text-[11px] text-[#52443C] leading-snug">
              Head directly to <strong>Express Collection Station A</strong> when your notification chimes. No waiting at the main cashier register.
            </p>
          </div>
        </section>

        {/* Collapsible Order Summary */}
        <section className="rounded-2xl bg-[#FFFEFA] p-5 space-y-3 border border-[#E8E0D6] shadow-xs">
          <button
            type="button"
            onClick={() => setIsSummaryExpanded(!isSummaryExpanded)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <div className="font-serif font-bold text-[17px] text-[#1C1C18]">
                Order Summary
              </div>
              <div className="text-[11px] text-[#52443C]">
                2 items · Total Paid {formatPaiseToRupees(order.totalInPaise)} (Verified)
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#F0EEE8] flex items-center justify-center text-[#52443C]">
              <span className="material-symbols-outlined text-[18px]">
                {isSummaryExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </div>
          </button>

          {isSummaryExpanded && (
            <div className="pt-3 space-y-2 border-t border-[#E8E0D6] text-[12px]">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-[#1C1C18]">1x Classic Cold Brew (350ml)</div>
                  <div className="text-[#52443C] text-[11px]">Nitro Tap · 50% Simple Sweetness</div>
                </div>
                <div className="font-bold text-[#1C1C18]">{formatPaiseToRupees(14000)}</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-[#1C1C18]">1x Herbed Toast Fingers</div>
                  <div className="text-[#52443C] text-[11px]">Extra Crisp · 100% Veg Sourdough</div>
                </div>
                <div className="font-bold text-[#1C1C18]">{formatPaiseToRupees(6000)}</div>
              </div>
              <div className="flex justify-between items-center text-[#52443C] pt-1">
                <span>Roastery Packaging & GST</span>
                <span className="text-[#41644A] font-bold">Included</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#C5ECCB]/40 text-[#00210D] flex items-center justify-between font-bold text-[11px]">
                <span>AI Budget Guard</span>
                <span>₹50 saved under ₹250 limit</span>
              </div>
              <div className="pt-2 flex justify-between items-center font-serif font-bold text-[17px] text-[#1C1C18]">
                <span>Total Paid</span>
                <span className="text-[#874D27]">{formatPaiseToRupees(20000)}</span>
              </div>
            </div>
          )}
        </section>

        {/* Actions & Support */}
        <section className="space-y-3 pt-1">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onNavigate('/discover')}
              className="w-full py-3 rounded-xl bg-[#F9DDD3] hover:bg-[#F2CCC0] text-[#756058] font-bold text-[13px] text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px]">explore</span>
              <span>Back to Discover</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/operations')}
              className="w-full py-3 rounded-xl bg-[#FFFEFA] hover:bg-[#F0EEE8] text-[#1C1C18] border border-[#E8E0D6] font-bold text-[13px] text-center flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-[17px]">dashboard</span>
              <span>View in KDS</span>
            </button>
          </div>
        </section>
      </main>

      {/* QR Fullscreen Modal */}
      {showQrModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setShowQrModal(false)}
        >
          <div
            className="bg-[#FFFEFA] p-6 rounded-2xl max-w-xs w-full flex flex-col items-center text-center space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-[11px] uppercase tracking-wider text-[#52443C] font-bold">
              Express Pickup Pass
            </div>
            <div className="font-serif font-bold text-[36px] text-[#1C1C18]">
              EXP-48
            </div>
            <div className="p-4 bg-white rounded-2xl border border-[#E8E0D6]">
              <svg className="w-48 h-48 text-[#1C1C18]" viewBox="0 0 100 100" fill="none">
                <rect x="5" y="5" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="13" y="13" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="67" y="5" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="75" y="13" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="5" y="67" width="28" height="28" rx="4" stroke="currentColor" strokeWidth="4" />
                <rect x="13" y="75" width="12" height="12" rx="2" fill="currentColor" />
                <rect x="42" y="10" width="8" height="8" fill="currentColor" />
                <rect x="52" y="18" width="6" height="6" fill="currentColor" />
                <rect x="44" y="32" width="14" height="6" fill="currentColor" />
                <rect x="12" y="44" width="8" height="8" fill="currentColor" />
                <rect x="26" y="48" width="10" height="6" fill="currentColor" />
                <rect x="40" y="46" width="20" height="8" fill="currentColor" />
                <rect x="68" y="42" width="12" height="6" fill="currentColor" />
                <rect x="84" y="48" width="8" height="12" fill="currentColor" />
                <rect x="46" y="64" width="8" height="18" fill="currentColor" />
                <rect x="60" y="68" width="14" height="8" fill="currentColor" />
                <rect x="78" y="76" width="12" height="12" fill="currentColor" />
                <rect x="64" y="84" width="8" height="8" fill="currentColor" />
              </svg>
            </div>
            <p className="text-[12px] text-[#52443C]">
              Show this QR code at <strong>Express Counter Shelf A-03</strong>
            </p>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#874D27] text-white font-bold text-[13px]"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <CustomerNav currentPath="/orders/CC-1048" onNavigate={onNavigate} />
    </div>
  );
};
