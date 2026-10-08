'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES } from '@/lib/routes';
import {
  HEADER_SEARCH_EVENT,
  PRODUCT_NAV,
  PROJECT_NAV,
  SMART_NAV,
  brochureHref,
  quoteHref,
} from '@/lib/site';
import Logo from '../common/Logo';
import { buttonClasses } from '../ui/Button';
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  ChevronDown,
  ArrowRight,
  Download,
  Lightbulb,
  House,
} from 'lucide-react';

type DropdownKey = 'products' | 'smart';

export function Navbar() {
  const { currentView, pathname } = useNavigation();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownKey | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Default to light on server + first client render to avoid hydration mismatch.
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isThemeReady, setIsThemeReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('syflight-theme');
    const initial =
      saved === 'dark' || saved === 'light'
        ? saved
        : document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light';
    setTheme(initial);
    setIsThemeReady(true);

    // The typography switcher was retired; clear any stale selection.
    localStorage.removeItem('syflight-font');
    document.documentElement.removeAttribute('data-font');
    document.getElementById('syflight-font-theme')?.remove();
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('syflight-theme', theme);
  }, [theme, isThemeReady]);

  // Close menus on route change (adjusting state during render, per React docs)
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
    setActiveDropdown(null);
    setIsSearchOpen(false);
  }

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setIsSearchOpen(false);
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isActive = (viewType: string) => {
    if (viewType === 'products') {
      return ['products', 'product-category', 'product-detail'].includes(currentView.type);
    }
    if (viewType === 'smart') {
      return currentView.type === 'smart-lights' || currentView.type === 'home-automation';
    }
    return currentView.type === viewType;
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    window.dispatchEvent(new CustomEvent(HEADER_SEARCH_EVENT, { detail: q }));
    router.push(q ? `${ROUTES.products}?search=${encodeURIComponent(q)}` : ROUTES.products);
    setIsSearchOpen(false);
    setIsOpen(false);
    setQuery('');
  };

  const navItemClass = (key: string) =>
    `relative inline-flex h-10 items-center gap-1 whitespace-nowrap rounded-sm px-2.5 xl:px-3 text-sm font-medium transition-colors duration-150 ${
      isActive(key) || activeDropdown === key
        ? 'text-cream'
        : 'text-text-dim hover:text-cream'
    }`;

  const activeBar = (key: string) =>
    isActive(key) ? (
      <span className="absolute inset-x-2.5 xl:inset-x-3 -bottom-[15px] h-0.5 rounded-full bg-gold" aria-hidden />
    ) : null;

  const close = () => setActiveDropdown(null);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border bg-void/85 backdrop-blur-xl backdrop-saturate-150"
      id="site-header"
      onMouseLeave={close}
    >
      <div className="container-page flex h-[var(--header-height)] items-center gap-6">
        <Link href={ROUTES.home} className="shrink-0" id="navbar-brand-logo" aria-label="SYSlight home">
          <Logo size="md" className="!h-11" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 xl:ml-4" aria-label="Primary">
          <Link
            href={ROUTES.products}
            onMouseEnter={() => setActiveDropdown('products')}
            onFocus={() => setActiveDropdown('products')}
            className={navItemClass('products')}
            aria-expanded={activeDropdown === 'products'}
          >
            Products
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'products' ? 'rotate-180' : ''}`} />
            {activeBar('products')}
          </Link>
          <Link
            href={ROUTES.smartLights}
            onMouseEnter={() => setActiveDropdown('smart')}
            onFocus={() => setActiveDropdown('smart')}
            className={navItemClass('smart')}
            aria-expanded={activeDropdown === 'smart'}
          >
            Smart Living
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${activeDropdown === 'smart' ? 'rotate-180' : ''}`} />
            {activeBar('smart')}
          </Link>
          {[
            { key: 'projects', label: 'Projects', href: ROUTES.projects },
            { key: 'professionals', label: 'For Professionals', href: ROUTES.professionals },
            { key: 'about', label: 'About', href: ROUTES.about },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onMouseEnter={close}
              onFocus={close}
              className={navItemClass(item.key)}
            >
              {item.label}
              {activeBar(item.key)}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsSearchOpen((v) => !v)}
            className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-sm text-text-dim hover:bg-surface-alt hover:text-cream transition-colors"
            aria-label="Search products"
            aria-expanded={isSearchOpen}
          >
            <Search className="h-[18px] w-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-text-dim hover:bg-surface-alt hover:text-cream transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
          </button>

          <Link
            href={ROUTES.contact}
            className={`max-md:hidden lg:max-xl:hidden ${buttonClasses('ghost', 'sm')} ${isActive('contact') ? 'text-gold' : ''}`}
          >
            Contact
          </Link>
          <Link href={quoteHref()} className={`max-sm:hidden ${buttonClasses('primary', 'sm')}`}>
            Get a quote
          </Link>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm text-cream hover:bg-surface-alt"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {isSearchOpen && (
        <div className="absolute inset-x-0 top-full border-b border-border bg-void animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="container-page flex items-center gap-3 py-4">
            <Search className="h-5 w-5 text-text-ghost shrink-0" />
            <input
              ref={searchInputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, series or code — e.g. Snap, Latch, SL-FR"
              className="flex-1 bg-transparent text-lg text-cream placeholder:text-text-ghost focus:outline-none"
              aria-label="Search products"
            />
            <button type="submit" className={buttonClasses('primary', 'sm')}>
              Search
            </button>
          </form>
        </div>
      )}

      {/* Desktop mega menus */}
      {activeDropdown && (
        <div
          className="absolute inset-x-0 top-full hidden lg:block border-b border-border bg-void shadow-lifted animate-fade-in"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
        >
          <div className="container-page py-8">
            {activeDropdown === 'products' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4">
                  <p className="eyebrow mb-4 text-text-ghost">Indoor lighting</p>
                  <ul className="grid gap-1">
                    {PRODUCT_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className="flex items-center justify-between rounded-sm px-3 py-2 -mx-3 text-sm text-cream hover:bg-surface-alt group"
                        >
                          {item.label}
                          <ArrowRight className="h-3.5 w-3.5 text-text-ghost opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3">
                  <p className="eyebrow mb-4 text-text-ghost">Projects by sector</p>
                  <ul className="grid gap-1">
                    {PROJECT_NAV.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          className="block rounded-sm px-3 py-2 -mx-3 text-sm text-cream hover:bg-surface-alt"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-5 grid grid-cols-2 gap-4">
                  <Link
                    href={ROUTES.products}
                    onClick={close}
                    className="group card card-interactive flex flex-col justify-between p-5 bg-accent-soft border-transparent"
                  >
                    <Lightbulb className="h-6 w-6 text-gold" />
                    <div>
                      <p className="heading-3 mt-8">All products</p>
                      <p className="mt-1 text-sm text-text-dim">Filter the full catalogue by series, section and code.</p>
                      <span className="link-arrow mt-4">
                        Browse catalogue <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                  <Link
                    href={brochureHref()}
                    onClick={close}
                    className="group card card-interactive flex flex-col justify-between p-5"
                  >
                    <Download className="h-6 w-6 text-gold" />
                    <div>
                      <p className="heading-3 mt-8">Brochure</p>
                      <p className="mt-1 text-sm text-text-dim">The complete SYSlight range with specifications.</p>
                      <span className="link-arrow mt-4">
                        Get the brochure <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            )}

            {activeDropdown === 'smart' && (
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4">
                  <p className="eyebrow mb-3 text-text-ghost">Smart Living</p>
                  <p className="text-sm text-text-dim leading-relaxed max-w-xs">
                    Tunable light and connected homes — designed, programmed and supported by our
                    Mumbai team.
                  </p>
                </div>
                <div className="col-span-8 grid grid-cols-2 gap-4">
                  {SMART_NAV.map((item, i) => {
                    const Icon = i === 0 ? Lightbulb : House;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={close}
                        className="group card card-interactive flex gap-4 p-5"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-gold">
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="heading-3 block">{item.label}</span>
                          <span className="mt-1 block text-sm text-text-dim">{item.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile drawer — absolute, not fixed: the header's backdrop-filter
          makes it the containing block for fixed descendants. */}
      {isOpen && (
        <div
          className="lg:hidden absolute inset-x-0 top-full z-50 h-[calc(100dvh-var(--header-height))] overflow-y-auto bg-void animate-fade-in"
          data-lenis-prevent
        >
          <div className="container-page flex flex-col gap-8 py-6">
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-ghost" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="field pl-10"
                aria-label="Search products"
              />
            </form>

            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {[
                { key: 'home', label: 'Home', href: ROUTES.home },
                { key: 'products', label: 'Products', href: ROUTES.products },
                { key: 'smart-lights', label: 'Smart Lights', href: ROUTES.smartLights },
                { key: 'home-automation', label: 'Home Automation', href: ROUTES.homeAutomation },
                { key: 'projects', label: 'Projects', href: ROUTES.projects },
                { key: 'professionals', label: 'For Professionals', href: ROUTES.professionals },
                { key: 'about', label: 'About', href: ROUTES.about },
                { key: 'contact', label: 'Contact', href: ROUTES.contact },
              ].map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between py-4 text-lg font-medium ${
                      isActive(item.key) ? 'text-gold' : 'text-cream'
                    }`}
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-text-ghost" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="grid gap-3">
              <Link href={quoteHref()} onClick={() => setIsOpen(false)} className={buttonClasses('primary', 'lg', 'w-full')}>
                Get a quote
              </Link>
              <Link href={brochureHref()} onClick={() => setIsOpen(false)} className={buttonClasses('secondary', 'lg', 'w-full')}>
                <Download className="h-4 w-4" /> Brochure
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
