import { Toaster } from 'sonner'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { WhyChooseUs } from '@/components/WhyChooseUs'
import { Products } from '@/components/Products'
import { TechnologyShowcase } from '@/components/TechnologyShowcase'
import { Specifications } from '@/components/Specifications'
import { Certifications } from '@/components/Certifications'
import { Gallery } from '@/components/Gallery'
import { Clients } from '@/components/Clients'
import { Services } from '@/components/Services'
import { Team } from '@/components/Team'
import { FeaturedProject } from '@/components/FeaturedProject'
import { DetailedServices } from '@/components/DetailedServices'
import { CompanyValues } from '@/components/CompanyValues'
import {Swiper} from '@/components/Swiper'
import { Testimonials } from '@/components/Testimonials'

import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

function App() {
  return (
    <div className="relative min-h-screen bg-[#90e0ef]/50 smooth-scroll">
      <Toaster position="top-right" richColors />
      <Header />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <Products />
        <TechnologyShowcase />
        <Specifications />
        <Certifications />
        <Gallery />
        <CompanyValues />
        <Clients />
        <Services />
        <FeaturedProject />
        <DetailedServices />
        <Team />
        <Swiper />
        <Testimonials />

        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App