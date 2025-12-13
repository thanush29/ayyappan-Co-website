import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Certificate, Medal, Handshake, ShieldCheck, Lightning, CheckCircle } from '@phosphor-icons/react'

// Import local images
import transformerImage from '@/assets/transformer.jpg'
import officeImage from '@/assets/office.jpg'
import installationImage from '@/assets/installation.jpg'
import certificationImage from '@/assets/iso9001.jpg'

gsap.registerPlugin(ScrollTrigger)

export function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0)
  const titleRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)

  const certifications = [
    {
      icon: Lightning,
      title: 'TNEB Class I Contractor',
      number: 'State Power Utility',
      description: 'Certified Class I contractor for executing EHV substation and transmission line works for Tamil Nadu Electricity Board',
      year: 'Active',
       color: 'bg-[#03045e]',
      iconBg: 'bg-[#03045e]', 
      image: transformerImage,
    },
    {
      icon: Certificate,
      title: 'ESA Grade License',
      number: 'ESA:530',
      description: 'Electrical Supervisor Authorization Grade License issued by Electrical Licensing Board of Tamil Nadu',
      year: 'Active',
          color: 'bg-[#03045e]',
      iconBg: 'bg-[#03045e]',
      image: officeImage,
    },
    {
      icon: ShieldCheck,
      title: 'PWD High Ways Contractor',
      number: 'Class A & B',
      description: 'Certified contractor for PWD High Ways projects',
      year: 'Active',
           color: 'bg-[#03045e]',
      iconBg: 'bg-[#03045e]',
      image: installationImage,
    },
    {
      icon: Medal,
      title: 'ISO 9001:2015',
      number: 'Quality Management',
      description: 'International certification for quality management systems ensuring consistent project delivery excellence',
      year: '2012',
      color: 'bg-[#03045e]',
      iconBg: 'bg-[#03045e]',
      image: certificationImage,
    },
  ]

  const achievements = [
    {
      icon: CheckCircle,
      title: '30+ Years Experience',
      description: 'Three decades of specialized expertise in power infrastructure',
    },
    {
      icon: Handshake,
      title: 'TNEB/CEIG Liaison',
      description: 'Established relationships and constant coordination with authorities',
    },
    {
      icon: Certificate,
      title: 'Strong Supplier Network',
      description: 'Extensive network ensuring timely material delivery',
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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certifications.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [certifications.length])

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
    }
  }, [activeIndex])

  const activeCert = certifications[activeIndex]

  return (
    <section id="certifications" className="relative py-16 overflow-hidden lg:py-20 ">
      {/* <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#03045e]/5 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#03045e]/5 rounded-full blur-[100px]"></div> */}
      
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
      <div ref={titleRef} className="mb-10 text-center">
        <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#03045e]/25">Certifications & Licenses</span>
       

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
            Certified
   <span className="text-[#03045e] ml-2">
            Excellence

        </span>
        </h2>
        <p className="text-[#1E3A5A] max-w-2xl mx-auto">
        Our certifications and licenses reflect our commitment to quality and regulatory compliance.
        </p>
      </div>

      {/* Certification Cards Carousel */}
      <div className="grid items-center gap-8 mb-12 lg:grid-cols-2 lg:gap-12">
        <div ref={slideRef} className="relative ">
        <Card className="relative overflow-hidden shadow-2xl  lg:h-[450px]   rounded-2xl group">
          <img 
          src={activeCert.image} 
          alt={activeCert.title}
          className="absolute inset-0 object-contain w-full h-full"
          />
          <div className="relative z-10 p-8">
          <div className={`w-16 h-16 ${activeCert.iconBg} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
          <activeCert.icon size={32} className="text-white" weight="duotone" />
          </div>
          <Badge className="px-3 py-1 mb-3 text-[#03045e] border-0 bg-[#03045e]">{activeCert.year}</Badge>
          
          <h3 className="mb-2 text-2xl font-bold text-white">{activeCert.title}</h3>
          <p className="mb-4 font-medium text-white/90">{activeCert.number}</p>
          <p className="leading-relaxed text-white/80">{activeCert.description}</p>
          </div>
        </Card>
        <div className="flex justify-center gap-2 mt-6">
          {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === activeIndex ? 'bg-[#03045e] w-8' : 'bg-[#03045e]/30 hover:bg-[#03045e]/50'
            }`}
            aria-label={`View certification ${index + 1}`}
          />
          ))}
        </div>
        </div>

        <div className="space-y-5">
        <div>
          <h3 className="text-2xl font-semibold text-[#03045e] mb-4">Licensed & Certified</h3>
          <p className="text-[#1E3A5A] leading-relaxed mb-6">
          Ayyappan & Co holds all necessary certifications and licenses required for 
          executing EHV substation and transmission line projects. Our credentials reflect our 
          commitment to maintaining the highest standards of quality and regulatory compliance.
          </p>
        </div>

        <div className="grid gap-4">
          {achievements.map((achievement, index) => {
          const colors = ['bg-[#03045e]', 'bg-[#03045e]', 'bg-[#03045e]']
          return (
            <Card
            key={achievement.title}
            className={`p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 ${colors[index]} group`}
            >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 transition-transform rounded-lg bg-white/15 group-hover:scale-110">
              <achievement.icon size={20} className="text-white" weight="duotone" />
              </div>
              <div>
              <h4 className="mb-1 font-semibold text-white">{achievement.title}</h4>
              <p className="text-sm text-white/80">{achievement.description}</p>
              </div>
            </div>
            </Card>
          )
          })}
        </div>

        <Card className="p-6 bg-[#03045e] border-[#03045e]/20 shadow-lg">
          <h4 className="mb-3 text-lg font-semibold text-white">Regulatory Compliance</h4>
          <p className="mb-4 text-sm leading-relaxed text-white">
          We maintain strict adherence to all statutory and regulatory requirements for power 
          infrastructure projects, including environmental clearances and safety certifications.
          </p>
          <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 text-xs font-semibold text-[#03045e] bg-white rounded-full shadow">TNEB Approved</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-[#03045e] bg-white rounded-full shadow">CEIG Compliant</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-[#03045e] bg-white rounded-full shadow">Safety Certified</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-[#03045e] bg-white rounded-full shadow">ISO 9001:2015</span>
          </div>
        </Card>
        </div>
      </div>

      <div className="bg-[#03045e] rounded-2xl p-6 lg:p-8 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#03045e]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#03045e]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
        <h3 className="mb-4 text-2xl font-bold text-white">
          Trusted by Power Utilities & Independent Power Producers
        </h3>
        <p className="max-w-2xl mx-auto mb-8 text-white/70">
          Our certifications and proven track record make us the preferred partner for state power 
          utilities and independent power producers across Tamil Nadu and neighboring states.
        </p>
        <div className="grid gap-6 sm:grid-cols-4">
          <div className="p-5 transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform group-hover:scale-110">Class I</div>
          <div className="text-sm text-white/70">TNEB Contractor</div>
          </div>
          <div className="p-5 transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform group-hover:scale-110">ESA:530</div>
          <div className="text-sm text-white/70">Grade License</div>
          </div>
          <div className="p-5 transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform group-hover:scale-110">A & B</div>
          <div className="text-sm text-white/70">PWD High Ways Class</div>
          </div>
          <div className="p-5 transition-colors border bg-white/10 backdrop-blur-sm rounded-xl border-white/10 hover:bg-white/15 group">
          <div className="mb-2 text-3xl font-bold text-white transition-transform group-hover:scale-110">ISO</div>
          <div className="text-sm text-white/70">9001:2015</div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </section>
  )
}
