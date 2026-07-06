# SYSLight Accessibility Standards
**Version 1.0 · WCAG 2.2 Level AA · July 2026**

> Accessibility is not a feature. It is the baseline. Every component, every state, every interaction must be accessible before it ships.

---

## Standard

**Target**: WCAG 2.2 Level AA for all new and existing features.  
**Exceptions**: None. An inaccessible component is an incomplete component.

---

## Text Size Minimums

### The Absolute Rule
**11px is the minimum for any text rendered to the screen.**

This is derived from:
- WCAG 2.2 SC 1.4.4 (Resize Text): text must be readable at 200% zoom
- APCA (Advanced Perceptual Contrast): text below 11px cannot achieve sufficient contrast at any color
- Apple HIG: 11pt minimum
- Google Material Design: 10sp minimum for captions

| Role | Minimum Size | Recommended |
|------|-------------|-------------|
| Body copy | **14px** | 16px |
| Secondary body | **13px** | 14px |
| UI labels | **11px** | 12px |
| Overlines | **11px** | 11px |
| Badges / chips | **11px** | 11px |
| Table headers | **11px** | 11px |
| Table cells | **12px** | 13px |
| Breadcrumbs | **11px** | 11px |
| Form labels | **11px** | 11px |
| Form input text | **14px** | 14px |
| Error messages | **12px** | 12px |
| Tooltips | **12px** | 12px |
| Footer links | **13px** | 13px |
| Footer copyright | **12px** | 12px |

### Current Violations (Tracked for Remediation)
- `text-[8px]` — ProductCard bestseller badge, About pillar labels, form hints → raise to 11px
- `text-[9px]` — All section overlines → raise to 11px
- `text-[10px]` — Navbar CTA buttons, breadcrumbs → raise to 11px

---

## Color Contrast

### Minimum Requirements (WCAG 2.2 SC 1.4.3)

| Text Type | Minimum Ratio |
|-----------|--------------|
| Normal text (< 18px or < 14px bold) | **4.5:1** |
| Large text (≥ 18px or ≥ 14px bold) | **3:1** |
| Non-text UI components | **3:1** |
| Decorative / disabled | No requirement |

### Token Contrast Reference

| Token Pair | Light Mode Ratio | Dark Mode Ratio | Status |
|------------|-----------------|-----------------|--------|
| `text-cream` on `void` | 21:1 | 21:1 | ✅ AAA |
| `text-dim` on `void` | 7.1:1 | 5.2:1 | ✅ AA |
| `text-ghost` on `void` | 2.5:1 | 2.3:1 | ❌ FAIL |
| `gold` on `void` (dark) | — | 7.8:1 | ✅ AAA |
| `gold` on `void` (light) | 3.1:1 | — | ⚠️ Large only |
| `gold` on `surface` | 3.0:1 | 7.5:1 | ⚠️ Large only (light) |
| `white` on `gold` | 4.1:1 | 4.5:1 | ⚠️ Borderline |

### Ghost Text Policy
`text-text-ghost` **FAILS contrast** on all backgrounds in both modes.

**Permitted uses:**
- Purely decorative visual elements (no readable content)
- Animated glow effects
- SVG stroke accents

**Forbidden uses:**
- Any text that conveys information
- Form hints or helper text
- File size labels
- Dropdown descriptions
- Table category labels

**Fix**: Raise `--color-text-ghost` to:
- Light: `#767589` (4.6:1 on white ✅)
- Dark: `#7D7B9B` (4.5:1 on #010101 ✅)

---

## Focus States

### Rule
Every interactive element must have a **visible focus indicator** that:
- Has at least 3:1 contrast against adjacent colors (WCAG 2.4.11)
- Is not removed without replacement (`focus:outline-none` is forbidden alone)
- Is visible in both light and dark mode

### Standard Focus Pattern

```css
/* Apply to all interactive elements */
focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold
```

For elements where outline looks wrong (e.g. pill buttons):
```css
focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-void
```

### Component Focus Rules

| Component | Focus Style |
|-----------|-------------|
| Button (all variants) | `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` |
| Nav links | `focus-visible:outline-gold focus-visible:outline-2` |
| Form inputs | `focus:border-gold/70` + keep border visible |
| Checkboxes | Custom: `focus-visible:ring-2 focus-visible:ring-gold` |
| Icon buttons | `focus-visible:ring-2 focus-visible:ring-gold rounded-full` |
| Accordion triggers | `focus-visible:outline-gold focus-visible:outline-2` |
| Cards (when interactive) | `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-4` |

### Current Violation
`Button.tsx` uses `focus:outline-none focus:ring-1 focus:ring-gold/50`:
- `ring-1` (1px) is below the recommended 2px minimum
- `ring-gold/50` (50% opacity) may not meet 3:1 contrast
- Fix: `focus-visible:ring-2 focus-visible:ring-gold`

---

## Touch Target Sizes

### Rule (WCAG 2.5.8 — New in WCAG 2.2)
All interactive elements must be **minimum 44×44px** on mobile.

If the visual size is smaller (e.g. 32×32px icon button), use padding or a pseudo-element to expand the hit area to 44×44px.

```css
/* Expand small touch targets */
.icon-btn {
  position: relative;
}
.icon-btn::before {
  content: '';
  position: absolute;
  inset: -6px; /* Expands 32px to 44px */
}
```

| Component | Current Size | Required |
|-----------|-------------|---------|
| Navbar theme toggle | 32×32px | 44×44px ✅ (use padding) |
| Navbar font toggle | 32×32px | 44×44px ✅ |
| Carousel prev/next | 32×32px | 44×44px ✅ |
| Close button (mobile nav) | 40×40px | 44×44px ✅ |
| Finish swatches | 28×28px | 44×44px ✅ (use padding) |
| Filter checkboxes | 16×16px hit | 44×44px ✅ (label wraps it) |

---

## Semantic HTML Requirements

### Heading Hierarchy
Every page must have exactly one `<h1>`. Headings must not skip levels.

```
✅ h1 → h2 → h3
❌ h1 → h3 (skipping h2)
❌ Two h1 elements on one page
```

### Landmark Elements
- `<header>` — navbar
- `<nav>` — navigation lists
- `<main>` — primary page content
- `<footer>` — page footer
- `<aside>` — product filter sidebar
- `<section>` with `aria-label` — named sections for screen readers

### Interactive Elements
- All interactive elements must be keyboard-operable
- `<div>` and `<span>` must not have click handlers — use `<button>` or `<a>`
- Every `<a>` must have meaningful text or `aria-label`
- Every `<button>` must have text content or `aria-label`

---

## ARIA Requirements

### Required ARIA Attributes

| Element | Attribute | Value |
|---------|-----------|-------|
| Accordion trigger | `aria-expanded` | `true` / `false` |
| Mobile menu trigger | `aria-expanded` | `true` / `false` |
| Dropdown trigger | `aria-expanded` | `true` / `false` |
| Active nav link | `aria-current` | `"page"` |
| Active breadcrumb | `aria-current` | `"page"` |
| Icon-only buttons | `aria-label` | Descriptive text |
| Loading spinner | `aria-label` | `"Loading..."` |
| Carousel | `aria-live` | `"polite"` |
| Form errors | `aria-describedby` | ID of error element |
| Required inputs | `aria-required` | `"true"` or HTML `required` |

### Current Violations
- Navbar theme toggle button: missing `aria-label` (has `title` but not `aria-label`)
- Navbar font toggle button: missing `aria-label`
- Breadcrumb active item: missing `aria-current="page"`

---

## Image Accessibility

| Case | Rule |
|------|------|
| Product images | `alt={product.name}` |
| Decorative backgrounds | `alt=""` (empty) or `aria-hidden="true"` |
| Integration icons in ControlModes | `alt=""` + `aria-hidden` (correct ✅) |
| Project images | `alt={project.name}` |
| SVG icons | `aria-hidden="true"` when decorative |

---

## Animation & Motion

### Rule (WCAG 2.3.3)
Any animation that loops, auto-plays, or moves for more than 5 seconds must be:
1. Pausable by the user, OR
2. Automatically disabled when `prefers-reduced-motion: reduce` is detected

### Implementation

```css
@media (prefers-reduced-motion: reduce) {
  .animate-pulse-glow { animation: none; }
  .transition-page-enter { animation: none; opacity: 1; transform: none; }
}
```

### Current Compliance
- `TestimonialsCarousel` — ✅ correctly pauses on `prefers-reduced-motion`
- `ScrollReveal` — ✅ should respect reduced motion
- `pulseGlow` animation — ⚠️ loops indefinitely, needs `prefers-reduced-motion` guard
- `pageEnter` animation — ⚠️ needs `prefers-reduced-motion` guard

---

## Form Accessibility

1. **Every input must have a `<label>` with `htmlFor` matching the input `id`**
2. **`placeholder` is not a label** — use it only for supplementary examples
3. **Error messages** must be associated with their field via `aria-describedby`
4. **Required fields** must use `required` attribute (not just visual asterisk)
5. **Select elements** must have visible labels — never rely on the default option as a label

```jsx
// Correct pattern
<div>
  <label htmlFor="email-input" className="...">
    Email <span aria-hidden="true">*</span>
    <span className="sr-only">(required)</span>
  </label>
  <input
    id="email-input"
    type="email"
    required
    aria-required="true"
    aria-describedby={errors.email ? "email-error" : undefined}
  />
  {errors.email && (
    <span id="email-error" role="alert" className="...">
      {errors.email}
    </span>
  )}
</div>
```

---

## Keyboard Navigation

Every user journey must be completable with keyboard alone:

| Action | Key |
|--------|-----|
| Navigate interactive elements | Tab / Shift+Tab |
| Activate button/link | Enter / Space |
| Close modal/dropdown | Escape |
| Navigate list items | Arrow keys |
| Checkbox toggle | Space |
| Form submit | Enter |

### Focus Trap
Modals and drawers must trap focus within them while open. When closed, focus returns to the trigger element.

---

## Screen Reader Testing

Test with at minimum:
- **NVDA + Chrome** (Windows)
- **VoiceOver + Safari** (macOS/iOS)

Verify:
- Page title is meaningful
- All headings are announced with level
- All images have meaningful or empty alt text
- All interactive elements have accessible names
- Form errors are announced immediately on submission

---

*Accessibility Standards v1.0 · SYSLight Design System · WCAG 2.2 AA · July 2026*
