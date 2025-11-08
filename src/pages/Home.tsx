import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Users,
  Briefcase,
  ChevronDown,
  Power,
  Network,
  Building2,
} from 'lucide-react';
import { Hero3D } from '../components/Hero3D';
import { useStore } from '../store/useStore';
import { supabase, Service, Project, Client } from '../lib/supabase';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  power: Power as React.ComponentType<{ size?: number; className?: string }>,
  network: Network as React.ComponentType<{ size?: number; className?: string }>,
  building: Building2 as React.ComponentType<{ size?: number; className?: string }>,
};

// CLIENTS CAROUSEL COMPONENT
function ClientsCarousel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data) setClients(data);
      setLoading(false);
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading clients...</p>
        </div>
      </div>
    );
  }

  if (clients.length === 0) return null;

  const duplicatedClients = [...clients, ...clients];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Our Valued Clients</h2>
          <p className="text-xl text-gray-600">Trusted by leading organizations across India</p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <motion.div
          className="flex gap-12"
          animate={{ x: [0, -100 * clients.length] }}
          transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' } }}
        >
          {duplicatedClients.map((client, index) => (
            <motion.div
              key={`${client.id}-${index}`}
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0 w-48 h-32 bg-white rounded-xl shadow-md border border-gray-100 flex items-center justify-center p-6"
            >
              {client.logo_url ? (
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-1">{client.name.charAt(0)}</div>
                  <div className="text-xs text-gray-500 font-medium">{client.name}</div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// HOME PAGE COMPONENT
export default function Home() {
  const { setCurrentPage, setSelectedServiceId, setSelectedProjectId } = useStore();
  const [stats, setStats] = useState({ years_experience: 14, total_projects: 100, total_technicians: 500 });
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Stats
      const { data: statsData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'company_info')
        .maybeSingle();

      if (statsData?.value) {
        const val = statsData.value as any;
        setStats({
          years_experience: val.years_experience || 14,
          total_projects: val.total_projects || 100,
          total_technicians: val.total_technicians || 500,
        });
      }

      // Services
      const { data: serviceData } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
        .limit(3);
      if (serviceData) setServices(serviceData);

      // Projects
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

  const statsData = [
    { icon: Award, value: `${stats.years_experience}+`, label: 'Years Experience' },
    { icon: Briefcase, value: `${stats.total_projects}+`, label: 'Projects Completed' },
    { icon: Users, value: `${stats.total_technicians}+`, label: 'Skilled Technicians' },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-30">
          <Hero3D />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        <motion.div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#0047FF] via-[#7A00FF] to-[#00C853] bg-clip-text text-transparent"
          >
            Engineering India's <br /> Power Infrastructure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
          >
            Leading the way in transmission lines, distribution networks, and substation construction with excellence and innovation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPage('projects')}
              className="px-8 py-4 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:shadow-2xl transition-shadow"
            >
              Explore Projects <ArrowRight size={20} />
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

      {/* STATS */}
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

      {/* SERVICES */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-2xl shadow border hover:shadow-lg transition"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center mx-auto">
                  {iconMap[service.icon]
                    ? React.createElement(iconMap[service.icon], { size: 28, className: 'text-[#0047FF]' })
                    : <Power size={28} className="text-[#0047FF]" />}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#0047FF]">{service.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                <Link
                  to={`/services/${service.id}`}
                  onClick={() => setSelectedServiceId(service.id)}
                  className="text-[#0047FF] hover:underline font-medium"
                >
                  Read More →
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-12">
            <Link
              to="/services"
              className="inline-block bg-gradient-to-r from-[#0047FF] to-[#00C853] text-white px-8 py-4 rounded-xl shadow hover:shadow-lg transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12 text-gray-900">Our Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white rounded-2xl shadow border hover:shadow-lg transition cursor-pointer"
              >
                {project.thumbnail_url && (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-2xl font-semibold mb-3 text-[#7A00FF]">{project.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                <Link
                  to={`/projects/${project.id}`}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="text-[#7A00FF] hover:underline font-medium"
                >
                  View Details →
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/projects"
              className="inline-block bg-gradient-to-r from-[#0047FF] to-[#00C853] text-white px-8 py-4 rounded-xl shadow hover:shadow-lg transition"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <ClientsCarousel />
    </div>
  );
}
