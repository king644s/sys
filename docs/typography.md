# SYSlight Typography System
**Version 2.0 · "Spec Studio" · Single source of truth · November 2026**

> Every piece of text on the site uses one of the classes below. If a role is not covered here, add it here (and to `app/globals.css`) before using it — never hand-roll sizes, tracking or uppercase labels in a component.

Implementation lives in `app/globals.css` (`@layer components`) and fonts are loaded in `app/layout.tsx`.

---

## Font families

| Token | Face | Loaded by | Role |
|---|---|---|---|
| `font-display` | **Inter Tight** (variable) | `next/font/google` → `--font-inter-tight` | Every heading, stats, card titles |
| `font-sans` | **Inter** (variable, normal + italic) | `next/font/google` → `--font-inter` | Body, UI, buttons, labels |
| `font-mono` | **JetBrains Mono** (variable) | `next/font/google` → `--font-jetbrains-mono` | Product codes, Kelvin values, dimensions only |

- `font-serif` is a legacy alias of `font-display`. Do not use it in new code.
- All three faces are variable, so every weight 100–900 is real; nothing is browser-synthesised. Italic exists only for Inter.
- Fonts are self-hosted by Next — never add a Google Fonts `@import`.

---

## The floor

**12px is the minimum for any rendered text**, and 12px is only for uppercase labels (`.eyebrow`) or mono codes. Sentences are never smaller than 13px.

Text on dark or photographic backgrounds: body copy no fainter than `white/65`, text ≤13px no fainter than `white/60`.

---

## Type scale

| Role | Class | Size (mobile → desktop) | Weight | Line height | Tracking | Use for |
|---|---|---|---|---|---|---|
| Display | `.display-1` | 40 → 72px | 600 | 1.02 | −0.035em | H1 on marketing landers: Home, About, Professionals, Home automation |
| Page title | `.heading-1` | 32 → 52px | 600 | 1.06 | −0.03em | H1 on catalogue/utility pages: Products, Category, Product, Smart lights, Projects, Contact |
| Section | `.heading-2` | 28 → 40px | 600 | 1.10 | −0.025em | Every section H2. Cards inside a section that need H2 weight use `heading-2 md:text-[2rem]` (32px) |
| Sub-section | `.heading-3` | 20px (24–32px when it heads a group of cards) | 600 | 1.25 | −0.015em | Card titles, sub-groups, accordion titles (`text-lg`) |
| Card title | `.card-title` | 18px (16px on photo tiles via `text-base`) | 600 | 1.35 | −0.01em | Titles in dense 3–4 column grids |
| Lead | `.lead` | 17px | 400 | 1.65 | 0 | The paragraph under an H1/H2 |
| Body | `.body` | 15px | 400 | 1.65 | 0 | Section copy, testimonial quotes |
| Card body | `text-sm` | 14px | 400 | 1.6 (`leading-relaxed`) | 0 | Card descriptions, table values, nav and footer links |
| Meta | `text-[13px]` | 13px | 400–500 | 1.5 | 0 | Helper text, breadcrumbs, captions, footnotes |
| Label | `.eyebrow` | 12px | 600 uppercase | 1.3 | +0.08em | Section labels, table keys, filter group labels, badges over images |
| Data | `font-mono` | 12–14px | 400–500 | — | 0 | Product codes, Kelvin, dimensions |
| Stat | `.stat-value` + `.stat-label` | 28px / 13px (24px in compact cards via `text-2xl`) | 600 / 400 | 1.1 / 1.4 | −0.025em / 0 | Every KPI number |
| Field label | `.field-label` | 13px | 500 | — | 0 | Form labels, option-group labels |
| Chip | `.chip` | 12px | 500 | — | 0 | Counts, wattage pills |
| Button | `Button` sizes | 13 / 14 / 15px | 600 | — | 0 | Sentence case, never uppercase |
| Link with arrow | `.link-arrow` | 14px | 600 | — | 0 | "View all …" style links |

Base styles: every `h1`–`h4` gets Inter Tight, line-height 1.25, −0.02em tracking and `text-wrap: balance`; every `p` gets `text-wrap: pretty`.

---

## Hierarchy rules

1. **One H1 per page**, and it is the largest text on the page. Decorative numbers (timeline years, stats) must stay smaller than it.
2. **Each level is visibly smaller than the one above** — at least ~1.3× between H2 and the H3s it groups.
3. **Data a specifier needs is never the quietest text.** Product codes use `text-text-dim` (not ghost); spec table values are 14px `text-cream`.
4. **Labels are smaller than what they label only when they are uppercase `.eyebrow`.** A sentence-case group heading is never smaller than its items.
5. **A section has one call to action heading.** The footer CTA is `heading-3 text-2xl` so it never competes with a page's closing H2.
6. **Heading levels never skip** (h1 → h2 → h3). Pick the tag for structure, the class for size.

---

## Colour of text

| Token | Light | Dark | Use |
|---|---|---|---|
| `text-cream` | #111114 | #F2F2F5 | Headings, values, primary text |
| `text-text-dim` | #55556A | #A6A6B8 | Body copy, descriptions, codes |
| `text-text-ghost` | #6B6B80 | #8A8AA0 | Lowest emphasis: counts, captions, helper text, placeholders. Passes 4.5:1 on `void`, `void-dark` and `surface` |
| `text-gold` | brand accent | brand accent | Eyebrows, links, one accent phrase per heading |

---

## Patterns

**Section header** — always `SectionHeader` or this exact markup:

```tsx
<span className="eyebrow">Product range</span>
<h2 className="heading-2 mt-2">Shop by category</h2>
<p className="lead mt-4">…</p>
```

**Accent phrase** — at most one per heading, in `text-gold` (`text-gold-light` on dark):

```tsx
<h2 className="heading-2">Smart solutions for <span className="text-gold">every need</span></h2>
```

**Case** — sentence case for every heading, button, label and card title. Proper nouns and product names keep their capitals. `.eyebrow` renders uppercase via CSS; write its source in sentence case.

**Line breaks in headings** — avoid `<br />`; `text-wrap: balance` handles it. If one is unavoidable, put a space before it (`{' '}<br />`) so screen readers don't join the words.

---

## Anti-patterns

| ✗ Never | ✓ Instead |
|---|---|
| `text-[8px]`, `[9px]`, `[10px]`, `[11px]` | `.eyebrow` (12px) or `text-[13px]` |
| `font-sans text-xs uppercase tracking-[0.08em] font-semibold` | `.eyebrow` |
| `tracking-[0.14em]`, `tracking-wide` on headings | `.eyebrow` tracking or none |
| `font-serif text-[2rem] md:text-[2.75rem] …` bespoke heading stacks | `.heading-2` |
| Uppercase buttons | `Button` / sentence case |
| `.eyebrow` used as a link, author name or category | `.link-arrow`, `text-sm font-semibold`, `text-[13px] text-text-dim` |
| `text-white/25`–`/50` for readable text | `white/60` minimum |
| `font-bold` / `italic` on a face that does not ship it | Check the font table above |
| `text-md` (not a Tailwind class) | `text-base` |
