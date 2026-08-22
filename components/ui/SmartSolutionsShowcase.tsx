'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SMART_SOLUTIONS } from '@/data/smartEcosystem';
import { ROUTES } from '@/lib/routes';

export function SmartSolutionsShowcase() {
  return (
    <section id="smart-solutions" className="bg-surface-alt border-b border-border/40">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 lg:py-28">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 md:mb-12">
          <ScrollReveal direction="left">
            <div className="flex flex-col gap-6">
              <h2 className="font-serif text-[2rem] md:text-[2.5rem] xl:text-[2.75rem] text-cream font-light tracking-tight leading-[1.15]">
                Smart Solutions for{' '}
                <span className="italic text-gold">Every Need</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <Link
              href={ROUTES.products}
              className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold flex items-center gap-2 hover:text-gold-light transition-colors group shrink-0"
            >
              <span>View All Products</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>

        {/* 2×2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SMART_SOLUTIONS.map((solution, idx) => {
            const Icon = solution.icon;
            return (
              <ScrollReveal
                key={solution.id}
                direction="up"
                delay={(idx % 2) * 0.08}
                className="h-full"
              >
                <Link
                  href={solution.href}
                  className="group relative flex flex-col h-full min-h-[280px] sm:min-h-[300px] rounded-2xl overflow-hidden border border-border bg-surface hover:border-gold/50 hover:shadow-hover hover:-translate-y-1 transition-all duration-500"
                >
                  <img
                    src={solution.image}
                    alt={solution.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-80 group-hover:opacity-90 dark:group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out-expo"
                  />

                  {/* Light: pale wash for black type · Dark: deep wash for white type */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 from-0% via-25% to-transparent to-45% dark:from-[#030303] dark:via-black/65 dark:from-0% dark:via-25% dark:to-transparent dark:to-45%" />

                  <div className="relative mt-auto p-4 sm:p-5 flex items-end justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-gold flex items-center justify-center shadow-[0_0_16px_rgba(77,74,157,0.35)] dark:shadow-[0_0_16px_rgba(77,74,157,0.4)]">
                        <Icon className="w-[15px] h-[15px] text-white" strokeWidth={1.75} />
                      </div>
                      <div className="flex flex-col gap-1 min-w-0 pt-0.5">
                        <h3 className="font-serif text-[15px] sm:text-base font-semibold text-black dark:text-white leading-snug group-hover:text-gold dark:group-hover:text-gold-light transition-colors duration-300">
                          {solution.title}
                        </h3>
                        <p className="font-sans text-[11px] text-black/60 dark:text-white/55 leading-snug">
                          {solution.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="w-9 h-9 shrink-0 rounded-full bg-white dark:bg-white border border-border/60 dark:border-transparent flex items-center justify-center group-hover:bg-gold group-hover:border-gold group-hover:scale-110 transition-all duration-300 shadow-sm">
                      <ArrowRight
                        className="w-3.5 h-3.5 text-black group-hover:text-white transition-colors duration-300"
                        strokeWidth={2}
                      />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
