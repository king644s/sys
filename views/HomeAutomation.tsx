'use client';

import { ControlModesShowcase } from '../components/ui/ControlModesShowcase';
import { SmartSolutionsShowcase } from '../components/ui/SmartSolutionsShowcase';
import { HomeAutomationHero } from '../components/ui/HomeAutomationHero';
import { IntelligentEcosystemShowcase } from '../components/ui/IntelligentEcosystemShowcase';
import { EcosystemPhotonMesh } from '../components/ui/EcosystemPhotonMesh';
import { EcosystemLuminousSpectrum } from '../components/ui/EcosystemLuminousSpectrum';
import { Button } from '../components/ui/Button';
import { ROUTES } from '@/lib/routes';
import { quoteHref } from '@/lib/site';
import { ArrowRight } from 'lucide-react';

export function HomeAutomation() {
  return (
    <div className="transition-page-enter">
      <HomeAutomationHero />
      <IntelligentEcosystemShowcase />
      <EcosystemPhotonMesh />
      <EcosystemLuminousSpectrum />
      <ControlModesShowcase />
      <SmartSolutionsShowcase />

      <section className="section">
        <div className="container-page">
          <div className="card flex flex-col gap-6 bg-surface-alt border-transparent p-8 md:flex-row md:items-center md:justify-between md:p-12">
            <div className="max-w-xl">
              <span className="eyebrow">Get started</span>
              <h2 className="heading-2 mt-2">Plan your smart home with us</h2>
              <p className="body mt-2">
                We design, programme and support the whole system — lighting, climate, security and
                entertainment. Bring us in before wiring so everything works together.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" href={quoteHref('Home automation')}>
                Book a consultation <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" href={ROUTES.smartLights}>
                Explore smart lights
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
