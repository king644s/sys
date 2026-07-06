# Button Component Documentation

## Purpose
The `Button` component is the primary interactive trigger for user actions, form submissions, and page links. It encapsulates design system tokens for typography, transitions, shadows, and focus states.

## When to Use
- Triggering actions (modals, forms, slide transitions).
- Primary and secondary links.
- CTA banners.

## When Not to Use
- Inline content links in body text (use custom styled inline text links instead).
- Grid cells where the entire cell is interactive (wrap with `<Link>` directly).

## Variants
- `primary`: Solid gold background with white text, using `shadow-card` shifting to `shadow-hover` on hover.
- `secondary`: Clean bordered cream text with background transition to `surface-alt`.
- `ghost`: Transparent border with cream text shifting to gold underline.
- `gold-outline`: Gold border with gold text, shifting to filled gold button on hover with a custom glow transition.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `children` | `ReactNode` | *Required* | Element text or nested content. |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'gold-outline'` | `'secondary'` | The visual styling variant. |
| `className` | `string` | `""` | Additional styling classes. |
| `href` | `string` | `undefined` | Optional page path. If provided, renders an anchor link. |
| `onClick` | `MouseEventHandler` | `undefined` | Interactive click event handler. |
| `disabled` | `boolean` | `false` | Disables user interaction. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Form action type. |

## Accessibility
- Focus visible ring: `focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2` implemented.
- Renders correct semantic `<button>` or `<a>` HTML elements.
- Min-width and spacing designed for mobile hit area.

## Responsive Behavior
- Adjusts size and spacing automatically. Text size remains at `text-[11px]` to ensure readability.

## Example Usage
```tsx
import { Button } from '@/components/ui/Button';

export default function CTASection() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" href="/contact">
        Contact Sales
      </Button>
      <Button variant="secondary" onClick={() => console.log('Clicked')}>
        Learn More
      </Button>
    </div>
  );
}
```

## Best Practices
- Keep label text concise and in uppercase.
- Prefer `gold-outline` for subtle secondary actions on dark backgrounds.

## Common Mistakes
- Using custom font classes: Button enforces mono font internally. Do not pass `font-sans` to `className`.
