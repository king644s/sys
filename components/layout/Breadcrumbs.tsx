'use client';

import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES, categoryPath, productPath } from '@/lib/routes';
import { CATEGORIES, PRODUCTS } from '../../data';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs() {
  const { currentView } = useNavigation();

  if (currentView.type === 'home') return null;

  const getCategoryName = (slug: string) => {
    const category = CATEGORIES.find((c) => c.slug === slug);
    return category ? category.name : slug;
  };

  const getProductName = (slug: string) => {
    const product = PRODUCTS.find((p) => p.slug === slug);
    return product ? product.name : slug;
  };

  const crumbs: Array<{ label: string; href: string; isLast?: boolean }> = [
    {
      label: 'Home',
      href: ROUTES.home,
    },
  ];

  switch (currentView.type) {
    case 'about':
      crumbs.push({
        label: 'About',
        href: ROUTES.about,
        isLast: true,
      });
      break;

    case 'products':
      crumbs.push({
        label: 'Products',
        href: ROUTES.products,
        isLast: true,
      });
      break;

    case 'product-category':
      crumbs.push({
        label: 'Products',
        href: ROUTES.products,
      });
      crumbs.push({
        label: getCategoryName(currentView.categorySlug),
        href: categoryPath(currentView.categorySlug),
        isLast: true,
      });
      break;

    case 'product-detail': {
      const product = PRODUCTS.find((p) => p.slug === currentView.productSlug);
      crumbs.push({
        label: 'Products',
        href: ROUTES.products,
      });
      if (product) {
        crumbs.push({
          label: getCategoryName(product.category),
          href: categoryPath(product.category),
        });
      }
      crumbs.push({
        label: getProductName(currentView.productSlug),
        href: productPath(currentView.productSlug),
        isLast: true,
      });
      break;
    }

    case 'smart-lights':
      crumbs.push({
        label: 'Smart Lights',
        href: ROUTES.smartLights,
        isLast: true,
      });
      break;

    case 'home-automation':
      crumbs.push({
        label: 'Home Automation',
        href: ROUTES.homeAutomation,
        isLast: true,
      });
      break;

    case 'projects':
      crumbs.push({
        label: 'Projects',
        href: ROUTES.projects,
        isLast: true,
      });
      break;

    case 'professionals':
      crumbs.push({
        label: 'For Professionals',
        href: ROUTES.professionals,
        isLast: true,
      });
      break;

    case 'contact':
      crumbs.push({
        label: 'Contact',
        href: ROUTES.contact,
        isLast: true,
      });
      break;

    default:
      break;
  }

  return (
    <div className="container-page pt-6 pb-2">
      <nav aria-label="Breadcrumb" id="navigation-breadcrumbs-bar">
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-text-ghost">
          {crumbs.map((crumb, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0" />}
              {crumb.isLast ? (
                <span className="font-medium text-cream" aria-current="page">
                  {crumb.label}
                </span>
              ) : (
                <Link href={crumb.href} className="hover:text-cream transition-colors">
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
