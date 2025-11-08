import { motion } from "framer-motion";
import { Target, Eye, Heart, CheckCircle } from "lucide-react";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  };

  const values = [
    {
      icon: CheckCircle,
      title: "Quality",
      description:
        "Uncompromising commitment to delivering the highest quality infrastructure",
    },
    {
      icon: Heart,
      title: "Safety",
      description:
        "Prioritizing the safety of our team, clients, and communities",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Continuous improvement and innovation in everything we do",
    },
    {
      icon: Eye,
      title: "Integrity",
      description:
        "Building trust through transparent and ethical business practices",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0047FF] via-[#7A00FF] to-[#00C853] bg-clip-text text-transparent">
              About Ayyappan & Co
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Building India's power infrastructure with innovation, integrity,
              and excellence for over 14 years
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2010, Ayyappan & Co has grown from a small
                  electrical contracting firm to one of India's leading power
                  infrastructure companies. Our journey has been marked by a
                  relentless pursuit of excellence and a commitment to powering
                  India's growth.
                </p>
                <p>
                  With over 100 successfully completed projects across
                  transmission lines, distribution networks, and substations, we
                  have established ourselves as a trusted partner for utilities,
                  government agencies, and private sector clients.
                </p>
                <p>
                  Our team of 500+ skilled professionals brings together decades
                  of collective experience, combining traditional engineering
                  expertise with modern technology to deliver world-class
                  infrastructure solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF]/20 via-[#7A00FF]/20 to-[#00C853]/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-2">14+</div>
                  <div className="text-2xl">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              {...fadeInUp}
              className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Our Vision
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be India's most trusted and innovative power infrastructure
                company, recognized for engineering excellence, sustainable
                practices, and unwavering commitment to powering the nation's
                growth and development.
              </p>
            </motion.div>

            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#7A00FF] to-[#00C853] rounded-xl flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-gray-900">
                Our Mission
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To deliver world-class power transmission and distribution
                infrastructure through innovative engineering solutions, skilled
                workforce, and commitment to safety, quality, and customer
                satisfaction, while contributing to India's energy security and
                economic progress.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-md border border-gray-100"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mb-4">
                  <value.icon size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Committed to Excellence</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Every project we undertake is a testament to our dedication to
              quality, safety, and innovation. We don't just build
              infrastructure – we power progress and create lasting value for
              our clients and communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { number: "100%", label: "Safety Compliance" },
                { number: "98%", label: "Client Satisfaction" },
                { number: "100+", label: "Projects Delivered" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
                >
                  <div className="text-4xl font-bold text-[#00C853] mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
