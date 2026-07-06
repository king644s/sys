# ProductCard Component Documentation

## Purpose
The `ProductCard` component displays an item's visual thumbnail, description, tags, and product code. It serves as the primary visual card for products within grids and list views.

## When to Use
- Grid layouts on product catalog pages.
- Related products recommendations.
- Product showcase highlights.

## When Not to Use
- Large detail pages (use [ProductDetail.tsx](file:///e:/projects/sys/views/ProductDetail.tsx) view instead).
- Category showcases (use [CategoryCard](file:///e:/projects/sys/docs/components/CategoryCard.md) instead).

## Variants
- Configures design traits dynamically based on whether the product is flagged as a `bestseller` or contains custom finish options.

## Props
| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `product` | `Product` | *Required* | Complete product object containing name, image, tags, and description. |

## Accessibility
- Implements visible focus ring outlines when keyboard-focused.
- Bestseller badge uses contrast-compliant gold background.
- Employs alt labels on product images (`alt={product.name}`).

## Responsive Behavior
- Automatically scales width to fit its container cell. Maximize layout grid parameters across mobile (`grid-cols-1`) and desktop (`grid-cols-4`).

## Example Usage
```tsx
import { ProductCard } from '@/components/ui/ProductCard';
import { PRODUCTS } from '@/data';

export default function Catalog() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {PRODUCTS.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}
```

## Best Practices
- Place inside a staggered grid list layout to animate loading sequences smoothly.
- Ensure all product instances contain high-quality, lightweight catalog images.

## Common Mistakes
- Hardcoding custom padding outside the card boundaries. The card internally sets `p-card-md` (20px).
