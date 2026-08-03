import { Product } from '../types';
import { PRODUCT_IMAGE_URIS } from '../utils/productImages';
import { HANGING_BODY_FINISHES } from '../utils/hangingProfileProduct';

const HANGING_SECTION = 'Hanging Profile Lights';
const HANGING_SERIES = 'Hanging';
const HANGING_SKU = 'SL-HL';
const HANGING_IMAGE_BASE = '/assets/hanging-profile-lights';

const PLACEHOLDER_IMAGES = PRODUCT_IMAGE_URIS['linear-sysprofile'];

/** Product slug → image in public/assets/hanging-profile-lights/ */
const HANGING_PROFILE_IMAGES: Record<string, string> = {
  'led-circular-donut-light': `${HANGING_IMAGE_BASE}/circular-donut.png`,
  'led-donut-light': `${HANGING_IMAGE_BASE}/donut.png`,
  'led-drum-light': `${HANGING_IMAGE_BASE}/drum.png`,
  'led-hexa-drum-light': `${HANGING_IMAGE_BASE}/hexa-drum.png`,
  'led-hexadonut-light': `${HANGING_IMAGE_BASE}/hexa-donut.png`,
  'led-rec-square-light': `${HANGING_IMAGE_BASE}/rec-square.png`,
  'led-square-donut-light': `${HANGING_IMAGE_BASE}/square-donut.png`,
  'led-triangle-light': `${HANGING_IMAGE_BASE}/triangle.png`,
  'led-triangle-drum-light': `${HANGING_IMAGE_BASE}/triangle-drum.png`,
  'led-triangle-bended-light': `${HANGING_IMAGE_BASE}/triangle-blended.png`,
  'led-fan-light': `${HANGING_IMAGE_BASE}/fan.png`,
  'led-rectangle-bended-light': `${HANGING_IMAGE_BASE}/rec-bended.png`,
  'led-ring-light': `${HANGING_IMAGE_BASE}/ring.png`,
  'led-arc-light': `${HANGING_IMAGE_BASE}/arc.png`,
};

function hangingProfileImages(slug: string): string[] {
  const image = HANGING_PROFILE_IMAGES[slug];
  return image ? [image] : PLACEHOLDER_IMAGES;
}

const CCT_FULL = '2700K/3000K/4000K/5000K/5700K/6500K/Tuneable';
const CCT_RING = '3000K/4000K/6000K/CCT Tuneable';
const DRIVER_FULL = 'Fulham / Philips / Osram / SYSLight';
const DRIVER_STD = 'Fulham / Philips / Osram';
const FINISH = 'Black / White / Gold / Copper / RAL';
const DIMMABLE_NOTE = 'Can be made TRIAC / Analog / DALI — dimmable at request';

function hangingProduct(
  base: Omit<Product, 'category' | 'family' | 'seriesName' | 'section' | 'skuPrefix' | 'subcategory' | 'images'>,
): Product {
  return {
    ...base,
    category: 'hanging-profile-light',
    family: 'hanging-profile-light',
    seriesName: HANGING_SERIES,
    section: HANGING_SECTION,
    skuPrefix: HANGING_SKU,
    subcategory: HANGING_SECTION,
    images: hangingProfileImages(base.slug),
    finishes: HANGING_BODY_FINISHES,
  };
}

export const HANGING_PROFILE_PRODUCTS: Product[] = [
  hangingProduct({
    id: 'hl-circular-donut-light',
    slug: 'led-circular-donut-light',
    name: 'LED Circular Donut Light',
    shortSpec: '18W–140W • Circular Donut • 65mm Profile • Surface/Pendant',
    description:
      'LED Circular Donut Light with aluminium/CRCA construction and opal micro-prism diffuser. Ring-shaped circular donut profile with driver housed in canopy for a clean suspended aesthetic across residential and commercial spaces.',
    specs: {
      Type: 'LED Circular Donut Light',
      Material: 'Aluminium / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA Body',
      Finish: FINISH,
      'Profile Size': '65mm (H) — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: '300mm / 450mm / 600mm / 900mm / 1200mm / 1500mm / Customized Sizes',
      Wattage: '18W / 30W / 36W / 72W / 108W / 140W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '30W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '450', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '108W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1200', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '140W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1500', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-donut-light',
    slug: 'led-donut-light',
    name: 'LED Donut Light',
    shortSpec: '18W–140W • Donut • 65mm Profile • Surface/Pendant',
    description:
      'LED Donut Light with aluminium/CRCA construction and opal PC micro prism PMMA diffuser. 65mm height profile with driver in canopy, available in standard sizes from 300mm to 1500mm with custom sizing on request.',
    specs: {
      Type: 'LED Donut Light',
      Material: 'Aluminium / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      'Body Finish': FINISH,
      'Profile Size': '65mm height (driver in canopy)',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: '300mm / 450mm / 600mm / 900mm / 1200mm / 1500mm / Customized Sizes',
      Wattage: '18W / 30W / 36W / 72W / 108W / 140W / Customized as per requirement',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '30W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '450', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '108W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1200', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '140W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1500', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-drum-light',
    slug: 'led-drum-light',
    name: 'LED Drum Light',
    shortSpec: '18W–140W • Drum • 65mm Profile • Surface/Pendant',
    description:
      'Circular LED drum hanging light with aluminium/CRCA construction and opal micro-prism diffuser. Deep drum profile with driver housed in canopy for bold suspended accent lighting.',
    specs: {
      Type: 'LED Drum Light',
      Material: 'Aluminium / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA Body',
      Finish: FINISH,
      'Profile Size': '65mm (H) — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: '300mm / 450mm / 600mm / 900mm / 1200mm / 1500mm / Customized Sizes',
      Wattage: '18W / 30W / 36W / 72W / 108W / 140W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '108W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1200', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-hexa-drum',
    slug: 'led-hexa-drum-light',
    name: 'LED Hexa Drum Light',
    shortSpec: '18W–140W • Hexagonal Profile • Honeycomb Option • Surface/Pendant',
    description:
      'Hexagonal drum hanging luminaire built from T6-6063 aluminium profile with opal micro-prism diffuser. Multiple profile cross-sections available with optional honeycomb configuration on request.',
    specs: {
      Type: 'LED Hexa Drum Light',
      Material: 'Aluminum Profile (T6-6063)',
      Diffuser: 'Opal PC Micro Prism PMMA Body',
      Finish: FINISH,
      'Profile Size': '35mm × 80mm / 50mm × 75mm / 75mm × 75mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: '300mm / 450mm / 600mm / 900mm / 1200mm / 1500mm / Customized Sizes — honeycomb on request',
      Wattage: '18W / 30W / 36W / 72W / 108W / 140W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '80', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '80', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '80', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-hexadonut',
    slug: 'led-hexadonut-light',
    name: 'LED Hexadonut Light',
    shortSpec: '9W/Foot • Tailor Made • T6 Aluminium Profile • Surface/Pendant',
    description:
      'Tailor-made hexagonal donut profile luminaire with T6-6063 aluminium extrusion and opal PC extruded diffuser. Rated at 9 watts per foot with fully custom dimensions.',
    specs: {
      Type: 'LED Hexadonut Light',
      Material: 'Aluminum Profile (T6-6063)',
      Diffuser: 'Opal PC Micro Prism PC Extruded',
      Finish: FINISH,
      'Profile Size': '35mm × 80mm / 50mm × 75mm / 75mm × 75mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: 'Tailor Made',
      Wattage: '9 Watt/Foot',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '9W/Foot', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: 'Custom', height: '80', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-rec-square',
    slug: 'led-rec-square-light',
    name: 'LED Rec/Square Light',
    shortSpec: '18W–108W • Square / Rectangular • 65mm Profile • Surface/Pendant',
    description:
      'Square and rectangular hanging profile luminaire with aluminium/CRCA body and 65mm height profile. Driver integrated in canopy for clean ceiling presentation.',
    specs: {
      Type: 'LED Rec/Square Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '65mm height — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      'Dia Size': '300mm / 450mm / 600mm / 900mm / 1200mm',
      Wattage: '18W / 30W / 36W / 72W / 108W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-square-donut',
    slug: 'led-square-donut-light',
    name: 'LED Square Donut Light',
    shortSpec: '9W/Foot • Tailor Made Square • T6 Aluminium Profile',
    description:
      'Tailor-made square donut profile luminaire with T6-6063 aluminium extrusion. Configured at 9 watts per foot with custom dimensions for bespoke architectural installations.',
    specs: {
      Type: 'LED Square Donut Light',
      Material: 'Aluminum Profile (T6-6063)',
      Diffuser: 'Opal PC Micro Prism PC Extruded',
      Finish: FINISH,
      'Profile Size': '35mm × 80mm / 50mm × 75mm / 75mm × 75mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: 'Tailor Made',
      Wattage: '9 Watt/Foot',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '9W/Foot', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: 'Custom', height: '80', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-triangle',
    slug: 'led-triangle-light',
    name: 'LED Triangle Light',
    shortSpec: '18W–108W • Triangular • 65mm Profile • Surface/Pendant',
    description:
      'Triangular hanging profile luminaire with aluminium/CRCA construction and opal micro-prism diffuser. Geometric accent lighting for lobbies, retail, and hospitality spaces.',
    specs: {
      Type: 'LED Triangle Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '65mm height — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      'Dia Size': '300mm / 450mm / 600mm / 900mm / 1200mm',
      Wattage: '18W / 30W / 36W / 72W / 108W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-triangle-drum',
    slug: 'led-triangle-drum-light',
    name: 'LED Triangle Drum Light',
    shortSpec: '18W–108W • Triangle Drum • 65mm Profile • Surface/Pendant',
    description:
      'Triangle drum hanging luminaire with deep 65mm aluminium/CRCA profile and driver-in-canopy design. Ideal for geometric accent lighting in lobbies and retail spaces.',
    specs: {
      Type: 'LED Triangle Drum Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '65mm height — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      'Dia Size': '300mm / 450mm / 600mm / 900mm / 1200mm',
      Wattage: '18W / 30W / 36W / 72W / 108W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-triangle-bended',
    slug: 'led-triangle-bended-light',
    name: 'LED Triangle Bended Light',
    shortSpec: '9W/Foot • Bended Triangle • T6 Aluminium • Tailor Made Arms',
    description:
      'Bended triangular hanging profile luminaire with T6-6063 aluminium extrusion. Arm sizes are tailor-made for custom architectural geometries.',
    specs: {
      Type: 'LED Triangle Bended Light',
      Material: 'Aluminum Profile (T6-6063)',
      Diffuser: 'Opal PC Micro Prism PC Extruded',
      Finish: FINISH,
      'Profile Size': '35mm × 80mm / 50mm × 75mm / 75mm × 75mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: 'Arm size tailor made',
      Wattage: '9 Watt/Foot',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '9W/Foot', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: 'Custom', height: '80', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-fan-light',
    slug: 'led-fan-light',
    name: 'LED Fan Light',
    shortSpec: '9W/Foot • Fan Layout • Pendant • Custom Corner Radius',
    description:
      'Fan-style pendant luminaire with bended aluminium/CRCA profile arms. Corner radius tailored to degree with CAD file support for precise geometric installations.',
    specs: {
      Type: 'LED Fan Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '35mm × 75mm / 50mm × 70mm / 75mm × 70mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Pendant',
      Size: 'Tailor Made',
      'Corner Radius': 'Tailor made as per degree (CAD file required)',
      Wattage: '9 Watt/Foot / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_STD,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '9W/Foot', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_STD, outerDiameter: 'Custom', height: '75', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-rectangle-bended',
    slug: 'led-rectangle-bended-light',
    name: 'LED Rectangle Bended Light',
    shortSpec: '9W/Foot • Bended Rectangle • Pendant • Custom Corner Radius',
    description:
      'Bended rectangular pendant luminaire with aluminium/CRCA profile construction. Fully tailor-made sizing with custom corner radius to degree — CAD file required for fabrication.',
    specs: {
      Type: 'LED Rectangle Bended Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '35mm × 75mm / 50mm × 70mm / 75mm × 70mm',
      'CCT Options': CCT_FULL,
      Mounting: 'Pendant',
      Size: 'Tailor Made',
      'Corner Radius': 'Tailor made as per degree (CAD file required)',
      Wattage: '9 Watt/Foot',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '9W/Foot', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: 'Custom', height: '75', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-ring-light',
    slug: 'led-ring-light',
    name: 'LED Ring Light',
    shortSpec: '18W–60W • 17×8mm / 25×12mm Profile • Pendant',
    description:
      'LED Ring Light with aluminum profile construction and opal PC diffuser. Slim 17mm × 8mm and 25mm × 12mm pendant ring with constant-voltage LED strip, SMPS driver in canopy, and fixed sizes from 300mm to 900mm.',
    specs: {
      Type: 'LED Ring Light',
      Material: 'Aluminum Profile',
      Diffuser: 'Opal PC Diffuser',
      'Body Finish': FINISH,
      'Profile Size': '17mm × 8mm / 25mm × 12mm (driver in canopy)',
      'CCT Options': CCT_RING,
      Mounting: 'Pendant',
      Size: '300mm / 450mm / 600mm / 900mm',
      Wattage: '18W / 30W / 36W / 60W',
      LED: 'LED Strip Constant Voltage',
      Driver: 'SMPS',
      'Additional Features': 'Can be made TRIAC / Analog — dimmable at request',
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_RING, driverSupport: 'SMPS', outerDiameter: '300', height: '17', cutOut: '-' },
      { productCode: '-', wattage: '30W', fixtureColor: FINISH, cct: CCT_RING, driverSupport: 'SMPS', outerDiameter: '450', height: '17', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_RING, driverSupport: 'SMPS', outerDiameter: '600', height: '25', cutOut: '-' },
      { productCode: '-', wattage: '60W', fixtureColor: FINISH, cct: CCT_RING, driverSupport: 'SMPS', outerDiameter: '900', height: '25', cutOut: '-' },
    ],
    isBestseller: false,
  }),
  hangingProduct({
    id: 'hl-arc-light',
    slug: 'led-arc-light',
    name: 'LED Arc Light',
    shortSpec: '18W–140W • Arc Profile • 65mm Height • Surface/Pendant',
    description:
      'Arc-shaped hanging profile luminaire with aluminium/CRCA body and 65mm height profile. Available from 300mm to 1500mm with fully customizable arc dimensions.',
    specs: {
      Type: 'LED Arc Light',
      Material: 'Aluminum / CRCA',
      Diffuser: 'Opal PC Micro Prism PMMA',
      Finish: FINISH,
      'Profile Size': '65mm height — driver in canopy',
      'CCT Options': CCT_FULL,
      Mounting: 'Surface / Pendant',
      Size: '300mm / 450mm / 600mm / 900mm / 1200mm / 1500mm / Customized Sizes',
      Wattage: '18W / 30W / 36W / 72W / 108W / 140W / Customized',
      LED: 'Bridgelux',
      Driver: DRIVER_FULL,
      'Additional Features': DIMMABLE_NOTE,
    },
    dimensionVariants: [
      { productCode: '-', wattage: '18W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '300', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '36W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '600', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '72W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '900', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '108W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1200', height: '65', cutOut: '-' },
      { productCode: '-', wattage: '140W', fixtureColor: FINISH, cct: CCT_FULL, driverSupport: DRIVER_FULL, outerDiameter: '1500', height: '65', cutOut: '-' },
    ],
    isBestseller: false,
  }),
];
