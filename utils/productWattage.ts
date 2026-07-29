import { Product } from '../types';
import { isHangingProfileProduct, parseHangingSpecList } from './hangingProfileProduct';

export function getProductWattageDisplay(product: Product): string | null {
  if (isHangingProfileProduct(product)) {
    return product.specs['Wattage'] || product.specs['Wattage Options'] || null;
  }

  if (product.dimensionVariants?.length) {
    return [...new Set(product.dimensionVariants.map((variant) => variant.wattage))].join(' / ');
  }

  return product.specs['Wattage Options'] || product.specs['Wattage'] || null;
}

export function getProductWattageOptions(product: Product): string[] {
  if (isHangingProfileProduct(product)) {
    return parseHangingSpecList(getProductWattageDisplay(product) ?? undefined);
  }

  const display = getProductWattageDisplay(product);
  if (!display) return [];

  return display
    .split(/\s*\/\s*/)
    .map((option) => option.trim())
    .filter(Boolean);
}
