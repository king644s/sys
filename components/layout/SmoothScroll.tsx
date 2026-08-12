'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';
import 'lenis/dist/lenis.css';

const lenisOptions = {
  autoRaf: true,
  lerp: 0.1,
  smoothWheel: true,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
};

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
