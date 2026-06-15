'use client';

import Link from 'next/link';
import { CATEGORIES, PRODUCTS } from '../data';
import { ROUTES } from '@/lib/routes';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react';

interface ProductCategoryProps {
  categorySlug: string;
}

export function ProductCategory({ categorySlug }: ProductCategoryProps) {
  const category = CATEGORIES.find((cat) => cat.slug === categorySlug);
  const matchedProducts = PRODUCTS.filter((prod) => prod.category === categorySlug);

  const subcategoryGroups = matchedProducts.reduce<Record<string, typeof matchedProducts>>((groups, product) => {
    const key = product.subcategory || 'General';
    if (!groups[key]) groups[key] = [];
    groups[key].push(product);
    return groups;
  }, {});

  const hasSubcategories = Object.keys(subcategoryGroups).length > 1 || matchedProducts.some((p) => p.subcategory);

  if (!category) {
    return (
      <div className="text-center select-none">
        <h2 className="font-serif text-3xl text-cream">Classification not found</h2>
        <Link
          href={ROUTES.products}
          className="mt-6 font-mono text-xs text-gold uppercase tracking-widest hover:underline cursor-pointer inline-block"
        >
          Return to classifications
        </Link>
      </div>
    );
  }

  return (
    <div className="select-none transition-page-enter">
      <Breadcrumbs />
      <section className="sticky top-28 z-20 bg-void/95 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Link
          href={ROUTES.products}
          className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-cream flex items-center gap-2 mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-gold-muted" />
          <span>all classifications</span>
        </Link>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-1.5 block">
              {category.type === 'outdoor' ? 'Outdoor Architectural Spectrum' : 'Indoor Architectural Spectrum'}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-light text-cream tracking-tight">
              {category.name} <span className="italic font-serif text-gold font-normal">series</span>
            </h1>
            <p className="font-sans text-xs md:text-sm text-text-dim max-w-xl mt-4 leading-relaxed">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-surface text-text-dim border border-border px-4 py-2.5">
            <SlidersHorizontal className="w-4 h-4 text-gold-muted" />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              Showing {matchedProducts.length} specifications
            </span>
          </div>
        </div>
      </div>
      </section>

      {/* Matching products lists */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {matchedProducts.length > 0 ? (
          hasSubcategories ? (
            <div className="flex flex-col gap-14">
              {Object.entries(subcategoryGroups).map(([subcategory, products], groupIdx) => (
                <div key={subcategory}>
                  <div className="border-b border-border/40 pb-4 mb-8">
                    <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold-muted block mb-1">
                      Subcategory
                    </span>
                    <h2 className="font-serif text-2xl md:text-3xl text-cream font-light tracking-tight">
                      {subcategory}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((prod, idx) => (
                      <div key={prod.id}>
                        <ScrollReveal direction="up" delay={(groupIdx * 3 + idx) * 0.08}>
                          <ProductCard product={prod} />
                        </ScrollReveal>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {matchedProducts.map((prod, idx) => (
                <div key={prod.id}>
                  <ScrollReveal direction="up" delay={idx * 0.08}>
                    <ProductCard product={prod} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 border border-dashed border-border">
            <span className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-4">
              Fixture list update in progress.
            </span>
            <p className="font-sans text-xs text-text-dim/70 max-w-sm mx-auto">
              Our Mumbai testing crew is currently finalizing technical certification logs for this series. Please request details from our design desk directly.
            </p>
            <Link
              href={ROUTES.contact}
              className="mt-6 bg-gold text-void-dark font-bold font-mono text-[10px] uppercase tracking-widest px-6 py-3.5 inline-block"
            >
              Contact design desk
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
