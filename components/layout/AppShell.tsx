'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { ProductFAQ } from '@/components/ui/ProductFAQ';
import { CustomCollaborationCTA } from '@/components/ui/CustomCollaborationCTA';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES } from '@/lib/routes';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useNavigation();
  const isContactPage = pathname === ROUTES.contact;

  return (
    <div className="min-h-screen bg-void text-cream flex flex-col selection:bg-gold selection:text-void-dark">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <ProductFAQ />
      {!isContactPage && <CustomCollaborationCTA />}
      <Footer />
      <ScrollToTop />
      <WhatsAppCTA />
    </div>
  );
}
