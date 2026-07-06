# SYSLight AI Rulebook (AI_RULEBOOK.md)
**Mandatory Configuration for All Future UI Generation**

This rulebook is the permanent source of styling and design control for the SYSLight project. All AI agents, subagents, and LLM systems modifying or adding files to this repository MUST strictly enforce these constraints.

---

## 🏛️ Core Directives

### 1. Always Read the Design System
Before proposing any interface changes, read the documents located in `docs/`:
- [design-system.md](file:///e:/projects/sys/docs/design-system.md)
- [typography.md](file:///e:/projects/sys/docs/typography.md)
- [spacing.md](file:///e:/projects/sys/docs/spacing.md)
- [ai-generation-rules.md](file:///e:/projects/sys/docs/ai-generation-rules.md)

### 2. Always Reuse Components
Never duplicate logic or inline standard components. Always import from `components/ui/` or `components/layout/`:
- `<Button>` for triggers and actions.
- `<ProductCard>` for catalog items.
- `<CategoryCard>` for category cells.
- `<Breadcrumbs>` for section navigation paths.

### 3. Never Invent Styles (Typography, Spacing, Colors)
- **Typography Floor:** `11px` is the absolute floor for labels, buttons, or captions. No text size may fall below `text-[11px]`. Body copy must be at least `text-sm` (14px).
- **Font Families:** Use `font-serif` for titles (h1–h3), `font-sans` for paragraphs/descriptions, and `font-mono` for buttons, labels, and table cells.
- **Spacing:** Enforce the 8px grid. Use only multiples of 4px/8px matching Tailwind classes (e.g. `p-2`, `p-4`, `p-5`, `p-6`, `p-8`, `p-10`). No arbitrary values (`p-[13px]`, `mt-[9px]`).
- **Colors:** Use only system tokens (`text-cream`, `text-dim`, `bg-void`, `bg-surface`, `border-border`, `text-gold`). Never write `text-gray-*` or inline arbitrary hex values.

### 4. Always Maintain Accessibility & Responsiveness
- **Contrast:** Ensure all readable texts meet WCAG 2.2 AA (4.5:1 ratio).
- **Focus Rings:** Implement visible interactive rings (`focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`).
- **Touch Targets:** Maintain 44×44px hit bounds on mobile.
- **Mobile First:** Build using single-column responsive grids on mobile (`grid-cols-1 md:grid-cols-3`).

---

## ⚠️ Conflict Resolution Rule
If a user request requests a style that conflicts with the design rules (e.g., text smaller than 11px, or an arbitrary color):
1. **Explain the conflict** explicitly, citing the rule.
2. **Propose a compliant alternative** that achieves the visual intent (e.g., reducing font weight or utilizing a lighter color token instead of a smaller font size).
3. **Never silently bypass these rules.**
