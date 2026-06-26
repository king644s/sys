'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companyTimeline } from '@/data/companyTimeline';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function TimelineCardStack() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(
        '.tl-stack-card',
        containerRef.current!,
      );
      if (cards.length === 0) return;

      // Anchor ScrollTrigger for the last card — its start position is our end boundary
      const lastCardST = ScrollTrigger.create({
        trigger: cards[cards.length - 1],
        start: 'center center',
      });

      // Pin the section header (lives above this component in About.tsx).
      // Uses document.getElementById intentionally — it's outside this component's scope.
      // Pins from when the header's top slides below the navbar (top-28 = 112px) until the
      // last card arrives, at which point everything unpins and the header scrolls away.
      const header = document.getElementById('tl-journey-header');
      if (header) {
        ScrollTrigger.create({
          trigger: header,
          start: 'top top+=112',
          end: () => lastCardST.start,
          pin: true,
          pinSpacing: false,
          pinType: 'transform',
        });
      }

      const isLast = (index: number) => index === cards.length - 1;

      cards.forEach((card, index) => {
        // The last card sits on top at full scale — no need to pin or scale it.
        // It only acts as the end-boundary anchor (lastCardST) for all others.
        if (isLast(index)) return;

        // Subtle scale-down — 1.5% per depth level
        const scale = 1 - (cards.length - index) * 0.015;

        const scaleDown = gsap.to(card, {
          scale,
          transformOrigin: 'center center',
          ease: 'none',
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'center center',
          // Unpin each card the moment the last card's center reaches the viewport center
          end: () => lastCardST.start,
          pin: true,
          pinSpacing: false,
          // IMPORTANT: use transform-based pinning — the About page root has a
          // CSS animation (transition-page-enter) that leaves a transform on the
          // element, making position:fixed children mis-positioned.
          pinType: 'transform',
          animation: scaleDown,
          toggleActions: 'restart none none reverse',
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative">
      {companyTimeline.map((entry, index) => (
        <article
          key={entry.year}
          className="tl-stack-card relative w-full min-h-[480px] bg-surface"
          style={{ zIndex: index + 1 }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-20 w-full h-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 items-center">

            {/* Left — Year block */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
                {entry.period}
              </span>
              <span
                className="font-serif font-light leading-none text-gold select-none"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
              >
                {entry.year}
              </span>
              {/* Decorative tick */}
              <div className="w-8 h-px bg-gold mt-2" />
            </div>

            {/* Right — Content block */}
            <div className="flex flex-col gap-5 md:border-l md:border-border md:pl-14">
              <div>
                <h3 className="font-serif text-3xl md:text-[2.6rem] font-light text-cream tracking-tight leading-tight">
                  {entry.title}
                </h3>
                <span className="font-sans text-xs text-gold-light block mt-1.5 tracking-wide">
                  {entry.subtitle}
                </span>
              </div>

              <p className="font-sans text-xs md:text-sm text-text-dim leading-relaxed max-w-2xl">
                {entry.description}
              </p>

              {/* Metric row */}
              <div className="flex items-baseline gap-4 pt-5 border-t border-border">
                <span className="font-serif text-4xl md:text-5xl text-gold font-light leading-none">
                  {entry.metric}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-ghost">
                  {entry.metricLabel}
                </span>
              </div>
            </div>

          </div>
        </article>
      ))}
    </div>
  );
}
