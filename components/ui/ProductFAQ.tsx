'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { ROUTES } from '@/lib/routes';
import { ScrollReveal } from './ScrollReveal';

export interface FAQItem {
  question: string;
  answer: string;
}

// Copy is drawn from claims already made elsewhere on the site.
// Review with the SYSlight team before launch.
export const GENERAL_FAQ: FAQItem[] = [
  {
    question: 'Can I buy SYSlight fixtures for my home?',
    answer:
      'Yes. Send us your room list or a few photos through the quote form or WhatsApp and our team will suggest fixtures, colour temperatures and quantities, then share a quote.',
  },
  {
    question: 'Do you work with architects, designers and contractors?',
    answer:
      'Most of our work is specified by architects and interior designers. We help with fixture selection, lighting layouts and project pricing — see the For Professionals page for details.',
  },
  {
    question: 'Can I get photometric (IES) files and Dialux support?',
    answer:
      'Yes. Our design desk shares photometric data, drawings and Dialux calculations on request for specified products. Ask through the quote form and mention the product codes you are considering.',
  },
  {
    question: 'Which dimming and control systems are supported?',
    answer:
      'Depending on the driver, fixtures can be configured for phase-cut, 0/1–10V, DALI and Casambi Bluetooth control. Confirm your control system with us during pre-wiring so the correct drivers are supplied.',
  },
  {
    question: 'What does CRI 92+ mean for my space?',
    answer:
      'Colour Rendering Index measures how faithfully light shows true colours. At CRI 92 and above, fabrics, timber, stone and skin tones look natural rather than flat or washed out.',
  },
  {
    question: 'Can I see the fixtures before ordering?',
    answer:
      'Yes — visit our factory and experience centre in Mumbai to see fixtures and smart controls working. Contact us to book a visit.',
  },
];

interface ProductFAQProps {
  items?: FAQItem[];
  title?: string;
  eyebrow?: string;
}

export function ProductFAQ({
  items = GENERAL_FAQ,
  title = 'Frequently asked questions',
  eyebrow = 'Support',
}: ProductFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section border-t border-border">
      <div className="container-page">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-3 lg:col-span-4">
              <span className="eyebrow">{eyebrow}</span>
              <h2 className="heading-2">{title}</h2>
              <p className="body max-w-sm">
                Can&apos;t find what you need?{' '}
                <Link href={ROUTES.contact} className="font-semibold text-gold hover:underline">
                  Talk to our team
                </Link>
                .
              </p>
            </div>

            <div className="flex flex-col border-t border-border lg:col-span-8">
              {items.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;

                return (
                  <div key={item.question} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-6 py-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="text-base font-medium text-cream">{item.question}</span>
                      <Plus
                        className={`h-5 w-5 shrink-0 text-text-dim transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-gold' : ''
                        }`}
                      />
                    </button>

                    <div
                      id={panelId}
                      className={`grid transition-all duration-300 ease-out-expo ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="body pb-6 pr-10">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
