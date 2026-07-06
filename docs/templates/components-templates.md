# Component-Level UI Prompt Templates

Use these templates to initialize prompts when generating specific UI blocks and widgets.

---

## 1. Forms Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate a Form component.
Requirements:
1. Input wrappers styled on the 8px grid (mb-6, flex flex-col gap-1.5).
2. Space Mono input labels at text-[11px] font-bold text-dim in uppercase.
3. Form input cells in bg-void border border-border px-4 py-3 placeholder:text-text-ghost text-sm text-cream.
4. Input errors with role="alert" associated via aria-describedby and styled in red-400.
5. Focus rings enabled (`focus-visible:ring-2 focus-visible:ring-gold`).
```

---

## 2. Tables Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md

Task: Generate a Data Table.
Requirements:
1. Wrap tables in responsive horizontal scroll boxes (overflow-x-auto rounded-xl border border-border).
2. Table header cells (<th>) styled at text-[11px] font-mono font-bold tracking-wider text-white uppercase bg-surface-alt/75.
3. Table body cells (<td>) styled at text-xs/text-sm font-mono text-cream px-4 py-3.
4. Active focus rows displaying subtle gold accents or borders.
```

---

## 3. Charts Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md

Task: Generate a Chart placeholder widget.
Requirements:
1. Render inside custom container dimensions (aspect-video or h-[320px] rounded-lg bg-surface border border-border).
2. Use standard accent color tokens (gold, gold-muted, cream, dim) for bars, tooltips, or area paths.
3. Explicit fallback loaders showing aria-label="Loading analytics..." tags during load transitions.
```

---

## 4. Modals Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Accessibility: e:\projects\sys\docs\accessibility.md

Task: Generate a Modal dialog component.
Requirements:
1. Backdrop overlay styled in bg-void/80 backdrop-blur-sm.
2. Centered dialog box styled in bg-surface, border border-border, p-card-lg, rounded-xl, and shadow-hover.
3. Focus trap: focus must remain locked inside the modal while active. Returning focus to trigger on close.
4. Include screen-reader labels (aria-modal="true" role="dialog" aria-labelledby="modal-title").
```

---

## 5. Sidebars Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md

Task: Generate a Sidebar navigation widget.
Requirements:
1. Structural aside wrapper (w-80, h-full, bg-surface/50, border-r border-border, p-6).
2. Navigation list using semantic <nav> and <ul> tags.
3. Navigation links styled at text-[11px] font-mono uppercase tracking-[0.15em] text-text-dim hover:text-gold transition-colors duration-200.
4. Active link marked with aria-current="page" and gold left-border accents.
```

---

## 6. Cards Template
```markdown
Before writing code, read:
- AI Rulebook: e:\projects\sys\AI_RULEBOOK.md
- Spacing: e:\projects\sys\docs\spacing.md

Task: Generate a content display card.
Requirements:
1. Container block: bg-surface, border border-border, rounded-md (2px) or rounded-lg (4px).
2. Standardized padding using token references (p-card-md or p-card-lg).
3. Hover animations: scale-up and shadow overlays (hover:-translate-y-1 hover:shadow-hover transition-all duration-300).
4. Card titles: font-serif text-xl font-semibold text-cream.
```
