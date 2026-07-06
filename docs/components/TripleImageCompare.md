# TripleImageCompare Component Documentation

## Purpose
The `TripleImageCompare` allows users to compare three distinct states of an image (e.g. Warm amber, Studio neutral, and Cool daylight CCT profiles) simultaneously using two draggable vertical dividers.

## When to Use
- Custom customization showrooms comparing multiple color temperature spaces side-by-side.

## When Not to Use
- Simple two-state comparisons (use [BeforeAfterCompare](file:///e:/projects/sys/docs/components/BeforeAfterCompare.md) instead).

## Variants
- Features preset buttons at the top ("Sunset Warm", "Neutral Studio", "Daylight Cool", "Reset") to instantly snap dividers to target ratios.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `images` | `TripleCompareImage[]` | *Required* | Array of exactly 3 objects specifying src, label, and alt description. |
| `className` | `string` | `""` | Additional styling classes. |

## Accessibility
- Draggable handles are screen-reader labeled (`role="slider"` with `aria-valuenow`).
- Handles are keyboard focusable (`tabIndex={0}`) and show outline rings (`focus-visible:ring-2`).
- Visually hidden inputs mirror range properties for screen readers.

## Responsive Behavior
- Adjusts dimensions gracefully. Divider preset controls wrap on mobile viewports.

## Example Usage
```tsx
import { TripleImageCompare } from '@/components/ui/TripleImageCompare';

const IMAGES = [
  { src: '/warm.jpg', label: 'Warm 2700K', alt: 'Warm amber room render' },
  { src: '/studio.jpg', label: 'Studio 4000K', alt: 'Neutral studio room render' },
  { src: '/daylight.jpg', label: 'Daylight 6500K', alt: 'Cool daylight room render' }
];

export default function Showroom() {
  return <TripleImageCompare images={IMAGES} />;
}
```

## Best Practices
- Load high quality aligned assets to prevent focal shifts when dragging dividing lines.

## Common Mistakes
- Providing less than or more than exactly 3 image objects in the `images` array.
