import { motion } from "framer-motion";
import { FeaturedBrochureSection } from "../components/FeaturedBrochureSection";
import { Target, Eye, Heart, CheckCircle, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

// Counter Component
const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 16); // 60fps

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export default function About() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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

      {/* Power Flow Journey Video Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              The Power Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From generation to your doorstep - Experience the complete journey of electrical power
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
              <video
                className="w-full h-auto"
                controls
                autoPlay
                muted
                loop
                playsInline
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src="/Power_Infrastructure_Animation_Prompt.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Video Overlay - shown when video is paused */}
              {!isVideoPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#0047FF]/80 via-[#7A00FF]/80 to-[#00C853]/80 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    const video = e.currentTarget.previousElementSibling as HTMLVideoElement;
                    video?.play();
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Play size={32} className="text-[#0047FF] ml-1" fill="currentColor" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            {/* Power Flow Stages */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { stage: "Generation", icon: "⚡", color: "from-yellow-400 to-orange-500" },
                { stage: "Transmission", icon: "🔌", color: "from-blue-400 to-blue-600" },
                { stage: "Distribution", icon: "📡", color: "from-purple-400 to-purple-600" },
                { stage: "House", icon: "🏠", color: "from-green-400 to-green-600" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-4 rounded-xl shadow-md text-center border border-gray-200"
                >
                  <div className={`text-3xl mb-2 bg-gradient-to-br ${item.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto`}>
                    {item.icon}
                  </div>
                  <div className="text-sm font-semibold text-gray-700">{item.stage}</div>
                </motion.div>
              ))}
            </div>
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
                  Founded in 2009, Ayyappan & Co has grown from a small
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#0047FF] via-[#7A00FF] to-[#00C853]">
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                      className="text-8xl font-bold mb-4 drop-shadow-2xl"
                    >
                      <Counter end={14} suffix="+" />
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-3xl font-semibold tracking-wide"
                    >
                      Years of Excellence
                    </motion.div>
                  </div>
                </div>
                {/* Animated circles background */}
                <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
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
                { number: 100, label: "Projects Done", suffix: "+" },
                { number: 500, label: "Expert Technicians", suffix: "+" },
                { number: 100, label: "Client Satisfaction", suffix: "%" },
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
                    <Counter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      <FeaturedBrochureSection />
    </div>
  );
}