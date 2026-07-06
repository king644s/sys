# SYSLight Spacing System
**Version 1.0 · 8px Base Grid · July 2026**

> All spacing in SYSLight uses an 8px base grid. No arbitrary margin, padding, or gap values exist outside this scale. When in doubt, use the next step up — spaciousness is a luxury signal.

---

## The 8px Grid

All spacing values are multiples (or half-multiples) of 8px.

| Token | Value | Tailwind | When to Use |
|-------|-------|----------|-------------|
| `space-0.5` | 2px | `p-0.5` | Hairline separators, fine borders only |
| `space-1` | 4px | `p-1` | Inline icon gap, tight badge padding |
| `space-1.5` | 6px | `p-1.5` | Icon button padding, small chip |
| `space-2` | 8px | `p-2` | Overline-to-heading gap, tab padding |
| `space-2.5` | 10px | `p-2.5` | Compact list items, breadcrumb gap |
| `space-3` | 12px | `p-3` | Small card inner padding, form element gap |
| `space-4` | 16px | `p-4` | Standard element padding, body text margin |
| `space-5` | 20px | `p-5` | Card content padding (compact) |
| `space-6` | 24px | `p-6` | Default section horizontal padding, card padding |
| `space-7` | 28px | `p-7` | Navigation height supplement |
| `space-8` | 32px | `p-8` | Card body padding (standard), feature block inner |
| `space-10` | 40px | `p-10` | Feature block padding (large) |
| `space-12` | 48px | `p-12` | Section vertical padding (compact) |
| `space-14` | 56px | `p-14` | Mid section gap |
| `space-16` | 64px | `p-16` | Major section vertical padding |
| `space-20` | 80px | `p-20` | Full-bleed section padding (standard) |
| `space-24` | 96px | `p-24` | Hero section padding |
| `space-28` | 112px | `py-28` | Showcase section padding (premium) |

---

## Semantic Spacing Groups

### Micro Spacing (2–12px)
Used **within** components — between icons and text, between list items, between inline elements.

| Value | Use Case |
|-------|----------|
| 4px (`gap-1`) | Icon + label gap in badges/chips |
| 6px (`gap-1.5`) | Overline bullet to text |
| 8px (`gap-2`) | Heading → overline, tag → tag, list item gap |
| 10px (`gap-2.5`) | Dropdown link rows, breadcrumb items |
| 12px (`gap-3`) | Form field → label, compact card items |

### Component Spacing (16–32px)
Used **inside** components — card padding, form padding, modal padding.

| Value | Use Case |
|-------|----------|
| 16px (`p-4`) | Minimum interactive padding, filter pills |
| 20px (`p-5`) | Product card info area padding |
| 24px (`p-6`) | Standard card padding, default container horizontal px |
| 28px (`p-7`) | Navigation header height supplement |
| 32px (`p-8`) | Premium card padding, feature block inner, spec accordion |

### Section Spacing (48–112px)
Used **between** sections and for vertical section rhythm.

| Value | Use Case |
|-------|----------|
| 48px (`py-12`) | Compact section (e.g. product grid, narrow pages) |
| 64px (`py-16`) | Standard section vertical padding |
| 80px (`py-20`) | Full-bleed feature sections (brand statement, CTA) |
| 96px (`py-24`) | Hero-adjacent sections |
| 112px (`py-28`) | Major showcase sections (ControlModes, SmartSolutions) |

---

## Typographic Spacing (Text-to-Text)

These rules govern space between typographic elements within a content block:

| From → To | Space | Class |
|-----------|-------|-------|
| Overline → H1/H2 | 8px | `mb-2` on overline |
| Overline → H1 (hero) | 14px | `mb-3.5` on overline |
| H1 → description | 24px | `mt-6` on description |
| H2 → description | 16px | `mt-4` on description |
| H3 → body paragraph | 8px | `mb-2` on H3 |
| Body paragraph → next | 16px | `mt-4` or `gap-4` in flex |
| Body → CTA | 32–40px | `mt-8 md:mt-10` |
| Section header → content | 48px | `mb-12` on header block |
| Icon → heading | 20px | `mb-5` on icon |
| Heading → subheading | 8px | `mb-2` on heading |

---

## Grid Gap Reference

| Context | Gap | Tailwind |
|---------|-----|----------|
| Product card grid | 24px | `gap-6` |
| Category card grid | 32px | `gap-8` |
| Feature/pillar grid | 32px | `gap-8` |
| Project showcase grid | 32px | `gap-8` |
| Navbar items | 24–32px | `gap-6 xl:gap-8` |
| Form fields | 20px | `gap-5` |
| Form grid columns | 20px | `gap-5` |
| Sidebar items | 16px | `gap-4` |
| Sidebar sub-items | 6px | `gap-1.5` |
| Filter pills | 8px | `gap-2` |
| Button group | 16px | `gap-4` |
| Footer columns | 48px | `gap-12` |

---

## Container Horizontal Padding

**All containers use `px-6` (24px) as the standard horizontal padding.**

- This applies at all breakpoints
- Never use `px-4` for page-level containers — it is too tight for the luxury aesthetic
- Inner card components may use `px-5` or `px-8` based on card type

```
Page container: max-w-7xl mx-auto px-6
Narrow content: max-w-4xl mx-auto px-6
Text reading:   max-w-xl mx-auto (no additional padding — inherits parent px-6)
```

---

## Vertical Rhythm Reference

The standard page section structure and its spacing:

```
[SectionDivider]
  ↕ 48px (py-12)
[Section]
  [Header Block]
    [overline] mb-2
    [h2]       leading-tight
    [p]        mt-4, max-w-xl
  ↕ 48px (mb-12)
  [Content Grid] gap-8
  ↕ 48px (mt-12)
  [CTA / Link]
  ↕ 48px (py-12)
[SectionDivider]
```

---

## Footer Spacing

```
Footer top border → first content: 64px (pt-16)
Footer column gap: 48px (gap-12)
Footer column item gap: 12px (gap-3)
Footer column title → first item: 20px (gap-5 on flex container)
Footer bottom section → copyright: 24px (pt-6)
Footer margin-top from last page section: 96px (mt-24)
```

---

## Navbar Spacing

```
Navbar height: 112px (h-28) on desktop
Navbar height: 112px (h-28) on mobile
Navbar horizontal padding: 24px (px-6)
Navbar item gap: 24px (gap-6) → 32px (xl:gap-8)
Navbar dropdown padding: 40px vertical (py-10), 32px horizontal (px-8)
```

---

## Anti-Patterns (Never Do)

| ❌ Forbidden | ✅ Correct |
|-------------|----------|
| `mt-7` (28px arbitrary) | `mt-6` (24px) or `mt-8` (32px) |
| `p-9` (36px arbitrary) | `p-8` (32px) or `p-10` (40px) |
| `gap-9` | `gap-8` or `gap-10` |
| `mb-11` | `mb-10` or `mb-12` |
| `p-[18px]` | `p-4` (16px) or `p-5` (20px) |
| `mt-[30px]` | `mt-8` (32px) |
| `gap-[15px]` | `gap-3` (12px) or `gap-4` (16px) |

---

*Spacing System v1.0 · SYSLight Design System · July 2026*
