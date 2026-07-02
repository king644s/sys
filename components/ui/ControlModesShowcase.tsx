'use client';

import { ScrollReveal } from './ScrollReveal';
import { CONTROL_MODES, VOICE_INTEGRATIONS } from '@/data/smartEcosystem';

export function ControlModesShowcase() {
  return (
    <section className="relative bg-void-dark text-white border-y border-white/[0.08] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(106,103,204,0.12),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,360px)_1fr] xl:grid-cols-[minmax(0,400px)_1fr] gap-10 lg:gap-12 xl:gap-16 items-stretch">
          {/* Left — intro copy */}
          <ScrollReveal direction="left" className="h-full">
            <div className="flex flex-col justify-between gap-10 lg:min-h-0 h-full">
              <div className="flex flex-col gap-6">
                <span className="inline-flex items-center gap-3 w-fit border border-white/15 rounded-full px-4 py-2 font-mono text-[9px] uppercase tracking-[0.22em]">
                  <span className="text-gold-light font-semibold">04</span>
                  <span className="text-white/50">Compatible with all modes of control</span>
                </span>

                <h2 className="font-serif text-[2rem] md:text-[2.5rem] xl:text-[2.75rem] text-white font-light tracking-tight leading-[1.15]">
                  Control Your Home,{' '}
                  <span className="italic text-gold-light">Your Way</span>
                </h2>

                <p className="font-sans text-sm text-white/55 leading-relaxed max-w-[320px]">
                  SYSLight devices work with every method that suits you best. App,
                  voice, touch, or regular switches — the choice is yours.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-tight">
                  Works with
                </h3>

                <div className="flex flex-col gap-0 border border-white/10 bg-white/[0.04] rounded-2xl overflow-hidden">
                {VOICE_INTEGRATIONS.map((integration, i) => (
                  <div key={integration.id}>
                    <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/10">
                        <img
                          src={integration.icon}
                          alt=""
                          width={28}
                          height={28}
                          loading="lazy"
                          className="w-7 h-7 object-contain"
                          aria-hidden
                        />
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-serif text-base font-semibold text-white leading-snug">
                          {integration.title}
                        </span>
                        <span className="font-sans text-[11px] text-white/50 leading-snug">
                          {integration.description}
                        </span>
                      </div>
                    </div>
                    {i < VOICE_INTEGRATIONS.length - 1 && (
                      <span className="block w-full h-px bg-white/10" aria-hidden />
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — control mode cards (2×2 grid) */}
          <div className="min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTROL_MODES.map((mode, idx) => {
                const Icon = mode.icon;
                return (
                  <ScrollReveal
                    key={mode.id}
                    direction="up"
                    delay={idx * 0.08}
                    className="h-full"
                  >
                    <article className="group flex flex-col h-full min-h-[320px] sm:min-h-[300px] border border-white/12 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06] transition-all duration-500 rounded-2xl overflow-hidden">
                      <div className="p-5 pb-0">
                        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-[0_0_20px_rgba(106,103,204,0.35)]">
                          <Icon className="w-[18px] h-[18px] text-white" strokeWidth={1.75} />
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center px-5 py-4 min-h-[140px]">
                        <img
                          src={mode.image}
                          alt={mode.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="max-h-[160px] w-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out-expo"
                        />
                      </div>

                      <div className="p-5 pt-0 mt-auto flex flex-col gap-2.5">
                        <h3 className="font-serif text-xl font-semibold text-white group-hover:text-gold-light transition-colors duration-300">
                          {mode.title}
                        </h3>
                        <p className="font-sans text-[12px] text-white/50 leading-relaxed">
                          {mode.description}
                        </p>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
