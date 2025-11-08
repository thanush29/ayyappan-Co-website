import { motion } from 'framer-motion';
import { MapPin, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Project } from '../lib/supabase';
import { useStore } from '../store/useStore';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const { setSelectedProjectId } = useStore();

  useEffect(() => {
    const fetchProjects = async () => {
      let query = supabase.from('projects').select('*').order('is_featured', { ascending: false }).order('display_order');

      const { data } = await query;

      if (data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const categories = ['all', 'Transmission', 'Distribution', 'Substation'];

  const filteredProjects = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading projects...</div>
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
              Our Projects
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              Showcasing our commitment to excellence in power infrastructure development
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  filter === category
                    ? 'bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => setSelectedProjectId(project.id)}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-100 group"
                >
                  {project.is_featured && (
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white text-sm font-semibold rounded-full">
                      Featured
                    </div>
                  )}

                  <div className="relative h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                    <div className="inline-block px-3 py-1 bg-gradient-to-r from-[#0047FF]/10 to-[#7A00FF]/10 text-[#0047FF] text-sm font-semibold rounded-full mb-3">
                      {project.category}
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-[#0047FF] transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-[#0047FF]" />
                        <span>{project.client_name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-[#00C853]" />
                        <span>{project.location}</span>
                      </div>
                      {project.completion_year && (
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-[#7A00FF]" />
                          <span>{project.completion_year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
