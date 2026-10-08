'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Loader2, X, ZoomIn } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { ProgressiveImage } from './ProgressiveImage';

const THUMBNAIL_SRC = '/about-us/syslight-experience-center-thumbnail.webp';
const HIGHRES_SRC = '/about-us/syslight-experience-center-highres.jpg';
const ALT = 'SYSlight Experience Center in Goregaon West, Mumbai';

type UpgradeStatus = 'idle' | 'loading' | 'ready';

export function ExperienceCenterPhoto() {
  const lenis = useLenis();
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [upgradeStatus, setUpgradeStatus] = useState<UpgradeStatus>('idle');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openLightbox = useCallback(() => {
    setUpgradeStatus('loading');
    setIsOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setUpgradeStatus('idle');
  }, []);

  const handleHighResReady = useCallback(() => {
    setUpgradeStatus('ready');
  }, []);

  useEffect(() => {
    if (upgradeStatus !== 'ready') return;
    const timer = window.setTimeout(() => setUpgradeStatus('idle'), 3200);
    return () => window.clearTimeout(timer);
  }, [upgradeStatus]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };

    document.body.style.overflow = 'hidden';
    lenis?.stop();
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = '';
      lenis?.start();
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, closeLightbox, lenis]);

  const lightbox =
    isOpen && isMounted
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Experience Center photo"
            className="fixed inset-0 z-200 bg-void/95 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center text-cream hover:border-gold hover:text-gold transition-colors cursor-pointer z-10"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-h-[85vh] max-w-[min(90vw,1200px)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ProgressiveImage
                thumbnailSrc={THUMBNAIL_SRC}
                fullSrc={HIGHRES_SRC}
                alt={`${ALT} — enlarged`}
                loading="eager"
                onLoad={handleHighResReady}
                className="max-h-[85vh] max-w-[min(90vw,1200px)] object-contain select-none"
              />
            </div>

            {upgradeStatus !== 'idle' ? (
              <div
                role="status"
                aria-live="polite"
                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3 bg-surface/90 border border-border px-4 py-3 backdrop-blur-sm max-w-[min(90vw,420px)]"
              >
                {upgradeStatus === 'loading' ? (
                  <Loader2 className="w-4 h-4 text-gold shrink-0 animate-spin" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                )}
                <div className="flex flex-col gap-0.5">
                  <span className="eyebrow">
                    {upgradeStatus === 'loading'
                      ? 'Loading high resolution'
                      : 'High resolution ready'}
                  </span>
                  <span className="font-sans text-xs text-text-dim leading-snug">
                    {upgradeStatus === 'loading'
                      ? 'Showing a lighter preview first to save data on your network.'
                      : 'The sharper image is now in view.'}
                  </span>
                </div>
              </div>
            ) : null}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        type="button"
        onClick={openLightbox}
        className="group relative w-full flex-1 min-h-60 overflow-hidden border border-border bg-surface cursor-zoom-in mb-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
        aria-label="View Experience Center photo"
      >
        <img
          src={THUMBNAIL_SRC}
          alt={ALT}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
        />
        <span className="absolute inset-0 bg-void/20 group-hover:bg-void/10 transition-colors duration-500" />
        <span className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-surface/95 border border-border flex items-center justify-center text-cream group-hover:border-gold group-hover:text-gold transition-colors shadow-lg backdrop-blur-sm">
          <ZoomIn className="w-4 h-4" />
        </span>
      </button>
      {lightbox}
    </>
  );
}
