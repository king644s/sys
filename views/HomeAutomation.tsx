'use client';

import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ControlModesShowcase } from '../components/ui/ControlModesShowcase';
import { SmartSolutionsShowcase } from '../components/ui/SmartSolutionsShowcase';
import { HomeAutomationHero } from '../components/ui/HomeAutomationHero';
import { IntelligentEcosystemShowcase } from '../components/ui/IntelligentEcosystemShowcase';
import { Command } from 'lucide-react';

export function HomeAutomation() {
  return (
    <div className="transition-page-enter">
      <HomeAutomationHero />
      <IntelligentEcosystemShowcase />
      <ControlModesShowcase />
      <SmartSolutionsShowcase />

      {/* Smart lighting deployment explanation */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border mt-12 text-center">
        <ScrollReveal direction="up">
          <Command className="w-10 h-10 text-gold-muted/50 mb-4 mx-auto" />
          <h2 className="font-serif text-2xl md:text-4xl text-cream font-light tracking-tight">
            Integrated Custom Smart Layouts
          </h2>
          <p className="font-sans text-sm text-text-dim max-w-xl mx-auto mt-4 leading-relaxed">
            Our Mumbai calibration laboratories custom program DALI drivers to work seamlessly with native building automation protocols. Contact our technical team during pre-wiring to select appropriate drivers.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
