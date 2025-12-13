import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import substationImage from '@/assets/substation/1.jpg'

gsap.registerPlugin(ScrollTrigger)

export function FeaturedProject() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      })

      gsap.from(contentRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[#F0F9FF] overflow-hidden">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          
          <div ref={imageRef} className="w-full lg:w-1/2">
            <div className="relative overflow-hidden shadow-2xl rounded-2xl">
              <div className="absolute inset-0 bg-[#03045e]/10 mix-blend-multiply"></div>
              <img 
                src={substationImage} 
                alt="Substation Project" 
                className="object-cover w-full h-full transition-transform duration-700 transform hover:scale-105"
              />
              <div className="absolute bottom-6 left-6">
                 <div className="bg-[#03045e] text-white px-4 py-2 rounded-lg font-bold shadow-lg">
                    Turnkey Solutions
                 </div>
              </div>
            </div>
          </div>

          <div ref={contentRef} className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold text-[#03045e] mb-6">
              Substation Projects
            </h2>
            <p className="text-[#03045e] text-lg leading-relaxed mb-8">
              Ayyappan & Co Infrastructure delivers turnkey electrical substation solutions from design to commissioning, providing equipment supply, civil works, installation, and testing — all with strict quality and safety standards.
            </p>

            <div className="mb-10 space-y-4">
               {[
                 'Initial project assessment and detailed engineering design',
                 'Supply and installation of electrical equipment and materials',
                 'Comprehensive civil and electrical construction services',
                 'Testing, commissioning, and ongoing support for substations and transmission lines',
                 'Approvals up to commissioning'
               ].map((item, idx) => (
                 <div key={idx} className="flex items-start gap-3">
                   <div className="mt-1 w-5 h-5 rounded-full bg-[#03045e] flex items-center justify-center flex-shrink-0">
                     <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                   </div>
                   <span className="text-[#03045e] font-medium">{item}</span>
                 </div>
               ))}
            </div>

            {/* <Button className="bg-white/70 text-[#03045e] border-2 border-[#03045e] hover:bg-[#E0F2FE] text-base font-bold px-8 py-6 rounded-none uppercase tracking-wide group">
              Learn More
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button> */}
          </div>

        </div>
      </div>
    </section>
  )
}

