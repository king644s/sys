# CategoryCard Component Documentation

## Purpose
The `CategoryCard` provides an interactive preview of product categories, complete with a 3D orbit simulator representation (WebGL proxy model) or a 2D image preview, displaying fixture counts and descriptions.

## When to Use
- Home view highlights.
- Catalog category navigation indexes.

## When Not to Use
- Individual product list views (use [ProductCard](file:///e:/projects/sys/docs/components/ProductCard.md) instead).

## Variants
- Configures render behavior to activate either local WebGL 3D canvas render simulations or fallback 2D graphic formats.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `category` | `Category` | *Required* | Complete category object containing name, slug, description, image, and 3D attributes. |

## Accessibility
- Implements visible focus ring outlines when keyboard-focused.
- Uses `explore collections` as descriptive screen reader link labels.
- Fallback images include semantic alt attributes.

## Responsive Behavior
- Adjusts height dynamically. On mobile viewports, the grid splits into single rows with full container widths.

## Example Usage
```tsx
import { CategoryCard } from '@/components/ui/CategoryCard';
import { CATEGORIES } from '@/data';

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {CATEGORIES.map((cat) => (
        <CategoryCard key={cat.slug} category={cat} />
      ))}
    </div>
  );
}
```

## Best Practices
- Load categories with 3D capabilities to enhance user engagement.
- Ensure descriptions remain short and concise for clean card spacing.

## Common Mistakes
- Wrapping the component in redundant Link components. CategoryCard wraps itself internally using Next.js Link paths.
