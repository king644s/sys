'use client';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Logo({
  className = '',
  size = 'md',
}: LogoProps) {
  const heights = {
    sm: 'h-6',
    md: 'h-10',
    lg: 'h-16',
    xl: 'h-24',
  };

  return (
    <img
      src="/logo-website.png"
      alt="SYSlight by Systems Creator"
      className={`${heights[size]} w-auto object-contain select-none ${className}`}
    />
  );
}
