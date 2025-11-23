import { Phone, MapPin, Linkedin, Facebook, Twitter, Instagram, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2011; // Founded in 2011

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About Us', href: '/about' },
        { label: 'Services', href: '/services' },
        { label: 'Projects', href: '/projects' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'Transmission Line Projects', href: '/services/e8d54a64-703e-4536-a17f-245c36ec7696' },
        { label: 'Distribution Network', href: '/services/0b6f7133-7680-486e-975a-2c1a53883de2' },
        { label: 'Substation Construction', href: '/services/a4e24f88-dcd2-426c-8b15-8c4cb201b97c' },
      ],
    },
  ];

  const offices = [
    {
      title: 'Head Office',
      address: 'No:5/107-D1, Meenakshi Nagar, 4th Street, A.Salaipudur, Kovilpatti, Tamilnadu 628502, India',
      phone: '04632-242528',
      country: 'India',
    },
    {
      title: 'Chennai Branch Office',
      address: 'Old No.45, New No. 95, Ground Floor, Poes Main Road, Teynampet, Chennai - 600 018',
      phone: '+91 99620 56262',
      country: 'India',
    },
    {
      title: 'Saudi Office',
      address: 'Venus Energy Noor Plaza, 3rd Floor, 2770, Custodian of Two Holy Mosques Rd, Al Khobar – 34448, Saudi Arabia',
      phone: null,
      country: 'Saudi Arabia',
    },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          {/* Company Info - Takes 3 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="space-y-6">
              {/* Ayyappan & Co Logo */}
              <div className="flex items-center gap-3">
                <img 
                  src="/logo1.jpg" 
                  alt="Ayyappan & Co Logo" 
                  className="w-14 h-14 rounded-xl object-cover shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Ayyappan</span>
                    <span className="text-green-400"> & Co</span>
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">Engineering Excellence</p>
                </div>
              </div>

              {/* Venus Energy Logo */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
                <img 
                  src="/venus.png" 
                  alt="Venus Energy Logo" 
                  className="w-14 h-14 rounded-xl object-cover shadow-lg bg-white/5 p-1"
                />
                <div>
                  <h3 className="text-xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text">
                    Venus Energy
                  </h3>
                  <p className="text-xs text-gray-400 font-medium">Saudi Arabia</p>
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Engineering India's power infrastructure with {yearsOfExperience}+ years of experience and 100+ successful projects.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-11 h-11 rounded-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 border border-gray-700/50 hover:border-transparent shadow-lg"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links - Takes 2 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {footerLinks[0].links.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services - Takes 2 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <ul className="space-y-3">
              {footerLinks[1].links.map((link, index) => (
                <motion.li 
                  key={link.label}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white transition-colors text-sm group flex items-center gap-2"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"></span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Offices - Takes 5 columns */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5"
          >
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Our Offices
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={office.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={16} className="text-blue-400" />
                    <h5 className="text-sm font-semibold text-blue-400">{office.title}</h5>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-400 text-xs leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                    {office.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-green-400 flex-shrink-0" />
                        <a 
                          href={`tel:${office.phone.replace(/\s/g, '')}`} 
                          className="text-gray-400 hover:text-white text-xs transition-colors"
                        >
                          {office.phone}
                        </a>
                      </div>
                    )}
                    <div className="pt-2 border-t border-gray-700/50">
                      <span className="text-xs text-gray-500 font-medium">{office.country}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 text-sm">
            <p className="text-gray-400">
              Copyright © {currentYear}{' '}
              <a 
                href="https://ayyappanco.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold transition-all duration-300 hover:opacity-80"
              >
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">Ayyappan</span>
                <span className="text-green-400"> & Co</span>
              </a>
              {' '}| All rights reserved.
            </p>
            <span className="hidden md:inline text-gray-600">•</span>
            <p className="text-gray-400">
              Designed by{' '}
              <a 
                href="https://thanush29-ai.web.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text hover:from-blue-300 hover:to-purple-300 font-semibold transition-all duration-300"
              >
                Thanush
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}