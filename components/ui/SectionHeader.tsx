import { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
  className?: string;
}

/**
 * The single section-heading pattern used across the site:
 * eyebrow → title → optional description, with an optional action on the right.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  as = 'h2',
  className = '',
}: SectionHeaderProps) {
  const Heading = as;
  const centered = align === 'center';

  return (
    <div
      className={`flex flex-col gap-6 mb-10 md:mb-14 ${
        centered ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'
      } ${className}`}
    >
      <div className={`flex flex-col gap-3 ${centered ? 'items-center max-w-2xl' : 'max-w-2xl'}`}>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Heading className={as === 'h1' ? 'heading-1' : 'heading-2'}>{title}</Heading>
        {description && <p className="lead max-w-xl">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
