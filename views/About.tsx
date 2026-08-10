'use client';

import Link from 'next/link';
import { SectionDivider } from '../components/ui/SectionDivider';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import { ROUTES } from '@/lib/routes';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { TimelineCardStack } from '../components/ui/TimelineCardStack';
import { TESTIMONIALS } from '../data';
import {
  ArrowRight,
  Factory,
  Compass,
  Sparkles,
  ShieldCheck,
  Handshake,
  PencilRuler,
  Smartphone,
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
    icon: ShieldCheck,
    title: 'Quality You Can Trust',
    body: 'Built on 30+ years of manufacturing discipline, every fixture is made to perform and last.',
  },
  {
    icon: Handshake,
    title: 'Guidance, Not Just Products',
    body: 'From first consultation to final layout, our team supports you at every step.',
  },
  {
    icon: PencilRuler,
    title: 'Tailored to Your Project',
    body: 'Custom lighting options shaped around your specific requirements, not a fixed menu.',
  },
  {
    icon: Smartphone,
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
        <section className="max-w-4xl mx-auto px-6 text-center py-12 md:py-20">
          <ScrollReveal direction="up">
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-3 block">
              Who We Are
            </span>
            <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight leading-tight">
              Designed to disappear,<br />
              <span className="italic font-serif text-gold font-normal">engineered to perform</span>
            </h1>
            <p className="font-sans text-sm text-text-dim max-w-xl mx-auto mt-6 leading-relaxed">
              SYSlight is a premium LED lighting brand built on three decades of manufacturing
              heritage. We work alongside architects and interior designers to turn considered
              lighting into the quiet backbone of beautiful spaces.
            </p>
          </ScrollReveal>
        </section>

        {/* Block 2 — The Heritage */}
        <section className="max-w-7xl mx-auto px-6 mb-8 md:mb-12">
          <ScrollReveal direction="up" delay={0.15}>
            <div className="bg-surface border border-border rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-12">
              <div className="relative md:col-span-5 h-[240px] md:h-auto min-h-[280px]">
                <img
                  src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop"
                  alt="Systems Creator manufacturing heritage"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-void/80 via-transparent to-void/40 md:bg-gradient-to-t md:from-void via-transparent to-void/30" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                    Mumbai, India
                  </span>
                  <h3 className="font-serif text-xl text-cream font-semibold mt-1">
                    Systems Creator HQ
                  </h3>
                </div>
              </div>

              <div className="md:col-span-7 p-8 md:p-12 flex flex-col justify-center gap-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Our Foundation
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-light text-cream tracking-tight leading-tight">
                  Backed by{' '}
                  <span className="italic font-serif text-gold font-normal">Systems Creator</span>
                </h2>
                <p className="font-sans text-sm text-text-dim leading-relaxed max-w-xl">
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
                  className="font-mono text-xs text-gold flex items-center gap-2 tracking-[0.2em] uppercase hover:underline cursor-pointer group self-start mt-2"
                >
                  <span>Explore the full Systems Creator story</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 duration-300" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </section>

        <SectionDivider label="What We Believe" />

        {/* Block 3 — Three Pillars */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {BELIEFS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} direction="up" delay={0.1 * (idx + 1)}>
                <div className="bg-surface border border-border p-8 h-full flex flex-col justify-between">
                  <div>
                    <Icon className="w-8 h-8 text-gold mb-5" />
                    <h3 className="font-serif text-xl font-semibold text-cream mb-2">
                      {pillar.title}
                    </h3>
                    <p className="font-sans text-sm text-text-dim leading-relaxed">{pillar.body}</p>
                  </div>
                  <span className="font-mono text-[11px] text-text-dim mt-8 block tracking-[0.15em] uppercase">
                    {pillar.label}
                  </span>
                </div>
              </ScrollReveal>
            );
          })}
        </section>

        <SectionDivider label="Our Journey" />
      </div>

      {/* Block 4 — Timeline (outside transition wrapper so sticky stack works) */}
      <TimelineCardStack />

      <div className="transition-page-enter">
        <SectionDivider label="Experience Center" />

        {/* Block 5 — Experience Center */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-surface-alt border border-border rounded-md p-8 md:p-14 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-[100px] bg-gold/5 opacity-25 pointer-events-none" />

            <div className="md:col-span-7 flex flex-col gap-6 z-10">
              <ScrollReveal direction="up">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  See It In Person
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-cream leading-tight mt-2">
                  The SYSlight{' '}
                  <span className="italic font-serif text-gold">Experience Center</span>
                </h2>
                <p className="font-sans text-sm text-text-dim leading-relaxed max-w-xl mt-4">
                  Lighting is difficult to judge on a spec sheet. At our Experience Center in
                  Goregaon West, Mumbai, you can see it work. Walk through curated ceiling setups
                  covering every fixture type, watch a room shift from warm to cool at a touch, and
                  understand how the right light changes a space, before a single fixture is
                  specified.
                </p>
                <p className="font-sans text-sm text-text-dim leading-relaxed max-w-xl mt-2">
                  We host structured, personal walkthroughs for architects, designers, and their
                  clients.
                </p>
                <Button variant="primary" className="self-start mt-4" href={ROUTES.contact}>
                  Book a Visit
                </Button>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5 flex justify-center relative z-10">
              <ScrollReveal direction="up" delay={0.2}>
                <div className="relative border border-border bg-void p-8 md:p-10 w-full max-w-sm">
                  <MapPin className="w-8 h-8 text-gold mb-5" />
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block mb-2">
                    Location
                  </span>
                  <h3 className="font-serif text-2xl text-cream font-light tracking-tight mb-3">
                    Goregaon West, Mumbai
                  </h3>
                  <p className="font-sans text-sm text-text-dim leading-relaxed">
                    Curated ceiling setups. Live warm-to-cool demos. Personal walkthroughs for
                    specifier teams and their clients.
                  </p>
                  <div className="mt-6 pt-5 border-t border-border/50 flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">
                      Open for appointments
                    </span>
                    <span className="font-sans text-sm text-cream">Architects · Designers · Clients</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <SectionDivider label="Beyond Lighting" />

        {/* Block 6 — Smart Lights */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-7 flex flex-col gap-5">
              <ScrollReveal direction="left">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                  Beyond Lighting
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight leading-tight mt-2">
                  Light That{' '}
                  <span className="italic font-serif text-gold font-normal">Responds to You</span>
                </h2>
                <p className="font-sans text-sm text-text-dim leading-relaxed max-w-xl mt-4">
                  SYSlight goes beyond fixtures. Through app control, voice, and smart switches, we
                  help you build spaces that adjust to the moment — movie night, morning routine,
                  or an empty home that looks lived-in. Simple to control, easy to live with.
                </p>
                <Link
                  href={ROUTES.smartLights}
                  className="font-mono text-xs text-gold flex items-center gap-2 tracking-[0.2em] uppercase hover:underline cursor-pointer group self-start mt-4"
                >
                  <span>Explore Smart Lights</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 duration-300" />
                </Link>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5">
              <ScrollReveal direction="right">
                <div className="relative border-2 border-border p-6 rounded-full aspect-square w-64 md:w-72 mx-auto flex items-center justify-center bg-void shadow-inner">
                  <div
                    className="absolute inset-2 rounded-full border border-border-mid/30 animate-pulse-glow"
                    style={{ boxShadow: '0 0 30px rgba(201,169,110,0.1)' }}
                  />
                  <div className="flex flex-col items-center text-center px-4">
                    <Smartphone className="w-7 h-7 text-gold mb-3" />
                    <span className="font-serif text-2xl text-cream font-light">App · Voice</span>
                    <span className="font-mono text-[11px] text-gold uppercase tracking-widest mt-2">
                      Smart Switches
                    </span>
                    <span className="font-mono text-text-dim text-[11px] uppercase tracking-[0.2em] mt-3">
                      Control the moment
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full scale-75 -z-10" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <SectionDivider label="Why Choose SYSlight" />

        {/* Block 7 — Why Choose */}
        <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={card.title} direction="up" delay={0.1 * (idx + 1)}>
                <div className="bg-surface border border-border p-7 h-full flex flex-col">
                  <Icon className="w-7 h-7 text-gold mb-4" />
                  <h3 className="font-serif text-lg font-semibold text-cream mb-2">{card.title}</h3>
                  <p className="font-sans text-sm text-text-dim leading-relaxed">{card.body}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </section>

        <SectionDivider label="Collaborator feedback" />

        {/* Block 8 — Testimonials */}
        <section className="bg-surface-alt border-y border-border/40 py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <TestimonialsCarousel testimonials={TESTIMONIALS} />
          </div>
        </section>

        {/* Block 9 — Closing CTA */}
        <section className="bg-surface py-20 px-6 border-t border-border text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <ScrollReveal direction="up">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-3">
                Next Step
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
                Let&apos;s Light Your{' '}
                <span className="italic font-serif text-gold font-normal">Next Project</span>
              </h2>
              <p className="font-sans text-sm text-text-dim max-w-lg mx-auto mt-6 leading-relaxed">
                Share your layout, your vision, or just a question. Whether you&apos;re specifying
                for a home, an office, or a showroom, our team is ready to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
                <Button variant="primary" href={ROUTES.contact}>
                  Book an Experience Center Visit
                </Button>
                <Button variant="secondary" href={ROUTES.contact}>
                  Send Us Your Project
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
