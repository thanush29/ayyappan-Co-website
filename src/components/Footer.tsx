import { Separator } from '@/components/ui/separator'
import { MapPin, Phone, Envelope } from '@phosphor-icons/react'
import Logo from '@/assets/logo22.png'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { label: 'About Us', href: '#about' },
      { label: 'Our Projects', href: '#products' },
      { label: 'Services', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    capabilities: [
      { label: 'EHV Substations', href: '#products' },
      { label: 'Transmission Lines', href: '#products' },
      { label: 'T&C Services', href: '#services' },
      { label: 'O&M Support', href: '#services' },
    ],
    support: [
      { label: 'Quality & Safety', href: '#about' },
      { label: 'Technical Support', href: '#contact' },
      { label: 'Project Consultation', href: '#contact' },
      { label: 'Certifications', href: '#certifications' },
    ],
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-[#03045e] text-white py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-4">
                          <div className='flex flex-col items-center justify-center'>
                            <img
  src={Logo}
  alt="Logo"
  className="w-auto h-24 sm:h-28 lg:h-32 object-contain"
/>

            
                          </div>
                        </div>
             
            <p className="mb-4 text-sm leading-relaxed text-white/70">
              Trusted EHV substation and transmission line contractor. TNEB Class I certified. 
              Founded by <strong className="text-white">Late  S. Ayyappan</strong>
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm transition-colors text-white/60 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Capabilities</h4>
            <ul className="space-y-2">
              {footerLinks.capabilities.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm transition-colors text-white/60 hover:text-white"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h4 className="mb-4 font-semibold text-white">Certifications</h4>
            <ul className="space-y-2">
              <li className="text-sm text-white/60">TNEB Class I Contractor</li>
              <li className="text-sm text-white/60">ESA Grade License (ESA:530)</li>
              <li className="text-sm text-white/60">PWD High Ways Class A&B</li>
              <li className="text-sm text-white/60">ISO 9001:2015 Certified</li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8 bg-white/10" />

        {/* Contact Information Section */}
        <div className="mb-8">
          <h4 className="mb-6 text-lg font-semibold text-white">Contact Us</h4>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Phone & Email */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} weight="duotone" className="flex-shrink-0 text-white" />
                <a href="tel:04632242528" className="transition-colors text-white/80 hover:text-white">
                  04632-242528
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Envelope size={18} weight="duotone" className="flex-shrink-0 text-white" />
                <a href="mailto:info@ayyappanco.com " className="break-all transition-colors text-white/80 hover:text-white">
                  info@ayyappanco.com 
                </a>
              </div>
            </div>

            {/* Head Office */}
            <div className="flex items-start gap-3">
              <MapPin size={18} weight="duotone" className="text-white flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="mb-1 text-sm font-semibold text-white">Head Office</h5>
                <p className="text-sm leading-relaxed text-white/80">
                  No:5/107-D1, Meenakshi Nagar,<br />
                  A.Salaipudur, Kovilpatti - 628502
                </p>
              </div>
            </div>

            {/* Chennai Office */}
            <div className="flex items-start gap-3">
              <MapPin size={18} weight="duotone" className="text-white flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="mb-1 text-sm font-semibold text-white">Chennai Branch Office</h5>
                <p className="text-sm leading-relaxed text-white/80">
                  Old No.45, New No.95, Poes Main Road,<br />
                  Teynampet, Chennai - 600018
                </p>
              </div>
            </div>

            {/* Saudi Arabia Office */}
            <div className="flex items-start gap-3">
              <MapPin size={18} weight="duotone" className="text-white flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="mb-1 text-sm font-semibold text-white">Saudi Arabia Office</h5>
                <p className="text-sm leading-relaxed text-white/80">
                 Venus Energy, Noor Plaza  <br />
(3rd Floor), 2770 Custodian of  <br />Two Holy Mosques Rd,  <br />
Al Khobar 34448,  Saudi Arabia
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator className="mb-6 bg-white/10" />

        {/* Footer Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-white/50">
            © {currentYear} Ayyappan & Co All rights reserved.
          </p>
          <div className="flex gap-6">
            <button type="button" className="text-sm transition-colors text-white/50 hover:text-white">
              Privacy Policy
            </button>
            <button type="button" className="text-sm transition-colors text-white/50 hover:text-white">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
