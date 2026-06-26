'use client';

import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterCompareProps {
  image: string;
  alt: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
}

export function BeforeAfterCompare({
  image,
  alt,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialPosition = 50,
  className = '',
}: BeforeAfterCompareProps) {
  const [position, setPosition] = useState(initialPosition);

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden border border-border rounded-[2px] bg-surface select-none ${className}`}
      style={{ '--pos': `${position}%` } as React.CSSProperties}
    >
      {/* After — full tunable lighting */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Before — cool / flat conventional lighting simulation */}
      <div
        className="absolute inset-0"
        style={{ clipPath: 'inset(0 calc(100% - var(--pos)) 0 0)' }}
        aria-hidden="true"
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          style={{
            filter: 'brightness(0.58) saturate(0.42) contrast(1.05) hue-rotate(12deg)',
          }}
          draggable={false}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#1a2030]/25 mix-blend-multiply" />
      </div>

      {/* Divider line + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-[2] w-px bg-cream/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
        style={{ left: 'var(--pos)' }}
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <MoveHorizontal className="h-4 w-4 text-gold" strokeWidth={1.5} />
        </div>
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute top-3 left-3 z-[1] rounded-[1px] bg-void/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 z-[1] rounded-[1px] bg-void/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Invisible range slider for drag + keyboard control */}
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 z-[3] h-full w-full cursor-ew-resize opacity-0"
        aria-label={`Compare ${beforeLabel} and ${afterLabel}`}
      />

      <span className="sr-only">{alt}</span>
    </div>
  );
}
