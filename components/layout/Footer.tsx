'use client';

import Link from 'next/link';
import { ROUTES } from '@/lib/routes';
import { CONTACT, PRODUCT_NAV, PROJECT_NAV, brochureHref, quoteHref } from '@/lib/site';
import { ArrowRight, Download, Mail, MapPin, Phone } from 'lucide-react';
import Logo from '../common/Logo';
import { buttonClasses } from '../ui/Button';

const COMPANY_NAV = [
  { label: 'About us', href: ROUTES.about },
  { label: 'For professionals', href: ROUTES.professionals },
  { label: 'Smart Lights', href: ROUTES.smartLights },
  { label: 'Home Automation', href: ROUTES.homeAutomation },
  { label: 'Contact', href: ROUTES.contact },
] as const;

function FooterColumn({ title, links }: { title: string; links: ReadonlyArray<{ label: string; href: string }> }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[13px] font-semibold text-cream tracking-normal">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link href={link.href} className="text-sm text-text-dim hover:text-cream transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-void-dark" id="site-footer">
      {/* CTA band */}
      <div className="container-page">
        <div className="flex flex-col gap-6 border-b border-border py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h3 className="heading-2">Planning a project?</h3>
            <p className="lead mt-2">
              Send us your drawings or a room list — we&apos;ll come back with a fixture schedule and quote.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={quoteHref()} className={buttonClasses('primary', 'lg')}>
              Get a quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={brochureHref()} className={buttonClasses('secondary', 'lg')}>
              <Download className="h-4 w-4" /> Brochure
            </Link>
          </div>
        </div>
      </div>

      <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-4 lg:grid-cols-12">
        <div className="col-span-2 flex flex-col gap-5 md:col-span-4 lg:col-span-4">
          <Link href={ROUTES.home} aria-label="SYSlight home">
            <Logo size="lg" className="!h-14" />
          </Link>
          <p className="text-sm leading-relaxed text-text-dim max-w-xs">
            Architectural LED lighting designed and manufactured in India by Systems Creator.
          </p>
          <ul className="flex flex-col gap-2.5 text-sm text-text-dim">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-text-ghost" />
              {CONTACT.address}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-text-ghost" />
              <a href={CONTACT.phoneHref} className="hover:text-cream">{CONTACT.phoneDisplay}</a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-text-ghost" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-cream">{CONTACT.email}</a>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <FooterColumn
            title="Products"
            links={[{ label: 'All products', href: ROUTES.products }, ...PRODUCT_NAV]}
          />
        </div>
        <div className="lg:col-span-2">
          <FooterColumn title="Projects" links={PROJECT_NAV} />
        </div>
        <div className="lg:col-span-3">
          <FooterColumn title="Company" links={COMPANY_NAV} />
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col gap-2 border-t border-border py-6 text-[13px] text-text-ghost md:flex-row md:justify-between">
          <span suppressHydrationWarning>
            © {new Date().getFullYear()} Systems Creator / SYSlight. All rights reserved.
          </span>
          <span>Designed and made in India</span>
        </div>
      </div>
    </footer>
  );
}
