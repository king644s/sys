import { PRODUCTS } from '@/data';
import { ProductDetail } from '@/views/ProductDetail';

interface PageProps {
  params: Promise<{ categorySlug: string; productSlug: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    categorySlug: product.category,
    productSlug: product.slug,
  }));
}

export default async function Page({ params }: PageProps) {
  const { productSlug } = await params;
  return <ProductDetail productSlug={productSlug} />;
}
