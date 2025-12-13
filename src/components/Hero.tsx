import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { ArrowRight, Lightning, BuildingsIcon, BroadcastIcon, GearIcon, WrenchIcon } from '@phosphor-icons/react'
import founderImage from '@/assets/founder.png'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure all elements are visible first
      gsap.set([badgeRef.current, contentRef.current, statsRef.current], { opacity: 1 })
      if (contentRef.current?.children) gsap.set(contentRef.current.children, { opacity: 1 })
      if (statsRef.current?.children) gsap.set(statsRef.current.children, { opacity: 1 })
      if (servicesRef.current?.children) gsap.set(servicesRef.current.children, { opacity: 1 })

      const tl = gsap.timeline()
      
      tl.from(badgeRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out',
      })
      .from(contentRef.current?.children || [], {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.3')
      .from(statsRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.3')
      
      // Animate service cards
      if (servicesRef.current?.children) {
        gsap.from(servicesRef.current.children, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.8,
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Services are now rendered directly in JSX with solid backgrounds

  return (
    <section id="home" className="relative pt-20 overflow-hidden bg-white/70">
      {/* Accent shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1C6EA4]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1C6EA4]/10 rounded-full blur-3xl"></div>
      
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div className="pt-16 pb-12 lg:pt-20 lg:pb-16">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div ref={badgeRef}>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#03045e]  text-white font-semibold rounded-full text-sm border border-[#1C6EA4]/20">
                  <Lightning size={16} weight="fill" />
                  Engineering India's Power Infrastructure Since 2009
                </span>
              </div>
              
              {/* Main content */}
              <div ref={contentRef} className="space-y-4 sm:space-y-6">
                <h1 className="font-bold text-3xl sm:text-4xl lg:text-[3.5rem] leading-[1.15] tracking-tight text-[#154D71]">
                  {' '}
                EHV  Transmission Line &
                  <br />
                  <span className="text-[#03045e]"> Substation </span>{' '}
                  Specialists
                </h1>
                
                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl">
                  Ayyappan & Co your trusted partner for complete EPC solutions 
                  including Design, Engineering, Procurement, Construction, Testing & Commissioning 
                  of EHV substations and transmission lines. Founded by 
                  <strong className="text-[#03045e]"> S.Ayyappan</strong>, TNEB Class I certified contractor 
                  with ESA Grade License (ESA:530).
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                  <Button
                    size="lg"
                    className="bg-white hover:bg-white text-[#03045e]  shadow-lg shadow-[#1C6EA4]/25 hover:shadow-xl hover:shadow-[#1C6EA4]/30 transition-all h-12 px-8 text-base font-semibold"
                    onClick={() => scrollToSection('services')}
                  >
                    Our Services
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => scrollToSection('contact')}
                                       className="bg-[#03045e] hover:bg-[#2563EB] text-white shadow-lg shadow-[#1C6EA4]/25 hover:shadow-xl hover:shadow-[#1C6EA4]/30 transition-all h-12 px-8 text-base font-semibold"

                  >
                    Contact Us
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#E2E8F0]">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#03045e] ">14+</div>
                  <div className="text-xs sm:text-sm text-[#64748B]">Years of EPC Excellence</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#03045e] ">1500+</div>
                  <div className="text-xs sm:text-sm text-[#64748B]">km Lines Executed</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#03045e] ">150+</div>
                  <div className="text-xs sm:text-sm text-[#64748B]">Substations Commissioned</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-bold text-[#03045e] ">600MW</div>
                  <div className="text-xs sm:text-sm text-[#64748B]">Solar O&M Assets</div>
                </div>
              </div>
            </div>

            {/* Right Side - Service Cards */}
            <div className="hidden lg:block">
              <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-4 bg-[#1C6EA4]/10 rounded-3xl blur-2xl"></div>
              
              {/* Founder Image */}
              <div className="relative flex flex-col items-center justify-center gap-2 mb-4">
                <img 
                src={founderImage} 
                alt="Founder" 
                className="object-cover object-top w-56 h-56 rounded-full"
                />
            <h2 className="text-2xl sm:text-2xl font-bold text-[#03045e] leading-tight">
           S.Ayyappan (late)
Founder | Chairman
            </h2>
              </div>
              
              {/* Card container */}
              <div className="relative bg-white/70 rounded-2xl shadow-xl border border-[#E2E8F0] p-6">
                {/* Header */}
                <div className="mb-6 text-center">
                <h3 className="text-lg font-bold text-[#154D71] mb-1">Our Core Services</h3>
                <p className="text-sm text-[#64748B]">Complete EPC solutions for power infrastructure</p>
                </div>
                
                {/* Service Grid */}
                <div ref={servicesRef} className="grid grid-cols-2 gap-3" style={{ opacity: 1 }}>
                <div className="group p-4 rounded-xl bg-[#03045e] hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center justify-center transition-transform rounded-lg w-11 h-11 bg-white/10 group-hover:scale-110">
                    <BuildingsIcon size={22} className="text-white" weight="duotone" />
                  </div>
                  <span className="text-sm font-semibold text-white">EHV Substations</span>
                  <span className="text-xs text-white/70">66kV - 400kV</span>
                  </div>
                </div>
                <div className="group p-4 rounded-xl bg-[#03045e]  hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center justify-center transition-transform rounded-lg w-11 h-11 bg-white/10 group-hover:scale-110">
                    <BroadcastIcon size={22} className="text-white" weight="duotone" />
                  </div>
                    <span className="text-sm font-semibold text-white">T&D Lines</span>
                    <span className="text-xs text-white/70">Up to 400kV</span>
                  </div>
                </div>
                <div className="group p-4 rounded-xl  bg-[#03045e]  hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center justify-center transition-transform rounded-lg w-11 h-11 bg-white/10 group-hover:scale-110">
                    <GearIcon size={22} className="text-white" weight="duotone" />
                  </div>
                  <span className="text-sm font-semibold text-white">T&C Services</span>
                  <span className="text-xs text-white/70">Complete Testing</span>
                  </div>
                </div>
                <div className="group p-4 rounded-xl bg-[#03045e]  hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex items-center justify-center transition-transform rounded-lg w-11 h-11 bg-white/10 group-hover:scale-110">
                    <WrenchIcon size={22} className="text-white" weight="duotone" />
                  </div>
                  <span className="text-sm font-semibold text-white">O&M Support</span>
                  <span className="text-xs text-white/70">24/7 Available</span>
                  </div>
                </div>
                </div>

                {/* Bottom highlight */}
                <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  <span className="text-[#64748B]">ISO 9001:2015 Certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#1C6EA4]"></div>
                  <span className="text-[#64748B]">TNEB Approved</span>
                  </div>
                </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
