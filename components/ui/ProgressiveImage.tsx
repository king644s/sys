'use client';

import { useEffect, useState } from 'react';

interface ProgressiveImageProps {
  thumbnailSrc: string;
  fullSrc: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  onLoad?: () => void;
}

export function ProgressiveImage({
  thumbnailSrc,
  fullSrc,
  alt,
  className = '',
  loading = 'lazy',
  onLoad,
}: ProgressiveImageProps) {
  const [displaySrc, setDisplaySrc] = useState(thumbnailSrc || fullSrc);
  const [isHighResLoaded, setIsHighResLoaded] = useState(thumbnailSrc === fullSrc);

  useEffect(() => {
    setDisplaySrc(thumbnailSrc || fullSrc);
    setIsHighResLoaded(thumbnailSrc === fullSrc || !fullSrc);
  }, [thumbnailSrc, fullSrc]);

  useEffect(() => {
    if (!fullSrc || fullSrc === thumbnailSrc || isHighResLoaded) return;

    const img = new Image();
    img.onload = () => {
      setDisplaySrc(fullSrc);
      setIsHighResLoaded(true);
      onLoad?.();
    };
    img.src = fullSrc;

    return () => {
      img.onload = null;
    };
  }, [fullSrc, thumbnailSrc, isHighResLoaded, onLoad]);

  return (
    <img
      src={displaySrc}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      className={`${className}${isHighResLoaded ? '' : ' blur-[0.5px]'}`}
      draggable={false}
    />
  );
}
