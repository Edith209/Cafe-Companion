/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { OrderItem } from '../../types/models';
import { evaluateBudgetGuardrail, formatPaiseToRupees } from '../../lib/currency';
import { PriceDisplay } from './PriceDisplay';

interface OrderSummaryProps {
  items: OrderItem[];
  subtotalInPaise: number;
  totalInPaise: number;
  budgetLimitInPaise: number;
  customizationTotalInPaise?: number;
  isCollapsible?: boolean;
  defaultExpanded?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotalInPaise,
  totalInPaise,
  budgetLimitInPaise,
  customizationTotalInPaise = 0,
  isCollapsible = false,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
  const budget = evaluateBudgetGuardrail(totalInPaise, budgetLimitInPaise);

  return (
    <div className="bg-[#FFFEFA] p-4.5 rounded-2xl border border-[#E8E0D6] shadow-[0_4px_20px_-2px_rgba(53,37,31,0.04)] flex flex-col gap-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-[17px] text-[#1C1C18]">
            Payment Summary
          </span>
          {isCollapsible && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-[#6E5A53] hover:text-[#1C1C18]"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isExpanded ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          )}
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider bg-[#C5ECCB] text-[#00210D] px-2.5 py-0.5 rounded-full">
          Verified In-Budget
        </span>
      </div>

      {/* Budget Progress Bar */}
      <div className="flex flex-col gap-1.5 bg-[#F6F3ED] p-3 rounded-xl border border-[#E8E0D6]">
        <div className="flex justify-between text-[12px] font-bold">
          <span className="text-[#1C1C18]">Budget Utilization</span>
          <span className="text-[#874D27]">
            {formatPaiseToRupees(totalInPaise)} of {formatPaiseToRupees(budgetLimitInPaise)} ({budget.utilizationPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#E5E2DC] overflow-hidden">
          <div
            className="h-full bg-[#41644A] rounded-full transition-all duration-500"
            style={{ width: `${budget.utilizationPercent}%` }}
          />
        </div>
        <span className="text-[11px] text-[#41644A] font-semibold">
          {budget.headroomText}
        </span>
      </div>

      {/* Itemized Lines */}
      {(!isCollapsible || isExpanded) && (
        <div className="flex flex-col gap-2 pt-1 border-t border-[#E8E0D6] text-[13px] text-[#52443C]">
          <div className="flex justify-between">
            <span>Items Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
            <PriceDisplay paise={subtotalInPaise} size="sm" weight="medium" color="espresso" />
          </div>
          <div className="flex justify-between">
            <span>Customization Adjustments</span>
            <PriceDisplay paise={customizationTotalInPaise} size="sm" weight="medium" color="espresso" />
          </div>
          <div className="flex justify-between">
            <span>Roastery Packaging & GST</span>
            <span className="text-[#41644A] font-semibold">Included (₹0)</span>
          </div>

          <div className="flex justify-between items-center pt-2.5 border-t border-[#E8E0D6] font-bold">
            <span className="font-serif text-[17px] text-[#1C1C18]">Total Payable</span>
            <PriceDisplay paise={totalInPaise} size="lg" weight="bold" color="primary" />
          </div>
        </div>
      )}
    </div>
  );
};
