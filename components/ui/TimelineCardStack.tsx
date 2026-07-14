'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { companyTimeline } from '@/data/companyTimeline';

/** Matches Navbar `h-28` so sticky content sits below the nav. */
const NAV_OFFSET = 112;
/** Pixels of each prior card that stay visible in the stack. */
const STACK_PEEK = 14;

export function TimelineCardStack() {
  const headerRef = useRef<HTMLElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    const update = () => setHeaderHeight(el.offsetHeight);
    update();

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cardsStickyTop = NAV_OFFSET + headerHeight;

  return (
    <section className="relative bg-void">
      <header
        ref={headerRef}
        className="sticky z-30 bg-void border-b border-border"
        style={{ top: NAV_OFFSET }}
      >
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block mb-3">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight leading-tight">
              Milestones That<br />
              <span className="italic font-serif text-gold font-normal">Shape the Brand.</span>
            </h2>
          </div>
          <p className="font-sans text-sm text-text-dim max-w-xs leading-relaxed hidden md:block">
            Scroll through the moments that matter to architects and designers — from 1991 to today.
          </p>
        </div>
      </header>

      {companyTimeline.map((entry, index) => (
        <article
          key={entry.year}
          className="tl-stack-card sticky w-full bg-surface border-t border-border"
          style={{
            top: cardsStickyTop + index * STACK_PEEK,
            zIndex: index + 1,
          }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16 w-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-start md:items-center">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
                {entry.period}
              </span>
              <span
                className="font-serif font-light leading-none text-gold select-none"
                style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
              >
                {entry.year}
              </span>
              <div className="w-8 h-px bg-gold mt-2" />
            </div>

            <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-14">
              <div>
                <h3 className="font-serif text-2xl md:text-[2.2rem] font-light text-cream tracking-tight leading-tight">
                  {entry.title}
                </h3>
                <span className="font-sans text-[13px] text-gold-light block mt-1.5 tracking-wide">
                  {entry.subtitle}
                </span>
              </div>

              <p className="font-sans text-sm text-text-dim leading-relaxed max-w-2xl">
                {entry.description}
              </p>

              <div className="flex items-baseline gap-4 pt-4 border-t border-border">
                <span className="font-serif text-3xl md:text-4xl text-gold font-light leading-none">
                  {entry.metric}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim">
                  {entry.metricLabel}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
