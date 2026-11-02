# SYSlight — Typography Audit (Nov 2026)

> **Status (2 Nov 2026): all findings below have been fixed** except the WhatsApp button (white on brand green, 2:1), which is a brand-colour decision, and the Home CCT preview tiles' narrow mobile labels, which are a layout issue. The live rules are in `docs/typography.md`.

Scope: every live route (Home, About, Products hub, Category, Product detail, Smart lights, Home automation, Professionals, Projects, Contact) plus Navbar / Footer. Measured in the running site at 1440px and 375px, cross-checked against the source. **Audit only — no design or code was changed.** All recommendations below are typographic (size, weight, level, colour-of-text, case); layout, imagery, colour palette and components stay as they are.

---

## 1. Verdict

The live "Spec Studio" system (Inter Tight display · Inter UI/body · JetBrains Mono data) is a good, calm foundation, and the semantic classes in `app/globals.css` (`.display-1`, `.heading-1/2/3`, `.lead`, `.body`, `.eyebrow`) are the right idea. The problems are that roughly a third of the site bypasses them, so **priority is inconsistent page to page**:

- The **largest type on some pages is not the most important text** (About timeline years at 96px beat the 72px H1; Home-automation H2s at 48px nearly match its H1).
- The **most important text for specifiers is the quietest** (product codes and spec-table values are 12px, and codes are in the lowest-contrast grey).
- One heading level (H3) renders at **7 different sizes** (15, 16, 18, 20, 24, 30, 35px).
- The muted grey `text-ghost` **fails WCAG AA everywhere it is used**, and Home automation ships 8–11px text at 1.4–2:1 contrast.
- The docs describe a font system that no longer exists.

---

## 2. Critical — fix first

### 2.1 Source of truth is out of date
| File | Says | Reality |
|---|---|---|
| `docs/typography.md`, `components/theme.ts`, `typography-design-audit.txt` | Cormorant Garamond / DM Sans / Space Mono, 11px uppercase mono labels, H1/H2 weight 300 | Inter Tight / Inter / JetBrains Mono (`app/globals.css:1, 217-220`), labels are 12px Inter 600, headings 600 |
| `app/globals.css:81-93` `--text-*` tokens | h1 2.75rem, body-md 0.9375rem… | Declared in `:root`, not `@theme`, so no utilities exist and nothing uses them; values also disagree with the docs |

Anyone following the docs will reintroduce the old serif system. Rewrite `docs/typography.md` around the classes that actually ship (see §6) and delete or mark the old audit and `theme.ts` typography block as legacy.

### 2.2 Text that is unreadable or below the floor
Measured on Home automation: **8px ×9, 9px ×3, 10px ×9, 11px ×25**, contrast as low as 1.42:1.

| Where | Size / colour | Measured contrast |
|---|---|---|
| `.spectrum__zone-index` `app/globals.css:1717` | 8px, white/15 | 1.42 |
| `.spectrum__zone-label` `app/globals.css:1687` | 9–10px, white/25 | 2.05 |
| `.respond-orb__node-label` `app/globals.css:960` (About: "App / Voice / Switch") | 9px mono, tracking 0.22em, opacity .72 | — |
| `.neural-grid__node-label` `app/globals.css:1367` | 10px, white/35 | — |
| `EcosystemPhotonMesh.tsx:167,170`, `EcosystemLuminousSpectrum.tsx:112` | 9px uppercase | — |
| Card descriptions `ControlModesShowcase.tsx:88`, `SmartSolutionsShowcase.tsx:70`, `EcosystemPhotonMesh.tsx:141`, `IntelligentEcosystemShowcase.tsx:109,178` | 10–11px, white/50 | ~3.6 |
| `EcosystemLuminousSpectrum.tsx:145` footnote | 13px, white/25 | ~2 |

**Rule:** 12px is the floor for any rendered text; 12px only for uppercase labels / metadata, never for sentences. White-on-dark text no lower than white/60 for body, white/70 for ≤13px.

### 2.3 `text-ghost` fails AA on every use
`#81819A` on white = **3.79:1**, on `#F7F7F9` = **3.54:1**; dark-mode `#76768C` on `#0B0B0F` ≈ **4.4:1**. AA for normal text is 4.5.
It is used for: product codes (`ProductCard.tsx:51`), "Available in", filter counts (`ProductsHub.tsx:356-442`, `ProductCategory.tsx:223-256`), breadcrumbs (`Breadcrumbs.tsx:127`), contact labels (`Contact.tsx:328-350`), helper text (`Contact.tsx:306`), Smart-lights footnote (`SmartLights.tsx:104`), footer copyright (`Footer.tsx:97`), project category eyebrows (`Home.tsx:344`).
Darkening the token to about `#6E6E84` (light) / `#86869C` (dark) keeps the look and passes — a token value change, no layout change.

### 2.4 Fonts the browser is faking
Loaded faces (checked via `document.fonts`): Inter 400/500/600, Inter Tight 500/600, JetBrains Mono 400 — **no italics, no 700**.
- Testimonial quotes use `.body italic` (`TestimonialsCarousel.tsx:159`) → synthetic oblique on 27 elements on About. Either request `Inter:ital` in the font URL or drop the italic.
- `KelvinSlider.tsx:31` `font-mono font-bold` → synthetic bold (JetBrains loaded only to 600). Use `font-semibold`.
- `KelvinSlider.tsx:26` `text-md` is not a Tailwind class — size silently inherits. Use `text-base`.
- Inter 300 is requested but never used; fonts load via a render-blocking CSS `@import` (`globals.css:1`) rather than `next/font` (FOUT + layout shift on headings). `public/Fonts Azo Sans` and `Fonts Enra Sans` are unused.

---

## 3. Hierarchy & priority — page by page

### Global
**H1 size changes by page with no rule.** 72px (Home, About, Professionals — `.display-1`), 60px (Home automation — bespoke), 52px (Products, Category, Product, Smart lights, Projects, Contact — `.heading-1`).
→ Rule: `.display-1` for the four marketing landers (Home, About, Professionals, Home automation); `.heading-1` for catalogue/utility pages. Home automation should use `.display-1`, not its own stack (`HomeAutomationHero.tsx:62`).

**H3 has 7 sizes.** 15 (`ProductsHub.tsx:642`, ControlModes), 16 (SmartSolutions), 18 (Professionals `heading-3 text-lg`, ProductFeatures), 20 (`.heading-3`), 24 (category subheads, ControlModes "Works with"), 30 (About experience centre), 35 (About timeline).
→ Two sizes are enough: `.heading-3` 20px for card titles, and a 16px "card-title-sm" for dense grids. Anything larger than 24px is acting as an H2.

**Footer CTA competes with every page's own CTA.** `Footer.tsx:42` "Planning a project?" is an `h3` styled `heading-2` (40px). It sits directly under each page's closing CTA at the same 40px — About "Let's Light Your Next Project", Smart lights "Planning smart controls?", Projects "Feature your next project", Home automation "Plan your smart home with us". Two equal-weight asks back to back.
→ Step the footer CTA down to `heading-3`/24px, or drop the page CTA where the footer covers it.

**Footer column headings are smaller than their links.** `Footer.tsx:21` headings 13px/600 vs links 14px/400 (`Footer.tsx:25`). Inverted. → 13px uppercase `.eyebrow`-style in `text-ghost`-fixed, or 14px/600 to match links.

**Heading levels skip.** Footer goes h3 → h4 with no h2; Product detail jumps from H1 to H4 "Dimensions" (§3.5); Projects and Contact use H2 at 20px for card/sidebar titles while the same project cards are H3 on Home.

### 3.1 Home
- **Audience cards compete with section headings.** "Light your home beautifully" / "Specify with confidence" are `heading-2` (40px) inside cards (`Home.tsx:140`), identical to the section heading "Shop by category" just below. Cards inside a section should read one step down — ~28–32px (`heading-2` at its mobile size) keeps their importance without flattening the page.
- **The same stats render at three sizes:** 18px in the hero card (`Home.tsx:115`), 30px in "Our story" (`Home.tsx:301`), 24px on Professionals (`Professionals.tsx:137`). Pick one stat style (value 28–30px / label 13px).
- Hero stat labels are `text-xs` (12px) sentence text — raise to 13px.
- Blockquote at `heading-2` + `font-medium` (`Home.tsx:293`) is right in spirit; the attribution at 14px dim is fine.

### 3.2 About
- **Timeline cards have three focal points and the wrong winner.** Year 48–96px gold (`TimelineCardStack.tsx:67`, larger than the page H1), title H3 35px (`:82`), metric 36px gold (`:95`). Reading order should be **title → year → metric**. Suggested: year ≤ 56px, title `heading-2` mobile size (28–32px), metric 24–28px.
- `Milestones That<br/>Shape the Brand.` (`TimelineCardStack.tsx:42`) — the `<br/>` with no space makes assistive tech read "ThatShape", and the forced break fights `text-wrap: balance`. Add a space before the break.
- Experience-centre H3 at 30px (`About.tsx:219`) is bigger than card H3s and close to H2.
- Pillar H3s (`About.tsx:159, 286`) use `font-serif text-xl` instead of `.heading-3` and pick up line-height 1.4 vs 1.25 elsewhere.
- `.eyebrow` used as a link ("read more" style, `About.tsx:140, 247`) — a gold uppercase label that is also a link is ambiguous. Use `.link-arrow`.
- Pillar footer labels `About.tsx:164` 12px uppercase dim — fine.

### 3.3 Products hub & Category
- **Group labels smaller than their items.** "Indoor lighting" / "Sections" are 13px/600 (`ProductsHub.tsx:355`, `ProductCategory.tsx:211`) over 14px/400 items. Make group labels 12px uppercase `.eyebrow` (ghost-fixed) or 14px/600.
- **Sub-category headings don't separate groups.** H2 at 24px (`ProductCategory.tsx:361`) over product titles at 20px — a 1.2× step can't organise 100 cards. Use 28px+ (`heading-2`).
- Counts in filters are 12px ghost (fails AA, §2.3).
- Benefit tiles H3 15px (`ProductsHub.tsx:642`) — use `.heading-3` at 16–18px to match Professionals.

### 3.4 Product card
- Product **code** (`SL-GN-CT`) is the reference architects write into a schedule, yet it is 12px mono in failing grey (`ProductCard.tsx:51`). Keep 12px mono but move to `text-dim`.
- "Available in" ghost + wattage 14px — fine once ghost passes.

### 3.5 Product detail
- **Spec data is the smallest text on the page.** Spec section title "Specification" is a `<span>` 18px (`ProductSpecifications.tsx:39`, not a heading); its children "Dimensions" / "Technical Specifications" are H4 at 12px uppercase (`:313, :368`); table cells are 12px (`:319, :374`). For a specifier site this is the main payload.
  → Section title as `h2.heading-3`; sub-tables `h3` 12px uppercase is fine as a label; **table values 14px**, keys 12px uppercase dim.
- Accordion title `tracking-wide` on the display face (`ProductSpecifications.tsx:39`) contradicts the system's negative tracking; use `tracking-tight`.
- "Code SL-…" under the H1 (`ProductDetail.tsx:148`) is 14px mono — good priority; "Code" label in ghost fails AA.
- Marketing block: H2 "Lights Designed to Warm, Inspire and Endure" (`ProductFeatures.tsx:58`) at 40px is generic and Title Case; its H3s use `font-sans` (Inter) while all other H3s use Inter Tight (`ProductFeatures.tsx:83`).
- Mobile: product H1 "Snap" 32px vs that generic H2 28px — almost equal. Product name should clearly win (H1 ≥ 36px on mobile, or step the marketing H2 down).

### 3.6 Home automation (most issues)
- **Same H2 three times in a row.** IntelligentEcosystemShowcase, EcosystemPhotonMesh and EcosystemLuminousSpectrum all render `ECOSYSTEM_COPY.title` "Everything Works Beautifully Together" (`HomeAutomation.tsx:18-20`).
- **Internal labels shipped to production:** "Route 01 · Photon Mesh", "Route 02 · Luminous Spectrum" (`EcosystemPhotonMesh.tsx:83`, `EcosystemLuminousSpectrum.tsx:42`) render as eyebrows. These look like design-exploration names, not customer copy.
- **H2s are larger than the site's H2:** 48px (`text-[3rem]`) and 44px (`text-[2.75rem]`) vs `.heading-2` 40px — four bespoke size stacks across five components. Use `.heading-2`.
- Card titles 15–16px with descriptions at 11px (§2.2) — description must be ≥13px.
- Every heading is Title Case while the rest of the site is sentence case.
- Hero CTA uses uppercase 12px tracking 0.14em (`HomeAutomationHero.tsx:79`) — every other button on the site is sentence-case 14px/600 (`Button.tsx`). Reads as a different brand.

### 3.7 Smart lights
- Hierarchy is clean (H1 52 → H2 40 → H3 20).
- `KelvinSlider` bugs (§2.4).
- Footnote 13px ghost (`SmartLights.tsx:104`) fails AA.

### 3.8 Professionals
- Strongest page typographically. Only issue: H3 overridden to 18px (`heading-3 text-lg`) — fine if adopted as the "card-title-sm" token.
- Step numbers `0{i+1}` mono 14px gold — good use of mono.

### 3.9 Projects / Contact
- Project names are H2 at 20px on Projects but H3 on Home — level should match role (cards = H3 under a section H2).
- Contact sidebar titles "Talk to us directly" are H2 at 20px — fine semantically; labels "Phone / WhatsApp" in ghost fail AA; "(optional)" ghost fails AA.
- Error text 13px `text-danger` (`Contact.tsx:104`) — good.

---

## 4. Consistency

| Topic | Found | Recommend |
|---|---|---|
| Heading case | Title Case: About, Home automation, ProductFeatures, Testimonials ("Praised by Design Leaders"), timeline. Sentence case: Home, Products, Smart lights, Professionals, Contact | **Sentence case everywhere** (matches the majority and the calm Spec Studio voice) |
| Eyebrow | `.eyebrow` ×57, hand-rolled `font-sans text-xs uppercase tracking-[0.08em] font-semibold` ×~28, plus a 0.14em variant | Always `.eyebrow`; one tracking value (0.08em) |
| Eyebrow misuse | Used as link (About), as firm name (Testimonials), as project category (Home) | Eyebrow = section label only; metadata uses 12–13px dim |
| Body size | 13, 14, 15, 17px used interchangeably; `.body` (15) vs `text-sm` (14) for the same role | lead 17 · section body 15 · card body 14 · meta 13 · label 12 |
| Heading line-height | 1.02 → 1.5 (H3s without explicit leading inherit 1.4–1.5) | Display 1.02–1.06 · H2 1.1 · H3 1.25 · body 1.65 |
| Letter-spacing | `-0.035em` → `+0.025em` (`tracking-wide`) on the same display face | Negative only on display; positive only on uppercase labels |
| Families | `font-serif` and `font-display` both map to Inter Tight; `font-sans` H3s in ProductFeatures | Use `font-display` for headings; retire `font-serif` naming |
| Arbitrary sizes | `text-[2rem]`, `[2.35rem]`, `[2.75rem]`, `[3rem]`, `[3.5rem]`, `[3.75rem]`, `[2.2rem]`, `[15px]`, `[13px]`, `[11px]`, `[10px]`, `[9px]` | Map each to a semantic class (§6) |

---

## 5. What is working
- Clear semantic primitives with fluid `clamp()` sizes and good negative tracking on display type.
- `text-wrap: balance` on headings and `pretty` on paragraphs.
- Body line-height 1.65 and measured line lengths (`max-w-lg/xl`) on most paragraphs.
- Mono reserved mostly for codes and Kelvin values — correct use.
- Main text tokens (`cream`, `text-dim`) pass AA comfortably (dim ≈ 7.3:1).

---

## 6. Proposed scale (codifies what already ships)

| Role | Class | Size | Weight | LH | Use for |
|---|---|---|---|---|---|
| Display | `.display-1` | 40 → 72 | 600 | 1.02 | H1 on Home, About, Professionals, Home automation |
| Page title | `.heading-1` | 32 → 52 | 600 | 1.06 | H1 on catalogue/utility pages |
| Section | `.heading-2` | 28 → 40 | 600 | 1.10 | Every section H2 — no bespoke stacks |
| Sub-section | `.heading-3` | 20 (24 max) | 600 | 1.25 | Card titles, sub-groups |
| Card title sm | *(new)* | 16 | 600 | 1.35 | Dense grids (benefits, controls) |
| Lead | `.lead` | 17 | 400 | 1.65 | Intro under H1/H2 |
| Body | `.body` | 15 | 400 | 1.65 | Section copy |
| Card body | `text-sm` | 14 | 400 | 1.6 | Card descriptions, table values |
| Meta | `text-[13px]` | 13 | 400–500 | 1.5 | Captions, helper text |
| Label | `.eyebrow` | 12 | 600 upper, 0.08em | 1.3 | Section labels, table keys |
| Data | `font-mono` | 12–14 | 400–500 | — | Codes, Kelvin, dimensions |
| Stat | *(new)* | 28–30 | 600 | 1.0 | All KPI numbers |

Floor: **12px**, and 12px only for uppercase labels or mono codes.

---

## 7. Priority fix list (typography only, design untouched)

1. Darken `--color-text-ghost` in both themes to pass 4.5:1.
2. Raise all 8/9/10/11px text to ≥12px and white/15–/50 text to ≥ white/60 (Home automation, About orb labels).
3. Remove the duplicated H2 and the "Route 01/02" labels on Home automation.
4. About timeline: shrink year below H1, bring H3 to ≤32px, metric ≤28px.
5. Spec tables: values 14px; make "Specification" a real heading; product code to `text-dim`.
6. Footer: CTA to `heading-3`, column headings ≥ link size.
7. Unify H1 rule (display-1 vs heading-1) and collapse H3 to two sizes.
8. Sentence case for all headings; `.eyebrow` everywhere, never as a link.
9. Fix fake italic/bold (load Inter italic or drop it; `font-semibold` in KelvinSlider; `text-md` → `text-base`).
10. Move fonts to `next/font`, drop unused Inter 300 and Azo/Enra files.
11. Rewrite `docs/typography.md` and `components/theme.ts` to match the live system.
