'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { pathToView } from '@/lib/routes';

export function useNavigation() {
  const pathname = usePathname();

  const currentView = useMemo(() => pathToView(pathname), [pathname]);

  return { currentView, pathname };
}
