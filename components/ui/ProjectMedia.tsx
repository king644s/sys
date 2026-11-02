'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { ProjectFact, ProjectMedia } from '@/data/projectDetails';

/** Plays muted while on screen, pauses off screen; never autoplays for reduced motion. */
function ProjectVideo({ media }: { media: ProjectMedia }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pausedByUser.current) video.play().catch(() => {});
        else if (!entry.isIntersecting) video.pause();
      },
      { threshold: 0.35 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      pausedByUser.current = false;
      video.play().catch(() => {});
    } else {
      pausedByUser.current = true;
      video.pause();
    }
  };

  return (
    <>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={media.src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        className="absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-cream shadow-subtle backdrop-blur transition-colors hover:text-gold"
      >
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-px" />}
      </button>
    </>
  );
}

interface MediaFrameProps {
  media: ProjectMedia;
  /** Tailwind aspect class for the frame, e.g. `aspect-[16/10]`. */
  aspect: string;
  className?: string;
}

/** Image or video in a rounded frame with its caption and technical note underneath. */
export function MediaFrame({ media, aspect, className = '' }: MediaFrameProps) {
  return (
    <figure className={`flex flex-col ${className}`}>
      <div className={`relative min-h-0 overflow-hidden rounded-lg bg-surface-alt ${aspect}`}>
        {media.kind === 'video' ? (
          <ProjectVideo media={media} />
        ) : (
          <img
            src={media.src}
            alt={media.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
        )}
        {media.kind === 'video' && (
          <span className="chip absolute left-3 top-3 z-10 h-6 bg-surface/90 backdrop-blur">Video</span>
        )}
      </div>
      {(media.caption || media.meta) && (
        <figcaption className="mt-3 flex flex-col gap-0.5">
          {media.caption && <span className="text-sm font-medium text-cream">{media.caption}</span>}
          {media.meta && <span className="font-mono text-xs text-text-dim">{media.meta}</span>}
        </figcaption>
      )}
    </figure>
  );
}

// Column counts that always fill complete rows, so no empty cells show.
const FACT_COLUMNS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
};

/** Key–value facts in the same bordered cell grid used for stats elsewhere on the site. */
export function FactGrid({ facts }: { facts: ProjectFact[] }) {
  const columns = FACT_COLUMNS[facts.length] ?? 'grid-cols-2 sm:grid-cols-3';
  return (
    <dl className={`grid gap-px overflow-hidden rounded-lg border border-border bg-border ${columns}`}>
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1 bg-surface p-5">
          <dt className="eyebrow text-text-dim">{fact.label}</dt>
          <dd className="text-sm font-medium text-cream">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
