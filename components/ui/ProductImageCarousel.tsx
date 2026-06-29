'use client';

import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
} from 'lucide-react';
import { ProductImagePair } from '@/utils/productAssets';
import { ProgressiveImage } from './ProgressiveImage';

interface ProductImageCarouselProps {
  images: ProductImagePair[];
  productName: string;
}

const NAV_BUTTON_SIZE = 40;

export function ProductImageCarousel({ images, productName }: ProductImageCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);

  const slides = useMemo(() => {
    const source = images.filter((img) => img.thumbnail || img.full);
    if (source.length === 0) {
      return [{ thumbnail: '', full: '' }];
    }
    return source;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const canNavigate = slides.length > 1;
  const canEnlarge = Boolean(slides[activeIndex]?.full || slides[activeIndex]?.thumbnail);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const openZoom = useCallback(() => {
    if (slides[activeIndex]?.full || slides[activeIndex]?.thumbnail) {
      setIsZoomOpen(true);
    }
  }, [activeIndex, slides]);

  const closeZoom = useCallback(() => {
    setIsZoomOpen(false);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isZoomOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeZoom();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      } else if (e.key === 'ArrowRight') {
        goNext();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isZoomOpen, closeZoom, goPrev, goNext]);

  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canNavigate) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const half = rect.width / 2;
    const radius = NAV_BUTTON_SIZE / 2;

    setCursorPos({
      x: Math.max(radius, Math.min(x, rect.width - radius)),
      y: Math.max(radius, Math.min(y, rect.height - radius)),
    });
    setHoverSide(x < half ? 'left' : 'right');
  };

  const handleViewportMouseLeave = () => {
    setCursorPos(null);
    setHoverSide(null);
  };

  const getButtonStyle = (side: 'left' | 'right'): React.CSSProperties | undefined => {
    if (!cursorPos || !viewportRef.current) return undefined;

    const { width, height } = viewportRef.current.getBoundingClientRect();
    const half = width / 2;
    const radius = NAV_BUTTON_SIZE / 2;

    const x =
      side === 'left'
        ? Math.max(radius, Math.min(cursorPos.x, half - radius))
        : Math.max(half + radius, Math.min(cursorPos.x, width - radius));

    const y = Math.max(radius, Math.min(cursorPos.y, height - radius));

    return {
      left: x,
      top: y,
      transform: 'translate(-50%, -50%)',
    };
  };

  const activeSlide = slides[activeIndex];

  const lightbox =
    isZoomOpen && isMounted
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${productName} enlarged view`}
            className="fixed inset-0 z-200 bg-void/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
            onClick={closeZoom}
          >
            <button
              type="button"
              onClick={closeZoom}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors cursor-pointer z-10"
              aria-label="Close enlarged view"
            >
              <X className="w-5 h-5" />
            </button>

            {canNavigate && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors cursor-pointer shadow-lg backdrop-blur-sm z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors cursor-pointer shadow-lg backdrop-blur-sm z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-text-dim bg-surface/80 border border-border/60 px-3 py-1.5 rounded-[1px] backdrop-blur-sm pointer-events-none z-10">
              {activeIndex + 1} / {slides.length}
            </span>

            <ProgressiveImage
              thumbnailSrc={activeSlide.thumbnail}
              fullSrc={activeSlide.full}
              alt={`${productName} — enlarged`}
              loading="eager"
              className="max-h-[85vh] max-w-[min(90vw,1200px)] object-contain select-none"
            />
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex gap-3 md:gap-4">
        <div className="flex flex-col gap-2 md:gap-2.5 shrink-0">
          {slides.map((slide, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-14 h-14 md:w-16 md:h-16 border rounded-[2px] overflow-hidden cursor-pointer transition-all duration-300 p-1.5 bg-surface-alt ${
                activeIndex === index
                  ? 'border-gold shadow-[0_0_0_1px_var(--color-gold)]'
                  : 'border-border hover:border-border-mid'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <ProgressiveImage
                thumbnailSrc={slide.thumbnail}
                fullSrc={slide.full}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain object-center"
              />
            </button>
          ))}
        </div>

        <div
          ref={viewportRef}
          onMouseMove={handleViewportMouseMove}
          onMouseLeave={handleViewportMouseLeave}
          className="group relative flex-1 aspect-square border border-border rounded-[2px] overflow-hidden bg-surface-alt"
        >
          <button
            type="button"
            onClick={openZoom}
            disabled={!canEnlarge}
            className="absolute inset-0 flex items-center justify-center p-6 md:p-10 cursor-zoom-in disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-inset"
            aria-label={`Enlarge ${productName} image`}
          >
            <ProgressiveImage
              thumbnailSrc={activeSlide.thumbnail}
              fullSrc={activeSlide.full}
              alt={productName}
              loading="eager"
              className="max-h-full max-w-full h-auto w-auto object-contain object-center transition-transform duration-700 ease-out-expo group-hover:scale-[1.02] pointer-events-none"
            />
          </button>

          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              style={getButtonStyle('left')}
              className={`absolute z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream transition-opacity duration-200 hover:border-gold hover:text-gold cursor-pointer shadow-lg backdrop-blur-sm ${
                hoverSide === 'left' && cursorPos ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              style={getButtonStyle('right')}
              className={`absolute z-10 w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream transition-opacity duration-200 hover:border-gold hover:text-gold cursor-pointer shadow-lg backdrop-blur-sm ${
                hoverSide === 'right' && cursorPos ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openZoom();
            }}
            disabled={!canEnlarge}
            className="absolute bottom-3 right-3 z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors duration-300 cursor-pointer shadow-lg backdrop-blur-sm disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Enlarge image"
            title="Enlarge image"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <span className="absolute bottom-3 left-3 z-20 font-mono text-[9px] uppercase tracking-widest text-text-ghost bg-surface/80 border border-border/60 px-2 py-1 rounded-[1px] backdrop-blur-sm pointer-events-none">
            {activeIndex + 1} / {slides.length}
          </span>
        </div>
      </div>

      {lightbox}
    </div>
  );
}
