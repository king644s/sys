'use client';

import { CategoryCard } from '../components/ui/CategoryCard';
import { ProductCard } from '../components/ui/ProductCard';
import { SectionDivider } from '../components/ui/SectionDivider';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TestimonialsCarousel } from '../components/ui/TestimonialsCarousel';
import Link from 'next/link';
import { Button } from '../components/ui/Button';
import { CATEGORIES, PRODUCTS, PROJECTS, TESTIMONIALS } from '../data';
import { ROUTES } from '@/lib/routes';
import { ArrowRight, Sparkles, Sliders, Layers, CornerDownRight, Quote } from 'lucide-react';

export function Home() {
  const bestsellers = PRODUCTS.filter(p => p.isBestseller);
  const featuredProjects = PROJECTS.slice(0, 3);

  return (
    <div className="transition-page-enter">
      {/* 1. Hero Section */}
      <section className="relative h-screen min-h-[700px] w-full bg-void flex items-center justify-center overflow-hidden">
        {/* Beautiful luxury logo backdrop ambient glow (Zero animation, pure stable brand color) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gold/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-[40%] left-[45%] w-[350px] h-[350px] bg-gold-light/4 blur-[100px] rounded-full pointer-events-none" />

        {/* Ambient top & bottom gradients */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-60 bg-gradient-to-t from-void to-transparent pointer-events-none" />

        {/* Content on top */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <ScrollReveal direction="up" delay={0.2}>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gold mb-3.5 block font-bold">
              SYSLight • Systems Creator Innovation
            </span>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none text-cream max-w-4xl font-light">
              Focused Brilliance <br />
              <span className="italic font-normal font-serif text-gold">for Every Corner.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.6}>
            <p className="font-sans text-xs md:text-sm text-text-dim max-w-lg mx-auto mt-6 tracking-wide leading-relaxed">
              Premium Indian-made architectural LED luminaires designed to outperform Western luxury benchmarks. Honed for architects and interior spaces.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
              <Button variant="primary" href={ROUTES.products}>
                Explore Collections
              </Button>
              <Button variant="secondary" href={ROUTES.smartLights}>
                Interactive CCT Demo
              </Button>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll cues */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-dim">
            scroll down
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-gold/50 to-transparent animate-pulse-glow" />
        </div>
      </section>

      {/* 2. Scroll-Driven Light Beam Simulation vertical divider */}
      <div className="w-full flex justify-center bg-void">
        <div className="w-[1px] h-[150px] bg-gradient-to-b from-gold/40 via-gold/10 to-transparent" />
      </div>

      {/* 3. Product Category Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-12" id="home-collections-showcase">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <ScrollReveal direction="left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-2 block">
                01 / Portfolio
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
                Architectural <span className="italic font-serif text-gold">Classifications</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="font-sans text-xs text-text-dim max-w-sm leading-relaxed">
              Precision engineered fixtures meticulously categorized to serve diverse structural tasks, spotlight controls, and wall wash configurations.
            </p>
          </ScrollReveal>
        </div>

        {/* Dynamic masonry layout showcasing categories with 3D model render engines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.slice(0, 6).map((category, idx) => (
            <div key={category.slug}>
              <ScrollReveal direction="up" delay={idx * 0.1}>
                <CategoryCard category={category} />
              </ScrollReveal>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link
            href={ROUTES.products}
            className="font-mono text-xs text-gold flex items-center gap-2 tracking-[0.2em] uppercase hover:underline cursor-pointer group"
          >
            <span>See entire list including IP66 series</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 duration-300" />
          </Link>
        </div>
      </section>

      <SectionDivider label="Our Heritage & Statement" />

      {/* 4. Brand Statement and Manufacturing Heritage */}
      <section className="bg-surface py-20 px-6 border-y border-border/40">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          <ScrollReveal direction="up">
            <Quote className="w-12 h-12 text-gold-muted/50 mb-6 mx-auto" />
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <blockquote className="font-serif text-2xl md:text-3xl text-cream tracking-tight max-w-3xl leading-relaxed font-light">
              "We built <span className="text-cream font-semibold">SYSLight</span> with a singular obsessiveness: to manufacture in Mumbai a caliber of optical LED that outperforms any European import, backing it with 30 years of industrial mastery."
            </blockquote>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <cite className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mt-6 block not-italic">
              — Systems Creator, Founder of SYSLight
            </cite>
          </ScrollReveal>

          {/* Badges */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl w-full border-t border-border/50 pt-10">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl font-bold text-gold">30+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim mt-2">
                  Years Engineering
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.2}>
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl font-bold text-gold">CRI 92+</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim mt-2">
                  True Colour Rendering
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.3}>
              <div className="flex flex-col items-center">
                <span className="font-serif text-3xl font-bold text-gold">100%</span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-dim mt-2">
                  Manufactured in India
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <SectionDivider label="Interactive smart solutions" />

      {/* 5. Smart CCT Color Temperature Highlight Banner */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-surface-alt border border-border rounded-[2px] p-8 md:p-14 overflow-hidden relative grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Decorative side spotlight background glow */}
          <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-[100px] bg-gold/5 opacity-25 pointer-events-none" />

          <div className="md:col-span-7 flex flex-col gap-6 z-10">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold">
              next-gen smart technology
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight text-cream leading-tight">
              Color Temperature <span className="italic font-serif text-gold">Transitions</span>
            </h2>
            <p className="font-sans text-xs md:text-sm text-text-dim leading-relaxed max-w-xl">
              From stimulating crisp white focus light (6500K) to deep relaxing sunset glows (2700K). Command ambient feelings with absolute thermal efficiency and zero ripple dimming.
            </p>

            <div className="grid grid-cols-3 gap-4 border-y border-border/50 py-5 my-2 max-w-lg">
              <div className="flex gap-2.5 items-center">
                <Sliders className="w-4 h-4 text-gold shrink-0" />
                <span className="font-sans text-[11px] text-cream uppercase">smooth slide</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Sparkles className="w-4 h-4 text-gold shrink-0" />
                <span className="font-sans text-[11px] text-cream uppercase">zero flicker</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Layers className="w-4 h-4 text-gold shrink-0" />
                <span className="font-sans text-[11px] text-cream uppercase">presets</span>
              </div>
            </div>

            <Button variant="primary" className="self-start mt-2" href={ROUTES.smartLights}>
              Command Spectrum Orb
            </Button>
          </div>

          <div className="md:col-span-5 flex justify-center relative">
            <div className="relative border-2 border-border p-6 rounded-full aspect-square w-72 md:w-80 flex items-center justify-center bg-void z-10 shadow-inner">
              <div className="absolute inset-2 rounded-full border border-border-mid/30 animate-pulse-glow" style={{ boxShadow: '0 0 30px rgba(201,169,110,0.1)' }} />
              <div className="flex flex-col items-center">
                <span className="font-serif text-4xl text-cream font-semibold">2700K</span>
                <span className="font-sans text-gold text-[9px] uppercase tracking-widest mt-1">To</span>
                <span className="font-serif text-4xl text-cream font-semibold mt-1">6500K</span>
                <span className="font-mono text-text-dim text-[8px] uppercase tracking-[0.2em] mt-3">Smart Control</span>
              </div>
            </div>
            {/* Visual halo backing */}
            <div className="absolute inset-0 bg-gold/5 blur-[50px] rounded-full scale-75" />
          </div>
        </div>
      </section>

      <SectionDivider label="Bestselling engineering" />

      {/* 6. Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <ScrollReveal direction="left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-2 block">
                02 / Spotlights
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
                Featured <span className="italic font-serif text-gold">Luminaires</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="font-sans text-xs text-text-dim max-w-sm leading-relaxed">
              Bestselling architectural selections admired by designers for absolute optic clarity, precise geometric cutoffs, and durable brass housings.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {bestsellers.map((product, idx) => (
            <div key={product.id}>
              <ScrollReveal direction="up" delay={idx * 0.1}>
                <ProductCard product={product} />
              </ScrollReveal>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider label="Architectural Spaces" />

      {/* 7. Completed Commercial & Residential Projects */}
      <section className="max-w-7xl mx-auto px-6 py-12" id="home-spaces-showcase">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <ScrollReveal direction="left">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-2 block">
                03 / Spaces
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
                Sculpted <span className="italic font-serif text-gold">Environments</span>
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <p className="font-sans text-xs text-text-dim max-w-sm leading-relaxed">
              Witness how our fixtures shape luxury residential cliff villas, high-density hotel lobbies, and global consulates alike across India.
            </p>
          </ScrollReveal>
        </div>

        {/* Selected Project Grid cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <div key={project.slug}>
              <ScrollReveal direction="up" delay={idx * 0.1}>
                <Link
                  href={ROUTES.projects}
                  className="group relative h-[380px] bg-void overflow-hidden border border-border hover:border-gold/50 hover:shadow-[0_12px_30px_-10px_rgba(201,169,110,0.18)] hover:-translate-y-1 transition-all duration-500 rounded-[2px] cursor-pointer block"
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out-expo"
                  />
                  
                  {/* Visual underlay mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col justify-end">
                    <span className="font-mono text-[9px] text-gold tracking-[0.2em] uppercase mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-cream mb-1 group-hover:text-gold transition-colors duration-300">
                      {project.name}
                    </h3>
                    <p className="font-sans text-xs text-text-dim flex items-center gap-1.5 mt-2">
                      <CornerDownRight className="w-3.5 h-3.5 text-gold-muted" />
                      <span>{project.location}</span>
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button variant="gold-outline" href={ROUTES.projects}>
            Explore all Completed Projects
          </Button>
        </div>
      </section>

      <SectionDivider label="Collaborator feedback" />

      {/* 8. Testimonials Section */}
      <section className="bg-surface-alt border-y border-border/40 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <TestimonialsCarousel testimonials={TESTIMONIALS} />
        </div>
      </section>

    </div>
  );
}
