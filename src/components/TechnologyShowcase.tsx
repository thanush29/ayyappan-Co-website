import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CaretLeft, CaretRight, Cpu, Lightning, ShieldStar, Power, Gauge, Broadcast } from '@phosphor-icons/react'

// Import local images
import transformerImage from '@/assets/transformer.jpg'
import heroBgImage from '@/assets/hero-bg.jpg'
import teamImage from '@/assets/team.jpg'
import gridImage from '@/assets/grid.jpg'
import installationImage from '@/assets/installation.jpg'
import officeImage from '@/assets/office.jpg'

gsap.registerPlugin(ScrollTrigger)

export function TechnologyShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const technologies = [
    {
      icon: Lightning,
      title: 'Gas Insulated Switchgear (GIS)',
      category: 'High Voltage Equipment',
      description: 'Advanced GIS technology for compact and reliable EHV substation installations. Suitable for space-constrained urban areas with minimal environmental footprint.',
      features: [
        'Compact footprint - 10% of AIS',
        'Maintenance-free operation',
        'Enhanced safety & reliability',
        'Indoor/outdoor installation',
      ],
      voltageRange: '66kV to 400kV',
      applications: 'Urban substations, Industrial power systems',
      image: transformerImage,
      color: 'bg-[#03045e]',
    },
    {
      icon: Power,
      title: 'Air Insulated Switchgear (AIS)',
      category: 'Conventional Equipment',
      description: 'Proven AIS technology for large-scale EHV substations with excellent reliability and ease of maintenance. Cost-effective solution for outdoor installations.',
      features: [
        'Proven technology & reliability',
        'Easy maintenance access',
        'Cost-effective solution',
        'Modular expansion capability',
      ],
      voltageRange: '66kV to 400kV',
      applications: 'Transmission substations, Power plants',
      image: heroBgImage,
      color: 'bg-[#03045e]',
    },
    {
      icon: Broadcast,
      title: 'Power Transformers',
      category: 'Transformation Equipment',
      description: 'High-efficiency power transformers with advanced cooling systems and protection mechanisms. Designed for continuous operation under varying load conditions.',
      features: [
        'Oil-filled & dry-type options',
        'Online condition monitoring',
        'Low noise & losses',
        'Seismic resistant design',
      ],
      voltageRange: '66kV to 400kV',
      applications: 'Substations, Distribution networks',
      image: teamImage,
      color: 'bg-[#03045e]',
    },
    {
      icon: ShieldStar,
      title: 'Protection & Control Systems',
      category: 'Digital Technology',
      description: 'State-of-the-art numerical protection relays and SCADA systems for comprehensive monitoring and control of substation equipment and operations.',
      features: [
        'Numerical protection relays',
        'SCADA integration',
        'Real-time monitoring',
        'Remote diagnostics',
      ],
      voltageRange: 'All Voltage Levels',
      applications: 'Substations, Control centers',
      image: gridImage,
      color: 'bg-[#03045e]',
    },
    {
      icon: Cpu,
      title: 'Substation Automation',
      category: 'Smart Grid Technology',
      description: 'Advanced automation systems enabling unmanned substation operation with centralized monitoring and control. IEC 61850 compliant communication architecture.',
      features: [
        'IEC 61850 protocol',
        'Unmanned operation',
        'Centralized monitoring',
        'Predictive maintenance',
      ],
      voltageRange: 'All Voltage Levels',
      applications: 'Smart substations, Grid modernization',
      image: installationImage,
      color: 'bg-[#03045e]',
    },
    {
      icon: Gauge,
      title: 'Testing & Measurement',
      category: 'Quality Assurance',
      description: 'Comprehensive testing equipment and procedures for commissioning and periodic testing of EHV equipment. Ensuring compliance with international standards.',
      features: [
        'High voltage testing',
        'Relay calibration',
        'Transformer diagnostics',
        'Cable fault location',
      ],
      voltageRange: 'Up to 400kV',
      applications: 'T&C services, Maintenance',
      image: officeImage,
      color: 'bg-[#03045e]',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure element is visible first
      gsap.set(titleRef.current, { opacity: 1 })

      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, technologies.length])

  useEffect(() => {
    if (carouselRef.current) {
      gsap.fromTo(
        carouselRef.current,
        { 
          opacity: 0, 
          x: 50,
          scale: 0.95,
        },
        { 
          opacity: 1, 
          x: 0,
          scale: 1,
          duration: 0.7, 
          ease: 'power3.out',
        }
      )
    }
  }, [currentIndex])

  const nextSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev + 1) % technologies.length)
  }

  const prevSlide = () => {
    setIsAutoPlaying(false)
    setCurrentIndex((prev) => (prev - 1 + technologies.length) % technologies.length)
  }

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  const currentTech = technologies[currentIndex]

  return (
    <section id="technology" className="py-16 lg:py-20 bg-[#F8FAFC]/60 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 text-center">
                    <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#33A1E0]/25">
Technology & Equipment</span>
        
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
                        Advanced Power
 <span className="text-[#03045e] ml-2">
         Infrastructure Solutions
            </span>
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl mx-auto">
            We deploy cutting-edge equipment and technologies from leading global manufacturers, 
            ensuring reliable and efficient power infrastructure installations.
          </p>
        </div>

        <div className="grid items-center gap-10 mb-10 lg:grid-cols-2">
          <div ref={carouselRef} key={currentIndex}>
            <Card className="overflow-hidden border-0 shadow-2xl bg-white/70 rounded-2xl">
              <div className={`relative h-64 ${currentTech.color}`}>
                <div className="absolute inset-0 opacity-40">
                  <img
                    src={currentTech.image}
                    alt={currentTech.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 text-xs font-bold text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                    {currentTech.category}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center justify-center w-20 h-20 shadow-2xl rounded-2xl bg-white/70 backdrop-blur-sm">
                    <currentTech.icon size={40} className="text-[#03045e]" weight="duotone" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">{currentTech.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#64748B] leading-relaxed mb-4 text-sm">
                  {currentTech.description}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#F8FAFC]/60 rounded-lg p-3 border border-[#E2E8F0]">
                    <div className="text-xs text-[#64748B] mb-1">Voltage Range</div>
                    <div className="font-semibold text-sm text-[#03045e]">{currentTech.voltageRange}</div>
                  </div>
                  <div className="bg-[#F8FAFC]/60 rounded-lg p-3 border border-[#E2E8F0]">
                    <div className="text-xs text-[#64748B] mb-1">Applications</div>
                    <div className="font-semibold text-sm text-[#03045e]">{currentTech.applications}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-[#03045e] mb-2">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {currentTech.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#03045e] flex-shrink-0"></div>
                        <span className="text-sm text-[#03045e]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-between mt-5">
              <div className="flex gap-2">
                {technologies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-8 bg-[#03045e]' 
                        : 'w-2 bg-[#E2E8F0] hover:bg-[#03045e]/50'
                    }`}
                    aria-label={`View technology ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  className="rounded-full border-[#E2E8F0] hover:bg-[#F8FAFC]/60"
                >
                  <CaretLeft size={20} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  className="rounded-full border-[#E2E8F0] hover:bg-[#F8FAFC]/60"
                >
                  <CaretRight size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div className="hidden space-y-5 lg:block">
            <div>
              <h3 className="text-xl font-semibold text-[#03045e] mb-3">Equipment Expertise</h3>
              <p className="text-[#64748B] leading-relaxed mb-5 text-sm">
                Ayyappan & Co has extensive experience in handling and installing diverse 
                power infrastructure equipment across all voltage levels. Our technical team is 
                proficient in the latest technologies and international standards.
              </p>
            </div>

            <div className="grid gap-3">
              {technologies.map((tech, index) => (
                <Card
                  key={tech.title}
                  className={`p-3 cursor-pointer transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-[#03045e]/5 border-[#03045e] shadow-md'
                      : 'border-[#E2E8F0] hover:bg-[#F8FAFC]/60 hover:border-[#03045e]/30'
                  }`}
                  onClick={() => goToSlide(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                      index === currentIndex
                        ? 'bg-[#03045e] text-white'
                        : 'bg-[#03045e]/10 text-[#03045e]'
                    }`}>
                      <tech.icon size={20} weight="duotone" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-[#03045e] mb-0.5">{tech.title}</h4>
                      <p className="text-xs text-[#64748B]">{tech.category}</p>
                    </div>
                    {index === currentIndex && (
                      <div className="w-2 h-2 rounded-full bg-[#03045e] animate-pulse"></div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Card className="p-4 sm:p-6 lg:p-10 bg-[#F8FAFC]/60 border border-[#E2E8F0]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#03045e]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Lightning size={24} className="text-[#03045e] sm:hidden" weight="duotone" />
                <Lightning size={28} className="text-[#03045e] hidden sm:block" weight="duotone" />
              </div>
              <h4 className="font-semibold text-[#03045e] mb-1 text-sm sm:text-base">OEM Partnerships</h4>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Authorized partners with leading global equipment manufacturers
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#03045e]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <ShieldStar size={24} className="text-[#03045e] sm:hidden" weight="duotone" />
                <ShieldStar size={28} className="text-[#03045e] hidden sm:block" weight="duotone" />
              </div>
              <h4 className="font-semibold text-[#03045e] mb-1 text-sm sm:text-base">Quality Assurance</h4>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Stringent quality checks and factory acceptance testing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#03045e]/10 flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <Gauge size={24} className="text-[#03045e] sm:hidden" weight="duotone" />
                <Gauge size={28} className="text-[#03045e] hidden sm:block" weight="duotone" />
              </div>
              <h4 className="font-semibold text-[#03045e] mb-1 text-sm sm:text-base">Performance Testing</h4>
              <p className="text-xs sm:text-sm text-[#64748B]">
                Comprehensive site and commissioning tests as per standards
              </p>
            </div>
          </div>
        </Card>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: none;
        }
      `}</style>
    </section>
  )
}
