'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ECOSYSTEM_COPY,
  ECOSYSTEM_FEATURES,
  ECOSYSTEM_PILLARS,
} from '@/data/smartEcosystem';
import { ScrollReveal } from './ScrollReveal';

/** Ellipse geometry in % of the stage (matches the SVG viewBox 0–100). */
const ORBIT = {
  cx: 50,
  cy: 50,
  rx: 42,
  ry: 38,
} as const;

/** Dwell time per orbit node — slow clockwise highlight. */
const ORBIT_ACTIVE_MS = 3200;

/**
 * Clockwise from top. Angles in degrees where 0° = right, 90° = bottom
 * (CSS y-down), so -90° is top.
 */
const ORBIT_FEATURES = ECOSYSTEM_FEATURES;

function orbitPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: ORBIT.cx + ORBIT.rx * Math.cos(rad),
    y: ORBIT.cy + ORBIT.ry * Math.sin(rad),
  };
}

export function IntelligentEcosystemShowcase() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intervalId: number | undefined;

    const start = () => {
      if (intervalId != null) return;
      intervalId = window.setInterval(() => {
        setActiveIndex((i) => (i + 1) % ORBIT_FEATURES.length);
      }, ORBIT_ACTIVE_MS);
    };

    const stop = () => {
      if (intervalId == null) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.2 }
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <section className="relative bg-surface-alt text-cream overflow-hidden">
      <div className="container-page py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center">
          {/* Left — copy + pillars */}
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <ScrollReveal direction="up">
              <h2 className="font-serif text-[2rem] sm:text-[2.35rem] md:text-[2.75rem] xl:text-[3rem] font-semibold tracking-tight leading-[1.12] text-cream max-w-md">
                {ECOSYSTEM_COPY.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.06}>
              <p className="body md:text-[15px] max-w-sm">
                {ECOSYSTEM_COPY.body}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
                {ECOSYSTEM_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <li
                      key={pillar.id}
                      className="flex flex-col items-center text-center gap-2.5 rounded-xl border border-border/70 bg-white/70 dark:bg-white/[0.04] px-2.5 py-3.5 h-full min-h-[96px]"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                        <Icon
                          className="w-5 h-5 text-gold"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                      </span>
                      <span className="font-sans text-[11px] text-text-dim leading-snug min-h-[2.6em] flex items-start justify-center">
                        {pillar.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </ScrollReveal>
          </div>

          {/* Right — bungalow + orbit */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.08}>
              <div
                ref={stageRef}
                className="relative mx-auto w-full max-w-[640px] aspect-square"
              >
                {/* Orbital ring — same coordinate space as the nodes */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none text-border-mid/80"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden
                >
                  <ellipse
                    cx={ORBIT.cx}
                    cy={ORBIT.cy}
                    rx={ORBIT.rx}
                    ry={ORBIT.ry}
                    stroke="currentColor"
                    strokeWidth="0.3"
                    className="ecosystem-orbit-ring"
                  />
                </svg>

                {/* House */}
                <div className="absolute inset-[22%] sm:inset-[24%] flex items-center justify-center pointer-events-none">
                  <img
                    src="/images/home-automation/bunglow.png"
                    alt="Modern smart home bungalow with warm interior lighting"
                    className="w-full h-full object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.18)]"
                    loading="lazy"
                  />
                </div>

                {/* Orbit nodes — icon centers sit on the ellipse */}
                {ORBIT_FEATURES.map((feature, index) => {
                  const Icon = feature.icon;
                  const { x, y } = orbitPoint(feature.angle);
                  const isActive = activeIndex === index;
                  return (
                    <div
                      key={feature.id}
                      className={`ecosystem-orbit-node absolute z-10${isActive ? ' is-active' : ''}`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        animationDelay: `${index * 0.12}s`,
                        zIndex: isActive ? 20 : 10,
                      }}
                    >
                      <div className="relative">
                        <div className="ecosystem-orbit-node__icon flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white border border-border shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
                          <Icon
                            className="ecosystem-orbit-node__glyph w-4 h-4 text-gold"
                            strokeWidth={1.6}
                            aria-hidden
                          />
                        </div>
                        <span className="ecosystem-orbit-node__label absolute top-[calc(100%+12px)] left-1/2 w-[4.75rem] sm:w-[5.5rem] -ml-[2.375rem] sm:-ml-[2.75rem] font-sans text-[10px] sm:text-[11px] text-center text-text-dim leading-tight pointer-events-none">
                          {feature.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
