'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { companyTimeline } from '@/data/companyTimeline';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NAV_OFFSET = 112;
const STACK_PEEK = 10;

export function TimelineCardStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinEl = pinRef.current;
      const header = headerRef.current;
      const viewport = viewportRef.current;
      if (!section || !pinEl || !viewport) return;

      const cards = gsap.utils.toArray<HTMLElement>('.tl-stack-card', viewport);
      if (cards.length === 0) return;

      const getPinHeight = () => window.innerHeight - NAV_OFFSET;

      const getCardAreaHeight = () => {
        const headerHeight = header?.offsetHeight ?? 0;
        return Math.max(getPinHeight() - headerHeight, 360);
      };

      const getScrollDistance = () => getCardAreaHeight() * (cards.length - 1);

      const applyLayout = () => {
        gsap.set(pinEl, { height: getPinHeight() });
        gsap.set(viewport, { height: getCardAreaHeight() });

        gsap.set(cards, {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          transformOrigin: '50% 0%',
          force3D: true,
        });

        cards.forEach((card, i) => {
          gsap.set(card, {
            zIndex: i + 1,
            yPercent: i === 0 ? 0 : 100,
            scale: 1,
            y: 0,
          });
        });
      };

      applyLayout();

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'journey-timeline',
          trigger: section,
          start: `top top+=${NAV_OFFSET}`,
          end: () => `+=${getScrollDistance()}`,
          scrub: true,
          pin: pinEl,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      for (let i = 1; i < cards.length; i++) {
        const step = i - 1;

        tl.to(cards[i], { yPercent: 0, ease: 'none', duration: 1 }, step);

        for (let j = 0; j < i; j++) {
          const depth = i - j;
          tl.to(
            cards[j],
            {
              scale: 1 - depth * 0.02,
              y: -depth * STACK_PEEK,
              ease: 'none',
              duration: 1,
            },
            step,
          );
        }
      }

      const onResize = () => {
        gsap.set(pinEl, { height: getPinHeight() });
        gsap.set(viewport, { height: getCardAreaHeight() });
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', onResize);
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => window.removeEventListener('resize', onResize);
    },
    { scope: sectionRef, dependencies: [companyTimeline.length] },
  );

  return (
    <section ref={sectionRef} className="relative bg-void">
      <div ref={pinRef} className="flex flex-col w-full bg-void overflow-hidden">

        <div ref={headerRef} className="relative z-20 shrink-0 bg-void">
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
        </div>

        <div ref={viewportRef} className="relative w-full overflow-hidden">
          {companyTimeline.map((entry, index) => (
            <article
              key={entry.year}
              className="tl-stack-card w-full bg-surface"
              style={{
                zIndex: index + 1,
                transform: index === 0 ? undefined : 'translateY(100%)',
              }}
            >
              <div className="max-w-7xl mx-auto px-6 md:px-16 py-12 md:py-16 w-full h-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-center">

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
        </div>

      </div>
    </section>
  );
}
