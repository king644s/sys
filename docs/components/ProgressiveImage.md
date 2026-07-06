# ProgressiveImage Component Documentation

## Purpose
Renders low-resolution placeholder thumbnails initially and preloads high-resolution images in the background, swapping the source once loaded to improve Largest Contentful Paint (LCP) speeds.

## When to Use
- Displaying large catalog images or gallery entries that would otherwise slow down initial page rendering.

## When Not to Use
- Icons, tiny badges, or small decoration vectors.

## Variants
- Automatically blurs low-resolution thumbnails during background loading sequences.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `thumbnailSrc` | `string` | *Required* | Low-resolution image source path. |
| `fullSrc` | `string` | *Required* | Full-resolution high-quality source path. |
| `alt` | `string` | *Required* | Accessible image descriptions. |
| `className` | `string` | `""` | Styling classes. |
| `loading` | `'eager' \| 'lazy'` | `'lazy'` | Native browser load preference. |
| `onLoad` | `() => void` | `undefined` | Triggers callback on load completion. |

## Accessibility
- Always requires alt descriptions (`alt`).
- Preserves layout boundaries, preventing Cumulative Layout Shift (CLS).

## Responsive Behavior
- Behaves like standard HTML image elements. Adapts width and height properties.

## Example Usage
```tsx
import { ProgressiveImage } from '@/components/ui/ProgressiveImage';

export default function Hero() {
  return (
    <ProgressiveImage
      thumbnailSrc="/kitchen-thumb.jpg"
      fullSrc="/kitchen-full.jpg"
      alt="Luxurious kitchen lighting architecture"
      className="w-full h-full object-cover"
    />
  );
}
```

## Best Practices
- Ensure thumbnail source images are lightweight (under 15KB) to load instantly.
- Match aspect ratios between thumbnail and full-resolution sources.

## Common Mistakes
- Relying on progressive loaders for small icons, which adds unnecessary JS overhead.
