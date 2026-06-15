'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

const FAQ_ITEMS = [
  {
    question: 'Lorem ipsum dolor sit amet consectetur?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    question: 'Ut enim ad minim veniam quis nostrud?',
    answer:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
  },
  {
    question: 'Excepteur sint occaecat cupidatat non proident?',
    answer:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae.',
  },
  {
    question: 'Nemo enim ipsam voluptatem quia voluptas?',
    answer:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate.',
  },
  {
    question: 'Quis autem vel eum iure reprehenderit?',
    answer:
      'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.',
  },
  {
    question: 'Temporibus autem quibusdam et aut officiis?',
    answer:
      'Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet.',
  },
];

export function ProductFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border/40">
      <ScrollReveal direction="up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Section header */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold font-bold">
              Support &amp; Guidance
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-cream font-light tracking-tight leading-tight">
              Frequently Asked <span className="italic text-gold font-normal">Questions</span>
            </h2>
            <p className="font-sans text-sm text-text-dim leading-relaxed max-w-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Find answers to common questions
              about specifications, installation, and purchasing.
            </p>
          </div>

          {/* Right: Accordion list */}
          <div className="lg:col-span-8 flex flex-col">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-b border-border/40">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left cursor-pointer hover:text-gold transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-sm md:text-base text-cream font-medium leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gold shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-out-expo ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="pb-5 font-sans text-xs md:text-sm text-text-dim leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
