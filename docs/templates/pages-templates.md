# Page-Level UI Prompt Templates

Use these templates to initialize prompts when generating full views or pages in the SYSLight codebase.

---

## 1. Landing Page Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing Rules: e:\projects\sys\docs\spacing.md
- Typography Rules: e:\projects\sys\docs\typography.md

Task: Generate a Landing Page view in Next.js.
Requirements:
1. Hero showcase with Cormorant Garamond serif light heading (text-5xl md:text-7xl), Space Mono tracking details, and primary/secondary <Button> actions.
2. Responsive grids for category sections using <CategoryCard> and staggered scroll reveal hooks.
3. Clean max-w-7xl mx-auto px-6 container bounds.
4. Enforce dark background colors (bg-void) and cream text (text-cream).
```

---

## 2. Dashboard Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Design Tokens: e:\projects\sys\docs\design-system.md
- Typography: e:\projects\sys\docs\typography.md

Task: Generate a Dashboard view.
Requirements:
1. Top summary grid showing statistics cards in bg-surface boxes with border-border outlines.
2. Data grid with Space Mono labels (text-[11px] font-bold text-dim) and focus-visible table controls.
3. Keep layouts responsive (single column on mobile, 3 columns on large desktop).
4. No hardcoded padding values. All spacings must follow the 8px grid (p-card-md, gap-6, py-8).
```

---

## 3. Admin Page Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing Rules: e:\projects\sys\docs\spacing.md

Task: Generate an Admin Page view.
Requirements:
1. Standard page header using serif title and gold accent overline.
2. Sidebar panel navigation on left (w-80, border-r border-border, bg-surface) and main dashboard container on right.
3. Use semantic HTML structures (<main>, <aside>, <section>).
4. Form selectors and save triggers must inherit from the <Button> components.
```

---

## 4. Analytics Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md
- Component Reference: e:\projects\sys\docs\components\README.md

Task: Generate an Analytics Page.
Requirements:
1. Chart components rendered within aspect-video boxes to prevent Cumulative Layout Shift (CLS).
2. Data tables with sticky headers, Space Mono text, and contrast-compliant light/dark mode labels.
3. Grid slots to arrange graph summaries responsive to the viewport width.
```

---

## 5. Settings Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate a Settings Page view.
Requirements:
1. Categorized configuration sections mapped as form groups.
2. Input fields, select grids, and checkbox elements must have htmlFor labels matching input IDs.
3. Associated error messages must use role="alert" and aria-describedby definitions.
4. Primary save action must use the primary variant <Button>.
```

---

## 6. Profile Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing Rules: e:\projects\sys\docs\spacing.md

Task: Generate a Profile Page view.
Requirements:
1. User details card container styled in bg-surface-alt with border-border outlines.
2. Avatar display wrapper with explicit height/width values.
3. Clean flexbox columns with Space Mono labels at text-[11px] and body text at text-sm.
```

---

## 7. Authentication Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate a sign-in or registration form block.
Requirements:
1. Full-screen centering container (min-h-screen bg-void flex items-center justify-center).
2. Central credentials card using bg-surface, rounded-md, and p-card-lg.
3. All inputs must have associated aria-required, autocomplete, and error label bindings.
4. Focus outlines visible on all input slots (`focus-visible:ring-2 focus-visible:ring-gold`).
```

---

## 8. Pricing Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md
- Component reference: e:\projects\sys\docs\components\README.md

Task: Generate a Pricing Page view.
Requirements:
1. Pricing comparison grid displaying tiered cards in bg-surface with hover glow triggers (shadow-hover).
2. Standardized H3 titles (font-serif text-xl font-semibold text-cream).
3. Primary pricing actions using primary and secondary <Button> variants.
4. Responsive spacing (py-16 md:py-28).
```
