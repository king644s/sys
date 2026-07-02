'use client';

import { useCallback, useRef, useState } from 'react';
import { MoveHorizontal, RotateCcw } from 'lucide-react';

export interface TripleCompareImage {
  src: string;
  label: string;
  alt: string;
}

interface TripleImageCompareProps {
  images: TripleCompareImage[];
  className?: string;
}

const MIN_GAP = 10;
const DEFAULT_DIVIDERS: [number, number] = [33, 66];
const PRESETS = {
  first: [82, 92],
  second: [8, 92],
  third: [8, 18],
} as const satisfies Record<string, [number, number]>;

type ComparePreset = keyof typeof PRESETS;
const DIVIDER_MOTION_CLASS =
  'transition-[left] duration-700 ease-luxury motion-reduce:transition-none';
const CLIP_MOTION_CLASS =
  'transition-[clip-path] duration-700 ease-luxury motion-reduce:transition-none';
const LABEL_MOTION_CLASS =
  'transition-[left,max-width] duration-700 ease-luxury motion-reduce:transition-none';
const PRIMARY_BUTTON_CLASS =
  'inline-flex items-center justify-center rounded-[2px] border border-gold-muted bg-gold px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-cream transition-all duration-300 hover:bg-gold-light hover:border-gold-light';
const RESET_BUTTON_CLASS =
  'inline-flex items-center gap-2 rounded-[2px] border border-border bg-surface px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-text-dim transition-all duration-300 hover:border-border-mid hover:text-cream disabled:cursor-default disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-dim';

function getActivePreset(dividers: [number, number]): ComparePreset | null {
  if (dividers[0] === PRESETS.first[0] && dividers[1] === PRESETS.first[1]) return 'first';
  if (dividers[0] === PRESETS.second[0] && dividers[1] === PRESETS.second[1]) return 'second';
  if (dividers[0] === PRESETS.third[0] && dividers[1] === PRESETS.third[1]) return 'third';
  return null;
}

function primaryButtonClass(isActive: boolean) {
  return isActive
    ? `${PRIMARY_BUTTON_CLASS} bg-gold-light border-gold-light`
    : PRIMARY_BUTTON_CLASS;
}

function clampDividers(next: [number, number]): [number, number] {
  const [a, b] = next;
  const p0 = Math.max(8, Math.min(a, b - MIN_GAP));
  const p1 = Math.max(p0 + MIN_GAP, Math.min(b, 92));
  return [p0, p1];
}

export function TripleImageCompare({ images, className = '' }: TripleImageCompareProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dividers, setDividers] = useState<[number, number]>([...DEFAULT_DIVIDERS]);
  const [isDragging, setIsDragging] = useState(false);
  const positions = [dividers[0], dividers[1], 100] as const;
  const activePreset = getActivePreset(dividers);
  const isDefault =
    dividers[0] === DEFAULT_DIVIDERS[0] && dividers[1] === DEFAULT_DIVIDERS[1];
  const shouldAnimateDividers = !isDragging;

  const applyPreset = (preset: ComparePreset) => {
    setDividers([...PRESETS[preset]]);
  };

  const resetDividers = () => setDividers([...DEFAULT_DIVIDERS]);
  const updateFromClientX = useCallback((index: number, clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;

    setDividers((prev) => {
      const next: [number, number] = [...prev];
      next[index] = pct;
      return clampDividers(next);
    });
  }, []);

  const startDrag = (index: number) => (event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);
    setIsDragging(true);

    const onMove = (moveEvent: PointerEvent) => {
      updateFromClientX(index, moveEvent.clientX);
    };

    const onUp = () => {
      handle.releasePointerCapture(event.pointerId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      setIsDragging(false);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleRangeChange = (index: number, value: number) => {
    setDividers((prev) => {
      const next: [number, number] = [...prev];
      next[index] = value;
      return clampDividers(next);
    });
  };

  if (images.length !== 3) return null;

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset('first')}
            className={primaryButtonClass(activePreset === 'first')}
            aria-pressed={activePreset === 'first'}
            aria-label={`Show ${images[0].label} full width`}
          >
            button 1
          </button>
          <button
            type="button"
            onClick={() => applyPreset('second')}
            className={primaryButtonClass(activePreset === 'second')}
            aria-pressed={activePreset === 'second'}
            aria-label={`Show ${images[1].label} full width`}
          >
            button 2
          </button>
          <button
            type="button"
            onClick={() => applyPreset('third')}
            className={primaryButtonClass(activePreset === 'third')}
            aria-pressed={activePreset === 'third'}
            aria-label={`Show ${images[2].label} full width`}
          >
            button 3
          </button>
        </div>

        <button
          type="button"
          onClick={resetDividers}
          disabled={isDefault}
          className={RESET_BUTTON_CLASS}
          aria-label="Reset image divider positions"
        >
          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
          Reset
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full aspect-video overflow-hidden border border-border rounded-[2px] bg-surface select-none touch-none"
      >
      {/* Three side-by-side segments — always fills full width */}
      {images.map((image, index) => {
        const left = index === 0 ? 0 : positions[index - 1];
        const right = positions[index];

        return (
          <div
            key={image.src}
            className={`absolute inset-0 ${shouldAnimateDividers ? CLIP_MOTION_CLASS : ''}`}
            style={{ clipPath: `inset(0 ${100 - right}% 0 ${left}%)` }}
            aria-hidden="true"
          >
            <img
              src={image.src}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        );
      })}

      {/* Segment labels */}
      {images.map((image, index) => {
        const left = index === 0 ? 0 : positions[index - 1];
        const right = positions[index];
        const width = right - left;
        if (width < 12) return null;

        return (
          <span
            key={`label-${image.label}`}
            className={`pointer-events-none absolute top-3 z-[1] rounded-[1px] bg-void/75 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-cream backdrop-blur-sm ${shouldAnimateDividers ? LABEL_MOTION_CLASS : ''}`}
            style={{ left: `calc(${left}% + 8px)`, maxWidth: `calc(${width}% - 16px)` }}
          >
            {image.label}
          </span>
        );
      })}

      {/* Two dividers between three full-width segments */}
      {dividers.map((pos, index) => (
        <div
          key={`handle-${index}`}
          className={`absolute inset-y-0 z-[2] ${shouldAnimateDividers ? DIVIDER_MOTION_CLASS : ''}`}
          style={{ left: `${pos}%` }}
        >
          <div
            className="pointer-events-none absolute inset-y-0 -left-px w-px bg-cream/90 shadow-[0_0_12px_rgba(0,0,0,0.35)]"
            aria-hidden="true"
          />
          <div
            role="slider"
            aria-label={`Adjust boundary for ${images[index].label}`}
            aria-valuemin={index === 0 ? 8 : dividers[0] + MIN_GAP}
            aria-valuemax={index === 0 ? dividers[1] - MIN_GAP : 92}
            aria-valuenow={Math.round(pos)}
            tabIndex={0}
            onPointerDown={startDrag(index)}
            className="absolute top-1/2 left-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            <MoveHorizontal className="h-4 w-4 text-gold" strokeWidth={1.5} />
          </div>
        </div>
      ))}

      {/* Keyboard-accessible range inputs (visually hidden) */}
      {dividers.map((pos, index) => (
        <input
          key={`range-${index}`}
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => handleRangeChange(index, Number(e.target.value))}
          className="sr-only"
          aria-label={`Slider for ${images[index].label}`}
        />
      ))}

      <span className="sr-only">
        {images.map((image) => image.alt).join('. ')}
      </span>
      </div>
    </div>
  );
}
