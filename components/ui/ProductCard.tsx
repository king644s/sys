'use client';

import Link from 'next/link';
import { Product } from '../../types';
import { productPath } from '@/lib/routes';
import { getProductListingImage, getProductImageZoomClass } from '@/utils/productAssets';
import { getProductCodeDisplay } from '@/utils/productCodes';
import { getProductWattageDisplay } from '@/utils/productWattage';
import { ProgressiveImage } from './ProgressiveImage';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const href = productPath(product.slug);
  const listingImage = getProductListingImage(product);
  const productCodes = getProductCodeDisplay(product);
  const wattage = getProductWattageDisplay(product);
  const imageZoomClass = getProductImageZoomClass(product, 'card');

  return (
    <Link
      href={href}
      className="group card card-interactive flex h-full flex-col overflow-hidden"
      id={`product-card-${product.id}`}
    >
      <div className="relative m-2 mb-0 aspect-square overflow-hidden rounded-md bg-surface-alt">
        <div className="product-image-halo" aria-hidden />
        <div className="absolute inset-0 z-[1] flex items-center justify-center p-8">
          <ProgressiveImage
            thumbnailSrc={listingImage.thumbnail}
            fullSrc={listingImage.full}
            alt={product.name}
            loading="lazy"
            className={`max-h-full max-w-full h-auto w-auto object-contain object-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] ${imageZoomClass}`}
          />
        </div>

        {product.isBestseller && (
          <span className="chip chip-accent absolute left-3 top-3 z-10 h-6 bg-surface">Bestseller</span>
        )}

        <span className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-surface text-cream opacity-0 shadow-subtle transition-all duration-300 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-card-md">
        {productCodes && (
          <span className="font-mono text-xs text-text-ghost line-clamp-1">{productCodes}</span>
        )}
        <h3 className="heading-3 line-clamp-2 group-hover:text-gold transition-colors">{product.name}</h3>
        <p className="mt-auto pt-2 text-sm text-text-dim">
          {wattage ? (
            <>
              <span className="text-text-ghost">Available in </span>
              {wattage}
            </>
          ) : (
            ' '
          )}
        </p>
      </div>
    </Link>
  );
}
