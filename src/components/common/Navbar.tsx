import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collection', path: '/#collection' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#181818]/85 backdrop-blur-md py-3.5 border-b border-[#D6B16A]/15 shadow-2xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-2 text-2xl font-bold tracking-[0.2em] text-white uppercase transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="font-serif">Chrono</span>
            <span className="text-[#D6B16A] transition-colors duration-300 group-hover:text-[#e4c483]">
              Craft
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const isHashLink = link.path.startsWith('/#');

              return isHashLink ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="relative text-xs uppercase tracking-[0.2em] font-medium text-gray-300 hover:text-[#D6B16A] transition-colors duration-300 py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D6B16A] transition-all duration-300 group-hover:w-full" />
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 py-1 group ${
                    isActive ? 'text-[#D6B16A]' : 'text-gray-300 hover:text-[#D6B16A]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-[#D6B16A] transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-5">
            <button
              aria-label="Search"
              className="hidden sm:block text-gray-300 hover:text-[#D6B16A] transition-colors duration-300"
            >
              <Search size={18} />
            </button>

            <button
              aria-label="Cart"
              className="relative text-gray-300 hover:text-[#D6B16A] transition-colors duration-300"
            >
              <ShoppingBag size={18} />
              <span className="absolute -top-1.5 -right-2 bg-[#D6B16A] text-[#181818] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Premium CTA Button */}
            <Link
              to="/#collection"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#181818] bg-gradient-to-r from-[#D6B16A] to-[#B89248] rounded-full hover:from-[#e4c483] hover:to-[#cfa95f] transition-all duration-300 shadow-md hover:shadow-[#D6B16A]/20 hover:scale-105 active:scale-95"
            >
              Explore
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-300 hover:text-[#D6B16A] focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#181818]/95 backdrop-blur-xl border-b border-[#D6B16A]/20 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-8 space-y-4 flex flex-col items-center text-center">
              {navLinks.map((link) => {
                const isHashLink = link.path.startsWith('/#');

                return isHashLink ? (
                  <a
                    key={link.name}
                    href={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] font-medium text-gray-200 hover:text-[#D6B16A] transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-[0.2em] font-medium text-gray-200 hover:text-[#D6B16A] transition-colors py-2"
                  >
                    {link.name}
                  </Link>
                );
              })}

              <Link
                to="/#collection"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-xs mt-2 px-6 py-2.5 text-xs uppercase tracking-[0.15em] font-semibold text-[#181818] bg-[#D6B16A] rounded-full shadow-lg text-center"
              >
                Explore Collection
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;