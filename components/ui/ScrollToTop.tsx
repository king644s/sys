'use client';

import { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLenis } from 'lenis/react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const lenis = useLenis((instance) => {
    setIsVisible(instance.scroll > 400);
  });

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-[88px] right-5 z-40 w-11 h-11 flex items-center justify-center rounded-full bg-surface text-cream border border-border-mid shadow-card hover:border-border-high hover:shadow-hover transition-all duration-300 cursor-pointer ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <ChevronUp className="w-5 h-5" strokeWidth={2} />
    </button>
  );
}
