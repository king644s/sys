'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { ProductFAQ } from '@/components/ui/ProductFAQ';

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-void text-cream flex flex-col selection:bg-gold selection:text-void-dark">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <ProductFAQ />
        <Footer />
        <ScrollToTop />
        <WhatsAppCTA />
      </div>
    </SmoothScroll>
  );
}
