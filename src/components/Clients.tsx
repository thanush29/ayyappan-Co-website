import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Buildings, Lightning, SunHorizon, Gear, Broadcast, Factory } from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

export function Clients() {
  const titleRef = useRef<HTMLDivElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

  const clients = [
    { name: 'TNEB', icon: Lightning, color: 'bg-[#03045e]' },
    { name: 'NLC India', icon: SunHorizon, color: 'bg-[#03045e]' },
    { name: 'Kalpataru', icon: Gear, color: 'bg-[#03045e]' },
    { name: 'Highways Depart, TN', icon: Gear, color: 'bg-[#03045e]' },
    { name: 'L&T Construction', icon: Factory, color: 'bg-[#03045e]' },
    { name: 'Shah Power Pvt. Ltd', icon: Factory, color: 'bg-[#03045e]' },
    { name: 'BHEL', icon: Factory, color: 'bg-[#03045e]' },
    { name: 'Sterlite Power', icon: Lightning, color: 'bg-[#03045e]' },
  ]

  // Updated revenue data based on screenshot
  const revenueData = [
    { year: '2015-16', amount: 24, label: '₹24 Cr' },
    { year: '2016-17', amount: 9, label: '₹9 Cr' },
    { year: '2017-18', amount: 14, label: '₹14 Cr' },
    { year: '2018-19', amount: 24, label: '₹24 Cr' },
    { year: '2019-20', amount: 23, label: '₹23 Cr' },
    { year: '2020-21', amount: 12, label: '₹12 Cr' },
    { year: '2021-22', amount: 18, label: '₹18 Cr' },
    { year: '2022-23', amount: 26.56, label: '₹26.56 Cr' },
    { year: '2023-24', amount: 22.12, label: '₹22.12 Cr' },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleRef.current, { opacity: 1 })
      if (clientsRef.current?.children) {
        gsap.set(clientsRef.current.children, { opacity: 1 })
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

      if (clientsRef.current?.children) {
        gsap.from(clientsRef.current.children, {
          opacity: 0,
          y: 20,
          scale: 0.95,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: clientsRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section id="clients" className="py-20 lg:py-28 bg-[#03045e]/10 relative overflow-hidden">
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="mb-16 text-center">

          
          <span className="inline-block px-5 py-2 bg-[#03045e] text-white font-semibold rounded-full text-sm mb-6">
            Our Valued Partners
          </span>
      
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
            Trusted by
   <span className="text-[#03045e] ml-2">
                      Industry Leaders

        </span>
        </h2>
          <p className="text-base lg:text-lg text-[#03045e] max-w-2xl mx-auto">
            Partnering with leading power utilities, infrastructure companies, and independent power producers 
            across Tamil Nadu and neighboring states.
          </p>
        </div>

        {/* Partners Grid - Clean horizontal cards */}
        <div ref={clientsRef} className="flex flex-wrap justify-center gap-4 mb-20 lg:gap-6" style={{ opacity: 1 }}>
          {clients.map((client, index) => (
            <div
              key={client.name}
              className="group flex flex-col items-center gap-3 p-6 bg-white/70 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 min-w-[140px]"
            >
              <div className={`w-14 h-14 rounded-2xl ${client.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <client.icon size={28} className="text-white" weight="duotone" />
              </div>
              <span className="text-sm font-semibold text-[#03045e]">{client.name}</span>
            </div>
          ))}
        </div>

        {/* Stats - Clean card style */}
        <div className="grid grid-cols-1 gap-6 mb-16 sm:grid-cols-3">
          <div className="p-6 text-center shadow-md bg-white/80 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">₹22.12 Cr</div>
            <div className="text-sm text-[#03045e] font-medium">Latest Revenue</div>
          </div>
          <div className="p-6 text-center shadow-md bg-white/80 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">₹26.56 Cr</div>
            <div className="text-sm text-[#03045e] font-medium">Peak Revenue</div>
          </div>
          <div className="p-6 text-center shadow-md bg-white/80 rounded-2xl">
            <div className="text-3xl sm:text-4xl font-bold text-[#03045e] mb-2">9+ Years</div>
            <div className="text-sm text-[#03045e] font-medium">Track Record</div>
          </div>
        </div>

        {/* Growth Timeline */}
        <div className="bg-[#03045e] rounded-3xl p-6 lg:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#03045e]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#03045e]/40 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="mb-8 text-2xl font-bold text-center text-white">Our Growth Journey</h3>
            
            <div className="grid items-end h-64 grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-9">
              {revenueData.map((data, index) => (
                <div key={data.year} className="flex flex-col items-center group">
                  <div className="relative flex items-end justify-center w-full" style={{ height: '200px' }}>
                    <div 
                      className="relative w-full transition-all duration-300 rounded-t-lg bg-white group-hover:bg-[#03045e]"
                      style={{ height: `${(data.amount / 30) * 100}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-[#03045e] px-2 py-1 rounded">
                        {data.label}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-[10px] sm:text-xs text-white/60 font-medium rotate-0 whitespace-nowrap">
                    {data.year}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8 text-center md:grid-cols-4">
                <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xl font-bold text-white">2009</div>
                    <div className="text-xs text-white/60">Founded</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xl font-bold text-white">2015</div>
                    <div className="text-xs text-white/60">ESA License</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xl font-bold text-white">2021</div>
                    <div className="text-xs text-white/60">600MW+ O&M</div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                    <div className="text-xl font-bold text-white">2023</div>
                    <div className="text-xs text-white/60">₹26.56Cr Peak</div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

