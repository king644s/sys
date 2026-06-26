'use client';

import { KelvinOrb } from '../components/3d/KelvinOrb';
import { KelvinSlider } from '../components/ui/KelvinSlider';
import { SectionDivider } from '../components/ui/SectionDivider';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TripleImageCompare } from '../components/ui/TripleImageCompare';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { LIGHTING_COMPARISONS } from '../data/lightingComparisons';
import { Sliders, Sun, ShieldCheck, Zap, Laptop, Command } from 'lucide-react';

export function SmartLights() {
  return (
    <div className="transition-page-enter">
      <Breadcrumbs />
      {/* Page Header */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <ScrollReveal direction="up">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3 block">
            03 / Dynamic Spectrum
          </span>
          <h1 className="font-serif text-4xl md:text-6xl text-cream font-light tracking-tight leading-tight">
            Next-Gen Smart <br />
            <span className="italic font-serif text-gold font-normal">Thermal Tunings.</span>
          </h1>
          <p className="font-sans text-xs md:text-sm text-text-dim max-w-xl mx-auto mt-6 leading-relaxed">
            Unleash biological lighting synchronization directly in critical residential, hospitality, and display centers. Command precise color warmth settings dynamically.
          </p>
        </ScrollReveal>
      </section>

      {/* Main interactive 3D WebGL space + control slider */}
      <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left: 3D interactive core lamp orb */}
        <div className="lg:col-span-6 flex justify-center items-center h-[500px]">
          <KelvinOrb />
        </div>

        {/* Right: Controller sliders and explanatory parameters */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <ScrollReveal direction="right">
            <div className="flex flex-col gap-4">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">
                tunable white spectrum simulator
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-cream tracking-tight font-light font-semibold">
                Absolute Temperature Control
              </h2>
              <p className="font-sans text-xs leading-relaxed text-text-dim max-w-lg">
                Drag the specialized color spectrum track tool below to interactively test how our LED emitters translate thermal inputs in real-time. Feel the shift from cozy golden embers to medical task daylight.
              </p>
            </div>
          </ScrollReveal>

          {/* Slider trigger */}
          <ScrollReveal direction="right" delay={0.15}>
            <div className="bg-surface border border-border p-8 rounded-[2px]">
              <KelvinSlider />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider label="Key Engineering parameters" />

      {/* Feature showcase grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="border border-border p-8 bg-surface">
            <Zap className="w-8 h-8 text-gold mb-5" />
            <h3 className="font-serif text-xl font-bold text-cream mb-2">Ripple-Free Zero Flicker Dimming</h3>
            <p className="font-sans text-xs text-text-dim leading-relaxed">
              Standard commercial LEDs flicker during dimmed cycles, creating optic strain and migraine triggers. SYSLight uses high-frequency ripple-free digital drivers for perfect eye protection.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div className="border border-border p-8 bg-surface">
            <Laptop className="w-8 h-8 text-gold mb-5" />
            <h3 className="font-serif text-xl font-bold text-cream mb-2">DALI / Casambi Adaptors</h3>
            <p className="font-sans text-xs text-text-dim leading-relaxed">
              Fully compatible with high-end bus structures including DALI-2, 0-10V, Casambi Bluetooth mesh networks, Control4, Crestron, and standard voice-activated smart links.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.3}>
          <div className="border border-border p-8 bg-surface">
            <Sun className="w-8 h-8 text-gold mb-5" />
            <h3 className="font-serif text-xl font-bold text-cream mb-2">Dual-Chip Optical Mixing</h3>
            <p className="font-sans text-xs text-text-dim leading-relaxed">
              By pairing warm 2200K phosphor chips and cool 6500K chips under a single micro-lens grid, color outputs remain perfectly uniform even during dynamic change adjustments.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Before / After lighting comparison */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <ScrollReveal direction="up">
          <div className="flex flex-col gap-4 text-center mb-8">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-gold">
              atmospheric transformation
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream tracking-tight font-light">
              Before <span className="italic text-gold">/</span> After
            </h2>
            <p className="font-sans text-xs md:text-sm text-text-dim max-w-lg mx-auto leading-relaxed">
              Drag each handle to reveal a different space — all three scenarios in one view.
            </p>
          </div>

          <TripleImageCompare images={[...LIGHTING_COMPARISONS]} />

          <p className="font-sans text-[11px] md:text-xs text-text-ghost max-w-2xl mx-auto mt-6 leading-relaxed text-center">
            Tunable white LED systems preserve architectural lines, wall finishes, and window placement — transforming only the perceived warmth, depth, and ambience of the space.
          </p>
        </ScrollReveal>
      </section>

      {/* Smart lighting deployment explanation */}
      <section className="max-w-5xl mx-auto px-6 py-16 border-t border-border mt-12 text-center">
        <ScrollReveal direction="up">
          <Command className="w-10 h-10 text-gold-muted/50 mb-4 mx-auto" />
          <h2 className="font-serif text-2xl md:text-4xl text-cream font-light tracking-tight">
            Integrated Custom Smart Layouts
          </h2>
          <p className="font-sans text-xs md:text-sm text-text-dim max-w-xl mx-auto mt-4 leading-relaxed">
            Our Mumbai calibration laboratories custom program DALI drivers to work seamlessly with native building automation protocols. Contact our technical team during pre-wiring to select appropriate drivers.
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}
