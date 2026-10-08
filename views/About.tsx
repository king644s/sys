'use client';

import Link from 'next/link';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import { ROUTES } from '@/lib/routes';
import { quoteHref } from '@/lib/site';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TimelineCardStack } from '../components/ui/TimelineCardStack';
import { ExperienceCenterPhoto } from '../components/ui/ExperienceCenterPhoto';
import { ResponsiveLightOrb } from '../components/ui/ResponsiveLightOrb';
import { TESTIMONIALS } from '../data';
import {
  ArrowRight,
  Factory,
  Compass,
  Sparkles,
  Award,
  Route,
  DraftingCompass,
  SunMoon,
  MapPin,
} from 'lucide-react';

const SYSTEMS_CREATOR_ABOUT = 'https://systemscreator.com/about-us/';

const BELIEFS = [
  {
    icon: Factory,
    title: 'Made In-House',
    body: 'Our drivers and fixtures are developed under one roof by Systems Creator. This control over engineering lets us maintain consistency across a project and support you long after installation.',
    label: 'Pillar 01 / Engineering Control',
  },
  {
    icon: Compass,
    title: 'Designed for Specifiers',
    body: 'We speak the language of architects and interior designers. From beam direction to colour temperature to dimming, our range is built to be specified with intent, not picked off a shelf.',
    label: 'Pillar 02 / Specifier-First',
  },
  {
    icon: Sparkles,
    title: 'Built to Adapt',
    body: 'Warm to cool, bright to intimate, manual to app-controlled. SYSlight fixtures are made to shift with the mood of a room and the needs of the people in it.',
    label: 'Pillar 03 / Adaptive Light',
  },
] as const;

const WHY_CHOOSE = [
  {
    icon: Award,
    index: '01',
    title: 'Quality You Can Trust',
    body: 'Built on 30+ years of manufacturing discipline, every fixture is made to perform and last.',
  },
  {
    icon: Route,
    index: '02',
    title: 'Guidance, Not Just Products',
    body: 'From first consultation to final layout, our team supports you at every step.',
  },
  {
    icon: DraftingCompass,
    index: '03',
    title: 'Tailored to Your Project',
    body: 'Custom lighting options shaped around your specific requirements, not a fixed menu.',
  },
  {
    icon: SunMoon,
    index: '04',
    title: 'Smart by Design',
    body: 'App and voice-ready fixtures that let you personalise light effortlessly.',
  },
] as const;

export function About() {
  return (
    <>
      <div className="transition-page-enter">
        <Breadcrumbs />

        {/* Block 1 — Hero */}
        <section className="container-page pb-12 pt-4">
          <ScrollReveal direction="up">
            <div className="max-w-3xl">
              <span className="eyebrow">About SYSlight</span>
              <h1 className="display-1 mt-4">
                Designed to disappear, <span className="text-gold">engineered to perform.</span>
              </h1>
              <p className="lead mt-6 max-w-2xl">
                SYSlight is a premium LED lighting brand built on three decades of manufacturing
                heritage. We work alongside homeowners, architects and interior designers to make
                considered lighting the quiet backbone of beautiful spaces.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* Block 2 — The Heritage */}
        <section className="container-page pb-16">
          <ScrollReveal direction="up" delay={0.15}>
            <div className="card overflow-hidden grid grid-cols-1 md:grid-cols-12">
              <div className="relative md:col-span-5 h-[240px] md:h-auto min-h-[280px]">
                <img
                  src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Systems Creator manufacturing heritage"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="eyebrow text-white/80">
                    Mumbai, India
                  </span>
                  <h3 className="heading-3 text-white mt-1">
                    Systems Creator HQ
                  </h3>
                </div>
              </div>

              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center gap-5">
                <span className="eyebrow">
                  Our Foundation
                </span>
                <h2 className="heading-2">
                  Backed by{' '}
                  <span className="text-gold">Systems Creator</span>
                </h2>
                <p className="body max-w-xl">
                  SYSlight is the lighting brand of Systems Creator, a Mumbai-based manufacturer
                  with over 30 years of experience in power electronics and LED technology. That
                  heritage means our fixtures are engineered in-house, not simply assembled, giving
                  us control over quality, consistency, and the ability to build lighting around
                  your project rather than the other way around.
                </p>
                <a
                  href={SYSTEMS_CREATOR_ABOUT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow flex items-center gap-2 hover:underline cursor-pointer group self-start mt-2"
                >
                  Explore the Systems Creator story
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Block 3 — Three Pillars */}
        <section className="container-page pb-16 grid grid-cols-1 md:grid-cols-3 gap-5">
          {BELIEFS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} direction="up" delay={0.1 * (idx + 1)}>
                <div className="card p-8 h-full flex flex-col justify-between">
                  <div>
                    <Icon className="w-8 h-8 text-gold mb-5" />
                    <h3 className="font-serif text-xl font-semibold text-cream mb-2">
                      {pillar.title}
                    </h3>
                    <p className="body">{pillar.body}</p>
                  </div>
                  <span className="font-sans text-xs text-text-dim mt-8 block tracking-[0.08em] uppercase font-semibold">
                    {pillar.label}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </section>
      </div>

      {/* Block 4 — Timeline (outside transition wrapper so sticky stack works) */}
      <TimelineCardStack />

      <div className="transition-page-enter">

        {/* Block 5 — Experience Center */}
        <section className="container-page section">
          <div className="rounded-xl bg-surface-alt p-8 md:p-14 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
            
            <div className="md:col-span-6 flex flex-col gap-6 z-10">
              <ScrollReveal direction="up">
                <span className="eyebrow">
                  See It In Person
                </span>
                <h2 className="heading-2 mt-2">
                  The SYSlight{' '}
                  <span className="text-gold">Experience Center</span>
                </h2>
                <p className="body max-w-xl mt-4">
                  Lighting is difficult to judge on a spec sheet. At our Experience Center in
                  Goregaon West, Mumbai, you can see it work. Walk through curated ceiling setups
                  covering every fixture type, watch a room shift from warm to cool at a touch, and
                  understand how the right light changes a space, before a single fixture is
                  specified.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-sans text-sm text-text-dim">Open for appointments</span>
                  <span className="font-sans text-sm text-cream">Architects · Designers · Clients</span>
                </div>
                <Button variant="primary" className="self-start mt-6" href={`${ROUTES.contact}?topic=visit`}>
                  Book a visit
                </Button>
              </ScrollReveal>
            </div>

            <div className="md:col-span-6 flex justify-center relative z-10">
              <ScrollReveal direction="up" delay={0.2} className="w-full h-full">
                <div className="card relative p-5 md:p-6 w-full h-full flex flex-col">
                  <ExperienceCenterPhoto />
                  <div className="flex items-center gap-2.5 mb-2">
                    <MapPin className="w-4 h-4 text-gold shrink-0" />
                    <span className="font-sans text-sm uppercase tracking-[0.08em] text-gold font-semibold">
                      Location
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream font-semibold tracking-tight">
                    Goregaon West, Mumbai
                  </h3>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Block 6 — Smart Lights */}
        <section className="container-page section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 flex flex-col gap-5">
              <ScrollReveal direction="left">
                <span className="eyebrow">
                  Beyond Lighting
                </span>
                <h2 className="heading-2 mt-2">
                  Light That{' '}
                  <span className="text-gold">Responds to You</span>
                </h2>
                <p className="body max-w-xl mt-4">
                  SYSlight goes beyond fixtures. Through app control, voice, and smart switches, we
                  help you build spaces that adjust to the moment — movie night, morning routine,
                  or an empty home that looks lived-in. Simple to control, easy to live with.
                </p>
                <Link
                  href={ROUTES.smartLights}
                  className="eyebrow flex items-center gap-2 hover:underline cursor-pointer group self-start mt-4"
                >
                  Explore smart lights
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5">
              <ScrollReveal direction="right">
                <ResponsiveLightOrb />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Block 7 — Why Choose */}
        <section className="container-page section grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_CHOOSE.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} direction="up" delay={0.1 * (idx + 1)}>
                <div className="group card relative overflow-hidden p-7 h-full flex flex-col min-h-[248px] transition-colors duration-700 ease-luxury hover:border-gold/40">
                  <div className="absolute -right-6 -bottom-8 w-36 h-36 rounded-full bg-gold/5 blur-2xl opacity-0 pointer-events-none transition-opacity duration-700 ease-luxury group-hover:opacity-100" />
                  <Icon
                    aria-hidden
                    strokeWidth={0.85}
                    className="absolute -bottom-4 -right-3 w-32 h-32 text-gold/[0.11] pointer-events-none select-none transition-[color,transform] duration-700 ease-luxury group-hover:text-gold/[0.18] group-hover:scale-[1.04]"
                  />

                  <div className="relative z-10 flex items-center justify-between mb-8">
                    <span className="eyebrow">
                      {card.index}
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-gold transition-colors duration-500 ease-luxury group-hover:bg-gold group-hover:text-on-accent">
                      <Icon className="w-4 h-4" strokeWidth={1.5} />
                    </span>
                  </div>

                  <h3 className="relative z-10 font-serif text-xl font-semibold text-cream tracking-tight leading-snug mb-3">
                    {card.title}
                  </h3>
                  <p className="body relative z-10">
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </section>

        {/* Block 8 — Testimonials */}
        <section className="section bg-void-dark border-y border-border">
          <div className="container-page">
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>

        {/* Block 9 — Closing CTA */}
        <section className="section text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <ScrollReveal direction="up">
              <span className="eyebrow mb-3">
                Next Step
              </span>
              <h2 className="heading-2">
                Let&apos;s Light Your{' '}
                <span className="text-gold">Next Project</span>
              </h2>
              <p className="body max-w-lg mx-auto mt-6">
                Share your layout, your vision, or just a question. Whether you&apos;re specifying
                for a home, an office, or a showroom, our team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <Button variant="primary" size="lg" href={`${ROUTES.contact}?topic=visit`}>
                  Book an experience centre visit
                </Button>
                <Button variant="secondary" size="lg" href={quoteHref()}>
                  Send us your project
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
