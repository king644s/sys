import { Category, Project } from './types';
import { LUXE_PRODUCTS } from './data/luxeSeries';
import { ANTIGLARE_PRODUCTS } from './data/antiglareProducts';
import { LATCH_PRODUCTS } from './data/latchSeries';
import { ORBIT_PRODUCTS } from './data/orbitSeries';
import { FINO_PRODUCTS } from './data/finoSeries';
import { TWIN_PRODUCTS } from './data/twinSeries';
import { FLUSH_PRODUCTS } from './data/flushSeries';
import { FRESCO_PRODUCTS } from './data/frescoSeries';
import { SLATE_PRODUCTS } from './data/slateSeries';
import { SHARD_PRODUCTS } from './data/shardSeries';
import { BARREL_PRODUCTS } from './data/barrelSeries';
import { AQUA_PRODUCTS } from './data/aquaSeries';
import { FORTE_PRODUCTS } from './data/forteSeries';
import { SHEER_PRODUCTS } from './data/sheerSeries';
import { TORRE_PRODUCTS } from './data/torreSeries';
import { DUO_PRODUCTS } from './data/duoSeries';
import { FLEX_PRODUCTS } from './data/flexSeries';
import { BLADE_PRODUCTS } from './data/bladeSeries';
import { MURAL_PRODUCTS } from './data/muralSeries';
import { DRAPE_PRODUCTS } from './data/drapeSeries';

export const CATEGORIES: Category[] = [
  {
    slug: 'cob-spotlight',
    name: 'COB Spotlight',
    count: 12,
    description: 'Focused precision and clinical beam definitions for accent lighting.',
    image: 'https://images.unsplash.com/photo-1565538810844-1e1194826736?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'surface',
    name: 'Surface',
    count: 9,
    description: 'Rimless, cylindrical, and surface-mounted downlights for exposed ceilings.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  {
    slug: 'magnetic-track',
    name: 'Magnetic Track',
    count: 8,
    description: 'Modular freedom, clean ceiling profiles, and magnetic fixture snaps.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'downlight-panel',
    name: 'Downlight & Panel Light',
    count: 14,
    description: 'Recessed elegance with deep cutoff, panel, and nano downlight options.',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'tracklight',
    name: 'Track Light',
    count: 10,
    description: 'Professional-grade track spotlights with high CRI and dual rotation.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  {
    slug: 'profile-light',
    name: 'Profile Light',
    count: 6,
    description: 'Linear architectural extrusions that fuse light into structure.',
    image: 'https://images.unsplash.com/photo-1558211583-0457b22a64c0?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'led-strip',
    name: 'LED Strip',
    count: 6,
    description: 'High-density LED tape in 120–240 LEDs per metre configurations.',
    image: 'https://images.unsplash.com/photo-1558211583-0457b22a64c0?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  {
    slug: 'decorative',
    name: 'Decorative Lights',
    count: 2,
    description: 'Pendant, hanging, and picture lights for accent and art illumination.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  // Outdoor
  {
    slug: 'flood-light',
    name: 'Flood Light',
    count: 6,
    description: 'High-output, asymmetrical architectural flood luminaires.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'outdoor'
  },
  {
    slug: 'garden-light',
    name: 'Garden Light',
    count: 11,
    description: 'IP66 pathways, bollards, and spikes designed to sculpt nature.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'outdoor'
  },
  {
    slug: 'wall-light',
    name: 'Outdoor Wall Light',
    count: 8,
    description: 'IP65 dual up-down wall wash fixtures with structural cast casing.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'outdoor'
  },
  {
    slug: 'gate-light',
    name: 'Gate Light',
    count: 5,
    description: 'Monolithic pillars and post-top ambient lights.',
    image: 'https://images.unsplash.com/photo-1508333706533-1ec43ecb1606?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'outdoor'
  }
];

export const PRODUCTS = [
  ...LUXE_PRODUCTS,
  ...ANTIGLARE_PRODUCTS,
  ...LATCH_PRODUCTS,
  ...ORBIT_PRODUCTS,
  ...FINO_PRODUCTS,
  ...TWIN_PRODUCTS,
  ...FLUSH_PRODUCTS,
  ...FRESCO_PRODUCTS,
  ...SLATE_PRODUCTS,
  ...SHARD_PRODUCTS,
  ...BARREL_PRODUCTS,
  ...AQUA_PRODUCTS,
  ...FORTE_PRODUCTS,
  ...SHEER_PRODUCTS,
  ...TORRE_PRODUCTS,
  ...DUO_PRODUCTS,
  ...FLEX_PRODUCTS,
  ...BLADE_PRODUCTS,
  ...MURAL_PRODUCTS,
  ...DRAPE_PRODUCTS,
];

export const PROJECTS: Project[] = [
  {
    slug: 'coastal-cliffhouse',
    name: 'The Coastal Cliffhouse',
    location: 'Alibaug, Maharashtra',
    category: 'RESIDENTIAL',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'aurum-hotel-spa',
    name: 'Aurum Luxury Hotel & Spa',
    location: 'South Mumbai',
    category: 'HOSPITALITY',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'consulate-office-park',
    name: 'BKC Diplomatic Consulate Office',
    location: 'Bandra Kurla Complex, Mumbai',
    category: 'OFFICES',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'vivaan-residence',
    name: 'The Vivaan Penthouse',
    location: 'Worli Sea Face, Mumbai',
    category: 'RESIDENTIAL',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'atelier-jewelry-showroom',
    name: 'Atelier Jash Luxury Showroom',
    location: 'Juhu Scheme, Mumbai',
    category: 'RETAIL',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop'
  },
  {
    slug: 'tattva-wellness-resort',
    name: 'Tattva Eco Wellness Pavilion',
    location: 'Karjat, Maharashtra',
    category: 'HOSPITALITY',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop'
  }
];

export const TESTIMONIALS = [
  {
    quote: "Not only manufactures a reliable product — they guide you through making the product work for your design. For our BKC projects, their customization of beam angles was pristine.",
    author: "Architect Ketan Chheda",
    firm: "S.A. Designers, Mumbai",
    rating: 5
  },
  {
    quote: "With SYSLight, we have a Indian manufactured solution that consistently competes with Italian and German lighting giants. The CRI is genuinely over 93.",
    author: "Kalpesh Gala",
    firm: "Gala & Associates Interior Design",
    rating: 5
  },
  {
    quote: "Their magnetic track system is beautifully minimalist. No visible flanges, dead-flush integration, and the warm Kelvin options match luxury residential specs perfectly.",
    author: "Atit Barbhaya",
    firm: "A.B. Lighting Consultants",
    rating: 5
  }
];
