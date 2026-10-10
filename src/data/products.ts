export const IMG = {
  roofHero:
    'https://images.unsplash.com/photo-1658298775754-5839ffd434cc?auto=format&fit=crop&w=1600&h=900&q=80',
  roofPortrait:
    'https://images.unsplash.com/photo-1658298775754-5839ffd434cc?auto=format&fit=crop&w=1000&h=1400&q=80',
  batteryWall:
    'https://images.unsplash.com/photo-1780445392417-68b9dccc45f2?auto=format&fit=crop&w=1600&h=900&q=80',
  batterySquare:
    'https://images.unsplash.com/photo-1780445392417-68b9dccc45f2?auto=format&fit=crop&w=1000&h=1000&q=80',
  electronics:
    'https://images.pexels.com/photos/28942196/pexels-photo-28942196.jpeg?auto=compress&cs=tinysrgb&w=1600',
  electronicsSquare:
    'https://images.pexels.com/photos/28942196/pexels-photo-28942196.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop',
  technician:
    'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=1600',
  technicianSquare:
    'https://images.pexels.com/photos/4254165/pexels-photo-4254165.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop',
  homeSolar:
    'https://images.pexels.com/photos/12943046/pexels-photo-12943046.jpeg?auto=compress&cs=tinysrgb&w=1600',
  homeSolarSquare:
    'https://images.pexels.com/photos/12943046/pexels-photo-12943046.jpeg?auto=compress&cs=tinysrgb&w=1000&h=1000&fit=crop',
  commercial:
    'https://images.unsplash.com/photo-1756913454165-246d96a20b67?auto=format&fit=crop&w=1600&h=900&q=80',
  monitoring:
    'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1600',
  sun:
    'https://images.unsplash.com/photo-1566883976324-2f2229b70ec9?auto=format&fit=crop&w=1600&h=900&q=80',
  roofAlt:
    'https://images.unsplash.com/flagged/photo-1566838616631-f2618f74a6a2?auto=format&fit=crop&w=1600&h=900&q=80',
  farmAlt:
    'https://images.unsplash.com/photo-1780922576334-8f8d4e8740cf?auto=format&fit=crop&w=1600&h=900&q=80',
  farmPexels:
    'https://images.pexels.com/photos/9800010/pexels-photo-9800010.jpeg?auto=compress&cs=tinysrgb&w=1600',
  farmSunset:
    'https://images.pexels.com/photos/16586150/pexels-photo-16586150.jpeg?auto=compress&cs=tinysrgb&w=1600',
  inverterAlt:
    'https://images.pexels.com/photos/19841119/pexels-photo-19841119.jpeg?auto=compress&cs=tinysrgb&w=1600',
} as const

export type ImageKey = keyof typeof IMG

export type CategoryId = 'panels' | 'storage' | 'inverters' | 'kits'

export interface Product {
  slug: string
  name: string
  category: CategoryId
  tagline: string
  price: number
  compareAt?: number
  badge?: string
  spec: string
  specLabel: string
  img: string
  chips: string[]
  features: string[]
  idealFor: string
  includes: string[]
  warranty: string
  description: string
  stock: number
}

export const CATEGORIES: {
  id: CategoryId
  name: string
  short: string
  blurb: string
  img: string
  stat: string
  statLabel: string
}[] = [
  {
    id: 'panels',
    name: 'Solar Panels',
    short: 'Panels',
    blurb: 'High-watt mono, bifacial and flexible modules — warrantied for 25 years of generation.',
    img: IMG.roofHero,
    stat: '21.9%',
    statLabel: 'peak module efficiency',
  },
  {
    id: 'storage',
    name: 'Battery Storage',
    short: 'Storage',
    blurb: 'LiFePO4 home batteries that switch in during outages and export your surplus.',
    img: IMG.batteryWall,
    stat: '13.5 kWh',
    statLabel: 'Vault large capacity',
  },
  {
    id: 'inverters',
    name: 'Inverters',
    short: 'Inverters',
    blurb: 'Hybrid, on-grid and mini inverters, sized to run your home through a blackout.',
    img: IMG.electronics,
    stat: '6 kW',
    statLabel: 'hybrid backup rating',
  },
  {
    id: 'kits',
    name: 'Solar Kits',
    short: 'Kits',
    blurb: 'Panels, inverter, structure and wiring — engineered as one turnkey rooftop system.',
    img: IMG.homeSolar,
    stat: '3.2 kW',
    statLabel: 'most-sold home kit',
  },
]

export const PRODUCTS: Product[] = [
  {
    slug: 'helios-550w-mono-perc',
    name: 'Helios 550W Mono PERC Half-Cut',
    category: 'panels',
    tagline: 'Flagship high-wattage module for tight roofs.',
    price: 14900,
    compareAt: 16900,
    badge: 'Best seller',
    spec: '550 W',
    specLabel: 'peak power',
    img: IMG.roofHero,
    chips: ['550 Wp', '21.4% eff.', 'Half-cut', '24 mm frame'],
    features: [
      'Mono PERC half-cut cells for lower hot-spot losses',
      '21.4% module efficiency in a 1,134 × 1,758 mm frame',
      'Severe-hail and high-wind structural testing',
      'Power output at 87.4% after 25 years',
    ],
    idealFor: 'Residential and small C&I roofs where watts per square metre decide the bill.',
    includes: ['Monocrystalline module ×1', 'Pre-wired junction box', 'Matching connector pairs'],
    warranty: '25-year performance warranty · 12-year product warranty',
    description:
      'The Helios 550W is our most-sold panel. Half-cut cells keep operating temperature down on Indian roofs, while the 21.4% efficiency class means a smaller array for the same bill. Sold individually so you can size your array exactly, or bundled in kits below.',
    stock: 42,
  },
  {
    slug: 'vault-2-home-battery',
    name: 'Vault 2 Home Battery',
    category: 'storage',
    tagline: 'Wall-mounted 13.5 kWh backup that runs a home overnight.',
    price: 189000,
    compareAt: 205000,
    badge: 'New',
    spec: '13.5 kWh',
    specLabel: 'usable capacity',
    img: IMG.batteryWall,
    chips: ['13.5 kWh usable', 'LiFePO4', '5.2 kW cont.', '0.5 s switchover'],
    features: [
      '13.5 kWh usable in a slim wall-mounted unit',
      'Lithium iron phosphate chemistry, 6,000 cycle rating',
      '0.5 second switchover keeps appliances online in outages',
      'Runs heavy loads: pump, AC, EV charger',
    ],
    idealFor: 'Homes that face power cuts and want to run essentials plus one heavy load.',
    includes: ['Vault 2 battery unit', 'Wall mount bracket', 'Cable kit', 'App access'],
    warranty: '10-year battery warranty',
    description:
      'The Vault 2 pairs tall inverter output with a safe, long-life cell chemistry. When the grid drops, your home transfers in half a second — lights, fans, fridge and one AC keep running. Pull your bill up to 70% on a typical home.',
    stock: 12,
  },
  {
    slug: 'pulse-6kw-hybrid-inverter',
    name: 'Pulse 6kW Hybrid Inverter',
    category: 'inverters',
    tagline: 'On-grid export and battery backup in one box.',
    price: 62000,
    compareAt: 69000,
    spec: '6 kW',
    specLabel: 'rated output',
    img: IMG.electronics,
    chips: ['6 kW', 'Dual MPPT', '97.6% eff.', 'Per-phase config'],
    features: [
      'Simultaneous grid export and battery charging',
      'Dual MPPT trackers for east–west roof splits',
      '97.6% peak efficiency, whisper-quiet cooling',
      'Touchscreen setup with app-based monitoring',
    ],
    idealFor: 'Homes combining a solar array with Vault-class battery storage.',
    includes: ['Inverter unit', 'Cable glands', 'WiFi dongle', 'Mounting plate'],
    warranty: '5-year product warranty',
    description:
      'The Pulse 6kW is a hybrid you can grow into. Start on-grid today, add a battery bank later — the box and your panel wiring stay the same. Handles high surge loads for pump and compressor starts.',
    stock: 23,
  },
  {
    slug: 'homestar-3-2kw-kit',
    name: 'HomeStar 3.2kW Kit',
    category: 'kits',
    tagline: 'Our most-sold complete home system, delivered turnkey.',
    price: 224000,
    compareAt: 249000,
    badge: 'Most loved',
    spec: '3.2 kW',
    specLabel: 'system size',
    img: IMG.homeSolar,
    chips: ['6 × 550W panels', '3.68 kW hybrid', 'Iron structure', 'Install included'],
    features: [
      'Six Helios panels sized for ₹1,800–₹2,500 monthly bills',
      'Hybrid inverter ready for future battery addition',
      'GI structure, wiring and earthing included',
      'Site survey, installation and commissioning in scope',
    ],
    idealFor: 'Average Indian homes offsetting most of their daytime consumption.',
    includes: ['6 × Helios 550W panels', '3.68 kW hybrid inverter', 'Roof structure & wiring', 'Commissioning'],
    warranty: '25-yr panel · 5-yr inverter warranty',
    description:
      'The HomeStar is sized, shipped and installed as one system. We survey your roof, deliver the equipment, and commission the array — then hand over the app login and the paperwork trail for net metering.',
    stock: 8,
  },
  {
    slug: 'voltcore-5-1kwh-module',
    name: 'VoltCore 5.1 kWh Module',
    category: 'storage',
    tagline: 'Expandable battery cell for hybrid setups.',
    price: 88000,
    spec: '5.1 kWh',
    specLabel: 'per module',
    img: IMG.batterySquare ?? IMG.batteryWall,
    chips: ['5.1 kWh', 'Stackable ×4', 'LiFePO4', 'IP65 outdoor'],
    features: [
      'Stack up to four modules for 20.4 kWh of storage',
      'Plug-and-play busbar linking, no loose wiring',
      'IP65 rated — installs inside or on a wall',
      'Integrates with Pulse and Sova hybrid inverters',
    ],
    idealFor: 'Homes scaling storage around a Pulse hybrid inverter.',
    includes: ['Battery module', 'Busbar link kit', 'Base stand'],
    warranty: '10-year battery warranty',
    description:
      'VoltCore is our expandable storage stack. Start with one module for lighting and fan backup, add modules as your load grows. Same busbar, same app, no inverter change.',
    stock: 31,
  },
  {
    slug: 'flex-100w-foldable',
    name: 'Flex 100W Foldable Panel',
    category: 'panels',
    tagline: 'Portable power for balconies, boats and trips.',
    price: 6900,
    spec: '100 W',
    specLabel: 'peak power',
    img: IMG.sun,
    chips: ['100 W', '28.5% light-pierce', 'Foldable', '2.1 kg'],
    features: [
      'Folds to a 36 cm case; weighs as much as a laptop bag',
      'Weather-sealed edges, kickstand for angled placement',
      'Fits balconies, camper vans and terrace gardens',
      'MC4 lead works with portable power stations',
    ],
    idealFor: 'Apartment dwellers and outdoor users who want a taste of solar today.',
    includes: ['Foldable panel', 'Carry case', 'MC4 cable'],
    warranty: '10-year product warranty',
    description:
      'A lightweight entry point to solar. Open it on a balcony, terrace or camp table and top up batteries, phones and small gear — or pair several for a first micro-grid.',
    stock: 64,
  },
  {
    slug: 'array-10kw-commercial',
    name: 'Array 10kW Commercial Kit',
    category: 'kits',
    tagline: 'Turnkey arrays for businesses with daytime load.',
    price: 690000,
    badge: 'C&I',
    spec: '10 kW',
    specLabel: 'system size',
    img: IMG.commercial,
    chips: ['19 × 550W panels', '10 kW on-grid', '331 m² roof', 'Install included'],
    features: [
      'Engineered for factories, retail and office roofs',
      'On-grid export with net-metering documentation',
      'Load analysis and shadow study included in survey',
      'Structure engineered to wind zone ratings',
    ],
    idealFor: 'Businesses with steady daytime consumption and roof to spare.',
    includes: ['Panels & mounting', 'On-grid inverter', 'AC/DC wiring', 'Net-metering support'],
    warranty: '25-yr panel · 5-yr inverter warranty',
    description:
      'The Array kits bundle a commercial-sized array with project management. Our engineers handle the shadow study, structural review and net-metering paperwork — you get one invoice and one warranty.',
    stock: 5,
  },
  {
    slug: 'sova-3-6kw-ongrid',
    name: 'Sova 3.6kW On-Grid Inverter',
    category: 'inverters',
    tagline: 'Simple, efficient on-grid export for net metering.',
    price: 36500,
    spec: '3.6 kW',
    specLabel: 'rated output',
    img: IMG.inverterAlt,
    chips: ['3.6 kW', 'Single MPPT', '98.3% eff.', 'Built-in export meter'],
    features: [
      '98.3% peak efficiency for maximum export earnings',
      'Built-in export metering, ready for utility sign-off',
      'Compact wall footprint, no battery requirement',
      'Disconnect safety for grid maintenance crews',
    ],
    idealFor: 'Homes on net metering who want the lowest-cost array.',
    includes: ['Inverter unit', 'Mounting plate', 'Monitoring dongle'],
    warranty: '5-year product warranty',
    description:
      'The Sova is our cost-optimised on-grid inverter. No battery, no hybrid logic — just precise tracking of your array and clean export to the grid at peak hours.',
    stock: 19,
  },
]

export const BEST_SELLERS = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2], PRODUCTS[3], PRODUCTS[7]]

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function categoryById(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)
}

export const RELATED = (slug: string) =>
  (() => {
    const p = productBySlug(slug)
    if (!p) return PRODUCTS.slice(0, 3)
    const same = PRODUCTS.filter((q) => q.category === p.category && q.slug !== p.slug)
    return (same.length >= 3 ? same : [...same, ...PRODUCTS.filter((q) => q.slug !== p.slug)]).slice(0, 4)
  })()