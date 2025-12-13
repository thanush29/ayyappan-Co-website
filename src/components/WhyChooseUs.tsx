import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { ShieldCheck, Clock, Users, Trophy, Handshake, Target } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export function WhyChooseUs() {
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  const reasons = [
    {
      icon: Trophy,
      title: '14+ Years Excellence',
      description: 'Proven track record in EHV substation and transmission line projects since 2009',
      color: 'bg-[#03045e]',
    },
    {
      icon: ShieldCheck,
      title: 'TNEB Class I Certified',
      description: 'Government approved contractor with ESA Grade License (ESA:530)',
      color: 'bg-[#03045e]',
    },
    {
      icon: Users,
      title: '300+ Professionals',
      description: 'Dedicated in-house team of engineers and skilled technicians',
      color: 'bg-[#03045e]',
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Strict adherence to project timelines with budgeted cost management',
      color: 'bg-[#03045e]',
    },
    {
      icon: Handshake,
      title: 'Trusted Partnerships',
      description: 'Strong relationships with TANGEDCO, TANTRANSCO, and major IPPs',
      color: 'bg-[#03045e]',
    },
    {
      icon: Target,
      title: 'End-to-End Solutions',
      description: 'Complete EPC services from design to commissioning and O&M support',
      color: 'bg-[#03045e]',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([titleRef.current], { opacity: 1 })
      if (cardsRef.current?.children) {
        gsap.set(cardsRef.current.children, { opacity: 1 })
      }

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

      if (cardsRef.current?.children) {
        gsap.from(cardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative py-12 overflow-hidden sm:py-16 lg:py-20 bg-white/70">
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 text-center sm:mb-12">
          <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#33A1E0]/25">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
            Your Trusted Power <span className="text-[#03045e]">
              Infrastructure Partner
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] max-w-3xl mx-auto">
            Ayyappan & Co delivers excellence in every project with our experienced team, 
            certified processes, and commitment to quality and safety.
          </p>
        </div>

        <div ref={cardsRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <Card 
              key={index} 
              className="group p-6 bg-white/70 border border-[#E2E8F0] hover:border-[#06d6a0]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${reason.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon size={28} className="text-white" weight="duotone" />
              </div>
              <h3 className="text-lg font-bold text-[#1E3A5F] mb-2">{reason.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{reason.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
