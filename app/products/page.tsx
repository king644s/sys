import { Suspense } from 'react';
import { ProductsHub } from '@/views/ProductsHub';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <ProductsHub />
    </Suspense>
  );
}
