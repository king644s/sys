import { Product } from '../types';

/** Strip trailing wattage/numeric suffix (e.g. SL-GN-CT-08 → SL-GN-CT). */
function stripProductCodeSuffix(code: string): string {
  return code.trim().replace(/-\d+$/, '').replace(/-$/, '');
}

function uniqueBaseCodes(codes: string[]): string[] {
  return [...new Set(codes.map(stripProductCodeSuffix).filter(Boolean))];
}

export function getProductCodeDisplay(product: Product): string | null {
  if (product.dimensionVariants?.length) {
    const codes = uniqueBaseCodes(
      product.dimensionVariants.map((variant) => variant.productCode).filter(Boolean),
    );
    if (codes.length) return codes.join(' / ');
  }

  const specCodes = product.specs['Product Codes'];
  if (specCodes) {
    const codes = uniqueBaseCodes(specCodes.split(/\s*\/\s*/));
    if (codes.length) return codes.join(' / ');
  }

  return null;
}
