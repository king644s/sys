# SYSLight Typography System
**Version 1.0 · Single Source of Truth · July 2026**

> No typography may exist outside this document. Every font size, weight, line height, tracking value, and text transform used anywhere in the codebase must map to a token defined here.

---

## Font Families

### The Trinity (Default Theme)

```css
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-sans:  "DM Sans", system-ui, sans-serif;
--font-mono:  "Space Mono", "Courier New", monospace;
```

| Family | Role | Character |
|--------|------|-----------|
| **Cormorant Garamond** | Display, headings, quotes | Emotion, heritage, architectural elegance |
| **DM Sans** | Body, UI, forms, navigation | Functional clarity, modern readability |
| **Space Mono** | Labels, codes, specs, metadata | Technical precision, product authority |

### Azo Theme (Local Fonts)
```css
--font-serif: "Enra Sans", "Azo Sans", sans-serif;
--font-sans:  "Azo Sans", sans-serif;
--font-mono:  "Azo Sans", monospace;
```

### Editorial Theme
```css
--font-serif: "Playfair Display", Georgia, serif;
--font-sans:  "Raleway", sans-serif;
--font-mono:  "Fira Code", monospace;
```

---

## The Minimum Size Rule

> **11px is the absolute minimum for any text rendered to the screen.**
> This applies to all themes, all modes, all components, all states.
> No exceptions. No overrides. No "it's just metadata."

---

## Type Scale

### Display Scale — Cormorant Garamond (Serif)

| Token | px | rem | Line Height | Weight | Tracking | Usage |
|-------|----|-----|-------------|--------|---------|-------|
| `display-xxl` | 96px | 6rem | 1.0 | 300 | -0.03em | Home hero H1 (lg:) only |
| `display-xl` | 72px | 4.5rem | 1.0 | 300 | -0.02em | Inner page H1 (md:) |
| `display` | 60px | 3.75rem | 1.05 | 300 | -0.02em | Inner page H1 (base md:) |
| `h1` | 48px | 3rem | 1.1 | 300 | -0.02em | Page H1 (base, all pages) |
| `h2` | 40px | 2.5rem | 1.15 | 300 | -0.02em | Section headings (md:+) |
| `h2-sm` | 28px | 1.75rem | 1.2 | 300 | -0.01em | Section headings (mobile base) |
| `h3` | 20px | 1.25rem | 1.3 | 600 | 0 | Card titles, sub-section heads |
| `h4` | 18px | 1.125rem | 1.35 | 600 | 0 | Accordion headers, card sub-titles |
| `h5` | 16px | 1rem | 1.4 | 600 | 0 | Small section headers |
| `h6` | 14px | 0.875rem | 1.4 | 700 | 0 | Micro section headers |

**Rules for Serif Display Scale:**
- All H1 and H2 use `font-light` (300) — this is the signature
- All H3 and below use `font-semibold` (600) — normalized across all cards
- Italic `font-normal` (400) serif is used for accent words within headings (e.g. `<span class="italic font-serif text-gold">`)
- Never use `font-bold` (700) on H1/H2 in the default serif scale

---

### Functional Scale — DM Sans (Sans-Serif)

| Token | px | rem | Line Height | Weight | Usage |
|-------|----|-----|-------------|--------|-------|
| `subtitle-lg` | 18px | 1.125rem | 1.4 | 400 | Large intro subtitles |
| `subtitle-md` | 16px | 1rem | 1.45 | 400 | Standard subtitle, lead paragraph |
| `subtitle-sm` | 14px | 0.875rem | 1.5 | 400 | Small subtitle |
| `body-lg` | 16px | 1rem | 1.65 | 400 | Long-form content (future blog/docs) |
| `body-md` | **14px** | 0.875rem | 1.65 | 400 | **Primary body copy — all pages** |
| `body-sm` | 13px | 0.8125rem | 1.6 | 400 | Secondary/supporting body text |
| `caption` | 12px | 0.75rem | 1.5 | 400 | Image captions, supplementary notes |
| `ui-label` | 12px | 0.75rem | 1.3 | 500 | Form field values, table cell content |

**Rules for Sans Scale:**
- `body-md` (14px) is the default for all descriptive paragraphs — replaces previous `text-xs` (12px)
- Line height 1.65 is mandatory for all paragraph text (generous for spec-heavy reading)
- `body-sm` (13px) is for supporting context, never for primary product descriptions
- `caption` (12px) is for image labels and footnotes only

---

### Precision Scale — Space Mono (Monospace)

| Token | px | Tracking | Weight | Transform | Usage |
|-------|----|---------|--------|-----------|-------|
| `overline` | **11px** | 0.25em | 700 | UPPERCASE | Section labels (e.g. "01 / Portfolio") |
| `label` | **11px** | 0.15em | 700 | UPPERCASE | Form labels, table headers, nav labels |
| `badge` | **11px** | 0.15em | 700 | UPPERCASE | Product badges, status chips |
| `breadcrumb` | **11px** | 0.15em | 500 | UPPERCASE | Breadcrumb trail |
| `nav-link` | **11px** | 0.2em | 500 | UPPERCASE | Desktop navigation links |
| `meta` | **11px** | 0.1em | 600 | UPPERCASE | Metadata, product codes, spec values |
| `mono-sm` | **11px** | 0.08em | 400 | normal | Fine print, hints, secondary meta |

**Rules for Mono Scale:**
- The mono floor is **11px**. Never render mono text at 8px, 9px, or 10px.
- All mono UI labels are `UPPERCASE` (use CSS `text-transform: uppercase`, not HTML)
- Technical values (dimensions, wattages, codes) are mono but can be mixed-case
- Tracking 0.25em is for section overlines only — not general use

---

## Component Typography Reference

### Navigation

```
Nav Link:        font-mono, 11px, weight-500, UPPERCASE, tracking-[0.2em]
Nav Active:      font-mono, 11px, weight-700, UPPERCASE, tracking-[0.2em], text-cream
Nav CTA (border):font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em]
Nav CTA (filled):font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em]
Dropdown Header: font-mono, 11px, weight-700, UPPERCASE, tracking-[0.22em], text-ghost
Dropdown Link:   font-sans, 13px, weight-400, normal-case, tracking-wider
```

### Buttons

```
Button Primary:   font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em]
Button Secondary: font-mono, 11px, weight-600, UPPERCASE, tracking-[0.15em]
Button Ghost:     font-mono, 11px, weight-500, UPPERCASE, tracking-[0.1em]
Button Outline:   font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em]
```

### Forms

```
Label:           font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-dim
Input Text:      font-sans, 14px, weight-400, normal, text-cream
Placeholder:     font-sans, 14px, weight-400, normal, text-ghost (visual only)
Error Message:   font-sans, 12px, weight-500, normal, text-red-400
Helper Text:     font-mono, 11px, weight-400, normal, text-ghost
Select Text:     font-sans, 14px, weight-400, normal, text-cream
Textarea:        font-sans, 14px, weight-400, normal, text-cream, lh-1.65
```

### Cards

```
Card Overline:   font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-gold-muted
Card Title (H3): font-serif, 20px, weight-600, normal-case, lh-1.3
Card Subtitle:   font-sans, 13px, weight-400, normal, text-dim, lh-1.6
Card Body:       font-sans, 14px, weight-400, normal, text-dim, lh-1.65
Card Action:     font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-gold
```

### Tables

```
Table Header:    font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-dim
Table Cell:      font-mono, 12px, weight-400, normal, text-dim
Table Cell Key:  font-mono, 12px, weight-700, normal, text-gold
Table Caption:   font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-white (on gold-muted bg)
```

### Breadcrumbs

```
Breadcrumb Link: font-mono, 11px, weight-500, UPPERCASE, tracking-[0.15em], text-cream
Breadcrumb Sep:  ChevronRight icon, 14px, text-ghost/60
Breadcrumb Current: font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-gold
```

### Testimonials

```
Quote:           font-sans, 14px, weight-400, italic, text-dim, lh-1.65
Author Name:     font-sans, 14px, weight-600, normal, text-cream
Author Firm:     font-mono, 11px, weight-600, UPPERCASE, tracking-wider, text-gold
```

### Statistics / KPIs

```
Stat Number:     font-serif, 36px, weight-700, normal, text-gold
Stat Label:      font-mono, 11px, weight-700, UPPERCASE, tracking-widest, text-dim
```

### Modals / Drawers

```
Modal Title:     font-serif, 24px, weight-600, normal, text-cream
Modal Subtitle:  font-sans, 14px, weight-400, normal, text-dim
Modal Body:      font-sans, 14px, weight-400, normal, text-dim, lh-1.65
Drawer Title:    font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-gold
```

### Footer

```
Footer Heading:  font-sans, 11px, weight-700, UPPERCASE, tracking-[0.25em], text-cream
Footer Link:     font-sans, 13px, weight-400, normal, text-dim
Footer Tagline:  font-sans, 13px, weight-400, normal, text-ghost, lh-1.65
Footer Copyright:font-sans, 12px, weight-400, normal, text-ghost
```

### Empty States

```
Empty Title:     font-serif, 24px, weight-400, normal, text-cream
Empty Desc:      font-sans, 14px, weight-400, normal, text-dim, lh-1.65
Empty Action:    font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em], text-cream (on gold bg)
```

### Tooltips

```
Tooltip Text:    font-sans, 12px, weight-400, normal, text-cream
```

### Badges / Chips

```
Badge:           font-mono, 11px, weight-700, UPPERCASE, tracking-[0.15em]
Chip:            font-mono, 11px, weight-500, normal
```

---

## Section Overline Pattern

The section overline is used site-wide as a section marker (e.g. `01 / Portfolio`). The standard is:

```html
<span class="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-2 block">
  01 / Portfolio
</span>
```

**Always:**
- `font-mono`
- `text-[11px]` (11px — never 9px or 10px)
- `uppercase`
- `tracking-[0.25em]` (consolidated from 12 previous variations)
- `text-gold`
- `block` or `inline-block`
- Followed immediately by an `h2` or `h1`

---

## Heading with Accent Pattern

All major headings use an italic serif accent word in brand gold:

```html
<h2 class="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
  Architectural <span class="italic font-serif text-gold">Classifications</span>
</h2>
```

**Rules:**
- The accent span is always: `italic font-serif text-gold` (no additional weight)
- Maximum one accent word or phrase per heading
- The accent must be the most evocative word, not just any word
- Never put the entire heading in the accent color

---

## Anti-Patterns (Never Do)

| ❌ Forbidden | ✅ Correct |
|-------------|----------|
| `text-[8px]` | `text-[11px]` minimum |
| `text-[9px]` | `text-[11px]` |
| `text-[10px]` | `text-[11px]` |
| `tracking-[0.22em]` on overlines | `tracking-[0.25em]` |
| `tracking-[0.3em]` on overlines | `tracking-[0.25em]` |
| `font-bold` on H1/H2 | `font-light` |
| `font-semibold` on H3 product cards | `font-semibold` ✅ (this one is correct) |
| `text-xs` for body paragraphs | `text-sm` (14px) |
| `font-sans` for CTA buttons | `font-mono` |
| Mixed tracking values for same semantic | Single token from this scale |

---

*Typography System v1.0 · SYSLight Design System · July 2026*
