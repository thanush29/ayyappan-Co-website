import founderImage from '@/assets/founder.png'
import ceoImage from '@/assets/founder2.jpg'

export function Team() {
  const stats = [
    { title: '300+ Professionals', desc: 'Dedicated in-house engineering and field team' },
    { title: '30+ Years', desc: 'Proven delivery of substation and transmission projects' },
    { title: 'TNEB Class I', desc: 'Certified leadership across EHV projects' },
    { title: '24/7 Support', desc: 'Project governance and client success focus' },
  ]

  return (
    <section id="team" className="relative py-16 overflow-hidden lg:py-20 bg-white/70">
      <div className="max-w-[1400px] px-4 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* Founder Card */}
          <div className="space-y-4  max-w-[550px]">
            <div className='flex items-end gap-6'>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#E2E8F0]/80 bg-white/70 aspect-[4/5] md:w-[300px] md:h-[240px]">
              <img
                src={founderImage}
                alt="Company Founder"
                className="object-cover object-center w-full h-full"
                loading="lazy"
              />
            </div>
           <div className='flex flex-col'>
             <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#03045e]">Founder</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#03045e] leading-tight">
           S.Ayyappan (late)
           
Founder | Chairman
            </h2>
           </div>
            </div>
            <p className="text-base text-[#475569] leading-relaxed">
              With over 30+ years of EPC excellence, Ayyappan lead Ayyappan & Co with a focus on reliability,
              safety, and precision-engineered solutions across transmission line and substation projects.
            </p>
          </div>

          {/* CEO Card */}
                   <div className="space-y-4  max-w-[550px]">

            <div className='flex items-end gap-6'>

            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-[#E2E8F0]/80 bg-white/70 aspect-[4/5] md:w-[300px] md:h-[240px]">
              <img
                src={ceoImage}
                alt="Company CEO"
                className="object-cover object-center w-full h-full"
                loading="lazy"
              />
            </div>
            <div className='flex flex-col'>
           <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#03045e]">CEO</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#03045e] leading-tight">
         Mariappan Ayyappan                                   
 Chief Executive Officer
            </h2>
            </div>
            </div>
           
            <p className="text-base text-[#475569] leading-relaxed">
              As CEO, Mariappan Ayyappan ensures every project meets rigorous safety and quality standards while guiding
              teams to deliver on time and within budget for utilities and independent power producers.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.title}
              className="p-5 rounded-2xl border border-[#E2E8F0] bg-white/80 shadow-sm min-h-[140px] flex flex-col gap-2"
            >
              <div className="text-xl font-semibold text-[#03045e]">{item.title}</div>
              <div className="text-sm text-[#475569] leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
