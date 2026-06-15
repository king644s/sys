'use client';

import { useState, useEffect, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@/hooks/useNavigation';
import { ROUTES, CATEGORY_SLUGS, categoryPath } from '@/lib/routes';
import { useLightingStore } from '@/store/lightingStore';
import Logo from '../common/Logo';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  Sun, 
  Moon, 
  ChevronDown, 
  ArrowRight 
} from 'lucide-react';

export function Navbar() {
  const { currentView } = useNavigation();
  const router = useRouter();
  const cartEnquiry = useLightingStore((state) => state.cartEnquiry);

  // States
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle
  const [activeDropdown, setActiveDropdown] = useState<'products' | 'customise' | 'about' | 'inspire' | null>(null);
  const [localSearch, setLocalSearch] = useState('');
  
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
  }, []);

  useEffect(() => {
    if (!isThemeReady) return;

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('syflight-theme', theme);
  }, [theme, isThemeReady]);

  const isActive = (viewType: string) => {
    if (viewType === 'products') {
      return currentView.type === 'products' || currentView.type === 'product-category' || currentView.type === 'product-detail';
    }
    return currentView.type === viewType;
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      router.push(ROUTES.products);
      setActiveDropdown(null);
    }
  };

  const dropdownLinkClass =
    'text-left font-sans text-xs tracking-wider text-text-dim hover:text-gold transition-colors cursor-pointer';
  const dropdownLinkClassMedium = `${dropdownLinkClass} font-medium`;

  return (
    <header 
      className="sticky top-0 z-50 bg-surface border-b border-border transition-colors duration-300 select-none"
      id="elegant-luxury-header"
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="max-w-7xl mx-auto px-6 h-28 md:h-28 flex items-center justify-between relative">
        
        {/* Left Side: Navigation Links (HOME, PRODUCTS, CUSTOMISE, ABOUT, INSPIRE) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          
          <Link
            href={ROUTES.home}
            onClick={() => setActiveDropdown(null)}
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer relative py-2 ${
              isActive('home')
                ? 'text-cream font-bold'
                : 'text-text-dim hover:text-gold'
            }`}
          >
            HOME
            {isActive('home') && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream" />
            )}
          </Link>

          <Link
            href={ROUTES.products}
            onMouseEnter={() => setActiveDropdown('products')}
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer relative py-2 flex items-center gap-1 ${
              isActive('products') || activeDropdown === 'products'
                ? 'text-cream font-bold'
                : 'text-text-dim hover:text-gold'
            }`}
          >
            <span>PRODUCTS</span>
            {activeDropdown === 'products' && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream" />
            )}
          </Link>

          <Link
            href={ROUTES.smartLights}
            onMouseEnter={() => setActiveDropdown('customise')}
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer relative py-2 ${
              isActive('smart-lights') || activeDropdown === 'customise'
                ? 'text-cream font-bold'
                : 'text-text-dim hover:text-gold'
            }`}
          >
            CUSTOMISE
            {(isActive('smart-lights') || activeDropdown === 'customise') && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream" />
            )}
          </Link>

          <Link
            href={ROUTES.about}
            onMouseEnter={() => setActiveDropdown('about')}
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer relative py-2 ${
              isActive('about') || activeDropdown === 'about'
                ? 'text-cream font-bold'
                : 'text-text-dim hover:text-gold'
            }`}
          >
            ABOUT
            {(isActive('about') || activeDropdown === 'about') && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream" />
            )}
          </Link>

          <Link
            href={ROUTES.projects}
            onMouseEnter={() => setActiveDropdown('inspire')}
            className={`font-sans text-[11px] font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer relative py-2 ${
              isActive('projects') || activeDropdown === 'inspire'
                ? 'text-cream font-bold'
                : 'text-text-dim hover:text-gold'
            }`}
          >
            INSPIRE
            {(isActive('projects') || activeDropdown === 'inspire') && (
              <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-cream" />
            )}
          </Link>
        </nav>

        {/* Centered Luxury stacked brand logo (Dynamic SYSlight Component) */}
        <Link
          href={ROUTES.home}
          className="cursor-pointer select-none self-center absolute left-1/2 -translate-x-1/2 group"
          id="navbar-brand-logo"
        >
          <Logo size="md" className="!h-[60px]" />
        </Link>

        {/* Right Side: Theme switcher + Contact + Download Brochure CTA */}
        <div className="flex items-center gap-3 md:gap-4 ml-auto lg:ml-0">
          
          {/* Theme Switcher Toggle (Luxury sun/moon representation) */}
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-1.5 text-text-dim hover:text-gold transition-colors cursor-pointer rounded-full hover:bg-surface-alt"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <Moon className="w-4.5 h-4.5 stroke-[1.5]" />
            ) : (
              <Sun className="w-4.5 h-4.5 text-gold stroke-[1.5] animate-pulse-glow" />
            )}
          </button>

          {/* Contact Us button */}
          <Link
            href={ROUTES.contact}
            className="hidden md:inline-flex font-mono text-[10px] uppercase tracking-[0.16em] border border-border px-3 md:px-4 py-2 hover:border-gold hover:text-gold text-cream transition-all duration-300 cursor-pointer rounded-[1px] font-bold"
          >
            Contact Us
          </Link>

          {/* Download Brochure CTA with blank link */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="hidden sm:inline-flex font-mono text-[10px] uppercase tracking-[0.16em] bg-cream hover:bg-gold hover:text-void text-surface px-3 md:px-4 py-2 transition-all duration-300 font-bold rounded-[1px]"
          >
            Download Brochure
          </a>

          {/* Mobile menu trigger */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1.5 text-text-dim hover:text-gold transition-colors rounded-full hover:bg-surface-alt"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* FULL-WIDTH SPECIFICATION DROP-DOWN PORTFOLIO SYSTEM */}
      {activeDropdown && (
        <div 
          className="absolute left-0 right-0 top-full bg-surface border-b border-border shadow-xl z-50 animate-fade-in py-10 px-8 transition-all duration-300"
          onMouseEnter={() => setActiveDropdown(activeDropdown)}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Specific structured catalog layout list */}
            <div className="col-span-7 grid grid-cols-3 gap-6">
              
              {/* DROPDOWN SCHEMA - ABOUT (Exactly styled like David Hunt photo) */}
              {activeDropdown === 'about' && (
                <>
                  <div className="flex flex-col gap-2.5">
                    <Link href={ROUTES.about} onClick={() => setActiveDropdown(null)} className={dropdownLinkClassMedium}>
                      Our Story
                    </Link>
                    <Link href={ROUTES.about} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      The team
                    </Link>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Join us
                    </Link>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Contact us
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Find us
                    </Link>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Find a stockist
                    </Link>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Showroom
                    </Link>
                    <Link href={ROUTES.about} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Delivery times
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Trade Partners
                    </Link>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClassMedium}>
                      FAQs
                    </Link>
                  </div>
                </>
              )}

              {activeDropdown === 'products' && (
                <>
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Indoor Core
                    </span>
                    <Link href={categoryPath(CATEGORY_SLUGS.cobSpotlight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      COB Spotlights
                    </Link>
                    <Link href={categoryPath(CATEGORY_SLUGS.magneticTrack)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Magnetic Track Light
                    </Link>
                    <Link href={categoryPath(CATEGORY_SLUGS.deepDownlight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Deep Recessed Downlight
                    </Link>
                    <Link href={categoryPath(CATEGORY_SLUGS.sysprofiles)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Trimless Linear Extrusions
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Outdoor Spectrum
                    </span>
                    <Link href={categoryPath(CATEGORY_SLUGS.gardenLight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Garden Light / Spikes
                    </Link>
                    <Link href={categoryPath(CATEGORY_SLUGS.wallLight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Up-Down Wall washers
                    </Link>
                    <Link href={categoryPath(CATEGORY_SLUGS.floodLight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Asymmetrical Flood Lights
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Custom Adjustables
                    </span>
                    <Link href={categoryPath(CATEGORY_SLUGS.zoomLight)} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Continuous Optical Focus
                    </Link>
                    <Link href={ROUTES.products} onClick={() => setActiveDropdown(null)} className={`${dropdownLinkClassMedium} flex items-center gap-1.5`}>
                      <span>Explore Catalog</span>
                      <ArrowRight className="w-3 h-3 text-gold" />
                    </Link>
                  </div>
                </>
              )}

              {activeDropdown === 'customise' && (
                <>
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Tuning Controls
                    </span>
                    <Link href={ROUTES.smartLights} onClick={() => setActiveDropdown(null)} className={dropdownLinkClassMedium}>
                      Kelvin Slider Core
                    </Link>
                    <Link href={ROUTES.smartLights} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Dim-to-Warm Emitter
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Protocols
                    </span>
                    <Link href={ROUTES.smartLights} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Casambi Bluetooth Setup
                    </Link>
                    <Link href={ROUTES.smartLights} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      DALI Integration
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Custom Finishes
                    </span>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Bespoke Sand-Gold Cores
                    </Link>
                  </div>
                </>
              )}

              {activeDropdown === 'inspire' && (
                <>
                  <div className="flex flex-col gap-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Residential Projects
                    </span>
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Luxury Duplex Villas
                    </Link>
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Contemporary Art Gallerias
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Commercial Showcase
                    </span>
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={`${dropdownLinkClassMedium} hover:underline`}>
                      Boutique Hotel Lobbies
                    </Link>
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Minimalist Design Labs
                    </Link>
                  </div>

                  <div className="flex flex-col gap-2.5 border-l border-border/60 pl-6">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-text-ghost mb-1">
                      Calculation Maps
                    </span>
                    <Link href={ROUTES.contact} onClick={() => setActiveDropdown(null)} className={dropdownLinkClass}>
                      Request IES Data
                    </Link>
                    <Link href={ROUTES.projects} onClick={() => setActiveDropdown(null)} className={`${dropdownLinkClassMedium} flex items-center gap-1`}>
                      <span>Showcase Gallery</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gold" />
                    </Link>
                  </div>
                </>
              )}

            </div>

            <div className="col-span-5 flex gap-4">
              <Link
                href={ROUTES.smartLights}
                onClick={() => setActiveDropdown(null)}
                className="relative flex-1 aspect-[1.12/1] bg-[#121214] border border-border/35 overflow-hidden cursor-pointer group block"
              >
                <div className="absolute inset-0 bg-[#121214]">
                  <svg className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-750 ease-out-expo" viewBox="0 0 200 180" fill="none">
                    <defs>
                      <radialGradient id="card-glow" cx="100" cy="50" r="80" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="#E6E5FF" stopOpacity="0.4" />
                        <stop offset="50%" stopColor="#4D4A9D" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="#000" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                    <rect width="200" height="180" fill="#141416" />
                    <circle cx="100" cy="50" r="100" fill="url(#card-glow)" />
                    <line x1="100" y1="0" x2="100" y2="65" stroke="#fcf3e8" strokeWidth="0.75" opacity="0.5" />
                    <path d="M 70,105 C 70,80 130,80 130,105 Z" fill="var(--color-gold)" opacity="0.9" />
                    <circle cx="100" cy="103" r="5" fill="#ffd899" />
                    <circle cx="100" cy="103" r="12" fill="#fff" filter="blur(3px)" opacity="0.4" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="font-serif text-[15px] italic text-[#f3f4f6] tracking-wide font-light">
                    Customise
                  </span>
                </div>
              </Link>

              <Link
                href={ROUTES.products}
                onClick={() => setActiveDropdown(null)}
                className="relative flex-1 aspect-[1.12/1] bg-[#161618] border border-border/35 overflow-hidden cursor-pointer group block"
              >
                <div className="absolute inset-0 bg-[#161618]">
                  <svg className="w-full h-full object-cover opacity-65 group-hover:scale-105 transition-transform duration-750 ease-out-expo" viewBox="0 0 200 180" fill="none">
                    <rect width="200" height="180" fill="#1a1a1c" />
                    <g opacity="0.04" stroke="#fff" strokeWidth="0.5">
                      <line x1="0" y1="45" x2="200" y2="45" />
                      <line x1="0" y1="90" x2="200" y2="90" />
                      <line x1="0" y1="135" x2="200" y2="135" />
                      <line x1="66" y1="0" x2="66" y2="180" />
                      <line x1="133" y1="0" x2="133" y2="180" />
                    </g>
                    <rect x="125" y="35" width="55" height="75" rx="2" fill="#242528" stroke="#37383c" strokeWidth="0.75" transform="rotate(7 150 72)" />
                    <rect x="75" y="30" width="55" height="75" rx="2" fill="#d4af37" stroke="#edd36f" strokeWidth="0.75" transform="rotate(-6 102 67)" />
                    <rect x="25" y="38" width="55" height="75" rx="2" fill="#c47855" stroke="#dda88d" strokeWidth="0.75" transform="rotate(14 52 75)" />
                    <path d="M 60,30 L 140,110" stroke="#fff" strokeWidth="0.5" opacity="0.12" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="font-serif text-[15px] italic text-[#f3f4f6] tracking-wide font-light">
                    View our finishes
                  </span>
                </div>
              </Link>
            </div>

          </div>
        </div>
      )}

      {isOpen && (
        <div className="lg:hidden absolute inset-x-0 top-full bg-surface border-b border-border flex flex-col p-6 gap-6 z-50 shadow-2xl animate-page-enter">
          <div className="flex flex-col gap-2 relative">
            <span className="font-mono text-[8px] tracking-[0.2em] text-text-ghost uppercase mb-1">Specifications search</span>
            <form onSubmit={handleSearchSubmit} className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-text-ghost" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search catalog... (e.g. 12W, recessed)"
                className="w-full bg-surface-alt border border-border px-3.5 py-2 pl-10 text-xs text-cream placeholder-text-text-ghost rounded-[1px] focus:outline-none focus:border-gold/60"
              />
            </form>
          </div>

          <ul className="flex flex-col gap-4 font-sans text-xs uppercase tracking-[0.16em] text-text-dim font-semibold">
            <li>
              <Link href={ROUTES.home} onClick={() => setIsOpen(false)} className={`block w-full text-left py-1 cursor-pointer ${isActive('home') ? 'text-gold' : ''}`}>
                home
              </Link>
            </li>
            <li>
              <Link href={ROUTES.products} onClick={() => setIsOpen(false)} className={`block w-full text-left py-1 cursor-pointer ${isActive('products') ? 'text-gold' : ''}`}>
                architectural products
              </Link>
            </li>
            <li>
              <Link href={ROUTES.smartLights} onClick={() => setIsOpen(false)} className={`block w-full text-left py-1 cursor-pointer ${isActive('smart-lights') ? 'text-gold' : ''}`}>
                customise / smart cct
              </Link>
            </li>
            <li>
              <Link href={ROUTES.projects} onClick={() => setIsOpen(false)} className={`block w-full text-left py-1 cursor-pointer ${isActive('projects') ? 'text-gold' : ''}`}>
                inspire gallery
              </Link>
            </li>
            <li>
              <Link href={ROUTES.about} onClick={() => setIsOpen(false)} className={`block w-full text-left py-1 cursor-pointer ${isActive('about') ? 'text-gold' : ''}`}>
                about workshop
              </Link>
            </li>
          </ul>

          <div className="border-t border-border pt-5 flex flex-col gap-3">
            <Link
              href={ROUTES.contact}
              onClick={() => setIsOpen(false)}
              className="text-center w-full py-3 text-xs font-mono uppercase bg-cream text-surface tracking-[0.16em] font-bold rounded-[1px] cursor-pointer block"
            >
              Contact Us
            </Link>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); setIsOpen(false); }}
              className="text-center w-full py-3 text-xs font-mono uppercase border border-border text-cream tracking-[0.16em] font-bold rounded-[1px] block cursor-pointer"
            >
              Download Brochure
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
