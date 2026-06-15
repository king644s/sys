'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useLightingStore } from '../store/lightingStore';
import { PRODUCTS } from '../data';
import { ROUTES, categoryPath } from '@/lib/routes';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { SectionDivider } from '../components/ui/SectionDivider';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ProductSpecifications } from '../components/ui/ProductSpecifications';
import { ProductFeatures } from '../components/ui/ProductFeatures';
import { ProductImageCarousel } from '../components/ui/ProductImageCarousel';
import { ArrowLeft, CheckCircle2, FileText } from 'lucide-react';

interface ProductDetailProps {
  productSlug: string;
}

export function ProductDetail({ productSlug }: ProductDetailProps) {
  const { cartEnquiry, addToEnquiry, removeFromEnquiry } = useLightingStore();

  const product = PRODUCTS.find(p => p.slug === productSlug);
  const [selectedFinish, setSelectedFinish] = useState<'graphite' | 'black' | 'gold' | 'brass'>('gold');
  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return (
      <div className="text-center select-none">
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

  // Find related products matching the same category
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const isEnquired = cartEnquiry.includes(product.id);

  const handleEnquiryToggle = () => {
    if (isEnquired) {
      removeFromEnquiry(product.id);
    } else {
      addToEnquiry(product.id);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const getFinishName = () => {
    switch (selectedFinish) {
      case 'graphite': return 'Micro-textured Graphite Grey';
      case 'black': return 'Luxury Anodised Matte Black';
      case 'gold': return 'Precision Sand Gold Accent';
      default: return 'Solid Machined Brushed Brass';
    }
  };

  return (
    <div className="select-none transition-page-enter">
      <Breadcrumbs />

      {/* Floating success banner */}
      {showNotification && (
        <div className="fixed top-24 right-6 z-50 bg-surface border border-gold p-4 shadow-2xl flex items-center gap-3 animate-page-enter">
          <CheckCircle2 className="w-5 h-5 text-gold" style={{ filter: 'drop-shadow(0 0 5px rgba(201,169,110,0.4))' }} />
          <div className="flex flex-col">
            <span className="font-sans text-xs font-semibold text-cream">Added to estimate list</span>
            <span className="font-mono text-[9px] text-text-dim">Request specs & CAD on checkout</span>
          </div>
        </div>
      )}

      {/* Back button container */}
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

      {/* 2-Column Product Detail Layout */}
      <section className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Interactive Image showcase — sticky while right column scrolls */}
        <div className="lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
          <ProductImageCarousel images={product.images} productName={product.name} />
        </div>

        {/* Right: Technical specifications and Add To Quote controls */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-gold font-bold">
              {product.category === 'latch-series' ? 'Latch Series — Front Removable' : 'Precision Architectural Series'}
            </span>
            <h1 className="font-serif text-3xl md:text-5xl text-cream tracking-tight mt-1 mb-2 font-light">
              {product.name}
            </h1>
            {product.vendorCode && (
              <p className="font-mono text-[10px] text-text-ghost uppercase tracking-widest mb-1">
                Vendor Code: {product.vendorCode}
              </p>
            )}
            <p className="font-mono text-[11px] text-gold/80 italic tracking-wider">
              {product.shortSpec}
            </p>
          </div>

          <div className="h-[1px] bg-border/50" />

          <p className="font-sans text-xs md:text-sm text-cream leading-relaxed font-light">
            {product.description}
          </p>

          <div className="h-[1px] bg-border/50" />

          {/* Luxury physical finish picker */}
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-text-ghost block mb-3">
              Aluminium Fixture Finish — {getFinishName()}
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => setSelectedFinish('gold')}
                style={{ backgroundColor: '#C9A96E' }}
                className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                  selectedFinish === 'gold' ? 'border-white scale-110 shadow-[0_0_12px_rgba(201,169,110,0.5)]' : 'border-transparent hover:scale-105'
                }`}
                title="Sand Gold Accent"
              />
              <button
                onClick={() => setSelectedFinish('black')}
                style={{ backgroundColor: '#1C1C1F' }}
                className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                  selectedFinish === 'black' ? 'border-white scale-110 shadow-[0_0_12px_rgba(28,28,31,0.5)]' : 'border-transparent hover:scale-105'
                }`}
                title="Matte Black"
              />
              <button
                onClick={() => setSelectedFinish('graphite')}
                style={{ backgroundColor: '#4C4D52' }}
                className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                  selectedFinish === 'graphite' ? 'border-white scale-110 shadow-[0_0_12px_rgba(76,77,82,0.5)]' : 'border-transparent hover:scale-105'
                }`}
                title="Graphite Grey"
              />
              <button
                onClick={() => setSelectedFinish('brass')}
                style={{ backgroundColor: '#A88D54' }}
                className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all duration-300 ${
                  selectedFinish === 'brass' ? 'border-white scale-110 shadow-[0_0_12px_rgba(168,141,84,0.5)]' : 'border-transparent hover:scale-105'
                }`}
                title="Solid Brushed Brass"
              />
            </div>
          </div>

          {/* Main call to actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={handleEnquiryToggle}
              className={`flex-1 py-4 uppercase text-xs font-mono tracking-widest transition-all duration-300 border cursor-pointer ${
                isEnquired
                  ? 'bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/5'
                  : 'bg-gold text-white dark:text-void-dark border-gold hover:bg-gold-light hover:border-gold-light font-bold hover:shadow-[0_0_30px_rgba(201,169,110,0.2)]'
              }`}
            >
              {isEnquired ? 'Remove from Estimate' : 'Add to Estimate Tray'}
            </button>
            <Button
              variant="secondary"
              className="flex-1 font-mono uppercase"
              href={ROUTES.contact}
            >
              <FileText className="w-4 h-4 text-gold shrink-0" />
              <span>Contact sales</span>
            </Button>
          </div>

          <div className="pt-8">
            <ScrollReveal direction="up">
              <ProductSpecifications product={product} />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ProductFeatures images={product.images} productName={product.name} />

      <SectionDivider label="Related specifications" />

      {/* Related Products Series list */}
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
