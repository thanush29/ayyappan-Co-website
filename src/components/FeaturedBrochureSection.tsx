import { motion } from "framer-motion";
import { Download } from "lucide-react";

export function FeaturedBrochureSection() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-gray-50 to-[#eef2ff] overflow-hidden">
      {/* background accent blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,71,255,0.3),_transparent_70%)] pointer-events-none"
      />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          We provide comprehensive solutions for
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-[#7A00FF]">
            Transmission Line Projects
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl mx-auto text-gray-600 mb-10 leading-relaxed"
        >
          Our team specializes in engineering, procurement, and construction of
          high-voltage transmission lines under any terrain and climate.
          Explore our capabilities and track record in the brochure below.
        </motion.p>

        <motion.a
          href="/Ayyappanco_Company_Profile.pdf"
          download
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white shadow-lg bg-gradient-to-r from-[#0047FF] to-[#7A00FF] hover:from-[#0030cc] hover:to-[#6600cc] focus:outline-none focus:ring-4 focus:ring-[#0047FF]/40"
        >
          <Download size={20} />
          Download Brochure
        </motion.a>
      </div>

      {/* decorative gradient blur bottom */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 0.3, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#0047FF] to-[#7A00FF] blur-3xl rounded-full"
      />
    </section>
  );
}
