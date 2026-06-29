'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data';
import { ROUTES, categoryPath } from '@/lib/routes';
import { buildProductInquiryMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { getProductWattageOptions } from '@/utils/productWattage';
import {
  getProductDetailWattOptions,
  getProductImagesForWatt,
  getProductFeatureImages,
} from '@/utils/productAssets';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { SectionDivider } from '../components/ui/SectionDivider';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductSpecifications } from '../components/ui/ProductSpecifications';
import { ProductFeatures } from '../components/ui/ProductFeatures';
import { ProductImageCarousel } from '../components/ui/ProductImageCarousel';
import { ProductFinish } from '../types';
import { ArrowLeft } from 'lucide-react';

const DEFAULT_FINISHES: ProductFinish[] = [
  { id: 'white', label: 'White', swatch: '#F4F4F5', images: [] },
  { id: 'black', label: 'Black', swatch: '#1C1C1F', images: [] },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface ProductDetailProps {
  productSlug: string;
}

export function ProductDetail({ productSlug }: ProductDetailProps) {
  const product = PRODUCTS.find(p => p.slug === productSlug);
  const finishOptions = DEFAULT_FINISHES;
  const [selectedFinishId, setSelectedFinishId] = useState(finishOptions[0]?.id ?? 'white');
  const [selectedWattage, setSelectedWattage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedFinishId(finishOptions[0]?.id ?? 'white');
    const options = product ? getProductDetailWattOptions(product) : [];
    setSelectedWattage(options.length > 0 ? options[0] : null);
  }, [productSlug, product]);

  const displayImages = useMemo(
    () => (product ? getProductImagesForWatt(product, selectedWattage) : []),
    [product, selectedWattage],
  );

  const featureImages = useMemo(
    () => (product ? getProductFeatureImages(product, selectedWattage) : []),
    [product, selectedWattage],
  );

  const wattImageOptions = product ? getProductDetailWattOptions(product) : [];
  const fallbackWattOptions = product ? getProductWattageOptions(product) : [];

  if (!product) {
    return (
      <div className="text-center">
        <h2 className="font-serif text-3xl text-cream">Fixture profile not found</h2>
        <Link
          href={ROUTES.products}
          className="mt-6 font-mono text-xs text-gold uppercase tracking-widest hover:underline cursor-pointer inline-block"
        >
          Return to directory
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter(
    p => (p.family ?? p.category) === (product.family ?? product.category) && p.id !== product.id,
  ).slice(0, 3);

  const activeFinish =
    finishOptions.find((finish) => finish.id === selectedFinishId) ?? finishOptions[0];

  const showWattSelector = wattImageOptions.length > 1;
  const displayOnlyWattages = !showWattSelector ? fallbackWattOptions : [];

  const whatsAppInquiryUrl = buildWhatsAppUrl(buildProductInquiryMessage(product));

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      <section className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            href={categoryPath(product.category)}
            className="font-mono text-[10px] uppercase tracking-widest text-text-dim hover:text-cream flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold-muted" />
            <span>back to series</span>
          </Link>

          <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest hidden md:inline">
            Catalog ID: SYS-{product.id.toUpperCase()}
          </span>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
          <ProductImageCarousel
            key={`${selectedWattage ?? 'default'}-${selectedFinishId}`}
            images={displayImages}
            productName={product.name}
          />
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-gold font-bold">
              {product.seriesName && product.section
                ? `${product.seriesName} — ${product.section}`
                : 'Precision Architectural Series'}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-cream tracking-tight mt-1 mb-2 font-light">
              {product.name}
            </h1>

            {showWattSelector && (
              <div className="mt-3 rounded-md bg-gold/5 px-3 py-2.5">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-ghost block mb-2">
                  Select Wattage
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {wattImageOptions.map((wattage) => (
                    <button
                      key={wattage}
                      type="button"
                      onClick={() => setSelectedWattage(wattage)}
                      className={`inline-flex items-center px-2.5 py-1 font-mono text-[11px] md:text-xs font-medium tracking-wide rounded-md cursor-pointer transition-all duration-300 ${
                        selectedWattage === wattage
                          ? 'bg-gold text-void border border-gold shadow-[0_0_12px_rgba(201,169,110,0.35)]'
                          : 'bg-void/30 text-gold/95 border border-border hover:border-gold/50'
                      }`}
                    >
                      {wattage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {displayOnlyWattages.length > 0 && (
              <div className="mt-3 rounded-md bg-gold/5 px-3 py-2.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-text-ghost">
                    Available Wattage
                  </span>
                  {displayOnlyWattages.map((wattage) => (
                    <span
                      key={wattage}
                      className="inline-flex items-center px-2.5 py-1 bg-void/30 font-mono text-[11px] md:text-xs text-gold/95 font-medium tracking-wide rounded-md"
                    >
                      {wattage}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-border/50" />

          <p className="font-sans text-xs md:text-sm text-cream leading-relaxed font-light">
            {product.description}
          </p>

          <div className="h-px bg-border/50" />

          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-ghost block mb-3">
              Colour Option — {activeFinish.label}
            </span>
            <div className="flex gap-3">
              {finishOptions.map((finish) => (
                <button
                  key={finish.id}
                  onClick={() => setSelectedFinishId(finish.id)}
                  style={{ backgroundColor: finish.swatch }}
                  className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                    selectedFinishId === finish.id
                      ? 'border-white scale-110 shadow-[0_0_12px_rgba(201,169,110,0.5)]'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={finish.label}
                />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <a
              href={whatsAppInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-6 py-3.5 tracking-wider uppercase text-xs font-mono font-medium transition-all duration-300 ease-luxury focus:outline-none focus:ring-1 focus:ring-[#25D366]/50 cursor-pointer rounded-[1px] inline-flex items-center justify-center gap-2 border border-[#25D366]/60 text-white bg-[#25D366] hover:bg-[#22c55e] hover:border-[#22c55e] active:bg-[#1da851]"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>Inquire This Product</span>
            </a>
          </div>

          <div className="pt-8">
            <ScrollReveal direction="up">
              <ProductSpecifications product={product} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ProductFeatures images={featureImages} productName={product.name} />

      <SectionDivider label="Related specifications" />

      <section className="max-w-7xl mx-auto px-6 py-10 mb-12">
        <h2 className="font-serif text-2xl md:text-4xl text-cream font-light tracking-tight mb-10">
          More from this <span className="italic font-serif text-gold font-normal">Classification</span>
        </h2>

        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.map(prod => (
              <div key={prod.id}>
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-border p-12 text-center">
            <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
              No secondary fixtures registered in this class.
            </span>
          </div>
        )}
      </section>
    </div>
  );
}
