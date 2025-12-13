import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { X, Lightning, Broadcast, HardHat, Wrench } from '@phosphor-icons/react'

// Import local gallery images
import substation1 from '@/assets/substation/1.jpg'
import substation2 from '@/assets/substation/2.jpg'
import substation3 from '@/assets/substation/3.jpg'
import substation4 from '@/assets/substation/4.jpg'
import substation5 from '@/assets/substation/5.jpg'
import substation6 from '@/assets/substation/6.jpg'
import transmission1 from '@/assets/pile/1.jpg'
import transmission2 from '@/assets/pile/2.jpg'
import transmission3 from '@/assets/pile/3.jpg'
import transmission4 from '@/assets/pile/4.jpg'
import transmission5 from '@/assets/pile/5.jpg'
import transmission6 from '@/assets/pile/6.jpg'


gsap.registerPlugin(ScrollTrigger)

interface GalleryItem {
  id: string
  title: string
  category: string
  description: string
  location?: string
  year?: string
  image: string
  color: string
}

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [activeTab, setActiveTab] = useState('civil')
  const titleRef = useRef<HTMLDivElement>(null)
  const infoCardsRef = useRef<HTMLDivElement>(null)

  const substationProjects = [
    {
      id: 'substation-1',
      title: '400kV EHV Substation',
      category: 'Extra High Voltage',
      description: '400kV GIS substation project including complete civil works, equipment installation, and commissioning. Project scope covered 4 bays with complete protection and SCADA integration.',
      location: 'Tamil Nadu',
      year: '2022',
      image: substation1,
      color: 'bg-[#154D71]',
    },
    {
      id: 'substation-2',
      title: '230kV Substation Construction',
      category: 'High Voltage',
      description: 'Turnkey execution of 230kV AIS substation with 3 incoming and 5 outgoing feeders. Complete civil, electrical, and T&C works delivered on schedule with zero safety incidents.',
      location: 'Tamil Nadu',
      year: '2021',
      image: substation2,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'substation-3',
      title: '110kV Distribution Substation',
      category: 'Medium Voltage',
      description: '110kV substation for urban distribution network. Compact design with advanced automation and remote monitoring capabilities. Project included equipment procurement and installation.',
      location: 'Tamil Nadu',
      year: '2023',
      image: substation3,
      color: 'bg-[#10B981]',
    },
    {
      id: 'substation-4',
      title: '66kV Industrial Substation',
      category: 'Industrial Power',
      description: 'Dedicated 66kV substation for industrial power supply. Complete EPC scope including transformer installation, switchgear, protection systems, and auxiliary power supply.',
      location: 'Tamil Nadu',
      year: '2020',
      image: substation4,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'substation-5',
      title: '33kV Rural Substation',
      category: 'Rural Electrification',
      description: '33kV substation project aimed at rural electrification. Included civil works, equipment installation, and commissioning to enhance power reliability in remote areas.',
      location: 'Tamil Nadu',
      year: '2021',
      image: substation5,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'substation-6',
      title: '22kV Substation Upgrade',
      category: 'Substation Modernization',
      description: 'Upgrade of existing 22kV substation to improve capacity and reliability. Scope included replacement of switchgear, transformers, and implementation of advanced protection schemes.',
      location: 'Tamil Nadu',
      year: '2022',
      image: substation6,
      color: 'bg-[#10B981]',
    },
  ]

  const transmissionProjects = [
    {
      id: 'transmission-1',
      title: '400kV D/C Transmission Line',
      category: 'Extra High Voltage',
      description: '120 km double circuit 400kV transmission line with lattice tower structures. Complete line construction including foundation, tower erection, stringing, and testing works.',
      location: 'Tamil Nadu',
      year: '2022',
      image: transmission1,
      color: 'bg-[#154D71]',

    },
    {
      id: 'transmission-2',
      title: '230kV Transmission Line',
      category: 'High Voltage',
      description: '85 km single circuit 230kV line connecting substation to grid. ACSR conductor with complete ROW clearance, tower foundation, and energization activities.',
      location: 'Tamil Nadu',
      year: '2021',
      image: transmission2,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'transmission-3',
      title: '110kV Overhead Line',
      category: 'Medium Voltage',
      description: '42 km overhead transmission line for regional grid strengthening. Included tower supply, erection, conductor stringing, and protection system installation.',
      location: 'Tamil Nadu',
      year: '2023',
      image: transmission3,
      color: 'bg-[#10B981]',
    },
    {
      id: 'transmission-4',
      title: 'Underground Cable Network',
      category: 'Cable Works',
      description: '15 km underground 66kV cable network for urban area distribution. Complete cable laying, jointing, termination, and testing works with HDD crossings.',
      location: 'Tamil Nadu',
      year: '2020',
      image: transmission4,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'transmission-5',
      title: '33kV Rural Transmission Line',
      category: 'Rural Electrification',
      description: '30 km 33kV line for rural electrification project. Included tower erection, conductor stringing, and commissioning to enhance power supply reliability in remote areas.',
      location: 'Tamil Nadu',
      year: '2021',
      image: transmission5,
      color: 'bg-[#06d6a0]',
    },
    {
      id: 'transmission-6',
      title: '22kV Line Upgrade',
      category: 'Line Modernization',
      description: 'Upgrade of existing 22kV transmission line to improve capacity and reduce losses. Scope included conductor replacement, tower strengthening, and implementation of advanced protection schemes.',
      location: 'Tamil Nadu',
      year: '2022',
      image: transmission6,
      color: 'bg-[#10B981]',
    },
  ]

  const infoCards = [
    {
      icon: Lightning,
      title: 'Substations Completed',
      value: '50+',
      description: 'Successfully commissioned',
      color: 'bg-[#154D71]',
    },
    {
      icon: Broadcast,
      title: 'Transmission Lines',
      value: '500+ km',
      description: 'Constructed & energized',
      color: 'bg-[#06d6a0]',
    },
    {
      icon: HardHat,
      title: 'Team Strength',
      value: '300+',
      description: 'Skilled professionals',
      color: 'bg-[#10B981]',
    },
    {
      icon: Wrench,
      title: 'O&M Contracts',
      value: '20+',
      description: 'Active maintenance',
      color: 'bg-[#06d6a0]',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ensure elements are visible first
      gsap.set(titleRef.current, { opacity: 1 })
      if (infoCardsRef.current?.children) gsap.set(infoCardsRef.current.children, { opacity: 1 })

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

      if (infoCardsRef.current?.children) {
        gsap.from(infoCardsRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoCardsRef.current,
            start: 'top 85%',
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const GalleryCard = ({ item, index }: { item: GalleryItem; index: number }) => {
    return (
      <div
        className="overflow-hidden cursor-pointer rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/70"
        onClick={() => setSelectedImage(item)}
      >
        <div className="relative overflow-hidden aspect-square">
          <img 
            src={item.image} 
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    )
  }

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F8FAFC]/60 relative">
      <div className="px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-12 text-center">
          <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#33A1E0]/25">
            Project Gallery
          </span>
     
          
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#03045e]">
             Our Projects & 
   <span className="text-[#03045e] ml-2">
            Infrastructure

        </span>
        </h2>
          <p className="text-base lg:text-lg text-[#64748B] max-w-2xl mx-auto">
            Showcasing our expertise in EHV substation and transmission line projects across Tamil Nadu.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="flex justify-center gap-4 mb-10 bg-transparent">
            <button 
              onClick={() => setActiveTab('civil')}
              style={{
                backgroundColor: activeTab === 'civil' ? '#03045e' : '#ffffff',
                color: activeTab === 'civil' ? '#ffffff' : '#154D71',
              }}
              className="px-6 py-3 text-sm font-semibold transition-all rounded-full shadow-md"
            >
              Substation Civil Works
            </button>
            <button 
              onClick={() => setActiveTab('pile')}
              style={{
                backgroundColor: activeTab === 'pile' ? '#154D71' : '#ffffff',
                color: activeTab === 'pile' ? '#ffffff' : '#154D71',
              }}
              className="px-6 py-3 text-sm font-semibold transition-all rounded-full shadow-md"
            >
              Pile Foundation
            </button>
          </TabsList>

          <TabsContent value="civil" forceMount className="data-[state=inactive]:hidden">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {substationProjects.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pile" forceMount className="data-[state=inactive]:hidden">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {transmissionProjects.map((item, index) => (
                <GalleryCard key={item.id} item={item} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border border-[#E2E8F0]">
          {selectedImage && (
            <div className="relative bg-white/70">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/70 flex items-center justify-center hover:bg-[#F8FAFC]/60 transition-colors shadow-md"
              >
                <X size={16} className="text-[#154D71]" />
              </button>
              <div className="relative h-64 sm:h-80">
                <img 
                  src={selectedImage.image} 
                  alt={selectedImage.title}
                  className="absolute inset-0 object-cover w-full h-full"
                />
                <div className={`absolute inset-0 ${selectedImage.color} opacity-60`}></div>
                <div className="absolute inset-0 bg-white/30"></div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <span className="inline-block px-3 py-1 bg-[#06d6a0]/10 text-[#06d6a0] text-sm font-semibold rounded-full">
                    {selectedImage.category}
                  </span>
                  <div className="flex items-center gap-3 text-sm text-[#154D71] font-medium">
                    {selectedImage.location && <span>{selectedImage.location}</span>}
                    {selectedImage.year && <span>• {selectedImage.year}</span>}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#154D71]">{selectedImage.title}</h3>
                <p className="text-[#64748B] leading-relaxed text-sm">{selectedImage.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}

