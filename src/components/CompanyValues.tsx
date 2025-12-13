import { useState, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Target, Eye, Gear, CheckCircle, FileText, Globe } from '@phosphor-icons/react'

// Import images (using existing assets)
import missionImage from '@/assets/transmission1.jpg'
import visionImage from '@/assets/transmission2.jpg'
import objectivesImage from '@/assets/substation2.jpg'
import processImage from '@/assets/workers.jpg'
import termsImage from '@/assets/about-bg.jpg'

gsap.registerPlugin(ScrollTrigger)

export function CompanyValues() {
  const [activeTab, setActiveTab] = useState('mission')
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const tabs = [
    { id: 'mission', label: 'Company Mission', icon: Target },
    { id: 'objectives', label: 'Company Objectives', icon: Globe },
    { id: 'process', label: 'Work Process', icon: Gear },
    { id: 'vision', label: 'Company Vision', icon: Eye },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
  ]

  const content = {
    mission: {
      title: 'Company Mission',
      image: missionImage,
      items: [
        'Strengthening India\'s power backbone through reliable EPC delivery',
        'Executing precision-driven engineering backed by 14+ years of proven expertise',
        'Excellence in EHV/HV substations, transmission lines, T&D and O&M services',
        'Ensuring timely, risk-free completion of multi-crore infrastructure projects',
        'Delivering cost-efficient solutions without compromising quality or safety standards',
        'Empowering projects with a skilled workforce trained to global engineering benchmarks',
        'Driving continuous improvement through disciplined processes and robust QA/QC systems',
      ]
    },
    objectives: {
      title: 'Company Objectives',
      image: objectivesImage,
      items: [
        'Deliver high-quality EPC services with predictable, on-time completion',
        'Enhance customer satisfaction through transparency, teamwork, and communication',
        'Implement innovative, value-engineered solutions that optimize project performance',
        'Strengthen operations by integrating client feedback into improvement cycles',
        'Promote disciplined project execution across all engineering and construction stages',
        'Consistently exceed project milestones with accuracy and reliability',
      ]
    },
    process: {
      title: 'Work Process',
      image: processImage,
      items: [
        'Streamlining engineering workflows for efficiency, quality, and operational safety',
        'Embedding a Zero-Harm safety culture across all project environments',
        'Investing in R&D to enhance system performance and sustainable engineering practices',
        'Design and planning executed by certified engineers with deep industry expertise',
        'Real-time digital monitoring, QA/QC audits, and technical oversight for seamless execution',
        'Maintaining safety as the non-negotiable priority from planning to commissioning',
      ]
    },
    vision: {
      title: 'Company Vision',
      image: visionImage,
      items: [
        'Achieving engineering excellence across India\'s integrated transmission ecosystem',
        'Becoming a global EPC leader in substations and high-voltage corridor development',
        'Advancing innovation through sustainable, future-ready engineering solutions',
        'Delivering a full project lifecycle—from EPC to T&C to long-term O&M stewardship',
      ]
    },
    terms: {
      title: 'Terms & Conditions',
      image: termsImage,
      items: [
        'Adherence to all statutory regulations and safety compliance standards',
        'Transparent contracting and ethical business practices',
        'Commitment to environmental sustainability and community welfare',
        'Strict confidentiality and data protection protocols',
        'Standard warranty and liability terms as per industry norms'
      ]
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate content change
      gsap.fromTo(contentRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
      )
      
      // Animate image change
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
      )
    }, sectionRef)
    
    return () => ctx.revert()
  }, [activeTab])

  const activeContent = content[activeTab as keyof typeof content]

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-[#03045e]/10 relative overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-[#03045e]/80"></div> */}
      
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
        
        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:gap-4 sm:mb-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 shadow-sm ${
                activeTab === tab.id
                  ? 'bg-[#03045e] text-white shadow-[#33A1E0] shadow-lg scale-105'
                  : 'bg-white/70 text-[#154D71] hover:bg-[#33A1E0]/20 border border-[#33A1E0]'
              }`}
            >
              <tab.icon size={20} weight={activeTab === tab.id ? "fill" : "regular"} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#33A1E0]/30 rounded-[2rem] transform -rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] transform transition-transform duration-500">
              <img
                ref={imageRef}
                src={activeContent.image}
                alt={activeContent.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-6 left-6">
                <div className="bg-[#03045e] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
                  <Target size={24} weight="fill" />
                  {activeContent.title}
                </div>
              </div>
            </div>
          </div>

          {/* Text Content Side */}
          <div ref={contentRef} className="bg-white/90 rounded-3xl p-8 sm:p-10 shadow-xl border border-[#33A1E0] ring-1 ring-[#33A1E0]/50">
            <h3 className="text-3xl font-bold text-[#154D71] mb-8 border-l-4 border-[#03045e] pl-4">
              {activeContent.title}
            </h3>
            
            <div className="space-y-6">
              {activeContent.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-[#33A1E0]/20 flex items-center justify-center group-hover:bg-[#33A1E0]/40 transition-colors">
                    <CheckCircle size={18} className="text-[#03045e]" weight="bold" />
                  </div>
                  <p className="text-[#154D71] leading-relaxed font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
