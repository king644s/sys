'use client';

import { useId } from 'react';
import {
  ECOSYSTEM_COPY,
  ECOSYSTEM_CYCLE_MS,
  ECOSYSTEM_FEATURES,
  ECOSYSTEM_PILLARS,
} from '@/data/smartEcosystem';
import { useVisibleCycle } from '@/hooks/useVisibleCycle';
import { ScrollReveal } from './ScrollReveal';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function EcosystemLuminousSpectrum() {
  const uid = useId().replace(/:/g, '');
  const { ref, index, select, pause, resume } = useVisibleCycle(
    ECOSYSTEM_FEATURES.length,
    ECOSYSTEM_CYCLE_MS
  );
  const active = ECOSYSTEM_FEATURES[index];
  const ActiveIcon = active.icon;

  return (
    <section className="relative bg-[#030306] text-white overflow-hidden border-t border-white/[0.03]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_100%,rgba(106,103,204,0.12),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-light/30 to-transparent" />
      </div>

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-6 pt-16 pb-8 md:pt-24 md:pb-12 lg:pt-28 lg:pb-16"
        onPointerEnter={pause}
        onPointerLeave={resume}
      >
        <div className="text-center mb-12 md:mb-16">
          <ScrollReveal direction="up">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-light mb-4">
              Route 02 · Luminous Spectrum
            </p>
            <h2 className="font-serif text-[2rem] sm:text-[2.35rem] md:text-[2.75rem] xl:text-[3rem] font-light tracking-tight leading-[1.12] text-white max-w-2xl mx-auto">
              {ECOSYSTEM_COPY.title}
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.06}>
            <p className="font-sans text-sm md:text-[15px] text-white/50 leading-relaxed max-w-lg mx-auto mt-5">
              {ECOSYSTEM_COPY.body}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal direction="up" delay={0.1}>
          <div className="spectrum relative mx-auto max-w-5xl">
            <div className="spectrum__source relative flex justify-center mb-8 md:mb-12">
              <div className="spectrum__home relative">
                <div className="spectrum__home-glow" aria-hidden />
                <img
                  src="/images/home-automation/bunglow.png"
                  alt="Modern smart home"
                  className="relative z-10 h-32 sm:h-40 md:h-48 lg:h-56 w-auto object-contain"
                  loading="lazy"
                />
                <div className="spectrum__beam" aria-hidden />
              </div>
            </div>

            <div className="spectrum__bar relative">
              <div className="spectrum__track" aria-hidden />
              <div
                className="spectrum__active-glow"
                style={{ left: `${(index / (ECOSYSTEM_FEATURES.length - 1)) * 100}%` }}
                aria-hidden
              />

              <ul className="spectrum__zones relative flex justify-between items-stretch">
                {ECOSYSTEM_FEATURES.map((feature, i) => {
                  const Icon = feature.icon;
                  const isActive = index === i;
                  return (
                    <li key={feature.id} className="spectrum__zone-wrapper flex-1 flex justify-center">
                      <button
                        type="button"
                        onClick={() => select(i)}
                        aria-pressed={isActive}
                        className={`spectrum__zone group${isActive ? ' is-active' : ''}`}
                      >
                        <span className="spectrum__zone-beam" aria-hidden />
                        <span className="spectrum__zone-node">
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} aria-hidden />
                        </span>
                        <span className="spectrum__zone-label">
                          {feature.label}
                        </span>
                        <span className="spectrum__zone-index">{pad(i + 1)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="spectrum__readout relative mt-10 md:mt-14">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
                <div className="spectrum__active-display flex items-center gap-4 sm:gap-5">
                  <span className="spectrum__active-icon">
                    <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" strokeWidth={1.3} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-gold-light/70 mb-1">
                      Active zone · {pad(index + 1)}/{pad(ECOSYSTEM_FEATURES.length)}
                    </p>
                    <p className="font-serif text-xl sm:text-2xl text-white font-light tracking-tight leading-tight">
                      {active.label}
                    </p>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 mt-1">
                      {active.cue}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block w-px h-16 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                <ul className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8">
                  {ECOSYSTEM_PILLARS.map((pillar) => {
                    const Icon = pillar.icon;
                    return (
                      <li key={pillar.id} className="spectrum__pillar flex items-center gap-2.5">
                        <Icon className="w-3.5 h-3.5 text-gold-light/60" strokeWidth={1.5} aria-hidden />
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                          {pillar.label}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.16}>
          <p className="text-center font-sans text-[13px] text-white/25 mt-12 md:mt-16 max-w-md mx-auto">
            Light as infrastructure. One continuous spectrum connecting every system in your home.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
