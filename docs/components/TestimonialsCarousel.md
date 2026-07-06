# TestimonialsCarousel Component Documentation

## Purpose
Displays interactive testimonials with reviews, authors, and firms. Implements automatic loops, hover pause triggers, and responsive count calculations.

## When to Use
- Social proof sections on homepages or landings.
- Client validation cases.

## When Not to Use
- Core specifications or technical tables.

## Variants
- Automatically recalculates visible items to span 1 slide on mobile, and 3 slides on larger displays.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `testimonials` | `Testimonial[]` | *Required* | Array of objects (quote, author, firm, rating). |
| `autoPlayInterval`| `number` | `5000` | Automated scroll transition delay (ms). |

## Accessibility
- Slide navigation controls include 44px touch targets.
- Keyboard accessible navigation using Tab index.
- Pauses automatic rotation loops when hover or focus is active.
- Detects and respects user preference for reduced motion (`prefers-reduced-motion: reduce`).

## Responsive Behavior
- Renders responsive counts: 1 card on mobile, scaling up to 3 cards on md viewports.

## Example Usage
```tsx
import { TestimonialsCarousel } from '@/components/ui/TestimonialsCarousel';

const REVIEWS = [
  { quote: "Great light quality", author: "A. Sen", firm: "Studio Sen" }
];

export default function HomeReviews() {
  return <TestimonialsCarousel testimonials={REVIEWS} />;
}
```

## Best Practices
- Keep testimonials under 3 sentences for ideal visual balance.
- Use on dark backgrounds for best contrast.

## Common Mistakes
- Setting `autoPlayInterval` under 3000ms, which gives users insufficient time to read.
