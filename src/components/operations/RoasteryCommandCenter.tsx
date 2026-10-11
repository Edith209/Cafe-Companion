/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 5: Roastery Command Center (/operations)
 * Desktop-first KDS, live multi-station queue telemetry, and automated assistant interventions.
 */

import React, { useState } from 'react';
import { OperationsSidebar } from '../shared/OperationsSidebar';
import { OperationsHeader } from '../shared/OperationsHeader';
import { DEMO_STATION_WORKLOADS } from '../../data/demoFixtures';

interface RoasteryCommandCenterProps {
  onNavigate: (path: string) => void;
}

export const RoasteryCommandCenter: React.FC<RoasteryCommandCenterProps> = ({
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'new' | 'preparing' | 'ready' | 'delayed'>('preparing');
  const [isRushActive, setIsRushActive] = useState<boolean>(false);
  const [isOrdersPaused, setIsOrdersPaused] = useState<boolean>(false);
  const [activeCount, setActiveCount] = useState<number>(8);
  const [readyCount, setReadyCount] = useState<number>(2);
  const [waitingCount, setWaitingCount] = useState<number>(3);
  
  // Interactive order card states
  const [card1048Ready, setCard1048Ready] = useState<boolean>(false);
  const [card1049Started, setCard1049Started] = useState<boolean>(false);
  const [card1046Collected, setCard1046Collected] = useState<boolean>(false);

  // 86 toggles
  const [availability, setAvailability] = useState({
    coldBrew: true,
    oatMilk: true,
    almondMilk: true,
    toastFingers: true,
    plumMicrolot: false,
  });

  const [aiPromptsBalanced, setAiPromptsBalanced] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSimulateRush = () => {
    const nextState = !isRushActive;
    setIsRushActive(nextState);
    if (nextState) {
      setActiveCount(9);
      setWaitingCount(4);
      showToast('Simulated Rush: Cold Bar workload spiked (+1 Order #CC-1050)');
    } else {
      setActiveCount(8);
      setWaitingCount(3);
      showToast('Normal Roastery pacing restored.');
    }
  };

  const handlePauseOrders = () => {
    const next = !isOrdersPaused;
    setIsOrdersPaused(next);
    showToast(next ? 'Order intake paused! Live menu marked as Busy.' : 'Order intake resumed.');
  };

  const toggleAvailability = (key: keyof typeof availability, label: string) => {
    const nextVal = !availability[key];
    setAvailability((prev) => ({ ...prev, [key]: nextVal }));
    showToast(nextVal ? `${label} restored to live ordering` : `${label} marked 86 / Sold Out across customer terminals`);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <OperationsSidebar
        currentPath="/operations"
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-72 flex-1 flex flex-col">
        <OperationsHeader
          isRushActive={isRushActive}
          onSimulateRush={handleSimulateRush}
          onNotificationClick={() => showToast('All telemetry sensors operational.')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onSwitchToCustomer={() => onNavigate('/discover')}
        />

        <main className="flex-1 w-full pt-20 px-4 lg:px-8 pb-16 max-w-7xl">
          {/* Operational Header Section */}
          <header className="py-4 lg:py-6 flex flex-col xl:flex-row xl:items-end justify-between gap-6 border-b border-[#E8E0D6] pb-6 mb-6">
            <div className="flex flex-col gap-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#41644A] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-widest text-[#6E5A53] font-bold">
                  Real-time KDS Telemetry · Node 01
                </span>
              </div>
              <h1 className="font-serif font-bold text-[28px] lg:text-[34px] tracking-tight text-[#1C1C18]">
                Roastery Command Center
              </h1>
              <p className="text-[14px] text-[#52443C]">
                Your service, at a glance · Koramangala Roastery · Sunday Service Telemetry{' '}
                <span className="text-[#874D27] font-semibold">(Live Operational Sync Active)</span>
              </p>
            </div>

            {/* Quick Barista Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handlePauseOrders}
                className={`px-3.5 py-2 rounded-xl text-[13px] font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 border ${
                  isOrdersPaused
                    ? 'bg-[#BA1A1A] text-white border-[#BA1A1A]'
                    : 'bg-[#FFFEFA] text-[#1C1C18] border-[#E8E0D6] hover:bg-[#F0EEE8]'
                }`}
              >
                <span className="material-symbols-outlined text-[17px]">
                  {isOrdersPaused ? 'play_circle' : 'pause_circle'}
                </span>
                <span>{isOrdersPaused ? 'Resume Intake' : 'Pause Incoming'}</span>
              </button>

              <button
                type="button"
                onClick={handleSimulateRush}
                className="px-3.5 py-2 rounded-xl bg-[#F9DDD3] hover:bg-[#F2CCC0] text-[#756058] border border-[#874D27]/30 text-[13px] font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px] text-[#874D27]">
                  add_task
                </span>
                <span>Simulate: +1 Rush Order</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('section-86');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  showToast('Scroll to 86 Menu to delist any ingredient');
                }}
                className="px-3.5 py-2 rounded-xl bg-[#874D27] text-white hover:bg-[#6E3914] text-[13px] font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-[17px]">
                  remove_shopping_cart
                </span>
                <span>Emergency 86 Item</span>
              </button>
            </div>
          </header>

          {/* Top KPI Metrics Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {/* Active Orders */}
            <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Active Orders
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#874D27]">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  {activeCount < 10 ? `0${activeCount}` : activeCount}
                </span>
                <span className="text-[12px] text-[#6E5A53]">across 3 stations</span>
              </div>
              <div className="flex items-center gap-1 text-[#874D27] bg-[#FFDBC8]/50 px-2 py-0.5 rounded-md w-fit text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>3 in critical 5m window</span>
              </div>
            </div>

            {/* Avg Prep Duration */}
            <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Avg Prep Duration
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#41644A]">
                  <span className="material-symbols-outlined text-[18px]">av_timer</span>
                </div>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  {isRushActive ? '8.4' : '7.2'}
                </span>
                <span className="text-[12px] text-[#6E5A53]">min (target ≤ 8.5m)</span>
              </div>
              <div className="flex items-center gap-1 text-[#00210D] bg-[#C5ECCB] px-2 py-0.5 rounded-md w-fit text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                <span>On Schedule (Meeting Safe)</span>
              </div>
            </div>

            {/* Waiting to Start */}
            <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Waiting To Start
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#6E5A53]">
                  <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
                </div>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  {waitingCount < 10 ? `0${waitingCount}` : waitingCount}
                </span>
                <span className="text-[12px] text-[#6E5A53]">tickets queued</span>
              </div>
              <div className="flex items-center gap-1 text-[#52443C] bg-[#F0EEE8] px-2 py-0.5 rounded-md w-fit text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">sync_alt</span>
                <span>Pending station intake</span>
              </div>
            </div>

            {/* Ready for Pickup */}
            <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Ready for Pickup
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#41644A]">
                  <span className="material-symbols-outlined text-[18px]">takeout_dining</span>
                </div>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  {readyCount < 10 ? `0${readyCount}` : readyCount}
                </span>
                <span className="text-[12px] text-[#6E5A53]">at staging zone</span>
              </div>
              <div className="flex items-center gap-1 text-[#41644A] bg-[#C5ECCB]/50 px-2 py-0.5 rounded-md w-fit text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">pin_drop</span>
                <span>Express Counter A awaiting QR</span>
              </div>
            </div>
          </section>

          {/* 2-Column Split: Live Queue (65%) | Workload & AI Signals (35%) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: Live Order Queue */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5">
              {/* Filter Tabs */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFEFA] p-2.5 rounded-2xl border border-[#E8E0D6] shadow-xs">
                <div className="flex items-center overflow-x-auto gap-1.5 no-scrollbar">
                  {[
                    { id: 'all', label: 'All Orders (8)' },
                    { id: 'new', label: 'New (3)' },
                    { id: 'preparing', label: 'Preparing (3)', hasDot: true },
                    { id: 'ready', label: 'Ready (2)' },
                    { id: 'delayed', label: 'Delayed (0)' },
                  ].map((tab) => {
                    const isSelected = filter === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setFilter(tab.id as any)}
                        className={`px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all shrink-0 ${
                          isSelected
                            ? 'bg-[#F9DDD3] text-[#756058] shadow-2xs'
                            : 'bg-[#F0EEE8] text-[#1C1C18] hover:bg-[#EBE8E2]'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {tab.hasDot && (
                          <span className="inline-block w-2 h-2 ml-1 rounded-full bg-[#874D27] animate-pulse"></span>
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#F6F3ED] rounded-xl text-[#52443C] text-[11px] font-bold uppercase shrink-0">
                  <span className="material-symbols-outlined text-[15px]">swap_vert</span>
                  <span>Earliest Pickup</span>
                </div>
              </div>

              {/* Priority Order Card: #CC-1048 */}
              <div className="p-5 lg:p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#41644A]"></div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E8E0D6]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-serif font-bold text-[20px] text-[#1C1C18]">
                      #CC-1048
                    </span>
                    <span className="text-[12px] text-[#52443C]">11:34 AM (4 min ago)</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F0EEE8] text-[#52443C]">
                      Express Grab & Go
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C5ECCB] text-[#00210D] shadow-2xs text-[10px] font-bold uppercase">
                    <span className="material-symbols-outlined text-[14px]">verified</span>
                    <span>Safe for 12:00 PM Meeting</span>
                  </div>
                </div>

                {/* Station Routing Status Bar */}
                <div className="my-3.5 p-3 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] flex flex-wrap items-center justify-between gap-2.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-[#6E5A53]">
                      Synchronized Routing:
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFFEFA] border border-[#E8E0D6] text-[11px] font-bold text-[#1C1C18]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#874D27] animate-ping"></span>
                      <span>Cold Bar 01 — Nitro Pouring</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#FFFEFA] border border-[#E8E0D6] text-[11px] font-bold text-[#1C1C18]">
                      <span className="material-symbols-outlined text-[13px] text-[#41644A]">oven_gen</span>
                      <span>Bakery Warmer — 2 min left</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[#41644A] text-[11px] font-bold">
                    <span className="material-symbols-outlined text-[15px]">schedule</span>
                    <span>Est. Ready: 11:39 AM</span>
                  </div>
                </div>

                {/* Items Itemization */}
                <div className="py-3 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#874D27] shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">local_cafe</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#1C1C18]">
                          Classic Cold Brew × 1
                        </span>
                        <span className="text-[12px] text-[#52443C]">
                          Regular 350ml · 50% Cane Sugar · Micro-filtered Nitro Tap
                        </span>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C18]">₹140</span>
                  </div>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#6E5A53] shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[18px]">bakery_dining</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#1C1C18]">
                          Herbed Toast Fingers × 1
                        </span>
                        <span className="text-[12px] text-[#52443C]">
                          100% Veg · Extra Crisp sourdough · Rosemary Garlic butter glaze
                        </span>
                      </div>
                    </div>
                    <span className="text-[13px] font-bold text-[#1C1C18]">₹60</span>
                  </div>
                </div>

                {/* Special Notes & Verification */}
                <div className="p-3 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[#1C1C18] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#874D27]">
                      chat_bubble
                    </span>
                    <span className="text-[12px] italic text-[#52443C]">
                      “Extra napkins or chilled cup requested”
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] uppercase font-bold text-[#6E5A53]">Total:</span>
                    <span className="text-[15px] font-bold text-[#1C1C18]">₹200</span>
                    <span className="px-2 py-0.5 rounded bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold">
                      Verified In-Budget
                    </span>
                  </div>
                </div>

                {/* Barista Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1.5 text-[#52443C] text-[11px] font-medium">
                    <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
                    <span>Target Bay: Express Counter Shelf A-03</span>
                  </div>

                  <div className="flex items-center gap-2.5 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => showToast('Thermal ticket #CC-1048 printed to Espresso Bar 01')}
                      className="px-3.5 py-2 rounded-xl bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#1C1C18] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#E8E0D6]"
                    >
                      <span className="material-symbols-outlined text-[16px]">print</span>
                      <span>Print Ticket</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setCard1048Ready(true);
                        setReadyCount(3);
                        showToast('Order #CC-1048 marked ready! Push notification sent to customer.');
                      }}
                      disabled={card1048Ready}
                      className={`flex-1 sm:flex-none px-5 py-2 rounded-xl text-[12px] font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-95 ${
                        card1048Ready
                          ? 'bg-[#41644A] text-white'
                          : 'bg-[#874D27] hover:bg-[#6E3914] text-white'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {card1048Ready ? 'verified' : 'done_all'}
                      </span>
                      <span>
                        {card1048Ready
                          ? 'Moved to Shelf A-03'
                          : 'Mark as Ready for Pickup (Station A)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Secondary Order Card: #CC-1049 */}
              <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#E8E0D6]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      #CC-1049
                    </span>
                    <span className="text-[12px] text-[#52443C]">11:36 AM (2 min ago)</span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058]">
                      Dining In · Table 04
                    </span>
                  </div>

                  <span className="text-[10px] font-bold bg-[#F0EEE8] text-[#52443C] px-2 py-0.5 rounded-full uppercase">
                    New (Auto-Accepted)
                  </span>
                </div>

                <div className="py-2.5 flex flex-col gap-2 text-[13px]">
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-[#1C1C18]">Double Cortado × 1</span>
                      <p className="text-[11px] text-[#52443C]">Minor Figures Oat Milk · Natural Roast</p>
                    </div>
                    <span className="font-bold text-[#1C1C18]">₹220</span>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-[#1C1C18]">Banana Walnut Tea Cake × 1</span>
                      <p className="text-[11px] text-[#52443C]">Warm slice · Salted espresso caramel</p>
                    </div>
                    <span className="font-bold text-[#1C1C18]">₹160</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-[#E8E0D6]">
                  <span className="text-[11px] text-[#52443C]">
                    Queue Slot: Espresso Bar 02 (Grinder #03 Calibrated)
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCard1049Started(true);
                      showToast('Espresso Pod 02: extraction timer engaged');
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#1C1C18] text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all border border-[#E8E0D6]"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#874D27]">
                      {card1049Started ? 'check' : 'play_arrow'}
                    </span>
                    <span>{card1049Started ? 'Extraction In Progress' : 'Start Espresso Extraction'}</span>
                  </button>
                </div>
              </div>

              {/* Ready Order Card: #CC-1046 */}
              {!card1046Collected && (
                <div className="p-5 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-[#E8E0D6]">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="font-serif font-bold text-[18px] text-[#1C1C18]">
                        #CC-1046
                      </span>
                      <span className="text-[12px] text-[#52443C]">11:28 AM (10 min ago)</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#F0EEE8] text-[#52443C]">
                        Pickup Pass EXP-42
                      </span>
                    </div>

                    <span className="text-[10px] font-bold bg-[#C5ECCB] text-[#00210D] px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">check_circle</span>
                      <span>Ready at Counter A</span>
                    </span>
                  </div>

                  <div className="py-2 flex justify-between text-[13px]">
                    <div>
                      <span className="font-bold text-[#1C1C18]">Iced Oat Latte × 2</span>
                      <p className="text-[11px] text-[#52443C]">Unsweetened · Light Ice · Straws Attached</p>
                    </div>
                    <span className="font-bold text-[#1C1C18]">₹440</span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2.5 border-t border-[#E8E0D6]">
                    <span className="text-[11px] text-[#41644A] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">notifications_active</span>
                      <span>Customer notified via push & digital board</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setCard1046Collected(true);
                        setReadyCount(Math.max(0, readyCount - 1));
                        showToast('Pass EXP-42 cleared from Express Counter A.');
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#41644A] hover:bg-[#34523B] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">sensor_occupied</span>
                      <span>Confirm Customer Collection</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Stations, AI Signals, 86 Menu */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
              {/* Section 1: Preparation Station Workload */}
              <div className="p-5 lg:p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px] text-[#874D27]">
                      skillet
                    </span>
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Station Workload
                    </h2>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                    4 Live Pods
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  {DEMO_STATION_WORKLOADS.map((station) => (
                    <div key={station.id} className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[13px]">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#1C1C18]">{station.name}</span>
                          <span className="text-[11px] text-[#52443C]">
                            ({station.activeItemsCount} active)
                          </span>
                        </div>
                        <span className="font-bold text-[#1C1C18]">
                          {station.loadPercentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#F0EEE8] overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            station.loadPercentage > 75
                              ? 'bg-[#874D27]'
                              : station.loadPercentage > 50
                              ? 'bg-[#A5653C]'
                              : 'bg-[#41644A]'
                          }`}
                          style={{ width: `${station.loadPercentage}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-[#52443C]">{station.statusText}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Gemini Operational AI Signals */}
              <div className="p-5 lg:p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F9DDD3] flex items-center justify-center text-[#874D27]">
                      <span className="material-symbols-outlined text-[17px]">psychology</span>
                    </div>
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Café Intelligence
                    </h2>
                  </div>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D]">
                    Active Assistant
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {/* Signal 1 */}
                  <div className="p-3.5 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] flex flex-col gap-2">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-[#874D27] text-[18px] shrink-0 mt-0.5">
                        auto_mode
                      </span>
                      <p className="text-[12px] text-[#1C1C18] leading-snug">
                        Espresso station approaching <strong>85% capacity</strong>. Suggest routing cold brew or pour-overs in customer app recommendations.
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setAiPromptsBalanced(true);
                          showToast('Customer app spotlight shifted to Nitro Cold Brew & Batch Filter');
                        }}
                        disabled={aiPromptsBalanced}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-1 shadow-2xs transition-all ${
                          aiPromptsBalanced
                            ? 'bg-[#41644A] text-white'
                            : 'bg-[#874D27] text-white hover:bg-[#6E3914]'
                        }`}
                      >
                        <span>{aiPromptsBalanced ? 'Balanced' : 'Auto-Balance Menu Prompts'}</span>
                        <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>

                  {/* Signal 2 */}
                  <div className="p-3 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#41644A] text-[18px] shrink-0 mt-0.5">
                      schedule
                    </span>
                    <p className="text-[12px] text-[#1C1C18] leading-snug">
                      Order <strong>#CC-1048</strong> customer has a meeting in 8 mins. Cold Bar & Toast stations synced for 11:41 AM completion (4m margin maintained).
                    </p>
                  </div>

                  {/* Signal 3 */}
                  <div className="p-3 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] flex items-start gap-2">
                    <span className="material-symbols-outlined text-[#6E5A53] text-[18px] shrink-0 mt-0.5">
                      inventory_2
                    </span>
                    <p className="text-[12px] text-[#1C1C18] leading-snug">
                      Sourdough Toast batch 4 is low (3 portions left). Restock bakery warmer from proofer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Live 86 / Availability Toggle */}
              <div id="section-86" className="p-5 lg:p-6 rounded-2xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-xs flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#6E5A53]">
                      tune
                    </span>
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Live 86 Availability
                    </h2>
                  </div>
                  <span className="text-[10px] text-[#52443C] uppercase font-bold">
                    Barista Direct
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {[
                    { key: 'coldBrew' as const, name: 'Classic Cold Brew', sub: 'Tap active · 18L pressurized' },
                    { key: 'oatMilk' as const, name: 'Oat Milk (Minor Figures)', sub: 'In Stock · 14 Cartons cold' },
                    { key: 'almondMilk' as const, name: 'Almond Milk (Unsweetened)', sub: 'LOW · 2L remaining' },
                    { key: 'toastFingers' as const, name: 'Herbed Toast Fingers', sub: 'In Stock · Sourdough fresh' },
                    { key: 'plumMicrolot' as const, name: 'Seasonal Plum Microlot', sub: "86'd / Sold Out" },
                  ].map((item) => {
                    const isAvailable = availability[item.key];
                    return (
                      <div
                        key={item.key}
                        className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                          isAvailable
                            ? 'bg-[#F6F3ED] border-[#E8E0D6]'
                            : 'bg-[#F0EEE8] border-[#E8E0D6] opacity-75'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-[13px] font-bold ${
                              isAvailable ? 'text-[#1C1C18]' : 'text-[#6E5A53] line-through'
                            }`}
                          >
                            {item.name}
                          </span>
                          <span className="text-[11px] text-[#52443C]">{item.sub}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleAvailability(item.key, item.name)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            isAvailable ? 'bg-[#41644A]' : 'bg-[#E5E2DC]'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              isAvailable ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="p-2.5 rounded-xl bg-[#F0EEE8] text-[#52443C] text-[11px] flex items-center gap-2 border border-[#E8E0D6]">
                  <span className="material-symbols-outlined text-[15px] text-[#41644A]">sync</span>
                  <span>Toggling 86 instantly reflects on all customer apps & kiosk screens.</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-xl bg-[#31312D] text-[#F3F0EA] text-[13px] font-bold shadow-2xl flex items-center gap-2.5 border border-[#52443C]">
            <span className="material-symbols-outlined text-[#C5ECCB] text-[18px]">
              check_circle
            </span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};
