/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 2: Smart Recommendations (/recommendations)
 * Precision schedule-aligned and budget-guarded pairing recommendations.
 */

import React, { useState } from 'react';
import { Header } from '../shared/Header';
import { CustomerNav } from '../shared/CustomerNav';
import { formatPaiseToRupees } from '../../lib/currency';

interface SmartRecommendationsProps {
  onNavigate: (path: string) => void;
  onSelectPairing?: (itemIds: string[]) => void;
  cartCount?: number;
}

export const SmartRecommendations: React.FC<SmartRecommendationsProps> = ({
  onNavigate,
  onSelectPairing,
  cartCount = 2,
}) => {
  const [refineQuery, setRefineQuery] = useState('');
  const [activeItem, setActiveItem] = useState<string>('pairing');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  const handleAddPairing = () => {
    setIsAdded(true);
    if (onSelectPairing) {
      onSelectPairing(['item-cold-brew', 'item-toast-fingers']);
    }
    setTimeout(() => {
      onNavigate('/checkout');
    }, 400);
  };

  const handleAddSingle = (itemId: string) => {
    setActiveItem(itemId);
    if (onSelectPairing) {
      onSelectPairing([itemId]);
    }
    onNavigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#1C1C18] flex flex-col pb-28 selection:bg-[#F9DDD3] selection:text-[#756058]">
      <Header
        subtitle="Koramangala Roastery · Open"
        cartCount={cartCount}
        onCartClick={() => onNavigate('/checkout')}
        onSwitchToOperations={() => onNavigate('/operations')}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 px-4 flex flex-col space-y-6">
        {/* Section 1: Customer Constraints Header & Scenario Card */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#874D27]"></span>
            <span className="text-[10px] uppercase tracking-widest text-[#874D27] font-bold">
              Your Personalized Picks
            </span>
          </div>
          <h1 className="font-serif font-bold text-[28px] sm:text-[32px] text-[#1C1C18] leading-tight mb-1">
            Picked for your moment.
          </h1>
          <p className="text-[13px] text-[#52443C] mb-4">
            Good choices, tailored to your schedule, palate, and budget.
          </p>

          {/* Context & Prompt Capsule */}
          <div className="bg-[#F6F3ED] rounded-xl p-3.5 border border-[#E8E0D6] shadow-xs">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-1.5 text-[#874D27]">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                <span className="text-[10px] uppercase tracking-wide font-bold">
                  Prompt Ingested
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/discover')}
                className="flex items-center gap-1 text-[#874D27] hover:text-[#6E3914] py-0.5 px-2 rounded-lg bg-[#FFFEFA] border border-[#E8E0D6] shadow-2xs text-[11px] font-semibold"
              >
                <span className="material-symbols-outlined text-[14px]">edit_note</span>
                <span>Edit preferences</span>
              </button>
            </div>
            <p className="text-[13px] text-[#1C1C18] italic mb-3">
              “I have a meeting in 12 minutes. I want a vegetarian snack and a coffee under ₹250. I prefer less sugar.”
            </p>

            {/* Constraints Pills Deck */}
            <div className="flex flex-wrap gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0EEE8] text-[#1C1C18] text-[11px] font-semibold">
                <span>⏱</span> 12m cutoff
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0EEE8] text-[#1C1C18] text-[11px] font-semibold">
                <span>₹</span> ₹250 budget limit
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C5ECCB] text-[#00210D] text-[11px] font-bold">
                <span>🌱</span> 100% Vegetarian
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0EEE8] text-[#1C1C18] text-[11px] font-semibold">
                <span>🍯</span> Low sugar
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F9DDD3] text-[#756058] text-[11px] font-bold">
                <span className="text-[#874D27]">⚡</span> Live Queue: 3 orders ahead
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: AI Constraint & Optimization Intelligence Banner */}
        <div className="bg-[#FFFEFA] rounded-xl p-4 border border-[#E8E0D6] shadow-xs relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9DDD3] flex items-center justify-center shrink-0 text-[#874D27]">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] uppercase tracking-wider text-[#874D27] font-bold">
                  Optimization Insight
                </span>
                <span className="text-[10px] bg-[#597D61]/15 text-[#41644A] px-2 py-0.5 rounded-full font-bold">
                  Budget Guard Active
                </span>
              </div>
              <p className="text-[12px] text-[#52443C] leading-relaxed">
                An Iced Oat Latte (<span className="font-bold text-[#1C1C18]">₹170</span>) paired with a Garden Veg Sandwich (<span className="font-bold text-[#1C1C18]">₹90</span>) totals{' '}
                <span className="text-[#BA1A1A] font-bold">₹260</span>, exceeding your ₹250 limit. We automatically adjusted your pairing to a{' '}
                <span className="text-[#874D27] font-bold">Classic Cold Brew (₹140) + Herbed Toast Finger (₹60) = ₹200</span>{' '}
                (<span className="text-[#41644A] font-bold">₹50 under budget</span>), or an{' '}
                <span className="font-semibold text-[#1C1C18]">Iced Americano + Savory Scone = ₹240</span>, keeping both under 7m prep!
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Precision Recommendations Title */}
        <div className="flex items-center justify-between px-1">
          <span className="font-serif font-bold text-[20px] text-[#1C1C18]">
            Precision Recommendations
          </span>
          <span className="text-[11px] text-[#52443C]">Ranked by schedule viability</span>
        </div>

        {/* Recommendations Cards List */}
        <div className="flex flex-col gap-4">
          {/* Card 01: Best Match — Iced Oat Latte */}
          <div className="bg-[#FFFEFA] rounded-xl overflow-hidden border border-[#E8E0D6] shadow-xs relative">
            <div className="h-1.5 w-full bg-[#874D27]"></div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] tracking-wider uppercase font-bold text-[#874D27] bg-[#FFDBC8] px-2.5 py-0.5 rounded-full">
                  01 · Best Match
                </span>
                <div className="flex items-center gap-1 text-[#41644A] text-[11px] font-bold bg-[#C5ECCB] px-2 py-0.5 rounded-full">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>6–8 min prep</span>
                </div>
              </div>

              <div className="flex gap-3.5 mb-3">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-xs relative bg-[#F0EEE8]">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp_gRdMkp8yBiwsqisSlsHY_cb-rrLfdtX-sqrbW2wbuGHNgbEv4L2_YcpJM4dM6Hdq8CgaLJQ9b61x1k0uHA-CUv__qze5ZNHzqtR0AmKn3QTEhnw0NHJRQE74paOjF1vKQS6wgpYPixnQ1N_GiXHRop_UMn7WBoPKCXWjTqT7HMM6_5l8OqGvGb3hZ4IjmVKGgQ_a2wFeHgkZKL4EP7dBwZz8jvdAYkoocE20W4oDsz3xqDYmtYyyA"
                    alt="Iced Oat Latte"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <h3 className="font-serif font-bold text-[18px] text-[#1C1C18] leading-tight">
                      Iced Oat Latte
                    </h3>
                    <span className="text-[11px] text-[#52443C]">Less Sweet · Shaken</span>
                    <p className="text-[12px] text-[#52443C] line-clamp-2 mt-1">
                      Single-origin espresso pulled over chilled oat milk, lightly shaken without added syrups.
                    </p>
                  </div>
                  <div className="text-[16px] text-[#874D27] font-bold mt-1">
                    {formatPaiseToRupees(17000)}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-3">
                <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Cold</span>
                <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Dairy-Free</span>
                <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Low Sugar</span>
                <span className="px-2 py-0.5 rounded bg-[#EBE8E2] text-[#52443C] text-[10px] font-bold">12m Margin Safe</span>
              </div>

              <div className="bg-[#F6F3ED] rounded-lg p-2.5 mb-3 flex items-start gap-2 border border-[#E8E0D6]">
                <span className="material-symbols-outlined text-[16px] text-[#874D27] shrink-0 mt-0.5">auto_awesome</span>
                <p className="text-[12px] text-[#52443C]">
                  <span className="font-bold text-[#1C1C18]">Why this fits:</span> Satisfies your cold coffee craving with natural oat sweetness. Prep time leaves a 4-minute safety margin for your 12m meeting.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('/checkout')}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#1C1C18] text-[13px] font-bold text-center transition-colors"
                >
                  Customize
                </button>
                <button
                  type="button"
                  onClick={() => handleAddSingle('item-oat-latte')}
                  className="flex-[1.5] py-2.5 px-4 rounded-lg bg-[#874D27] hover:bg-[#6E3914] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Add to order (₹170)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 02: Compliant Pairing — Cold Brew + Herbed Toast (Featured demonstration match!) */}
          <div className="bg-[#FFFEFA] rounded-xl overflow-hidden border border-[#597D61]/40 shadow-xs p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] tracking-wider uppercase font-bold text-[#41644A] bg-[#C5ECCB] px-2.5 py-0.5 rounded-full">
                02 · Compliant Pairing
              </span>
              <div className="flex items-center gap-1 text-[#41644A] text-[11px] font-bold bg-[#C5ECCB] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>5 min ready</span>
              </div>
            </div>

            <div className="flex gap-3.5 mb-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-xs relative bg-[#F0EEE8]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVivtrJI62BoGpJ4_q3s2HQU1XMvsXdbIoKhUuSUeh4zCq7eS8i0UTO573KJCmLapgkRJxzGCA43NEORn4Cq8nDpTs9J63N0-YSslG7iSAMJyrNaspTkNsqASBufuzBt2WPhC0rL6_h5H8jE3RfS7Qj_c4nWQIz2FG5aiFJZMB_zBpzqfV3ZkE5-t6NDPK4wn4TxaeDHqp5ccNaIBzSQRWb5P3l0bDhgvw_QSz090j-KWzBRyLvlhrMg"
                  alt="Cold Brew + Herbed Toast"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="font-serif font-bold text-[18px] text-[#1C1C18] leading-tight">
                    Cold Brew + Herbed Toast
                  </h3>
                  <span className="text-[11px] text-[#52443C]">
                    Cold Brew (₹140) · Toast Finger (₹60)
                  </span>
                  <p className="text-[12px] text-[#52443C] line-clamp-2 mt-1">
                    Steeped 18 hours for zero bitterness, paired with warm sourdough herb fingers.
                  </p>
                </div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[16px] text-[#874D27] font-bold">
                    {formatPaiseToRupees(20000)}
                  </span>
                  <span className="text-[11px] text-[#41644A] font-bold">
                    Saves ₹50 vs budget
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold">
                🌱 Vegetarian
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">
                Zero Sugar Coffee
              </span>
              <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">
                Total ₹200
              </span>
            </div>

            <div className="bg-[#F6F3ED] rounded-lg p-2.5 mb-3 flex items-start gap-2 border border-[#E8E0D6]">
              <span className="material-symbols-outlined text-[16px] text-[#41644A] shrink-0 mt-0.5">
                verified_user
              </span>
              <p className="text-[12px] text-[#52443C]">
                <span className="font-bold text-[#1C1C18]">Why this fits:</span> Both items fit comfortably within your ₹250 budget (leaving ₹50 headroom) and finish in 5 mins total queue time.
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddPairing}
              className="w-full py-2.5 px-4 rounded-lg bg-[#874D27] hover:bg-[#6E3914] text-white text-[13px] font-bold flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">lunch_dining</span>
              <span>{isAdded ? 'Pairing Selected!' : 'Add Pairing (₹200)'}</span>
            </button>
          </div>

          {/* Card 03: Speed Priority Alternative — Espresso Tonic */}
          <div className="bg-[#FFFEFA] rounded-xl overflow-hidden border border-[#E8E0D6] shadow-xs p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[10px] tracking-wider uppercase font-bold text-[#52443C] bg-[#EBE8E2] px-2.5 py-0.5 rounded-full">
                03 · Speed Priority Alternative
              </span>
              <div className="flex items-center gap-1 text-[#41644A] text-[11px] font-bold bg-[#C5ECCB] px-2 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                <span>3–4 min</span>
              </div>
            </div>

            <div className="flex gap-3.5 mb-3">
              <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 shadow-xs relative bg-[#F0EEE8]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGgdWzH4-eoMe1uoyhqi9JjgvwJfkj-8tudDZKChxSfIbGkWwVz-8Z-vF863KXqRnTVp2ClPGWWRXWejxRHv-3KFk5SExIqb8LstMzcvfSxsSa_IZ9xUnHULeRzASI0TzLoMI73SrT2WV3ogs4UU1pC3cPopgtWOApUqRzbGAoS4q8HO5T4GfsRnkxKBEX2GwXw5xhu4NcANOIzsc2XCdwdHpXcDOBMZH-EkYJHla_PEKMcVkK7AI1ew"
                  alt="Espresso Tonic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-between flex-1 min-w-0">
                <div>
                  <h3 className="font-serif font-bold text-[18px] text-[#1C1C18] leading-tight">
                    Espresso Tonic
                  </h3>
                  <span className="text-[11px] text-[#52443C]">Double shot · Botanical tonic</span>
                  <p className="text-[12px] text-[#52443C] line-clamp-2 mt-1">
                    Crisp tonic water over double espresso shot and botanical sprig. Refreshing and brisk.
                  </p>
                </div>
                <div className="text-[16px] text-[#874D27] font-bold mt-1">
                  {formatPaiseToRupees(16000)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Cold</span>
              <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Low Calorie</span>
              <span className="px-2 py-0.5 rounded bg-[#F0EEE8] text-[#52443C] text-[10px] font-semibold">Rapid Prep</span>
            </div>

            <div className="bg-[#F6F3ED] rounded-lg p-2.5 mb-3 flex items-start gap-2 border border-[#E8E0D6]">
              <span className="material-symbols-outlined text-[16px] text-[#52443C] shrink-0 mt-0.5">insights</span>
              <p className="text-[12px] text-[#52443C]">
                <span className="font-bold text-[#1C1C18]">Why this fits:</span> If queue spikes or your meeting moves up, this requires zero milk steaming and is ready in under 4 minutes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleAddSingle('item-espresso-tonic')}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#1C1C18] text-[13px] font-bold flex items-center justify-center gap-2 transition-colors active:scale-98"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Add to order (₹160)</span>
            </button>
          </div>
        </div>

        {/* Section 4: Conversational Refinement Input */}
        <div className="flex flex-col space-y-2 pt-2">
          <div className="flex items-center gap-1.5 px-1">
            <span className="material-symbols-outlined text-[18px] text-[#874D27]">
              chat_bubble_outline
            </span>
            <span className="text-[13px] text-[#1C1C18] font-bold">
              Try something different...
            </span>
          </div>

          <div className="flex items-center bg-[#FFFEFA] rounded-xl p-2 border border-[#E8E0D6] shadow-xs">
            <span className="material-symbols-outlined text-[18px] text-[#52443C] px-2">
              tune
            </span>
            <input
              type="text"
              value={refineQuery}
              onChange={(e) => setRefineQuery(e.target.value)}
              placeholder="Refine your picks with AI..."
              className="flex-1 bg-transparent border-0 outline-none text-[13px] text-[#1C1C18] placeholder:text-[#52443C]/60 min-w-0"
            />
            <button
              type="button"
              onClick={() => {
                if (refineQuery) {
                  setRefineQuery('');
                }
              }}
              className="w-8 h-8 rounded-lg bg-[#874D27] flex items-center justify-center text-white shrink-0 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_upward</span>
            </button>
          </div>

          {/* Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['Under ₹150 only', 'Warm drink instead', 'Gluten-free snack', 'Extra caffeine boost'].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => setRefineQuery(chip)}
                className="whitespace-nowrap px-3 py-1.5 rounded-full bg-[#F6F3ED] hover:bg-[#F0EEE8] text-[#1C1C18] border border-[#E8E0D6] text-[11px] font-semibold transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Section 5: Persistent Floating Order Basket Strip */}
        <div className="fixed bottom-18 left-0 right-0 px-4 z-30 max-w-lg mx-auto pointer-events-none">
          <div className="bg-[#31312D] text-[#F3F0EA] rounded-xl p-3 shadow-xl border border-[#52443C]/40 flex items-center justify-between gap-3 pointer-events-auto">
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C5ECCB] shrink-0"></span>
                <span className="text-[13px] text-[#F3F0EA] truncate font-bold">
                  Demo Basket: Cold Brew + Herbed Toast (₹200)
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-20 h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FFB68B] rounded-full" style={{ width: '80%' }}></div>
                </div>
                <span className="text-[11px] text-[#F3F0EA]/80 font-medium">
                  ₹200/₹250 (₹50 left)
                </span>
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[10px] text-[#C5ECCB] font-bold">
                  Est. Ready in 5m (11:41 AM)
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/checkout')}
              className="shrink-0 bg-[#874D27] hover:bg-[#6E3914] text-white px-3.5 py-2.5 rounded-lg flex items-center gap-1.5 text-[12px] font-bold shadow-xs active:scale-95 transition-all"
            >
              <span>Review Order</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      <CustomerNav currentPath="/recommendations" onNavigate={onNavigate} />
    </div>
  );
};
