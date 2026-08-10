import { Suspense } from 'react';
import { Projects } from '@/views/Projects';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-void" />}>
      <Projects />
    </Suspense>
  );
}
