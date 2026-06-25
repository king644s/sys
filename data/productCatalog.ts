export interface CatalogEntry {
  section: string;
  seriesName: string;
  skuPrefix: string;
}

export interface CatalogFamily {
  slug: string;
  name: string;
  type: 'indoor' | 'outdoor';
  entries: CatalogEntry[];
}

/** Final naming & SKU taxonomy — series name + section/subsection per product line */
export const CATALOG_FAMILIES: CatalogFamily[] = [
  {
    slug: 'cob-spotlight',
    name: 'COB Spotlight',
    type: 'indoor',
    entries: [
      { section: 'Generic COB Spotlight', seriesName: 'Luxe', skuPrefix: 'SL-GN' },
      { section: 'Antiglare Spotlight', seriesName: 'Veil', skuPrefix: 'SL-AG' },
      { section: 'Front Removable Spotlight', seriesName: 'Latch', skuPrefix: 'SL-FR' },
      { section: 'Concealed Moveable Spotlight', seriesName: 'Orbit', skuPrefix: 'SL-CM' },
      { section: 'Slim / Pencil Spotlight', seriesName: 'Fino', skuPrefix: 'SL-SN' },
      { section: 'Dual Spotlight', seriesName: 'Twin', skuPrefix: 'SL-DU' },
      { section: 'Trimless Spotlight', seriesName: 'Flush', skuPrefix: 'SL-TL' },
      { section: 'Wall Washer Spotlight', seriesName: 'Fresco', skuPrefix: 'SL-WW' },
      { section: 'Low Height Spotlight', seriesName: 'Slate', skuPrefix: 'SL-LH' },
      { section: 'Laser Light', seriesName: 'Shard', skuPrefix: 'SL-LL' },
      { section: 'Niche / Bullet Spotlight', seriesName: 'Barrel', skuPrefix: 'SL-BL' },
      { section: 'IP Rated Spotlight', seriesName: 'Aqua', skuPrefix: 'SL-IP' },
      { section: 'Commercial / High Wattage', seriesName: 'Forte', skuPrefix: 'SL-HW' },
    ],
  },
  {
    slug: 'surface',
    name: 'Surface',
    type: 'indoor',
    entries: [
      { section: 'Rimless', seriesName: 'Sheer', skuPrefix: 'SF-RM' },
      { section: 'Surface Downlight', seriesName: 'Plano', skuPrefix: 'SF-SD' },
      { section: 'Cylinder', seriesName: 'Torre', skuPrefix: 'SF-CY' },
      { section: 'Dual', seriesName: 'Duo', skuPrefix: 'SF-DO' },
      { section: 'Moveable', seriesName: 'Flex', skuPrefix: 'SF-MV' },
      { section: 'Laser', seriesName: 'Blade', skuPrefix: 'SF-LZ' },
      { section: 'Wall Washer', seriesName: 'Mural', skuPrefix: 'SF-SW' },
      { section: 'Hanging', seriesName: 'Drape', skuPrefix: 'SF-HG' },
    ],
  },
  {
    slug: 'magnetic-track',
    name: 'Magnetic Track',
    type: 'indoor',
    entries: [
      { section: '10mm', seriesName: 'Slim', skuPrefix: 'MT-10' },
      { section: '26mm', seriesName: 'Bold', skuPrefix: 'MT-26' },
    ],
  },
  {
    slug: 'downlight-panel',
    name: 'Downlight & Panel Light',
    type: 'indoor',
    entries: [
      { section: 'Deep Downlight', seriesName: 'Lumina Down', skuPrefix: 'DP-DD' },
      { section: 'Panel Light', seriesName: 'BackLit', skuPrefix: 'DP-PL' },
      { section: '2×2 Panel Light', seriesName: 'Grid', skuPrefix: 'DP-22' },
      { section: 'Nano Downlight', seriesName: 'Nano Lumina Down', skuPrefix: 'DP-ND' },
    ],
  },
  {
    slug: 'tracklight',
    name: 'Track Light',
    type: 'indoor',
    entries: [
      { section: 'Standard Track Light', seriesName: 'Glide', skuPrefix: 'TK-TR' },
    ],
  },
  {
    slug: 'profile-light',
    name: 'Profile Light',
    type: 'indoor',
    entries: [
      { section: 'Concealed Profile', seriesName: 'Hollow', skuPrefix: 'PF-CN' },
      { section: 'Surface Profile', seriesName: 'Ridge', skuPrefix: 'PF-SR' },
      { section: 'Flexible Profile', seriesName: 'Curve', skuPrefix: 'PF-FX' },
    ],
  },
  {
    slug: 'led-strip',
    name: 'LED Strip',
    type: 'indoor',
    entries: [
      { section: '120 LED/mtr', seriesName: 'Tape 120', skuPrefix: 'ST-120' },
      { section: '144 LED/mtr', seriesName: 'Tape 144', skuPrefix: 'ST-144' },
      { section: '180 LED/mtr', seriesName: 'Tape 180', skuPrefix: 'ST-180' },
      { section: '192 LED/mtr', seriesName: 'Tape 192', skuPrefix: 'ST-192' },
      { section: '210 LED/mtr', seriesName: 'Tape 210', skuPrefix: 'ST-210' },
      { section: '240 LED/mtr', seriesName: 'Tape 240', skuPrefix: 'ST-240' },
    ],
  },
  {
    slug: 'decorative',
    name: 'Decorative Lights',
    type: 'indoor',
    entries: [
      { section: 'Pendant / Hanging', seriesName: 'Pendant', skuPrefix: 'DC-PD' },
      { section: 'Picture Lights', seriesName: 'Frame', skuPrefix: 'DC-PC' },
    ],
  },
];

export function formatProductName(
  seriesName: string,
  section: string,
  variant?: string,
): string {
  const label = variant ? `${seriesName} ${variant}` : seriesName;
  return `${label} - ${section}`;
}

export function getCatalogFamily(slug: string): CatalogFamily | undefined {
  return CATALOG_FAMILIES.find((f) => f.slug === slug);
}

export function getCatalogEntry(
  familySlug: string,
  section: string,
): CatalogEntry | undefined {
  return getCatalogFamily(familySlug)?.entries.find((e) => e.section === section);
}
