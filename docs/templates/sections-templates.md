# Section-Level UI Prompt Templates

Use these templates to initialize prompts when generating section elements inside full page templates.

---

## 1. Hero Section Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md
- Typography: e:\projects\sys\docs\typography.md

Task: Generate a Hero Section.
Requirements:
1. Standard viewport container bounds: max-w-7xl mx-auto px-6 py-20 lg:py-28.
2. Centered or split-column text layouts using Cormorant Garamond serif light heading (text-4xl md:text-7xl), Space Mono section overline, and DM Sans paragraph description.
3. Call-to-Action primary and secondary button bindings using <Button>.
4. Background grids using bg-void or bg-surface-alt border borders.
```

---

## 2. Features Section Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md

Task: Generate a Features Grid Section.
Requirements:
1. Outer wrapper using standard vertical padding (py-16 md:py-24).
2. Features grid: grid-cols-1 md:grid-cols-3 gap-8.
3. Inner cards styled in bg-surface with rounded-md and p-card-md.
4. Card H3 titles: font-serif text-xl font-semibold text-cream.
5. All feature items wrapped inside staggered <ScrollReveal> transitions.
```

---

## 3. Testimonials Section Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Component reference: e:\projects\sys\docs\components\README.md

Task: Generate a Testimonials Section.
Requirements:
1. Section layout with header overline (tracking-[0.25em] text-gold text-[11px] font-mono).
2. Uses the <TestimonialsCarousel> component to render client slides.
3. Fallback layout: 3-column client reviews grid with italicized quotes, authors, and firms.
```

---

## 4. FAQ Section Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate an FAQ Accordion Section.
Requirements:
1. Accordion items nested in border border-border bg-surface-alt/30 wrapper boxes.
2. Expandable toggles using semantic <button> triggers with aria-expanded state attributes.
3. Smooth clip-path grid-template-rows animation triggers on open transitions.
4. Focus visible indicator outlines visible on keyboard focus.
```

---

## 5. Contact Section Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate a Contact Form Section.
Requirements:
1. Two-column grid layout (left: address/HQ cards, right: request form panel).
2. HQ Cards: bg-surface, border-border, p-8, rounded-sm.
3. Contact Form: all inputs bound to labels with htmlFor matching input IDs.
4. Active field focus: focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2.
5. Error labels associated via aria-describedby and role="alert" tags.
```
