# ProductSpecifications Component Documentation

## Purpose
The `ProductSpecifications` component displays product specs and technical dimensions in a structured, accessible layout using expandable accordion tables.

## When to Use
- Detailed product pages to catalog dimming values, fixture depths, and beam angles.
- High-fidelity spec summaries.

## When Not to Use
- Quick previews or sidebar elements where space is restricted (use simpler lists instead).

## Variants
- Automatically splits specifications into nested tabs for "Dimensions & Variants" and "Technical Specifications".

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `product` | `Product` | *Required* | Complete product object containing detailed dimensions and spec rows. |

## Accessibility
- Accordion triggers explicitly manage `aria-expanded` attributes.
- Keyboard accessible: panels can be toggled using Enter and Space keys.
- Dense table headers are styled at `text-[11px]` with `font-bold` for screen-reader readability.

## Responsive Behavior
- Tables convert to scrollable grid cells on small screen sizes, preventing overflow bugs on mobile devices.

## Example Usage
```tsx
import { ProductSpecifications } from '@/components/ui/ProductSpecifications';
import { PRODUCTS } from '@/data';

export default function SpecsTab() {
  const product = PRODUCTS[0];
  return <ProductSpecifications product={product} />;
}
```

## Best Practices
- Organize specification sheets into clean key-value pairs before passing them to data collections.
- Always provide fallback tags (`—`) for dimensions that do not apply to specific products.

## Common Mistakes
- Hardcoding custom fonts in table data columns. The tables inherit system typography values dynamically.
