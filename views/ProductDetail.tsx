'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { PRODUCTS } from '../data';
import { ROUTES, categoryPath } from '@/lib/routes';
import { buildProductInquiryMessage, buildWhatsAppUrl } from '@/lib/whatsapp';
import { getProductCodeDisplay } from '@/utils/productCodes';
import { getProductWattageOptions } from '@/utils/productWattage';
import {
  formatHangingProfileSizeDisplay,
  formatHangingProfileWattageDisplay,
  getHangingProfileFinishes,
  getHangingProfileSizeOptions,
  getHangingProfileWattageOptions,
  isHangingProfileProduct,
} from '@/utils/hangingProfileProduct';
import {
  getProductDetailWattOptions,
  getProductImagesForWatt,
  getProductFeatureImages,
  getProductImageZoomClass,
} from '@/utils/productAssets';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductFAQ } from '../components/ui/ProductFAQ';
import { buttonClasses } from '../components/ui/Button';
import { quoteHref } from '@/lib/site';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductSpecifications } from '../components/ui/ProductSpecifications';
import { ProductFeatures } from '../components/ui/ProductFeatures';
import { ProductImageCarousel } from '../components/ui/ProductImageCarousel';
import { ProductFinish } from '../types';
import { ArrowRight, Factory, FileText, Headset, ShieldCheck } from 'lucide-react';

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
  const isHangingProfile = product ? isHangingProfileProduct(product) : false;
  const finishOptions = isHangingProfile && product ? getHangingProfileFinishes(product) : DEFAULT_FINISHES;
  const [selectedFinishId, setSelectedFinishId] = useState(finishOptions[0]?.id ?? 'white');
  const [selectedWattage, setSelectedWattage] = useState<string | null>(null);

  useEffect(() => {
    const options = isHangingProfile && product
      ? getHangingProfileFinishes(product)
      : DEFAULT_FINISHES;
    setSelectedFinishId(options[0]?.id ?? 'white');
    const wattOptions = product ? getProductDetailWattOptions(product) : [];
    setSelectedWattage(wattOptions.length > 0 ? wattOptions[0] : null);
  }, [productSlug, product, isHangingProfile]);

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
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="heading-2">Product not found</h1>
        <p className="body mt-2">It may have been renamed or retired. Browse the full range instead.</p>
        <Link href={ROUTES.products} className={`${buttonClasses('primary')} mt-6`}>
          All products
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
  const hangingWattages = isHangingProfile && product ? getHangingProfileWattageOptions(product) : [];
  const hangingWattageDisplay = isHangingProfile ? formatHangingProfileWattageDisplay(hangingWattages) : null;
  const hangingSizes = isHangingProfile && product ? getHangingProfileSizeOptions(product) : [];
  const hangingSizeDisplay = isHangingProfile ? formatHangingProfileSizeDisplay(hangingSizes) : null;
  const displayOnlyWattages = isHangingProfile
    ? []
    : !showWattSelector
      ? fallbackWattOptions
      : [];

  const catalogId = getProductCodeDisplay(product);
  const whatsAppInquiryUrl = buildWhatsAppUrl(buildProductInquiryMessage(product));
  const carouselZoomClass = getProductImageZoomClass(product, 'carousel');
  const thumbnailZoomClass = getProductImageZoomClass(product, 'thumbnail');
  const featureZoomClass = getProductImageZoomClass(product, 'feature');

  const quoteLabel = catalogId ? `${product.name} (${catalogId})` : product.name;

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      <section className="container-page grid grid-cols-1 gap-10 pb-16 pt-4 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6 lg:sticky lg:top-[calc(var(--header-height)+24px)] lg:self-start">
          <ProductImageCarousel
            key={`${selectedWattage ?? 'default'}-${selectedFinishId}`}
            images={displayImages}
            productName={product.name}
            imageZoomClass={carouselZoomClass}
            thumbnailZoomClass={thumbnailZoomClass}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-7 lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="eyebrow">
                {product.seriesName && product.section
                  ? `${product.seriesName} · ${product.section}`
                  : 'Architectural series'}
              </span>
              {product.isBestseller && <span className="chip chip-accent h-6">Bestseller</span>}
            </div>
            <h1 className="heading-1 mt-3">{product.name}</h1>
            {catalogId && (
              <p className="mt-2 font-mono text-sm text-text-dim">
                <span className="text-text-ghost">Code </span>
                {catalogId}
              </p>
            )}
          </div>

          <p className="lead">{product.description}</p>

          {showWattSelector && (
            <div>
              <p className="field-label mb-2.5">
                Wattage <span className="font-normal text-text-dim">— {selectedWattage}</span>
              </p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Select wattage">
                {wattImageOptions.map((wattage) => {
                  const active = selectedWattage === wattage;
                  return (
                    <button
                      key={wattage}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSelectedWattage(wattage)}
                      className={`h-10 min-w-16 rounded-sm border px-4 text-sm font-medium transition-colors ${
                        active
                          ? 'border-gold bg-accent-soft text-gold'
                          : 'border-border-mid text-cream hover:border-border-high'
                      }`}
                    >
                      {wattage}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {(displayOnlyWattages.length > 0 || hangingWattageDisplay || hangingSizeDisplay) && (
            <dl className="grid grid-cols-1 divide-y divide-border overflow-hidden rounded-md border border-border">
              {hangingWattageDisplay && (
                <div className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                  <dt className="text-text-dim">Available wattage</dt>
                  <dd className="col-span-2 font-medium text-cream break-words">{hangingWattageDisplay}</dd>
                </div>
              )}
              {hangingSizeDisplay && (
                <div className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                  <dt className="text-text-dim">Available size</dt>
                  <dd className="col-span-2 font-medium text-cream break-words">{hangingSizeDisplay}</dd>
                </div>
              )}
              {!hangingWattageDisplay && displayOnlyWattages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
                  <dt className="text-text-dim">Available wattage</dt>
                  <dd className="col-span-2 flex flex-wrap gap-1.5">
                    {displayOnlyWattages.map((wattage) => (
                      <span key={wattage} className="chip h-6">{wattage}</span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}

          <div>
            <p className="field-label mb-2.5">
              {isHangingProfile ? 'Body finish' : 'Colour'}{' '}
              <span className="font-normal text-text-dim">— {activeFinish.label}</span>
            </p>
            <div className="flex gap-3">
              {finishOptions.map((finish) => {
                const active = selectedFinishId === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => setSelectedFinishId(finish.id)}
                    title={finish.label}
                    aria-label={`Select ${isHangingProfile ? 'body finish' : 'colour'} ${finish.label}`}
                    aria-pressed={active}
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                      active ? 'border-gold' : 'border-transparent hover:border-border-high'
                    }`}
                  >
                    <span
                      className="block h-7 w-7 rounded-full border border-black/10"
                      style={{ backgroundColor: finish.swatch }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link href={quoteHref(quoteLabel)} className={buttonClasses('primary', 'lg', 'w-full')}>
                Request a quote
              </Link>
              <a
                href={whatsAppInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses('secondary', 'lg', 'w-full')}
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                Ask on WhatsApp
              </a>
            </div>
            <Link
              href={`${ROUTES.contact}?topic=spec&product=${encodeURIComponent(quoteLabel)}`}
              className="inline-flex items-center gap-2 self-start text-sm font-semibold text-gold hover:underline"
            >
              <FileText className="h-4 w-4" />
              Request spec sheet and IES file
            </Link>
          </div>

          <ul className="grid grid-cols-1 gap-3 rounded-md bg-surface-alt p-4 text-sm text-text-dim sm:grid-cols-3">
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-gold" /> CRI 92+ chips</li>
            <li className="flex items-center gap-2"><Factory className="h-4 w-4 text-gold" /> Made in India</li>
            <li className="flex items-center gap-2"><Headset className="h-4 w-4 text-gold" /> Design desk support</li>
          </ul>

          <div className="pt-2">
            <ScrollReveal direction="up">
              <ProductSpecifications product={product} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ProductFeatures
        images={featureImages}
        productName={product.name}
        imageZoomClass={featureZoomClass}
      />

      {relatedProducts.length > 0 && (
        <section className="section border-t border-border bg-void-dark">
          <div className="container-page">
            <SectionHeader
              eyebrow="Same family"
              title="You may also like"
              action={
                <Link href={categoryPath(product.category)} className="link-arrow">
                  View the full range <ArrowRight className="h-4 w-4" />
                </Link>
              }
            />
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ProductFAQ />
    </div>
  );
}
