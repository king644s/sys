'use client';

import Link from 'next/link';
import { CategoryCard } from '../components/ui/CategoryCard';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ProductFAQ } from '../components/ui/ProductFAQ';
import { Button } from '../components/ui/Button';
import { CATEGORIES, PRODUCTS, PROJECTS, TESTIMONIALS } from '../data';
import { ROUTES } from '@/lib/routes';
import { quoteHref } from '@/lib/site';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  ArrowRight,
  ArrowUpRight,
  Sliders,
  Sparkles,
  Layers,
  MapPin,
  House,
  DraftingCompass,
  Check,
} from 'lucide-react';

const STATS = [
  { value: '30+', label: 'Years of engineering' },
  { value: 'CRI 92+', label: 'True colour rendering' },
  { value: '2700–6500K', label: 'Tunable white range' },
  { value: '100%', label: 'Made in India' },
];

const AUDIENCES = [
  {
    icon: House,
    eyebrow: 'For homeowners',
    title: 'Light your home beautifully',
    points: [
      'Help choosing fixtures, room by room',
      'Smart lights and home automation',
      'See it working at our Mumbai experience centre',
    ],
    primary: { label: 'Explore smart living', href: ROUTES.smartLights },
    secondary: {
      label: 'Chat on WhatsApp',
      href: buildWhatsAppUrl('Hello SYSlight, I would like help choosing lighting for my home.'),
      external: true,
    },
  },
  {
    icon: DraftingCompass,
    eyebrow: 'For architects and trade',
    title: 'Specify with confidence',
    points: [
      'Spec sheets, IES files and Dialux support',
      'Custom beam angles, finishes and drivers',
      'Project pricing for contractors and dealers',
    ],
    primary: { label: 'For professionals', href: ROUTES.professionals },
    secondary: { label: 'Request a quote', href: quoteHref(), external: false },
  },
] as const;

export function Home() {
  const bestsellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="transition-page-enter">
      {/* 1. Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-page grid items-center gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6 flex flex-col">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="chip chip-accent self-start">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Architectural LED lighting · Mumbai
              </span>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <h1 className="display-1 mt-6">
                Focused brilliance <span className="text-gold">for every corner.</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <p className="lead mt-6 max-w-lg">
                Premium Indian-made LED luminaires for homes, hotels, offices and retail — engineered for
                true colour, glare-free comfort and smart control.
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.4}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="primary" size="lg" href={ROUTES.products}>
                  Browse products <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="lg" href={quoteHref()}>
                  Get a quote
                </Button>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="up" delay={0.25}>
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt">
                  <img
                    src="/about-us/syslight-experience-center-highres.jpg"
                    alt="SYSlight experience centre in Mumbai"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="card absolute -bottom-6 left-4 right-4 grid grid-cols-3 gap-4 p-4 shadow-lifted sm:left-auto sm:right-6 sm:w-[340px]">
                  {[STATS[0], STATS[1], STATS[3]].map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-lg font-semibold tracking-tight text-cream">{s.value}</p>
                      <p className="text-xs text-text-dim leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Who it's for — B2C / B2B split */}
      <section className="section pb-0">
        <div className="container-page grid gap-5 md:grid-cols-2">
          {AUDIENCES.map((a, idx) => {
            const Icon = a.icon;
            return (
              <ScrollReveal key={a.eyebrow} direction="up" delay={idx * 0.1}>
                <div className={`card h-full p-card-xl md:p-10 ${idx === 1 ? 'bg-surface-alt border-transparent' : ''}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-soft text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="eyebrow mt-6">{a.eyebrow}</p>
                  <h2 className="heading-2 mt-2">{a.title}</h2>
                  <ul className="mt-6 flex flex-col gap-3">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-[15px] text-text-dim">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button variant="primary" href={a.primary.href}>
                      {a.primary.label} <ArrowRight className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" href={a.secondary.href} external={a.secondary.external}>
                      {a.secondary.label}
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 3. Categories */}
      <section className="section" id="home-collections-showcase">
        <div className="container-page">
          <SectionHeader
            eyebrow="Product range"
            title="Shop by category"
            description="Spotlights, tracks, downlights and linear profiles — each family engineered for a specific job in the room."
            action={
              <Link href={ROUTES.products} className="link-arrow">
                View all products <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.slice(0, 6).map((category, idx) => (
              <ScrollReveal key={category.slug} direction="up" delay={idx * 0.06}>
                <CategoryCard category={category} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Bestsellers */}
      <section className="section bg-void-dark border-y border-border">
        <div className="container-page">
          <SectionHeader
            eyebrow="Bestsellers"
            title="Most specified fixtures"
            description="Chosen again and again by designers for clean optics, precise cut-off and solid aluminium housings."
            action={
              <Link href={`${ROUTES.products}?bestsellers=1`} className="link-arrow">
                All bestsellers <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div
            className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
              bestsellers.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            }`}
          >
            {bestsellers.map((product, idx) => (
              <ScrollReveal key={product.id} direction="up" delay={idx * 0.05}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Smart CCT */}
      <section className="section">
        <div className="container-page">
          <div className="grid items-center gap-10 overflow-hidden rounded-xl bg-[#111114] p-8 text-white md:p-14 lg:grid-cols-12">
            <div className="flex flex-col gap-5 lg:col-span-6">
              <span className="eyebrow text-[#A7A4F2]">Smart lighting</span>
              <h2 className="heading-2 text-white">One fixture. Every mood from 2700K to 6500K.</h2>
              <p className="text-[15px] leading-relaxed text-white/65 max-w-lg">
                Shift from crisp daylight for focus to a warm evening glow — with flicker-free dimming,
                saved scenes and app or voice control.
              </p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { icon: Sliders, label: 'Smooth tuning' },
                  { icon: Sparkles, label: 'Flicker-free' },
                  { icon: Layers, label: 'Saved scenes' },
                ].map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2.5 text-sm text-white/85">
                    <Icon className="h-4 w-4 text-[#A7A4F2]" />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex flex-wrap gap-3">
                <Button variant="inverse" href={ROUTES.smartLights}>
                  Try the CCT demo <ArrowRight className="h-4 w-4" />
                </Button>
                <Link
                  href={ROUTES.homeAutomation}
                  className="inline-flex h-11 items-center gap-2 rounded-sm px-4 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  Home automation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="flex justify-between text-sm text-white/60">
                  <span>Warm</span>
                  <span>Neutral</span>
                  <span>Daylight</span>
                </div>
                <div
                  className="mt-3 h-3 rounded-full"
                  style={{ background: 'linear-gradient(90deg,#FFB46B 0%,#FFE4C2 45%,#F4F7FF 75%,#CFE0FF 100%)' }}
                />
                <div className="mt-3 flex justify-between font-mono text-xs text-white/50">
                  <span>2700K</span>
                  <span>4000K</span>
                  <span>6500K</span>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[
                    { k: '2700K', c: '#FFB46B', l: 'Evening' },
                    { k: '4000K', c: '#FFF1DE', l: 'Living' },
                    { k: '6500K', c: '#DCE8FF', l: 'Focus' },
                  ].map((s) => (
                    <div key={s.k} className="rounded-md border border-white/10 p-4">
                      <span
                        className="block h-8 w-8 rounded-full"
                        style={{ background: s.c, boxShadow: `0 0 24px 4px ${s.c}55` }}
                      />
                      <p className="mt-4 text-sm font-semibold">{s.l}</p>
                      <p className="font-mono text-xs text-white/50">{s.k}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Heritage statement */}
      <section className="section border-t border-border">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <span className="eyebrow">Our story</span>
            <blockquote className="heading-2 mt-4 font-medium leading-snug">
              “We built SYSlight to manufacture in Mumbai a calibre of LED lighting that outperforms any
              import — backed by 30 years of industrial engineering.”
            </blockquote>
            <p className="mt-5 text-sm text-text-dim">— Systems Creator, founders of SYSlight</p>
            <Link href={ROUTES.about} className="link-arrow mt-8">
              About SYSlight <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-lg border border-border bg-border lg:col-span-5">
            {STATS.map((s) => (
              <div key={s.label} className="bg-surface p-6">
                <p className="font-display text-3xl font-semibold tracking-tight text-cream">{s.value}</p>
                <p className="mt-1 text-sm text-text-dim">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Projects */}
      <section className="section bg-void-dark border-y border-border" id="home-spaces-showcase">
        <div className="container-page">
          <SectionHeader
            eyebrow="Projects"
            title="Where our light lives"
            description="Cliff-side villas, hotel lobbies and corporate offices across India."
            action={
              <Link href={ROUTES.projects} className="link-arrow">
                All projects <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredProjects.map((project, idx) => (
              <ScrollReveal key={project.slug} direction="up" delay={idx * 0.08}>
                <Link
                  href={`${ROUTES.projects}?category=${project.category}`}
                  className="group block overflow-hidden rounded-lg"
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-lg bg-surface-alt">
                    <img
                      src={project.image}
                      alt={project.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4 pt-4">
                    <div>
                      <p className="eyebrow text-text-ghost">{project.category.toLowerCase()}</p>
                      <h3 className="heading-3 mt-1 group-hover:text-gold transition-colors">{project.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm text-text-dim">
                        <MapPin className="h-3.5 w-3.5" /> {project.location}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-text-ghost group-hover:text-gold transition-colors" />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="section">
        <div className="container-page">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

      {/* 9. FAQ */}
      <ProductFAQ />

    </div>
  );
}
