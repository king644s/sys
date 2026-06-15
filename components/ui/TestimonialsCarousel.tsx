'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type Testimonial = {
  quote: string;
  author: string;
  firm: string;
  rating?: number;
};

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

function useVisibleCount() {
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        setVisibleCount(3);
      } else {
        setVisibleCount(1);
      }
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return visibleCount;
}

export function TestimonialsCarousel({
  testimonials,
  autoPlayInterval = 5000,
}: TestimonialsCarouselProps) {
  const count = testimonials.length;
  const visibleCount = Math.min(useVisibleCount(), count);
  const loopItems = count > 0 ? [...testimonials, ...testimonials, ...testimonials] : [];
  const startIndex = count;

  const viewportRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const updateSlideWidth = useCallback(() => {
    if (viewportRef.current) {
      setSlideWidth(viewportRef.current.offsetWidth / visibleCount);
    }
  }, [visibleCount]);

  useEffect(() => {
    updateSlideWidth();
    window.addEventListener('resize', updateSlideWidth);
    return () => window.removeEventListener('resize', updateSlideWidth);
  }, [updateSlideWidth]);

  useEffect(() => {
    setCurrentIndex(startIndex);
    setIsTransitioning(false);
    requestAnimationFrame(() => setIsTransitioning(true));
  }, [count, startIndex]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (count === 0) return;

    if (currentIndex >= startIndex + count) {
      setIsTransitioning(false);
      setCurrentIndex(startIndex);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
    } else if (currentIndex < startIndex) {
      setIsTransitioning(false);
      setCurrentIndex(startIndex + count - 1);
      requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
    }
  }, [count, currentIndex, startIndex]);

  useEffect(() => {
    if (isPaused || count <= 1) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = window.setInterval(goNext, autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [isPaused, count, autoPlayInterval, goNext]);

  const canNavigate = count > 1;

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="relative mb-16">
        <div className="text-center md:pr-20">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">testimonials</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight mt-2">
            Praised by <span className="italic font-serif text-gold">Design Leaders</span>
          </h2>
        </div>

        {canNavigate && (
          <div className="absolute top-0 right-0 flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              className="w-8 h-8 flex items-center justify-center border border-border/60 text-text-dim hover:border-gold/60 hover:text-gold transition-colors duration-300 rounded-[1px]"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="w-8 h-8 flex items-center justify-center border border-border/60 text-text-dim hover:border-gold/60 hover:text-gold transition-colors duration-300 rounded-[1px]"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.25} />
            </button>
          </div>
        )}
      </div>

      <div ref={viewportRef} className="overflow-hidden -mx-4">
        <div
          className={`flex items-stretch ${isTransitioning ? 'transition-transform duration-700 ease-out-expo' : ''}`}
          style={{ transform: slideWidth ? `translateX(-${currentIndex * slideWidth}px)` : undefined }}
          onTransitionEnd={handleTransitionEnd}
        >
          {loopItems.map((collab, index) => (
            <div
              key={index}
              className="shrink-0 px-4 flex"
              style={{ width: slideWidth || `${100 / visibleCount}%` }}
            >
              <div className="flex-1 bg-surface border border-border p-8 rounded-[1px] flex flex-col">
                <p className="font-sans text-xs text-text-dim leading-relaxed italic flex-1">
                  &ldquo;{collab.quote}&rdquo;
                </p>

                <div className="mt-8 border-t border-border/40 pt-5 shrink-0">
                  <span className="font-sans text-sm font-semibold text-cream">{collab.author}</span>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-gold mt-1">
                    {collab.firm}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
