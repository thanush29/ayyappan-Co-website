import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { User } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)
export function ClientsDisplay() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const clients = [
    {
      role: 'Project Manager',
      company: 'L&T Construction',
    },
    {
      role: 'Senior Engineer',
      company: 'KEC International',
    },
    {
      role: 'Project Lead',
      company: 'Sterlite Power Transmission Ltd.',
    },
    {
      role: 'Executive Engineer',
      company: 'TNEB / IOCL',
    },
    {
      role: 'Divisional Engineer',
      company: 'Highway Department',
    }
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(scrollRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: scrollRef.current,
          start: 'top 80%',
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="py-20 bg-white/70 border-t border-[#E2E8F0]">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="inline-block px-5 py-2 bg-[#06d6a0] text-white font-semibold rounded-full text-sm mb-6">
            Client Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#154D71] mb-4">What Our Clients Say</h2>
          <p className="text-[#64748B] max-w-2xl mx-auto">
            Trusted by leading companies and organizations across the power sector.
          </p>
        </div>
        
        <div ref={scrollRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client, idx) => (
            <Card key={idx} className="p-6 transition-all duration-300 border-0 shadow-md bg-white/70 rounded-2xl hover:shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#06d6a0] rounded-2xl flex items-center justify-center">
                  <User size={28} className="text-white" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#154D71] text-lg">{client.role}</h3>
                  <p className="text-[#64748B] text-sm">{client.company}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

