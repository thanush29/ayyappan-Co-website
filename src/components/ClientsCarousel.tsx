import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase, Client } from '../lib/supabase';

export function ClientsCarousel() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('display_order');

      if (data) {
        setClients(data);
      }
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

  if (clients.length === 0) {
    return null;
  }

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
          animate={{
            x: [0, -100 * clients.length],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 30,
              ease: 'linear',
            },
          }}
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
