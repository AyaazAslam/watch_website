import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, User, ChevronRight } from 'lucide-react';
import { useAppSelector } from '../../store/hooks';
import { selectIsAuthenticated, selectAuthUser } from '../../store/slices/authSlice';
import { BRAND, mailtoHref, telHref } from '../../data/brand';

type NavLink = {
  name: string;
  path: string;
};

const NAV_LINKS: NavLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Explore All', path: '/collection' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const authUser = useAppSelector(selectAuthUser);
  
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const accountPath = isAuthenticated ? '/account' : '/login';

  // Track scroll state safely
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route/hash change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname, location.hash]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Keyboard accessibility
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Auto-focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  const isLinkActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    if (path.startsWith('/#')) {
      return location.pathname === '/' && location.hash === path.slice(1);
    }
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleHashNav = (path: string) => {
    setIsMobileMenuOpen(false);
    const id = path.replace('/#', '');
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = () => {
    closeMobileMenu();
    scrollToTop();
  };

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white select-none">
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`w-full transition-shadow duration-300 ${
          isScrolled || isMobileMenuOpen || isSearchOpen
            ? 'shadow-sm border-b border-stone-100 bg-white/95 backdrop-blur-md'
            : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3 sm:gap-4">
            
            {/* Left: Brand logo */}
            <div className="flex items-center justify-start shrink-0">
              <Link
                to="/"
                className="flex items-center transition-opacity hover:opacity-90"
                onClick={handleNavClick}
                aria-label={`${BRAND.name} — Home`}
              >
                <img
                  src="/img/logo.png"
                  alt={BRAND.name}
                  className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-9">
              {NAV_LINKS.map((link) => {
                const active = isLinkActive(link.path);
                const isHash = link.path.startsWith('/#');

                const linkClasses = `relative py-1 text-xs xl:text-[13px] uppercase tracking-[0.2em] font-semibold transition-colors duration-200 whitespace-nowrap group ${
                  active ? 'text-[#0D0B0A]' : 'text-stone-500 hover:text-[#0D0B0A]'
                }`;

                if (isHash) {
                  return (
                    <a
                      key={link.name}
                      href={link.path}
                      onClick={(e) => {
                        if (location.pathname === '/') {
                          e.preventDefault();
                          handleHashNav(link.path);
                        }
                      }}
                      className={linkClasses}
                    >
                      {link.name}
                      {active ? (
                        <motion.span
                          layoutId="navActive"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AC7A37] rounded-full"
                        />
                      ) : (
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AC7A37] rounded-full transition-all duration-300 group-hover:w-full" />
                      )}
                    </a>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={handleNavClick}
                    className={linkClasses}
                  >
                    {link.name}
                    {active ? (
                      <motion.span
                        layoutId="navActive"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#AC7A37] rounded-full"
                      />
                    ) : (
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#AC7A37] rounded-full transition-all duration-300 group-hover:w-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Quick Action Controls */}
            <div className="flex items-center justify-end gap-1 text-[#0D0B0A]">
              <button
                type="button"
                aria-label="Search"
                aria-expanded={isSearchOpen}
                onClick={() => {
                  setIsSearchOpen((o) => !o);
                  setIsMobileMenuOpen(false);
                }}
                className="inline-flex items-center justify-center size-9 sm:size-10 rounded-full text-stone-700 hover:bg-stone-100 hover:text-[#AC7A37] transition-colors"
              >
                <Search size={18} strokeWidth={1.75} />
              </button>

              <Link
                to={accountPath}
                onClick={scrollToTop}
                aria-label={isAuthenticated ? 'My account' : 'Login'}
                title={isAuthenticated ? authUser?.name || 'Account' : 'Login'}
                className="hidden sm:inline-flex items-center justify-center size-10 rounded-full text-stone-700 hover:bg-stone-100 hover:text-[#AC7A37] transition-colors"
              >
                <User size={18} strokeWidth={1.75} />
              </Link>

              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen((o) => !o);
                  setIsSearchOpen(false);
                }}
                className="lg:hidden inline-flex items-center justify-center size-9 sm:size-10 text-[#0D0B0A] hover:bg-stone-100 hover:text-[#AC7A37] rounded-full transition-colors"
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-nav-drawer"
              >
                {isMobileMenuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
              </button>
            </div>

          </div>
        </div>

        {/* Dropdown Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-stone-100 bg-white/95 backdrop-blur-md"
            >
              <form
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3"
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsSearchOpen(false);
                }}
              >
                <Search size={18} className="text-stone-400 shrink-0" strokeWidth={1.75} />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search luxury timepieces, collections…"
                  className="flex-1 min-w-0 bg-transparent text-sm text-[#0D0B0A] placeholder:text-stone-400 outline-none py-1"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 hover:text-[#AC7A37] px-2 py-1"
                >
                  Cancel
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Sliding Navigation Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 top-16 sm:top-20 bg-black/40 backdrop-blur-xs"
              onClick={closeMobileMenu}
            />

            {/* Slide-out Panel */}
            <motion.aside
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden fixed left-0 top-16 sm:top-20 bottom-0 z-50 w-[min(85vw,20rem)] bg-white shadow-2xl flex flex-col border-r border-stone-100"
            >
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <nav className="flex flex-col space-y-1">
                  {NAV_LINKS.map((link, i) => {
                    const active = isLinkActive(link.path);
                    const isHash = link.path.startsWith('/#');
                    const itemClass = `group flex items-center justify-between px-3.5 py-3 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold transition-colors ${
                      active
                        ? 'bg-stone-100 text-[#0D0B0A]'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-[#0D0B0A]'
                    }`;

                    if (isHash) {
                      return (
                        <motion.a
                          key={link.name}
                          href={link.path}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.03 * i, duration: 0.2 }}
                          onClick={(e) => {
                            if (location.pathname === '/') {
                              e.preventDefault();
                              handleHashNav(link.path);
                            } else {
                              closeMobileMenu();
                            }
                          }}
                          className={itemClass}
                        >
                          <span>{link.name}</span>
                          <ChevronRight size={15} className="text-stone-400 group-hover:text-[#AC7A37]" />
                        </motion.a>
                      );
                    }

                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.03 * i, duration: 0.2 }}
                      >
                        <Link to={link.path} onClick={handleNavClick} className={itemClass}>
                          <span>{link.name}</span>
                          <ChevronRight size={15} className="text-stone-400 group-hover:text-[#AC7A37]" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-4 border-t border-stone-100 space-y-1">
                  <Link
                    to={accountPath}
                    onClick={handleNavClick}
                    className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs uppercase tracking-[0.18em] font-semibold text-stone-600 hover:bg-stone-50 hover:text-[#AC7A37] transition-colors"
                  >
                    <User size={16} strokeWidth={1.75} />
                    {isAuthenticated ? 'My Account' : 'Login / Signup'}
                  </Link>
                </div>
              </div>

              {/* Bottom Support Section */}
              <div className="border-t border-stone-100 p-4 bg-stone-50/60 space-y-1">
                <p className="text-[10px] uppercase tracking-[0.18em] text-stone-400 font-bold mb-1">
                  Customer Care
                </p>
                <a
                  href={mailtoHref()}
                  className="block text-xs text-[#0D0B0A] font-medium hover:text-[#AC7A37] transition-colors break-all"
                >
                  {BRAND.email}
                </a>
                <a
                  href={telHref()}
                  className="block text-xs text-[#0D0B0A] font-medium hover:text-[#AC7A37] transition-colors"
                >
                  {BRAND.phoneDisplay}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
    {/* Offset page content under the fixed bar */}
    <div className="h-16 sm:h-20" aria-hidden />
    </>
  );
}

export default Navbar;