'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '../data';
import { getCatalogFamily } from '../data/productCatalog';
import { ROUTES } from '@/lib/routes';
import { ProductCard } from '../components/ui/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { getProductCodeDisplay } from '../utils/productCodes';
import { useStickySidebarOffset } from '../hooks/useStickySidebarOffset';
import { buttonClasses } from '../components/ui/Button';
import { quoteHref } from '@/lib/site';
import {
  ArrowLeft,
  Award,
  Check,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';

interface ProductCategoryProps {
  categorySlug: string;
}

export function ProductCategory({ categorySlug }: ProductCategoryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasMountedRef = useRef(false);
  const sidebarRef = useStickySidebarOffset<HTMLElement>();

  const category = CATEGORIES.find((cat) => cat.slug === categorySlug);
  const catalogFamily = getCatalogFamily(categorySlug);

  const matchedProducts = PRODUCTS.filter(
    (prod) => (prod.family ?? prod.category) === categorySlug || prod.category === categorySlug,
  );

  const catalogSections = catalogFamily?.entries.map((entry) => entry.section) ?? [];
  const productSections = Array.from(
    new Set(
      matchedProducts
        .map((prod) => prod.section ?? prod.subcategory)
        .filter((section): section is string => Boolean(section)),
    ),
  );
  const sections = catalogSections.length > 0 ? catalogSections : productSections;
  const hasSectionFilters = !catalogFamily?.flat && sections.length > 0;

  const [selectedSections, setSelectedSections] = useState<string[]>(() =>
    searchParams.getAll('section').filter(Boolean),
  );
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') ?? '');
  const [onlyBestsellers, setOnlyBestsellers] = useState(
    () => searchParams.get('bestsellers') === '1',
  );
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    for (const section of selectedSections) params.append('section', section);
    if (onlyBestsellers) params.set('bestsellers', '1');

    const nextQuery = params.toString();
    const currentQuery = window.location.search.replace(/^\?/, '');
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [searchQuery, selectedSections, onlyBestsellers, pathname, router]);

  const getSectionCount = (sectionName: string) =>
    matchedProducts.filter((prod) => (prod.section ?? prod.subcategory) === sectionName).length;

  const handleSelectSection = (sectionName: string) => {
    setSelectedSections((current) =>
      current.includes(sectionName)
        ? current.filter((section) => section !== sectionName)
        : [...current, sectionName],
    );
  };

  const handleResetFilters = () => {
    setSelectedSections([]);
    setSearchQuery('');
    setOnlyBestsellers(false);
  };

  const hasActiveFilters =
    selectedSections.length > 0 || searchQuery.trim() !== '' || onlyBestsellers;

  const filteredProducts = matchedProducts.filter((prod) => {
    if (selectedSections.length > 0) {
      const prodSection = prod.section ?? prod.subcategory;
      if (!prodSection || !selectedSections.includes(prodSection)) return false;
    }

    if (onlyBestsellers && !prod.isBestseller) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      const codes = getProductCodeDisplay(prod) ?? '';
      const haystack = [
        prod.name,
        prod.slug,
        prod.section,
        prod.subcategory,
        prod.seriesName,
        prod.skuPrefix,
        codes,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  }).sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));

  const subcategoryGroups = filteredProducts.reduce<Record<string, typeof filteredProducts>>(
    (groups, product) => {
      const key = product.section ?? product.subcategory ?? 'General';
      if (!groups[key]) groups[key] = [];
      groups[key].push(product);
      return groups;
    },
    {},
  );

  const showGrouped =
    hasSectionFilters &&
    selectedSections.length !== 1 &&
    !searchQuery.trim() &&
    Object.keys(subcategoryGroups).length > 1;

  const checkboxClass = (checked: boolean) =>
    `flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
      checked ? 'border-gold bg-gold text-on-accent' : 'border-border-high bg-surface text-transparent'
    }`;

  const activeChipClass =
    'inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface pl-3 pr-2 text-[13px] text-cream';
  const chipCloseClass = 'rounded-full p-0.5 text-text-ghost hover:bg-surface-alt hover:text-cream';

  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6 text-cream">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-text-dim" />
          <span className="text-sm font-semibold">Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1 text-[13px] font-medium text-gold hover:underline"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        )}
      </div>

      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-ghost" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${category?.name ?? 'series'}`}
          aria-label="Search this category"
          className="field pl-9 pr-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-ghost hover:text-cream"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <label className="flex cursor-pointer select-none items-center gap-2.5 text-sm text-text-dim hover:text-cream">
        <input
          type="checkbox"
          checked={onlyBestsellers}
          onChange={(e) => setOnlyBestsellers(e.target.checked)}
          className="sr-only"
        />
        <span className={checkboxClass(onlyBestsellers)}>
          <Award className="h-2.5 w-2.5" />
        </span>
        Bestsellers only
      </label>

      {hasSectionFilters && (
        <>
          <div className="divider" />
          <div className="flex flex-col gap-1">
            <span className="mb-1 text-[13px] font-semibold text-cream">Sections</span>

            <button
              type="button"
              onClick={() => setSelectedSections([])}
              className={`-mx-2 flex items-center justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors ${
                selectedSections.length === 0
                  ? 'bg-accent-soft font-semibold text-gold'
                  : 'text-text-dim hover:bg-surface-alt hover:text-cream'
              }`}
            >
              <span>All sections</span>
              <span className="text-xs text-text-ghost">{matchedProducts.length}</span>
            </button>

            {sections.map((section) => {
              const isSelected = selectedSections.includes(section);
              const entry = catalogFamily?.entries.find((item) => item.section === section);
              const subCount = getSectionCount(section);

              return (
                <button
                  key={section}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelectSection(section)}
                  className={`flex items-center justify-between gap-2 py-1.5 text-left text-[13px] transition-colors ${
                    isSelected ? 'font-medium text-cream' : 'text-text-dim hover:text-cream'
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className={checkboxClass(isSelected)}>
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="truncate">
                      {entry ? (
                        <>
                          <span className="text-text-ghost">{entry.seriesName} · </span>
                          {section}
                        </>
                      ) : (
                        section
                      )}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-text-ghost">{subCount}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );

  if (!category) {
    return (
      <div className="container-page flex flex-col items-center py-24 text-center">
        <h1 className="heading-2">Category not found</h1>
        <p className="body mt-2">This category may have moved. Browse the full range instead.</p>
        <Link href={ROUTES.products} className={`${buttonClasses('primary')} mt-6`}>
          All products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-cream">
      <Breadcrumbs />

      <div className="container-page pb-6 pt-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-2">
            <span className="eyebrow">
              {category.type === 'outdoor' ? 'Outdoor lighting' : 'Indoor lighting'}
            </span>
            <h1 className="heading-1">{category.name}</h1>
            <p className="lead mt-1">{category.description}</p>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className={buttonClasses('secondary', 'md', 'lg:hidden self-start')}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{hasActiveFilters ? ' · active' : ''}
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm text-text-dim">
            Showing {filteredProducts.length} of {matchedProducts.length} fixtures
          </span>
          {selectedSections.map((section) => (
            <span key={section} className={activeChipClass}>
              {section}
              <button onClick={() => handleSelectSection(section)} aria-label={`Remove ${section}`} className={chipCloseClass}>
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {searchQuery.trim() && (
            <span className={activeChipClass}>
              “{searchQuery.trim()}”
              <button onClick={() => setSearchQuery('')} aria-label="Clear search" className={chipCloseClass}>
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          {onlyBestsellers && (
            <span className={activeChipClass}>
              Bestsellers
              <button onClick={() => setOnlyBestsellers(false)} aria-label="Remove bestsellers filter" className={chipCloseClass}>
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          )}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="ml-1 text-[13px] font-medium text-text-dim underline-offset-4 hover:text-cream hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="container-page relative flex flex-col items-start gap-8 pb-16 lg:flex-row lg:gap-10">
        <aside
          ref={sidebarRef}
          className="card sticky top-[calc(var(--header-height)+24px)] z-10 hidden w-72 shrink-0 self-start p-5 lg:block"
        >
          {renderSidebarContent()}
          <div className="divider my-5" />
          <Link href={ROUTES.products} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-dim hover:text-cream">
            <ArrowLeft className="h-3.5 w-3.5" /> All categories
          </Link>
        </aside>

        <div className="w-full min-w-0 grow">
          {matchedProducts.length > 0 ? (
            filteredProducts.length > 0 ? (
              showGrouped ? (
                <div className="flex flex-col gap-14">
                  {Object.entries(subcategoryGroups).map(([subcategory, products]) => (
                    <div key={subcategory}>
                      <div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-4">
                        <div>
                          <h2 className="heading-3 text-xl md:text-2xl">{subcategory}</h2>
                          <p className="mt-1 text-sm text-text-ghost">
                            {products.length} {products.length === 1 ? 'fixture' : 'fixtures'}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSelectSection(subcategory)}
                          className="hidden text-[13px] font-semibold text-gold hover:underline sm:inline-flex"
                        >
                          Show only this section
                        </button>
                      </div>
                      <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((prod) => (
                          <div key={prod.id} className="h-full">
                            <ProductCard product={prod} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} className="h-full">
                      <ProductCard product={prod} />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="card flex flex-col items-center px-6 py-20 text-center">
                <Search className="h-8 w-8 text-text-ghost" />
                <h2 className="heading-3 mt-4">No fixtures match those filters</h2>
                <button onClick={handleResetFilters} className={`${buttonClasses('primary')} mt-6`}>
                  Clear filters
                </button>
              </div>
            )
          ) : (
            <div className="card flex flex-col items-center px-6 py-20 text-center">
              <h2 className="heading-3">This range is being updated</h2>
              <p className="body mt-2 max-w-sm">
                We&apos;re finalising specifications for this series. Ask our design desk for details and
                availability.
              </p>
              <Link href={quoteHref(category.name)} className={`${buttonClasses('primary')} mt-6`}>
                Ask the design desk
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-category-filter-drawer">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div
            data-lenis-prevent
            className="fixed inset-y-0 left-0 flex h-full w-full max-w-sm flex-col overflow-y-auto bg-void shadow-lifted"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="text-base font-semibold">Filters</span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                aria-label="Close filters"
                className="rounded-sm p-1.5 hover:bg-surface-alt"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 px-5 py-5">{renderSidebarContent()}</div>

            <div className="sticky bottom-0 border-t border-border bg-void p-4">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className={buttonClasses('primary', 'lg', 'w-full')}
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
