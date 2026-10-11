/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Café Companion — Domain Models & Type System
 * All financial amounts are stored in integer paise (₹1 = 100 paise)
 * to prevent floating-point calculation inaccuracies.
 */

export type DietaryTag = 
  | 'Vegetarian' 
  | 'Dairy-Free' 
  | 'Low Sugar' 
  | 'Low Calorie' 
  | 'Gluten-Free' 
  | 'Vegan' 
  | 'Zero Sugar';

export type MenuCategory = 
  | 'Cold Extraction' 
  | 'Hot Espresso' 
  | 'Bakery & Warm Bite' 
  | 'Artisanal Teas' 
  | 'Single-Origin Reserve';

export interface CustomizationOption {
  servingSize?: 'Small (250ml)' | 'Regular (350ml)' | 'Large (450ml)';
  sweetness?: 'Unsweetened (0%)' | 'Less Sweet (50%)' | 'Classic (100%)';
  milkType?: 'Whole Milk' | 'Oat Milk' | 'Almond Milk' | 'Black / None';
  roasteryEnhancements?: string[];
  temperaturePreference?: 'Iced' | 'Hot' | 'Extra Crisp';
  specialNotes?: string;
  adjustmentInPaise?: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  /** Price in integer paise (e.g. ₹140 = 14000) */
  priceInPaise: number;
  available: boolean;
  dietaryTags: DietaryTag[];
  preparationTimeMinutes: number;
  imageUrl?: string;
  badge?: string;
  tastingNotes?: string;
  originEstate?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  quantity: number;
  /** Unit price in integer paise */
  unitPriceInPaise: number;
  customizations?: CustomizationOption;
  dietaryTags?: DietaryTag[];
  itemTotalInPaise?: number;
}

export type OrderStatus = 
  | 'draft'
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'collected'
  | 'cancelled';

export type FulfilmentMethod = 
  | 'express_pickup' 
  | 'dine_in' 
  | 'counter_collection';

export interface StationRoutingStatus {
  primaryStation: string;
  secondaryStation?: string;
  primaryStationStatus: string;
  secondaryStationStatus?: string;
  estimatedRemainingMinutes: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName?: string;
  items: OrderItem[];
  /** Calculated subtotal in integer paise */
  subtotalInPaise: number;
  /** Final calculated total in integer paise */
  totalInPaise: number;
  /** Customer budget limit in integer paise (e.g. ₹250 = 25000) */
  budgetLimitInPaise: number;
  status: OrderStatus;
  fulfilmentMethod: FulfilmentMethod;
  /** ISO string or timestamp of estimated ready time */
  estimatedReadyAt: string;
  createdAt: string;
  updatedAt: string;
  pickupCode?: string;
  counterBay?: string;
  tableNumber?: string;
  customerNotes?: string;
  baristaNotes?: string;
  isRushSimulated?: boolean;
  stationRouting?: StationRoutingStatus;
}

export interface StationWorkload {
  id: string;
  name: string;
  activeItemsCount: number;
  loadPercentage: number;
  statusText: string;
  statusLevel: 'normal' | 'high' | 'available';
}

export interface GeminiOperationalRecommendation {
  id: string;
  title: string;
  description: string;
  impactType: 'High Impact' | 'Taste Calibration' | 'Inventory Risk';
  impactBadge: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  dismissed?: boolean;
  applied?: boolean;
}

export interface ClosedLoopCase {
  id: string;
  caseNumber: string;
  title: string;
  resolvedDate: string;
  steps: {
    voiceSignal: {
      quote: string;
      source: string;
    };
    barTelemetry: {
      observation: string;
      sensor: string;
    };
    geminiStrategy: {
      strategy: string;
      action: string;
    };
    humanSignOff: {
      details: string;
      status: string;
    };
    outcomeMeasured: {
      metrics: string;
      result: string;
    };
  };
}
