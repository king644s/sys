'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number; // in seconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number; // in seconds
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up',
  duration = 0.8
}: ScrollRevealProps) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    // Respect user's preferences for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Set transform base values based on direction
  const getDirectionStyles = () => {
    switch (direction) {
      case 'up': return 'translate-y-6';
      case 'down': return '-translate-y-6';
      case 'left': return 'translate-x-6';
      case 'right': return '-translate-x-6';
      default: return 'scale-[0.98]';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all ease-luxury`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
        opacity: isVisible ? '1' : '0',
        transform: isVisible 
          ? 'translateY(0) translateX(0) scale(1)' 
          : getDirectionStyles()
      }}
    >
      {children}
    </div>
  );
}
