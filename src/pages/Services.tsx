import { motion } from 'framer-motion';
import { ArrowRight, Power, Network, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Service } from '../lib/supabase';
import { useStore } from '../store/useStore';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  power: Power,
  network: Network,
  building: Building2,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedServiceId } = useStore();

  useEffect(() => {
    const fetchServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data) {
        setServices(data);
      }
      setLoading(false);
    };

    fetchServices();
  }, []);

  const handleReadMore = (serviceId: string) => {
    setSelectedServiceId(serviceId);
  };

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
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0047FF] via-[#7A00FF] to-[#00C853] bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Comprehensive power infrastructure solutions tailored to meet your needs
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-[#0047FF] to-[#7A00FF] rounded-xl flex items-center justify-center mb-6">
                    <IconComponent size={32} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{service.description}</p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReadMore(service.id)}
                    className="flex items-center gap-2 text-[#0047FF] font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight size={20} />
                  </motion.button>
                </motion.div>
              );
            })}
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
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-900">Why Our Services Stand Out</h2>
            <p className="text-xl text-gray-600 mb-12">
              We combine technical expertise, innovative solutions, and dedicated support to deliver exceptional results
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {[
                {
                  title: 'End-to-End Solutions',
                  description: 'From initial planning and design to final commissioning and maintenance',
                },
                {
                  title: 'Certified Professionals',
                  description: 'Team of highly skilled and certified engineers and technicians',
                },
                {
                  title: 'Latest Technology',
                  description: 'Utilizing cutting-edge equipment and modern construction techniques',
                },
                {
                  title: '24/7 Support',
                  description: 'Round-the-clock support for emergency maintenance and troubleshooting',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
                >
                  <div className="w-2 h-12 bg-gradient-to-b from-[#0047FF] to-[#00C853] rounded-full mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
