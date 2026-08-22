export interface TimelineEntry {
  year: string;
  yearEnd?: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
}

export const companyTimeline: TimelineEntry[] = [
  {
    year: '1991',
    period: '01 / Foundation',
    title: 'Systems Creator Begins',
    subtitle: 'Printer-sharing to SYSGUARD',
    description:
      'Systems Creator begins its journey — starting with printer-sharing devices and printing solutions, before expanding into power electronics with the SYSGUARD brand of voltage stabilizers and spike guards. The first step in a three-decade engineering story.',
    metric: 'SYSGUARD',
    metricLabel: 'Voltage stabilizers & spike guards',
  },
  {
    year: '1993',
    period: '02 / Recognition',
    title: 'A Trusted Name',
    subtitle: 'Computer assembly & after-sales',
    description:
      'Establishes itself as a trusted name in computer assembly, built on consistent product quality and dependable after-sales service — values that would carry through every brand built since.',
    metric: 'Quality',
    metricLabel: 'Product & after-sales service',
  },
  {
    year: '1997',
    period: '03 / Expansion',
    title: 'UPS Systems & Inverters',
    subtitle: 'SYSPOWER and SYSGEN',
    description:
      'Diversifies into UPS systems and inverters under the SYSPOWER and SYSGEN brands, deepening its expertise in power electronics and reliability engineering.',
    metric: 'SYSPOWER',
    metricLabel: 'SYSGEN — UPS & inverters',
  },
  {
    year: '2005',
    period: '04 / Innovation',
    title: 'Entering the LED Market',
    subtitle: 'Proprietary LED drivers',
    description:
      'Enters the LED market, developing proprietary LED drivers ranging from 1W to 60W for indoor and outdoor lighting — the technical foundation that would go on to define every SYSlight fixture.',
    metric: '1W–60W',
    metricLabel: 'Indoor & outdoor LED drivers',
  },
  {
    year: '2013',
    period: '05 / Launch',
    title: 'SYSdrive & SYSlight',
    subtitle: 'Make in India',
    description:
      'Launched SYSdrive and SYSlight, establishing a dedicated presence in India\'s LED lighting industry and contributing to the nation\'s "Make in India" movement — bringing design and manufacturing together under one roof.',
    metric: 'SYSlight',
    metricLabel: 'Design & manufacturing under one roof',
  },
  {
    year: '2013',
    yearEnd: '2018',
    period: '06 / Trusted OEM',
    title: 'Major OEM Partner',
    subtitle: 'Drivers for leading lighting brands',
    description:
      'Becomes a major OEM partner for drivers, manufacturing for several leading lighting brands and scaling deep expertise in reliability and quality at volume.',
    metric: 'OEM',
    metricLabel: 'Reliability & quality at volume',
  },
  {
    year: '2018',
    period: '07 / Going Smart',
    title: 'Connected Lighting',
    subtitle: 'Bluetooth & Wi-Fi control',
    description:
      'Ventures into smart lighting with Bluetooth and Wi-Fi based control systems, marking the shift toward connected, intelligent lighting built for adaptive, modern spaces.',
    metric: 'Smart',
    metricLabel: 'Bluetooth & Wi-Fi control',
  },
  {
    year: '2022',
    yearEnd: '2024',
    period: '08 / Industry Recognition',
    title: 'A Recognised Name',
    subtitle: 'Partnerships, institutions & government',
    description:
      'SYSlight emerges as a recognized name in the lighting industry — expanding its smart lighting portfolio and forming strategic partnerships with interior designers, architects, and lighting professionals, while taking on large institutional and government projects that cement its reputation for scale and reliability.',
    metric: 'Scale',
    metricLabel: 'Institutional & government projects',
  },
  {
    year: '2024',
    period: '09 / Home Automation',
    title: 'Zigbee & Connected Spaces',
    subtitle: 'Complete home automation',
    description:
      "Introduces Zigbee-based lighting solutions and complete home automation setups, extending SYSlight's ecosystem beyond individual fixtures into fully connected spaces.",
    metric: 'Zigbee',
    metricLabel: 'Full-home automation setups',
  },
  {
    year: '2026',
    period: '10 / Experience Redefined',
    title: 'The Mumbai Experience Center',
    subtitle: 'Where heritage becomes something you can walk through',
    description:
      "Opens SYSlight's first Experience Center in Mumbai — a space thoughtfully designed for architects and interior designers to experience lighting solutions firsthand, explore real-world applications, understand product performance, and discuss project requirements in detail. Featuring 120+ varieties of fixtures and over 400 products, with the entire showroom running on smart, tunable, dimmable lighting — it's where three decades of engineering heritage becomes something you can walk through.",
    metric: '120+',
    metricLabel: 'Fixture varieties · 400+ products',
  },
];
