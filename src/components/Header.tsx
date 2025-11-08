import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

export function Header() {
  const { currentPage, setCurrentPage, isMenuOpen, setIsMenuOpen } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page as typeof currentPage);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0047FF] via-[#7A00FF] to-[#00C853] flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Ayyappan & Co</h1>
              <p className="text-xs text-gray-600">Engineering Excellence</p>
            </div>
          </motion.div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative group"
              >
                <span
                  className={`text-base font-medium transition-colors ${
                    currentPage === item.id ? 'text-[#0047FF]' : 'text-gray-700 hover:text-[#0047FF]'
                  }`}
                >
                  {item.label}
                </span>
                {currentPage === item.id && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0047FF] to-[#7A00FF]"
                  />
                )}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-[#0047FF] transition-colors"
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
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-[#0047FF]/10 to-[#7A00FF]/10 text-[#0047FF] font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
