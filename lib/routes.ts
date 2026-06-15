import { CATEGORIES, PRODUCTS } from '@/data';

export const ROUTES = {
  home: '/',
  about: '/about',
  products: '/products',
  smartLights: '/smart-lights',
  projects: '/projects',
  contact: '/contact',
} as const;

export const CATEGORY_SLUGS = {
  cobSpotlight: 'cob-spotlight',
  magneticTrack: 'magnetic-track',
  deepDownlight: 'deep-downlight',
  sysprofiles: 'sysprofiles',
  zoomLight: 'zoom-light',
  gardenLight: 'garden-light',
  wallLight: 'wall-light',
  floodLight: 'flood-light',
  surfaceDownlight: 'surface-downlight',
  tracklight: 'tracklight',
  gateLight: 'gate-light',
} as const;

export function categoryPath(categorySlug: string): string {
  return `${ROUTES.products}/${categorySlug}`;
}

export function productPath(productSlug: string): string {
  return viewToPath({ type: 'product-detail', productSlug });
}

export type PageView =
  | { type: 'home' }
  | { type: 'about' }
  | { type: 'products' }
  | { type: 'product-category'; categorySlug: string }
  | { type: 'product-detail'; productSlug: string }
  | { type: 'smart-lights' }
  | { type: 'projects' }
  | { type: 'contact' };

export function viewToPath(view: PageView): string {
  switch (view.type) {
    case 'home':
      return '/';
    case 'about':
      return '/about';
    case 'products':
      return '/products';
    case 'product-category':
      return `/products/${view.categorySlug}`;
    case 'product-detail': {
      const product = PRODUCTS.find((p) => p.slug === view.productSlug);
      if (product) {
        return `/products/${product.category}/${view.productSlug}`;
      }
      return `/products/${view.productSlug}`;
    }
    case 'smart-lights':
      return '/smart-lights';
    case 'projects':
      return '/projects';
    case 'contact':
      return '/contact';
    default:
      return '/';
  }
}

export function pathToView(pathname: string): PageView {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') return { type: 'home' };
  if (path === '/about') return { type: 'about' };
  if (path === '/products') return { type: 'products' };
  if (path === '/smart-lights') return { type: 'smart-lights' };
  if (path === '/projects') return { type: 'projects' };
  if (path === '/contact') return { type: 'contact' };

  const productsMatch = path.match(/^\/products\/([^/]+)(?:\/([^/]+))?$/);
  if (productsMatch) {
    const [, segment1, segment2] = productsMatch;

    if (segment2) {
      return { type: 'product-detail', productSlug: segment2 };
    }

    const isCategory = CATEGORIES.some((category) => category.slug === segment1);
    if (isCategory) {
      return { type: 'product-category', categorySlug: segment1 };
    }

    const product = PRODUCTS.find((item) => item.slug === segment1);
    if (product) {
      return { type: 'product-detail', productSlug: segment1 };
    }

    return { type: 'product-category', categorySlug: segment1 };
  }

  return { type: 'home' };
}
