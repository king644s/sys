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

  const [selectedSection, setSelectedSection] = useState<string | null>(() =>
    searchParams.get('section'),
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
    if (selectedSection) params.set('section', selectedSection);
    if (onlyBestsellers) params.set('bestsellers', '1');

    const nextQuery = params.toString();
    const currentQuery = window.location.search.replace(/^\?/, '');
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [searchQuery, selectedSection, onlyBestsellers, pathname, router]);

  const getSectionCount = (sectionName: string) =>
    matchedProducts.filter((prod) => (prod.section ?? prod.subcategory) === sectionName).length;

  const handleSelectSection = (sectionName: string) => {
    setSelectedSection((current) => (current === sectionName ? null : sectionName));
  };

  const handleResetFilters = () => {
    setSelectedSection(null);
    setSearchQuery('');
    setOnlyBestsellers(false);
  };

  const hasActiveFilters =
    selectedSection !== null || searchQuery.trim() !== '' || onlyBestsellers;

  const filteredProducts = matchedProducts.filter((prod) => {
    if (selectedSection) {
      const prodSection = prod.section ?? prod.subcategory;
      if (prodSection !== selectedSection) return false;
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
  });

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
    !selectedSection &&
    !searchQuery.trim() &&
    Object.keys(subcategoryGroups).length > 1;

  const sidebarHoverText = 'hover:text-cream';
  const sidebarGroupHoverText = 'group-hover:text-cream';

  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6 text-cream">
      <div className="flex items-center justify-between border-b border-border/45 pb-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gold-muted" />
          <span className="font-mono text-sm uppercase tracking-widest font-semibold">
            SPECIFICATION INDICES
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className={`font-mono text-xs uppercase tracking-[0.15em] text-gold ${sidebarHoverText} transition-colors duration-200 cursor-pointer flex items-center gap-1 border border-gold/20 px-2 py-1 rounded-sm bg-gold/5`}
            title="Clear all active selection filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        )}
      </div>

      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none">
          <Search className="w-3.5 h-3.5 text-text-ghost" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={`Search ${category?.name ?? 'series'}...`}
          className="w-full bg-surface-alt border border-border px-3.5 py-2.5 pl-9 font-sans text-sm text-cream placeholder:text-text-ghost focus:border-gold/50 focus:outline-none transition-all rounded-sm"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className={`absolute inset-y-0 right-3 flex items-center text-text-dim ${sidebarHoverText} cursor-pointer`}
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {hasSectionFilters && (
        <div className="flex flex-col gap-4">
          <span className="font-mono text-xs text-text-ghost uppercase tracking-[0.15em] block border-b border-border/20 pb-1.5">
            Sections
          </span>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setSelectedSection(null)}
              className={`text-left font-serif text-sm tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 ${
                selectedSection === null
                  ? 'text-gold font-bold'
                  : `text-text-dim ${sidebarHoverText}`
              }`}
            >
              <span
                className={`w-1 h-3 bg-gold/50 rounded-sm transform transition-transform duration-300 ${
                  selectedSection === null ? 'scale-y-120 bg-gold' : 'scale-y-0'
                }`}
              />
              <span>All sections</span>
              <span className="font-mono text-xs text-text-ghost/85 font-normal ml-0.5">
                ({matchedProducts.length})
              </span>
            </button>

            <div className="flex flex-col gap-1 pl-4 border-l border-gold-muted/20">
              {sections.map((section) => {
                const isSelected = selectedSection === section;
                const entry = catalogFamily?.entries.find((item) => item.section === section);
                const subCount = getSectionCount(section);

                return (
                  <button
                    key={section}
                    onClick={() => handleSelectSection(section)}
                    className={`text-left font-sans text-xs py-1 transition-colors duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'text-gold font-semibold'
                        : `text-text-dim/80 ${sidebarHoverText}`
                    }`}
                  >
                    <span className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`w-3.5 h-3.5 border rounded-sm shrink-0 flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-gold border-gold text-white'
                            : 'border-border/60 bg-surface-alt text-transparent'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" />
                      </span>
                      <span className="truncate">
                        {entry ? `${entry.seriesName} — ${section}` : section}
                      </span>
                    </span>
                    <span className="font-mono text-xs text-text-ghost/60 shrink-0">
                      [{subCount}]
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
        <span className="font-mono text-xs text-text-ghost uppercase tracking-[0.15em] block mb-1">
          Special Classifications
        </span>
        <label className="flex items-center gap-2.5 cursor-pointer select-none py-1 group">
          <input
            type="checkbox"
            checked={onlyBestsellers}
            onChange={(e) => setOnlyBestsellers(e.target.checked)}
            className="sr-only"
          />
          <span
            className={`w-4 h-4 border transition-colors duration-200 flex items-center justify-center rounded-sm ${
              onlyBestsellers
                ? 'bg-gold border-gold text-white'
                : 'border-border/60 bg-surface-alt text-transparent group-hover:border-gold'
            }`}
          >
            <Award className="w-2.5 h-2.5" />
          </span>
          <span
            className={`font-mono text-xs uppercase tracking-[0.15em] text-text-dim ${sidebarGroupHoverText} transition-colors`}
          >
            Highlight Bestsellers
          </span>
        </label>
      </div>
    </div>
  );

  if (!category) {
    return (
      <div className="text-center">
        <h2 className="font-serif text-3xl text-cream">Classification not found</h2>
        <Link
          href={ROUTES.products}
          className="mt-6 font-mono text-xs text-gold uppercase tracking-widest hover:underline cursor-pointer inline-block"
        >
          Return to classifications
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-cream">
      <Breadcrumbs />

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start relative">
        <aside className="hidden lg:block shrink-0 w-80 border border-border/40 bg-surface/50 p-6 shadow-sm rounded-md self-start sticky top-28">
          {renderSidebarContent()}
        </aside>

        <div className="grow w-full min-w-0">
          <div className="-mx-6 px-6 pt-2 pb-4 mb-8 bg-void/95 backdrop-blur-md border-b border-border/40">
            <Link
              href={ROUTES.products}
              className="font-mono text-xs uppercase tracking-[0.15em] text-text-dim hover:text-cream flex items-center gap-2 mb-6 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-gold-muted" />
              <span>all classifications</span>
            </Link>

            <div className="pb-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold mb-1.5 block">
                    {category.type === 'outdoor'
                      ? 'Outdoor Architectural Spectrum'
                      : 'Indoor Architectural Spectrum'}
                  </span>
                  <h1 className="font-serif text-3xl md:text-5xl text-cream font-light tracking-tight">
                    {category.name}{' '}
                    <span className="italic font-serif text-gold font-normal">series</span>
                  </h1>
                  <p className="font-sans text-sm text-text-dim max-w-xl mt-4 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-gold text-white border border-gold px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] font-bold transition-all duration-250 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Specs ({hasActiveFilters ? 'Active' : 'All'})</span>
                </button>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-surface-alt border border-border/40 rounded-md">
                <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-text-dim mr-1">
                  Active:
                </span>
                {selectedSection && (
                  <span className="inline-flex items-center gap-1.5 bg-void border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-cream">
                    <span>SECTION: {selectedSection.toUpperCase()}</span>
                    <button
                      onClick={() => setSelectedSection(null)}
                      className="hover:text-gold cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery.trim() && (
                  <span className="inline-flex items-center gap-1.5 bg-void border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-cream">
                    <span>SEARCH: {searchQuery.trim()}</span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="hover:text-gold cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {onlyBestsellers && (
                  <span className="inline-flex items-center gap-1.5 bg-void border border-border px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-cream">
                    <span>BESTSELLERS</span>
                    <button
                      onClick={() => setOnlyBestsellers(false)}
                      className="hover:text-gold cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="ml-auto font-mono text-[11px] uppercase tracking-[0.15em] text-gold hover:text-cream cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            <div className="flex items-center gap-2 text-text-dim pb-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold-muted" />
              <span className="font-mono text-xs uppercase tracking-[0.15em]">
                Showing {filteredProducts.length} of {matchedProducts.length} specifications
              </span>
            </div>
          </div>

          {matchedProducts.length > 0 ? (
            filteredProducts.length > 0 ? (
              showGrouped ? (
                <div className="flex flex-col gap-14">
                  {Object.entries(subcategoryGroups).map(([subcategory, products]) => (
                    <div key={subcategory}>
                      <div className="border-b border-border/40 pb-4 mb-8 flex items-end justify-between gap-4">
                        <div>
                          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-gold-muted block mb-1">
                            Section
                          </span>
                          <h2 className="font-serif text-2xl md:text-3xl text-cream font-light tracking-tight">
                            {subcategory}
                          </h2>
                        </div>
                        <button
                          onClick={() => handleSelectSection(subcategory)}
                          className="hidden sm:inline-flex font-mono text-[11px] uppercase tracking-[0.15em] text-gold hover:text-cream cursor-pointer"
                        >
                          Filter section
                        </button>
                      </div>
                      <div className="grid grid-cols-1 items-stretch md:grid-cols-2 xl:grid-cols-3 gap-8">
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
                <div className="grid grid-cols-1 items-stretch md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.map((prod) => (
                    <div key={prod.id} className="h-full">
                      <ProductCard product={prod} />
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-20 border border-dashed border-border">
                <span className="font-mono text-sm text-text-dim uppercase tracking-widest block mb-4">
                  No matching fixtures in this series.
                </span>
                <button
                  onClick={handleResetFilters}
                  className="bg-gold text-void-dark font-mono text-xs uppercase tracking-[0.15em] font-bold px-5 py-3 cursor-pointer"
                >
                  Clear search filters
                </button>
              </div>
            )
          ) : (
            <div className="text-center py-20 border border-dashed border-border">
              <span className="font-mono text-sm text-text-dim uppercase tracking-widest block mb-4">
                Fixture list update in progress.
              </span>
              <p className="font-sans text-sm text-text-dim/70 max-w-sm mx-auto">
                Our Mumbai testing crew is currently finalizing technical certification logs for this
                series. Please request details from our design desk directly.
              </p>
              <Link
                href={ROUTES.contact}
                className="mt-6 bg-gold text-void-dark font-bold font-mono text-xs uppercase tracking-[0.15em] px-6 py-3.5 inline-block"
              >
                Contact design desk
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-category-filter-drawer">
          <div
            className="fixed inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div
            data-lenis-prevent
            className="fixed inset-y-0 left-0 w-full max-w-xs bg-void border-r border-border p-6 shadow-2xl flex flex-col h-full overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
              <span className="font-mono text-xs uppercase tracking-widest text-gold font-bold">
                LUMINAIRE FILTERS
              </span>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 hover:text-gold cursor-pointer"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
            </div>

            <div className="flex-1 pb-10">{renderSidebarContent()}</div>

            <div className="sticky bottom-0 bg-void pt-3 border-t border-border">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 bg-gold text-white font-mono text-xs uppercase tracking-[0.15em] font-black text-center cursor-pointer"
              >
                View results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
