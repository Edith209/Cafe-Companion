/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Café Companion — Currency & Financial Calculations
 * All internal values are handled as integer paise (100 paise = ₹1.00).
 * Conversions to Rupees happen strictly at display time.
 */

import { OrderItem } from '../types/models';

/**
 * Format integer paise into Indian Rupee display format.
 * Examples:
 * - 20000 paise -> "₹200"
 * - 14000 paise -> "₹140"
 * - 6000 paise  -> "₹60"
 * - 25050 paise -> "₹250.50"
 */
export function formatPaiseToRupees(paise: number, forceDecimals = false): string {
  if (isNaN(paise) || !isFinite(paise)) return '₹0';
  
  const rupees = paise / 100;
  
  if (forceDecimals || paise % 100 !== 0) {
    return `₹${rupees.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  return `₹${rupees.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
  })}`;
}

/**
 * Converts a rupee number to integer paise (e.g. 250 -> 25000).
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

/**
 * Converts paise to a numeric rupee value for arithmetic if required.
 */
export function paiseToRupees(paise: number): number {
  return Math.round(paise) / 100;
}

/**
 * Calculate the total cost of an array of order items in integer paise.
 */
export function calculateOrderSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    const itemUnit = item.unitPriceInPaise;
    const customAdjustment = item.customizations?.adjustmentInPaise ?? 0;
    const itemTotal = (itemUnit + customAdjustment) * item.quantity;
    return sum + itemTotal;
  }, 0);
}

/**
 * Evaluates budget guardrail status and returns utilization percentages and remaining headroom.
 */
export function evaluateBudgetGuardrail(totalInPaise: number, budgetLimitInPaise: number) {
  const remainingPaise = budgetLimitInPaise - totalInPaise;
  const isWithinBudget = totalInPaise <= budgetLimitInPaise;
  const utilizationPercent = budgetLimitInPaise > 0 
    ? Math.min(100, Math.round((totalInPaise / budgetLimitInPaise) * 100))
    : 0;

  return {
    totalInPaise,
    budgetLimitInPaise,
    remainingPaise,
    utilizationPercent,
    isWithinBudget,
    formattedTotal: formatPaiseToRupees(totalInPaise),
    formattedBudget: formatPaiseToRupees(budgetLimitInPaise),
    formattedRemaining: formatPaiseToRupees(Math.abs(remainingPaise)),
    headroomText: isWithinBudget
      ? `₹${paiseToRupees(remainingPaise)} headroom remaining`
      : `Exceeds budget by ₹${paiseToRupees(Math.abs(remainingPaise))}`,
  };
}
