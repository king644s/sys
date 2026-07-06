# SYSLight Design Tokens
**Version 1.0 · globals.css @theme reference · July 2026**

> This document is the complete token reference for `globals.css`. Every token defined here maps to a CSS custom property. Use tokens — never hardcode values.

---

## How Tokens Work in This Project

This project uses **Tailwind CSS v4** with `@theme` for token injection. Tokens defined in `@theme` become Tailwind utility classes automatically.

```css
/* In globals.css */
@theme {
  --color-gold: #6A67CC;
}
/* Becomes available as: */
/* text-gold, bg-gold, border-gold, etc. */
```

For tokens not in `@theme` (spacing, typography scale), use them as CSS variables:
```css
font-size: var(--text-body-md);
```

---

## Color Tokens

### Dark Mode (Default)

```css
/* ── Backgrounds ─────────────────────────────────── */
--color-void:          #010101;    /* Primary page background */
--color-void-dark:     #000000;    /* Pure black (video overlays) */
--color-surface:       #0D0C15;    /* Card, nav background */
--color-surface-alt:   #141321;    /* Elevated surface */
--color-surface-high:  #1C1B2C;    /* Highest surface level */

/* ── Text ────────────────────────────────────────── */
--color-cream:         #E5E5E6;    /* Primary text */
--color-text-dim:      #9B99BB;    /* Secondary text (5.2:1 on void ✅) */
--color-text-ghost:    #7D7B9B;    /* Decorative only — raised for contrast */

/* ── Brand / Accent ──────────────────────────────── */
--color-gold:          #6A67CC;    /* Primary brand accent */
--color-gold-light:    #8F8DF0;    /* Hover state */
--color-gold-muted:    #413F8C;    /* Subtle gold tint */
--color-gold-dark:     #3A389F;    /* Pressed state */

/* ── Borders ─────────────────────────────────────── */
--color-border:        #201F33;    /* Default separator */
--color-border-mid:    #2E2D4A;    /* Stronger separator */
--color-border-high:   #3C3A5E;    /* Maximum border emphasis */
```

### Light Mode (`.light` or `[data-mode="light"]`)

```css
--color-void:          #FFFFFF;
--color-void-dark:     #F5F5F7;
--color-surface:       #FFFFFF;
--color-surface-alt:   #F5F5F7;
--color-surface-high:  #EBEBEF;
--color-cream:         #010101;
--color-text-dim:      #4B4B5E;    /* 7.1:1 on white ✅ */
--color-text-ghost:    #767589;    /* 4.6:1 on white ✅ (raised from #8E8D9F) */
--color-gold:          #4D4A9D;    /* Brand on light */
--color-gold-light:    #6C69C1;
--color-gold-muted:    #333175;
--color-gold-dark:     #3A389F;
--color-border:        #E5E5E6;
--color-border-mid:    #CCCCCC;
--color-border-high:   #B0AFCC;
```

### Semantic Color Map

| Token | Meaning | Dark | Light |
|-------|---------|------|-------|
| `void` | Page background | #010101 | #FFFFFF |
| `surface` | Card/nav bg | #0D0C15 | #FFFFFF |
| `surface-alt` | Raised surface | #141321 | #F5F5F7 |
| `cream` | Primary text | #E5E5E6 | #010101 |
| `text-dim` | Secondary text | #9B99BB | #4B4B5E |
| `text-ghost` | Decorative | #7D7B9B | #767589 |
| `gold` | Brand accent | #6A67CC | #4D4A9D |
| `gold-light` | Hover | #8F8DF0 | #6C69C1 |
| `gold-muted` | Subtle | #413F8C | #333175 |
| `border` | Default border | #201F33 | #E5E5E6 |

---

## Typography Tokens

```css
/* ── Type Scale ──────────────────────────────────── */
--text-display-xxl: 6rem;          /* 96px — Home hero H1 lg: */
--text-display-xl:  4.5rem;        /* 72px — Inner hero H1 md: */
--text-display:     3.75rem;       /* 60px — Inner hero H1 base md: */
--text-h1:          3rem;          /* 48px — Page H1 */
--text-h2:          2.5rem;        /* 40px — Section heading md: */
--text-h2-sm:       1.75rem;       /* 28px — Section heading mobile */
--text-h3:          1.25rem;       /* 20px — Card titles */
--text-h4:          1.125rem;      /* 18px — Accordion, sub-titles */
--text-h5:          1rem;          /* 16px — Small headers */
--text-h6:          0.875rem;      /* 14px — Micro headers */
--text-subtitle-lg: 1.125rem;      /* 18px — Large subtitles */
--text-subtitle-md: 1rem;          /* 16px — Standard subtitle */
--text-subtitle-sm: 0.875rem;      /* 14px — Small subtitle */
--text-body-lg:     1rem;          /* 16px — Long-form */
--text-body-md:     0.875rem;      /* 14px — Primary body copy */
--text-body-sm:     0.8125rem;     /* 13px — Supporting body */
--text-caption:     0.75rem;       /* 12px — Captions, footnotes */
--text-label:       0.6875rem;     /* 11px — Minimum. Labels, overlines */

/* ── Line Heights ────────────────────────────────── */
--lh-display:    1.0;
--lh-hero:       1.05;
--lh-heading:    1.15;
--lh-subheading: 1.3;
--lh-body:       1.65;
--lh-ui:         1.4;
--lh-caption:    1.5;
--lh-label:      1.3;

/* ── Letter Spacing ──────────────────────────────── */
--tracking-tight:    -0.025em;   /* Display headings */
--tracking-snug:     -0.01em;    /* H2 headings */
--tracking-normal:    0em;       /* Body, H3+ */
--tracking-label:     0.15em;    /* Labels, buttons, badges */
--tracking-overline:  0.25em;    /* Section overlines */
--tracking-widest:    0.35em;    /* Special decorative labels */
```

---

## Spacing Tokens

```css
/* ── 8px Base Grid ───────────────────────────────── */
/* Note: These supplement Tailwind's default scale */

/* ── Gap / Layout Tokens ─────────────────────────── */
--gap-micro:    4px;     /* gap-1  — Icon+text, inline elements */
--gap-tight:    8px;     /* gap-2  — List items, tags */
--gap-compact:  12px;    /* gap-3  — Form field→label, card items */
--gap-default:  16px;    /* gap-4  — Standard element gap */
--gap-card:     20px;    /* gap-5  — Card content items */
--gap-section:  24px;    /* gap-6  — Default grid gap */
--gap-feature:  32px;    /* gap-8  — Feature item gap */
--gap-large:    48px;    /* gap-12 — Section separator */

/* ── Vertical Rhythm ─────────────────────────────── */
--section-py-sm:  48px;   /* py-12 — Compact section */
--section-py-md:  64px;   /* py-16 — Standard section */
--section-py-lg:  80px;   /* py-20 — Full section */
--section-py-xl:  96px;   /* py-24 — Hero-adjacent */
--section-py-2xl: 112px;  /* py-28 — Showcase section */
```

---

## Border Radius Tokens

```css
/* ── Radius Scale ────────────────────────────────── */
--radius-none:    0;        /* Sharp-edged cards (legacy), inputs */
--radius-sm:      1px;      /* Product cards, buttons (brand: sharp) */
--radius-md:      2px;      /* Slight rounding (breadcrumb, badges) */
--radius-accent:  4px;      /* Accordion panels, small cards */
--radius-lg:      8px;      /* Medium-soft cards */
--radius-xl:      12px;     /* Soft cards */
--radius-2xl:     16px;     /* New showcase cards (rounded-2xl) */
--radius-full:    9999px;   /* Pills, icon circles, tags */
```

### Radius Decision Guide
The brand is architecturally sharp — prefer `radius-sm` (1px) and `radius-md` (2px) for product components. Use `radius-2xl` (16px) only for the newer showcase-style components (ControlModes, SmartSolutions). Never mix both on the same card type.

---

## Elevation Tokens (Box Shadows)

```css
/* ── Shadows ─────────────────────────────────────── */
--shadow-none:    none;
--shadow-subtle:  0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
--shadow-card:    0 4px 16px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04);
--shadow-hover:   0 12px 30px -10px rgba(77,74,157,0.18);
--shadow-lifted:  0 20px 48px -12px rgba(77,74,157,0.28);
--shadow-float:   0 24px 64px -16px rgba(77,74,157,0.35);
--shadow-glow-sm: 0 0 16px rgba(106,103,204,0.3);
--shadow-glow:    0 0 45px rgba(106,103,204,0.15), 0 0 90px rgba(106,103,204,0.08);
--shadow-glow-lg: 0 0 90px rgba(106,103,204,0.25), 0 0 180px rgba(106,103,204,0.12);
--shadow-inner:   inset 0 1px 3px rgba(0,0,0,0.15);
```

### Elevation Usage Guide
| Shadow | When to Use |
|--------|-------------|
| `shadow-none` | Flat surfaces, table rows |
| `shadow-subtle` | Resting card state |
| `shadow-card` | Prominent cards (light mode) |
| `shadow-hover` | Card hover state (default gold-tinted) |
| `shadow-lifted` | Active/selected card state |
| `shadow-glow` | Brand orb, hero elements |
| `shadow-glow-sm` | Icon badges, gold circles |

---

## Border Tokens

```css
/* ── Border Widths ───────────────────────────────── */
--border-none:    0;
--border-thin:    1px;    /* Standard — border */
--border-medium:  2px;    /* Focus ring, emphasis */
--border-thick:   4px;    /* Decorative highlights */

/* Opacity modifiers (combine with border-color) */
/* Standard: border-border */
/* Muted:    border-border/50 or border-border/30 */
/* Accent:   border-gold/50 or border-gold/30 */
```

---

## Opacity Tokens

```css
/* ── Opacity Scale ───────────────────────────────── */
--opacity-hover-img:   0.70;   /* Image default state opacity */
--opacity-active-img:  0.95;   /* Image hover/active opacity */
--opacity-overlay:     0.85;   /* Dark overlays on images */
--opacity-disabled:    0.50;   /* Disabled element state */
--opacity-muted:       0.60;   /* Muted visual elements */
--opacity-ghost:       0.40;   /* Ghost/decorative elements */
```

---

## Container Width Tokens

```css
/* ── Container Widths ────────────────────────────── */
--container-max:     80rem;    /* 1280px — max-w-7xl */
--container-wide:    72rem;    /* 1152px — max-w-6xl */
--container-default: 64rem;    /* 1024px — max-w-5xl */
--container-narrow:  56rem;    /* 896px  — max-w-4xl */
--container-text:    42rem;    /* 672px  — max-w-2xl */
--container-reading: 36rem;    /* 576px  — max-w-xl */
```

---

## Grid Tokens

```css
/* ── Grid Definitions ────────────────────────────── */
--grid-cols-products:    repeat(1, 1fr);   /* Mobile */
--grid-cols-products-sm: repeat(2, 1fr);   /* Tablet */
--grid-cols-products-lg: repeat(4, 1fr);   /* Desktop */
--grid-cols-categories:  repeat(1, 1fr);   /* Mobile */
--grid-cols-categories-md: repeat(2, 1fr); /* Tablet */
--grid-cols-categories-lg: repeat(4, 1fr); /* Desktop */
--grid-cols-features:    repeat(1, 1fr);   /* Mobile */
--grid-cols-features-md: repeat(2, 1fr);   /* Tablet */
--grid-cols-features-lg: repeat(3, 1fr);   /* Desktop */
--grid-cols-footer:      repeat(1, 1fr);   /* Mobile */
--grid-cols-footer-sm:   repeat(2, 1fr);   /* Tablet */
--grid-cols-footer-lg:   repeat(4, 1fr);   /* Desktop */
```

---

## Animation Tokens

```css
/* ── Durations ───────────────────────────────────── */
--duration-instant:  100ms;   /* State feedback (toggle) */
--duration-fast:     200ms;   /* Color changes, opacity */
--duration-standard: 300ms;   /* Element movement */
--duration-medium:   500ms;   /* Reveal animations */
--duration-slow:     700ms;   /* Large motion, carousel */
--duration-luxury:   1000ms;  /* Full-page transitions */

/* ── Easing ──────────────────────────────────────── */
--ease-standard:   ease-out;                          /* Standard Tailwind */
--ease-luxury:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-in-back:    cubic-bezier(0.36, 0, 0.66, -0.56);
```

---

## Transition Tokens (Tailwind Reference)

| Transition | Apply with | Duration |
|------------|-----------|---------|
| Color change | `transition-colors duration-200` | 200ms |
| Transform only | `transition-transform duration-300` | 300ms |
| All (hover card) | `transition-all duration-500` | 500ms |
| Opacity fade | `transition-opacity duration-300` | 300ms |
| Grid reveal | `transition-[grid-template-rows] duration-500` | 500ms |

---

## Icon Size Tokens

```css
/* ── Icon Sizes ──────────────────────────────────── */
--icon-xs:   12px;  /* w-3 h-3   — Inline decorative */
--icon-sm:   14px;  /* w-3.5 h-3.5 — Breadcrumb, button companion */
--icon-md:   16px;  /* w-4 h-4   — Standard UI icon */
--icon-lg:   18px;  /* w-4.5 h-4.5 — Feature icon (not a Tailwind class) */
--icon-xl:   20px;  /* w-5 h-5   — Card feature icon */
--icon-2xl:  24px;  /* w-6 h-6   — Section icon */
--icon-3xl:  32px;  /* w-8 h-8   — Large accent icon */
--icon-hero: 40px;  /* w-10 h-10 — Hero/CTA icon */
```

---

## Button Size Tokens

```css
/* ── Button Heights ──────────────────────────────── */
--btn-height-sm:    36px;  /* h-9  — Compact (filters, chips) */
--btn-height-md:    44px;  /* h-11 — Standard (meets touch target) */
--btn-height-lg:    48px;  /* h-12 — Prominent CTAs */
--btn-height-xl:    56px;  /* h-14 — Hero CTAs */

/* ── Button Padding ──────────────────────────────── */
--btn-px-sm:  16px;  /* px-4 — Compact */
--btn-px-md:  24px;  /* px-6 — Standard */
--btn-px-lg:  32px;  /* px-8 — Prominent */
```

---

## Input Height Tokens

```css
--input-height-sm:   36px;  /* Short fields (filter inputs) */
--input-height-md:   44px;  /* Standard form fields (accessibility min) */
--input-height-lg:   52px;  /* Prominent inputs */
--textarea-rows-min:  4;    /* Minimum rows for textarea */
```

---

## Table Row Height Tokens

```css
--table-row-compact:  36px;  /* Dense data tables */
--table-row-default:  44px;  /* Standard rows (py-3.5) */
--table-row-relaxed:  52px;  /* Specification tables */
--table-header-height: 44px; /* Header row */
```

---

## Card Padding Tokens

```css
--card-padding-xs:    12px;  /* p-3  — Compact chip card */
--card-padding-sm:    16px;  /* p-4  — Tight card */
--card-padding-md:    20px;  /* p-5  — Default card info area */
--card-padding-lg:    24px;  /* p-6  — Standard card */
--card-padding-xl:    32px;  /* p-8  — Premium card */
--card-padding-2xl:   40px;  /* p-10 — Feature/showcase card */
```

---

## Section Padding Tokens

```css
--section-padding-xs:  py-8   (32px)   /* Tight section */
--section-padding-sm:  py-12  (48px)   /* Compact section */
--section-padding-md:  py-16  (64px)   /* Standard section */
--section-padding-lg:  py-20  (80px)   /* Full section */
--section-padding-xl:  py-24  (96px)   /* Hero-adjacent */
--section-padding-2xl: py-28  (112px)  /* Showcase section */
```

---

## Z-Index Tokens

```css
/* ── Z-Index Scale ───────────────────────────────── */
--z-base:     0;
--z-raised:   10;   /* Sticky breadcrumbs */
--z-float:    20;   /* Back-to-top, tooltips */
--z-dropdown: 30;   /* Dropdown menus */
--z-modal:    40;   /* Modals, drawers */
--z-navbar:   50;   /* Sticky navbar */
--z-overlay:  60;   /* Full-screen overlays */
```

---

*Design Tokens v1.0 · SYSLight Design System · July 2026*
