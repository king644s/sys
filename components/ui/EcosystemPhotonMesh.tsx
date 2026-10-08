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

const MESH = { cx: 50, cy: 50, r: 40 } as const;

function polar(angleDeg: number, radius: number = MESH.r) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Number((MESH.cx + radius * Math.cos(rad)).toFixed(3)),
    y: Number((MESH.cy + radius * Math.sin(rad)).toFixed(3)),
  };
}

function TickMarks() {
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angle = (i * 5 * Math.PI) / 180;
    const major = i % 6 === 0;
    const inner = major ? 45.2 : 46.6;
    const outer = 48.4;
    return {
      key: i,
      major,
      x1: Number((MESH.cx + inner * Math.cos(angle)).toFixed(3)),
      y1: Number((MESH.cy + inner * Math.sin(angle)).toFixed(3)),
      x2: Number((MESH.cx + outer * Math.cos(angle)).toFixed(3)),
      y2: Number((MESH.cy + outer * Math.sin(angle)).toFixed(3)),
    };
  });

  return (
    <g className="text-white/25">
      {ticks.map((tick) => (
        <line
          key={tick.key}
          x1={tick.x1}
          y1={tick.y1}
          x2={tick.x2}
          y2={tick.y2}
          stroke="currentColor"
          strokeWidth={tick.major ? 0.35 : 0.18}
          strokeLinecap="round"
          opacity={tick.major ? 0.9 : 0.45}
        />
      ))}
    </g>
  );
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function EcosystemPhotonMesh() {
  const uid = useId().replace(/:/g, '');
  const beamId = `photon-beam-${uid}`;
  const glowId = `photon-glow-${uid}`;
  const { ref, index, select, pause, resume } = useVisibleCycle(
    ECOSYSTEM_FEATURES.length,
    ECOSYSTEM_CYCLE_MS
  );
  const active = ECOSYSTEM_FEATURES[index];
  const ActiveIcon = active.icon;
  const beam = polar(active.angle, MESH.r);
  const beamInner = polar(active.angle, 18);

  return (
    <section className="relative bg-[#050508] text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_75%_50%,rgba(106,103,204,0.12),transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(255,186,92,0.06),transparent_55%)]" />

      <div className="relative container-page py-16 md:py-24 lg:py-28">
        <ScrollReveal direction="up">
          <p className="font-sans text-xs uppercase tracking-[0.08em] text-gold-light font-semibold">
            Route 01 · Photon Mesh
          </p>
          <p className="font-sans text-sm text-white/45 mt-2 max-w-md">
            Light as particle. Systems sit as LED dies around the house — the
            source. A cue beam fires the active emitter.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-center mt-10 md:mt-14">
          <div className="lg:col-span-5 flex flex-col gap-8 md:gap-10">
            <ScrollReveal direction="up">
              <h2 className="font-serif text-[2rem] sm:text-[2.35rem] md:text-[2.75rem] xl:text-[3rem] font-semibold tracking-tight leading-[1.12] text-white max-w-md">
                {ECOSYSTEM_COPY.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.06}>
              <p className="font-sans text-sm md:text-[15px] text-white/55 leading-relaxed max-w-sm">
                {ECOSYSTEM_COPY.body}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5">
                <div className="photon-mesh__readout-led" aria-hidden />
                <div className="relative z-10 flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold shadow-[0_0_24px_rgba(143,141,240,0.45)]">
                    <ActiveIcon className="w-5 h-5 text-white" strokeWidth={1.6} aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-gold-light font-semibold">
                      Cue {pad(index + 1)} / {pad(ECOSYSTEM_FEATURES.length)}
                    </p>
                    <p className="font-serif text-2xl text-white font-semibold tracking-tight mt-1 leading-tight">
                      {active.label}
                    </p>
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-white/50 mt-1.5 font-semibold">
                      {active.cue}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.14}>
              <ul className="grid grid-cols-2 gap-2.5">
                {ECOSYSTEM_PILLARS.map((pillar) => {
                  const Icon = pillar.icon;
                  return (
                    <li
                      key={pillar.id}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3"
                    >
                      <Icon className="w-4 h-4 text-gold-light shrink-0 mt-0.5" strokeWidth={1.5} aria-hidden />
                      <span className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-sans text-xs uppercase tracking-[0.08em] text-gold-light font-semibold">
                          {pillar.cue}
                        </span>
                        <span className="font-sans text-[11px] text-white/50 leading-snug">
                          {pillar.label}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={0.08}>
              <div
                ref={ref}
                className="photon-mesh relative mx-auto w-full max-w-[640px] aspect-square"
                onPointerEnter={pause}
                onPointerLeave={resume}
              >
                <div className="photon-mesh__frame pointer-events-none" aria-hidden>
                  <span className="photon-mesh__corner photon-mesh__corner--tr" />
                  <span className="photon-mesh__corner photon-mesh__corner--bl" />
                </div>
                <div className="photon-mesh__hearth pointer-events-none" aria-hidden />
                <div className="photon-mesh__scan pointer-events-none" aria-hidden />

                <p className="absolute top-3 left-4 font-sans text-[9px] uppercase tracking-[0.08em] text-white/35 pointer-events-none font-semibold">
                  Ø 640 · {ECOSYSTEM_FEATURES.length} emitters
                </p>
                <p className="absolute top-3 right-4 font-sans text-[9px] uppercase tracking-[0.08em] text-white/35 pointer-events-none font-semibold">
                  2700–6000K
                </p>

                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 100 100"
                  fill="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id={beamId} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FFBA5C" stopOpacity="0.15" />
                      <stop offset="55%" stopColor="#8F8DF0" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                    </linearGradient>
                    <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                      <feGaussianBlur stdDeviation="0.7" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <TickMarks />

                  <circle cx={MESH.cx} cy={MESH.cy} r="22" className="text-white/10" stroke="currentColor" strokeWidth="0.2" />
                  <circle cx={MESH.cx} cy={MESH.cy} r="31" className="text-gold/25" stroke="currentColor" strokeWidth="0.22" strokeDasharray="0.8 1.8" />
                  <circle cx={MESH.cx} cy={MESH.cy} r={MESH.r} className="text-white/20" stroke="currentColor" strokeWidth="0.28" />

                  <line
                    key={active.id}
                    x1={beamInner.x}
                    y1={beamInner.y}
                    x2={beam.x}
                    y2={beam.y}
                    stroke={`url(#${beamId})`}
                    strokeWidth="0.55"
                    strokeLinecap="round"
                    filter={`url(#${glowId})`}
                    className="photon-mesh__beam"
                  />
                </svg>

                <div className="absolute inset-[24%] sm:inset-[26%] flex items-center justify-center pointer-events-none">
                  <img
                    src="/images/home-automation/bunglow.png"
                    alt="Modern smart home bungalow with warm interior lighting"
                    className="w-full h-full object-contain drop-shadow-[0_0_48px_rgba(255,186,92,0.22)]"
                    loading="lazy"
                  />
                </div>

                {ECOSYSTEM_FEATURES.map((feature, i) => {
                  const Icon = feature.icon;
                  const { x, y } = polar(feature.angle);
                  const isActive = index === i;
                  return (
                    <button
                      key={feature.id}
                      type="button"
                      className={`photon-mesh__die absolute z-10${isActive ? ' is-active' : ''}`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => select(i)}
                      aria-pressed={isActive}
                      aria-label={feature.label}
                    >
                      <span className="photon-mesh__die-core">
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" strokeWidth={1.7} aria-hidden />
                      </span>
                    </button>
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
