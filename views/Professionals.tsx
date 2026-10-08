'use client';

import Link from 'next/link';
import {
  ArrowRight,
  DraftingCompass,
  Cable,
  HardHat,
  Store,
  FileText,
  SlidersHorizontal,
  Bluetooth,
  Headset,
  Quote,
  Download,
} from 'lucide-react';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { Button } from '../components/ui/Button';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { CategoryCard } from '../components/ui/CategoryCard';
import { ProductFAQ, FAQItem } from '../components/ui/ProductFAQ';
import { CATEGORIES, TESTIMONIALS } from '../data';
import { ROUTES } from '@/lib/routes';
import { brochureHref, quoteHref } from '@/lib/site';

const AUDIENCES = [
  {
    icon: DraftingCompass,
    title: 'Architects and interior designers',
    body: 'Fixtures chosen for beam, glare control and finish — with the data you need to specify with intent.',
  },
  {
    icon: Cable,
    title: 'Lighting and electrical consultants',
    body: 'Photometric files, driver options and control compatibility confirmed before the drawings are frozen.',
  },
  {
    icon: HardHat,
    title: 'Contractors and builders',
    body: 'Clear fixture schedules, project pricing and a single team accountable from order to installation.',
  },
  {
    icon: Store,
    title: 'Dealers and distributors',
    body: 'Partner with an Indian manufacturer with a focused, design-led architectural range.',
  },
] as const;

const SERVICES = [
  {
    icon: FileText,
    title: 'Technical data',
    body: 'Spec sheets, IES photometric files, drawings and Dialux calculations on request.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Customisation',
    body: 'Beam angles, colour temperatures, body finishes and drivers tailored to the project.',
  },
  {
    icon: Bluetooth,
    title: 'Controls',
    body: 'Phase-cut, 0/1–10V, DALI and Casambi Bluetooth configurations, programmed in-house.',
  },
  {
    icon: Headset,
    title: 'Project support',
    body: 'One design desk from first layout to handover — and after-sales support once you are live.',
  },
] as const;

const STEPS = [
  { title: 'Share your project', body: 'Send drawings, a room list or fixture codes you are considering.' },
  { title: 'Get a fixture schedule', body: 'We recommend fixtures, optics and drivers, with photometrics where needed.' },
  { title: 'Receive your quote', body: 'Project pricing with quantities, options and lead times.' },
  { title: 'Install and support', body: 'Delivery coordination and after-sales support from the same team.' },
] as const;

const PRO_FAQ: FAQItem[] = [
  {
    question: 'How do I get IES files or spec sheets?',
    answer:
      'Use the “Request spec sheet and IES file” link on any product page, or list the product codes in the quote form. Our design desk will send the files for your project.',
  },
  {
    question: 'Can fixtures be customised for a project?',
    answer:
      'Yes. Beam angles, colour temperatures, finishes and drivers can be tailored depending on the series and quantity. Share your requirement and we will confirm what is possible.',
  },
  {
    question: 'Which control systems are supported?',
    answer:
      'Depending on the driver, fixtures can be supplied for phase-cut, 0/1–10V, DALI and Casambi Bluetooth control. Confirm your control system early so the right drivers are specified.',
  },
  {
    question: 'How do I become a SYSlight dealer?',
    answer:
      'Send a dealer enquiry with your company name and city. Our team will get in touch to discuss the range and partnership terms.',
  },
];

export function Professionals() {
  const architectQuote = TESTIMONIALS[0];

  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      {/* Hero */}
      <section className="container-page grid items-end gap-10 pb-16 pt-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span className="eyebrow">For professionals</span>
          <h1 className="display-1 mt-4">Built to be specified.</h1>
          <p className="lead mt-6 max-w-xl">
            Technical data, custom options and a design desk that works with your drawings — for
            architects, consultants, contractors and dealers.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="primary" size="lg" href={quoteHref()}>
              Request project pricing <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg" href={`${ROUTES.contact}?topic=dealer`}>
              Become a dealer
            </Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border">
            {[
              { v: '30+', l: 'Years of engineering' },
              { v: 'CRI 92+', l: 'Colour rendering' },
              { v: 'In-house', l: 'Drivers and fixtures' },
              { v: 'Mumbai', l: 'Design desk and factory' },
            ].map((s) => (
              <div key={s.l} className="bg-surface p-5">
                <p className="font-display text-2xl font-semibold tracking-tight text-cream">{s.v}</p>
                <p className="mt-1 text-sm text-text-dim">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section border-t border-border bg-void-dark">
        <div className="container-page">
          <SectionHeader eyebrow="Who we work with" title="One range, four kinds of partner" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 0.06}>
                <div className="card h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="heading-3 mt-5 text-lg">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">What you get</span>
            <h2 className="heading-2 mt-3">Everything you need to specify</h2>
            <p className="lead mt-4">
              Because we make our drivers and fixtures under one roof, we can answer technical questions
              quickly and adapt products to the project.
            </p>
            <Link href={brochureHref()} className="link-arrow mt-6">
              <Download className="h-4 w-4" /> Get the brochure
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:col-span-8">
            {SERVICES.map(({ icon: Icon, title, body }) => (
              <div key={title} className="bg-surface p-7">
                <Icon className="h-5 w-5 text-gold" />
                <h3 className="heading-3 mt-4 text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-border">
        <div className="container-page">
          <SectionHeader eyebrow="How it works" title="From drawings to handover" />
          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative border-t-2 border-border pt-6">
                <span className="absolute -top-0.5 left-0 h-0.5 w-12 bg-gold" aria-hidden />
                <span className="font-mono text-sm text-gold">0{i + 1}</span>
                <h3 className="heading-3 mt-2 text-lg">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-dim">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Testimonial */}
      {architectQuote && (
        <section className="container-page">
          <div className="rounded-xl bg-[#111114] p-8 text-white md:p-14">
            <Quote className="h-8 w-8 text-[#A7A4F2]" />
            <blockquote className="mt-6 max-w-3xl font-display text-2xl font-medium leading-snug tracking-tight md:text-3xl">
              “{architectQuote.quote}”
            </blockquote>
            <p className="mt-6 text-sm text-white/60">
              <span className="font-semibold text-white">{architectQuote.author}</span> · {architectQuote.firm}
            </p>
          </div>
        </section>
      )}

      {/* Range */}
      <section className="section">
        <div className="container-page">
          <SectionHeader
            eyebrow="The range"
            title="Start with a category"
            action={
              <Link href={ROUTES.products} className="link-arrow">
                Full catalogue <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.slice(0, 3).map((category) => (
              <CategoryCard key={category.slug} category={category} />
            ))}
          </div>
        </div>
      </section>

      <ProductFAQ items={PRO_FAQ} eyebrow="Trade questions" />
    </div>
  );
}
