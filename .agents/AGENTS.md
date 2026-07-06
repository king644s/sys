# SYSLight — Agent Rules
## These rules are loaded automatically on every conversation for this project.

---

## MANDATORY: Load Design System & AI Rulebook Before Any UI Work

This project has a permanent, enterprise-grade Design System and a mandatory AI Rulebook.

**Before generating ANY UI — a component, widget, page, section, form, table, modal, card, dashboard, or layout — you MUST:**

1. Read the root-level [`e:\projects\sys\AI_RULEBOOK.md`](file:///e:/projects/sys/AI_RULEBOOK.md) — the primary instruction book.
2. Read [`e:\projects\sys\docs\ai-generation-rules.md`](e:\projects\sys\docs\ai-generation-rules.md) — the mandatory ruleset.
3. Reference [`e:\projects\sys\docs\typography.md`](e:\projects\sys\docs\typography.md) for all font/size decisions.
4. Reference [`e:\projects\sys\docs\spacing.md`](e:\projects\sys\docs\spacing.md) for all spacing decisions.
5. Reference [`e:\projects\sys\docs\design-system.md`](e:\projects\sys\docs\design-system.md) for all color/token decisions.
6. Reference [`e:\projects\sys\docs\components\README.md`](file:///e:/projects/sys/docs/components/README.md) to inspect and reuse existing components.
7. Reference [`e:\projects\sys\docs\ui-patterns.md`](e:\projects\sys\docs\ui-patterns.md) before building any page or section.

**Crucial Constraints:**
- **Read before Coding:** Always read the Design System documents and AI Rulebook first.
- **Component Reuse:** Reuse existing components. Never create duplicate components or write redundant inline layout boxes.
- **Design Tokens:** Always use design tokens. Never introduce arbitrary styling or hex color overrides.
- **System Extension:** If a requested layout conflicts with the Design System, explicitly explain the conflict and propose a compliant extension to the system tokens rather than bypassing it with one-off overrides.

---

## Design System Quick Reference (Always Active)

### Minimum Text Sizes — Non-Negotiable
```
text-[8px]   ← FORBIDDEN — never use
text-[9px]   ← FORBIDDEN — never use
text-[10px]  ← FORBIDDEN — never use
text-[11px]  ← MINIMUM for any label, badge, overline, button, breadcrumb
text-sm      ← MINIMUM for body copy (14px)
```

### Font Family Assignments
```
Headings (h1–h4):                 font-serif  (Cormorant Garamond)
Body, descriptions, paragraphs:   font-sans   (DM Sans)
Buttons, labels, overlines, tables, codes, badges, breadcrumbs: font-mono (Space Mono)
```

### Font Weight Assignments
```
h1, h2:           font-light    (300)  — THE SIGNATURE. Never use font-bold on h1/h2.
h3, h4:           font-semibold (600)
All card H3:      font-semibold (600) + text-xl (20px) — normalized across the project
Button text:      font-bold     (700)
Form labels:      font-bold     (700)
Body:             font-normal   (400)
Table headers:    font-bold     (700)
```

### Standard Overline Pattern
```jsx
<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold block mb-2">
  01 / Section Label
</span>
```

### Standard Heading with Accent
```jsx
<h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
  Main Heading{' '}
  <span className="italic font-serif text-gold">Accent Word</span>
</h2>
```

### Button Text Standard
```
font-mono text-[11px] font-bold uppercase tracking-[0.15em]
```
Never use font-sans on button text.

### Color Tokens (Use These — Never Arbitrary Hex or Gray Tailwind Classes)
```
Primary text:    text-cream
Secondary text:  text-dim
Ghost/decorative: text-text-ghost (readable text ONLY if contrast passes)
Background:      bg-void
Card bg:         bg-surface
Elevated bg:     bg-surface-alt
Accent:          text-gold / bg-gold / border-gold
Hover accent:    text-gold-light
Borders:         border-border / border-border-mid

FORBIDDEN: text-gray-*, bg-gray-*, text-white (use text-cream), bg-black (use bg-void)
```

### Spacing — 8px Grid Only
```
Allowed: p-1(4), p-2(8), p-3(12), p-4(16), p-5(20), p-6(24), p-8(32), p-10(40), p-12(48), p-16(64), p-20(80), p-24(96), p-28(112)
FORBIDDEN: p-7, p-9, p-11, p-[18px], m-[30px], gap-9, any non-grid arbitrary spacing
All page containers: max-w-7xl mx-auto px-6
```

### Card H3 Rule (Non-Negotiable)
```jsx
<h3 className="font-serif text-xl font-semibold text-cream">
  {title}
</h3>
```
Always text-xl (20px), always font-semibold (600), always font-serif.

### Accessibility (Required on Every Interactive Element)
```jsx
// Focus ring — never focus:outline-none alone:
focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2

// Icon buttons must have:
aria-label="Descriptive text"

// Accordions must have:
aria-expanded={isOpen}

// Active nav/breadcrumb must have:
aria-current="page"
```

### Section Vertical Padding
```
py-12  — compact sections
py-16  — standard sections
py-20  — full sections
py-28  — showcase/hero-adjacent sections
```

---

## Pre-Submit Checklist (Run Before Finalizing Any UI)

Before delivering any generated UI, verify:

```
[ ] No text below text-[11px]
[ ] Body paragraphs use text-sm (14px) minimum
[ ] No arbitrary hex colors — only design token classes
[ ] No arbitrary spacing — 8px grid only
[ ] H1/H2 use font-light, H3 uses font-semibold text-xl
[ ] Buttons use font-mono not font-sans
[ ] Overlines use text-[11px] tracking-[0.25em]
[ ] All interactive elements have focus-visible styles
[ ] Icon-only buttons have aria-label
[ ] Active breadcrumb/nav has aria-current="page"
[ ] Accordion triggers have aria-expanded
[ ] Animation has prefers-reduced-motion guard
[ ] Mobile starts with grid-cols-1
[ ] Exactly one h1 per page
```

---

## Conflict Resolution Rule

If a user request conflicts with the Design System:
1. **State the conflict explicitly** — which document, which rule
2. **Propose a compliant alternative** that achieves the same intent
3. **Never silently violate the rules**

Example: If asked for `text-[8px]` text → explain the 11px minimum rule and offer reduced weight or color as an alternative instead.

---

## Document Reference
```
Root AI Rulebook:     e:\projects\sys\AI_RULEBOOK.md
Full Design System:   e:\projects\sys\docs\README.md
Design Constitution:  e:\projects\sys\docs\design-constitution.md
All Tokens:           e:\projects\sys\docs\design-system.md
Typography:           e:\projects\sys\docs\typography.md
Spacing:              e:\projects\sys\docs\spacing.md
Accessibility:        e:\projects\sys\docs\accessibility.md
Components Directory: e:\projects\sys\docs\components\README.md
UI Patterns:          e:\projects\sys\docs\ui-patterns.md
AI Rules:             e:\projects\sys\docs\ai-generation-rules.md
Audit Reference:      e:\projects\sys\typography-design-audit.txt
```

---
*SYSLight Design System Rules · Workspace AGENTS.md · v1.0 · July 2026*
