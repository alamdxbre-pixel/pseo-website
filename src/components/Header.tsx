import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { SHOW_CAMPAIGNS, SHOW_SERVICES, SHOW_PRODUCTS } from '@/lib/flags';

const productCategories = [
  { label: 'Print', href: '/print', description: 'Visiting cards, stationery, banners' },
  { label: 'Apparel', href: '/apparel', description: 'T-shirts, caps, uniforms' },
  { label: 'Merchandise & Gifts', href: '/merchandise', description: 'Branded gifts, promotional items' },
  { label: 'Digital Services', href: '/digital', description: 'Design, print-ready files, packaging' },
];

const serviceItems = [
  { label: 'IT Consultancy',              href: '/services/it-ai#it-consultancy' },
  { label: 'Custom Software Engineering', href: '/services/it-ai#custom-software-engineering' },
  { label: 'Microservice Architecture',   href: '/services/it-ai#microservice-architecture' },
  { label: 'SaaS Platform Engineering',   href: '/services/it-ai#saas-platform-engineering' },
  { label: 'RAG & Knowledge Systems',     href: '/services/it-ai#rag-knowledge-systems' },
  { label: 'AI Model Training & Fine-tuning', href: '/services/it-ai#ai-model-training' },
];

const allNavLinks = [
  { label: 'Home', href: '/' },
  ...(SHOW_CAMPAIGNS ? [{ label: 'Campaigns', href: '/campaigns' }] : []),
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesMenuRef = useRef<HTMLDivElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        servicesOpen &&
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    },
    [servicesOpen]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (servicesOpen) {
          setServicesOpen(false);
          servicesButtonRef.current?.focus();
        }
        if (mobileOpen) setMobileOpen(false);
      }
    },
    [servicesOpen, mobileOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleOutsideClick, handleKeyDown]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  const isServicesActive = SHOW_SERVICES && currentPath.startsWith('/services');

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030B18] border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="BuoyantSolutions — home"
          >
            <span className="w-7 h-7 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
              B
            </span>
            <span className="text-white text-lg tracking-wide" style={{ fontFamily: "'Glacial Indifference', sans-serif", fontWeight: 700 }}>
              Buoyant <span style={{ fontWeight: 400 }}>solutions</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">

            <a
              href="/"
              className={cn(
                'px-3 py-2 text-sm font-medium transition-colors',
                isActive('/') ? 'text-white' : 'text-white/45 hover:text-white'
              )}
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Home
            </a>

            {/* Services dropdown */}
            {SHOW_SERVICES && (
              <div className="relative" ref={servicesMenuRef}>
                <button
                  ref={servicesButtonRef}
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-controls="services-menu"
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors',
                    isServicesActive || servicesOpen ? 'text-white' : 'text-white/45 hover:text-white'
                  )}
                >
                  Services
                  <svg
                    className={cn('w-3.5 h-3.5 transition-transform duration-200', servicesOpen ? 'rotate-180' : '')}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                  </svg>
                </button>

                {servicesOpen && (
                  <div
                    id="services-menu"
                    role="region"
                    aria-label="Service offerings"
                    className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 shadow-xl shadow-black/10 rounded"
                  >
                    <div className="p-2">
                      {serviceItems.map((item, i) => (
                        <a
                          key={item.label}
                          href={item.href}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-mono text-[10px] font-bold text-blue-400 w-5 shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {allNavLinks.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-sm font-medium transition-colors',
                  isActive(link.href) ? 'text-white' : 'text-white/45 hover:text-white'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop right CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="/marketing"
              className="px-4 py-2 text-[11px] font-bold tracking-[0.2em] uppercase rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/60 hover:scale-105 transition-all duration-200"
            >
              Buoyant Marketing &rarr;
            </a>
            <a
              href="/contact"
              className="px-5 py-2 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 transition-colors"
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-[#030B18] border-l border-white/[0.06] shadow-2xl transform transition-transform duration-300 lg:hidden overflow-y-auto',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/[0.06]">
          <a href="/" className="text-white text-sm font-light">
            Buoyant<span className="font-bold">Solutions</span>
          </a>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-white/40 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Marketing switch */}
        <div className="px-6 pt-6 pb-2">
          <a
            href="/marketing"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-blue-500/20 text-blue-400/70 text-xs font-bold tracking-widest uppercase rounded hover:border-blue-500/40 hover:text-blue-400 transition-colors"
          >
            Switch to Buoyant Marketing
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">

          <a
            href="/"
            onClick={() => setMobileOpen(false)}
            className={cn(
              'flex items-center px-3 py-3 text-sm font-medium rounded transition-colors',
              isActive('/') ? 'text-white bg-white/[0.05]' : 'text-white/45 hover:text-white hover:bg-white/[0.03]'
            )}
          >
            Home
          </a>

          {/* Services accordion */}
          {SHOW_SERVICES && (
            <div>
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                aria-expanded={mobileServicesOpen}
                className={cn(
                  'flex items-center justify-between w-full px-3 py-3 text-sm font-medium rounded transition-colors',
                  isServicesActive ? 'text-white bg-white/[0.05]' : 'text-white/45 hover:text-white hover:bg-white/[0.03]'
                )}
              >
                Services
                <svg
                  className={cn('w-3.5 h-3.5 transition-transform duration-200', mobileServicesOpen ? 'rotate-180' : '')}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd"/>
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-white/[0.07] space-y-0.5">
                  {serviceItems.map((item, i) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 text-sm text-white/35 hover:text-white rounded transition-colors"
                    >
                      <span className="font-mono text-[10px] font-bold text-blue-500/50 w-5 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}

          {allNavLinks.slice(1).map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center px-3 py-3 text-sm font-medium rounded transition-colors',
                isActive(link.href) ? 'text-white bg-white/[0.05]' : 'text-white/45 hover:text-white hover:bg-white/[0.03]'
              )}
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-white/[0.06]">
            <a
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-full px-4 py-3 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
