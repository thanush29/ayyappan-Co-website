import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import testingImage from '@/assets/control-room.jpg'
import permitsImage from '@/assets/office.jpg'
import omImage from '@/assets/workers.jpg'

gsap.registerPlugin(ScrollTrigger)

export function DetailedServices() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const services = [
    {
      id: 'testing',
      title: 'Testing & Commissioning',
      description: 'Precision-driven testing and commissioning services for substations from 66KV to 400KV, ensuring equipment reliability, safety, and full compliance with engineering standards.',
      points: [
        'Thorough validation of all substation equipment to ensure compliance with technical and safety standards.',
        'Rapid detection, testing, and rectification of component failures to minimize downtime.',
        'End-to-end evaluation to ensure equipment is ready for safe energization and long-term operation.',
        'Regular testing schedules to maintain asset reliability, safety, and performance.',
        'Calibration and coordination of relays to guarantee correct and selective system operation.'
      ],
      image: testingImage,
      buttonText: 'Testing & Commissioning',
      imagePosition: 'right'
    },
    {
      id: 'permits',
      title: 'Permits & Approvals',
      description: 'End-to-end regulatory approval services covering TNEB, TANTRANSCO, CEIG, and CEA requirements to ensure seamless initiation and execution of power infrastructure projects.',
      points: [
        'End-to-end handling of TNEB, TANTRANSCO, CEIG & CEA approval processes.',
        'Transparent estimation and processing of statutory fees.',
        'Regular client updates throughout the approval journey.',
        'Preparation and submission of all statutory documents and technical drawings.',
        'Strong authority coordination ensuring faster approval cycles.',
        'Ensures full regulatory compliance before energizing any asset.'
      ],
      image: permitsImage,
      buttonText: 'Permits & Approvals',
      imagePosition: 'left'
    },
    {
      id: 'om',
      title: 'Operation & Maintenance (O&M)',
      description: '24/7 SCADA-enabled operations and maintenance services designed to improve system reliability, reduce downtime, and ensure continuous, safe performance of power infrastructure.',
      points: [
        '24/7 monitoring and operational supervision through SCADA.',
        'Rapid-response repair team for downtime minimization.',
        'Enhanced asset life and performance through systematic O&M practices.',
        'Preventive, predictive & corrective maintenance programs.',
        'Certified engineers & trained technicians ensuring high reliability.',
        'Full safety compliance aligned with client and statutory protocols.'
      ],
      image: omImage,
      buttonText: 'Operation & Maintenance (O&M)',
      imagePosition: 'right'
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      services.forEach((service) => {
        gsap.from(`#service-${service.id}-content`, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: `#service-${service.id}`,
            start: 'top 80%',
          }
        })
        gsap.from(`#service-${service.id}-image`, {
          x: service.imagePosition === 'left' ? -50 : 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: `#service-${service.id}`,
            start: 'top 80%',
          }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-0 overflow-hidden">
      {services.map((service, index) => (
        <div key={service.id} id={`service-${service.id}`} className={`py-20 ${index % 2 === 1 ? 'bg-white/70' : 'bg-[#F0F9FF]'}`}>
          <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
            <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${service.imagePosition === 'right' ? '' : 'lg:flex-row-reverse'}`}>
              
              <div id={`service-${service.id}-content`} className="w-full lg:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-6">
                  {service.title}
                </h2>
                <p className="text-[#1E3A5A] text-lg leading-relaxed mb-8">
                  {service.description}
                </p>

                <div className="grid mb-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                   {service.points.map((point, idx) => (
                     <div key={idx} className="flex items-start gap-3">
                       <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#03045e] flex-shrink-0"></div>
                       <span className="text-[#03045e] text-sm font-medium leading-relaxed">{point}</span>
                     </div>
                   ))}
                </div>

                
              </div>

              <div id={`service-${service.id}-image`} className="w-full lg:w-1/2">
                <div className="relative overflow-hidden shadow-2xl rounded-2xl group">
                  <div className="absolute inset-0 bg-[#03045e]/10 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 min-h-[400px]"
                  />
                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#06d6a0]/10 rounded-full blur-3xl"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

