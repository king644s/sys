import { CATEGORIES, PRODUCTS } from '@/data';
import { ProductCategory } from '@/views/ProductCategory';
import { ProductDetail } from '@/views/ProductDetail';

interface PageProps {
  params: Promise<{ categorySlug: string }>;
}

export function generateStaticParams() {
  const categoryParams = CATEGORIES.map((category) => ({
    categorySlug: category.slug,
  }));
  const productParams = PRODUCTS.map((product) => ({
    categorySlug: product.slug,
  }));
  return [...categoryParams, ...productParams];
}

export default async function Page({ params }: PageProps) {
  const { categorySlug } = await params;
  const product = PRODUCTS.find((item) => item.slug === categorySlug);

  if (product) {
    return <ProductDetail productSlug={product.slug} />;
  }

  return <ProductCategory categorySlug={categorySlug} />;
}
