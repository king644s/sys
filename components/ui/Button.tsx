'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold-outline' | 'inverse';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-[13px] gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-6 text-[15px] gap-2',
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-gold text-on-accent border border-gold hover:bg-gold-light hover:border-gold-light shadow-subtle',
  secondary:
    'bg-surface text-cream border border-border-mid hover:border-border-high hover:bg-surface-alt',
  ghost: 'text-cream border border-transparent hover:bg-surface-alt',
  'gold-outline':
    'bg-transparent text-gold border border-gold/40 hover:border-gold hover:bg-accent-soft',
  inverse: 'bg-white text-[#111114] border border-white hover:bg-white/90',
};

export function buttonClasses(
  variant: ButtonVariant = 'secondary',
  size: ButtonSize = 'md',
  className = '',
) {
  return [
    'inline-flex items-center justify-center rounded-sm font-sans font-semibold whitespace-nowrap',
    'transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-luxury',
    'active:translate-y-px disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  ].join(' ');
}

export function Button({
  children,
  variant = 'secondary',
  size = 'md',
  className = '',
  href,
  external = false,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const classes = buttonClasses(variant, size, className);

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} onClick={onClick} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
