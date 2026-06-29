'use client';

import { useMemo } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ProgressiveImage } from './ProgressiveImage';

const FEATURE_COPY = [
  {
    title: 'Warmth You Can See',
    description:
      'Gentle illumination that softens spaces and moods, creating an inviting calm in every corner.',
  },
  {
    title: 'Crafted with Intention',
    description:
      'Each form balances design and function — a quiet sculpture by day, a warm companion by night.',
  },
  {
    title: 'Made to Last, Made to Glow',
    description:
      'Built from enduring materials that age beautifully, radiating comfort for years to come.',
  },
];

function thumbnailForFullSrc(fullSrc: string): string {
  if (!fullSrc) return fullSrc;
  if (fullSrc.includes('-thumbnail')) return fullSrc;
  return fullSrc.replace(/\.png$/i, '-thumbnail.png');
}

interface ProductFeaturesProps {
  images: string[];
  productName: string;
}

export function ProductFeatures({ images, productName }: ProductFeaturesProps) {
  const featureImages = useMemo(() => {
    const source = images.filter(Boolean);
    const fallback = source[0] || '';
    return FEATURE_COPY.map((_, index) => source[index] || fallback);
  }, [images]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 md:py-20 border-t border-border/40">
      <ScrollReveal direction="up">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold font-bold block mb-3">
            The Glow of Thoughtful Living
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream font-light tracking-tight leading-tight">
            Lights Designed to Warm,{' '}
            <span className="italic text-gold font-normal">Inspire and Endure</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {FEATURE_COPY.map((feature, index) => {
            const fullSrc = featureImages[index];
            const thumbnailSrc = thumbnailForFullSrc(fullSrc);

            return (
              <div key={feature.title} className="flex flex-col gap-5">
                <div className="aspect-[4/5] overflow-hidden rounded-[4px] border border-border/60 bg-surface-alt">
                  <ProgressiveImage
                    thumbnailSrc={thumbnailSrc}
                    fullSrc={fullSrc}
                    alt={`${productName} — ${feature.title}`}
                    loading="lazy"
                    className="w-full h-full object-contain object-center p-4 transition-transform duration-700 ease-out-expo hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="font-sans text-base md:text-lg text-cream font-semibold tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="font-sans text-sm text-text-dim leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
