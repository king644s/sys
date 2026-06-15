'use client';

import Link from 'next/link';
import { Product } from '../../types';
import { productPath } from '@/lib/routes';
import { ArrowUpRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const href = productPath(product.slug);

  return (
    <Link
      href={href}
      className="group flex flex-col bg-surface border border-border hover:border-gold/50 hover:shadow-[0_12px_30px_-10px_rgba(201,169,110,0.18)] hover:-translate-y-1 transition-all duration-500 rounded-[2px] overflow-hidden"
      id={`product-card-${product.id}`}
    >
      <div className="relative aspect-square w-full bg-gradient-to-b from-surface-alt to-void overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full h-auto w-auto object-contain object-center opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out-expo"
          />
        </div>

        <div className="absolute inset-0 bg-void/30 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="border border-gold text-gold font-sans text-[10px] tracking-widest uppercase px-5 py-2.5 bg-void/95 rounded-[1px] shadow-[0_4px_24px_rgba(0,0,0,0.65)] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-luxury">
            View Specifications
          </span>
        </div>

        {product.isBestseller && (
          <div className="absolute top-4 left-4 bg-gold text-white font-mono text-[8px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-[0_2px_8px_rgba(0,0,0,0.2)] z-10">
            Bestseller
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 border-t border-border/50">
        <span className="font-mono text-[8px] uppercase tracking-widest text-gold-muted mb-1.5">
          {product.subcategory || product.category.replace(/-/g, ' ')}
        </span>

        <h3 className="font-serif text-lg text-cream group-hover:text-gold transition-colors duration-300 mb-2 font-semibold">
          {product.name}
        </h3>

        <p className="font-sans text-xs text-text-dim leading-relaxed mb-4 flex-1">
          {product.shortSpec}
        </p>

        <span className="mt-auto self-start text-[9px] font-mono uppercase tracking-[0.18em] text-cream group-hover:text-gold group-hover:translate-x-1 duration-300 inline-flex items-center gap-1">
          <span>Examine Fixture</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}
