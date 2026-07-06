'use client';

import Link from 'next/link';
import React, { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold-outline';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'secondary',
  className = '',
  href,
  onClick,
  disabled = false,
  type = 'button',
}: ButtonProps) {
  const baseClasses =
    'px-6 py-3.5 tracking-[0.15em] uppercase text-[11px] font-mono font-bold transition-all duration-300 ease-luxury focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 cursor-pointer rounded-sm inline-flex items-center justify-center gap-2';

  const variantClasses = {
    primary:
      'bg-gold text-white border border-gold hover:bg-gold-light hover:border-gold-light hover:-translate-y-0.5 active:translate-y-0 shadow-card hover:shadow-hover',
    secondary:
      'border border-border text-cream hover:bg-surface-alt hover:border-border-mid active:bg-surface-alt',
    ghost:
      'border-transparent text-cream/75 hover:text-gold hover:underline underline-offset-4 decoration-gold/50',
    'gold-outline':
      'border border-gold text-gold hover:bg-gold hover:text-white hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
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
