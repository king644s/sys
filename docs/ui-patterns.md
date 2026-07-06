# SYSLight UI Patterns
**Version 1.0 · Reusable Patterns · July 2026**

> This document describes the recurring UI patterns used across SYSLight. A pattern is a proven solution to a recurring design problem. Use patterns before inventing new solutions.

---

## Pattern Index

1. [Section Header Pattern](#1-section-header-pattern)
2. [Hero Section Pattern](#2-hero-section-pattern)
3. [Feature Grid Pattern](#3-feature-grid-pattern)
4. [Product Grid Pattern](#4-product-grid-pattern)
5. [Split Content Pattern](#5-split-content-pattern)
6. [Full-Bleed Visual Pattern](#6-full-bleed-visual-pattern)
7. [CTA Block Pattern](#7-cta-block-pattern)
8. [Filter + Grid Pattern](#8-filter--grid-pattern)
9. [Specification Panel Pattern](#9-specification-panel-pattern)
10. [Timeline Pattern](#10-timeline-pattern)
11. [Testimonial Section Pattern](#11-testimonial-section-pattern)
12. [Contact Form Pattern](#12-contact-form-pattern)
13. [Image Carousel Pattern](#13-image-carousel-pattern)
14. [Stat Strip Pattern](#14-stat-strip-pattern)
15. [Page Transition Pattern](#15-page-transition-pattern)

---

## 1. Section Header Pattern

**Use**: To introduce any major page section.

**Structure**:
```jsx
<div className="flex flex-col gap-2 mb-12">
  {/* Overline */}
  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold">
    {sectionNumber} / {sectionLabel}
  </span>

  {/* Heading */}
  <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight">
    {headingText}{' '}
    <span className="italic font-serif text-gold">{accentWord}</span>
  </h2>

  {/* Optional description */}
  <p className="font-sans text-sm text-dim max-w-xl leading-relaxed mt-2">
    {description}
  </p>
</div>
```

**Rules**:
- Overline always precedes the H2
- H2 always has one italic accent word in gold
- Description is `max-w-xl` (576px) — never full-width
- The section number format is `01 / Label`, `02 / Label`, etc.
- Overline tracking: always `0.25em`

**Variants**:
- **Centered**: Add `text-center mx-auto` to the container (used on hero-adjacent headers)
- **Split (left + right)**: Use `flex flex-col sm:flex-row sm:items-end sm:justify-between` (used on SmartSolutions)

---

## 2. Hero Section Pattern

**Use**: First section of every page.

**Structure**:
```jsx
<section className="min-h-[85vh] flex flex-col items-center justify-center relative overflow-hidden">
  {/* Background */}
  <div className="absolute inset-0 bg-gradient-to-b from-void via-void/95 to-void" />
  
  {/* Optional: 3D / visual element */}
  {/* Optional: Ambient orb glow */}
  
  <div className="relative max-w-5xl mx-auto px-6 text-center">
    {/* Overline */}
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-3 block">
      {tagline}
    </span>
    
    {/* H1 */}
    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light text-cream tracking-tight leading-none mb-6">
      {line1}
      <span className="italic text-gold">{accentPhrase}</span>
    </h1>
    
    {/* Subtitle */}
    <p className="font-sans text-sm md:text-base text-dim max-w-2xl mx-auto leading-relaxed mb-8">
      {subtitle}
    </p>
    
    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button variant="primary">Primary CTA</Button>
      <Button variant="secondary">Secondary CTA</Button>
    </div>
  </div>
  
  {/* Scroll indicator */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ghost">Scroll</span>
    <div className="w-px h-8 bg-border animate-pulse" />
  </div>
</section>
```

**Rules**:
- Every page has exactly one `<h1>`
- Hero always fills ≥85vh
- H1 is always `font-light` (300) in serif
- Hero always has a clear primary CTA
- Scroll indicator is optional but recommended

---

## 3. Feature Grid Pattern

**Use**: Displaying 3–6 equal-weight feature cards (e.g. About pillars, Smart control modes).

**Structure**:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {features.map((feature, i) => (
    <ScrollReveal key={feature.id} direction="up" delay={i * 0.08}>
      <article className="group flex flex-col p-8 border border-border hover:border-gold/50 bg-surface rounded-[2px] transition-all duration-500 hover:-translate-y-1">
        {/* Icon */}
        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center mb-6">
          <feature.Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
        </div>
        
        {/* Title */}
        <h3 className="font-serif text-xl font-semibold text-cream mb-2">
          {feature.title}
        </h3>
        
        {/* Body */}
        <p className="font-sans text-sm text-dim leading-relaxed">
          {feature.description}
        </p>
      </article>
    </ScrollReveal>
  ))}
</div>
```

**Rules**:
- Always use `ScrollReveal` with staggered `delay`
- All feature icons are identical size (w-5 h-5 inside w-10 h-10 container)
- H3 is always 20px (`text-xl`) semibold serif — no exceptions
- `article` element (semantically correct for self-contained content)

---

## 4. Product Grid Pattern

**Use**: Displaying a grid of ProductCards.

**Structure**:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
  {products.map((product, i) => (
    <ScrollReveal key={product.id} direction="up" delay={(i % 4) * 0.06}>
      <ProductCard product={product} />
    </ScrollReveal>
  ))}
</div>
```

**Rules**:
- 4-column on desktop, 2 on tablet, 1 on mobile
- Always staggered with ScrollReveal (`delay` cycles mod 4)
- Gap is always `gap-6` (24px)
- Never mix ProductCard with other card types in the same grid

---

## 5. Split Content Pattern

**Use**: Side-by-side content — text left, visual right (or vice versa).

**Structure**:
```jsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
  {/* Text column */}
  <div className="lg:col-span-5">
    <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-2 block">
      {overline}
    </span>
    <h2 className="font-serif text-3xl md:text-5xl font-light text-cream tracking-tight mb-4">
      {heading}
    </h2>
    <p className="font-sans text-sm text-dim leading-relaxed mb-8">
      {body}
    </p>
    <Button variant="primary">{cta}</Button>
  </div>
  
  {/* Visual column */}
  <div className="lg:col-span-7 relative aspect-[4/3] rounded-[2px] overflow-hidden">
    <img src={image} alt={alt} className="w-full h-full object-cover" />
  </div>
</div>
```

**Rules**:
- Text column: 5 of 12 grid columns
- Visual column: 7 of 12 grid columns (slightly dominant)
- Alternate direction on alternating sections (text-left then text-right)
- Always `items-center` vertical alignment

---

## 6. Full-Bleed Visual Pattern

**Use**: Immersive background image sections with text overlay (ControlModes, project cards).

**Structure**:
```jsx
<div className="relative h-[500px] overflow-hidden rounded-[2px]">
  {/* Background */}
  <img src={image} alt={alt}
    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-95 group-hover:scale-105 transition-all duration-700 ease-out-expo" />
  
  {/* Gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-transparent" />
  
  {/* Content */}
  <div className="absolute bottom-0 inset-x-0 p-6">
    <span className="font-mono text-[11px] uppercase tracking-widest text-gold-muted">
      {category}
    </span>
    <h3 className="font-serif text-xl font-bold text-cream mt-1">
      {title}
    </h3>
  </div>
</div>
```

**Rules**:
- Always use `from-void` gradient (not from-black) to match the page background
- Image default opacity: 0.70, hover: 0.95
- Text always bottom-anchored (not centered)
- Never use this pattern for product cards — use ProductCard component

---

## 7. CTA Block Pattern

**Use**: Standalone call-to-action section (end of pages, mid-page conversion).

**Structure**:
```jsx
<section className="max-w-4xl mx-auto px-6 py-20 text-center border-t border-border">
  <ScrollReveal direction="up">
    {/* Optional icon */}
    <Icon className="w-10 h-10 text-gold-muted/50 mb-4 mx-auto" />
    
    {/* Heading */}
    <h2 className="font-serif text-2xl md:text-3xl font-light text-cream tracking-tight">
      {heading}
    </h2>
    
    {/* Description */}
    <p className="font-sans text-sm text-dim max-w-md mx-auto mt-4 leading-relaxed">
      {description}
    </p>
    
    {/* CTAs */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
      <Button variant="primary">{primaryCta}</Button>
      <Button variant="ghost">{secondaryCta}</Button>
    </div>
  </ScrollReveal>
</section>
```

**Rules**:
- H2 in CTA block is `font-light` (not bold — it's a call, not a shout)
- Description width: `max-w-md` (448px) for focused reading
- Always centered
- Maximum one primary button

---

## 8. Filter + Grid Pattern

**Use**: Filterable content grids (ProductsHub, Projects).

**Layout**:
```
[Sidebar / Filter tabs]  ←  Fixed on desktop, drawer on mobile
[Product grid]           ←  Fills remaining width
```

**Filter Tab Bar (horizontal)**:
```jsx
<div className="flex flex-wrap gap-2 border border-border p-1.5 bg-surface-alt">
  {filters.map(filter => (
    <button
      className={`px-5 py-2 font-mono text-[11px] uppercase tracking-widest transition-all duration-300 cursor-pointer
        ${active === filter
          ? 'bg-gold text-void-dark font-bold'
          : 'text-dim hover:text-cream'
        }`}
    >
      {filter}
    </button>
  ))}
</div>
```

**Rules**:
- Filter labels: always `text-[11px]` (never 9px)
- Active filter: gold background, dark text
- Empty state is always shown (never just blank space)

---

## 9. Specification Panel Pattern

**Use**: ProductDetail spec accordions, technical data.

**Structure**:
```
[Accordion container]
  [Trigger: "Specification"]
    [ChevronDown] [Title in serif 18px]
  [Panel: Grid animation reveal]
    [Table header row] ← gold-muted bg, white mono 11px bold
    [Data table]       ← mono 11px headers, mono 12px cells
```

**Table Cell Typography**:
- Header cells: `font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-dim`
- Data cells: `font-mono text-xs text-dim` → raise to `font-mono text-[12px] text-dim`
- Key data (wattage, gold highlight): `font-mono text-[12px] font-medium text-gold`

---

## 10. Timeline Pattern

**Use**: Brand history, production process steps.

**Rules**:
- Each step has: number indicator + heading + body
- Numbers use: `font-serif text-5xl font-light text-gold/20` (decorative, behind content)
- Headings: `font-serif text-xl font-semibold text-cream`
- Body: `font-sans text-sm text-dim leading-relaxed`
- Connector line: `w-px h-full bg-border` between steps

---

## 11. Testimonial Section Pattern

**Use**: Client quote carousel.

**Container**:
```jsx
<section className="max-w-7xl mx-auto px-6 py-16 md:py-20">
  <TestimonialsCarousel testimonials={testimonials} />
</section>
```

**Each Card**:
- Background: `bg-surface border border-border`
- Quote: `font-sans text-sm italic text-dim leading-relaxed` (14px — not 12px)
- Author: `font-sans text-sm font-semibold text-cream`
- Firm: `font-mono text-[11px] uppercase tracking-wider text-gold`

---

## 12. Contact Form Pattern

**Use**: Contact/inquiry page.

**Layout**: Two-column on desktop (`lg:grid-cols-2`):
- Left: Contact details, cards, map/WhatsApp
- Right: Form card

**Form Card**:
- Background: `bg-surface border border-border`
- Padding: `p-8 md:p-10`
- Border radius: `rounded-[2px]`

**Form Field Order**:
1. Name + Email (2-col grid)
2. Phone + Company (2-col grid)
3. Subject
4. Message (textarea, rows=5)
5. File upload (optional)
6. Submit button (full-width, h-12)
7. Privacy note

---

## 13. Image Carousel Pattern

**Use**: ProductDetail image gallery.

**Rules**:
- Main image: `aspect-square` constrained container
- Thumbnails: horizontal strip, `w-16 h-16`, gold border on active
- Navigation: previous/next buttons, min 44×44px touch target
- Keyboard: arrow keys supported
- Full-screen: optional lightbox

---

## 14. Stat Strip Pattern

**Use**: Displays 3–5 key brand metrics inline.

**Structure**:
```jsx
<div className="flex flex-wrap gap-8 md:gap-12">
  {stats.map(stat => (
    <div className="flex flex-col">
      <span className="font-serif text-3xl font-bold text-gold">{stat.value}</span>
      <span className="font-mono text-[11px] uppercase tracking-widest text-dim mt-1">
        {stat.label}
      </span>
    </div>
  ))}
</div>
```

**Rules**:
- Stat value: always `font-serif text-3xl font-bold text-gold`
- Stat label: always `font-mono text-[11px] uppercase tracking-widest text-dim`
- Current violation: some use `text-[9px]` — must be raised to `text-[11px]`

---

## 15. Page Transition Pattern

**Use**: Animated page entrance.

**Current Implementation**: `.transition-page-enter` applied to outer div of every view.

**CSS**:
```css
@keyframes pageEnter {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
.transition-page-enter {
  animation: pageEnter 0.5s ease-out-expo forwards;
}
@media (prefers-reduced-motion: reduce) {
  .transition-page-enter { animation: none; }
}
```

**Rules**:
- Every view root must have `className="transition-page-enter"`
- Duration: 500ms (not longer)
- Reduced motion guard is mandatory

---

## Pattern Anti-Patterns

### Never:
- Create a new heading size not in the typography scale
- Create a new card pattern when `ProductCard` or `FeatureCard` already exists
- Mix the sharp-edge card style with round-card style in the same grid
- Use `text-text-ghost` for any text that conveys information
- Add a new CTA button without using the `Button` component
- Create a custom filter UI when the `FilterTabs` pattern exists
- Place more than one `h1` on any page
- Use a `div` with `onClick` when a `button` or `a` is semantically correct

---

*UI Patterns v1.0 · SYSLight Design System · July 2026*
