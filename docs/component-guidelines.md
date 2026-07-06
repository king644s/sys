# SYSLight Component Guidelines
**Version 1.0 · Every Component · July 2026**

> This document defines the rules, anatomy, states, and usage guidelines for every reusable component in SYSLight. Before building any new component, check if one already exists here. Before modifying an existing component, ensure the change aligns with its defined purpose.

---

## Component Index

1. [Button](#1-button)
2. [Input](#2-input)
3. [Textarea](#3-textarea)
4. [Select](#4-select)
5. [Checkbox](#5-checkbox)
6. [Form Layout](#6-form-layout)
7. [Card](#7-card)
8. [Product Card](#8-product-card)
9. [Category Card](#9-category-card)
10. [Table](#10-table)
11. [Badge / Chip](#11-badge--chip)
12. [Accordion](#12-accordion)
13. [Navigation (Navbar)](#13-navigation-navbar)
14. [Breadcrumbs](#14-breadcrumbs)
15. [Footer](#15-footer)
16. [Sidebar](#16-sidebar)
17. [Testimonial Card](#17-testimonial-card)
18. [Section Divider](#18-section-divider)
19. [Scroll Reveal](#19-scroll-reveal)
20. [Empty State](#20-empty-state)
21. [Loading State](#21-loading-state)
22. [Filter Tabs](#22-filter-tabs)
23. [Dropzone (File Upload)](#23-dropzone-file-upload)
24. [Statistics Block](#24-statistics-block)

---

## 1. Button

### Purpose
Primary interaction element. Used for navigation, form submission, and CTAs.

### Variants
| Variant | When to Use |
|---------|-------------|
| `primary` | Main CTA — one per section maximum |
| `secondary` | Alternative action alongside primary |
| `ghost` | Low-priority text link-style action |
| `gold-outline` | Prominent secondary (e.g. "View all projects") |

### Anatomy
```
[optional icon] [label text]
```

### Typography
- Font: `font-mono`
- Size: `text-[11px]`
- Weight: `font-bold` (primary, gold-outline) / `font-semibold` (secondary) / `font-medium` (ghost)
- Transform: `uppercase`
- Tracking: `tracking-[0.15em]`

### Spacing
- Padding: `px-6 py-3.5` (standard)
- Height: minimum 44px (meets touch target requirement)
- Icon gap: `gap-2`

### States
| State | Treatment |
|-------|-----------|
| Default | Defined by variant |
| Hover | `-translate-y-0.5` + shadow increase |
| Active / Press | `translate-y-0` (return to base) |
| Focus | `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` |
| Disabled | `opacity-50 cursor-not-allowed` + no hover effects |
| Loading | Replace label with spinner: `w-5 h-5 rounded-full border-2 border-t-transparent animate-spin` |

### Accessibility
- Must have text content or `aria-label`
- Must support keyboard activation (Enter / Space)
- Loading state must have `aria-busy="true"` and `aria-label="Loading..."`

### Anti-patterns
- ❌ Use `font-sans` on button text
- ❌ Use `text-xs` (12px) — use `text-[11px]` (11px)
- ❌ More than one `primary` button per section
- ❌ Buttons without a minimum 44px height

---

## 2. Input

### Purpose
Single-line text entry for forms.

### Anatomy
```
[Label]
[Input field]          ← main element
[Helper / Error text]  ← below field
```

### Typography
- Label: `font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-dim`
- Input text: `font-sans text-sm text-cream` (14px)
- Placeholder: `font-sans text-sm text-ghost` (14px, ghost color)
- Error text: `font-sans text-xs text-red-400` (12px)
- Helper text: `font-mono text-[11px] text-ghost`

### Styling
```
bg-void border border-border
focus:border-gold/70 focus:outline-none
rounded-[1px] px-4 py-3
text-sm text-cream
placeholder:text-text-ghost
transition-all duration-200
```

### Height
- Standard: 44px minimum (`py-3` = 12px × 2 + 20px text line height)

### States
| State | Border | Background |
|-------|--------|------------|
| Default | `border-border` | `bg-void` |
| Focus | `border-gold/70` | `bg-void` |
| Error | `border-red-400/60` | `bg-void` |
| Disabled | `border-border/40` | `bg-surface-alt/40 opacity-60` |
| Read-only | `border-border/40` | `bg-surface-alt` |

### Accessibility
- `id` must match `htmlFor` on label
- Use `aria-describedby` pointing to error element ID when in error state
- Use `required` + `aria-required="true"` for required fields

---

## 3. Textarea

### Purpose
Multi-line text entry.

### Rules
- Same as Input for all states and typography
- `resize-none` — remove manual resize handle (use `rows` prop to control height)
- Minimum `rows={4}`
- Line height: `leading-relaxed` (1.625)

---

## 4. Select

### Purpose
Dropdown choice from a fixed list.

### Rules
- Same label/error treatment as Input
- `cursor-pointer` on the select element
- Must display a visible label — never use placeholder-as-label pattern
- Custom arrow via `appearance-none` + SVG background (if styled) or browser default

---

## 5. Checkbox

### Purpose
Binary on/off choice within a form.

### Pattern (Custom)
```jsx
<label className="flex items-center gap-2.5 cursor-pointer select-none group">
  <input type="checkbox" className="sr-only" /> {/* visually hidden */}
  <span className={`w-4 h-4 border flex items-center justify-center rounded-[1px] transition-colors
    ${checked ? 'bg-gold border-gold text-white' : 'border-border/60 bg-surface-alt group-hover:border-gold'}`}>
    <CheckIcon className="w-2.5 h-2.5" />
  </span>
  <span className="font-mono text-[11px] uppercase tracking-wider text-dim">Label text</span>
</label>
```

### States
| State | Box | Label |
|-------|-----|-------|
| Unchecked | `border-border/60 bg-surface-alt` | `text-dim` |
| Checked | `bg-gold border-gold text-white` | `text-cream` |
| Hover | `border-gold` (box) | `text-cream` |
| Focus | `ring-2 ring-gold ring-offset-2` | — |

---

## 6. Form Layout

### Standard Form Structure
```
[Form title]      ← font-serif text-2xl font-bold text-cream
[Form subtitle]   ← font-mono text-[11px] uppercase text-gold-muted (optional overline)
[Separator line]  ← border-b border-border/50 pb-4
[Field grid]      ← grid grid-cols-1 md:grid-cols-2 gap-5
  [Field group]   ← flex flex-col gap-1.5
    [Label]
    [Input]
    [Error]
[Full-width field] ← (message textarea)
[File upload zone]
[Submit button]   ← w-full h-12
[Fine print]      ← text-center opacity-50
```

### Spacing
- Between form sections: `gap-6` (24px)
- Between label and input: `gap-1.5` (6px)
- Between input and error: `mt-0.5` (2px, tight)
- Form card padding: `p-8 md:p-10` (32–40px)

---

## 7. Card

### Purpose
Container for a discrete piece of content.

### Anatomy
```
[Card container]
  [Image area]  ← optional
  [Content area]
    [Overline]  ← optional, font-mono 11px gold-muted
    [H3 title]  ← font-serif 20px semibold
    [Subtitle]  ← font-sans 13px text-dim
    [Body]      ← font-sans 14px text-dim lh-1.65
    [Action]    ← font-mono 11px text-gold or button
```

### Standard Card Container
```
bg-surface border border-border
hover:border-gold/50 hover:shadow-hover hover:-translate-y-1
transition-all duration-500 rounded-[2px] overflow-hidden
```

### Card Padding
- Compact: `p-5` (20px)
- Standard: `p-6` (24px)
- Premium: `p-8` (32px)

### Hover State
All interactive cards use: `hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_12px_30px_-10px_rgba(77,74,157,0.18)]`

---

## 8. Product Card

### Purpose
Displays a single product with image, name, specs, and link.

### H3 Title Rule
**All product cards use**: `font-serif text-xl font-semibold text-cream` (20px, 600)  
This is normalized across all product displays — no exceptions.

### Content Stack
```
[Image area]     ← aspect-square, gradient bg, hover scale
[Badge area]     ← absolute top-4 left-4, "Bestseller" (11px mono)
[Hover overlay]  ← "View Specifications" label
[Info area]      ← p-5 border-t
  [Product code] ← font-mono text-[11px] text-gold-muted (not 8px!)
  [H3 name]      ← font-serif text-xl font-semibold text-cream
  [Wattage]      ← font-sans text-sm text-dim
  [Action link]  ← font-mono text-[11px] uppercase text-cream → text-gold
```

---

## 9. Category Card

### Purpose
Displays a product category with name, count, and image.

### Rules
- Same card container as Product Card
- Category name is H3 (20px serif semibold)
- Image fills card with overlay gradient

---

## 10. Table

### Purpose
Displays structured specification data.

### Standard Table Structure
```
[Table container] ← overflow-x-auto
  [Header row]    ← bg-gold-muted px-4 py-3
    h4 caption    ← font-mono text-[11px] font-bold uppercase text-white
  [Table element]
    [thead]
      [tr]
        [th]      ← font-mono text-[11px] font-bold uppercase text-dim, py-3 px-4
    [tbody]
      [tr]        ← border-b border-border/30 hover:bg-surface-alt/20
        [td]      ← font-mono text-xs text-dim, py-3.5 px-4
```

### Column Alignment
- Text columns: left-aligned
- Number columns (dimensions, values): center-aligned with `text-center`
- Key column (spec label): left-aligned, monospace bold

### Row Height
- Minimum: 44px (`py-3.5` = 14px × 2 + line height)
- Comfortable for scanning: `py-3.5` (standard)

---

## 11. Badge / Chip

### Purpose
Small labels for status, categories, or filters.

### Badge (Status Label)
```
font-mono text-[11px] font-bold uppercase tracking-[0.15em]
px-2.5 py-1 bg-gold text-white
```

### Filter Chip (Active Filter)
```
font-mono text-[9px] → text-[11px] text-gold
border border-border/70 px-2.5 py-1 rounded-[2px]
bg-void inline-flex items-center gap-1.5
```
Note: Filter chips in ProductsHub use `text-[9px]` — this is below minimum and should be raised to 11px.

### Wattage Badge (Non-interactive)
```
font-mono text-[11px] text-gold/95 font-medium tracking-wide
px-2.5 py-1 bg-void/30 rounded-md
```

---

## 12. Accordion

### Purpose
Progressive disclosure of detailed content.

### Anatomy
```
[Accordion container] ← border border-border rounded-[4px] bg-surface-alt/20
  [Trigger]           ← w-full flex items-center gap-3.5 px-6 py-4.5
    [ChevronDown]     ← w-4 h-4 text-gold, rotates 180° when open
    [Title]           ← font-serif text-lg tracking-wide font-medium text-cream (18px)
  [Panel]             ← grid transition-[grid-template-rows] (CSS grid animation)
    [Content]         ← p-6 bg-void
```

### Trigger Button Requirements
- `aria-expanded={isOpen}`
- `focus:outline-none` replaced with `focus-visible:ring-2 focus-visible:ring-gold`

### Animation
```css
/* Open */
.accordion-panel { grid-template-rows: 1fr; opacity: 1; }
/* Closed */
.accordion-panel { grid-template-rows: 0fr; opacity: 0; }
transition: grid-template-rows 500ms ease-out-expo, opacity 500ms ease-out-expo;
```

---

## 13. Navigation (Navbar)

### Desktop Structure
```
[header] h-28 sticky top-0 z-50 bg-surface border-b border-border
  [container] max-w-7xl mx-auto px-6
    [Left nav] hidden lg:flex gap-6 xl:gap-8
      [nav links] font-mono text-[11px] font-medium uppercase tracking-[0.2em]
    [Center logo] absolute left-1/2 -translate-x-1/2
    [Right controls] flex items-center gap-3 md:gap-4
      [Theme toggle] p-1.5 rounded-full
      [Font toggle] p-1.5 rounded-full
      [Contact CTA] font-mono text-[11px] font-bold uppercase tracking-[0.15em]
      [Brochure CTA] font-mono text-[11px] font-bold uppercase tracking-[0.15em]
      [Mobile trigger] lg:hidden
```

### Dropdown Panel
- Full-width below navbar
- `py-10 px-8`
- 12-column grid: 7 cols content, 5 cols visual cards
- Dropdown links: `font-sans text-xs text-dim` (13px) — the `text-xs` here is acceptable as navigation links, not body copy

### Mobile Menu
- Appears below navbar, full width, slide from top
- Navigation links: `font-sans text-xs uppercase tracking-[0.16em] text-dim font-semibold`
- CTAs: stacked, full-width

---

## 14. Breadcrumbs

### Purpose
Wayfinding trail showing current location in the site hierarchy.

### Anatomy
```
[nav aria-label="breadcrumb"]
  [ol]
    [li] [link] Home [/link]
    [li] [ChevronRight/] [link] Products [/link]
    [li] [ChevronRight/] [span aria-current="page"] Product Name [/span]
```

### Typography
- All items: `font-mono text-[11px] uppercase tracking-wider`
- Separator: `ChevronRight w-3.5 h-3.5 text-text-ghost/60`
- Non-current links: `text-cream hover:text-gold`
- Current page: `text-gold font-semibold` + `aria-current="page"`

### Required Attributes
- `aria-label="breadcrumb"` on `<nav>`
- `aria-current="page"` on the last breadcrumb item

---

## 15. Footer

### Purpose
Site-wide footer with navigation links, brand identity, and legal.

### Structure
```
[footer] bg-surface border-t border-border mt-24 pt-16 pb-12
  [container] max-w-7xl mx-auto
    [Link columns grid] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16
      [Column]
        [h4] font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-cream
        [ul]
          [li] font-sans text-[13px] text-dim hover:text-cream (not text-xs!)
    [Brand row] border-t pb-10
      [Logo]
      [Tagline] font-sans text-xs text-ghost → text-[13px] text-ghost
    [Copyright] border-t pt-6 text-[12px] text-dim
```

### Current Issue
Footer links use `text-[13px]` — this is correct and should be maintained. Never let this regress to `text-xs` (12px).

---

## 16. Sidebar (Product Filter)

### Purpose
Left-side filter panel for ProductsHub.

### Typography
- Header: `font-mono text-xs uppercase tracking-widest font-semibold` (12px — borderline, keep at 12px)
- Category names: `font-serif text-[13px]` (13px)
- Subcategory items: `font-sans text-[11px]` (11px minimum — currently `text-[11px]` ✅)
- Section labels: `font-mono text-[9px]` → raise to `text-[11px]`
- Filter counts: `font-mono text-[8px]` → raise to `text-[11px]`

### Width
- Desktop: `w-80` (320px) sticky
- Mobile: Full-width drawer from left

---

## 17. Testimonial Card

### Purpose
Displays a client quote with attribution.

### Anatomy
```
[Card] bg-surface border border-border p-8 flex flex-col
  [Quote text]     ← font-sans text-sm text-dim italic leading-relaxed (14px!)
  [Attribution]    ← border-t border-border/40 pt-5 mt-8
    [Author name]  ← font-sans text-sm font-semibold text-cream (14px)
    [Firm]         ← font-mono text-[11px] uppercase tracking-wider text-gold mt-1
```

Current issue: Quote uses `text-xs` (12px) — must be raised to `text-sm` (14px).

---

## 18. Section Divider

### Purpose
Visual separator between page sections with a text label.

### Standard
```jsx
<div className="flex items-center gap-4 max-w-7xl mx-auto px-6 py-6">
  <div className="h-px flex-1 bg-border/40" />
  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-text-ghost/60">
    {label}
  </span>
  <div className="h-px flex-1 bg-border/40" />
</div>
```

---

## 19. Scroll Reveal

### Purpose
Animates content into view as it enters the viewport.

### Rules
- `direction`: up | down | left | right
- `delay`: 0–0.5s increments (0, 0.1, 0.2, 0.3...)
- Never delay more than 0.5s for primary content
- Must respect `prefers-reduced-motion`

---

## 20. Empty State

### Purpose
Shown when a filter, search, or data load produces no results.

### Structure
```
[Container] text-center py-24 border border-dashed border-border/60
  [Icon] w-10 h-10 text-gold-muted/50 mb-4 mx-auto
  [Title] font-serif text-2xl text-cream font-light (24px)
  [Description] font-sans text-sm text-dim max-w-sm mx-auto mt-4 leading-relaxed (14px)
  [CTA] mt-6 [Button variant="primary" or "gold-outline"]
```

### Content
- Title: short, factual ("No matching fixtures found")
- Description: helpful, specific ("Try adjusting your filters or clearing your search")
- CTA: one clear action ("Clear filters")

---

## 21. Loading State

### Spinner (In Button)
```jsx
<div className="w-5 h-5 rounded-full border-2 border-void-dark border-t-transparent animate-spin" />
```

### Page Loading
- Use skeleton placeholders (rectangular blocks with `animate-pulse`) for content areas
- Never block entire viewport

---

## 22. Filter Tabs

### Purpose
Category/type switcher (e.g. Project category filter).

### Structure
```
[Container] flex flex-wrap gap-2 border border-border p-1.5 bg-surface-alt
  [Tab active]   px-5 py-2 bg-gold text-void-dark font-mono text-[11px] uppercase tracking-widest font-bold
  [Tab inactive] px-5 py-2 text-dim hover:text-cream font-mono text-[11px] uppercase tracking-widest
```

Current issue: Uses `text-[9px]` — must be raised to `text-[11px]`.

---

## 23. Dropzone (File Upload)

### Structure
```
[Zone] border border-dashed p-6 text-center cursor-pointer
       border-border-mid hover:border-gold/60 bg-void
       [when dragging] border-gold bg-gold/5 scale-[0.99]
  [Icon] w-6 h-6 text-gold-muted animate-pulse
  [Label] font-sans text-sm text-cream (14px — not xs!)
  [Hint] font-mono text-[11px] text-ghost uppercase tracking-widest
```

### File List Item
```
[Row] flex justify-between items-center bg-surface-alt border border-border px-3 py-2
  [File icon] w-4 h-4 text-gold
  [File name] font-sans text-sm text-cream truncate (14px)
  [File size] font-mono text-[11px] text-ghost (not 9px!)
  [Delete btn] text-ghost hover:text-red-400 cursor-pointer (min 44×44 touch target)
```

---

## 24. Statistics Block

### Purpose
Displays key metrics/KPIs (e.g. "30+ Years", "CRI 92+", "100% India").

### Structure
```
[Container] flex flex-col items-center
  [Number] font-serif text-3xl font-bold text-gold (36px)
  [Label]  font-mono text-[9px] → text-[11px] uppercase tracking-widest text-dim mt-2
```

Current issue: Stat labels use `text-[9px]` — must be raised to `text-[11px]`.

---

*Component Guidelines v1.0 · SYSLight Design System · July 2026*
