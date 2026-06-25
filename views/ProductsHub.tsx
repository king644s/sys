'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { CATEGORIES, PRODUCTS } from '../data';
import { CATALOG_FAMILIES } from '../data/productCatalog';
import { ProductCard } from '../components/ui/ProductCard';
import { ScrollReveal } from '../components/ui/ScrollReveal';
import { Breadcrumbs } from '../components/layout/Breadcrumbs';
import { 
  SlidersHorizontal, 
  Search, 
  X, 
  ChevronDown, 
  ChevronRight, 
  RotateCcw, 
  Award, 
  Compass,
  Check
} from 'lucide-react';

const FILTER_CATALOG = CATALOG_FAMILIES.filter((family) => family.slug !== 'decorative').map((family) => ({
  slug: family.slug,
  name: family.name,
  subcategories: family.entries.map((entry) => entry.section),
}));

const INITIAL_OPEN_CATEGORIES = FILTER_CATALOG.map((c) => c.slug).reduce<Record<string, boolean>>((acc, slug) => {
  acc[slug] = false;
  return acc;
}, {});

function isIndoorProduct(categorySlug: string) {
  return CATEGORIES.find((c) => c.slug === categorySlug)?.type === 'indoor';
}

export function ProductsHub() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('search') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => searchParams.get('category'));
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(() => searchParams.get('section'));
  const [onlyBestsellers, setOnlyBestsellers] = useState(() => searchParams.get('bestsellers') === '1');
  const hasMountedRef = useRef(false);

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(INITIAL_OPEN_CATEGORIES);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    const params = new URLSearchParams();

    if (searchQuery) params.set('search', searchQuery);

    if (selectedCategory) params.set('category', selectedCategory);

    if (selectedSubcategory) params.set('section', selectedSubcategory);

    if (onlyBestsellers) params.set('bestsellers', '1');

    const nextQuery = params.toString();
    const currentQuery = window.location.search.replace(/^\?/, '');
    if (nextQuery !== currentQuery) {
      router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
    }
  }, [
    searchQuery,
    selectedCategory,
    selectedSubcategory,
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

    if (selectedCategory) {
      const prodFamily = prod.family ?? prod.category;
      if (prodFamily !== selectedCategory) return false;
    }

    if (selectedSubcategory) {
      const prodSection = prod.section ?? prod.subcategory;
      if (prodSection !== selectedSubcategory) return false;
    }

    if (onlyBestsellers && !prod.isBestseller) return false;

    return true;
  });

  const handleSelectCategory = (slug: string | null) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(slug);
      setSelectedSubcategory(null);
    }
  };

  const handleSelectSubcategory = (catSlug: string, subName: string) => {
    if (selectedCategory === catSlug && selectedSubcategory === subName) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(catSlug);
      setSelectedSubcategory(subName);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setOnlyBestsellers(false);
  };

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== null || selectedSubcategory !== null || onlyBestsellers;

  const sidebarHoverText = 'hover:text-void-dark dark:hover:text-cream';
  const sidebarGroupHoverText = 'group-hover:text-void-dark dark:group-hover:text-cream';

  const getCategoryDisplayName = (slug: string) => {
    return (
      CATALOG_FAMILIES.find(f => f.slug === slug)?.name ??
      CATEGORIES.find(c => c.slug === slug)?.name ??
      slug.replace(/-/g, ' ')
    );
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6 text-cream animate-page-enter">
      <div className="flex items-center justify-between border-b border-border/45 pb-4">
        <div className="flex items-center gap-1.5 md:gap-2">
          <SlidersHorizontal className="w-4 h-4 text-gold-muted" />
          <span className="font-mono text-xs uppercase tracking-widest font-semibold">
            SPECIFICATION INDICES
          </span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className={`font-mono text-[9px] uppercase tracking-widest text-gold ${sidebarHoverText} transition-colors duration-200 cursor-pointer flex items-center gap-1 border border-gold/20 px-2 py-1 rounded-[1px] bg-gold/5`}
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
          placeholder="Search catalog... (e.g. Latch, SL-FR)"
          className="w-full bg-surface-alt border border-border px-3.5 py-2.5 pl-9 font-sans text-xs text-cream placeholder:text-text-ghost focus:border-gold/50 focus:outline-none transition-all rounded-[1px]"
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

      <div className="flex flex-col gap-4">
        <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest block border-b border-border/20 pb-1.5">
          Series &amp; Sections
        </span>

        <div className="flex flex-col gap-3">
            <span className="font-mono text-[8px] text-gold-muted uppercase tracking-[0.25em] font-bold">
              Indoor Architectural ({getIndoorProductCount()} fixtures)
            </span>

            <div className="flex flex-col gap-1.5 pl-1.5 border-l border-border/30">
              {FILTER_CATALOG.map(cat => {
                const isExpanded = !!openCategories[cat.slug];
                const matchCount = getProductFamily(cat.slug);
                const catalogFamily = CATALOG_FAMILIES.find(f => f.slug === cat.slug);

                return (
                  <div key={cat.slug} className="flex flex-col gap-1">
                    <div className="flex items-center justify-between group/row">
                      <button
                        onClick={() => toggleCategoryAccordion(cat.slug)}
                        className={`flex-1 text-left font-serif text-[13px] tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 pr-2 ${
                          isExpanded 
                            ? 'text-gold font-bold' 
                            : `text-text-dim ${sidebarHoverText}`
                        }`}
                      >
                        <span className={`w-1 h-3 bg-gold/50 rounded-[1px] transform transition-transform duration-300 ${isExpanded ? 'scale-y-120 bg-gold' : 'scale-y-0'}`} />
                        <span>{cat.name}</span>
                        <span className="font-mono text-[8px] text-text-ghost/85 font-normal ml-0.5">
                          ({matchCount})
                        </span>
                      </button>

                      <button
                        onClick={() => toggleCategoryAccordion(cat.slug)}
                        className={`p-1 text-text-ghost ${sidebarHoverText} transition-colors block cursor-pointer`}
                        title="Toggle sections"
                      >
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform duration-300 ease-out ${
                            isExpanded ? 'rotate-90' : 'rotate-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        isExpanded ? 'grid-rows-[1fr] opacity-100 mt-0.5 mb-2' : 'grid-rows-[0fr] opacity-0 mt-0 mb-0'
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-1 pl-4 border-l border-gold-muted/20">
                          {cat.subcategories.map(sub => {
                            const isSubSelected = selectedSubcategory === sub;
                            const subCount = getSectionCount(cat.slug, sub);
                            const entry = catalogFamily?.entries.find(e => e.section === sub);

                            return (
                              <button
                                key={sub}
                                onClick={() => handleSelectSubcategory(cat.slug, sub)}
                                className={`text-left font-sans text-[11px] py-1 transition-colors duration-200 cursor-pointer flex items-center justify-between gap-2 ${
                                  isSubSelected
                                    ? 'text-gold font-semibold'
                                    : `text-text-dim/80 ${sidebarHoverText}`
                                }`}
                              >
                                <span className="flex items-center gap-1.5 min-w-0">
                                  <span
                                    className={`w-3.5 h-3.5 border rounded-[1px] shrink-0 flex items-center justify-center transition-colors ${
                                      isSubSelected
                                        ? 'bg-gold border-gold text-white'
                                        : 'border-border/60 bg-surface-alt text-transparent'
                                    }`}
                                  >
                                    <Check className="w-2.5 h-2.5" />
                                  </span>
                                  <span className="truncate">
                                    {entry ? `${entry.seriesName} — ${sub}` : sub}
                                  </span>
                                </span>
                                <span className="font-mono text-[8px] text-text-ghost/60 shrink-0">
                                  [{subCount}]
                                </span>
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

      <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
        <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest block mb-1">
          Special Classifications
        </span>
        <label className="flex items-center gap-2.5 cursor-pointer select-none py-1 group">
          <input
            type="checkbox"
            checked={onlyBestsellers}
            onChange={(e) => setOnlyBestsellers(e.target.checked)}
            className="sr-only"
          />
          <span className={`w-4 h-4 border transition-colors duration-200 flex items-center justify-center rounded-[1px] ${
            onlyBestsellers 
              ? 'bg-gold border-gold text-white' 
              : 'border-border/60 bg-surface-alt text-transparent group-hover:border-gold'
          }`}>
            <Award className="w-2.5 h-2.5" />
          </span>
          <span className={`font-mono text-[9px] uppercase tracking-wider text-text-dim ${sidebarGroupHoverText} transition-colors`}>
            Highlight Bestsellers
          </span>
        </label>
      </div>

      <div className="border border-border/40 p-3.5 bg-surface-alt/40 mt-2">
        <div className="flex gap-2 items-start">
          <Compass className="w-4 h-4 text-gold-muted shrink-0 mt-0.5" />
          <p className="font-sans text-[10px] text-text-dim leading-relaxed">
            Configure filters to drill down directly into the Mumbai manufacture catalog. For custom Dialux calculations, reach out to the design team.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="transition-page-enter min-h-screen bg-void text-cream">
      <Breadcrumbs />
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start relative">
        
        <aside className="hidden lg:block shrink-0 w-80 border border-border/40 bg-surface/50 p-6 shadow-sm rounded-[2px] self-start sticky top-28">
          {renderSidebarContent()}
        </aside>

        <div className="grow w-full min-w-0">
          <div className="-mx-6 px-6 pt-2 pb-4 mb-8 bg-void/95 backdrop-blur-md border-b border-border/40">
          <div className="pb-6">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gold mb-2 block">
              02 / COMPREHENSIVE ARCHITECTURAL CATALOG
            </span>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-5xl text-cream font-light tracking-tight">
                  Premium <span className="italic font-serif text-gold font-normal">Collections</span>
                </h1>
                <p className="font-sans text-xs md:text-sm text-text-dim max-w-2xl mt-3 leading-relaxed">
                  Browse our certified, precision-engineered luminaires configured with high CRI chips, gold baffles, IP66 path protection, and optimal thermal management.
                </p>
              </div>

              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-gold text-white border border-gold px-4 py-2 font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-250 cursor-pointer"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Specs ({hasActiveFilters ? 'Active' : 'All'})</span>
              </button>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-surface-alt border border-border/40 rounded-[2px] animate-page-enter">
              <span className="font-mono text-[8px] text-text-ghost uppercase tracking-wider mr-1">
                Active Indices:
              </span>
              
              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>CATEGORY: {getCategoryDisplayName(selectedCategory).toUpperCase()}</span>
                  <button onClick={() => handleSelectCategory(null)} className="hover:text-black dark:hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1.5 border border-gold/40 px-2.5 py-1 font-mono text-[9px] text-cream bg-gold/5 rounded-[2px]">
                  <span>SECTION: {selectedSubcategory.toUpperCase()}</span>
                  <button onClick={() => setSelectedSubcategory(null)} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>KEYWORD: &quot;{searchQuery}&quot;</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-black dark:hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {onlyBestsellers && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>BESTSELLERS ONLY</span>
                  <button onClick={() => setOnlyBestsellers(false)} className="hover:text-black dark:hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="font-mono text-[8px] text-text-dim hover:text-gold cursor-pointer uppercase tracking-widest underline ml-auto pl-2 py-1"
              >
                Clear All
              </button>
            </div>
          )}

          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((prod, idx) => (
                <div key={prod.id}>
                  <ScrollReveal direction="up" delay={idx * 0.05}>
                    <ProductCard product={prod} />
                  </ScrollReveal>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-border/60">
              <span className="font-mono text-xs text-text-dim uppercase tracking-widest block mb-4">
                No matching fixtures found.
              </span>
              <p className="font-sans text-xs text-text-dim/80 max-w-sm mx-auto mb-6">
                Try adjusting division inputs, removing filters, or clearing searching queries above. Our Mumbai design desk is always active to configure custom specs.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-gold text-white font-mono text-[9px] uppercase tracking-widest font-bold px-5 py-3 cursor-pointer hover:bg-gold-light duration-300"
              >
                Clear search filters
              </button>
            </div>
          )}
        </div>
      </div>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-filter-drawer">
          <div 
            className="fixed inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-void border-r border-border p-6 shadow-2xl flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border/40">
              <span className="font-mono text-[11px] uppercase tracking-widest text-gold font-bold">LUMINAIRE FILTERS</span>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1 hover:text-gold cursor-pointer"
              >
                <X className="w-5 h-5 text-cream" />
              </button>
            </div>
            
            <div className="flex-1 pb-10 col-span-1">
              {renderSidebarContent()}
            </div>
            
            <div className="sticky bottom-0 bg-void pt-3 border-t border-border flex items-center justify-between">
              <button
                onClick={() => {
                  setIsMobileFiltersOpen(false);
                }}
                className="w-full py-3 bg-gold text-white font-mono text-[10px] uppercase tracking-widest font-black text-center cursor-pointer"
              >
                View results ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 mt-16 pb-12 pt-12 border-t border-border/30">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gold uppercase tracking-widest">CRI 92+ Guarantee</span>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                All listed systems are manufactured with chips guaranteeing premium color fidelity parameters to reproduce fabrics, stone textures, and architectural details cleanly.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gold uppercase tracking-widest">Dialux Integration</span>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                Contact our Mumbai design desk to receive corresponding photometrics, DWG blueprint specs, Dialux calculation maps, and custom IES file structures.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[10px] text-gold uppercase tracking-widest">Casambi Bluetooth Cores</span>
              <p className="font-sans text-xs text-text-dim leading-relaxed">
                Integrate robust DALI controls, 1-10V configurations, and modern Phase-cut setups using remote, smart hand-held wireless device terminals.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
