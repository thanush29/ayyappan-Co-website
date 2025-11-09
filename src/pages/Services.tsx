import { motion } from 'framer-motion';
import { ArrowRight, Power, Network, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Service, getImageUrl } from '../lib/supabase';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  power: Power as React.ComponentType<{ size?: number; className?: string }>,
  network: Network as React.ComponentType<{ size?: number; className?: string }>,
  building: Building2 as React.ComponentType<{ size?: number; className?: string }>,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data) setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);


  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0047FF] via-[#7A00FF] to-[#00C853] bg-clip-text text-transparent"
          >
            Our Services
          </motion.h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Comprehensive power infrastructure solutions tailored to meet your needs
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Power;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border flex flex-col"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mb-6">
                  <IconComponent size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{service.description}</p>

                <Link
                  to={`/services/${service.id}`}
                  className="flex items-center gap-2 text-[#0047FF] font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
