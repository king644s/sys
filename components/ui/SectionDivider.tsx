'use client';

interface SectionDividerProps {
  label?: string;
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 flex items-center justify-center gap-6 opacity-60">
      <div className="h-[1px] flex-1 bg-border" />
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-dim">
          {`\\ ${label} \\`}
        </span>
      )}
      <div className="h-[1px] flex-1 bg-border" />
    </div>
  );
}
