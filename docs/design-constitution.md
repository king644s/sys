# SYSLight Design Constitution
**Version 1.0 · Systems Creator · Established July 2026**

> This document is the supreme design authority for SYSLight. All UI decisions must be reconcilable with the principles written here. If a design cannot be defended by this document, it does not ship.

---

## I. Design Philosophy

SYSLight is a **premium architectural lighting brand** manufactured in Mumbai. Its audience is architects, interior designers, and specification engineers — people who read technical documents, understand optical precision, and hold aesthetics to an exacting standard.

The design language must communicate:

- **Mastery over novelty** — craftsmanship, not trend-chasing
- **Precision over decoration** — every element earns its space
- **Restraint as luxury** — what is absent is as deliberate as what is present
- **Trust through consistency** — a chaotic UI undermines confidence in the product

The brand's visual signature is the **serif/sans/mono trinity**:
- **Serif (Cormorant Garamond)** — emotion, heritage, architectural elegance
- **Sans (DM Sans)** — functional clarity, modern readability, UI structure
- **Mono (Space Mono)** — technical precision, product codes, specifications

This trinity must be preserved in every component, every page, every state.

---

## II. Visual Principles

### 1. Hierarchy Before Decoration
Every visual element must serve a hierarchical purpose. Ask: *does this element help the user understand what matters most?* If not, remove it.

### 2. Negative Space is Structural
White space (or dark void space) is not emptiness — it is structure. It separates, groups, elevates. Never fill space simply because it exists.

### 3. Contrast Creates Priority
Use contrast — in weight, size, color, and spacing — to guide the user's eye. The most important element on any page should be immediately obvious without scanning.

### 4. Light is the Product
SYSLight sells light. The UI must reflect this: glows, beams, ambient halos, and radiant gradients are not decoration — they are product storytelling. Use them purposefully.

### 5. Two Modes, One Identity
Light mode: clean editorial — bright, architectural, professional.  
Dark mode: immersive jewel-box — deep blacks, glowing accents, luxury.  
Both must feel like the same brand, never like separate products.

### 6. Consistency is Credibility
An architect specifying a lighting system for a ₹50 Cr project needs to trust the brand. Inconsistent typography, random spacing, or misaligned components all damage that trust. Visual consistency is not aesthetic pedantry — it is brand equity.

---

## III. UX Principles

### 1. Progressive Disclosure
Lead with the most compelling information. Details follow. Never overwhelm on first contact. Use accordions, expandable sections, and staged reveals.

### 2. Speak the Architect's Language
The audience understands: beam angle, CCT, CRI, lux, IP ratings, DALI, cutout dimensions. Use precise technical language — do not simplify to the point of inaccuracy.

### 3. Friction Only Where Trust Requires It
Forms ask only for what is necessary. Don't add fields to seem thorough. Every friction point must be justified by a business need.

### 4. Obvious Actions
Primary actions (Contact, Inquire, Download) must be immediately discoverable. Secondary actions are available but not distracting. Tertiary actions are accessible but never competing.

### 5. Every State is Designed
Empty states, error states, loading states, success states — all must be designed intentionally. "No fixtures found" must still feel premium.

### 6. Mobile is Not a Degraded Desktop
Mobile layouts are first-class. No content is removed — it is re-prioritized. The mobile experience must be as premium as the desktop experience.

### 7. Performance is UX
A slow page is a broken page. Images use `loading="lazy"`. Animations respect `prefers-reduced-motion`. Fonts use `font-display: swap`. The 3D WebGL orb defers to non-blocking load.

---

## IV. Accessibility Standards

SYSLight follows **WCAG 2.2 Level AA** as its minimum standard, targeting AA for all new features.

### Non-Negotiable Rules

1. **Minimum text size: 11px** for any visible rendered text. No exceptions.
2. **Minimum contrast: 4.5:1** for body text (Normal) · **3:1** for large text (≥18px or ≥14px bold)
3. **Focus indicators** must be visible on all interactive elements. `focus:outline-none` is forbidden without a visible replacement.
4. **Touch targets** must be minimum 44×44px on mobile (WCAG 2.5.8).
5. **Semantic HTML** is mandatory. Headings follow a logical `h1→h2→h3` hierarchy on every page.
6. **`aria-label`** is required on all icon-only interactive elements.
7. **`aria-current="page"`** is required on active breadcrumb and navigation items.
8. **`aria-expanded`** is required on all accordion and dropdown triggers.
9. **Animation** must respect `prefers-reduced-motion: reduce`.
10. **Color alone** must never be the sole indicator of state (use icon + color + text).

### Contrast Targets

| Element | Minimum Ratio | Target |
|---------|--------------|--------|
| Body text | 4.5:1 | 7:1+ |
| UI labels | 4.5:1 | 5:1+ |
| Decorative only | No requirement | — |
| Focus indicator | 3:1 against adjacent | 4.5:1 |
| Interactive element | 3:1 against bg | 4.5:1 |

### Known Contrast Issues (Pending Fix)
- `--color-text-ghost` on light (#8E8D9F on #FFF): 2.5:1 ❌ — **must not be used on readable text**
- `--color-gold` on white (#4D4A9D on #FFF): 3.1:1 ❌ — acceptable for large decorative text only
- Fix by raising ghost color to `#767589` (light) / `#7D7B9B` (dark)

---

## V. Readability Standards

### Body Copy
- **Minimum size**: 14px (`text-sm`) for primary descriptions, product text, and paragraphs
- **Line height**: 1.65 (generous — this is a specification-heavy site)
- **Measure (line width)**: Maximum 72 characters (~600px at 14px). Use `max-w-xl` or `max-w-2xl` for paragraphs
- **Paragraph spacing**: 16px between paragraphs

### Headings
- **H1**: 48px base, scales to 96px on hero. Always `font-light` (300) in serif.
- **H2**: 28px mobile → 40px desktop. `font-light` in serif.
- **H3**: 20px. `font-semibold` (600) in serif. Consistent across ALL card types.

### Technical Labels (Mono)
- **Minimum size**: 11px. No exceptions.
- **Always uppercase** for overlines, badges, table headers
- **Tracking**: 0.25em for overlines, 0.15em for labels, 0em for technical values

---

## VI. Responsive Rules

### Breakpoints
```
sm:  640px   — Mobile landscape / small tablet
md:  768px   — Tablet
lg:  1024px  — Small desktop / laptop
xl:  1280px  — Standard desktop
2xl: 1536px  — Large monitor
```

### Responsive Typography Strategy
- Hero H1: `text-5xl md:text-7xl lg:text-8xl` (44→72→96px)
- Page H1: `text-4xl md:text-6xl` (36→60px)
- Section H2: `text-3xl md:text-5xl` (28→40px)
- Body copy: `text-sm md:text-sm` — 14px at all sizes (do not shrink on mobile)
- Overlines: fixed at 11px (`text-[11px]`) — do not scale

### Layout Rules
- Max container: `max-w-7xl` (1280px) centered with `mx-auto px-6`
- Narrow text containers: `max-w-4xl` (896px) for centered text sections
- Reading measure containers: `max-w-xl` (576px) for body paragraphs
- Mobile: single column. Tablet: 2-column. Desktop: 3–4 column grids.

### Mobile-First Strategy
1. Design mobile layout first
2. Use `md:` and `lg:` to enhance for larger screens
3. Never hide content on mobile — restack or collapse it
4. Navigation collapses to hamburger at `lg` breakpoint (currently correct)
5. Sidebar filters become bottom drawer on mobile

---

## VII. Component Consistency Rules

1. **All cards of the same type must use identical typography** — H3 on every product card is always 20px/600/serif
2. **All CTAs of the same variant must look identical** — `Button primary` is always the same across every page
3. **All overlines use the same class** — 11px mono uppercase tracking-[0.25em]
4. **All form labels use the same class** — 11px mono uppercase bold tracking-[0.15em]
5. **All error messages use the same class** — 12px sans text-red-400
6. **Section structure is always**: `overline → h2 → body → CTA`
7. **Card structure is always**: `image → (badge) → h3 → subtitle → metadata → action`
8. **No one-off font sizes** — all sizes come from the typography scale in `design-system.md`
9. **No one-off colors** — all colors come from the token system in `globals.css`
10. **No one-off spacing** — all spacing comes from the 8px grid system

---

## VIII. Layout Principles

### Grid System
- 12-column grid for complex layouts (`grid-cols-12`)
- 3-column grid for content cards (`grid-cols-1 md:grid-cols-3`)
- 4-column grid for product cards (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4`)
- 2-column split for content+visual (`grid-cols-1 lg:grid-cols-12 gap-12`)

### Section Structure
Every page section follows this vertical rhythm:
```
[SectionDivider] ← optional separator with label
[section] ← py-12 md:py-20 for standard sections
  [container max-w-7xl mx-auto px-6]
    [section header: overline + h2 + description]
    [section content: grid or flex layout]
    [section footer: CTA or link]
```

### Z-Index Scale
```
0   — Page content
10  — Sticky elements (breadcrumbs)
20  — Floating elements (back-to-top)
30  — Dropdowns
40  — Modals / drawers
50  — Navbar (sticky top-0 z-50)
60  — Font picker overlay
```

---

## IX. Information Hierarchy Rules

### Priority Levels

| Level | Content Type | Visual Treatment |
|-------|-------------|-----------------|
| P1 — Primary | Product name, section heading, hero message | Serif, large, high contrast |
| P2 — Secondary | Description, body copy, features | Sans, medium, standard contrast |
| P3 — Tertiary | Specs, metadata, labels | Mono, small, muted |
| P4 — Supporting | Hints, captions, fine print | Mono, minimum size, ghost |

### Page Hierarchy Example (ProductDetail)
```
P1: Product Name (h1, 48px serif light)
P1: Series/Section label (11px mono gold, overline)
P2: Product description (14px sans)
P3: Wattage selector (11px mono)
P3: Specification table (11–12px mono)
P4: Product codes (11px mono gold-muted)
```

---

## X. White-Space Philosophy

White space is not empty — it is **structure made visible**.

- Between sections: 48–80px vertical rhythm
- Between cards in a grid: 24–32px gap
- Inside cards: 20–32px padding
- Between a heading and its body: 16–24px
- Between an overline and its heading: 8–12px
- Between body paragraphs: 16px

**Never compress spacing to fit more content.** Remove content instead.

---

## XI. Interaction Guidelines

### Hover States
- Cards: `hover:-translate-y-1 hover:border-gold/50 hover:shadow-hover` — lift effect
- Links: `hover:text-gold transition-colors duration-200`
- Buttons: `hover:-translate-y-0.5` — subtle elevation
- Images: `group-hover:scale-105` — gentle zoom

### Transition Timing
- Fast (color changes): `duration-200`
- Standard (movement): `duration-300`
- Slow (reveal): `duration-500`
- Luxury (large motion): `duration-700`

### Easing
- Standard: `ease-out` (Tailwind default)
- Luxury movement: `ease-luxury` = `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Snappy reveal: `ease-out-expo` = `cubic-bezier(0.16, 1, 0.3, 1)`

---

## XII. Animation Guidelines

### Use Animation To:
- Reveal content as it enters viewport (ScrollReveal — currently implemented)
- Indicate loading state (spinner)
- Confirm successful actions (success state fade-in)
- Guide attention to primary actions

### Never Use Animation To:
- Loop endlessly on non-interactive content (exception: `pulseGlow` on accent elements)
- Distract from primary content
- Delay content accessibility

### Reduced Motion
All animations must have a `prefers-reduced-motion: reduce` fallback. The `TestimonialsCarousel` correctly implements this. All new animated components must do the same.

---

## XIII. Error Handling

### Form Errors
- Display below the affected field
- Red (`text-red-400`) — high contrast on dark, passes 4.5:1
- 12px sans, normal weight
- Message is specific: not "Invalid" but "Please supply a valid professional email address"
- Never clear an error message while the user is still typing

### Empty States
- Never show a blank area
- Always include: icon + title (serif 24px) + description (sans 14px) + action button
- Example: "No matching fixtures found" → description → "Clear filters" CTA

### Network / Loading States
- Use skeleton placeholders for content areas
- Use the spinner pattern (`rounded-full border-2 border-gold border-t-transparent animate-spin`) for CTAs
- Never block the entire viewport with a loading overlay

---

## XIV. Form Usability

1. **Labels above fields** — never placeholder-only labels
2. **Placeholder text is supplementary** — it disappears on focus; don't use it as the only hint
3. **Required fields** — marked with `*` in red, explained at form top
4. **Error messages** — specific, below the field, visible without scrolling
5. **Success feedback** — immediate, visible, with reference code
6. **Field grouping** — related fields in visual groups (2-column grid)
7. **Input size** — minimum 44px height for comfortable touch targets
8. **Submission feedback** — button shows loading state during processing

---

## XV. Content Hierarchy

### Home Page
Hero → Categories → Brand Statement → Smart Technology → Products → Projects → Testimonials

### Product Detail
Breadcrumb → Back link + code → Image carousel → [Name → Wattage → Description → Finish → CTA] → Specs → Related

### Every Section Must Answer
1. What is this? (Overline label)
2. Why does it matter? (H2 + description)
3. What does it look like? (Content grid)
4. What should I do next? (CTA)

---

*This Constitution is reviewed with every major product update. Violations are refactored, not accommodated.*  
*Maintained by: Systems Creator Engineering · SYSLight Design System v1.0*
