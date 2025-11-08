import { motion } from 'framer-motion';
import { ArrowRight, Award, Users, Briefcase, ChevronDown } from 'lucide-react';
import { Hero3D } from '../components/Hero3D';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function Home() {
  const { setCurrentPage } = useStore();
  const [stats, setStats] = useState({
    years_experience: 14,
    total_projects: 100,
    total_technicians: 500,
  });

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'company_info')
        .maybeSingle();

      if (data?.value) {
        setStats({
          years_experience: (data.value as { years_experience?: number }).years_experience || 14,
          total_projects: (data.value as { total_projects?: number }).total_projects || 100,
          total_technicians: (data.value as { total_technicians?: number }).total_technicians || 500,
        });
      }
    };

    fetchCompanyInfo();
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const statsData = [
    { icon: Award, value: `${stats.years_experience}+`, label: 'Years Experience' },
    { icon: Briefcase, value: `${stats.total_projects}+`, label: 'Projects Completed' },
    { icon: Users, value: `${stats.total_technicians}+`, label: 'Skilled Technicians' },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <Hero3D />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />

        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="relative z-10 container mx-auto px-4 text-center text-white"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0047FF] via-[#7A00FF] to-[#00C853] bg-clip-text text-transparent"
          >
            Engineering India's
            <br />
            Power Infrastructure
          </motion.h1>

          <motion.p variants={fadeInUp} className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
            Leading the way in transmission lines, distribution networks, and substation construction with excellence and innovation.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('projects')}
              className="px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl transition-shadow"
            >
              Explore Projects
              <ArrowRight size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('contact')}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Contact Us
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Impact</h2>
            <p className="text-xl text-gray-600">Delivering excellence across India's power sector</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <stat.icon size={32} className="text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-gray-900">{stat.value}</h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Why Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine technical expertise with innovative solutions to deliver world-class power infrastructure projects
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Proven Expertise',
                description: 'Over 14 years of experience in power infrastructure development',
              },
              {
                title: 'Quality Assurance',
                description: 'ISO certified processes ensuring the highest quality standards',
              },
              {
                title: 'Timely Delivery',
                description: 'Track record of completing projects within scheduled timelines',
              },
              {
                title: 'Safety First',
                description: 'Comprehensive safety protocols protecting our team and your assets',
              },
              {
                title: 'Skilled Workforce',
                description: '500+ trained technicians and engineers at your service',
              },
              {
                title: 'End-to-End Solutions',
                description: 'Complete project management from planning to commissioning',
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
              >
                <div className="w-2 h-12 bg-gradient-to-b from-[#0047FF] to-[#00C853] rounded-full mb-4" />
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
