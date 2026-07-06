# ScrollReveal Component Documentation

## Purpose
The `ScrollReveal` component adds subtle scroll-triggered entrance transitions (direction offsets, duration delays) to layout divisions, improving the perceived quality and user engagement of page layouts.

## When to Use
- Wrapping primary section copy, showcase gallery images, cards, and grid columns to reveal them as the user scrolls.

## When Not to Use
- Sticky layouts, modals, navigation headers, or elements that must remain static on scroll events.

## Variants
- Configurable reveal paths: `up`, `down`, `left`, `right`, and `fade` (scale blur-up).

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | *Required* | Element container contents. |
| `className` | `string` | `""` | Additional layout class names. |
| `delay` | `number` | `0` | Delay in seconds before reveal starts. |
| `direction` | `'up' \| 'down' \| 'left' \| 'right' \| 'fade'`| `'up'` | Offset direction of the slide sequence. |
| `duration` | `number` | `0.8` | Time in seconds for transition ease. |

## Accessibility
- Checks user media query values and immediately bypasses slide transitions if `prefers-reduced-motion: reduce` is active.

## Responsive Behavior
- Does not change layout properties. Responsive width/height matches wrapped child dimensions.

## Example Usage
```tsx
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Intro() {
  return (
    <ScrollReveal direction="up" delay={0.2}>
      <h2>Stunning Architectural Lights</h2>
    </ScrollReveal>
  );
}
```

## Best Practices
- Keep offsets subtle (the default is 24px) so content stays readable.
- Use staggered delay multipliers when animating lists of cards.

## Common Mistakes
- Wrapping long scrolling pages in a single `ScrollReveal` block. Apply triggers to separate sections for smooth loading.
