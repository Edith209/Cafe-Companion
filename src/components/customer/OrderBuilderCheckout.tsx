/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 3: Order Builder & Checkout (/checkout)
 * Step 3 of 3: Craft recipe customization, budget verification, and order confirmation.
 */

import React, { useState } from 'react';
import { Header } from '../shared/Header';
import { CustomerNav } from '../shared/CustomerNav';
import { formatPaiseToRupees } from '../../lib/currency';

interface OrderBuilderCheckoutProps {
  onNavigate: (path: string) => void;
  onOrderConfirmed?: (orderId: string) => void;
}

export const OrderBuilderCheckout: React.FC<OrderBuilderCheckoutProps> = ({
  onNavigate,
  onOrderConfirmed,
}) => {
  // State for recipe fine-tuning
  const [size, setSize] = useState<'Small' | 'Regular' | 'Large'>('Regular');
  const [sweetness, setSweetness] = useState<'Unsweetened' | 'Less Sweet' | 'Classic'>('Less Sweet');
  const [oatMilkAddon, setOatMilkAddon] = useState<boolean>(false);
  const [extraShotAddon, setExtraShotAddon] = useState<boolean>(false);

  // Quantities
  const [coldBrewQty, setColdBrewQty] = useState<number>(1);
  const [toastQty, setToastQty] = useState<number>(1);

  // Fulfillment mode
  const [fulfillment, setFulfillment] = useState<'dine_in' | 'grab_and_go'>('grab_and_go');
  const [baristaNote, setBaristaNote] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Calculate pricing in integer paise
  const baseColdBrewPrice = 14000; // ₹140
  const sizeAdjustment = size === 'Small' ? -2000 : size === 'Large' ? 3000 : 0;
  const addonAdjustment = (oatMilkAddon ? 3000 : 0) + (extraShotAddon ? 4000 : 0);
  const coldBrewUnitPrice = baseColdBrewPrice + sizeAdjustment + addonAdjustment;

  const baseToastPrice = 6000; // ₹60
  const subtotalPaise = (coldBrewUnitPrice * coldBrewQty) + (baseToastPrice * toastQty);
  const budgetLimitPaise = 25000; // ₹250
  const remainingBudgetPaise = budgetLimitPaise - subtotalPaise;
  const utilizationPercent = Math.min(100, Math.round((subtotalPaise / budgetLimitPaise) * 100));

  const handleConfirmOrder = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onOrderConfirmed) {
        onOrderConfirmed('CC-1048');
      }
      onNavigate('/orders/CC-1048');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#1C1C18] flex flex-col pb-36 selection:bg-[#F9DDD3] selection:text-[#756058]">
      <Header
        subtitle="Koramangala Roastery · Open"
        cartCount={coldBrewQty + toastQty}
        onCartClick={() => {}}
        onSwitchToOperations={() => onNavigate('/operations')}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 px-4 flex flex-col space-y-5">
        {/* Top Progress & Context Meta */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#874D27]"></span>
              <span className="text-[10px] uppercase tracking-wider text-[#874D27] font-bold">
                Order Builder & Checkout
              </span>
            </div>
            <span className="text-[12px] text-[#52443C] font-semibold">Step 3 of 3</span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-serif font-bold text-[28px] sm:text-[32px] text-[#1C1C18] leading-tight tracking-tight">
              Let's make it yours.
            </h1>
            <p className="text-[14px] text-[#52443C] mt-0.5">
              Your order, just the way you like it.
            </p>
          </div>

          {/* Roastery Capsule */}
          <div className="flex items-center justify-between bg-[#F6F3ED] p-2.5 rounded-xl border border-[#E8E0D6] shadow-xs mt-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#F9DDD3] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[#756058] text-[16px]">
                  storefront
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] text-[#1C1C18] font-bold truncate">
                  Koramangala Roastery
                </span>
                <span className="text-[11px] text-[#52443C] leading-tight">
                  Quick Counter Pickup
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C5ECCB] text-[#00210D] shrink-0">
              <span className="material-symbols-outlined text-[14px] material-symbols-filled">
                check_circle
              </span>
              <span className="text-[10px] font-bold uppercase">
                {subtotalPaise <= budgetLimitPaise ? 'Budget ₹250 OK' : 'Budget Warning'}
              </span>
            </div>
          </div>
        </div>

        {/* Active Basket Items Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] uppercase tracking-wider text-[#52443C] font-bold">
              Compliant Pairing (2 Items)
            </span>
            <span className="text-[11px] text-[#41644A] font-bold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>Tailored Match</span>
            </span>
          </div>

          {/* Item 1: Classic Cold Brew */}
          <div className="bg-[#FFFEFA] p-3.5 rounded-xl border border-[#E8E0D6] shadow-xs flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F0EEE8] border border-[#E8E0D6]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBO-216_51qnt5qpfJrAvHN07VN7Sc9q1rxrpC8TY8_DX8zokh5gYBWGWz70DQWcax2g0n3TfJ2w2nbMblONBz9tKn0H0a6hcOYyPjM6JthMn1CMTzWfID5Xqm3w9jshcZI_L-WMfOoWsAT9YnCWvobrsxUhS-T0R6OOpylfTOy9clLno1hAsGJK9UXvuUbHZAqg_KoSzzZoH5_rtRY1ka-8cMg0cz_dPJ65yBo4HIdIkX550mH6quOQQ"
                  alt="Classic Cold Brew"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/60 text-white px-1.5 py-0.5 rounded text-[9px] font-bold">
                  18h Brew
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h2 className="font-serif font-bold text-[17px] text-[#1C1C18] truncate">
                    Classic Cold Brew
                  </h2>
                  <span className="text-[15px] text-[#874D27] font-bold shrink-0">
                    {formatPaiseToRupees(coldBrewUnitPrice * coldBrewQty)}
                  </span>
                </div>
                <p className="text-[11px] text-[#52443C] line-clamp-1 mt-0.5">
                  Single-origin Chikmagalur estate bean
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-semibold">
                    {size} 350ml
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F9DDD3] text-[#756058] text-[10px] font-semibold">
                    {sweetness} Sweetness
                  </span>
                  {oatMilkAddon && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold">
                      +Oat Milk
                    </span>
                  )}
                  {extraShotAddon && (
                    <span className="px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold">
                      +Extra Shot
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E8E0D6]">
              <span className="text-[12px] text-[#874D27] font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">tune</span>
                <span>Customized Recipe</span>
              </span>
              <div className="flex items-center gap-2 bg-[#F0EEE8] px-2 py-1 rounded-full border border-[#E8E0D6]">
                <button
                  type="button"
                  onClick={() => setColdBrewQty(Math.max(1, coldBrewQty - 1))}
                  className="w-6 h-6 rounded-full bg-[#FFFEFA] text-[#1C1C18] flex items-center justify-center text-[13px] font-bold hover:bg-[#EBE8E2] active:scale-95"
                >
                  −
                </button>
                <span className="text-[12px] font-bold text-[#1C1C18] w-4 text-center">
                  {coldBrewQty}
                </span>
                <button
                  type="button"
                  onClick={() => setColdBrewQty(coldBrewQty + 1)}
                  className="w-6 h-6 rounded-full bg-[#FFFEFA] text-[#1C1C18] flex items-center justify-center text-[13px] font-bold hover:bg-[#EBE8E2] active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Item 2: Herbed Toast Fingers */}
          <div className="bg-[#FFFEFA] p-3.5 rounded-xl border border-[#E8E0D6] shadow-xs flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#F0EEE8] border border-[#E8E0D6]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz0Ypr7O7nima6SPyqb6C0KJV_LATjvui0t-utXRW-2W7MYugtKhLRrBdo-0oadwCaC_oPEezFaJVX37rRbJtj1Z2vHHTKN8vJqfaPPo--jib4PsVuidb5Ashx2l-QjDdhkHdZCoz0rxY2h4xRvPZIL7xzx-0XY3uc5DnhqA9FCh6xJFIfboLMRsiKhl7ObosW8xdTnb23G8XJLeR6F6czm1pNSQsv35h8Lo_iaOhCURdDrxlyWxZgBA"
                  alt="Herbed Toast Fingers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-[#C5ECCB] text-[#00210D] px-1.5 py-0.5 rounded text-[9px] font-bold">
                  Warm
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h2 className="font-serif font-bold text-[17px] text-[#1C1C18] truncate">
                    Herbed Toast Fingers
                  </h2>
                  <span className="text-[15px] text-[#874D27] font-bold shrink-0">
                    {formatPaiseToRupees(baseToastPrice * toastQty)}
                  </span>
                </div>
                <p className="text-[11px] text-[#52443C] line-clamp-1 mt-0.5">
                  Sourdough, garlic-herb compound butter
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#C5ECCB] text-[#00210D] text-[10px] font-bold flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px] material-symbols-filled">
                      eco
                    </span>
                    <span>100% Veg</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#F0EEE8] text-[#52443C] text-[10px] font-medium">
                    Extra Crisp Oven Heated
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E8E0D6]">
              <span className="text-[11px] text-[#52443C] flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px] text-[#874D27]">
                  local_fire_department
                </span>
                <span>Station Warmer Ready</span>
              </span>
              <div className="flex items-center gap-2 bg-[#F0EEE8] px-2 py-1 rounded-full border border-[#E8E0D6]">
                <button
                  type="button"
                  onClick={() => setToastQty(Math.max(1, toastQty - 1))}
                  className="w-6 h-6 rounded-full bg-[#FFFEFA] text-[#1C1C18] flex items-center justify-center text-[13px] font-bold hover:bg-[#EBE8E2] active:scale-95"
                >
                  −
                </button>
                <span className="text-[12px] font-bold text-[#1C1C18] w-4 text-center">
                  {toastQty}
                </span>
                <button
                  type="button"
                  onClick={() => setToastQty(toastQty + 1)}
                  className="w-6 h-6 rounded-full bg-[#FFFEFA] text-[#1C1C18] flex items-center justify-center text-[13px] font-bold hover:bg-[#EBE8E2] active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Customization Panel (Accordion / Embedded Drawer) */}
        <div className="bg-[#F6F3ED] p-4 rounded-xl border border-[#E8E0D6] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#874D27] text-[20px]">
                science
              </span>
              <span className="font-serif font-bold text-[16px] text-[#1C1C18]">
                Fine-tune Classic Cold Brew
              </span>
            </div>
            <span className="text-[10px] uppercase font-bold bg-[#F9DDD3] text-[#756058] px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
              Serving Size
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Small', 'Regular', 'Large'] as const).map((s) => {
                const isSelected = size === s;
                const adjustmentText = s === 'Small' ? '(-₹20)' : s === 'Large' ? '(+₹30)' : '(₹0)';
                const volumeText = s === 'Small' ? '250ml' : s === 'Large' ? '450ml' : '350ml';
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`py-2 px-1 rounded-xl flex flex-col items-center transition-all ${
                      isSelected
                        ? 'bg-[#874D27] text-white shadow-xs'
                        : 'bg-[#FFFEFA] text-[#1C1C18] border border-[#E8E0D6] hover:bg-[#F0EEE8]'
                    }`}
                  >
                    <span className="text-[12px] font-bold">{s}</span>
                    <span
                      className={`text-[10px] ${
                        isSelected ? 'text-[#FFDBC8]' : 'text-[#52443C]'
                      }`}
                    >
                      {volumeText} {adjustmentText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sweetness Selector */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                Sweetness Level
              </label>
              <span className="text-[10px] text-[#41644A] font-bold">
                Requested: Lower Sugar
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { key: 'Unsweetened', label: 'Unsweetened (0%)' },
                { key: 'Less Sweet', label: 'Less Sweet (50%)' },
                { key: 'Classic', label: 'Classic (100%)' },
              ].map((sw) => {
                const isSelected = sweetness === sw.key;
                return (
                  <button
                    key={sw.key}
                    type="button"
                    onClick={() => setSweetness(sw.key as any)}
                    className={`py-2 px-1 rounded-xl text-[12px] font-bold transition-all text-center ${
                      isSelected
                        ? 'bg-[#FFDBC8] text-[#321300] border border-[#874D27]/30'
                        : 'bg-[#FFFEFA] text-[#1C1C18] border border-[#E8E0D6] hover:bg-[#F0EEE8]'
                    }`}
                  >
                    {sw.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roastery Enhancements */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#E8E0D6]">
            <div className="flex items-center justify-between">
              <label className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                Roastery Enhancements
              </label>
              <span className="text-[11px] text-[#52443C] font-semibold">
                Headroom {formatPaiseToRupees(remainingBudgetPaise)} left
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFEFA] border border-[#E8E0D6] cursor-pointer hover:bg-[#F0EEE8] transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={oatMilkAddon}
                    onChange={(e) => setOatMilkAddon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#41644A] focus:ring-[#41644A] accent-[#41644A]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1C1C18]">
                      Oat Milk Infusion
                    </span>
                    <span className="text-[10px] text-[#52443C]">
                      Creamy plant-based blend (+₹30)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#00210D] bg-[#C5ECCB] px-2 py-0.5 rounded-full font-bold">
                  Budget Safe: ₹230
                </span>
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl bg-[#FFFEFA] border border-[#E8E0D6] cursor-pointer hover:bg-[#F0EEE8] transition-colors">
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={extraShotAddon}
                    onChange={(e) => setExtraShotAddon(e.target.checked)}
                    className="w-4 h-4 rounded text-[#41644A] focus:ring-[#41644A] accent-[#41644A]"
                  />
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#1C1C18]">
                      Extra Ristretto Espresso Shot
                    </span>
                    <span className="text-[10px] text-[#52443C]">
                      Intense punch (+₹40)
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-[#00210D] bg-[#C5ECCB] px-2 py-0.5 rounded-full font-bold">
                  Budget Safe: ₹240
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Queue-Aware Timing Card ("Your Café Timing") */}
        <div className="bg-[#FFFEFA] p-4 rounded-xl border border-[#E8E0D6] shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F9DDD3] text-[#756058] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">timer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                  Your Café Timing
                </span>
                <span className="font-serif font-bold text-[16px] text-[#1C1C18]">
                  Ready in 5–8 minutes
                </span>
              </div>
            </div>
            <div className="px-2.5 py-1 rounded-md bg-[#F0EEE8] border border-[#E8E0D6] text-[#1C1C18] text-[12px] font-bold">
              ETA 11:41 AM
            </div>
          </div>

          <div className="flex items-center gap-2 p-2 rounded-lg bg-[#F6F3ED] text-[#52443C] text-[12px] border border-[#E8E0D6]">
            <span className="material-symbols-outlined text-[#874D27] text-[16px] shrink-0">
              speed
            </span>
            <span>
              Queue Telemetry: <strong>3 active drinks ahead</strong> at Cold Tap & Toast warmer.
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="relative pl-6 flex flex-col gap-3 pt-2">
            <div className="absolute left-2.5 top-3 bottom-3 w-0.5 bg-[#E5E2DC]"></div>

            <div className="relative flex items-center justify-between">
              <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#41644A] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[12px] material-symbols-filled">
                  check
                </span>
              </div>
              <span className="text-[12px] text-[#1C1C18] font-bold">Order Confirmed & Routed</span>
              <span className="text-[11px] text-[#52443C]">Instant</span>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#874D27] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[12px]">local_cafe</span>
              </div>
              <span className="text-[12px] text-[#1C1C18] font-bold">
                Nitrogen Tap Pour & Sourdough Toaster
              </span>
              <span className="text-[11px] text-[#52443C]">~4 mins</span>
            </div>

            <div className="relative flex items-center justify-between">
              <div className="absolute -left-6 w-5 h-5 rounded-full bg-[#E5E2DC] flex items-center justify-center text-[#52443C]">
                <span className="material-symbols-outlined text-[12px]">handshake</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[12px] text-[#1C1C18] font-bold">
                  Counter Pickup (Express Station A)
                </span>
                <span className="text-[10px] text-[#41644A] font-bold">
                  Safe for 12:00 PM Meeting
                </span>
              </div>
              <span className="text-[11px] text-[#1C1C18] font-bold">11:41 AM</span>
            </div>
          </div>
        </div>

        {/* Pickup Mode & Station Logistics */}
        <div className="bg-[#F6F3ED] p-3.5 rounded-xl border border-[#E8E0D6] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
              Fulfillment Mode
            </span>
            <span className="text-[11px] text-[#52443C] font-semibold">
              Station A (Express Bar)
            </span>
          </div>

          <div className="grid grid-cols-2 p-1 bg-[#F0EEE8] rounded-xl gap-1 border border-[#E8E0D6]">
            <button
              type="button"
              onClick={() => setFulfillment('dine_in')}
              className={`py-2 rounded-lg text-[12px] font-bold transition-all text-center ${
                fulfillment === 'dine_in'
                  ? 'bg-[#FFFEFA] text-[#1C1C18] shadow-xs'
                  : 'text-[#52443C] hover:text-[#1C1C18]'
              }`}
            >
              Dining In Roastery
            </button>
            <button
              type="button"
              onClick={() => setFulfillment('grab_and_go')}
              className={`py-2 rounded-lg text-[12px] font-bold transition-all text-center ${
                fulfillment === 'grab_and_go'
                  ? 'bg-[#FFFEFA] text-[#1C1C18] shadow-xs'
                  : 'text-[#52443C] hover:text-[#1C1C18]'
              }`}
            >
              Express Grab & Go
            </button>
          </div>

          <div className="flex items-center gap-2 pt-0.5 text-[#52443C] text-[12px]">
            <span className="material-symbols-outlined text-[16px] text-[#874D27]">
              location_on
            </span>
            <span className="truncate font-medium">
              Koramangala 4th Block, 80 Feet Road, Bengaluru
            </span>
          </div>
        </div>

        {/* Budget Guardrail & Cost Itemization */}
        <div className="bg-[#FFFEFA] p-4 rounded-xl border border-[#E8E0D6] shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-serif font-bold text-[17px] text-[#1C1C18]">
              Payment Summary
            </span>
            <span className="text-[10px] font-bold bg-[#C5ECCB] text-[#00210D] px-2.5 py-0.5 rounded-full uppercase">
              {subtotalPaise <= budgetLimitPaise ? 'Verified In-Budget' : 'Over Budget'}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[12px] font-bold">
              <span className="text-[#1C1C18]">Budget Utilization</span>
              <span className="text-[#874D27]">
                {formatPaiseToRupees(subtotalPaise)} of {formatPaiseToRupees(budgetLimitPaise)} ({utilizationPercent}%)
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#F0EEE8] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  subtotalPaise <= budgetLimitPaise ? 'bg-[#41644A]' : 'bg-[#BA1A1A]'
                }`}
                style={{ width: `${utilizationPercent}%` }}
              />
            </div>
            <span className="text-[11px] text-[#41644A] font-semibold">
              {subtotalPaise <= budgetLimitPaise
                ? `${formatPaiseToRupees(remainingBudgetPaise)} headroom remaining for future upgrades.`
                : `Exceeds budget limit by ${formatPaiseToRupees(Math.abs(remainingBudgetPaise))}`}
            </span>
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E8E0D6] text-[13px] text-[#52443C]">
            <div className="flex justify-between">
              <span>Items Subtotal ({coldBrewQty + toastQty} items)</span>
              <span className="text-[#1C1C18] font-bold">{formatPaiseToRupees(subtotalPaise)}</span>
            </div>
            <div className="flex justify-between">
              <span>Customization Adjustments</span>
              <span className="text-[#1C1C18] font-bold">
                {formatPaiseToRupees((sizeAdjustment + addonAdjustment) * coldBrewQty)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Roastery Packaging & GST</span>
              <span className="text-[#41644A] font-semibold">Included (₹0)</span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#E8E0D6] font-bold text-[#1C1C18]">
              <span className="font-serif text-[18px]">Total Payable</span>
              <span className="font-serif text-[22px] text-[#874D27]">
                {formatPaiseToRupees(subtotalPaise)}
              </span>
            </div>
          </div>
        </div>

        {/* Micro Note for Barista */}
        <div className="flex items-center gap-2 p-3 bg-[#F0EEE8] rounded-xl border border-[#E8E0D6] text-[12px]">
          <span className="material-symbols-outlined text-[18px] text-[#6E5A53]">
            stylus
          </span>
          <input
            type="text"
            value={baristaNote}
            onChange={(e) => setBaristaNote(e.target.value)}
            placeholder="Add note for barista (e.g. extra ice, straw type)..."
            className="bg-transparent border-0 outline-none w-full text-[#1C1C18] placeholder:text-[#52443C]/60 text-[12px]"
          />
        </div>
      </main>

      {/* Bottom Sticky Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 p-4 bg-[#FCF9F3]/95 backdrop-blur-xl border-t border-[#E8E0D6] shadow-[0_-4px_20px_rgba(53,37,31,0.06)] z-40">
        <div className="max-w-md mx-auto flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#41644A] animate-pulse"></span>
              <span className="text-[11px] text-[#1C1C18] font-bold">
                Total: {formatPaiseToRupees(subtotalPaise)} · Ready in ~6m (11:41 AM)
              </span>
            </div>
            <span className="text-[10px] text-[#41644A] font-bold">
              100% Budget Safe
            </span>
          </div>

          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-xl bg-[#874D27] text-white font-bold text-[14px] flex items-center justify-center gap-2 shadow-sm hover:bg-[#6E3914] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Connecting to Barista KDS...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">lock</span>
                <span>Confirm & Send to Barista ({formatPaiseToRupees(subtotalPaise)})</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('/recommendations')}
            className="w-full text-center py-1 text-[11px] text-[#52443C] hover:text-[#1C1C18] transition-colors flex items-center justify-center gap-1 font-semibold"
          >
            <span className="material-symbols-outlined text-[14px]">arrow_back</span>
            <span>Return to Pairings & Discovery</span>
          </button>
        </div>
      </div>

      <CustomerNav currentPath="/checkout" onNavigate={onNavigate} />
    </div>
  );
};
