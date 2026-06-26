export interface TimelineEntry {
  year: string;
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
    title: 'Systems Creator Founded',
    subtitle: 'Printing Solutions & Power Electronics',
    description:
      'Systems Creator was founded, beginning with the manufacturing of Printer Sharing Devices and Printing Solutions. We quickly expanded into the Power Electronics sector, launching the SYSGUARD brand with Servo Controlled Voltage Stabilizers and Spike Guards.',
    metric: 'Est.',
    metricLabel: '1991 — Mumbai, India',
  },
  {
    year: '1993',
    period: '02 / Recognition',
    title: 'Trusted Brand Status',
    subtitle: 'Computer Assembly Excellence',
    description:
      'Gained recognition as a reliable brand in the computer assembly business through exceptional product quality and rigorous after-sales service — building a reputation for engineering integrity that continues to define us today.',
    metric: '2+',
    metricLabel: 'Years to trusted brand status',
  },
  {
    year: '1997',
    period: '03 / Expansion',
    title: 'Power & Energy Solutions',
    subtitle: 'SYSPOWER & SYSGEN Launch',
    description:
      'Expanded into the manufacturing and sales of Uninterrupted Power Supply systems and Inverters, operating under the SYSPOWER and SYSGEN brands — solidifying our position as a multi-category electronics manufacturer.',
    metric: 'UPS',
    metricLabel: 'Systems & Inverters launched',
  },
  {
    year: '2005',
    period: '04 / Innovation',
    title: 'Entering the LED Market',
    subtitle: 'LED Driver Manufacturing',
    description:
      'Entered the LED market with the in-house manufacturing of LED Drivers, catering to local importers and OEMs with solutions ranging from 1W to 60W for both indoor and outdoor lighting applications.',
    metric: '1W–60W',
    metricLabel: 'LED driver output range',
  },
  {
    year: '2013',
    period: '05 / Industry Presence',
    title: 'SYSDRIVE & SYSLIGHT',
    subtitle: 'Make in India Movement',
    description:
      'Launched SYSDRIVE and SYSLIGHT, establishing a strong and recognised presence in India\'s LED lighting industry and contributing meaningfully to the nation\'s Make in India manufacturing movement.',
    metric: '2',
    metricLabel: 'New flagship brands launched',
  },
  {
    year: '2018',
    period: '06 / Transformation',
    title: 'SYSlight Brand Identity',
    subtitle: 'Smart & Sustainable Lighting',
    description:
      'Marked a major transformation by introducing SYSlight as a dedicated brand, focusing on smart, customisable, and energy-efficient lighting solutions that resonated deeply with eco-conscious architects, designers, and consumers.',
    metric: 'Smart',
    metricLabel: 'Lighting redefined',
  },
  {
    year: '2022',
    period: '07 / Present',
    title: 'Industry Leadership',
    subtitle: 'Smart Lighting Revolution',
    description:
      'SYSlight emerged as a recognised leader in the lighting industry, expanding its portfolio with advanced smart lighting solutions and forming strategic partnerships with interior designers, architects, and lighting professionals worldwide.',
    metric: '30+',
    metricLabel: 'Years of engineering heritage',
  },
];
