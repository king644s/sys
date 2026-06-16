'use client';

import Link from 'next/link';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES, categoryPath, productPath } from '@/lib/routes';
import { CATEGORIES, PRODUCTS } from '../../data';
import { ChevronRight, Home as HomeIcon } from 'lucide-react';

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
        label: 'About Workshop',
        href: ROUTES.about,
        isLast: true,
      });
      break;

    case 'products':
      crumbs.push({
        label: 'Architectural Products',
        href: ROUTES.products,
        isLast: true,
      });
      break;

    case 'product-category':
      crumbs.push({
        label: 'Architectural Products',
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
        label: 'Architectural Products',
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
        label: 'Customise / Smart CCT',
        href: ROUTES.smartLights,
        isLast: true,
      });
      break;

    case 'projects':
      crumbs.push({
        label: 'Inspire Gallery',
        href: ROUTES.projects,
        isLast: true,
      });
      break;

    case 'contact':
      crumbs.push({
        label: 'Contact Sales',
        href: ROUTES.contact,
        isLast: true,
      });
      break;

    default:
      break;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-6 md:pt-8 pb-5">
      <div
        id="navigation-breadcrumbs-bar"
        className="bg-surface/90 backdrop-blur-md dark:bg-transparent dark:backdrop-blur-none rounded-[2px] transition-colors duration-300 py-4 px-5"
      >
        <nav aria-label="breadcrumb" className="w-full">
          <ol className="flex flex-wrap items-center gap-1.5 md:gap-2.5 font-mono text-[10px] md:text-[11px] uppercase tracking-wider text-text-dim">
            {crumbs.map((crumb, index) => {
              const isFirst = index === 0;
              return (
                <li key={index} className="flex items-center gap-1.5 md:gap-2.5">
                  {!isFirst && (
                    <ChevronRight className="w-3.5 h-3.5 text-text-ghost/60 shrink-0" />
                  )}
                  {crumb.isLast ? (
                    <span className="font-semibold text-gold">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="hover:text-gold hover:underline cursor-pointer flex items-center gap-1 text-cream transition-colors font-medium"
                    >
                      {isFirst && <HomeIcon className="w-3 h-3 text-gold/80" />}
                      <span>{crumb.label}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
