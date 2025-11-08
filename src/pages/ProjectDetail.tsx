import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar, User, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Project } from '../lib/supabase';
import { useStore } from '../store/useStore';

export default function ProjectDetail() {
  const { selectedProjectId, setSelectedProjectId } = useStore();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    const fetchProject = async () => {
      if (!selectedProjectId) return;

      const { data } = await supabase.from('projects').select('*').eq('id', selectedProjectId).maybeSingle();

      if (data) {
        setProject(data);
        setSelectedImage(data.thumbnail_url || '');
      }
      setLoading(false);
    };

    fetchProject();
  }, [selectedProjectId]);

  if (!selectedProjectId) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">No project selected</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading project details...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-xl text-gray-600">Project not found</div>
      </div>
    );
  }

  const galleryImages = project.gallery_urls || [];
  const allImages = project.thumbnail_url ? [project.thumbnail_url, ...galleryImages] : galleryImages;

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <section className="py-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setSelectedProjectId(null)}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>
              {project.is_featured && (
                <span className="px-3 py-1 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white text-sm font-semibold rounded-full">
                  Featured Project
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Tag size={20} className="text-[#0047FF]" />
                <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={20} className="text-[#00C853]" />
                <span>{project.client_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#7A00FF]" />
                <span>{project.location}</span>
              </div>
              {project.completion_year && (
                <div className="flex items-center gap-2">
                  <Calendar size={20} className="text-[#00C853]" />
                  <span>{project.completion_year}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="mb-8">
                <div className="relative h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-lg">
                  {selectedImage ? (
                    <img src={selectedImage} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <div className="text-8xl font-bold mb-4">{project.title.charAt(0)}</div>
                        <div className="text-xl">No Image Available</div>
                      </div>
                    </div>
                  )}
                </div>

                {allImages.length > 1 && (
                  <div className="mt-6 grid grid-cols-4 md:grid-cols-6 gap-4">
                    {allImages.map((img, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedImage(img)}
                        className={`relative h-20 bg-gray-200 rounded-lg overflow-hidden cursor-pointer ${
                          selectedImage === img ? 'ring-4 ring-[#0047FF]' : ''
                        }`}
                      >
                        <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="prose prose-lg max-w-none">
                <h2 className="text-3xl font-bold mb-4 text-gray-900">Project Overview</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{project.description}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Category</div>
                    <div className="font-semibold text-gray-900">{project.category}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Client</div>
                    <div className="font-semibold text-gray-900">{project.client_name}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Location</div>
                    <div className="font-semibold text-gray-900">{project.location}</div>
                  </div>
                  {project.completion_year && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Completion Year</div>
                      <div className="font-semibold text-gray-900">{project.completion_year}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#0047FF] via-[#7A00FF] to-[#00C853] p-6 rounded-2xl text-white">
                <h3 className="text-xl font-bold mb-4">Similar Projects</h3>
                <p className="text-white/90 mb-4">
                  Interested in learning more about similar projects or discussing your requirements?
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    useStore.getState().setCurrentPage('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full px-6 py-3 bg-white text-[#0047FF] font-semibold rounded-lg hover:shadow-lg transition-shadow"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
