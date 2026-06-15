'use client';

import { ScrollReveal } from './ScrollReveal';
import { Button } from './Button';
import { ROUTES } from '@/lib/routes';

export function CustomCollaborationCTA() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <ScrollReveal direction="up">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-4 block">
          Start a custom collaboration
        </span>
        <h2 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight max-w-4xl mx-auto leading-tight">
          Bring Focused Brilliance <br />
          To your <span className="italic font-serif text-gold font-normal">Next Schematic.</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-text-dim max-w-lg mx-auto mt-6 leading-relaxed">
          Send us your schematic layouts, DWG CAD parameters, or lighting specifications. Our project layout engineers will draft a complete recommendation set and price quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Button variant="primary" href={ROUTES.contact}>
            Aquire Product Estimate
          </Button>
          <Button variant="secondary" href={ROUTES.products}>
            Browse Complete Catalog
          </Button>
        </div>
      </ScrollReveal>
    </section>
  );
}
