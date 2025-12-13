import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Target, Users, ClipboardText, HardHat } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export function Specifications() {
  const titleRef = useRef<HTMLDivElement>(null)
  const qualityCardsRef = useRef<HTMLDivElement>(null)
  const bottomCtaRef = useRef<HTMLDivElement>(null)

  const executionCapabilities = [
    {
      category: 'Civil Works',
      icon: HardHat,
      color: 'bg-[#03045e]',
      textColor2: 'text-white',
      capabilities: [
        'Foundation & earthwork for substations and tower structures',
        'Equipment foundations for transformers, reactors & switchgear',
        'Cable trenches & underground cable laying',
        'Control room & building construction',
        'Yard development & drainage systems',
        'Road access & compound wall construction',
      ],
    },
    {
      category: 'Electrical Works',
      icon: ClipboardText,
      color: 'bg-[#03045e]',
      textColor2: 'text-white',
      capabilities: [
        'Busbar & conductor installation',
        'Switchgear & protection equipment installation',
        'Power & distribution transformer erection',
        'Overhead line stringing & sagging',
        'Cable laying, jointing & termination',
        'Earthing & lightning protection systems',
      ],
    },
    {
      category: 'Testing & Quality',
      icon: Target,
      color: 'bg-[#03045e]',
      textColor2: 'text-white',
      capabilities: [
        'Pre-commissioning inspections & tests',
        'Equipment calibration & functional testing',
        'Relay protection setting & testing',
        'High voltage testing (HV/EHV)',
        'Insulation resistance & continuity tests',
        'Complete documentation & test reports',
      ],
    },
  ]

  const qualityFeatures = [
    {
      icon: CheckCircle,
      title: 'Strict Quality Control',
      description: 'Comprehensive quality assurance at every stage from procurement to commissioning',
      color: 'bg-[#03045e]',
      textColor: 'text-white',
    },
    {
      icon: Users,
      title: 'Expert Supervision',
      description: '300+ experienced professionals ensuring adherence to standards and safety protocols',
      color: 'bg-[#03045e]',
      textColor: 'text-white',
    },
    {
      icon: ClipboardText,
      title: 'Documentation',
      description: 'Complete project documentation including as-built drawings and O&M manuals',
      color: 'bg-[#03045e]',
      textColor: 'text-white',
    },
    {
      icon: HardHat,
      title: 'Safety Compliance',
      description: 'Zero-accident safety culture with strict adherence to safety regulations',
      color: 'bg-[#03045e]',
      textColor: 'text-white',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible first
      gsap.set([titleRef.current, bottomCtaRef.current], { opacity: 1 })
      if (qualityCardsRef.current?.children) gsap.set(qualityCardsRef.current.children, { opacity: 1 })

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

      if (qualityCardsRef.current?.children) {
        gsap.from(qualityCardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: qualityCardsRef.current,
            start: 'top 85%',
          },
        })
      }

      gsap.from(bottomCtaRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: bottomCtaRef.current,
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const CapabilitySection = ({ capability, index }: { capability: typeof executionCapabilities[0]; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Ensure card is visible first
        gsap.set(sectionRef.current, { opacity: 1 })

        gsap.from(sectionRef.current, {
          opacity: 0,
          x: index % 2 === 0 ? -40 : 40,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
        })
      })

      return () => ctx.revert()
    }, [index])

    return (
      <div ref={sectionRef} className="h-full">
        <Card className={`p-6 h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 ${capability.color} group`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`flex items-center justify-center ${capability.textColor2} transition-transform rounded-lg w-14 h-14 bg-white/15 group-hover:scale-110`}>
              <capability.icon size={28} className={`${capability.textColor2}`} weight="duotone" />
            </div>
            <h3 className={`text-xl font-bold ${capability.textColor2}`}>{capability.category}</h3>
          </div>
          <ul className={`space-y-3 ${capability.textColor2}`}>
            {capability.capabilities.map((item, idx) => (
              <li key={idx} className={`flex items-start gap-2 ${capability.textColor2}`}>
                <CheckCircle className=" flex-shrink-0 mt-0.5" size={20} weight="fill" />
                <span className={`text-base leading-relaxed  `}>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    )
  }

  return (
    <section id="specifications" className="py-16 lg:py-20 bg-[#F8FAFC]/60 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#06d6a0]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#06d6a0]/5 rounded-full blur-3xl"></div>
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 text-center">
          <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#03045e]/25">Execution Excellence</span>

           <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
                      Project Execution 
 <span className="text-[#03045e] ml-2">
                  Capabilities

            </span>
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl mx-auto">
            Comprehensive in-house capabilities covering all aspects of EHV substation and 
            transmission line project execution with focus on quality and safety.
          </p>
        </div>

        <div className="grid gap-5 mb-6 lg:grid-cols-3">
          {executionCapabilities.map((capability, index) => (
            <CapabilitySection key={capability.category} capability={capability} index={index} />
          ))}
        </div>

        <div ref={qualityCardsRef} className="grid gap-6 mb-16 sm:grid-cols-2 lg:grid-cols-4">
          {qualityFeatures.map((feature, index) => (
            <Card key={feature.title} className={`p-6 text-center  hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-0 ${feature.color} group`}>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform rounded-full bg-white/15 group-hover:scale-110">
                <feature.icon size={32} className="text-white" weight="duotone" />
              </div>
              <h3 className={`mb-2 text-lg font-bold ${feature.textColor}`}>{feature.title}</h3>
              <p className={`text-base leading-relaxed ${feature.textColor}/85`}>{feature.description}</p>
            </Card>
          ))}
        </div>

        <div ref={bottomCtaRef} className="bg-[#03045e] rounded-2xl p-8 lg:p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#03045e]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#03045e]/20 rounded-full blur-3xl"></div>
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold lg:text-3xl">
          Committed to Excellence
              </h3>
              <p className="mb-6 text-base leading-relaxed text-white/85">
          Our 30 years of experience, combined with a dedicated team of 300+ professionals, 
          ensures every project is delivered with the highest standards of quality, safety, 
          and reliability. We maintain strong relationships with TNEB/CEIG for seamless project execution.
              </p>
              <div className="flex flex-wrap gap-3">
          <span className="px-4 py-2 text-sm font-semibold text-white bg-[#03045e] rounded-full shadow">
            TNEB Class I Certified
          </span>
          <span className="px-4 py-2 text-sm font-semibold text-white bg-[#03045e] rounded-full shadow">
            ESA:530 License
          </span>
          <span className="px-4 py-2 text-sm font-semibold text-white bg-[#03045e] rounded-full shadow">
            PWD High Ways Class A&B
          </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 text-center transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform lg:text-4xl group-hover:scale-110">100%</div>
          <div className="text-sm text-white">Quality Tested</div>
              </div>
              <div className="p-5 text-center transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform lg:text-4xl group-hover:scale-110">On-Time</div>
          <div className="text-sm text-white">Delivery Focus</div>
              </div>
              <div className="p-5 text-center transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform lg:text-4xl group-hover:scale-110">300+</div>
          <div className="text-sm text-white">Team Members</div>
              </div>
              <div className="p-5 text-center transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform lg:text-4xl group-hover:scale-110">Zero</div>
          <div className="text-sm text-white">Compromise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
