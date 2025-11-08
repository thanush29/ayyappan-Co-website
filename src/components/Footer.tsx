import { Mail, Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, Zap, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

export default function Footer() {
  const { setCurrentPage } = useStore();

  const handleNavClick = (page: string) => {
    setCurrentPage(page as 'home' | 'about' | 'services' | 'projects' | 'contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', action: () => handleNavClick('home') },
        { label: 'About Us', action: () => handleNavClick('about') },
        { label: 'Services', action: () => handleNavClick('services') },
        { label: 'Projects', action: () => handleNavClick('projects') },
        { label: 'Contact', action: () => handleNavClick('contact') },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Transmission Line Projects', action: () => handleNavClick('services') },
        { label: 'Distribution Network', action: () => handleNavClick('services') },
        { label: 'Substation Construction', action: () => handleNavClick('services') },
      ],
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: '#0A66C2' },
    { icon: Facebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: Twitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: Instagram, href: '#', label: 'Instagram', color: '#E4405F' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0047FF] via-[#7A00FF] to-[#00C853] flex items-center justify-center">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Ayyappan & Co</h3>
                <p className="text-xs text-gray-400">Engineering Excellence</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Engineering India's power infrastructure with 14+ years of experience and 100+ successful projects.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] rounded-lg text-sm font-medium hover:shadow-lg transition-shadow"
            >
              <Download size={16} />
              Download Brochure
            </motion.button>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#00C853] mt-1 flex-shrink-0" />
                <p className="text-gray-400 text-sm">
                  123 Engineering Lane,<br />
                  Industrial Area,<br />
                  City, State - 123456
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#00C853] flex-shrink-0" />
                <a href="tel:+91XXXXXXXXXX" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +91-XXXXXXXXXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#00C853] flex-shrink-0" />
                <a href="mailto:info@ayyappanco.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@ayyappanco.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Ayyappan & Co. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gradient-to-br hover:from-[#0047FF] hover:to-[#7A00FF] flex items-center justify-center transition-all"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
