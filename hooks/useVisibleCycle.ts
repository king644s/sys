'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Cycles an index while the bound element is on screen.
 * Pauses on pointer enter; resumes on leave.
 */
export function useVisibleCycle(length: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const select = useCallback(
    (next: number) => {
      setIndex(((next % length) + length) % length);
    },
    [length]
  );

  const pause = useCallback(() => {
    pausedRef.current = true;
  }, []);

  const resume = useCallback(() => {
    pausedRef.current = false;
  }, []);

  useEffect(() => {
    const stage = ref.current;
    if (!stage) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let intervalId: number | undefined;

    const start = () => {
      if (intervalId != null) return;
      intervalId = window.setInterval(() => {
        if (pausedRef.current) return;
        setIndex((i) => (i + 1) % length);
      }, intervalMs);
    };

    const stop = () => {
      if (intervalId == null) return;
      window.clearInterval(intervalId);
      intervalId = undefined;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.2 }
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
      stop();
    };
  }, [intervalMs, length]);

  return { ref, index, select, pause, resume };
}
