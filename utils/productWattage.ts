import { Product } from '../types';

export function getProductWattageDisplay(product: Product): string | null {
  if (product.dimensionVariants?.length) {
    return [...new Set(product.dimensionVariants.map((variant) => variant.wattage))].join(' / ');
  }

  return product.specs['Wattage Options'] || product.specs['Wattage'] || null;
}

export function getProductWattageOptions(product: Product): string[] {
  const display = getProductWattageDisplay(product);
  if (!display) return [];

  return display
    .split(/\s*\/\s*/)
    .map((option) => option.trim())
    .filter(Boolean);
}
