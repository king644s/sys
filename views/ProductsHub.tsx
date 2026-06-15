'use client';

import { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data';
import { CategoryCard } from '../components/ui/CategoryCard';
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
  Eye, 
  Boxes,
  Compass
} from 'lucide-react';

// Structured parent, category, and subcategory layout mappings
const TAXONOMY = [
  {
    type: 'indoor' as const,
    name: 'Indoor Architectural',
    categories: [
      { slug: 'cob-spotlight', name: 'COB Spotlight', subcategories: ['Twin Adjustable Spot'] },
      { slug: 'magnetic-track', name: 'Magnetic Track Light', subcategories: ['Low Voltage 48V Rails'] },
      { slug: 'deep-downlight', name: 'Deep Downlight', subcategories: ['Low UGR Deep Cutoff'] },
      { slug: 'sysprofiles', name: 'SYSProfiles', subcategories: ['Trimless Linear'] },
      { slug: 'zoom-light', name: 'Zoom Light', subcategories: ['Continuous Focus'] },
      { slug: 'surface-downlight', name: 'Surface Downlight', subcategories: ['Cylindrical Body'] },
      { slug: 'tracklight', name: 'Tracklight', subcategories: ['Studio Spotlights'] },
      { slug: 'latch-series', name: 'Latch Series', subcategories: ['Snap', 'Clasp', 'Hinge', 'Open', 'Click'] },
      { slug: 'antiglare', name: 'Antiglare', subcategories: ['Antiglare Downlight'] }
    ]
  },
  {
    type: 'outdoor' as const,
    name: 'Outdoor pathways & landscape',
    categories: [
      { slug: 'flood-light', name: 'Flood Light', subcategories: ['Asymmetric Wall Wash'] },
      { slug: 'garden-light', name: 'Garden Light', subcategories: ['Pathways Core Spike'] },
      { slug: 'wall-light', name: 'Outdoor Wall Light', subcategories: ['Bi-Directional Sconce'] },
      { slug: 'gate-light', name: 'Gate Light', subcategories: ['Pillar Mount Cap'] }
    ]
  }
];

export function ProductsHub() {
  // Layout & Filtering State
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'categories' | 'fixtures'>('categories');
  
  // Filtering selections
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParent, setSelectedParent] = useState<'ALL' | 'indoor' | 'outdoor'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [onlyBestsellers, setOnlyBestsellers] = useState(false);

  // Accordion state for taxonomy groups
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() => {
    // Open all by default to list everything as requested
    return {
      'cob-spotlight': true,
      'magnetic-track': true,
      'deep-downlight': true,
      'sysprofiles': true,
      'zoom-light': true,
      'surface-downlight': true,
      'tracklight': true,
      'latch-series': true,
      'antiglare': true,
      'flood-light': true,
      'garden-light': true,
      'wall-light': true,
      'gate-light': true
    };
  });

  const toggleCategoryAccordion = (slug: string) => {
    setOpenCategories(prev => ({ ...prev, [slug]: !prev[slug] }));
  };

  // 1. Dynamic Counts Calculator
  const getProductCount = (categorySlug: string) => {
    return PRODUCTS.filter(p => p.category === categorySlug).length;
  };

  const getSubcategoryCount = (categorySlug: string, subName: string) => {
    return PRODUCTS.filter(p => p.category === categorySlug && p.subcategory === subName).length;
  };

  const getParentTypeCount = (type: 'indoor' | 'outdoor') => {
    return PRODUCTS.filter(p => {
      const parentCat = CATEGORIES.find(c => c.slug === p.category);
      return parentCat?.type === type;
    }).length;
  };

  // 2. Filter Execution
  const filteredProducts = PRODUCTS.filter(prod => {
    // Search filter
    if (searchQuery) {
      const s = searchQuery.toLowerCase();
      const matchName = prod.name.toLowerCase().includes(s);
      const matchSpec = prod.shortSpec.toLowerCase().includes(s);
      const matchDesc = prod.description.toLowerCase().includes(s);
      if (!matchName && !matchSpec && !matchDesc) return false;
    }

    // Parent Section filter
    if (selectedParent !== 'ALL') {
      const parentCat = CATEGORIES.find(c => c.slug === prod.category);
      if (!parentCat || parentCat.type !== selectedParent) return false;
    }

    // Category filter
    if (selectedCategory && prod.category !== selectedCategory) return false;

    // Subcategory filter
    if (selectedSubcategory && prod.subcategory !== selectedSubcategory) return false;

    // Bestseller filter
    if (onlyBestsellers && !prod.isBestseller) return false;

    return true;
  });

  // Category view filter (if parent selection limits categories)
  const filteredCategories = CATEGORIES.filter(cat => {
    if (selectedParent !== 'ALL' && cat.type !== selectedParent) return false;
    if (selectedCategory && cat.slug !== selectedCategory) return false;
    return true;
  });

  // 3. Selection Handlers
  const handleSelectParent = (parent: 'ALL' | 'indoor' | 'outdoor') => {
    setSelectedParent(parent);
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  const handleSelectCategory = (slug: string | null) => {
    if (selectedCategory === slug) {
      setSelectedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(slug);
      setSelectedSubcategory(null);
      // Auto shift to fixtures view so results are visible instantly
      if (slug) setViewMode('fixtures');
    }
  };

  const handleSelectSubcategory = (catSlug: string, subName: string) => {
    if (selectedCategory === catSlug && selectedSubcategory === subName) {
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(catSlug);
      setSelectedSubcategory(subName);
      setViewMode('fixtures');
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedParent('ALL');
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setOnlyBestsellers(false);
    setViewMode('categories');
  };

  const hasActiveFilters = searchQuery !== '' || selectedParent !== 'ALL' || selectedCategory !== null || selectedSubcategory !== null || onlyBestsellers;

  // Sidebar Filter Panel Component (Shared between desktop rail and mobile overlay overlay)
  const sidebarHoverText = 'hover:text-void-dark dark:hover:text-cream';
  const sidebarGroupHoverText = 'group-hover:text-void-dark dark:group-hover:text-cream';

  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6 select-none text-cream animate-page-enter">
      {/* Sidebar Header */}
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

      {/* Free Text Search Filter */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pr-3 pointer-events-none">
          <Search className="w-3.5 h-3.5 text-text-ghost" />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (viewMode === 'categories') setViewMode('fixtures');
          }}
          placeholder="Search catalog... (e.g. 12W, COB)"
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

      {/* Division Selector (Indoor / Outdoor Spectrum) */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest block mb-1">
          Architectural Division
        </span>
        <div className="grid grid-cols-3 gap-1 p-0.5 bg-surface-alt border border-border/40 rounded-[2px]">
          <button
            onClick={() => handleSelectParent('ALL')}
            className={`py-1.5 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer ${
              selectedParent === 'ALL'
                ? 'bg-gold text-white font-bold'
                : `text-text-dim ${sidebarHoverText} hover:bg-gold/5`
            }`}
          >
            ALL
          </button>
          <button
            onClick={() => handleSelectParent('indoor')}
            className={`py-1.5 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer ${
              selectedParent === 'indoor'
                ? 'bg-gold text-white font-bold'
                : `text-text-dim ${sidebarHoverText} hover:bg-gold/5`
            }`}
          >
            INDOOR
          </button>
          <button
            onClick={() => handleSelectParent('outdoor')}
            className={`py-1.5 font-mono text-[9px] uppercase tracking-wider text-center cursor-pointer ${
              selectedParent === 'outdoor'
                ? 'bg-gold text-white font-bold'
                : `text-text-dim ${sidebarHoverText} hover:bg-gold/5`
            }`}
          >
            OUTDOOR
          </button>
        </div>
      </div>

      {/* Complete taxonomy tree listing each category & subcategory */}
      <div className="flex flex-col gap-4">
        <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest block border-b border-border/20 pb-1.5">
          Classifications & Subcategories
        </span>

        {TAXONOMY.map(group => {
          // If a division is focused, skip rendering other group
          if (selectedParent !== 'ALL' && selectedParent !== group.type) return null;

          return (
            <div key={group.type} className="flex flex-col gap-3">
              <span className="font-mono text-[8px] text-gold-muted uppercase tracking-[0.25em] font-bold">
                {group.name} ({getParentTypeCount(group.type)} fixtures)
              </span>

              <div className="flex flex-col gap-1.5 pl-1.5 border-l border-border/30">
                {group.categories.map(cat => {
                  const isCatSelected = selectedCategory === cat.slug;
                  const isExpanded = !!openCategories[cat.slug];
                  const matchCount = getProductCount(cat.slug);

                  return (
                    <div key={cat.slug} className="flex flex-col gap-1">
                      {/* Category row toggle */}
                      <div className="flex items-center justify-between group/row">
                        <button
                          onClick={() => handleSelectCategory(cat.slug)}
                          className={`flex-1 text-left font-serif text-[13px] tracking-wide transition-colors duration-200 cursor-pointer flex items-center gap-1.5 pr-2 ${
                            isCatSelected 
                              ? 'text-gold font-bold' 
                              : `text-text-dim ${sidebarHoverText}`
                          }`}
                        >
                          <span className={`w-1 h-3 bg-gold/50 rounded-[1px] transform transition-transform duration-300 ${isCatSelected ? 'scale-y-120 bg-gold' : 'scale-y-0'}`} />
                          <span>{cat.name}</span>
                          <span className="font-mono text-[8px] text-text-ghost/85 font-normal ml-0.5">
                            ({matchCount})
                          </span>
                        </button>

                        <button
                          onClick={() => toggleCategoryAccordion(cat.slug)}
                          className={`p-1 text-text-ghost ${sidebarHoverText} transition-colors block cursor-pointer`}
                          title="Toggle subcategories view"
                        >
                          {isExpanded ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Nested subcategories */}
                      {isExpanded && cat.subcategories.length > 0 && (
                        <div className="flex flex-col gap-1 pl-4 mb-2 mt-0.5 border-l border-gold-muted/20">
                          {cat.subcategories.map(sub => {
                            const isSubSelected = selectedSubcategory === sub;
                            const subCount = getSubcategoryCount(cat.slug, sub);

                            return (
                              <button
                                key={sub}
                                onClick={() => handleSelectSubcategory(cat.slug, sub)}
                                className={`text-left font-sans text-[11px] py-1 transition-colors duration-200 cursor-pointer flex items-center justify-between ${
                                  isSubSelected
                                    ? 'text-gold font-semibold'
                                    : `text-text-dim/80 ${sidebarHoverText}`
                                }`}
                              >
                                <span className="flex items-center gap-1.5">
                                  <span className={`w-1 h-1 rounded-full ${isSubSelected ? 'bg-gold animate-pulse-glow scale-125' : 'bg-transparent'}`} />
                                  <span>{sub}</span>
                                </span>
                                <span className="font-mono text-[8px] text-text-ghost/60">
                                  [{subCount}]
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter Checkbox features */}
      <div className="flex flex-col gap-2 pt-2 border-t border-border/40">
        <span className="font-mono text-[9px] text-text-ghost uppercase tracking-widest block mb-1">
          Special Classifications
        </span>
        <label className="flex items-center gap-2.5 cursor-pointer select-none py-1 group">
          <input
            type="checkbox"
            checked={onlyBestsellers}
            onChange={(e) => {
              setOnlyBestsellers(e.target.checked);
              if (viewMode === 'categories') setViewMode('fixtures');
            }}
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

      {/* Quick informational note */}
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
    <div className="select-none transition-page-enter min-h-screen bg-void text-cream">
      <Breadcrumbs />
      {/* 2-Column Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 items-start relative">
        
        {/* DESKTOP SIDEBAR (Collapsible) */}
        <aside 
          className={`hidden lg:block shrink-0 transition-all duration-550 ease-out-expo border border-border/40 bg-surface/50 p-6 shadow-sm rounded-[2px] self-start sticky top-28 ${
            isSidebarOpen 
              ? 'w-80 opacity-100 translate-x-0' 
              : 'w-0 opacity-0 -translate-x-12 overflow-hidden border-none p-0'
          }`}
          style={{ transitionProperty: 'width, opacity, transform, padding, border' }}
        >
          {isSidebarOpen && renderSidebarContent()}
        </aside>

        {/* MAIN RESULTS AREA */}
        <div className="flex-grow w-full min-w-0">
          <div className="sticky top-28 z-20 -mx-6 px-6 pt-2 pb-4 mb-8 bg-void/95 backdrop-blur-md border-b border-border/40">
          {/* Header section with rich brand info */}
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

              {/* Layout view controls */}
              <div className="flex items-center gap-3">
                {/* Desktop Toggle Sidebar Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hidden lg:flex items-center gap-2 bg-surface border border-border px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-text-dim hover:text-gold transition-colors duration-250 cursor-pointer"
                  title="Toggle specification filter lane"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-gold-muted" />
                  <span>{isSidebarOpen ? 'Hide Filters' : 'Show Filters'}</span>
                </button>

                {/* Mobile Filter Trigger Button */}
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="lg:hidden flex items-center gap-2 bg-gold text-white border border-gold px-4 py-2 font-mono text-[9px] uppercase tracking-widest font-bold transition-all duration-250 cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Specs ({hasActiveFilters ? 'Active' : 'All'})</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Tags Row */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 bg-surface-alt border border-border/40 rounded-[2px] animate-page-enter">
              <span className="font-mono text-[8px] text-text-ghost uppercase tracking-wider mr-1">
                Active Indices:
              </span>
              
              {selectedParent !== 'ALL' && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>DIVISION: {selectedParent.toUpperCase()}</span>
                  <button onClick={() => setSelectedParent('ALL')} className="hover:text-black dark:hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedCategory && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>CATEGORY: {selectedCategory.replace('-', ' ').toUpperCase()}</span>
                  <button onClick={() => handleSelectCategory(null)} className="hover:text-black dark:hover:text-white cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSubcategory && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-gold/40 px-2.5 py-1 font-mono text-[9px] text-cream bg-gold/5 rounded-[2px]">
                  <span>SUB: {selectedSubcategory.toUpperCase()}</span>
                  <button onClick={() => setSelectedSubcategory(null)} className="hover:text-gold cursor-pointer"><X className="w-3 h-3" /></button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 bg-void border border-border/70 px-2.5 py-1 font-mono text-[9px] text-gold rounded-[2px]">
                  <span>KEYWORD: "{searchQuery}"</span>
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

          {/* View Selection Tabs */}
          <div className="flex justify-start border-b border-border/20">
            <button
              onClick={() => setViewMode('categories')}
              className={`pb-3 px-4 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${
                viewMode === 'categories'
                  ? 'text-gold font-bold'
                  : 'text-text-dim hover:text-black dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5" />
                <span>Classifications ({filteredCategories.length})</span>
              </div>
              {viewMode === 'categories' && (
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gold shadow-[0_0_8px_var(--color-gold)] animate-pulse-glow" />
              )}
            </button>
            <button
              onClick={() => setViewMode('fixtures')}
              className={`pb-3 px-4 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 relative cursor-pointer ${
                viewMode === 'fixtures'
                  ? 'text-gold font-bold'
                  : 'text-text-dim hover:text-black dark:hover:text-white'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5" />
                <span>Luminaires / Fixtures ({filteredProducts.length})</span>
              </div>
              {viewMode === 'fixtures' && (
                <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gold shadow-[0_0_8px_var(--color-gold)] animate-pulse-glow" />
              )}
            </button>
          </div>
          </div>

          {/* CATALOG SELECTION PANELS */}
          {viewMode === 'categories' ? (
            /* CATEGORIES VIEW PANELS */
            filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCategories.map((category, idx) => (
                  <div key={category.slug}>
                    <ScrollReveal direction="up" delay={idx * 0.05}>
                      <CategoryCard category={category} />
                    </ScrollReveal>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-dashed border-border/60">
                <span className="font-mono text-xs text-text-dim uppercase tracking-widest">
                  No specifications matched this parent division.
                </span>
              </div>
            )
          ) : (
            /* PRODUCTS VIEW PANELS (FIXTURES LISTED SEPARATELY) */
            filteredProducts.length > 0 ? (
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
            )
          )}
        </div>
      </div>

      {/* MOBILE FULL-SCREEN SLIDEOUT FILTERS DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" id="mobile-filter-drawer">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-void/80 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          {/* Slider Drawer */}
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
                View results ({viewMode === 'categories' ? filteredCategories.length : filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auxiliary standards & info bar */}
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
