/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Screen 1: Customer Home (/discover)
 * Mobile-first discovery with Roastery presence, café moments, and AI Concierge composer.
 */

import React, { useState } from 'react';
import { Header } from '../shared/Header';
import { CustomerNav } from '../shared/CustomerNav';
import { formatPaiseToRupees } from '../../lib/currency';

interface CustomerHomeProps {
  onNavigate: (path: string) => void;
  onAddToCart?: (itemId: string) => void;
  cartCount?: number;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({
  onNavigate,
  onAddToCart,
  cartCount = 0,
}) => {
  const [selectedMoment, setSelectedMoment] = useState<string>('focus');
  const [selectedChips, setSelectedChips] = useState<string[]>([
    'Under ₹250',
    'Less sugar',
  ]);
  const [promptText, setPromptText] = useState<string>(
    'I have a meeting in 12 minutes. I want a vegetarian snack and a coffee under ₹250. I prefer less sugar. What should I order?'
  );
  const [isSearching, setIsSearching] = useState(false);
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  const moments = [
    {
      id: 'focus',
      title: 'Focus & Work',
      desc: 'Settle in and stay productive.',
      icon: 'laptop_chromebook',
    },
    {
      id: 'quick',
      title: 'Quick Break',
      desc: 'Something great, without wait.',
      icon: 'timer',
    },
    {
      id: 'friends',
      title: 'Meet Friends',
      desc: 'Good drinks, good company.',
      icon: 'diversity_1',
    },
    {
      id: 'discover',
      title: 'Discover',
      desc: 'Try single-origin microlots.',
      icon: 'auto_awesome',
    },
  ];

  const preferenceChips = [
    'Under ₹250',
    'Less sugar',
    'Under ₹150',
    'Dairy-free (Oat/Almond)',
    'Vegetarian',
    'Under ₹400',
    'Low caffeine',
  ];

  const quickInspirations = [
    {
      label: '⚡ Quick 5-min cold brew',
      prompt: 'Quick cold brew ready in under 5 minutes with a light citrus profile.',
    },
    {
      label: '🥐 Meeting in 12 mins under ₹250',
      prompt: 'I have a meeting in 12 minutes. Vegetarian bite and artisan coffee under ₹250 with less sugar.',
    },
    {
      label: '💻 Quiet focus setup + pour over',
      prompt: 'Quiet focus setup: Pourover V60 Estate batch, warm almond croissant, steady energy.',
    },
  ];

  const toggleChip = (chip: string) => {
    if (selectedChips.includes(chip)) {
      setSelectedChips(selectedChips.filter((c) => c !== chip));
    } else {
      setSelectedChips([...selectedChips, chip]);
    }
  };

  const handleAskConcierge = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      onNavigate('/recommendations');
    }, 700);
  };

  const handleAdd = (id: string) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    if (onAddToCart) onAddToCart(id);
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#FCF9F3] text-[#1C1C18] flex flex-col pb-24 selection:bg-[#F9DDD3] selection:text-[#756058]">
      <Header
        subtitle="Koramangala Roastery · Open"
        cartCount={cartCount}
        onCartClick={() => onNavigate('/checkout')}
        onSwitchToOperations={() => onNavigate('/operations')}
      />

      <main className="flex-1 w-full max-w-lg mx-auto pt-20 px-4 flex flex-col space-y-6">
        {/* Roastery Presence & Table Status */}
        <section className="flex items-center justify-between bg-[#F0EEE8] px-4 py-2.5 rounded-full border border-[#E8E0D6] shadow-xs">
          <div className="flex items-center space-x-2 min-w-0">
            <span className="material-symbols-outlined text-[#874D27] text-[18px] shrink-0 material-symbols-filled">
              storefront
            </span>
            <span className="text-[13px] font-bold text-[#1C1C18] truncate">
              Blue Tokai Roastery · Table 07
            </span>
          </div>
          <div className="flex items-center space-x-1.5 shrink-0 bg-[#597D61]/15 px-2.5 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#41644A] animate-ping"></span>
            <span className="text-[11px] font-bold text-[#41644A]">
              Accepting Orders (7–9m)
            </span>
          </div>
        </section>

        {/* Editorial Invitation & Visual Anchor */}
        <section className="relative bg-[#FFFEFA] p-5 rounded-2xl border border-[#E8E0D6] shadow-xs space-y-4 overflow-hidden">
          <div className="space-y-1.5 z-10 relative">
            <span className="text-[10px] uppercase tracking-widest text-[#874D27] font-bold">
              Morning Extraction Ritual
            </span>
            <h1 className="font-serif font-bold text-[28px] sm:text-[32px] text-[#1C1C18] leading-tight">
              Make time for a better coffee.
            </h1>
            <p className="text-[14px] text-[#52443C] leading-relaxed">
              Tell us what you're craving. We'll find the right order for your mood, taste, budget, and schedule.
            </p>
          </div>

          {/* Editorial Image Card */}
          <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-inner border border-[#E8E0D6]/80">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXTtpsOymkD3Q3cQYlPQQ7Q_abBuU85eGwn5CFzErVzFrItG6BuixgzmhYFkniW70-vGEnwmdYNFzbU1T3ZiMvFPyxXk0n6snxZ4_uSb_dc1XofXk0v-_chVx7z0cyFFaaEB4zc5zPb55ApGKFT07qiBI2dAg8EpPFiFP14mGlLoB59uc7PlKO1YZetAXmPGhjt2o_xm5fvB6fB4V4OmxZ_t1I5z99uy9ddPcj10NyRCqVmDLnpfS6gA"
              alt="Artisanal pour-over coffee brewing setup with ceramic dripper blooming softly in warm morning sunlight"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C18]/70 via-transparent to-transparent flex items-end p-3">
              <span className="text-[11px] text-[#FFFEFA] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
                Featured Estate: Seethargundu Organic Microlot
              </span>
            </div>
          </div>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('concierge-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-3 px-5 rounded-xl bg-[#874D27] text-white font-bold text-[14px] flex items-center justify-center space-x-2 active:scale-[0.98] transition-all shadow-sm hover:bg-[#6E3914]"
            >
              <span>Find my perfect order</span>
              <span className="material-symbols-outlined text-[18px]">magic_button</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/recommendations')}
              className="w-full py-3 px-5 rounded-xl bg-[#F0EEE8] hover:bg-[#EBE8E2] text-[#1C1C18] font-bold text-[14px] flex items-center justify-center space-x-1.5 active:scale-[0.98] transition-all"
            >
              <span>Explore the menu</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </section>

        {/* Live Queue Reassurance Banner */}
        <section className="bg-[#F6F3ED] px-4 py-3 rounded-xl border border-[#E8E0D6] flex items-center justify-between shadow-xs">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#F9DDD3] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[#756058] text-[16px]">
                hourglass_top
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
                Barista Bar Live Queue
              </span>
              <span className="text-[12px] font-semibold text-[#1C1C18] truncate">
                3 ahead · Espresso Station 6m · Bakery 3m
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#874D27] text-[20px] shrink-0">
            speed
          </span>
        </section>

        {/* Context Selector ("What's your café moment?") */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-serif font-bold text-[20px] text-[#1C1C18]">
              What's your café moment?
            </h2>
            <span className="text-[11px] text-[#52443C] font-semibold">Tap to customize</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {moments.map((m) => {
              const isSelected = selectedMoment === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMoment(m.id)}
                  className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between space-y-3 active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#F9DDD3] text-[#756058] border-[#874D27]/30 shadow-xs'
                      : 'bg-[#FFFEFA] text-[#1C1C18] border-[#E8E0D6] hover:bg-[#F6F3ED]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isSelected
                          ? 'bg-[#874D27] text-white shadow-xs'
                          : 'bg-[#EBE8E2] text-[#1C1C18]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {m.icon}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-[#874D27] text-[20px] material-symbols-filled">
                        check_circle
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[14px] text-[#1C1C18]">{m.title}</h3>
                    <p className="text-[12px] text-[#52443C] leading-snug mt-0.5">
                      {m.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Personal Preference Chips (Horizontal Scroll) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold">
              Preferences & Dietary
            </span>
            <span className="text-[11px] font-bold text-[#874D27]">
              {selectedChips.length} active
            </span>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
            {preferenceChips.map((chip) => {
              const isSelected = selectedChips.includes(chip);
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => toggleChip(chip)}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-[12px] font-semibold flex items-center space-x-1 border transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#F9DDD3] text-[#756058] border-[#874D27]/40 shadow-xs'
                      : 'bg-[#FFFEFA] text-[#52443C] border-[#E8E0D6] hover:bg-[#F0EEE8]'
                  }`}
                >
                  {isSelected && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  <span>{chip}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* AI Request Composer */}
        <section
          id="concierge-section"
          className="relative bg-[#FFFEFA] p-5 rounded-2xl border border-[#E8E0D6] shadow-sm space-y-4"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#F9DDD3] flex items-center justify-center text-[#874D27] shadow-xs">
                <span className="material-symbols-outlined text-[22px]">
                  psychology
                </span>
              </div>
              <div>
                <h2 className="font-serif font-bold text-[19px] text-[#1C1C18]">
                  AI Café Concierge
                </h2>
                <p className="text-[11px] text-[#52443C]">
                  Powered by Gemini & Live Barista Queue
                </p>
              </div>
            </div>
            <span className="text-[11px] bg-[#597D61]/15 text-[#41644A] px-2.5 py-0.5 rounded-full font-bold">
              Live Sync
            </span>
          </div>

          {/* Text Area */}
          <div className="relative bg-[#F6F3ED] rounded-xl p-3 border border-[#E8E0D6] shadow-inner">
            <label
              htmlFor="concierge-prompt"
              className="text-[10px] uppercase tracking-wider text-[#52443C] font-bold mb-1.5 block"
            >
              Tell Concierge your cravings & timing
            </label>
            <textarea
              id="concierge-prompt"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              rows={3}
              className="w-full bg-transparent text-[14px] text-[#1C1C18] focus:outline-none resize-none placeholder:text-[#52443C]/60"
              placeholder="E.g., I have a meeting in 12 minutes. I want a vegetarian snack and a coffee under ₹250. Less sugar preferred."
            />
            <div className="flex justify-between items-center pt-2 text-[#52443C] border-t border-[#E8E0D6]/60">
              <div className="flex items-center space-x-1 text-[#874D27] text-[12px] font-semibold">
                <span className="material-symbols-outlined text-[15px]">tune</span>
                <span>Budget ₹250 · 12m cutoff</span>
              </div>
              <button
                type="button"
                onClick={() => setPromptText('')}
                className="text-[11px] text-[#52443C] hover:text-[#1C1C18] font-semibold"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Quick Inspirations */}
          <div className="space-y-1.5">
            <span className="text-[11px] text-[#52443C] font-semibold">
              Quick inspirations:
            </span>
            <div className="flex flex-col space-y-1.5">
              {quickInspirations.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPromptText(item.prompt)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-[#F0EEE8] hover:bg-[#EBE8E2] transition-colors text-[13px] text-[#1C1C18] flex items-center justify-between"
                >
                  <span className="truncate">{item.label}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#52443C]">
                    north_east
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleAskConcierge}
            disabled={isSearching}
            className="w-full py-3.5 px-5 rounded-xl bg-[#874D27] text-white font-bold text-[14px] flex items-center justify-center space-x-2 shadow-sm active:scale-[0.98] transition-all hover:bg-[#6E3914]"
          >
            {isSearching ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  progress_activity
                </span>
                <span>Checking Roastery Queue & Pairing...</span>
              </>
            ) : (
              <>
                <span>Ask Concierge & Check Queue</span>
                <span className="material-symbols-outlined text-[20px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </section>

        {/* Curated Sensory Recommendations (Demonstration Pairings) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="font-serif font-bold text-[20px] text-[#1C1C18]">
                Curated Pairings for You
              </h2>
              <p className="text-[11px] text-[#52443C]">
                Matched to your ₹250 budget & 12-min schedule
              </p>
            </div>
            <span className="text-[11px] text-[#874D27] font-bold">Optimal Match</span>
          </div>

          {/* Match Card 1: Silver Oak Cold Brew */}
          <div className="bg-[#FFFEFA] p-4 rounded-2xl border border-[#E8E0D6] shadow-xs flex space-x-3.5 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#F0EEE8]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6SglZEbzvD24SE2iovpm4vESFEtDoo8XJ-BdNLcMxH1Xl8-yJfZ1gEujiPFSEJGRPevWqQ2vtp3KN6FvpNMWyg2gwygsPujzKDr5gMnTdYoNcQqWYyb8fzO38ttv2NXlmk2nc5gkdoQp8Qt5O_HjrcdLaEQmSg9_vKk6atC43vuya6Czl12IEYqoz8He6fizgP3Wgw2_Hq4B3CnGaYN1byH8vptVNPLtU3Z9Mx63RuwKpxwSIQACaRQ"
                alt="Silver Oak Cold Brew"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-bold text-[#41644A]">
                4m brew
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-wider text-[#874D27] font-bold">
                  Cold Extraction
                </span>
                <span className="text-[15px] text-[#1C1C18] font-bold">
                  {formatPaiseToRupees(19000)}
                </span>
              </div>
              <h3 className="font-serif font-bold text-[17px] text-[#1C1C18] truncate leading-snug">
                Silver Oak Cold Brew
              </h3>
              <p className="text-[12px] text-[#52443C] line-clamp-1">
                Zero sugar · Notes of plum and dark chocolate
              </p>
              <div className="flex items-center space-x-2 pt-0.5">
                <span className="text-[10px] text-[#41644A] bg-[#597D61]/15 px-2 py-0.5 rounded-full font-bold">
                  On time for 12m
                </span>
                <button
                  type="button"
                  onClick={() => handleAdd('item-silver-oak')}
                  className="ml-auto text-[#874D27] font-bold text-[12px] flex items-center space-x-0.5 hover:text-[#6E3914]"
                >
                  <span>{addedItems['item-silver-oak'] ? 'Added' : 'Add'}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {addedItems['item-silver-oak'] ? 'check_circle' : 'add_circle'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Match Card 2: Herbed Toast Finger */}
          <div className="bg-[#FFFEFA] p-4 rounded-2xl border border-[#E8E0D6] shadow-xs flex space-x-3.5 items-center">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative bg-[#F0EEE8]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBchi11YeRfyYbfui32GczqQsk2O3yb1YlmBHeJ75MwyFfqOSIF91KJ_59HriTwHo2JxjRSTmE3YMwKtLUTxEljv7mYwIS1FjG488hmdQxIvBULF8fHQGjG_1XClWFLFY4XHUcH18A0WBxWe1xLrKxLliiN9xJ8NxrmDwzYyDRDIakKjGAk8GCYSti6KyZuVeS0KxQmY7joRq5juCOJjFb_H7MVEG7U_U7uFdoTVCmZdl7xLlxnndOKIA"
                alt="Herbed Toast Finger"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1 right-1 bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded text-[10px] font-bold text-[#41644A]">
                3m warm
              </span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase tracking-wider text-[#6E5A53] font-bold">
                  Bakery & Warm Bite
                </span>
                <span className="text-[15px] text-[#1C1C18] font-bold">
                  {formatPaiseToRupees(6000)}
                </span>
              </div>
              <h3 className="font-serif font-bold text-[17px] text-[#1C1C18] truncate leading-snug">
                Herbed Toast Finger
              </h3>
              <p className="text-[12px] text-[#52443C] line-clamp-1">
                Pure vegetarian · Light sea-salt & rosemary glaze
              </p>
              <div className="flex items-center space-x-2 pt-0.5">
                <span className="text-[10px] text-[#52443C] bg-[#F0EEE8] px-2 py-0.5 rounded-full font-bold">
                  Total: {formatPaiseToRupees(25000)}
                </span>
                <button
                  type="button"
                  onClick={() => handleAdd('item-toast-fingers')}
                  className="ml-auto text-[#874D27] font-bold text-[12px] flex items-center space-x-0.5 hover:text-[#6E3914]"
                >
                  <span>{addedItems['item-toast-fingers'] ? 'Added' : 'Add'}</span>
                  <span className="material-symbols-outlined text-[16px]">
                    {addedItems['item-toast-fingers'] ? 'check_circle' : 'add_circle'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <CustomerNav currentPath="/discover" onNavigate={onNavigate} />
    </div>
  );
};
