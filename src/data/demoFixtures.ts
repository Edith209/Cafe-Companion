/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Café Companion — Demonstration Fixtures & Preview Datasets
 * Strictly labeled demo fixtures for Milestone 1 preview.
 * Financial values are stored in integer paise.
 */

import { MenuItem, Order, StationWorkload, GeminiOperationalRecommendation, ClosedLoopCase } from '../types/models';

/**
 * Verified Menu Items
 * Classic Cold Brew: ₹140 (14000 paise)
 * Herbed Toast Fingers: ₹60 (6000 paise)
 */
export const DEMO_MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-cold-brew',
    name: 'Classic Cold Brew',
    description: 'Single-origin Chikmagalur estate bean slow-steeped for 18 hours for zero bitterness.',
    category: 'Cold Extraction',
    priceInPaise: 14000, // ₹140
    available: true,
    dietaryTags: ['Low Sugar', 'Zero Sugar', 'Dairy-Free'],
    preparationTimeMinutes: 4,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO-216_51qnt5qpfJrAvHN07VN7Sc9q1rxrpC8TY8_DX8zokh5gYBWGWz70DQWcax2g0n3TfJ2w2nbMblONBz9tKn0H0a6hcOYyPjM6JthMn1CMTzWfID5Xqm3w9jshcZI_L-WMfOoWsAT9YnCWvobrsxUhS-T0R6OOpylfTOy9clLno1hAsGJK9UXvuUbHZAqg_KoSzzZoH5_rtRY1ka-8cMg0cz_dPJ65yBo4HIdIkX550mH6quOQQ',
    badge: '18h Brew',
    tastingNotes: 'Dried fig, cocoa nibs, mellow acidity',
    originEstate: 'Chikmagalur Estate',
  },
  {
    id: 'item-toast-fingers',
    name: 'Herbed Toast Fingers',
    description: 'Artisanal sourdough toast batons brushed with garlic-herb compound butter and sea salt.',
    category: 'Bakery & Warm Bite',
    priceInPaise: 6000, // ₹60
    available: true,
    dietaryTags: ['Vegetarian'],
    preparationTimeMinutes: 3,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz0Ypr7O7nima6SPyqb6C0KJV_LATjvui0t-utXRW-2W7MYugtKhLRrBdo-0oadwCaC_oPEezFaJVX37rRbJtj1Z2vHHTKN8vJqfaPPo--jib4PsVuidb5Ashx2l-QjDdhkHdZCoz0rxY2h4xRvPZIL7xzx-0XY3uc5DnhqA9FCh6xJFIfboLMRsiKhl7ObosW8xdTnb23G8XJLeR6F6czm1pNSQsv35h8Lo_iaOhCURdDrxlyWxZgBA',
    badge: 'Warm',
    tastingNotes: 'Rosemary, sea-salt, sourdough crust',
  },
  {
    id: 'item-oat-latte',
    name: 'Iced Oat Latte',
    description: 'Single-origin espresso pulled over chilled Minor Figures oat milk, lightly shaken without syrups.',
    category: 'Cold Extraction',
    priceInPaise: 17000, // ₹170
    available: true,
    dietaryTags: ['Dairy-Free', 'Low Sugar', 'Vegan'],
    preparationTimeMinutes: 6,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp_gRdMkp8yBiwsqisSlsHY_cb-rrLfdtX-sqrbW2wbuGHNgbEv4L2_YcpJM4dM6Hdq8CgaLJQ9b61x1k0uHA-CUv__qze5ZNHzqtR0AmKn3QTEhnw0NHJRQE74paOjF1vKQS6wgpYPixnQ1N_GiXHRop_UMn7WBoPKCXWjTqT7HMM6_5l8OqGvGb3hZ4IjmVKGgQ_a2wFeHgkZKL4EP7dBwZz8jvdAYkoocE20W4oDsz3xqDYmtYyyA',
    badge: 'Best Match',
    tastingNotes: 'Toasted oats, velvety honeyed crema',
  },
  {
    id: 'item-silver-oak',
    name: 'Silver Oak Cold Brew',
    description: 'Reserve cold brew with notes of plum and dark chocolate. Zero sugar added.',
    category: 'Cold Extraction',
    priceInPaise: 19000, // ₹190
    available: true,
    dietaryTags: ['Zero Sugar', 'Dairy-Free', 'Low Calorie'],
    preparationTimeMinutes: 4,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6SglZEbzvD24SE2iovpm4vESFEtDoo8XJ-BdNLcMxH1Xl8-yJfZ1gEujiPFSEJGRPevWqQ2vtp3KN6FvpNMWyg2gwygsPujzKDr5gMnTdYoNcQqWYyb8fzO38ttv2NXlmk2nc5gkdoQp8Qt5O_HjrcdLaEQmSg9_vKk6atC43vuya6Czl12IEYqoz8He6fizgP3Wgw2_Hq4B3CnGaYN1byH8vptVNPLtU3Z9Mx63RuwKpxwSIQACaRQ',
    badge: '4m brew',
    tastingNotes: 'Plum, stone fruit, 70% dark cocoa',
    originEstate: 'Silver Oak Organic',
  },
  {
    id: 'item-espresso-tonic',
    name: 'Espresso Tonic',
    description: 'Crisp craft tonic water layered over double espresso shot and botanical sprig.',
    category: 'Cold Extraction',
    priceInPaise: 16000, // ₹160
    available: true,
    dietaryTags: ['Low Calorie', 'Dairy-Free', 'Vegan'],
    preparationTimeMinutes: 3,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGgdWzH4-eoMe1uoyhqi9JjgvwJfkj-8tudDZKChxSfIbGkWwVz-8Z-vF863KXqRnTVp2ClPGWWRXWejxRHv-3KFk5SExIqb8LstMzcvfSxsSa_IZ9xUnHULeRzASI0TzLoMI73SrT2WV3ogs4UU1pC3cPopgtWOApUqRzbGAoS4q8HO5T4GfsRnkxKBEX2GwXw5xhu4NcANOIzsc2XCdwdHpXcDOBMZH-EkYJHla_PEKMcVkK7AI1ew',
    badge: 'Rapid Prep',
    tastingNotes: 'Crisp citrus, botanical rosemary',
  },
  {
    id: 'item-cortado',
    name: 'Double Cortado',
    description: 'Equal parts rich anaerobic natural espresso and warm Minor Figures textured oat milk.',
    category: 'Hot Espresso',
    priceInPaise: 22000, // ₹220
    available: true,
    dietaryTags: ['Dairy-Free', 'Vegetarian'],
    preparationTimeMinutes: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXTtpsOymkD3Q3cQYlPQQ7Q_abBuU85eGwn5CFzErVzFrItG6BuixgzmhYFkniW70-vGEnwmdYNFzbU1T3ZiMvFPyxXk0n6snxZ4_uSb_dc1XofXk0v-_chVx7z0cyFFaaEB4zc5zPb55ApGKFT07qiBI2dAg8EpPFiFP14mGlLoB59uc7PlKO1YZetAXmPGhjt2o_xm5fvB6fB4V4OmxZ_t1I5z99uy9ddPcj10NyRCqVmDLnpfS6gA',
    badge: 'Barista Special',
    tastingNotes: 'Intense hazelnut, caramel body',
  },
  {
    id: 'item-tea-cake',
    name: 'Banana Walnut Tea Cake',
    description: 'Warm artisanal slice drizzled with salted espresso caramel glaze.',
    category: 'Bakery & Warm Bite',
    priceInPaise: 16000, // ₹160
    available: true,
    dietaryTags: ['Vegetarian'],
    preparationTimeMinutes: 2,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBchi11YeRfyYbfui32GczqQsk2O3yb1YlmBHeJ75MwyFfqOSIF91KJ_59HriTwHo2JxjRSTmE3YMwKtLUTxEljv7mYwIS1FjG488hmdQxIvBULF8fHQGjG_1XClWFLFY4XHUcH18A0WBxWe1xLrKxLliiN9xJ8NxrmDwzYyDRDIakKjGAk8GCYSti6KyZuVeS0KxQmY7joRq5juCOJjFb_H7MVEG7U_U7uFdoTVCmZdl7xLlxnndOKIA',
    badge: 'Fresh Bake',
    tastingNotes: 'Caramelized banana, roasted walnuts',
  },
  {
    id: 'item-plum-microlot',
    name: 'Seasonal Plum Microlot',
    description: 'Limited harvest anaerobic fermentation microlot with distinct stone fruit aromas.',
    category: 'Single-Origin Reserve',
    priceInPaise: 19000, // ₹190
    available: false, // 86'd
    dietaryTags: ['Zero Sugar', 'Dairy-Free'],
    preparationTimeMinutes: 6,
    badge: "86'd / Sold Out",
    tastingNotes: 'Black plum, jasmine, winey finish',
  },
];

/**
 * Standard Demonstration Order: #CC-1048
 * Classic Cold Brew × 1 (₹140 = 14000 paise)
 * Herbed Toast Fingers × 1 (₹60 = 6000 paise)
 * Subtotal: ₹200 (20000 paise)
 * Budget: ₹250 (25000 paise)
 * Savings: ₹50 (5000 paise)
 */
export const DEMO_ORDER_CC_1048: Order = {
  id: 'CC-1048',
  customerId: 'demo-guest-930',
  customerName: 'Kishore Pitta',
  items: [
    {
      menuItemId: 'item-cold-brew',
      name: 'Classic Cold Brew',
      quantity: 1,
      unitPriceInPaise: 14000,
      customizations: {
        servingSize: 'Regular (350ml)',
        sweetness: 'Less Sweet (50%)',
        milkType: 'Black / None',
        specialNotes: 'Extra ice, cold tap extraction',
        adjustmentInPaise: 0,
      },
      dietaryTags: ['Low Sugar', 'Zero Sugar'],
      itemTotalInPaise: 14000,
    },
    {
      menuItemId: 'item-toast-fingers',
      name: 'Herbed Toast Fingers',
      quantity: 1,
      unitPriceInPaise: 6000,
      customizations: {
        temperaturePreference: 'Extra Crisp',
        specialNotes: 'Garlic-herb compound butter warm',
        adjustmentInPaise: 0,
      },
      dietaryTags: ['Vegetarian'],
      itemTotalInPaise: 6000,
    },
  ],
  subtotalInPaise: 20000, // ₹200
  totalInPaise: 20000,    // ₹200
  budgetLimitInPaise: 25000, // ₹250
  status: 'preparing',
  fulfilmentMethod: 'express_pickup',
  estimatedReadyAt: '11:41 AM',
  createdAt: '11:34 AM',
  updatedAt: '11:38 AM',
  pickupCode: 'EXP-48',
  counterBay: 'Express Counter Shelf A-03',
  customerNotes: 'Extra napkins or chilled cup requested',
  stationRouting: {
    primaryStation: 'Cold Bar 01 — Nitro Pouring',
    secondaryStation: 'Bakery Warmer — 2 min left',
    primaryStationStatus: 'Active extraction',
    secondaryStationStatus: 'Warming & Buttering',
    estimatedRemainingMinutes: 4,
  },
};

export const DEMO_OPERATIONS_ORDERS: Order[] = [
  DEMO_ORDER_CC_1048,
  {
    id: 'CC-1049',
    customerId: 'guest-1049',
    customerName: 'Table 04 Guest',
    items: [
      {
        menuItemId: 'item-cortado',
        name: 'Double Cortado',
        quantity: 1,
        unitPriceInPaise: 22000,
        customizations: {
          servingSize: 'Regular (350ml)',
          milkType: 'Oat Milk',
        },
      },
      {
        menuItemId: 'item-tea-cake',
        name: 'Banana Walnut Tea Cake',
        quantity: 1,
        unitPriceInPaise: 16000,
      },
    ],
    subtotalInPaise: 38000,
    totalInPaise: 38000,
    budgetLimitInPaise: 40000,
    status: 'pending',
    fulfilmentMethod: 'dine_in',
    tableNumber: 'Table 04',
    estimatedReadyAt: '11:43 AM',
    createdAt: '11:36 AM',
    updatedAt: '11:36 AM',
  },
  {
    id: 'CC-1046',
    customerId: 'guest-1046',
    customerName: 'Priya S.',
    items: [
      {
        menuItemId: 'item-oat-latte',
        name: 'Iced Oat Latte',
        quantity: 2,
        unitPriceInPaise: 17000,
        customizations: {
          sweetness: 'Unsweetened (0%)',
          milkType: 'Oat Milk',
          specialNotes: 'Light Ice, Biodegradable Straws',
        },
      },
    ],
    subtotalInPaise: 34000,
    totalInPaise: 34000,
    budgetLimitInPaise: 40000,
    status: 'ready',
    fulfilmentMethod: 'express_pickup',
    pickupCode: 'EXP-42',
    counterBay: 'Express Counter A',
    estimatedReadyAt: '11:38 AM',
    createdAt: '11:28 AM',
    updatedAt: '11:37 AM',
  },
];

export const DEMO_STATION_WORKLOADS: StationWorkload[] = [
  {
    id: 'st-cold-bar',
    name: 'Cold Bar 01',
    activeItemsCount: 4,
    loadPercentage: 65,
    statusText: 'Normal Flow · Single Origin Nitro Active',
    statusLevel: 'normal',
  },
  {
    id: 'st-espresso-02',
    name: 'Espresso Station 02',
    activeItemsCount: 5,
    loadPercentage: 82,
    statusText: 'High Workload · Double boiler engaged',
    statusLevel: 'high',
  },
  {
    id: 'st-bakery-01',
    name: 'Bakery Warmer 01',
    activeItemsCount: 1,
    loadPercentage: 30,
    statusText: 'Available Capacity · Convection 160°C',
    statusLevel: 'available',
  },
  {
    id: 'st-express-counter',
    name: 'Express Counter A',
    activeItemsCount: 2,
    loadPercentage: 45,
    statusText: '3 open cubbies · QR Staging sync on',
    statusLevel: 'normal',
  },
];

export const DEMO_GEMINI_ACTIONS: GeminiOperationalRecommendation[] = [
  {
    id: 'action-1',
    title: 'Pre-warm Sourdough Batch 5 at 11:15 AM',
    description: 'Predicted 11:30 AM lunch rush matches high probability toast pairing orders. Pre-warming avoids warmer station choke point.',
    impactType: 'High Impact',
    impactBadge: '-2.1 min Wait',
    primaryActionLabel: 'Accept & Assign',
    secondaryActionLabel: 'Evidence',
  },
  {
    id: 'action-2',
    title: 'Calibrate AI Concierge Sweetness Prompt',
    description: "62% of afternoon customers opt for ≤50% sweetness. Set smart slider preset to 'Subtle' to quicken mobile checkout times.",
    impactType: 'Taste Calibration',
    impactBadge: '62% Preference',
    primaryActionLabel: 'Apply Preset',
    secondaryActionLabel: 'Telemetry',
  },
  {
    id: 'action-3',
    title: 'Restock Minor Figures Oat Milk Canisters',
    description: 'Surge in iced oat lattes will breach bar backup reserves before the afternoon shift handover. Barista Bar 01 warning active.',
    impactType: 'Inventory Risk',
    impactBadge: '1:00 PM Depletion',
    primaryActionLabel: 'Signal Barback',
    secondaryActionLabel: 'Stock Log',
  },
];

export const DEMO_CLOSED_LOOP_CASE: ClosedLoopCase = {
  id: 'loop-89',
  caseNumber: '#LOOP-89',
  title: 'Closed-Loop Operational Telemetry',
  resolvedDate: 'Oct 09',
  steps: {
    voiceSignal: {
      quote: "Negative signals during 11:30 AM–12:15 PM lunch surge: 'Oat Latte wait exceeding 9 mins before meeting.'",
      source: '6 Pickup Feedback Marks',
    },
    barTelemetry: {
      observation: 'Espresso Station 02 peak steam stress hit 85% saturation, while Nitro Cold Bar was under-utilized at 30%.',
      sensor: 'Dual-Boiler PID Log',
    },
    geminiStrategy: {
      strategy: 'Dynamically promoted Chikmagalur Nitro Cold Brew + Toast pairings on mobile order cards during dual-boiler load spikes.',
      action: 'Smart Queue Routing',
    },
    humanSignOff: {
      details: 'Accepted & deployed live by Store Manager Rohit at 11:15 AM before the corporate rush window.',
      status: 'Manager Approved',
    },
    outcomeMeasured: {
      metrics: 'Espresso wait time dropped from 11.2 min to 7.4 min; On-time pickup jumped from 81% to 89.4%.',
      result: '+8.4% On-Time Lift',
    },
  },
};
