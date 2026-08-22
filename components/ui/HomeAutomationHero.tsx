'use client';

import Link from 'next/link';
import { ArrowRight, Lightbulb, Blinds, Thermometer, Shield } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { ROUTES } from '@/lib/routes';

const STATUS_CARDS = [
  {
    id: 'lighting',
    label: 'Lighting',
    status: 'Dimmed · 80%',
    icon: Lightbulb,
    className: 'top-[18%] left-[8%] sm:left-[12%] lg:left-[18%]',
  },
  {
    id: 'curtains',
    label: 'Curtains',
    status: 'Open',
    icon: Blinds,
    className: 'top-[34%] left-[28%] sm:left-[34%] lg:left-[40%]',
  },
  {
    id: 'ac',
    label: 'AC Room',
    status: '24°C',
    icon: Thermometer,
    className: 'top-[52%] left-[10%] sm:left-[16%] lg:left-[22%]',
  },
  {
    id: 'security',
    label: 'Security',
    status: 'Armed',
    icon: Shield,
    className: 'top-[68%] left-[30%] sm:left-[36%] lg:left-[42%]',
  },
] as const;

export function HomeAutomationHero() {
  return (
    <section className="relative w-full min-h-[min(100vh,920px)] overflow-hidden bg-[#050508] text-white">
      {/* Full-bleed hero image */}
      <div className="absolute inset-0">
        <img
          src="/images/home-automation/hero-image.jpg"
          alt="Luxury living room with layered architectural lighting and smart home controls"
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] scale-[1.02]"
        />
        {/* Left readability wash */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/92 via-35% to-transparent to-70%" />
        {/* Bottom fade into next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050508] to-transparent" />
        {/* Soft purple ambient */}
        <div className="absolute -left-20 top-1/3 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px] pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-24 min-h-[min(100vh,920px)] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 w-full items-center">
          {/* Copy column */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-7 md:gap-8 max-w-xl">
            <ScrollReveal direction="up">
              <h1 className="font-serif text-[2.5rem] sm:text-5xl md:text-[3.5rem] xl:text-[3.75rem] font-light tracking-tight leading-[1.08] text-white">
                Control Every Corner of{' '}
                <span className="italic text-gold-light">Your Home</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08}>
              <p className="font-sans text-sm md:text-[15px] text-white/65 leading-relaxed max-w-md">
                Smart lighting, security, climate, entertainment, and automation —
                unified into one seamless ecosystem designed for modern living.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.14}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1">
                <Link
                  href="#smart-solutions"
                  className="group inline-flex h-12 items-center justify-between gap-4 rounded-full bg-gold hover:bg-gold-light text-white pl-5 pr-1.5 font-mono text-[11px] uppercase tracking-[0.14em] font-bold transition-all duration-300 shadow-[0_8px_28px_-8px_rgba(77,74,157,0.55)] hover:-translate-y-0.5"
                >
                  <span>Explore Smart Solutions</span>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gold group-hover:scale-105 transition-transform duration-300">
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.25} />
                  </span>
                </Link>

                <Link
                  href={ROUTES.contact}
                  className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-white/35 hover:border-white/70 bg-transparent hover:bg-white/[0.06] text-white px-5 font-mono text-[11px] uppercase tracking-[0.14em] font-semibold transition-all duration-300"
                >
                  <span>Book Consultation</span>
                  <ArrowRight
                    className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform duration-300"
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Visual column — status cards over the living scene */}
          <div className="lg:col-span-7 xl:col-span-7 relative min-h-[320px] sm:min-h-[420px] lg:min-h-[560px]">
            {/* Soft connector lines toward the room */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40 hidden sm:block"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <path
                d="M22 22 C 40 24, 48 30, 58 36"
                fill="none"
                stroke="rgba(143,141,240,0.55)"
                strokeWidth="0.35"
              />
              <path
                d="M42 36 C 52 40, 60 46, 70 52"
                fill="none"
                stroke="rgba(143,141,240,0.4)"
                strokeWidth="0.35"
              />
              <path
                d="M24 54 C 38 58, 50 62, 64 68"
                fill="none"
                stroke="rgba(143,141,240,0.35)"
                strokeWidth="0.35"
              />
            </svg>

            {STATUS_CARDS.map((card, index) => {
              const Icon = card.icon;
              return (
                <ScrollReveal
                  key={card.id}
                  direction="up"
                  delay={0.18 + index * 0.08}
                  className={`absolute ${card.className} z-10`}
                >
                  <div className="ha-status-card relative rounded-2xl p-px shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)] min-w-42">
                    <span className="ha-status-card__led" aria-hidden />
                    <div className="relative z-10 flex items-center gap-3 rounded-[15px] bg-[#0a0a12]/75 backdrop-blur-md px-3.5 py-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/90 text-white shadow-[0_0_18px_rgba(106,103,204,0.45)]">
                        <Icon className="w-4 h-4" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col min-w-0 leading-tight">
                        <span className="font-sans text-[13px] font-semibold text-white">
                          {card.label}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 mt-0.5">
                          {card.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
