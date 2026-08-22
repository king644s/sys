'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/** Matches Navbar `h-28` so a short sidebar sits below the nav. */
const NAV_OFFSET_PX = 112;
const BOTTOM_GAP_PX = 24;

/**
 * When the sidebar is taller than the viewport, sticky `top` becomes negative
 * so page scroll moves the whole panel (header, search, categories, extras)
 * until its bottom is in view, then it pins. Unsticks with its parent.
 */
export function useStickySidebarOffset<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    let first = true;

    const sync = () => {
      const top = Math.min(
        NAV_OFFSET_PX,
        window.innerHeight - BOTTOM_GAP_PX - node.offsetHeight,
      );

      if (first) {
        first = false;
        gsap.set(node, { top: `${top}px` });
        return;
      }

      gsap.to(node, { top: `${top}px`, duration: 0.5, ease: 'power3.out', overwrite: true });
    };

    const observer = new ResizeObserver(sync);
    observer.observe(node);
    window.addEventListener('resize', sync);
    sync();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', sync);
      gsap.killTweensOf(node);
    };
  }, []);

  return ref;
}
