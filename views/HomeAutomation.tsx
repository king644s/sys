'use client';

import { ScrollReveal } from '../components/ui/ScrollReveal';
import { ControlModesShowcase } from '../components/ui/ControlModesShowcase';
import { SmartSolutionsShowcase } from '../components/ui/SmartSolutionsShowcase';
import { HomeAutomationHero } from '../components/ui/HomeAutomationHero';
import { IntelligentEcosystemShowcase } from '../components/ui/IntelligentEcosystemShowcase';
import { EcosystemPhotonMesh } from '../components/ui/EcosystemPhotonMesh';
import { EcosystemLuminousSpectrum } from '../components/ui/EcosystemLuminousSpectrum';
import { Command } from 'lucide-react';

export function HomeAutomation() {
  return (
    <div className="transition-page-enter">
      <HomeAutomationHero />
      <IntelligentEcosystemShowcase />

      <div className="bg-[#050508] border-t border-white/[0.06] px-6 py-8 md:py-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-gold-light">
              Design studies
            </p>
            <p className="font-serif text-xl md:text-2xl text-white font-light tracking-tight mt-2">
              Same ecosystem. Two spatial models.
            </p>
          </div>
          <p className="font-sans text-sm text-white/40 max-w-sm">
            Identical copy, pillars, and nine systems — redrawn as a radial
            HUD, then as a luminous spectrum installation.
          </p>
        </div>
      </div>

      <EcosystemPhotonMesh />
      <EcosystemLuminousSpectrum />
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
