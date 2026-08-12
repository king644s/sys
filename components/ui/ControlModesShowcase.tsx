'use client';

import { ScrollReveal } from './ScrollReveal';
import { CONTROL_MODES, VOICE_INTEGRATIONS } from '@/data/smartEcosystem';

export function ControlModesShowcase() {
  return (
    <section className="relative bg-[#030303] text-white border-y border-white/[0.06] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(106,103,204,0.06),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr] xl:grid-cols-[minmax(0,340px)_1fr] gap-10 lg:gap-10 xl:gap-12 items-stretch">
          {/* Left — intro copy */}
          <ScrollReveal direction="left" className="h-full">
            <div className="flex flex-col justify-between gap-10 lg:min-h-0 h-full">
              <div className="flex flex-col gap-6">
                <h2 className="font-serif text-[2rem] md:text-[2.5rem] xl:text-[2.75rem] text-white font-light tracking-tight leading-[1.15]">
                  Control Your Home,{' '}
                  <span className="italic text-gold-light">Your Way</span>
                </h2>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-xl md:text-2xl text-white font-light tracking-tight">
                  Works with
                </h3>

                <div className="grid grid-cols-3 gap-2.5">
                  {VOICE_INTEGRATIONS.map((integration) => (
                    <div
                      key={integration.id}
                      className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-3.5 text-center"
                    >
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
                      <span className="font-serif text-[13px] font-semibold text-white leading-snug">
                        {integration.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — control mode cards (1×4 row) */}
          <div className="min-w-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CONTROL_MODES.map((mode, idx) => {
                const Icon = mode.icon;
                return (
                  <ScrollReveal
                    key={mode.id}
                    direction="up"
                    delay={idx * 0.08}
                    className="h-full min-w-0"
                  >
                    <article className="group flex flex-col h-full min-h-[360px] border border-white/12 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.06] transition-all duration-500 rounded-2xl overflow-hidden">
                      <div className="p-3.5 pb-0">
                        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shadow-[0_0_16px_rgba(106,103,204,0.35)]">
                          <Icon className="w-3.5 h-3.5 text-white" strokeWidth={1.75} />
                        </div>
                      </div>

                      <div className="flex-1 flex items-center justify-center px-3 py-4 min-h-[200px]">
                        <img
                          src={mode.image}
                          alt={mode.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="h-full max-h-[200px] w-full object-contain opacity-95 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700 ease-out-expo"
                        />
                      </div>

                      <div className="p-3.5 pt-0 mt-auto flex flex-col gap-1.5">
                        <h3 className="font-serif text-[15px] font-semibold text-white leading-snug group-hover:text-gold-light transition-colors duration-300">
                          {mode.title}
                        </h3>
                        <p className="font-sans text-[11px] text-white/50 leading-snug">
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
