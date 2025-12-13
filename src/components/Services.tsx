import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Cube, Gear, Wrench, Flask, TrendUp, Headset, FileText, ShieldCheck, Sun } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export function Services() {
  const services = [
    {
      icon: Cube,
      title: 'Substation Construction Works',
      description: 'Turnkey execution of EHV substations including civil and electrical works.',
      features: ['Air Insulated Substations', 'Gas Insulated Substations', 'Control Rooms', 'Switchyards'],
      color: 'bg-[#03045e]',
    },
    {
      icon: Gear,
      title: 'Structure Erection Works',
      description: 'Erection of steel structures for transmission lines and substation gantries.',
      features: ['Tower erection', 'Gantry structures', 'Equipment support', 'Structural alignment'],
      color: 'bg-[#03045e]',
    },
    {
      icon: Wrench,
      title: 'Substation Civil & Foundation Works',
      description: 'Specialized civil works including equipment foundations, control buildings, and cable trenches.',
      features: ['Transformer plinths', 'Equipment foundations', 'Cable trenches', 'Control buildings'],
      color: 'bg-[#03045e]',
    },
    {
      icon: TrendUp,
      title: 'Transmission Line Towers Erection',
      description: 'Complete transmission line construction including tower erection and stringing works.',
      features: ['Tower footing', 'Erection', 'Stringing', 'Sagging'],
      color: 'bg-[#03045e]',
    },
    {
      icon: Flask,
      title: 'HT & LT Cable Laying Works',
      description: 'Underground cable laying, jointing, and termination for HT and LT networks.',
      features: ['Cable trenching', 'Cable laying', 'Jointing kits', 'Termination'],
      color: 'bg-[#03045e]',
    },
    {
      icon: Headset,
      title: 'Testing & Commissioning',
      description: 'Pre-commissioning tests for substations, transformers, and protection systems.',
      features: ['Relay testing', 'Transformer testing', 'Switchgear testing', 'System charging'],
      color: 'bg-[#03045e]',
    },
    {
      icon: FileText,
      title: 'Liaisoning Works (CEIG/TANGEDCO)',
      description: 'Statutory approvals and clearances from CEIG and TANGEDCO.',
      features: ['Safety certificates', 'Drawings approval', 'Charging clearance', 'Regulatory compliance'],
      color: 'bg-[#03045e]',
    },
    {
      icon: ShieldCheck,
      title: 'Operation & Maintenance Works',
      description: 'Comprehensive O&M services for substations and transmission assets.',
      features: ['Preventive maintenance', 'Breakdown services', '24/7 monitoring', 'Asset management'],
      color: 'bg-[#03045e]',
    },
    {
      icon: Sun,
      title: 'Solar Power Plant Works',
      description: 'EPC services for solar power evacuation and grid interconnection.',
      features: ['Pooling substations', 'Inverter duty transformers', 'Grid synchronization', 'Evacuation lines'],
      color: 'bg-[#03045e]',
    },
  ]

  const titleRef = useRef<HTMLDivElement>(null)
  const bottomCardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 1 })
      if (bottomCardsRef.current?.children) gsap.set(bottomCardsRef.current.children, { opacity: 1 })

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

      if (bottomCardsRef.current?.children) {
        gsap.from(bottomCardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: bottomCardsRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.set(cardRef.current, { opacity: 1 })

        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 90%',
          },
        })
      })

      return () => ctx.revert()
    }, [index])

    return (
      <div ref={cardRef}>
        <Card className={`relative overflow-hidden p-0 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 ${service.color} group`}>
          <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -translate-x-1/2 translate-y-1/2 rounded-full bg-white/5"></div>
          <div className="relative z-10 p-6">
            <div className="flex items-center justify-center w-16 h-16 mb-4 transition-transform duration-300 rounded-xl bg-white/15 group-hover:scale-110">
              <service.icon size={32} className="text-white" weight="duotone" />
            </div>
            <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
            <p className="mb-4 text-base leading-relaxed text-white/85">{service.description}</p>
            <div className="pt-4 space-y-2 border-t border-white/20">
              {service.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-white/80"></div>
                  <span className="text-sm text-white/85">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <section id="services" className="relative py-16 overflow-hidden lg:py-20 bg-white/70">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#03045e]/25">
            Our Services
          </span>
   
          
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
              Comprehensive Power
   <span className="text-[#03045e] ml-2">
                               Infrastructure Solutions


        </span>
        </h2>
          <p className="text-base text-[#64748B] max-w-3xl mx-auto">
            From initial design to final commissioning and ongoing maintenance, we provide complete turnkey 
            solutions for EHV substations and transmission line projects.
          </p>
        </div>

        <div className="grid gap-5 mb-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <div ref={bottomCardsRef} className="grid gap-8 md:grid-cols-2">
          <Card className="p-10 bg-white/70 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold mb-6 text-[#03045e]">Why Choose Ayappan & Co?</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#03045e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-base font-bold text-white">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-[#03045e] text-lg">TNEB Class I Certified</div>
                  <div className="text-base text-[#64748B]">State Power Utility certified contractor for EHV works</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#03045e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-base font-bold text-white">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-[#03045e] text-lg">ESA Grade License Holder</div>
                  <div className="text-base text-[#64748B]">ESA:530 license by Electrical Licensing Board of Tamil Nadu</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#03045e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-base font-bold text-white">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-[#03045e] text-lg">300+ Skilled Professionals</div>
                  <div className="text-base text-[#64748B]">Dedicated in-house team for all project aspects</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#03045e] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-base font-bold text-white">✓</span>
                </div>
                <div>
                  <div className="font-semibold text-[#03045e] text-lg">Strong Supplier Network</div>
                  <div className="text-base text-[#64748B]">Ensuring timely material supply and cost efficiency</div>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-10 bg-white/70 border border-[#E2E8F0] hover:shadow-lg transition-all">
            <h3 className="text-2xl font-bold mb-6 text-[#03045e]">Sectors We Serve</h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                'Power Utilities',
                'Independent Power Producers',
                'State Electricity Boards',
                'Renewable Energy Projects',
                'Industrial Power Systems',
                'Smart Grid Projects',
                'Distribution Networks',
                'Transmission Infrastructure',
              ].map((sector) => (
                <div key={sector} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#03045e]"></div>
                  <span className="text-lg text-[#03045e]">{sector}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

