export const BRAND = {
  name: 'Voltaic',
  legal: 'Voltaic Energy Pvt. Ltd.',
  tagline: 'Own the sun. Keep the power.',
  email: 'hello@voltaic.energy',
  phone: '+91 98765 43210',
  whatsapp: '+91 90000 00000',
  address: '4th Floor, Ecstasy One, Vesu Ring Road, Surat, Gujarat 395007',
  gst: '24ABCDE1234F1Z5',
  hours: 'Mon – Sat · 10:00–18:00 IST',
  socials: [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'YouTube', href: '#' },
  ],
}

export const NAV_LINKS = [
  { label: 'Shop', to: '/shop' },
  { label: 'Panels', to: '/shop', query: 'panels' },
  { label: 'Storage', to: '/storage' },
  { label: 'Inverters', to: '/shop', query: 'inverters' },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'Solar Panels', to: '/shop', query: 'panels' },
      { label: 'Battery Storage', to: '/storage' },
      { label: 'Inverters', to: '/shop', query: 'inverters' },
      { label: 'Solar Kits', to: '/shop', query: 'kits' },
      { label: 'All products', to: '/shop' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Rooftop Solar', to: '/shop', query: 'kits' },
      { label: 'Home Battery Backup', to: '/storage' },
      { label: 'Commercial Rooftop', to: '/about' },
      { label: 'Balcony & Portable', to: '/shop', query: 'panels' },
      { label: 'Solar for Businesses', to: '/about' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Why Voltaic', to: '/about' },
      { label: 'Careers', to: '/about' },
      { label: 'Partner programme', to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact', to: '/contact' },
      { label: 'Solar calculator', to: '/#calculator' },
      { label: 'Warranty', to: '/about' },
      { label: 'FAQ', to: '/#faq' },
    ],
  },
]

export const STATS = [
  { value: 18, suffix: ' yrs', label: 'engineering solar for Indian roofs' },
  { value: 50, suffix: 'K+', label: 'homes and businesses on Voltaic' },
  { value: 182, suffix: ' MW', label: 'of clean generation installed' },
  { value: 25, suffix: ' yr', label: 'performance warranty on modules' },
]

export const WHY_ROWS = [
  {
    index: '01',
    title: 'Survey, then size',
    body: 'We measure your roof, shading and sanction load before a single panel is quoted.',
  },
  {
    index: '02',
    title: 'One bill of materials',
    body: 'Panels, inverter, battery and structure come from one kit list — not five invoices.',
  },
  {
    index: '03',
    title: 'Commissioned, not dropped',
    body: 'Certified teams install, test and hand over a working system with app access.',
  },
  {
    index: '04',
    title: 'Monitored for years',
    body: 'Annual performance reviews and a service network that actually picks up the phone.',
  },
]

export const PROCESS = [
  {
    step: '01',
    title: 'Site assessment',
    body: 'Roof area, orientation, shading and sanction load — we measure before quoting.',
  },
  {
    step: '02',
    title: 'Engineering design',
    body: 'A clear proposal: modules, inverter, storage, structure and expected generation.',
  },
  {
    step: '03',
    title: 'Install & commission',
    body: 'Certified teams install, test and commission your system to go live.',
  },
  {
    step: '04',
    title: 'Monitor & support',
    body: 'App-based tracking, annual reviews, warranty and AMC support.',
  },
]

export const TESTIMONIALS = [
  {
    quote: 'Voltaic sized a 5 kW system around our workshop load. The first bill after install came down ₹6,800.',
    name: 'Rohan Mehta',
    role: 'Founder · Mehta Textiles, Surat',
  },
  {
    quote: 'The Vault battery ran our home through a nine-hour outage without the inverter blinking once. Our appliances never noticed.',
    name: 'Ananya Iyer',
    role: 'Homeowner · Pune',
  },
  {
    quote: 'Survey, net-metering paperwork, commissioning — one team handled three roofs with zero surprises between them.',
    name: 'Vikram Singh',
    role: 'Director · Apex Residency',
  },
]

export const FAQS = [
  {
    q: 'How long does a residential installation take?',
    a: 'Most rooftops are installed and commissioned within a few days of approvals and material readiness. Kit deliveries leave our Surat warehouse on a fixed schedule.',
  },
  {
    q: 'What warranties actually come with the equipment?',
    a: 'Voltaic panels carry a 25-year performance warranty and 12-year product warranty. Inverters carry 5-year, batteries 10-year. Every warranty is printed on your kit invoice.',
  },
  {
    q: 'Will my roof work for solar?',
    a: 'We check orientation, shading, structure strength and usable area during a free site survey. Roughly 9 in 10 rooftops we survey can host a worthwhile array.',
  },
  {
    q: 'Do you handle net metering?',
    a: 'Yes. Our team prepares and coordinates the net-metering application with your utility circle, wherever the local policy permits it.',
  },
  {
    q: 'I get power cuts. Do I need a battery?',
    a: 'Only if day-time grid drops annoy you — or you want to run loads at night. A hybrid inverter now, battery later, is the most common path we see.',
  },
]

export const GRID_KNOWLEDGE = [
  { k: 'Peak module efficiency', v: '21.9%' },
  { k: 'Battery chemistry', v: 'LiFePO4 · 6,000 cycles' },
  { k: 'Backup switchover', v: '0.5 s automatic' },
  { k: 'System warranty', v: 'up to 25 years' },
]