import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { MapPin, Phone, Envelope, Clock } from '@phosphor-icons/react'
import { toast } from 'sonner'
import certificationImage from '@/assets/iso9001.jpg'

gsap.registerPlugin(ScrollTrigger)

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const titleRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const contactCardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial visibility
      gsap.set([titleRef.current, formRef.current, ctaRef.current], { opacity: 1 })
      if (contactCardsRef.current?.children) {
        gsap.set(contactCardsRef.current.children, { opacity: 1 })
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

      gsap.from(formRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 85%',
        },
      })

      if (contactCardsRef.current?.children) {
        gsap.from(contactCardsRef.current.children, {
          opacity: 0,
        
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contactCardsRef.current,
            start: 'top 85%',
          },
        })
      }

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 85%',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Message sent successfully! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      message: '',
    })
    setIsSubmitting(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

const contactInfo = [
  {
    icon: MapPin,
    title: 'Head Office',
    details: [
      'No:5/107-D1, Meenakshi Nagar,',
      'A.Salaipudur, Kovilpatti - 628502',
      'Tamil Nadu, India',
    ],
    color: 'bg-[#03045e]',
  },
 
  
  {
    icon: Phone,
    title: 'Call Us',
    details: [
      '04632-242528',
      '+91 94421 52528',
      'Mon–Sat: 9:00 AM - 6:00 PM',
    ],
    color: 'bg-[#03045e]',
  },
  {
    icon: Envelope,
    title: 'Email Us',
    details: [
      'info@ayyappanco.com ',
    ],
    color: 'bg-[#03045e]',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Saturday', '9:00 AM - 6:00 PM', 'Sunday: Closed'],
    color: 'bg-[#03045e]',
  },
]


  return (
    <section id="contact" className="relative py-12 overflow-hidden sm:py-16 lg:py-20 bg-white/70">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#03045e]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#03045e]/20 rounded-full blur-3xl"></div>
      <div className="relative z-10 px-4 mx-auto max-w-[1440px] sm:px-6 lg:px-8">
      <div ref={titleRef} className="mb-8 text-center sm:mb-10">
        <span className="inline-block px-4 py-2 bg-[#03045e] text-white font-bold rounded-full text-sm mb-4 shadow-lg shadow-[#03045e]/25">Contact Us</span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#03045e] mb-3 sm:mb-4">
        Get in Touch <span className='text-[#03045e]'>
          with Us
        </span>
        </h2>
        <p className="text-sm sm:text-base text-[#64748B] max-w-3xl mx-auto">
        Have a project inquiry or need technical consultation? Our team of experts is ready  
        to discuss your EHV substation and transmission line requirements.
        </p>
      </div>

      <div className="grid gap-8 mb-8 overflow-hidden lg:grid-cols-2">
        <div ref={formRef}>
        <Card className="p-6 border-0 shadow-xl bg-white/70">
          <h3 className="text-xl font-semibold text-[#03045e] mb-5">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
            <Label htmlFor="name" className="text-[#03045e]">Full Name *</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-[#E2E8F0]  focus:border-[#03045e]"
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="email" className="text-[#03045e]">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-[#E2E8F0] focus:border-[#03045e]"
            />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
            <Label htmlFor="phone" className="text-[#03045e]">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 1234567890"
              value={formData.phone}
              onChange={handleChange}
              className="border-[#E2E8F0] focus:border-[#03045e]"
            />
            </div>
            <div className="space-y-2">
            <Label htmlFor="company" className="text-[#03045e]">Company Name</Label>
            <Input
              id="company"
              name="company"
              placeholder="Your Company"
              value={formData.company}
              onChange={handleChange}
              className="border-[#E2E8F0] focus:border-[#03045e]"
            />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#03045e]">Message *</Label>
            <Textarea
            id="message"
            name="message"
            placeholder="Tell us about your requirements..."
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            className="border-[#E2E8F0] focus:border-[#03045e]"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#03045e] hover:bg-[#03045e] text-white shadow-lg shadow-[#03045e]/30"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>
          </form>
        </Card>
        </div>

        <div ref={contactCardsRef} className="w-full space-y-4" style={{ opacity: 1 }}>
        {contactInfo.map((info) => (
          <Card key={info.title} className={`p-4 sm:p-5 border-0 ${info.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group w-full`} style={{ opacity: 1 }}>
          <div className="flex items-start w-full gap-2 sm:gap-4">
            <div className="flex items-center justify-center transition-transform rounded-lg shrink-0 w-9 h-9 sm:w-11 sm:h-11 bg-white/15 group-hover:scale-110">
            <info.icon size={18} className="text-white sm:hidden" weight="duotone" />
            <info.icon size={20} className="hidden text-white sm:block" weight="duotone" />
            </div>
            <div className="flex-1 min-w-0">
            <h4 className="mb-1 text-sm font-semibold text-white sm:text-base">{info.title}</h4>
            {info.details.map((detail) => (
              <p key={detail} className="text-xs sm:text-sm text-white/80">
              {detail}
              </p>
            ))}
            </div>
          </div>
          </Card>
        ))}
        </div>
      </div>

      <div ref={ctaRef}>
        <Card className="p-5 lg:p-6 bg-[#03045e] border-none shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#03045e]/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#03045e]/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center">
          <h3 className="mb-3 text-xl font-semibold text-white">Ready to Power Your Next Project?</h3>
          <p className="max-w-2xl mx-auto mb-5 text-sm text-white/70">
          Whether you're a power utility, independent power producer, or industrial facility, we provide complete 
          EHV infrastructure solutions. Our team is ready to help you with technical consultation, project estimation, 
          and turnkey execution.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1.5 text-xs font-semibold text-[#03045e] bg-[#03045e] rounded-full shadow">Free Project Consultation</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-white bg-[#03045e] rounded-full shadow">TNEB Class I Certified</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-white bg-[#03045e] rounded-full shadow">Turnkey Solutions</span>
          <span className="px-3 py-1.5 text-xs font-semibold text-white bg-[#03045e] rounded-full shadow border border-white/20">30 Years Experience</span>
          </div>
        </div>
        </Card>
      </div>

      <div className="mt-8">
        <Card className="overflow-hidden border-0 shadow-xl">
        <div className="p-4 text-center bg-[#03045e]">
          <h3 className="text-lg font-semibold text-white">Our Location</h3>
        </div>
       <div className='flex items-center justify-center gap-4'>
         <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.918369823956!2d80.250267!3d13.0408678!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526700742fb955%3A0xe95d30601d229b5a!2sAyyappan%20%26%20Co%20Chennai%20Headquarters!5e0!3m2!1sen!2sin!4v1765518319754!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15755.398035224958!2d77.8484443088864!3d9.16804513805875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06b3993a3f6e67%3A0x76c5001d524bff58!2sAyyappan%20%26%20Co!5e0!3m2!1sen!2sin!4v1765546615932!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full"
        />
       </div>
        </Card>
      </div>
      
      </div>
    </section>
  )
}

