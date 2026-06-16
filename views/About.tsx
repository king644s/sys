'use client';

import { SectionDivider } from '../components/ui/SectionDivider';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Button } from '../components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { ShieldAlert, Award, Landmark, Eye, Heart, Compass } from 'lucide-react';

export function About() {
  return (
    <div className="transition-page-enter">
      <Breadcrumbs />
      {/* Hero Header */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12 md:py-20">
        <ScrollReveal direction="up">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3 block">
            01 / Legacy & Vision
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight leading-tight">
            The Mastery of <br />
            <span className="italic font-serif text-gold font-normal">Systems Creator.</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-dim max-w-xl mx-auto mt-6 leading-relaxed">
            Founded 30+ years ago as a precision toolmaker and industrial engineering specialist, Systems Creator has established SYSLight to craft world-class luxury LED fixtures directly in Mumbai, India.
          </p>
        </ScrollReveal>
      </section>

      {/* Decorative Image Banner */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ScrollReveal direction="up" delay={0.2}>
          <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden border border-border">
            <img
              src="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?q=80&w=1200&auto=format&fit=crop"
              alt="Systems Creator Factory Floor"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-35"
            />
            {/* Visual bottom fading layer */}
            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />

            <div className="absolute bottom-8 left-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-gold">
                Headquarters — Mumbai, India
              </span>
              <h3 className="font-serif text-2xl text-cream font-semibold">The Production Facility</h3>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider label="Our Philosophy" />

      {/* Three Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="bg-surface border border-border p-8 h-full flex flex-col justify-between">
            <div>
              <Award className="w-8 h-8 text-gold mb-5" />
              <h3 className="font-serif text-xl font-bold text-cream mb-2">Absolute Optical Precision</h3>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                By utilizing advanced COB light emitters partnered with professional reflector lenses, we preserve clear structural lighting cones. CRI values consistently exceed 92 Ra.
              </p>
            </div>
            <span className="font-mono text-[8px] text-text-ghost mt-8 block tracking-widest uppercase">
              Pillar 01 / Optical Control
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-surface border border-border p-8 h-full flex flex-col justify-between">
            <div>
              <ShieldAlert className="w-8 h-8 text-gold mb-5" />
              <h3 className="font-serif text-xl font-bold text-cream mb-2">Monsoonal Weatherproofing</h3>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                Mumbai monsoons demand radical outer enclosure engineering. Every pathway, spike and wall washer fixture undergoes rigorous IP65/IP66 liquid pressure seal testing.
              </p>
            </div>
            <span className="font-mono text-[8px] text-text-ghost mt-8 block tracking-widest uppercase">
              Pillar 02 / Durability Standard
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="bg-surface border border-border p-8 h-full flex flex-col justify-between">
            <div>
              <Landmark className="w-8 h-8 text-gold mb-5" />
              <h3 className="font-serif text-xl font-bold text-cream mb-2">30+ Years of Manufacturing</h3>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                We are not simple design assemblers. Our parent brand has cast, milled, and machined architectural components for three decades, ensuring flawless finish consistency.
              </p>
            </div>
            <span className="font-mono text-[8px] text-text-ghost mt-8 block tracking-widest uppercase">
              Pillar 03 / Engineering Heritage
            </span>
          </div>
        </ScrollReveal>
      </section>

      <SectionDivider label="Our Quality Control Laboratories" />

      {/* Industrial Testing Laboratories segment */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                how we validate
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
                Extreme <br />
                <span className="italic font-serif text-gold">Calibration Standards</span>
              </h2>
              <p className="font-sans text-xs md:text-sm text-text-dim leading-relaxed">
                Before any product leaves our Mumbai production labs, it undergoes validation through critical performance stress testing pipelines, including:
              </p>

              <ul className="flex flex-col gap-4 font-sans text-xs text-cream mt-2">
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-cream">Goniophotometer Light Distribution Analysis:</strong> Standardized measurement of polar luminous intensity distribution curves.
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-cream">Accelerated High Thermal Test Chambers:</strong> Extended high-temperature endurance tests simulating extreme climate stress.
                  </div>
                </li>
                <li className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                  <div>
                    <strong className="text-cream">IPX6 Dust and Moisture Rooms:</strong> Sealed chamber high-velocity spray rigs to ensure IP65 and IP66 certification compliance.
                  </div>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Decorative scientific mockup graphic (pure CSS grid beauty) */}
          <ScrollReveal direction="right">
            <div className="border border-border p-8 bg-surface-alt rounded-[2px] grid grid-cols-2 gap-4">
              <div className="border border-border p-4 bg-void">
                <span className="font-mono text-[9px] text-text-ghost block">TEST CHAMBER 01</span>
                <span className="font-serif text-lg text-cream font-medium block mt-1">CCT Uniformity</span>
                <span className="font-mono text-xs text-gold mt-2 block">Δuv &lt; 0.002</span>
              </div>
              <div className="border border-border p-4 bg-void">
                <span className="font-mono text-[9px] text-text-ghost block">TEST CHAMBER 02</span>
                <span className="font-serif text-lg text-cream font-medium block mt-1">Thermal Sink</span>
                <span className="font-mono text-xs text-gold mt-2 block">&lt; 85°C Junction</span>
              </div>
              <div className="border border-border p-4 bg-void">
                <span className="font-mono text-[9px] text-text-ghost block">TEST CHAMBER 03</span>
                <span className="font-serif text-lg text-cream font-medium block mt-1">Mumbai Monsoon</span>
                <span className="font-mono text-xs text-gold mt-2 block">IP66 Dust/Splash</span>
              </div>
              <div className="border border-border p-4 bg-void">
                <span className="font-mono text-[9px] text-text-ghost block">TEST CHAMBER 04</span>
                <span className="font-serif text-lg text-cream font-medium block mt-1">Optical Clear</span>
                <span className="font-mono text-xs text-gold mt-2 block">UGR &lt; 13 True</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-surface py-20 px-6 border-t border-border mt-12 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3">collaborate</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
            Curated Specifically for <br />
            <span className="italic font-serif text-gold font-normal">Design Visionaries.</span>
          </h2>
          <p className="font-sans text-xs md:text-sm text-text-dim max-w-lg mx-auto mt-6 leading-relaxed">
            Our Mumbai facility offers completely flexible custom manufacturing, bespoke driver calibration options (such as Casambi BT and Phase Cut), and physical custom finishes.
          </p>
          <div className="flex gap-4 mt-10 justify-center">
            <Button variant="primary" href={ROUTES.contact}>
              Request Laboratory Tour
            </Button>
            <Button variant="secondary" href={ROUTES.products}>
              Browse Fixtures Set
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
