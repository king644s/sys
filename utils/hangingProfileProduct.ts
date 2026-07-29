import { Product, ProductFinish } from '../types';

export const HANGING_PROFILE_CATEGORY = 'hanging-profile-light';

export const HANGING_BODY_FINISHES: ProductFinish[] = [
  { id: 'black', label: 'Black', swatch: '#1C1C1F', images: [] },
  { id: 'white', label: 'White', swatch: '#F4F4F5', images: [] },
  { id: 'gold', label: 'Gold', swatch: '#C9A96E', images: [] },
  { id: 'copper', label: 'Copper', swatch: '#B87333', images: [] },
  { id: 'ral', label: 'RAL', swatch: '#6B7280', images: [] },
];

export function isHangingProfileProduct(product: Product): boolean {
  return product.category === HANGING_PROFILE_CATEGORY || product.family === HANGING_PROFILE_CATEGORY;
}

export function getHangingProfileFinishes(product: Product): ProductFinish[] {
  return product.finishes?.length ? product.finishes : HANGING_BODY_FINISHES;
}

function normalizeSpecToken(part: string): string {
  const trimmed = part.trim();
  if (!trimmed) return trimmed;

  if (/^customi[sz]ed(\s+as\s+per\s+requirement)?$/i.test(trimmed)) return 'Customized';
  if (/^customi[sz]able(\s+size(s)?)?$/i.test(trimmed)) return 'Customized Sizes';
  if (/tailor\s*made/i.test(trimmed)) return 'Tailor Made';
  if (/^9\s*watt\s*\/\s*foot$/i.test(trimmed)) return '9 Watt/Foot';
  if (/^9\s*watt\s*\/\s*feet$/i.test(trimmed)) return '9 Watt/Foot';
  if (/honeycomb on request/i.test(trimmed)) return 'Honeycomb on Request';

  return trimmed;
}

export function parseHangingSpecList(value: string | undefined): string[] {
  if (!value) return [];

  const normalized = value
    .replace(/\s*—\s*/g, ' / ')
    .replace(/\s*&\s*/g, ' / ')
    .replace(/\s*\+\s*/g, ' / ');

  const seen = new Set<string>();
  const options: string[] = [];

  for (const part of normalized.split(/\s*\/\s*/)) {
    const token = normalizeSpecToken(part);
    if (!token || seen.has(token)) continue;
    seen.add(token);
    options.push(token);
  }

  return options;
}

export function getHangingProfileWattageOptions(product: Product): string[] {
  const fromSpecs = parseHangingSpecList(product.specs['Wattage'] || product.specs['Wattage Options']);
  if (fromSpecs.length) return fromSpecs;

  return [...new Set(product.dimensionVariants?.map((variant) => variant.wattage) ?? [])];
}

/** Collapse wattage chips into e.g. "18W - 140W | Customized" */
export function formatHangingProfileWattageDisplay(wattages: string[]): string | null {
  if (!wattages.length) return null;

  const numericWatts: string[] = [];
  const suffixes: string[] = [];

  for (const wattage of wattages) {
    if (/^customi[sz]ed/i.test(wattage)) {
      suffixes.push('Customized');
      continue;
    }

    if (/^\d/.test(wattage)) {
      numericWatts.push(wattage);
      continue;
    }

    suffixes.push(wattage);
  }

  const range =
    numericWatts.length >= 2
      ? `${numericWatts[0]} - ${numericWatts[numericWatts.length - 1]}`
      : numericWatts[0] ?? null;

  const uniqueSuffixes = [...new Set(suffixes)];

  if (range && uniqueSuffixes.length) {
    return `${range} | ${uniqueSuffixes.join(' | ')}`;
  }

  return range ?? uniqueSuffixes.join(' | ') ?? null;
}

/** Collapse size list into e.g. "300mm - 1500mm | Customized Sizes" */
export function formatHangingProfileSizeDisplay(sizes: string[]): string | null {
  if (!sizes.length) return null;

  const numericSizes: string[] = [];
  const suffixes: string[] = [];

  for (const size of sizes) {
    if (/^customi[sz]ed(\s+sizes?)?$/i.test(size)) {
      suffixes.push('Customized Sizes');
      continue;
    }

    if (/tailor\s*made/i.test(size)) {
      suffixes.push('Tailor Made');
      continue;
    }

    if (/honeycomb/i.test(size)) {
      suffixes.push('Honeycomb on Request');
      continue;
    }

    if (/^\d/.test(size)) {
      numericSizes.push(size);
      continue;
    }

    suffixes.push(size);
  }

  const range =
    numericSizes.length >= 2
      ? `${numericSizes[0]} - ${numericSizes[numericSizes.length - 1]}`
      : numericSizes[0] ?? null;

  const uniqueSuffixes = [...new Set(suffixes)];

  if (range && uniqueSuffixes.length) {
    return `${range} | ${uniqueSuffixes.join(' | ')}`;
  }

  return range ?? uniqueSuffixes.join(' | ') ?? null;
}

export function getHangingProfileSizeOptions(product: Product): string[] {
  const sizeSpec =
    product.specs['Size'] ||
    product.specs['Dia Size'] ||
    product.specs['Diameter Size'];

  return parseHangingSpecList(sizeSpec);
}

export function getHangingProfileBodyFinishLabel(product: Product): string {
  return product.specs['Finish'] || product.specs['Body Finish'] || 'Black / White / Gold / Copper / RAL';
}
