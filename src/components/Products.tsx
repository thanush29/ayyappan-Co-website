import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

// Import local images
import heroBgImage from '@/assets/hero-bg.jpg'
import teamImage from '@/assets/team.jpg'
import installationImage from '@/assets/installation.jpg'
import solarPanelImage from '@/assets/solar-panel.jpg'
import powerLinesImage from '@/assets/power-lines.jpg'
import towerImage from '@/assets/tower.jpg'
import workersImage from '@/assets/workers.jpg'

gsap.registerPlugin(ScrollTrigger)

export function Products() {
  const substationProjects = [
    {
      name: '400kV Substations',
      description: 'Extra High Voltage substations for bulk power transmission and distribution networks',
      specs: ['Complete EPC services', 'GIS/AIS configurations', 'Bay extensions', 'Protection & control systems'],
      image: heroBgImage,
      color: 'bg-[#03045e]',
    },
    {
      name: '230kV Substations',
      description: 'High voltage substations for regional power distribution and industrial power systems',
      specs: ['Turnkey execution', 'Civil & electrical works', 'Automation systems', 'Grid interconnection'],
      image: teamImage,
      color: 'bg-[#03045e]',
    },
    {
      name: '110kV & 66kV Substations',
      description: 'Medium voltage substations for local power distribution and industrial applications',
      specs: ['Compact designs', 'Quick deployment', 'Urban/rural configurations', 'Smart grid ready'],
      image: installationImage,
      color: 'bg-[#03045e]',
    },
  ]

  const transmissionProjects = [
    {
      name: '400kV Transmission Lines',
      description: 'Extra high voltage transmission lines for long-distance power transfer across regions',
      specs: ['ACSR/AAAC conductors', 'Lattice tower structures', 'ROW management', 'Environment clearance support'],
      image: solarPanelImage,
      color: 'bg-[#03045e]',
    },
    {
      name: '230kV Transmission Lines',
      description: 'High voltage lines connecting substations and power plants to transmission grids',
      specs: ['Single/double circuit', 'Foundation engineering', 'Stringing works', 'Testing & energization'],
      image: powerLinesImage,
      color: 'bg-[#03045e]',
    },
    {
      name: '110kV & 66kV Lines',
      description: 'Medium voltage transmission and distribution lines for regional power networks',
      specs: ['Overhead/underground', 'Tower erection', 'Cable laying', 'Protection systems'],
      image: towerImage,
      color: 'bg-[#03045e]',
    },
  ]

  const titleRef = useRef<HTMLDivElement>(null)

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

  const ProductCard = ({ product, index }: { product: typeof substationProjects[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const ctx = gsap.context(() => {
        // Ensure card is visible first
        gsap.set(cardRef.current, { opacity: 1 })

        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.7,
          delay: index * 0.15,
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
        <Card className="overflow-hidden transition-all duration-500 border-0 shadow-lg hover:shadow-2xl group bg-white/70 hover:-translate-y-2">
          <div className="relative overflow-hidden h-44">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className={`absolute inset-0 ${product.color} opacity-80`}></div>
            <div className="absolute top-0 right-0 w-32 h-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10"></div>
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-xl font-bold text-white drop-shadow-lg">{product.name}</h3>
            </div>
          </div>
          <div className="p-5">
            <p className="text-[#64748B] mb-4 leading-relaxed text-sm">{product.description}</p>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#03045e] mb-2">Key Features:</h4>
              {product.specs.map((spec, idx) => (
                <div key={spec} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${product.color} flex-shrink-0`}></div>
                  <span className="text-sm text-[#03045e]">{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <section id="products" className="relative py-16 overflow-hidden lg:py-20 bg-white/70">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-10 text-center">
        
          <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#33A1E0]/25">
        
        Our Expertise</span>
     
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
                       Project 
 <span className="text-[#03045e] ml-2">
            Capabilities
            </span>
          </h2>
          <p className="text-base text-[#64748B] max-w-3xl mx-auto">
            Specialized expertise in executing EHV substations and transmission line projects 
            across all voltage levels from concept to commissioning.
          </p>
        </div>

        <Tabs defaultValue="substations" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-10 bg-[#03045e]/10 p-1.5 rounded-xl h-14">
            <TabsTrigger value="substations" className="text-base font-semibold text-white data-[state=active]:bg-[#03045e] data-[state=active]:border-[#03045e] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border-2 rounded-lg transition-all">
              EHV Substations
            </TabsTrigger>
            <TabsTrigger value="transmission" className="text-base font-semibold text-white data-[state=active]:bg-[#33A1E0] py-2 data-[state=active]:border-[#03045e] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:border rounded-lg transition-all"
            >
              Transmission Lines
            </TabsTrigger>
          </TabsList>

          <TabsContent value="substations" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {substationProjects.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transmission" className="mt-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {transmissionProjects.map((product, index) => (
                <ProductCard key={product.name} product={product} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-10 bg-[#03045e] rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#03045e]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#03045e]/10 rounded-full blur-3xl"></div>
          <div className="relative z-10 grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-white">Turnkey Solutions</h3>
              <p className="mb-6 leading-relaxed text-white/70">
                We offer complete Design, Engineering, Procurement, Construction, Testing & Commissioning, 
                and Operation & Maintenance services. Our integrated approach ensures seamless project 
                execution from planning to handover, backed by our 30 years of proven expertise.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#03045e]"></div>
                  <span className="text-sm font-medium text-white/90">Single-point responsibility</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]"></div>
                  <span className="text-sm font-medium text-white/90">Budget adherence</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#03045e]"></div>
                  <span className="text-sm font-medium text-white/90">Quality assurance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#03045e]"></div>
                  <span className="text-sm font-medium text-white/90">Timely delivery</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative overflow-hidden shadow-2xl rounded-xl ring-4 ring-white/10">
                <img
                  src={workersImage}
                  alt="Power infrastructure project"
                  className="object-cover w-full h-64"
                />
                <div className="absolute inset-0 bg-[#03045e]/70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-lg font-semibold text-white">Delivering Power. Powering Progress.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
