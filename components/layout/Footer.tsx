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
    return `inline-flex items-center transition-colors duration-200 cursor-pointer text-left py-0.5 text-[13px] ${
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
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTES.products} className={getLinkClass('products')}>
                  Products
                </Link>
              </li>
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  Smart Lights
                </Link>
              </li>
              <li>
                <Link href={ROUTES.homeAutomation} className={getLinkClass('home-automation')}>
                  Home Automation
                </Link>
              </li>
              <li>
                <Link href={ROUTES.projects} className={getLinkClass('projects')}>
                  Inspire Gallery
                </Link>
              </li>
              <li>
                <Link href={ROUTES.about} className={getLinkClass('about')}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className={getLinkClass('contact')}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              INDOOR LIGHTS
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.cobSpotlight)} className={getLinkClass('product-category', CATEGORY_SLUGS.cobSpotlight)}>
                  COB Spotlights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.magneticTrack)} className={getLinkClass('product-category', CATEGORY_SLUGS.magneticTrack)}>
                  Magnetic Track Light
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.downlightPanel)} className={getLinkClass('product-category', CATEGORY_SLUGS.downlightPanel)}>
                  Downlight &amp; Panel Light
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.profileLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.profileLight)}>
                  Profile Light
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.hangingProfileLight)} className={getLinkClass('product-category', CATEGORY_SLUGS.hangingProfileLight)}>
                  Hanging Profile Light
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.surface)} className={getLinkClass('product-category', CATEGORY_SLUGS.surface)}>
                  Surface Downlights
                </Link>
              </li>
              <li>
                <Link href={categoryPath(CATEGORY_SLUGS.tracklight)} className={getLinkClass('product-category', CATEGORY_SLUGS.tracklight)}>
                  Track Light
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              INSPIRE GALLERY
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={ROUTES.projects} className={getLinkClass('projects')}>
                  View All Projects
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.projects}?category=RESIDENTIAL`} className={getLinkClass('projects')}>
                  Residential
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.projects}?category=HOSPITALITY`} className={getLinkClass('projects')}>
                  Hospitality
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.projects}?category=OFFICES`} className={getLinkClass('projects')}>
                  Offices
                </Link>
              </li>
              <li>
                <Link href={`${ROUTES.projects}?category=RETAIL`} className={getLinkClass('projects')}>
                  Retail
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h4 className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream">
              SMART LIGHTS
            </h4>
            <ul className="flex flex-col gap-3 font-sans">
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  Kelvin Slider Core
                </Link>
              </li>
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  Dim-to-Warm Emitter
                </Link>
              </li>
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  Casambi Bluetooth Setup
                </Link>
              </li>
              <li>
                <Link href={ROUTES.smartLights} className={getLinkClass('smart-lights')}>
                  DALI Integration
                </Link>
              </li>
              <li>
                <Link href={ROUTES.contact} className={getLinkClass('contact')}>
                  Bespoke Sand-Gold Cores
                </Link>
              </li>
              <li className="pt-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-white font-mono text-[11px] uppercase tracking-[0.15em] px-4 py-3 rounded-[1px] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-md font-bold cursor-pointer w-full focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
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
