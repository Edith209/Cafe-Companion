/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 6: Café Pulse Intelligence (/cafe-pulse)
 * Multi-signal sentiment synthesis, queue stress vs ETA convergence, and prescriptive actions.
 */

import React, { useState } from 'react';
import { OperationsSidebar } from '../shared/OperationsSidebar';
import { OperationsHeader } from '../shared/OperationsHeader';
import { DEMO_CLOSED_LOOP_CASE, DEMO_GEMINI_ACTIONS } from '../../data/demoFixtures';

interface CafePulseIntelligenceProps {
  onNavigate: (path: string) => void;
}

export const CafePulseIntelligence: React.FC<CafePulseIntelligenceProps> = ({
  onNavigate,
}) => {
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [actionsState, setActionsState] = useState<Record<string, string>>({});
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3200);
  };

  const handleTriggerSynthesis = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      showToast('Gemini Synthesis Complete: 126 telemetry logs aggregated. KPIs synchronized.');
    }, 1200);
  };

  const handleAction = (id: string, actionName: string) => {
    setActionsState((prev) => ({ ...prev, [id]: actionName }));
    showToast(`Action executed: ${actionName} for task #${id}`);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased">
      <OperationsSidebar
        currentPath="/cafe-pulse"
        onNavigate={onNavigate}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="lg:pl-72 flex-1 flex flex-col">
        <OperationsHeader
          onSimulateRush={() => showToast('Telemetry simulated rush wave active in analysis.')}
          onNotificationClick={() => showToast('All sentiment sensors normal.')}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onSwitchToCustomer={() => onNavigate('/discover')}
        />

        <main className="flex-1 w-full pt-20 px-4 lg:px-8 pb-16 max-w-7xl">
          {/* Top Editorial Header & Controls */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pt-4 pb-6 border-b border-[#E8E0D6] mb-6">
            <div className="space-y-1.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9DDD3] text-[#756058]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#874D27] animate-pulse"></span>
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  AI Customer Intelligence · Roastery Telemetry Node 01
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <h1 className="font-serif font-bold text-[30px] lg:text-[36px] text-[#1C1C18] tracking-tight">
                  Café Pulse
                </h1>
                <span className="text-[13px] text-[#6E5A53] font-semibold">
                  Koramangala Roastery · Bengaluru
                </span>
              </div>
              <p className="text-[14px] text-[#52443C] leading-relaxed">
                Understand the sensory experience behind every extraction. Transform real customer sentiment, queue telemetry, and bar station stress into measurable, meeting-safe service upgrades.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Date Selector Pill */}
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFEFA] border border-[#E8E0D6] shadow-2xs text-[#1C1C18] text-[12px] font-bold">
                <span className="material-symbols-outlined text-[17px] text-[#874D27]">
                  calendar_today
                </span>
                <span>Last 7 Days (Oct 05 – Oct 11, 2026)</span>
                <span className="material-symbols-outlined text-[15px] text-[#52443C]">
                  expand_more
                </span>
              </div>

              {/* Telemetry Status Tag */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F6F3ED] border border-[#E8E0D6] text-[#52443C] text-[11px] uppercase tracking-wider font-bold">
                <span className="material-symbols-outlined text-[17px] text-[#41644A]">
                  sensors
                </span>
                <span>126 Live Orders Synthesized</span>
              </div>

              {/* Action Controls */}
              <button
                type="button"
                onClick={() => showToast('Sensory Intelligence Brief exported as PDF')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFEFA] hover:bg-[#F0EEE8] border border-[#E8E0D6] text-[#1C1C18] text-[12px] font-bold shadow-2xs transition-all"
              >
                <span className="material-symbols-outlined text-[17px]">ios_share</span>
                <span>Export Brief</span>
              </button>

              <button
                type="button"
                onClick={handleTriggerSynthesis}
                disabled={isSynthesizing}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#874D27] text-white hover:bg-[#6E3914] text-[12px] font-bold shadow-2xs transition-all active:scale-95 disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[17px] ${isSynthesizing ? 'animate-spin' : ''}`}>
                  {isSynthesizing ? 'progress_activity' : 'auto_awesome'}
                </span>
                <span>{isSynthesizing ? 'Synthesizing...' : 'Trigger Gemini Synthesis'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 01: Service Health KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* KPI 1 */}
            <div className="bg-[#FFFEFA] rounded-2xl p-5 border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Customer Sentiment
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#874D27]">
                  <span className="material-symbols-outlined text-[18px]">hotel_class</span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  4.6
                </span>
                <span className="text-[13px] text-[#6E5A53] font-medium">/ 5.0</span>
                <span className="ml-auto inline-flex items-center gap-0.5 text-[#00210D] text-[11px] font-bold bg-[#C5ECCB] px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
                  <span>+0.3</span>
                </span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E8E0D6] flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-0.5 text-[#874D27]">
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">star</span>
                  <span className="material-symbols-outlined text-[14px] material-symbols-filled">star</span>
                  <span className="material-symbols-outlined text-[14px]">star_half</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-[#41644A]">
                  91% Positive / Neutral
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div className="bg-[#FFFEFA] rounded-2xl p-5 border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  On-Time Readiness
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#C5ECCB] flex items-center justify-center text-[#00210D]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  89.4%
                </span>
                <span className="text-[11px] text-[#52443C] font-semibold">Tgt ≥92%</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E8E0D6] flex items-center justify-between">
                <span className="text-[11px] text-[#52443C]">Target vs actual scan</span>
                <span className="px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-bold uppercase">
                  Meeting-Safe Active
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div className="bg-[#FFFEFA] rounded-2xl p-5 border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Feedback Analyzed
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#F0EEE8] flex items-center justify-center text-[#874D27]">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#1C1C18] leading-none">
                  126
                </span>
                <span className="text-[10px] text-[#6E5A53] font-bold uppercase">Records Clustered</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E8E0D6] flex items-center justify-between text-[#52443C] text-[11px]">
                <span>QR Surveys (84)</span>
                <span className="h-1 w-1 rounded-full bg-[#E8E0D6]"></span>
                <span>App Ratings (42)</span>
              </div>
            </div>

            {/* KPI 4 */}
            <div className="bg-[#FFFEFA] rounded-2xl p-5 border border-[#E8E0D6] shadow-xs flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Active Action Tasks
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#FFDBC8] flex items-center justify-center text-[#321300]">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="font-serif font-bold text-[34px] text-[#874D27] leading-none">
                  07
                </span>
                <span className="text-[10px] text-[#6E5A53] font-bold uppercase">Reviewed Loops</span>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#E8E0D6] flex items-center justify-between text-[11px]">
                <span className="text-[#874D27] font-bold">4 In Progress</span>
                <span className="text-[#41644A] font-bold">3 Completed</span>
              </div>
            </div>
          </div>

          {/* SECTION 02: Closed-Loop AI Pipeline */}
          <div className="bg-[#FFFEFA] rounded-2xl p-6 border border-[#E8E0D6] shadow-xs space-y-5 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#874D27] flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">
                    published_with_changes
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      {DEMO_CLOSED_LOOP_CASE.title}
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold uppercase">
                      {DEMO_CLOSED_LOOP_CASE.caseNumber}
                    </span>
                  </div>
                  <p className="text-[12px] text-[#52443C]">
                    Autonomous resolution pipeline connecting raw guest sentiment to bar station adjustments
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[#41644A] text-[11px] font-bold uppercase">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Resolved & Validated · {DEMO_CLOSED_LOOP_CASE.resolvedDate}</span>
              </div>
            </div>

            {/* 5-Step Pipeline Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5">
              {/* Step 1 */}
              <div className="bg-[#F6F3ED] rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 border border-[#E8E0D6] hover:bg-[#F0EEE8] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6E5A53] uppercase">
                    01 · Voice Signal
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#BA1A1A]">
                    priority_high
                  </span>
                </div>
                <p className="text-[12px] text-[#1C1C18] italic leading-snug">
                  {DEMO_CLOSED_LOOP_CASE.steps.voiceSignal.quote}
                </p>
                <div className="text-[10px] text-[#52443C] pt-1">
                  Source: {DEMO_CLOSED_LOOP_CASE.steps.voiceSignal.source}
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#F6F3ED] rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 border border-[#E8E0D6] hover:bg-[#F0EEE8] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6E5A53] uppercase">
                    02 · Bar Telemetry
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#874D27]">
                    troubleshoot
                  </span>
                </div>
                <p className="text-[12px] text-[#1C1C18] leading-snug">
                  Espresso Station 02 peak steam stress hit <strong className="text-[#874D27]">85% saturation</strong>, while Nitro Cold Bar was under-utilized at 30%.
                </p>
                <div className="text-[10px] text-[#52443C] pt-1">
                  Sensor: {DEMO_CLOSED_LOOP_CASE.steps.barTelemetry.sensor}
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#F9DDD3]/50 rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 border border-[#874D27]/30 hover:bg-[#F9DDD3] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#874D27] uppercase">
                    03 · Gemini Strategy
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#874D27]">
                    auto_awesome
                  </span>
                </div>
                <p className="text-[12px] text-[#1C1C18] leading-snug">
                  {DEMO_CLOSED_LOOP_CASE.steps.geminiStrategy.strategy}
                </p>
                <div className="text-[10px] text-[#756058] font-bold pt-1">
                  Action: {DEMO_CLOSED_LOOP_CASE.steps.geminiStrategy.action}
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#F6F3ED] rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 border border-[#E8E0D6] hover:bg-[#F0EEE8] transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#6E5A53] uppercase">
                    04 · Human Sign-Off
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#41644A]">
                    how_to_reg
                  </span>
                </div>
                <p className="text-[12px] text-[#1C1C18] leading-snug">
                  {DEMO_CLOSED_LOOP_CASE.steps.humanSignOff.details}
                </p>
                <div className="text-[10px] text-[#41644A] font-bold pt-1">
                  Status: {DEMO_CLOSED_LOOP_CASE.steps.humanSignOff.status}
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-[#C5ECCB]/40 rounded-xl p-3.5 flex flex-col justify-between space-y-2.5 border border-[#41644A]/30 hover:bg-[#C5ECCB]/60 transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#00210D] uppercase">
                    05 · Outcome Measured
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-[#41644A]">
                    trending_up
                  </span>
                </div>
                <p className="text-[12px] text-[#1C1C18] leading-snug">
                  Espresso wait time dropped from <strong>11.2m to 7.4m</strong>; On-time pickup jumped from 81% to <strong className="text-[#41644A]">89.4%</strong>.
                </p>
                <div className="text-[10px] text-[#00210D] font-bold pt-1">
                  Result: {DEMO_CLOSED_LOOP_CASE.steps.outcomeMeasured.result}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 03 & 04: Visual Telemetry Split & Thematic Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">
            {/* Left 7 Cols: Thematic Voice Clusters & Sentiment Distribution */}
            <div className="xl:col-span-7 space-y-6">
              <div className="bg-[#FFFEFA] rounded-2xl p-6 border border-[#E8E0D6] shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Customer Sentiment Spectrum
                    </h2>
                    <p className="text-[12px] text-[#52443C]">
                      Automated semantic categorization of 126 customer feedback interactions
                    </p>
                  </div>
                  <span className="text-[12px] font-bold text-[#6E5A53]">N = 126</span>
                </div>

                {/* Color Segmented Bar */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-[#F0EEE8] rounded-full overflow-hidden flex">
                    <div className="h-full bg-[#41644A]" style={{ width: '74%' }} title="74% Positive" />
                    <div className="h-full bg-[#DCC1B8]" style={{ width: '18%' }} title="18% Neutral" />
                    <div className="h-full bg-[#874D27]" style={{ width: '8%' }} title="8% Needs Attention" />
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#41644A]"></span>
                      <span className="font-bold text-[#1C1C18]">74% Positive (93)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DCC1B8]"></span>
                      <span className="text-[#52443C]">18% Neutral (23)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#874D27]"></span>
                      <span className="font-bold text-[#874D27]">8% Needs Attention (10)</span>
                    </div>
                  </div>
                </div>

                {/* 3 Thematic Cards */}
                <div className="space-y-3 pt-2">
                  {/* Theme 1 */}
                  <div className="bg-[#F6F3ED] rounded-xl p-4 space-y-2.5 border border-[#E8E0D6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[15px] text-[#1C1C18]">
                          Drink Quality & Roastery Craft
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold uppercase">
                          Praise Theme
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-bold text-[17px] text-[#41644A]">4.9</span>
                        <span className="text-[11px] text-[#6E5A53]">/ 5.0</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#52443C] italic leading-relaxed">
                      “The Chikmagalur cold brew notes of fig and cocoa are exceptional. Unsweetened was perfect. The glass jar seal preserves every aroma.”
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#52443C] pt-1 border-t border-[#E8E0D6]/60">
                      <span>68 mentions (+12% vs last week)</span>
                      <span className="font-bold text-[#41644A]">Top pairing: Cinnamon Babka</span>
                    </div>
                  </div>

                  {/* Theme 2 */}
                  <div className="bg-[#F6F3ED] rounded-xl p-4 space-y-2.5 border border-[#E8E0D6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[15px] text-[#1C1C18]">
                          Waiting Time & Queue Predictability
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-bold uppercase">
                          Monitored Concern
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-bold text-[17px] text-[#874D27]">3.8</span>
                        <span className="text-[11px] text-[#6E5A53]">/ 5.0</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#52443C] italic leading-relaxed">
                      “Really appreciated the 5–8 min estimate badge; gave me confidence before my 12:00 PM boardroom meeting at Embassy GolfLinks.”
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#52443C] pt-1 border-t border-[#E8E0D6]/60">
                      <span>34 mentions (Down 18% post smart queue updates)</span>
                      <span className="font-bold text-[#874D27]">Peak delta: -2.3m overall</span>
                    </div>
                  </div>

                  {/* Theme 3 */}
                  <div className="bg-[#F6F3ED] rounded-xl p-4 space-y-2.5 border border-[#E8E0D6]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-[15px] text-[#1C1C18]">
                          Menu Availability & 86-Item Agility
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#EBE8E2] text-[#1C1C18] text-[10px] font-bold uppercase">
                          Opportunity
                        </span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif font-bold text-[17px] text-[#1C1C18]">4.4</span>
                        <span className="text-[11px] text-[#6E5A53]">/ 5.0</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#52443C] italic leading-relaxed">
                      “Was looking for Plum Microlot, but the suggested Chikmagalur cold brew pairing recommendation was a great fallback under ₹250.”
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-[#52443C] pt-1 border-t border-[#E8E0D6]/60">
                      <span>24 mentions (Alternative acceptance: 82%)</span>
                      <span className="font-bold text-[#1C1C18]">Zero order drop-offs</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Multi-Signal Station Telemetry Charts */}
            <div className="xl:col-span-5 space-y-6">
              <div className="bg-[#FFFEFA] rounded-2xl p-6 border border-[#E8E0D6] shadow-xs space-y-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Station Stress vs ETA
                    </h2>
                    <p className="text-[12px] text-[#52443C]">
                      Promised window vs Actual collection time by hour
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-[#874D27] text-[20px]">
                    insights
                  </span>
                </div>

                {/* SVG Chart: Hourly ETA Convergence */}
                <div className="bg-[#F6F3ED] rounded-xl p-4 space-y-2 border border-[#E8E0D6]">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-[#1C1C18]">Hourly Wait Time & Pickup (Min)</span>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-[#874D27]"></span>
                        <span className="text-[#52443C]">Promised</span>
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <span className="w-2.5 h-0.5 bg-[#41644A]"></span>
                        <span className="text-[#52443C]">Actual</span>
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-36 flex items-center justify-center">
                    <svg className="w-full h-full text-[#52443C]" fill="none" viewBox="0 0 360 120">
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.15" x1="10" x2="350" y1="20" y2="20" />
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.15" x1="10" x2="350" y1="60" y2="60" />
                      <line stroke="currentColor" strokeDasharray="3 3" strokeOpacity="0.15" x1="10" x2="350" y1="100" y2="100" />
                      {/* Promised Path (Dotted Terracotta) */}
                      <path d="M 20 75 Q 70 65 120 40 T 220 30 T 320 60" fill="none" stroke="#874D27" strokeDasharray="4 3" strokeWidth="2.5" />
                      {/* Actual Path (Solid Sage Green) */}
                      <path d="M 20 78 Q 70 70 120 45 T 220 32 T 320 62" fill="none" stroke="#41644A" strokeWidth="3" />
                      {/* Hour Labels */}
                      <text fill="currentColor" fontSize="9" textAnchor="middle" x="20" y="115">9 AM</text>
                      <text fill="currentColor" fontSize="9" textAnchor="middle" x="95" y="115">11 AM</text>
                      <text fill="currentColor" fontSize="9" textAnchor="middle" x="170" y="115">1 PM</text>
                      <text fill="currentColor" fontSize="9" textAnchor="middle" x="245" y="115">3 PM</text>
                      <text fill="currentColor" fontSize="9" textAnchor="middle" x="320" y="115">5 PM</text>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-[#41644A] font-bold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px]">check</span>
                      <span>Error margin narrowed to ±45s</span>
                    </span>
                    <span className="text-[#52443C] font-semibold">Peak Rush: 11:30 AM</span>
                  </div>
                </div>

                {/* Station Workload Balancing */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                    Station Workload Balancing
                  </span>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#1C1C18] font-semibold">Espresso Bar 02 (Dual-Boiler)</span>
                      <span className="font-bold text-[#874D27]">68% Load (Stabilized)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F0EEE8] overflow-hidden">
                      <div className="h-full bg-[#874D27] rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#1C1C18] font-semibold">Cold Extraction Station 01 (Nitro)</span>
                      <span className="font-bold text-[#41644A]">54% Load (Optimized)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F0EEE8] overflow-hidden">
                      <div className="h-full bg-[#41644A] rounded-full" style={{ width: '54%' }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[12px]">
                      <span className="text-[#1C1C18] font-semibold">Bakery Warmer 01 (Artisanal Breads)</span>
                      <span className="font-bold text-[#6E5A53]">42% Load (Normal)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F0EEE8] overflow-hidden">
                      <div className="h-full bg-[#DCC1B8] rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Correlation Insight Box: Order CC-1048 */}
                <div className="bg-[#F9DDD3]/30 rounded-xl p-3.5 flex gap-2.5 border border-[#874D27]/20">
                  <span className="material-symbols-outlined text-[#874D27] text-[20px] shrink-0">
                    dataset
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-[12px] font-bold text-[#1C1C18] block">
                      Synergy with Order #CC-1048 Telemetry
                    </span>
                    <p className="text-[11px] text-[#52443C] leading-snug">
                      Pre-meeting grab-and-go demonstrated <strong>100% on-schedule fulfillment</strong> when cold tap extraction and bakery warming queues were synchronized 3 minutes prior to arrival.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 05: Gemini Manager Action Center */}
          <div className="bg-[#FFFEFA] rounded-2xl p-6 border border-[#E8E0D6] shadow-xs space-y-5 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#597D61] flex items-center justify-center text-white shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">psychology</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-bold text-[18px] text-[#1C1C18]">
                      Gemini Operational Action Center
                    </h2>
                    <span className="px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-bold uppercase">
                      3 Prioritized Tasks
                    </span>
                  </div>
                  <p className="text-[12px] text-[#52443C]">
                    Prescriptive AI recommendations derived from multi-signal bar telemetry and customer feedback
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[#6E5A53] font-bold uppercase">
                <span>Auto-Refresh every 15m</span>
                <span className="w-2 h-2 rounded-full bg-[#41644A] animate-pulse"></span>
              </div>
            </div>

            {/* Action Cards Stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DEMO_GEMINI_ACTIONS.map((action) => {
                const applied = actionsState[action.id];
                return (
                  <div
                    key={action.id}
                    className="bg-[#F6F3ED] rounded-xl p-4 flex flex-col justify-between space-y-3 border border-[#E8E0D6] hover:shadow-xs transition-all"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            action.impactType === 'High Impact'
                              ? 'bg-[#874D27] text-white'
                              : action.impactType === 'Taste Calibration'
                              ? 'bg-[#41644A] text-white'
                              : 'bg-[#6E5A53] text-white'
                          }`}
                        >
                          {action.impactType}
                        </span>
                        <span className="text-[11px] text-[#6E5A53] font-semibold">
                          {action.impactBadge}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-[15px] text-[#1C1C18] leading-snug">
                        {action.title}
                      </h3>
                      <p className="text-[12px] text-[#52443C] leading-snug">
                        {action.description}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAction(action.id, action.primaryActionLabel)}
                          disabled={!!applied}
                          className={`flex-1 py-2 rounded-lg text-[12px] font-bold transition-all shadow-2xs ${
                            applied
                              ? 'bg-[#41644A] text-white'
                              : 'bg-[#874D27] text-white hover:bg-[#6E3914]'
                          }`}
                        >
                          {applied ? 'Applied ✓' : action.primaryActionLabel}
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast(`Telemetry evidence viewed for: ${action.title}`)}
                          className="px-3 py-2 rounded-lg bg-[#EBE8E2] text-[#1C1C18] text-[12px] font-bold hover:bg-[#E5E2DC] transition-all"
                        >
                          {action.secondaryActionLabel}
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => showToast(`Suggestion dismissed: ${action.title}`)}
                        className="text-center text-[11px] text-[#52443C] hover:text-[#1C1C18] py-0.5 font-medium"
                      >
                        Dismiss Suggestion
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Demonstration Dataset Footer Indicator */}
          <div className="p-3.5 rounded-xl bg-[#F0EEE8] border border-[#E8E0D6] flex flex-col sm:flex-row items-center justify-between gap-3 text-[#52443C] text-[11px]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#874D27]">
                terminal
              </span>
              <span>
                Connected to Koramangala Roastery IoT Bus v2.4 · Gemini Multimodal Sensory Model Active
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span>Demonstration Dataset: 126 Orders Clustered</span>
              <span className="font-bold text-[#1C1C18]">All Telemetry In-Sync</span>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="px-5 py-3 rounded-xl bg-[#31312D] text-[#F3F0EA] text-[13px] font-bold shadow-2xl flex items-center gap-2.5 border border-[#52443C]">
            <span className="material-symbols-outlined text-[#C5ECCB] text-[18px]">
              check_circle
            </span>
            <span>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
};
