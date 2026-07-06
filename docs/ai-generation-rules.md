# SYSLight AI Generation Rules
**Version 1.0 · Mandatory for All AI-Generated UI · July 2026**

> These rules are loaded FIRST before any UI code is generated for this project.
> Violation of these rules produces non-compliant output that will be refactored.
> When a request conflicts with these rules, explain the conflict and propose a resolution.

---

## RULE 0: Read the Design System First

Before generating ANY UI for this project, you must:

1. Acknowledge the active design system: `SYSLight Design System v1.0`
2. Inherit all tokens from `/docs/design-system.md`
3. Apply typography from `/docs/typography.md`
4. Apply spacing from `/docs/spacing.md`
5. Respect accessibility from `/docs/accessibility.md`
6. Follow patterns from `/docs/ui-patterns.md`
7. Follow component rules from `/docs/component-guidelines.md`

**No UI may exist outside these documents without explicit user instruction and explicit acknowledgment of the deviation.**

---

## RULE 1: Typography

### Forbidden
```
text-[8px]     ← NEVER
text-[9px]     ← NEVER
text-[10px]    ← NEVER (11px is the absolute floor)
```

### Minimum Sizes (Enforce Always)
```
Any visible text:         text-[11px]   (0.6875rem)
Body/descriptive copy:    text-sm       (0.875rem = 14px)
Supporting text:          text-[13px]   (0.8125rem = 13px)
Captions / footnotes:     text-xs       (0.75rem = 12px)
```

### Font Family Rules
```
Headings (h1–h4):    font-serif   (Cormorant Garamond)
Body copy:           font-sans    (DM Sans)
Labels, buttons, overlines, tables, codes, badges: font-mono (Space Mono)
```

### Weight Rules
```
h1, h2:              font-light  (300)  — THE SIGNATURE
h3, h4:              font-semibold (600)
Button text:         font-bold   (700)
Form labels:         font-bold   (700)
Body:                font-normal (400)
Table headers:       font-bold   (700)
Author names:        font-semibold (600)
```

### Letter Spacing Rules
```
Headings (h1, h2):       tracking-tight   (-0.025em)
H3+:                     tracking-normal  (0)
Section overlines:       tracking-[0.25em]
Buttons / labels:        tracking-[0.15em]
Never use:               tracking-[0.22em], tracking-[0.3em], tracking-[0.14em]
```

### Heading Accent Pattern (Always Use)
```jsx
<h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
  Main Text{' '}
  <span className="italic font-serif text-gold">Accent Word</span>
</h2>
```

### Overline Pattern (Always Use)
```jsx
<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block mb-2">
  01 / Section Label
</span>
```

---

## RULE 2: Colors

### Always Use These Tokens
```
Primary text:     text-cream
Secondary text:   text-dim
Background:       bg-void
Card bg:          bg-surface
Elevated bg:      bg-surface-alt
Brand accent:     text-gold / bg-gold / border-gold
Hover gold:       text-gold-light
Muted gold:       text-gold-muted
Default border:   border-border
```

### Never Invent New Colors
```
❌ text-gray-400         → use text-dim
❌ bg-gray-900           → use bg-surface or bg-void
❌ border-gray-700       → use border-border
❌ text-purple-400       → use text-gold (the brand is indigo/violet, not purple)
❌ bg-black              → use bg-void
❌ text-white            → use text-cream (unless on a dark solid fill like bg-gold)
```

### Ghost Color Warning
`text-text-ghost` has insufficient contrast on both light and dark backgrounds.
- **Only use for purely decorative elements** (glows, ambient overlays)
- **Never use for readable text** — use `text-dim` instead

### Gold on White
`text-gold` in light mode (#4D4A9D on white) has 3.1:1 contrast — passes for large text only.
- ✅ Use for H1/H2 accent words (large text)
- ✅ Use for decorative overlines (if supplemented by adjacent readable text)
- ❌ Do NOT use for standalone small body text in light mode

---

## RULE 3: Spacing

### 8px Grid — Enforce Always
```
Use only: 0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 112px
In Tailwind: space-0, space-1, space-2, space-3, space-4, space-5, space-6, space-8, space-10, space-12, space-16, space-20, space-24, space-28
```

### Forbidden Arbitrary Spacing
```
❌ p-[18px]   → p-4 or p-5
❌ m-[30px]   → m-7 (28px) or m-8 (32px)
❌ gap-9      → gap-8 or gap-10
❌ mt-[15px]  → mt-3 (12px) or mt-4 (16px)
```

### Section Vertical Padding
```
Compact sections:   py-12 (48px)
Standard sections:  py-16 (64px) or py-20 (80px)
Showcase sections:  py-28 (112px)
```

### Container Horizontal Padding
```
All page containers: px-6 (24px) — always
Never: px-4 for page-level containers
```

---

## RULE 4: Component Rules

### Use Existing Components — Never Reinvent
```
Buttons:          <Button variant="primary|secondary|ghost|gold-outline">
Product cards:    <ProductCard product={product} />
Breadcrumbs:      <Breadcrumbs />
Footer:           <Footer />
Navbar:           <Navbar />
Scroll animation: <ScrollReveal direction="up|down|left|right" delay={n}>
```

### Card H3 Rule (Non-Negotiable)
All card titles use:
```jsx
<h3 className="font-serif text-xl font-semibold text-cream">
  {title}
</h3>
```
This is `text-xl` (20px), `font-semibold` (600), serif.  
**Never use `text-lg` (18px) for card H3s in this project.**

### Button Text Rule (Non-Negotiable)
All buttons use:
```
font-mono text-[11px] font-bold uppercase tracking-[0.15em]
```
**Never use `font-sans` on button text.**

### Form Label Rule (Non-Negotiable)
All form labels use:
```
font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-dim
```

---

## RULE 5: Accessibility

### Minimum Contrast
- All readable text: minimum 4.5:1 contrast ratio
- Large text (≥18px regular / ≥14px bold): minimum 3:1
- UI components: minimum 3:1

### Focus States (Required on Every Interactive Element)
```jsx
// Buttons, links, interactive cards:
className="... focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
// Never: focus:outline-none alone
```

### ARIA (Required)
```jsx
// Accordions:
<button aria-expanded={isOpen}>

// Active navigation:
<a aria-current="page">

// Icon buttons:
<button aria-label="Close menu">

// Active breadcrumb:
<span aria-current="page">

// Loading state:
<button aria-busy="true" aria-label="Submitting...">
```

### Semantic HTML (Required)
```
h1 — exactly one per page
h2 — section headings
h3 — card/sub-section titles
h4 — nested sub-headings only
button — all interactive non-link elements
a/Link — all navigation elements
nav — navigation lists
main — primary page content
section — page sections (with aria-label if unlabeled)
article — self-contained content units (feature cards)
```

### Heading Hierarchy
```
✅ h1 → h2 → h3 → h4
❌ h1 → h3 (skip)
❌ Two h1 on one page
```

---

## RULE 6: Responsive Design

### Mobile-First Always
```jsx
// ✅ Correct: mobile → md → lg
className="text-sm md:text-base"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ❌ Wrong: starting at desktop
className="text-base sm:text-sm" // Don't downsize for mobile
```

### Hero Heading Scale
```
text-5xl md:text-7xl lg:text-8xl   (44 → 72 → 96px)
```

### Section Heading Scale
```
text-3xl md:text-5xl   (28 → 40px)
```

### Body Copy Scale
```
text-sm   (14px at all sizes — do NOT shrink body copy on mobile)
```

### Product Grid Scale
```
grid-cols-1 sm:grid-cols-2 xl:grid-cols-4
```

---

## RULE 7: Animation

### Scroll Reveal (Default for All Content Sections)
```jsx
<ScrollReveal direction="up" delay={0}>
  {content}
</ScrollReveal>
```

### Staggered Grid (Default for Card Grids)
```jsx
{items.map((item, i) => (
  <ScrollReveal key={item.id} direction="up" delay={(i % 3) * 0.08}>
    <Card />
  </ScrollReveal>
))}
```

### Transition Durations
```
Color / opacity:   duration-200
Hover movement:    duration-300
Reveal:            duration-500
Large motion:      duration-700
```

### Reduced Motion (Required on Custom Animations)
```css
@media (prefers-reduced-motion: reduce) {
  .your-animation { animation: none; }
}
```

---

## RULE 8: Layout Structure

### Every Page Section
```jsx
<section className="bg-[section-color] border-b border-border/40">
  <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 lg:py-28">
    {/* Section header */}
    {/* Section content */}
    {/* Section footer/CTA */}
  </div>
</section>
```

### Section Header Block
```jsx
<div className="mb-12">
  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block mb-2">
    {overline}
  </span>
  <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
    {heading} <span className="italic text-gold">{accent}</span>
  </h2>
  <p className="font-sans text-sm text-dim max-w-xl mt-4 leading-relaxed">
    {description}
  </p>
</div>
```

---

## RULE 9: Conflict Resolution

When a user request conflicts with the Design System:

1. **Acknowledge the conflict** explicitly
2. **Explain which rule it violates** (cite the document and rule number)
3. **Propose a compliant alternative** that achieves the same goal
4. **Never silently violate the rules**

### Example Conflict Resolution

> **User**: "Make the overline text smaller, like 8px"
>
> **Correct Response**: "The Design System (typography.md, Minimum Size Rule) sets 11px as the absolute floor for any visible text. Using 8px would violate WCAG 2.2 accessibility requirements and the established design standard. Instead, I can reduce visual weight using `font-normal` weight or `text-text-ghost` color for the overline, which achieves a quieter appearance while staying within the 11px minimum."

---

## RULE 10: Dark/Light Mode

All new components must render correctly in both modes.

```jsx
// Use semantic tokens that switch automatically:
className="bg-surface text-cream border-border"
// Not:
className="bg-gray-900 text-white border-gray-700"  // ❌ Dark-mode only
```

Never hardcode colors. Always use tokens.

---

## RULE 11: What to Check Before Submitting Any UI

Before finalizing any generated component, verify:

```
[ ] All text is ≥ 11px
[ ] Body paragraphs are ≥ 14px
[ ] All color tokens come from the design system (no arbitrary hex)
[ ] All spacing is on the 8px grid (no arbitrary px)
[ ] H3 card titles are text-xl (20px) font-semibold serif
[ ] Button text uses font-mono
[ ] Section overline is text-[11px] tracking-[0.25em]
[ ] All interactive elements have visible focus styles
[ ] All icon buttons have aria-label
[ ] Active nav/breadcrumb has aria-current="page"
[ ] Accordion triggers have aria-expanded
[ ] Animation respects prefers-reduced-motion
[ ] Mobile layout uses single column (grid-cols-1)
[ ] No two h1 elements exist on the page
[ ] No arbitrary colors (no text-gray-*, bg-gray-*, etc.)
```

---

## Quick Reference Card

```
MINIMUM TEXT:    11px (text-[11px])
BODY COPY:       14px (text-sm)
HEADING SERIF:   font-light (300) for h1/h2, font-semibold (600) for h3/h4
CARD TITLE:      font-serif text-xl font-semibold (20px)
BUTTON TEXT:     font-mono text-[11px] font-bold uppercase tracking-[0.15em]
OVERLINE:        font-mono text-[11px] uppercase tracking-[0.25em] text-gold
FORM LABEL:      font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-dim
PRIMARY COLOR:   text-cream / bg-void / border-border
ACCENT COLOR:    text-gold / bg-gold / border-gold
SPACING:         8px grid — use Tailwind p-1 through p-28
FOCUS:           focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
ARIA:            aria-expanded, aria-current, aria-label (icon buttons)
CONTAINER:       max-w-7xl mx-auto px-6
```

---

*AI Generation Rules v1.0 · SYSLight Design System · July 2026*
*These rules are enforced on every UI generation request for this repository.*
