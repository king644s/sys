# BeforeAfterCompare Component Documentation

## Purpose
The `BeforeAfterCompare` component allows users to compare two states of an image (e.g. flat conventional lighting vs customized CCT lighting) using an interactive horizontal slider.

## When to Use
- Visual showcase elements demonstrating product lighting impact.
- Dynamic comparison sections.

## When Not to Use
- Non-visual product sheets.

## Variants
- Accepts custom text tags for the `before` and `after` slots (defaults to 'Before' and 'After').

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `image` | `string` | *Required* | Image source path. |
| `alt` | `string` | *Required* | Descriptive screen-reader text. |
| `beforeLabel` | `string` | `'Before'` | Left overlay label. |
| `afterLabel` | `string` | `'After'` | Right overlay label. |
| `initialPosition` | `number` | `50` | Default slider split percentage. |
| `className` | `string` | `""` | Additional styling classes. |

## Accessibility
- Employs keyboard-interactive range input allowing slide adjustments via Arrow keys.
- Visually shows focus outline frames when range input is selected (`focus-within:ring-2`).
- Uses screen-reader only elements (`sr-only`) to describe comparison context.

## Responsive Behavior
- Automatically maintains a clean `aspect-video` scale on all screen dimensions.

## Example Usage
```tsx
import { BeforeAfterCompare } from '@/components/ui/BeforeAfterCompare';

export default function CompareBlock() {
  return (
    <BeforeAfterCompare
      image="/assets/gallery/kitchen.jpg"
      alt="Tunable lighting custom showcase in high-fidelity kitchen"
    />
  );
}
```

## Best Practices
- Ensure comparison images align exactly to prevent visual offsets when sliding.

## Common Mistakes
- Hardcoding custom heights on parent containers, which can break the native `aspect-video` ratio.
