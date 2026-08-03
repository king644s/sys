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
      className="group flex h-full flex-col bg-surface border border-border hover:border-gold/50 hover:shadow-hover hover:-translate-y-1 transition-all duration-500 rounded-md overflow-hidden"
      id={`product-card-${product.id}`}
    >
      <div className="relative aspect-square w-full bg-gradient-to-b from-surface-alt to-void overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <ProgressiveImage
            thumbnailSrc={listingImage.thumbnail}
            fullSrc={listingImage.full}
            alt={product.name}
            loading="lazy"
            className={`max-h-full max-w-full h-auto w-auto object-contain object-center opacity-100 transition-transform duration-700 ease-out-expo ${imageZoomClass}`}
          />
        </div>

        <div className="absolute inset-0 bg-void/30 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="border border-gold text-gold font-mono text-xs tracking-[0.15em] uppercase px-5 py-2.5 bg-void/95 rounded-sm shadow-card transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
            View Specifications
          </span>
        </div>

        {product.isBestseller && (
          <div className="absolute top-4 left-4 bg-gold text-white font-mono text-xs font-bold uppercase tracking-[0.15em] px-2.5 py-1 shadow-subtle z-10">
            Bestseller
          </div>
        )}
      </div>

      <div className="p-card-md flex flex-1 flex-col border-t border-border/50">
        {productCodes && (
          <span className="mb-1.5 min-h-[1.125rem] font-mono text-xs uppercase tracking-[0.15em] text-gold-muted line-clamp-1">
            {productCodes}
          </span>
        )}

        <h3 className="mb-2 min-h-[4rem] font-serif text-2xl font-semibold text-cream line-clamp-2 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>

        <p className="mb-4 min-h-[2.75rem] flex-1 font-sans text-sm leading-relaxed text-text-dim line-clamp-2">
          {wattage || '\u00A0'}
        </p>

        <span className="mt-auto self-start text-xs font-mono uppercase tracking-[0.15em] text-cream group-hover:text-gold group-hover:translate-x-1 duration-300 inline-flex items-center gap-1">
          <span>Examine Fixture</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
