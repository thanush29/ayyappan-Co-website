import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Power, Network, Building2 } from 'lucide-react';
import { VideoCarousel } from '../components/VideoCarousel';
import { ClientsCarousel } from '../components/ClientsCarousel';
import { useStore } from '../store/useStore';
import { supabase, Service, Project } from '../lib/supabase';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  power: Power as React.ComponentType<{ size?: number; className?: string }>,
  network: Network as React.ComponentType<{ size?: number; className?: string }>,
  building: Building2 as React.ComponentType<{ size?: number; className?: string }>,
};

export default function Home() {
  const { setSelectedServiceId, setSelectedProjectId } = useStore();
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: serviceData } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
        .limit(3);
      if (serviceData) setServices(serviceData);

      const { data: projectData } = await supabase
        .from('projects')
        .select('*')
        .order('display_order')
        .limit(3);
      if (projectData) setProjects(projectData);

      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading homepage content...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-screen">
        <VideoCarousel />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
              Engineering India's <br /> Power Infrastructure
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto drop-shadow-lg">
              Leading the way in transmission lines, distribution networks, and substation construction with excellence and innovation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl transition-shadow"
                >
                  Explore Projects <ArrowRight size={20} />
                </motion.button>
              </Link>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/50 rounded-lg text-lg font-semibold hover:bg-white/30 transition-colors"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                About Ayyappan & Co
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  Founded in 2010, Ayyappan & Co has grown from a small electrical contracting firm to one of India's leading power infrastructure companies. Our journey has been marked by a relentless pursuit of excellence and a commitment to powering India's growth.
                </p>
                <p>
                  With over 100 successfully completed projects across transmission lines, distribution networks, and substations, we have established ourselves as a trusted partner for utilities, government agencies, and private sector clients.
                </p>
              </div>
              <Link to="/about">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white rounded-lg text-lg font-semibold hover:shadow-lg transition-shadow flex items-center gap-2"
                >
                  Read More <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src="/company.jpg"
                alt="Ayyappan & Co"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="24" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ECompany Image%3C/text%3E%3C/svg%3E';
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive power infrastructure solutions</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mx-auto mb-6">
                  {iconMap[service.icon]
                    ? React.createElement(iconMap[service.icon], { size: 32, className: 'text-white' })
                    : <Power size={32} className="text-white" />}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3">{service.description}</p>
                <Link
                  to={`/services/${service.id}`}
                  onClick={() => setSelectedServiceId(service.id)}
                  className="inline-flex items-center gap-2 text-[#0047FF] hover:text-[#7A00FF] font-semibold transition-colors"
                >
                  Read More <ArrowRight size={18} />
                </Link>
              </motion.div>
            ))}
          </div>

          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#00C853] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg font-semibold"
            >
              View All Services
            </motion.button>
          </Link>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Featured Projects</h2>
            <p className="text-xl text-gray-600">Showcasing our commitment to excellence</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                onClick={() => setSelectedProjectId(project.id)}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <div className="text-6xl font-bold mb-2">{project.title.charAt(0)}</div>
                          <div className="text-sm">No Image</div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#7A00FF]/10 to-[#00C853]/10 text-[#7A00FF] text-sm font-semibold rounded-full mb-3">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                    <span className="inline-flex items-center gap-2 text-[#7A00FF] hover:text-[#0047FF] font-semibold transition-colors">
                      View Details <ArrowRight size={18} />
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#00C853] text-white rounded-xl shadow-lg hover:shadow-xl transition-shadow text-lg font-semibold"
            >
              View All Projects
            </motion.button>
          </Link>
        </div>
      </section>

      <ClientsCarousel />
    </div>
  );
}
