'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { companyTimeline } from '@/data/companyTimeline';

/** Matches Navbar `h-28` so sticky content sits below the nav. */
const NAV_OFFSET = 112;
/** Pixels of each prior card that stay visible in the stack. */
const STACK_PEEK = 6;

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
        <div className="container-page py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="eyebrow block mb-3">
              Our journey
            </span>
            <h2 className="heading-2">
              Milestones that{' '}<br />
              <span className="text-gold">shape the brand.</span>
            </h2>
          </div>
          <p className="body max-w-xs hidden md:block">
            Scroll through the moments that matter to architects and designers — from 1991 to 2026.
          </p>
        </div>
      </header>

      {companyTimeline.map((entry, index) => (
        <article
          key={entry.period}
          className="tl-stack-card sticky w-full bg-surface border-t border-border"
          style={{
            top: cardsStickyTop + index * STACK_PEEK,
            zIndex: index + 1,
          }}
        >
          <div className="container-page md:px-16 py-12 md:py-16 w-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-start md:items-center">
            <div className="flex flex-col gap-3">
              <span className="eyebrow">
                {entry.period}
              </span>
              <span
                className="font-display font-semibold leading-none tracking-tight text-gold select-none"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
              >
                {entry.year}
              </span>
              {entry.yearEnd ? (
                <span className="eyebrow text-gold-light">
                  to {entry.yearEnd}
                </span>
              ) : null}
              <div className="w-8 h-px bg-gold mt-2" />
            </div>

            <div className="flex flex-col gap-4 md:border-l md:border-border md:pl-14">
              <div>
                <h3 className="heading-3 text-2xl md:text-[2rem] leading-tight">
                  {entry.title}
                </h3>
                <span className="font-sans text-sm text-gold block mt-1.5">
                  {entry.subtitle}
                </span>
              </div>

              <p className="body max-w-2xl">
                {entry.description}
              </p>

              <div className="flex items-baseline gap-4 pt-4 border-t border-border">
                <span className="font-display text-2xl md:text-[1.75rem] text-gold font-semibold tracking-tight leading-none">
                  {entry.metric}
                </span>
                <span className="eyebrow text-text-dim">
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
