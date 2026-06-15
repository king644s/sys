import { Product, Category, Project } from './types';
import { PRODUCT_IMAGE_URIS } from './utils/productImages';
import { LATCH_CATEGORY, LATCH_PRODUCTS } from './data/latchSeries';
import { ANTIGLARE_CATEGORY, ANTIGLARE_PRODUCTS } from './data/antiglareProducts';

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
    slug: 'magnetic-track',
    name: 'Magnetic Track Light',
    count: 8,
    description: 'Modular freedom, clean ceiling profiles, and magnetic fixture snaps.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'deep-downlight',
    name: 'Deep Downlight',
    count: 14,
    description: 'Recessed elegance designed with extreme glare cutoff and comfort.',
    image: 'https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'sysprofiles',
    name: 'SYSProfiles',
    count: 6,
    description: 'Linear architectural extrusions that fuse light into structure.',
    image: 'https://images.unsplash.com/photo-1558211583-0457b22a64c0?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'zoom-light',
    name: 'Zoom Light',
    count: 5,
    description: 'Variable beam control and field-adjustable focusing optics.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop',
    has3D: true,
    type: 'indoor'
  },
  {
    slug: 'surface-downlight',
    name: 'Surface Downlight',
    count: 9,
    description: 'Crisp cylindrical and box downlights for concrete surfaces.',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  {
    slug: 'tracklight',
    name: 'Tracklight',
    count: 10,
    description: 'Professional-grade track spotlights with high CRI and dual rotation.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=600&auto=format&fit=crop',
    has3D: false,
    type: 'indoor'
  },
  LATCH_CATEGORY,
  ANTIGLARE_CATEGORY,
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

export const PRODUCTS: Product[] = [
  {
    id: 'nano-lumina',
    slug: 'nano-luminadown',
    name: 'Nano LuminaDown',
    category: 'deep-downlight',
    subcategory: 'Low UGR Deep Cutoff',
    shortSpec: 'COB • 7W–20W • CRI >92 • Deep Cutoff',
    description: 'The Nano LuminaDown defines architectural subtlety. Engineered with a deep physical baffle, it boasts a unified glare rating (UGR) of less than 13, creating a beautifully quiet ceiling. Perfect for luxury residences and galleries.',
    price: 3450,
    specs: {
      'Wattage Options': '7W / 12W / 15W / 20W',
      'CRI': '>92 Ra (95+ Customisable)',
      'Colour Temps (CCT)': '2700K / 3000K / 4000K',
      'Beam Angles': '15° / 24° / 36°',
      'Glare Rating (UGR)': '<13',
      'Input Voltage': '220-240V AC, 50Hz',
      'Housing Material': 'Heavily anodised die-cast Aluminium',
      'IP Rating': 'IP20 / IP44 (Bezel protected)',
      'Dimensions': 'Ø 75mm x H 90mm',
      'Lifespan': '50,000 Hours (L80B10)'
    },
    images: PRODUCT_IMAGE_URIS['nano-lumina'],
    isBestseller: true
  },
  {
    id: 'twin-glarefree',
    slug: 'twin-glarefree-spot',
    name: 'Twin GlareFree Spotlight',
    category: 'cob-spotlight',
    subcategory: 'Twin Adjustable Spot',
    shortSpec: 'COB • Dual Beams • 2x10W • High CRI',
    description: 'Dual adjustable deep-recessed spotlights designed for precise gallery and sculpture lighting. Featuring independent 30-degree cardan tilt adjustments, it allows multi-source sculpting from a single modern rectangular profile.',
    price: 5200,
    specs: {
      'Wattage Options': '2x10W / 2x15W',
      'CRI': '>94 Ra',
      'Colour Temps (CCT)': '3000K / 4000K',
      'Beam Angles': '10° (Super Spot) / 24° / 38°',
      'Adjustment Range': '30° Tilt, 355° Rotation',
      'Housing Material': 'Architectural Grade Extruded Aluminium',
      'IP Rating': 'IP20',
      'Driver': 'Tridonic / Philips Ripple-Free',
      'Dimensions': '165mm x 85mm x H 95mm',
      'Lifespan': '55,000 Hours'
    },
    images: PRODUCT_IMAGE_URIS['twin-glarefree'],
    isBestseller: true
  },
  {
    id: 'cobmove-downlight',
    slug: 'cobmove-downlight',
    name: 'COBMove Downlight',
    category: 'zoom-light',
    subcategory: 'Continuous Focus',
    shortSpec: 'Variable Spot • 12W–30W • Adjustable Focus',
    description: 'An architectural zoom masterpiece. Slide the sleek optic ring to vary beam angles dynamically from a tight 15° beam to a broad 50° flood. Crafted specifically for flexible retail layouts, high-end hospitality lobbies, and art collections.',
    price: 4800,
    specs: {
      'Wattage Options': '12W / 20W / 30W',
      'CRI': '>93 Ra',
      'Beam Options': 'Continuously variable 15° to 50°',
      'CCT': '2700K / 3000K / 4000K / 5700K',
      'Housing Material': 'Cold-forged high-density thermal aluminium',
      'IP Rating': 'IP20',
      'Drill Cutout': 'Ø 90mm',
      'Lifespan': '50,000 Hours'
    },
    images: PRODUCT_IMAGE_URIS['cobmove-downlight'],
    isBestseller: true
  },
  {
    id: 'twinbeam-spotlight',
    slug: 'twinbeam-spotlight',
    name: 'TwinBeam Track Spotlight',
    category: 'tracklight',
    subcategory: 'Studio Spotlights',
    shortSpec: 'Track Spot • 15W–25W • Single or Double Optic',
    description: 'Minimalist cylinder track spotlight mounting seamlessly on standard 2-wire / 4-wire systems. Engineered with native honeycomb anti-glare filters and professional zoom/focal options, it ensures absolute beam shielding.',
    price: 3900,
    specs: {
      'Wattage Options': '15W / 25W',
      'CRI': '>95 Ra',
      'CCT': '3000K (Warm Luxury) / 4000K (Neutral Pure)',
      'Beam Angles': '12° / 24° / 38°',
      'Track Interface': 'Global 3-Phase / Standard Single Phase',
      'Rotation': '360° Horizontal, 90° Vertical',
      'Accessories Included': 'Anti-Glare Honeycomb Mesh Integral',
      'Lifespan': '60,000 Hours'
    },
    images: PRODUCT_IMAGE_URIS['twinbeam-spotlight'],
    isBestseller: true
  },
  {
    id: 'mag-linear',
    slug: 'magnetic-linear-sys',
    name: 'Mag-Linear Click System',
    category: 'magnetic-track',
    subcategory: 'Low Voltage 48V Rails',
    shortSpec: 'Magnetic • 10W–30W • Low Voltage 48V',
    description: 'Sleek, ultra-minimal low-voltage modular profile inserts. These fixtures click magnetically and lock mechanically inside of recessed, surface, or suspended 48V steel-backed tracks, creating architectural lines of pure light.',
    price: 4500,
    specs: {
      'Working Voltage': '48V DC Low-Voltage Safe',
      'Wattage': '10W (300mm) / 20W (600mm) / 30W (900mm)',
      'CRI': '>92 Ra',
      'Optics': 'Diffused Opal / 30° Grille Spotlights',
      'UGR': '<16 for Grille inserts',
      'Dimming Options': 'DALI, 0-10V, Bluetooth Smart Control'
    },
    images: PRODUCT_IMAGE_URIS['mag-linear'],
    isBestseller: false
  },
  {
    id: 'linear-sysprofile',
    slug: 'linear-sysprofile',
    name: 'SYSProfile Architectural Diffuser',
    category: 'sysprofiles',
    subcategory: 'Trimless Linear',
    shortSpec: 'Extrusion • Seamless Diffuser • High Uniformity',
    description: 'Precision aircraft-grade aluminum profile systems with dual-flange drywall recess anchors. Generates perfectly continuous, shadowless linear runs of uniform architectural light with dot-free seamless polycarbonate diffusers.',
    price: 2800,
    specs: {
      'Mounting Type': 'Drywall Recessed Flanged / Trimless / Suspended',
      'Length Standard': '1000mm / 2000mm / 3000mm run',
      'Max LED Density': '120 LEDs/m - 240 LEDs/m matching',
      'Diffuser Material': 'High UV-Resistant Polycarbonate Satin Opal',
      'Profile Width': '35mm / 50mm / 75mm architectural'
    },
    images: PRODUCT_IMAGE_URIS['linear-sysprofile'],
    isBestseller: false
  },
  {
    id: 'surface-cylinder',
    slug: 'cylindra-surface-cylinder',
    name: 'Cylindra Surface Cylinder',
    category: 'surface-downlight',
    subcategory: 'Cylindrical Body',
    shortSpec: 'COB • 10W–22W • Surface Mounted • Die-cast Aluminium',
    description: 'Minimalist surface-mounted cylinder downlights for installations where recessing is impossible (e.g. exposed concrete slabs). Designed with deep baffle optics for premium visual comfort and zero structural intrusion.',
    price: 3600,
    specs: {
      'Wattage Options': '10W / 15W / 22W',
      'CRI': '>90 Ra',
      'Colour Temps (CCT)': '3000K / 4000K',
      'Beam Angles': '24° / 36° / 50°',
      'Mounting': 'Rigid surface anchor plate',
      'IP Rating': 'IP20',
      'Dimensions': 'Ø 85mm x H 110mm',
      'Lifespan': '50,000 Hours'
    },
    images: PRODUCT_IMAGE_URIS['nano-lumina'],
    isBestseller: false
  },
  {
    id: 'aurora-garden-spike',
    slug: 'aurora-garden-spike',
    name: 'Aurora Pathway Spike',
    category: 'garden-light',
    subcategory: 'Pathways Core Spike',
    shortSpec: 'IP66 • 5W–10W • Brass Finish • Cree LED',
    description: 'An elegant solid machined anodised outdoor garden spike designed to compete with luxury landscape references. Engineered and sealed to withstand torrential Mumbai monsoons, it casts dramatic glimmers on trees and pathways.',
    price: 3600,
    specs: {
      'Wattage Options': '5W / 8W / 10W',
      'CRI': '>85 Ra',
      'Colour Temps': '2700K (Warm Landscape) / 3000K',
      'IP Rating': 'IP66 Weatherproof / Dust-tight',
      'Housing': 'Machined structural marine-grade brass option',
      'Optical Shielding': 'Asymmetrical hood cutoff mask integrated'
    },
    images: PRODUCT_IMAGE_URIS['aurora-garden-spike'],
    isBestseller: false
  },
  {
    id: 'helios-wall-wash',
    slug: 'helios-wall-wash',
    name: 'Helios Dual Wall Sconce',
    category: 'wall-light',
    subcategory: 'Bi-Directional Sconce',
    shortSpec: 'IP65 • 2x6W • Architectural Uplight-Downlight',
    description: 'Slightly weathered heavy cast dual-beam outdoor wall washer. Cuts precise geometric lighting cones upwards and downwards on exterior walls, enhancing architectural textures, stone facades, and luxury entrances.',
    price: 4100,
    specs: {
      'Wattage Options': '2x6W Cobra / CREE LED',
      'CRI': '>90 Ra',
      'IP Rating': 'IP65 Water Splasher Weatherproof',
      'Body Finish': 'Micro-textured Graphite Grey / Luxe Black / Sand Sand',
      'Optic Screen': 'High-transparency impact-tested tempered glass'
    },
    images: PRODUCT_IMAGE_URIS['helios-wall-wash'],
    isBestseller: false
  },
  {
    id: 'centauri-flood',
    slug: 'centauri-facade-wash',
    name: 'Centauri Façade Wash',
    category: 'flood-light',
    subcategory: 'Asymmetric Wall Wash',
    shortSpec: 'CREE LED • 30W–50W • IP66 • Heavy Duty Asymmetrical',
    description: 'A high-performance external flood luminaire engineered to cast a broad, highly precise asymmetrical wash across grand facades and historical structures while minimizing light spill and glare.',
    price: 9200,
    specs: {
      'Wattage Options': '30W / 45W / 50W',
      'CRI': '>85 Ra',
      'Colour Temps': '3000K / 4000K / 5700K',
      'IP Rating': 'IP66 Waterproof & Dustproof',
      'Impact Protection': 'IK08 Vandal Resistant',
      'Tilt Adjustment': '180° locking bracket',
      'Dimensions': '210mm x 160mm x H 75mm'
    },
    images: PRODUCT_IMAGE_URIS['helios-wall-wash'],
    isBestseller: false
  },
  {
    id: 'monolith-gate',
    slug: 'monolith-pillar-gate',
    name: 'Monolith Pillar Gate Light',
    category: 'gate-light',
    subcategory: 'Pillar Mount Cap',
    shortSpec: 'IP65 • 12W • Sand Cast • Monolithic Pillar Cap',
    description: 'A structural pillar-top monolith light casting an elegant, glare-free 360-degree ambient radial glow. Accents private residential entries and concrete column boundary walls beautifully.',
    price: 5400,
    specs: {
      'Wattage': '12W',
      'CRI': '>85 Ra',
      'CCT': '2700K Warm Luxury / 3000K',
      'IP Rating': 'IP65 Weather-sealed',
      'Material': 'Architectural high-density sand cast casing',
      'Dimensions': '150mm x 150mm x H 180mm'
    },
    images: PRODUCT_IMAGE_URIS['aurora-garden-spike'],
    isBestseller: false
  },
  ...LATCH_PRODUCTS,
  ...ANTIGLARE_PRODUCTS
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
