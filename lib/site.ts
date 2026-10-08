import { ROUTES, CATEGORY_SLUGS, categoryPath } from '@/lib/routes';

export const CONTACT = {
  phoneDisplay: '+91 98202 81588',
  phoneHref: 'tel:+919820281588',
  email: 'sales@systemscreator.com',
  address: 'Systems Creator, Mumbai, Maharashtra, India',
} as const;

/** Fired by the header search so an already-open product listing can update. */
export const HEADER_SEARCH_EVENT = 'syslight:header-search';

/**
 * Set this to a hosted PDF (e.g. '/brochure/syslight-catalogue.pdf') once the
 * brochure is available. Until then brochure CTAs open the contact form with
 * the brochure topic pre-selected, so no link on the site is dead.
 */
export const BROCHURE_URL: string | null = null;

export function brochureHref(): string {
  return BROCHURE_URL ?? `${ROUTES.contact}?topic=brochure`;
}

export function quoteHref(product?: string): string {
  const params = new URLSearchParams({ topic: 'quote' });
  if (product) params.set('product', product);
  return `${ROUTES.contact}?${params.toString()}`;
}

export const PRODUCT_NAV = [
  { label: 'COB Spotlights', href: categoryPath(CATEGORY_SLUGS.cobSpotlight) },
  { label: 'Magnetic Track Light', href: categoryPath(CATEGORY_SLUGS.magneticTrack) },
  { label: 'Downlight & Panel Light', href: categoryPath(CATEGORY_SLUGS.downlightPanel) },
  { label: 'Profile Light', href: categoryPath(CATEGORY_SLUGS.profileLight) },
  { label: 'Hanging Profile Light', href: categoryPath(CATEGORY_SLUGS.hangingProfileLight) },
  { label: 'Surface Downlights', href: categoryPath(CATEGORY_SLUGS.surface) },
  { label: 'Track Light', href: categoryPath(CATEGORY_SLUGS.tracklight) },
] as const;

export const PROJECT_NAV = [
  { label: 'All projects', href: ROUTES.projects },
  { label: 'Residential', href: `${ROUTES.projects}?category=RESIDENTIAL` },
  { label: 'Hospitality', href: `${ROUTES.projects}?category=HOSPITALITY` },
  { label: 'Offices', href: `${ROUTES.projects}?category=OFFICES` },
  { label: 'Retail', href: `${ROUTES.projects}?category=RETAIL` },
] as const;

export const SMART_NAV = [
  {
    label: 'Smart Lights',
    description: 'Tunable white (CCT), dim-to-warm, Casambi and DALI control.',
    href: ROUTES.smartLights,
  },
  {
    label: 'Home Automation',
    description: 'Lighting, climate, security and entertainment in one system.',
    href: ROUTES.homeAutomation,
  },
] as const;
