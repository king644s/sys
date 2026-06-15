'use client';

import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES, CATEGORY_SLUGS, categoryPath } from '@/lib/routes';
import { Download } from 'lucide-react';
import Logo from '../common/Logo';

export function Footer() {
  const { currentView } = useNavigation();

  const isActive = (viewType: string, extraParam?: string) => {
    if (viewType === 'product-category' && extraParam) {
      return currentView.type === 'product-category' && currentView.categorySlug === extraParam;
    }
    if (viewType === 'products') {
      return currentView.type === 'products' || currentView.type === 'product-detail';
    }
    return currentView.type === viewType;
  };

  const getLinkClass = (viewType: string, extraParam?: string) => {
    const active = isActive(viewType, extraParam);
    return `inline-flex items-center gap-1.5 transition-colors duration-200 cursor-pointer text-left py-0.5 text-[13px] ${
      active
        ? 'text-gold font-bold'
        : 'text-text-dim hover:text-black dark:hover:text-white'
    }`;
  };

  return (
    <footer className="bg-surface text-text-dim border-t border-border mt-24 pt-16 pb-12 px-6 sm:px-12 md:px-20 transition-colors duration-300" id="luxury-brand-footer">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              DIRECTORY
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={ROUTES.home} className={getLinkClass('home')}>
                  {isActive('home') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.products} className={getLinkClass('products')}>
                  {isActive('products') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  Products Hub
                </Link>
              </li>
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  {isActive('smart-lights') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  Customise & Smart CCT
                </Link>
              </li>
              <li>
                <Link href={ROUTES.projects} className={getLinkClass('projects')}>
                  {isActive('projects') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  Inspire Gallery
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className={getLinkClass('about')}>
                  {isActive('about') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  About Workshop
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className={getLinkClass('contact')}>
                  {isActive('contact') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 animate-pulse-glow" />}
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              INDOOR CORES
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.cobSpotlight)} className={getLinkClass('product-category', CATEGORY_SLUGS.cobSpotlight)}>
                  {isActive('product-category', CATEGORY_SLUGS.cobSpotlight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  COB Spotlights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.magneticTrack)} className={getLinkClass('product-category', CATEGORY_SLUGS.magneticTrack)}>
                  {isActive('product-category', CATEGORY_SLUGS.magneticTrack) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Magnetic Track Lights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.deepDownlight)} className={getLinkClass('product-category', CATEGORY_SLUGS.deepDownlight)}>
                  {isActive('product-category', CATEGORY_SLUGS.deepDownlight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Deep Recessed Downlights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.sysprofiles)} className={getLinkClass('product-category', CATEGORY_SLUGS.sysprofiles)}>
                  {isActive('product-category', CATEGORY_SLUGS.sysprofiles) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Trimless Linear Extrusions
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.zoomLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.zoomLight)}>
                  {isActive('product-category', CATEGORY_SLUGS.zoomLight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Continuous Optical Focus
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.surfaceDownlight)} className={getLinkClass('product-category', CATEGORY_SLUGS.surfaceDownlight)}>
                  {isActive('product-category', CATEGORY_SLUGS.surfaceDownlight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Surface Downlights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.tracklight)} className={getLinkClass('product-category', CATEGORY_SLUGS.tracklight)}>
                  {isActive('product-category', CATEGORY_SLUGS.tracklight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Tracklight Spotlights
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              OUTDOOR & PATHS
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.floodLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.floodLight)}>
                  {isActive('product-category', CATEGORY_SLUGS.floodLight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Asymmetrical Flood Lights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.gardenLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.gardenLight)}>
                  {isActive('product-category', CATEGORY_SLUGS.gardenLight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Garden Light & Spikes
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.wallLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.wallLight)}>
                  {isActive('product-category', CATEGORY_SLUGS.wallLight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Up-Down Wall Washers
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.gateLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.gateLight)}>
                  {isActive('product-category', CATEGORY_SLUGS.gateLight) && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Monolithic Gate Lights
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              STUDIO PORTFOLIO
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  {isActive('smart-lights') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Kelvin Slider Core
                </Link>
              </li>
              <li>
                <Link href={ROUTES.projects} className={getLinkClass('projects')}>
                  {isActive('projects') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Completed Projects
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className={getLinkClass('contact')}>
                  {isActive('contact') && <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />}
                  Find a Stockist
                </Link>
              </li>
              <li className="pt-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-mono text-[10px] uppercase tracking-widest px-4 py-3 rounded-[1px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md font-semibold cursor-pointer w-full"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Brochure
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-t border-border/60 pt-12 pb-10 gap-8">
          <Link href={ROUTES.home} className="cursor-pointer">
            <Logo size="lg" />
          </Link>

          <div className="font-sans text-xs text-text-ghost text-left max-w-sm leading-relaxed">
            Focused Brilliance for Every Corner. Engineering premium Indian-made optical LED lighting fixtures to match global luxury benchmarks.
          </div>
        </div>

        <div className="border-t border-border/80 pt-6 text-[12px] text-text-dim font-medium tracking-wide">
          <div className="text-text-ghost" suppressHydrationWarning>
            © {new Date().getFullYear()} Systems Creator / SYSlight. All rights reserved. Made in India.
          </div>
        </div>
      </div>
    </footer>
  );
}
