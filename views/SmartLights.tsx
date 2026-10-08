'use client';

import { KelvinOrb } from '../components/3d/KelvinOrb';
import { KelvinSlider } from '../components/ui/KelvinSlider';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { TripleImageCompare } from '../components/ui/TripleImageCompare';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { LIGHTING_COMPARISONS } from '../data/lightingComparisons';
import { ROUTES } from '@/lib/routes';
import { quoteHref } from '@/lib/site';
import { Sun, Zap, Network, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Flicker-free dimming',
    body: 'Ordinary LEDs flicker when dimmed, causing eye strain. SYSlight uses high-frequency, ripple-free drivers so light stays steady at every level.',
  },
  {
    icon: Network,
    title: 'DALI, Casambi and smart-home ready',
    body: 'Compatible with DALI-2, 0–10V and Casambi Bluetooth mesh, and with Control4, Crestron and popular voice assistants.',
  },
  {
    icon: Sun,
    title: 'Dual-chip tunable cores',
    body: 'Warm 2200K and cool 6500K chips share one micro-lens, so colour stays even across the beam while you tune between them.',
  },
] as const;

export function SmartLights() {
  return (
    <div className="transition-page-enter">
      <Breadcrumbs />

      <section className="container-page pb-4 pt-4">
        <SectionHeader
          as="h1"
          eyebrow="Smart lights"
          title="Tune the light to the moment"
          description="Tunable-white fixtures that move from warm evening glow to crisp daylight — for homes, hotels and workplaces."
          action={
            <Button variant="primary" href={quoteHref('Smart lighting')}>
              Plan smart lighting <ArrowRight className="h-4 w-4" />
            </Button>
          }
        />
      </section>

      {/* Interactive simulator */}
      <section className="container-page">
        <div className="card grid grid-cols-1 items-center gap-8 overflow-hidden p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="flex h-[360px] items-center justify-center md:h-[440px] lg:col-span-6">
            <KelvinOrb />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-6">
            <div>
              <span className="eyebrow">Try it</span>
              <h2 className="heading-2 mt-2">Colour temperature simulator</h2>
              <p className="body mt-3 max-w-lg">
                Drag the slider to see how one fixture shifts from cosy amber to focused daylight in
                real time.
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-alt p-6">
              <KelvinSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container-page">
          <SectionHeader eyebrow="Engineering" title="What makes it work" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 0.08}>
                <div className="card h-full p-7">
                  <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-accent-soft text-gold">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="heading-3 mt-5">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-dim">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before / after */}
      <section className="section border-t border-border bg-void-dark">
        <div className="container-page">
          <SectionHeader
            align="center"
            eyebrow="Before and after"
            title="Same room, different mood"
            description="Drag each handle to compare three spaces under different light."
          />
          <TripleImageCompare images={[...LIGHTING_COMPARISONS]} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] text-text-ghost">
            Tunable white keeps architecture, finishes and layout unchanged — only the warmth, depth and
            atmosphere of the space shift.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-page">
          <div className="card flex flex-col gap-6 bg-surface-alt border-transparent p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <h2 className="heading-2">Planning smart controls?</h2>
              <p className="body mt-2">
                Our team programmes DALI drivers to work with your building automation. Talk to us during
                pre-wiring so the right drivers are specified.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href={quoteHref('Smart lighting')}>
                Talk to our team
              </Button>
              <Button variant="secondary" href={ROUTES.homeAutomation}>
                Home automation
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
