import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Star, Quotes } from '@phosphor-icons/react'
import Lt from '@/assets/testimonial/lt.jpg'
import Kec from '@/assets/testimonial/kec.jpg'
import Sterlite from '@/assets/testimonial/sterlite.jpg'
import Tneb from '@/assets/testimonial/tneb.jpg'
import Green from '@/assets/testimonial/green.png'
import Highway from '@/assets/testimonial/highway.webp'

gsap.registerPlugin(ScrollTrigger)

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      text: "Ayyappan & Co delivered exceptional support for the RPTL 800KV HVDC Raigarh–Pugalur TL-1 works at Salem. Their execution during the 400KV–230KV MC Transmission Line at Puliyanthope and the 400KV Quad DC Ottapidaram TL package was precise, safe, and ahead of schedule.",
      author: "Project Manager – L&T Construction",
      location: "Salem, Tamil Nadu",
      company: "L&T Construction",
      image: Lt
    },
    {
      text: "The LILO of the 400KV Karaikudi–Pugalur Transmission Line (Feeder II) required high accuracy and disciplined safety practices. Ayyappan & Co delivered flawlessly, keeping all technical parameters and schedule commitments on track.",
      author: "Senior Engineer – KEC International",
      location: "Tamil Nadu",
      company: "KEC International",
      image: Kec
    },
    {
      text: "Ayyappan & Co executed piling and civil foundation works for the TLSP K-3 220/110KV line with excellent workmanship. Their coordination with KSEB and multi-agency teams ensured a smooth execution process.",
      author: "Project Lead – Sterlite Power Transmission Ltd.",
      location: "Kerala & Tamil Nadu",
      company: "Sterlite Power",
      image: Sterlite
    },
    {
      text: "Their work on multiple 400KV DC lines under JICA Package 7/8—including Korattur–Manali, Manali–Thervaikandikai, and related deviations for IOCL—was highly commendable. Tower erection, stringing, and Panther conductor works were executed with excellent quality.",
      author: "Executive Engineer – TNEB / IOCL",
      location: "Chennai, Tamil Nadu",
      company: "TNEB / IOCL",
      image: Tneb
    },
    {
      text: "Ayyappan & Co executed the 110/33KV 50MVA power transformer foundation civil works with outstanding precision and engineering discipline. Their quality, safety adherence, and project coordination ensured a seamless readiness for electrical erection and commissioning.",
      author: "Project Director – L&T Construction",
      location: "Tamil Nadu",
      company: "L&T Construction",
      image: Lt
    },
    {
      text: "Ayyappan & Co professionally carried out the shifting of existing 11KV HT/LT overhead lines and conversion to RMU systems for the ECR road-widening project. Their execution minimized disruptions, maintained safety, and ensured timely completion despite the complex working conditions.",
      author: "Divisional Engineer – Highway Department",
      location: "East Coast Road, Tamil Nadu",
      company: "Highway Department",
      image: Highway
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-[#F0F9FF] overflow-hidden">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
         

           <span className="inline-block px-5 py-2 bg-[#03045e] text-white font-semibold rounded-full text-sm mb-6">
                      Client Feedback

          </span>
      
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
                  Trusted by 
   <span className="text-[#03045e] ml-2">
                Industry Leaders 


        </span>
        </h2>
          <p className="text-[#1E3A5A] max-w-2xl mx-auto">
            Read what our partners say about our execution excellence and engineering precision.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, idx) => (
            <Card key={idx} className="testimonial-card p-4 hover:shadow-xl transition-shadow border-[#BFDBFE] bg-white/70 group">
              <Quotes size={48} weight="duotone" className="text-[#BFDBFE] mb-6 group-hover:text-[#93C5FD] transition-colors" />
              
              <p className="text-[#154D71] leading-relaxed mb-6 italic text-sm sm:text-base">
                "{item.text}"
              </p>

              

              <div className="flex items-center gap-4 pt-4 border-t border-[#E0F2FE]">
                <img 
                  src={item.image} 
                  alt={item.company}
                  className="object-cover w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-bold text-[#154D71] text-sm">{item.author}</div>
                  <div className="text-[#1E3A5A] text-xs">{item.location}</div>
                  <div className="flex items-center gap-1 ">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} weight="fill" className="text-[#03045e]" />
                ))}
              </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
