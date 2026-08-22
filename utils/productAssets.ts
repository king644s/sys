import { Product } from '../types';
import { isHangingProfileProduct } from './hangingProfileProduct';
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

/** Section-specific product image zoom. Default is 60%. */
type ZoomVariant = 'card' | 'carousel' | 'thumbnail' | 'feature';

const PRODUCT_IMAGE_ZOOM_CLASSES: Record<string, Record<ZoomVariant, string>> = {
  'Dual Spotlight': {
    card: 'scale-[1.3] group-hover:scale-[1.365]',
    carousel: 'scale-[1.3] group-hover:scale-[1.326]',
    thumbnail: 'scale-[1.3]',
    feature: 'scale-[1.3] hover:scale-[1.365]',
  },
  'Commercial / High Wattage': {
    card: 'scale-[1.4] group-hover:scale-[1.47]',
    carousel: 'scale-[1.4] group-hover:scale-[1.428]',
    thumbnail: 'scale-[1.4]',
    feature: 'scale-[1.4] hover:scale-[1.47]',
  },
  'Hanging Profile Lights': {
    card: 'scale-[0.96] group-hover:scale-[1.01]',
    carousel: 'scale-[1.6] group-hover:scale-[1.632]',
    thumbnail: 'scale-[1.6]',
    feature: 'scale-[1.6] hover:scale-[1.68]',
  },
};

const DEFAULT_PRODUCT_IMAGE_ZOOM_CLASSES: Record<ZoomVariant, string> = {
  card: 'scale-[1.6] group-hover:scale-[1.68]',
  carousel: 'scale-[1.6] group-hover:scale-[1.632]',
  thumbnail: 'scale-[1.6]',
  feature: 'scale-[1.6] hover:scale-[1.68]',
};

function getProductSectionKey(product: Product): string {
  if (isHangingProfileProduct(product)) return 'Hanging Profile Lights';
  return product.section ?? product.subcategory ?? product.specs?.Classification ?? '';
}

/** Default 60%; Dual Spotlight 30%; Commercial / High Wattage 40%; hanging listing 40% smaller. */
export function getProductImageZoomClass(
  product: Product,
  variant: ZoomVariant,
): string {
  const section = getProductSectionKey(product);
  return (
    PRODUCT_IMAGE_ZOOM_CLASSES[section]?.[variant] ??
    DEFAULT_PRODUCT_IMAGE_ZOOM_CLASSES[variant]
  );
}
