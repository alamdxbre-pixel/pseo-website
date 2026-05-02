import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

const categories = [
  {
    label: 'Print',
    href: '/print',
    icon: '🖨️',
    description: 'Visiting cards, stationery, banners',
  },
  {
    label: 'Apparel',
    href: '/apparel',
    icon: '👕',
    description: 'T-shirts, caps, uniforms',
  },
  {
    label: 'Merchandise & Gifts',
    href: '/merchandise',
    icon: '🎁',
    description: 'Branded gifts, promotional items',
  },
  {
    label: 'Digital Services',
    href: '/digital',
    icon: '💻',
    description: 'Design, print-ready files, packaging',
  },
];

const navLinks = [
  { label: 'Home', href: '/' },
  // Products handled separately (mega-menu)
  { label: 'Campaigns', href: '/campaigns' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const productsButtonRef = useRef<HTMLButtonElement>(null);

  // Close mega-menu on outside click
  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        productsOpen &&
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    },
    [productsOpen]
  );

  // Close mega-menu on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (productsOpen) {
          setProductsOpen(false);
          productsButtonRef.current?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    },
    [productsOpen, mobileOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOutsideClick, handleKeyDown]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  const isProductsActive = categories.some((c) => currentPath.startsWith(c.href));

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ─────────────────────────────────────────────────────── */}
          <a
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-[var(--color-brand-charcoal)] hover:text-[var(--color-brand-accent)] transition-colors"
            aria-label="BrandName — home"
          >
            <span className="w-8 h-8 rounded-lg bg-[var(--color-brand-accent)] text-white flex items-center justify-center text-sm font-bold">
              B
            </span>
            BrandName
          </a>

          {/* ── Desktop nav ──────────────────────────────────────────────── */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            <a
              href="/"
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive('/')
                  ? 'text-[var(--color-brand-accent)] bg-teal-50'
                  : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
              )}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </a>

            {/* Products mega-menu trigger */}
            <div className="relative" ref={megaMenuRef}>
              <button
                ref={productsButtonRef}
                onClick={() => setProductsOpen((o) => !o)}
                aria-expanded={productsOpen}
                aria-haspopup="true"
                aria-controls="mega-menu-products"
                className={cn(
                  'flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isProductsActive || productsOpen
                    ? 'text-[var(--color-brand-accent)] bg-teal-50'
                    : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
                )}
              >
                Products
                <svg
                  className={cn(
                    'w-4 h-4 transition-transform duration-200',
                    productsOpen ? 'rotate-180' : ''
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* Mega-menu panel */}
              {productsOpen && (
                <div
                  id="mega-menu-products"
                  role="region"
                  aria-label="Product categories"
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] bg-white rounded-2xl border border-slate-100 shadow-xl p-6"
                >
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    Browse by category
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {categories.map((cat) => (
                      <a
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setProductsOpen(false)}
                        className={cn(
                          'flex items-start gap-3 p-4 rounded-xl border transition-all',
                          currentPath.startsWith(cat.href)
                            ? 'border-[var(--color-brand-accent)] bg-teal-50'
                            : 'border-slate-100 hover:border-[var(--color-brand-accent)] hover:bg-teal-50'
                        )}
                      >
                        <span className="text-2xl" aria-hidden="true">
                          {cat.icon}
                        </span>
                        <span>
                          <span className="block font-semibold text-sm text-slate-900">
                            {cat.label}
                          </span>
                          <span className="block text-xs text-slate-500 mt-0.5">
                            {cat.description}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <a
                      href="/products"
                      onClick={() => setProductsOpen(false)}
                      className="text-sm font-medium text-[var(--color-brand-accent)] hover:underline"
                    >
                      View all products →
                    </a>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  isActive(link.href)
                    ? 'text-[var(--color-brand-accent)] bg-teal-50'
                    : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ── Desktop CTA ───────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 bg-[var(--color-brand-accent)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </a>
          </div>

          {/* ── Mobile hamburger ──────────────────────────────────────────── */}
          <button
            className="lg:hidden p-2 rounded-md text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer overlay ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300 lg:hidden overflow-y-auto',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <a href="/" className="font-bold text-lg text-[var(--color-brand-charcoal)]">
            BrandName
          </a>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-md text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50 transition-colors"
            aria-label="Close navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Mobile navigation">
          <a
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors',
              isActive('/')
                ? 'text-[var(--color-brand-accent)] bg-teal-50'
                : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
            )}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </a>

          {/* Products accordion in mobile */}
          <div>
            <button
              onClick={() => setMobileProductsOpen((o) => !o)}
              aria-expanded={mobileProductsOpen}
              className={cn(
                'flex items-center justify-between w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isProductsActive
                  ? 'text-[var(--color-brand-accent)] bg-teal-50'
                  : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
              )}
            >
              Products
              <svg
                className={cn(
                  'w-4 h-4 transition-transform duration-200',
                  mobileProductsOpen ? 'rotate-180' : ''
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {mobileProductsOpen && (
              <div className="mt-1 ml-3 space-y-1 border-l-2 border-teal-100 pl-3">
                {categories.map((cat) => (
                  <a
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                      currentPath.startsWith(cat.href)
                        ? 'text-[var(--color-brand-accent)] font-medium'
                        : 'text-slate-600 hover:text-[var(--color-brand-accent)]'
                    )}
                  >
                    <span aria-hidden="true">{cat.icon}</span>
                    {cat.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors',
                isActive(link.href)
                  ? 'text-[var(--color-brand-accent)] bg-teal-50'
                  : 'text-slate-700 hover:text-[var(--color-brand-accent)] hover:bg-slate-50'
              )}
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-slate-100">
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 bg-[var(--color-brand-accent)] text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
