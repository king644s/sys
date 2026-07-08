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
    subtitle: 'Power Electronics & Manufacturing',
    description:
      'Systems Creator is founded, beginning in power electronics and manufacturing — laying the engineering foundation that would later power SYSlight.',
    metric: 'Est.',
    metricLabel: '1991 — Mumbai, India',
  },
  {
    year: '2005',
    period: '02 / Innovation',
    title: 'Entering the LED Market',
    subtitle: 'In-House LED Drivers',
    description:
      'We enter the LED market, developing our own LED drivers from 1W to 60W — building the technical control that defines every fixture we make today.',
    metric: '1W–60W',
    metricLabel: 'LED driver output range',
  },
  {
    year: '2013',
    period: '03 / Launch',
    title: 'SYSlight is Born',
    subtitle: "India's LED Lighting Industry",
    description:
      'SYSlight is launched, establishing our presence in India’s LED lighting industry and bringing designed, manufactured lighting under one brand.',
    metric: '2013',
    metricLabel: 'Brand presence established',
  },
  {
    year: '2018',
    period: '04 / Evolution',
    title: 'Smart & Customisable',
    subtitle: 'Energy-Efficient Lighting',
    description:
      'SYSlight evolves into a brand focused on smart, customisable, energy-efficient lighting — designed for spaces that shift with the people in them.',
    metric: 'Smart',
    metricLabel: 'Lighting redefined',
  },
  {
    year: 'Today',
    period: '05 / Present',
    title: 'Partners in Design',
    subtitle: 'Experience Center & Smart Living',
    description:
      'SYSlight partners with architects and interior designers, backed by an Experience Center and a growing smart-living range — lighting specified with intent.',
    metric: '30+',
    metricLabel: 'Years of manufacturing heritage',
  },
];
