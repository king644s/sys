# SYSLight Design System — Master Index
**Version 1.0 · Systems Creator · Established July 2026**

---

## What This Is

This `/docs` directory is the **permanent Design System Foundation** for SYSLight. It is the single source of truth for every UI decision made in this codebase — present and future.

No typography, color, spacing, component, or layout may be invented outside these documents without explicit justification and documented deviation.

---

## Document Map

| File | Purpose | Read When |
|------|---------|-----------|
| [`design-constitution.md`](./design-constitution.md) | Philosophy, principles, UX rules | Starting a new feature or page |
| [`design-system.md`](./design-system.md) | All design tokens (colors, shadows, radii, animation) | Adding any styled element |
| [`typography.md`](./typography.md) | Complete type scale, all component typography | Writing any text |
| [`spacing.md`](./spacing.md) | 8px grid system, spacing usage guide | Adding margin, padding, or gap |
| [`accessibility.md`](./accessibility.md) | WCAG 2.2 AA standards, contrast, focus, ARIA | Building interactive components |
| [`component-guidelines.md`](./component-guidelines.md) | Every component's anatomy, states, and rules | Modifying or creating components |
| [`ui-patterns.md`](./ui-patterns.md) | 15 reusable layout patterns with code | Building pages or sections |
| [`ai-generation-rules.md`](./ai-generation-rules.md) | Mandatory rules for every AI-generated UI | Before generating any UI code |

---

## Design System Quick Facts

```
Brand:            SYSLight by Systems Creator
Category:         Premium Architectural LED Lighting
Audience:         Architects, interior designers, specification engineers

Serif Font:       Cormorant Garamond (Google) — headings, display, quotes
Sans Font:        DM Sans (Google) — body, UI, forms
Mono Font:        Space Mono (Google) — labels, codes, specs, buttons

Font Themes:      Default (Cormorant+DM+SpaceMono), Azo, Editorial
Color Modes:      Dark (default), Light

Primary Accent:   --color-gold (#6A67CC dark / #4D4A9D light)
Page Background:  --color-void (#010101 dark / #FFFFFF light)
Primary Text:     --color-cream (#E5E5E6 dark / #010101 light)

Spacing Base:     8px grid
Min Text Size:    11px (absolute floor — no exceptions)
Body Copy Size:   14px (text-sm)
WCAG Target:      2.2 Level AA

Container Max:    max-w-7xl (1280px)
Container Px:     px-6 (24px)
Card Style:       Sharp-edged (rounded-[1px] or rounded-[2px])
Showcase Style:   Soft-edged (rounded-2xl = 16px)
```

---

## The Minimum Size Rule

> **11px is the absolute minimum for any text rendered to the screen.**  
> This is the single most important rule in the entire design system.  
> It applies to all components, all states, all themes, all modes.

---

## Color Authority

### Dark Mode Tokens
| Token | Hex | Use |
|-------|-----|-----|
| `--color-void` | `#010101` | Page background |
| `--color-surface` | `#0D0C15` | Card/nav background |
| `--color-surface-alt` | `#141321` | Elevated surface |
| `--color-cream` | `#E5E5E6` | Primary text |
| `--color-text-dim` | `#9B99BB` | Secondary text |
| `--color-gold` | `#6A67CC` | Brand accent |
| `--color-border` | `#201F33` | Separator |

### Current Contrast Issues (Track)
- `text-text-ghost` on all backgrounds: fails 4.5:1 — **decorative use only**
- `text-gold` on light white: 3.1:1 — **large text only in light mode**

---

## Typography Authority

### The Scale Floor
```
Label / overline minimum: 11px  → font-mono text-[11px]
Caption minimum:          12px  → text-xs
Secondary body minimum:   13px  → text-[13px]
Primary body minimum:     14px  → text-sm
```

### The Signature Heading Style
```
All H1 and H2: font-serif, font-light (300), tracking-tight
All H3:        font-serif, font-semibold (600), 20px
One italic accent word in gold per heading
```

---

## Audit Foundation

This Design System was built from a full codebase audit completed July 2026:

- **47+ arbitrary font sizes** reduced to **14 semantic tokens**
- **12 letter-spacing variants** reduced to **5 semantic tokens**
- **8 button typography variants** standardized to **1**
- **3 overline tracking variants** standardized to **1** (0.25em)
- **8px text** (accessibility violation) raised to **11px minimum**
- **Ghost color contrast failures** identified and corrected tokens specified
- **Body copy at 12px** flagged — standard raised to **14px**

Reference audit: [`../typography-design-audit.txt`](../typography-design-audit.txt)

---

## How to Use This Design System

### When Building a New Page
1. Read `design-constitution.md` — understand what the page must communicate
2. Read `ui-patterns.md` — identify patterns that match the page structure
3. Assemble from existing patterns — don't invent new layouts
4. Verify text sizes using `typography.md`
5. Verify spacing using `spacing.md`
6. Run accessibility checklist from `accessibility.md`

### When Building a New Component
1. Check `component-guidelines.md` — does it already exist?
2. If similar exists, extend it — don't create a parallel component
3. If new, define its anatomy, states, and typography in `component-guidelines.md`
4. Use only tokens from `design-system.md`

### When Using AI to Generate UI
1. Reference `ai-generation-rules.md` explicitly
2. Ask the AI to confirm it has loaded the design system before generating
3. Review output against the RULE 11 checklist in `ai-generation-rules.md`
4. Reject any output that contains 8px/9px/10px text, arbitrary colors, or arbitrary spacing

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | July 2026 | Initial Design System established from full audit |

---

*SYSLight Design System · Systems Creator · Version 1.0 · July 2026*
