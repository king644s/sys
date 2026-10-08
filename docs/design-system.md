# SYSlight Design System — "Spec Studio"
**Version 2.0 · October 2026 · source of truth: `app/globals.css`**

Clean, modern and spec-forward. One accent (brand indigo), neutral ink and greys,
generous whitespace, soft radii. It has to work for two audiences at once:
homeowners (B2C) and architects, contractors and dealers (B2B).

> Use the tokens, type classes and components below. Don't hardcode colours,
> invent new heading styles, or reintroduce italic serif accents / tiny
> uppercase monospace labels — those belong to the retired v1 system.

---

## Colour tokens

Legacy token names are kept so every component shares one palette. Read them as:

| Token (Tailwind) | Role | Light | Dark |
|---|---|---|---|
| `void` | Page background | `#FFFFFF` | `#0B0B0F` |
| `void-dark` | Alternate section band | `#F7F7F9` | `#07070A` |
| `surface` | Card | `#FFFFFF` | `#131318` |
| `surface-alt` | Subtle fill (image wells, inputs, hovers) | `#F5F5F8` | `#18181F` |
| `surface-high` | Strongest fill | `#ECECF2` | `#202029` |
| `cream` | **Ink** — primary text | `#111114` | `#F2F2F5` |
| `text-dim` | Secondary text | `#55556A` | `#A6A6B8` |
| `text-ghost` | Muted text, captions, counts | `#81819A` | `#76768C` |
| `gold` | **Accent** — brand indigo | `#4D4A9D` | `#8F8CEB` |
| `gold-light` | Accent hover | `#5E5AC0` | `#A7A4F2` |
| `accent-soft` | Accent tint (chips, icon wells, selected) | `#EFEEF9` | indigo 12% |
| `on-accent` | Text on a solid accent fill | `#FFFFFF` | `#0B0B0F` |
| `border` / `border-mid` / `border-high` | Hairlines, inputs, hover borders | `#E6E6EC` / `#D5D5DF` / `#B9B8CC` | `#24242E` / `#31313D` / `#474759` |
| `success` / `danger` | Status | `#15803D` / `#DC2626` | `#4ADE80` / `#F87171` |

Rules
- **One accent per view for filled buttons.** Everything else is secondary/ghost.
- Text on `bg-gold` is always `text-on-accent` (it flips in dark mode).
- Dark "showcase" bands (smart lighting promo, testimonial quote, Home Automation
  visuals) use `#111114` with white text in both themes — that's intentional.

## Typography

| Family | Token | Use |
|---|---|---|
| Inter Tight | `font-display` (also `font-serif` for legacy markup) | Headings, display numbers |
| Inter | `font-sans` | Body, UI, buttons, labels |
| JetBrains Mono | `font-mono` | **Only** product codes and numeric data (kelvin, dimensions) |

Type classes (defined in `@layer components`):

| Class | Size | Use |
|---|---|---|
| `.display-1` | clamp(40→72px), 600, -0.035em | Page hero (one per page) |
| `.heading-1` | clamp(32→52px), 600 | Listing/page titles |
| `.heading-2` | clamp(28→40px), 600 | Section titles |
| `.heading-3` | 20px, 600 | Card titles |
| `.eyebrow` | 12px, 600, uppercase, 0.08em, accent | Label above a heading |
| `.lead` | 17px / 1.65, `text-dim` | Intro paragraph under a heading |
| `.body` | 15px / 1.65, `text-dim` | Body copy |

Headings are sentence case. Highlight words with `<span className="text-gold">` — no italics.

## Layout

- `.container-page` — max 1280px, 20px gutter (32px ≥768px). Use for every section.
- `.section` — vertical rhythm, 64px (96px ≥768px).
- Alternate bands: `bg-void-dark border-y border-border`.
- Header height: `--header-height` (72px). Sticky elements use `top-[calc(var(--header-height)+24px)]`.

## Radii & elevation

`rounded-sm` 6px (buttons, inputs) · `rounded-md` 10px (image wells) ·
`rounded-lg` 14px (cards) · `rounded-xl` 18px (feature bands).
Shadows: `shadow-subtle`, `shadow-card`, `shadow-hover`, `shadow-lifted`, `shadow-glow` (focus ring).

## Components

| Component / class | File | Notes |
|---|---|---|
| `Button`, `buttonClasses()` | `components/ui/Button.tsx` | Variants `primary` · `secondary` · `ghost` · `gold-outline` · `inverse`; sizes `sm` 36px · `md` 44px · `lg` 52px. Use `buttonClasses()` for `<Link>`/`<a>` that need button styling. For responsive hiding use `max-*:hidden` (plain `hidden` loses to the built-in `inline-flex`). |
| `SectionHeader` | `components/ui/SectionHeader.tsx` | eyebrow → title → description, optional right-side action. The standard section opener. |
| `.card`, `.card-interactive` | globals.css | Bordered surface; interactive adds hover lift. |
| `.chip`, `.chip-accent` | globals.css | Pills for badges, counts, filters. |
| `.field`, `.field-label` | globals.css | Inputs, selects, textareas. |
| `.link-arrow` | globals.css | Accent text link with arrow nudge on hover. |
| `ProductCard`, `CategoryCard` | `components/ui/` | Image well + code + title. |
| `ProductFAQ` | `components/ui/ProductFAQ.tsx` | Accordion; pass `items` for page-specific questions. |

## Site structure (v2)

Primary nav: **Products** (mega menu) · **Smart Living** (Smart Lights, Home Automation) ·
**Projects** · **For Professionals** · **About** — plus Search, Contact, **Get a quote**.

Conversion paths:
- `quoteHref(product?)` → `/contact?topic=quote&product=…`
- `brochureHref()` → `BROCHURE_URL` in `lib/site.ts`, or the contact form with the brochure topic until a PDF is uploaded.
- Product pages: Request a quote · Ask on WhatsApp · Request spec sheet / IES file.
