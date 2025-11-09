import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <motion.img
              src="/logo.png"
              alt="Ayyappan & Co"
              className="h-16 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }}>
              <h1 className={`text-2xl font-bold ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>Ayyappan & Co</h1>
              <p className={`text-xs ${
                isScrolled ? 'text-gray-600' : 'text-gray-200'
              }`}>Engineering Excellence</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path} className="relative group">
                <span
                  className={`text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-[#0047FF]'
                      : isScrolled ? 'text-gray-700 hover:text-[#0047FF]' : 'text-white hover:text-gray-200'
                  }`}
                >
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0047FF] to-[#7A00FF]"
                  />
                )}
              </Link>
            ))}

            <Link
              to="/admin/login"
              className="text-sm font-semibold px-4 py-2 rounded-md bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white hover:opacity-90 transition-all"
            >
              Admin
            </Link>
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-[#0047FF]' : 'text-white hover:text-gray-200'
            }`}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-gradient-to-r from-[#0047FF]/10 to-[#7A00FF]/10 text-[#0047FF] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/admin/login"
                className="text-left px-4 py-3 rounded-lg text-[#0047FF] font-semibold bg-gradient-to-r from-[#0047FF]/10 to-[#7A00FF]/10"
              >
                Admin
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
