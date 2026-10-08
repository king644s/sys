'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { CATEGORIES, PRODUCTS } from '../data';
import { CATALOG_FAMILIES } from '../data/productCatalog';
import { ProductCard } from '../components/ui/ProductCard';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { useStickySidebarOffset } from '../hooks/useStickySidebarOffset';
import { buttonClasses } from '../components/ui/Button';
import { HEADER_SEARCH_EVENT, quoteHref } from '@/lib/site';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  Check,
  FileText,
  Bluetooth,
} from 'lucide-react';

gsap.registerPlugin(useGSAP);

const FILTER_CATALOG = CATALOG_FAMILIES.filter((family) => family.slug !== 'decorative').map((family) => ({
  slug: family.slug,
  name: family.name,
  flat: family.flat ?? false,
  subcategories: family.entries.map((entry) => entry.section),
}));

function findFamilyForSection(sectionName: string) {
  return FILTER_CATALOG.find((cat) => cat.subcategories.includes(sectionName));
}

function parseSelectedSections(searchParams: URLSearchParams): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  const categoryHint = searchParams.get('category');

  for (const raw of searchParams.getAll('section')) {
    const sep = raw.indexOf('::');
    const familySlug =
      sep > 0
        ? raw.slice(0, sep)
        : findFamilyForSection(raw)?.slug ??
          (categoryHint && FILTER_CATALOG.some((cat) => cat.slug === categoryHint && !cat.flat)
            ? categoryHint
            : undefined);
    const sectionName = sep > 0 ? raw.slice(sep + 2) : raw;

    if (!familySlug || !sectionName) continue;
    if (!result[familySlug]) result[familySlug] = [];
    if (!result[familySlug].includes(sectionName)) result[familySlug].push(sectionName);
  }

  return result;
}

function parseSelectedCategory(searchParams: URLSearchParams) {
  const category = searchParams.get('category');
  if (!category) return null;
  const family = FILTER_CATALOG.find((cat) => cat.slug === category);
  if (family && !family.flat) return null;
  return category;
}

function isIndoorProduct(categorySlug: string) {
  return CATEGORIES.find((c) => c.slug === categorySlug)?.type === 'indoor';
}

export function ProductsHub() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') ?? '');

  // Pick up searches submitted from the header while this page is already open.
  useEffect(() => {
    const onHeaderSearch = (e: Event) => setSearchQuery((e as CustomEvent<string>).detail);
    window.addEventListener(HEADER_SEARCH_EVENT, onHeaderSearch);
    return () => window.removeEventListener(HEADER_SEARCH_EVENT, onHeaderSearch);
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() =>
    parseSelectedCategory(searchParams),
  );
  const [selectedSectionsByFamily, setSelectedSectionsByFamily] = useState<Record<string, string[]>>(
    () => parseSelectedSections(searchParams),
  );
  const [onlyBestsellers, setOnlyBestsellers] = useState(() => searchParams.get('bestsellers') === '1');
  const hasMountedRef = useRef(false);
  const sidebarRef = useStickySidebarOffset<HTMLElement>();

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    FILTER_CATALOG.reduce<Record<string, boolean>>((acc, cat) => {
      acc[cat.slug] = Boolean(parseSelectedSections(searchParams)[cat.slug]?.length);
      return acc;
    }, {}),
  );

  const selectedSectionEntries = Object.entries(selectedSectionsByFamily).flatMap(
    ([familySlug, sections]) => sections.map((section) => ({ familySlug, section })),
  );

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const params = new URLSearchParams();
    const familiesWithSections = Object.keys(selectedSectionsByFamily).filter(
      (slug) => (selectedSectionsByFamily[slug] ?? []).length > 0,
    );

    if (searchQuery) params.set('search', searchQuery);

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else if (familiesWithSections.length === 1) {
      params.set('category', familiesWithSections[0]);
    }

    for (const familySlug of familiesWithSections) {
      for (const section of selectedSectionsByFamily[familySlug] ?? []) {
        const encoded =
          familiesWithSections.length === 1 && !selectedCategory
            ? section
            : `${familySlug}::${section}`;
        params.append('section', encoded);
      }
    }

    if (onlyBestsellers) params.set('bestsellers', '1');

    const nextQuery = params.toString();
    const currentQuery = window.location.search.replace(/^\?/, '');
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [
    searchQuery,
    selectedCategory,
    selectedSectionsByFamily,
    onlyBestsellers,
    pathname,
    router,
  ]);

  const toggleCategoryAccordion = (slug: string) => {
    setOpenCategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  const getProductFamily = (categorySlug: string) => {
    return PRODUCTS.filter(p => (p.family ?? p.category) === categorySlug).length;
  };

  const getSectionCount = (familySlug: string, sectionName: string) => {
    return PRODUCTS.filter(
      p => (p.family ?? p.category) === familySlug && (p.section ?? p.subcategory) === sectionName,
    ).length;
  };

  const getIndoorProductCount = () => {
    return PRODUCTS.filter((p) => isIndoorProduct(p.family ?? p.category)).length;
  };

  const filteredProducts = PRODUCTS.filter(prod => {
    if (!isIndoorProduct(prod.family ?? prod.category)) return false;

    if (searchQuery) {
      const s = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(s);
      const matchSeries = prod.seriesName?.toLowerCase().includes(s);
      const matchSection = prod.section?.toLowerCase().includes(s);
      const matchSku = prod.skuPrefix?.toLowerCase().includes(s);
      const matchSpec = prod.shortSpec.toLowerCase().includes(s);
      const matchDesc = prod.description.toLowerCase().includes(s);
      if (!matchName && !matchSeries && !matchSection && !matchSku && !matchSpec && !matchDesc) return false;
    }

    if (selectedCategory || selectedSectionEntries.length > 0) {
      const prodFamily = prod.family ?? prod.category;
      const prodSection = prod.section ?? prod.subcategory;
      const matchesFlatCategory = selectedCategory === prodFamily;
      const matchesSection = selectedSectionEntries.some(
        (entry) => entry.familySlug === prodFamily && entry.section === prodSection,
      );
      if (!matchesFlatCategory && !matchesSection) return false;
    }

    if (onlyBestsellers && !prod.isBestseller) return false;

    return true;
  }).sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));

  const handleSelectCategory = (slug: string | null) => {
    setSelectedCategory((current) => (current === slug ? null : slug));
  };

  const handleSelectSubcategory = (catSlug: string, subName: string) => {
    setSelectedSectionsByFamily((prev) => {
      const current = prev[catSlug] ?? [];
      const nextForCat = current.includes(subName)
        ? current.filter((section) => section !== subName)
        : [...current, subName];

      if (nextForCat.length === 0) {
        const { [catSlug]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [catSlug]: nextForCat };
    });
    setOpenCategories((prev) => ({ ...prev, [catSlug]: true }));
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSectionsByFamily({});
    setOnlyBestsellers(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== null ||
    selectedSectionEntries.length > 0 ||
    onlyBestsellers;

  const getCategoryDisplayName = (slug: string) => {
    return (
      CATALOG_FAMILIES.find(f => f.slug === slug)?.name ??
      CATEGORIES.find(c => c.slug === slug)?.name ??
      slug.replace(/-/g, ' ')
    );
  };

  const familiesWithSections = Object.keys(selectedSectionsByFamily).filter(
    (slug) => (selectedSectionsByFamily[slug] ?? []).length > 0,
  );

  const listingCategorySlug =
    familiesWithSections.length === 1
      ? familiesWithSections[0]
      : familiesWithSections.length === 0
        ? selectedCategory
        : null;

  const listingHeading = listingCategorySlug
    ? getCategoryDisplayName(listingCategorySlug)
    : 'All products';

  const [visibleHeading, setVisibleHeading] = useState(listingHeading);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const headingReadyRef = useRef(false);

  useGSAP(
    () => {
      const el = headingRef.current;
      if (!el) return;

      if (!headingReadyRef.current) {
        headingReadyRef.current = true;
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }

      if (listingHeading === visibleHeading) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        setVisibleHeading(listingHeading);
        gsap.set(el, { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline();
      tl.to(el, { autoAlpha: 0, y: 8, duration: 0.2, ease: 'power2.in' });
      tl.add(() => setVisibleHeading(listingHeading));
      tl.to(el, { autoAlpha: 1, y: 0, duration: 0.35, ease: 'power3.out' });

      return () => {
        tl.kill();
      };
    },
    { dependencies: [listingHeading] },
  );

  const checkboxClass = (checked: boolean) =>
    `flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors ${
      checked ? 'border-gold bg-gold text-on-accent' : 'border-border-high bg-surface text-transparent'
    }`;

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
          placeholder="Name, series or code"
          aria-label="Search products"
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

      <div className="divider" />

      <div className="flex flex-col gap-2">
        <div className="mb-1 flex items-baseline justify-between">
          <span className="text-[13px] font-semibold text-cream">Indoor lighting</span>
          <span className="text-xs text-text-ghost">{getIndoorProductCount()} fixtures</span>
        </div>

        <div className="flex flex-col">
          {FILTER_CATALOG.map(cat => {
            const matchCount = getProductFamily(cat.slug);
            const catalogFamily = CATALOG_FAMILIES.find(f => f.slug === cat.slug);

            if (cat.flat) {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.slug}
                  onClick={() => handleSelectCategory(cat.slug)}
                  aria-pressed={isSelected}
                  className={`-mx-2 flex items-center justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors ${
                    isSelected ? 'bg-accent-soft font-semibold text-gold' : 'text-text-dim hover:bg-surface-alt hover:text-cream'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs text-text-ghost">{matchCount}</span>
                </button>
              );
            }

            const selectedInFamily = selectedSectionsByFamily[cat.slug] ?? [];
            const hasFamilySelection = selectedInFamily.length > 0;
            const isExpanded = !!openCategories[cat.slug];

            return (
              <div key={cat.slug} className="flex flex-col">
                <button
                  onClick={() => toggleCategoryAccordion(cat.slug)}
                  aria-expanded={isExpanded}
                  className={`-mx-2 flex items-center justify-between rounded-sm px-2 py-2 text-left text-sm transition-colors ${
                    hasFamilySelection ? 'font-semibold text-gold' : 'text-text-dim hover:bg-surface-alt hover:text-cream'
                  } ${isExpanded && !hasFamilySelection ? 'text-cream' : ''}`}
                >
                  <span className="flex items-center gap-1.5">
                    <ChevronRight
                      className={`h-3.5 w-3.5 text-text-ghost transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}
                    />
                    {cat.name}
                  </span>
                  <span className="text-xs text-text-ghost">
                    {hasFamilySelection ? `${selectedInFamily.length} selected` : matchCount}
                  </span>
                </button>

                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                    isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="ml-[7px] flex flex-col gap-0.5 border-l border-border pb-2 pl-4 pt-1">
                      {cat.subcategories.map(sub => {
                        const isSubSelected = selectedInFamily.includes(sub);
                        const subCount = getSectionCount(cat.slug, sub);
                        const entry = catalogFamily?.entries.find(e => e.section === sub);

                        return (
                          <button
                            key={sub}
                            type="button"
                            aria-pressed={isSubSelected}
                            onClick={() => handleSelectSubcategory(cat.slug, sub)}
                            className={`flex items-center justify-between gap-2 py-1.5 text-left text-[13px] transition-colors ${
                              isSubSelected ? 'font-medium text-cream' : 'text-text-dim hover:text-cream'
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-2">
                              <span className={checkboxClass(isSubSelected)}>
                                <Check className="h-3 w-3" />
                              </span>
                              <span className="truncate">
                                {entry ? (
                                  <>
                                    <span className="text-text-ghost">{entry.seriesName} · </span>
                                    {sub}
                                  </>
                                ) : (
                                  sub
                                )}
                              </span>
                            </span>
                            <span className="shrink-0 text-xs text-text-ghost">{subCount}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const activeChipClass =
    'inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-surface pl-3 pr-2 text-[13px] text-cream';

  return (
    <div className="min-h-screen bg-void text-cream">
      <Breadcrumbs />

      <div className="container-page pb-6 pt-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <h1 ref={headingRef} className="heading-1">
              {visibleHeading}
            </h1>
            <p className="text-sm text-text-dim">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'fixture' : 'fixtures'}
              {hasActiveFilters
                ? filteredProducts.length === 1 ? ' matches your filters' : ' match your filters'
                : ' in the indoor range'}
            </p>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className={buttonClasses('secondary', 'md', 'lg:hidden self-start')}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters{hasActiveFilters ? ' · active' : ''}
          </button>
        </div>

        <div
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
            hasActiveFilters ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 pt-5">
              {selectedCategory && (
                <span className={activeChipClass}>
                  {getCategoryDisplayName(selectedCategory)}
                  <button onClick={() => handleSelectCategory(null)} aria-label="Remove category filter" className="rounded-full p-0.5 text-text-ghost hover:bg-surface-alt hover:text-cream">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {selectedSectionEntries.map(({ familySlug, section }) => (
                <span key={`${familySlug}::${section}`} className={activeChipClass}>
                  {section}
                  <button
                    onClick={() => handleSelectSubcategory(familySlug, section)}
                    aria-label={`Remove ${section} filter`}
                    className="rounded-full p-0.5 text-text-ghost hover:bg-surface-alt hover:text-cream"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}

              {searchQuery && (
                <span className={activeChipClass}>
                  “{searchQuery}”
                  <button onClick={() => setSearchQuery('')} aria-label="Clear search" className="rounded-full p-0.5 text-text-ghost hover:bg-surface-alt hover:text-cream">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              {onlyBestsellers && (
                <span className={activeChipClass}>
                  Bestsellers
                  <button onClick={() => setOnlyBestsellers(false)} aria-label="Remove bestsellers filter" className="rounded-full p-0.5 text-text-ghost hover:bg-surface-alt hover:text-cream">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="ml-1 text-[13px] font-medium text-text-dim underline-offset-4 hover:text-cream hover:underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page relative flex flex-col items-start gap-8 pb-16 lg:flex-row lg:gap-10">
        <aside
          ref={sidebarRef}
          className="card sticky top-[calc(var(--header-height)+24px)] z-10 hidden w-72 shrink-0 self-start p-5 lg:block"
        >
          {renderSidebarContent()}
        </aside>

        <div className="w-full min-w-0 grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="h-full">
                  <ProductCard product={prod} />
                </div>
              ))}
            </div>
          ) : (
            <div className="card flex flex-col items-center px-6 py-20 text-center">
              <Search className="h-8 w-8 text-text-ghost" />
              <h2 className="heading-3 mt-4">No fixtures match those filters</h2>
              <p className="body mt-2 max-w-sm">
                Try removing a filter or searching by series name. Our design desk can also configure
                custom specifications.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button onClick={handleResetFilters} className={buttonClasses('primary')}>
                  Clear filters
                </button>
                <Link href={quoteHref()} className={buttonClasses('secondary')}>
                  Ask our team
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-filter-drawer">
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

      <section className="border-t border-border bg-void-dark">
        <div className="container-page grid grid-cols-1 gap-8 py-14 md:grid-cols-3">
          {[
            {
              icon: Award,
              title: 'CRI 92+ guaranteed',
              body: 'Every listed fixture uses chips that render fabrics, stone and finishes in their true colours.',
            },
            {
              icon: FileText,
              title: 'Photometrics and Dialux',
              body: 'Ask our design desk for IES files, drawings and Dialux calculations for your project.',
            },
            {
              icon: Bluetooth,
              title: 'Smart-ready drivers',
              body: 'Configure phase-cut, 0/1–10V, DALI or Casambi Bluetooth control to suit your installation.',
            },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-[15px] font-semibold text-cream">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-dim">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
