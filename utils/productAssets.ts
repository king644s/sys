import { Product } from '../types';
import {
  PRODUCT_ASSET_MANIFEST,
  ProductAssetEntry,
  ProductImagePair,
  ProductWattVariant,
} from '../data/productAssetManifest';

export type { ProductImagePair, ProductWattVariant, ProductAssetEntry };

export function getProductAssetEntry(product: Product): ProductAssetEntry | null {
  return PRODUCT_ASSET_MANIFEST[product.slug] ?? null;
}

export function getProductListingImage(product: Product): ProductImagePair {
  const entry = getProductAssetEntry(product);
  if (entry) {
    const firstVariant = entry.wattVariants[0];
    const firstImage = firstVariant?.images[0];
    if (firstImage) return firstImage;
    return { thumbnail: entry.listingThumbnail, full: entry.listingThumbnail };
  }

  const fallback = product.images[0] ?? '';
  return { thumbnail: fallback, full: fallback };
}

export function getProductListingThumbnail(product: Product): string {
  return getProductListingImage(product).thumbnail;
}

export function getProductWattImageVariants(product: Product): ProductWattVariant[] {
  const entry = getProductAssetEntry(product);
  return entry?.wattVariants ?? [];
}

export function getProductDetailWattOptions(product: Product): string[] {
  const variants = getProductWattImageVariants(product);
  if (variants.length > 1) {
    return variants.map((v) => v.wattage);
  }
  return [];
}

export function getProductImagesForWatt(
  product: Product,
  wattage: string | null,
): ProductImagePair[] {
  const variants = getProductWattImageVariants(product);
  if (variants.length === 0) {
    return product.images.filter(Boolean).map((src) => ({ thumbnail: src, full: src }));
  }

  const match =
    variants.find((v) => v.wattage === wattage) ??
    variants.find((v) => v.label === wattage) ??
    variants[0];

  return match.images;
}

export function getProductFeatureImages(product: Product, wattage: string | null): string[] {
  const pairs = getProductImagesForWatt(product, wattage);
  return pairs.map((p) => p.full);
}
