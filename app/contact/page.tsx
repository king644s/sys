import { Suspense } from 'react';
import { Contact } from '@/views/Contact';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Contact />
    </Suspense>
  );
}
