import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase, Project } from '../../lib/supabase';
import { uploadFile, generateFileName } from '../../lib/storage';

export function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client_name: '',
    location: '',
    category: 'Transmission',
    completion_year: new Date().getFullYear(),
    thumbnail_url: '',
    gallery_urls: [] as string[],
    is_featured: false,
    display_order: 0,
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('display_order');
    if (data) {
      setProjects(data);
    }
    setLoading(false);
  };

  const handleThumbnailUpload = async (file: File) => {
    setUploading(true);
    const filePath = generateFileName('projects', file);
    const result = await uploadFile('media', filePath, file);
    setUploading(false);

    if (result.error) {
      alert('Failed to upload thumbnail: ' + result.error.message);
      return;
    }

    setFormData({ ...formData, thumbnail_url: result.publicUrl });
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const filePath = generateFileName('projects', file);
      const result = await uploadFile('media', filePath, file);
      return result.error ? null : result.publicUrl;
    });

    const results = await Promise.all(uploadPromises);
    const successUrls = results.filter((url): url is string => url !== null);

    setFormData({
      ...formData,
      gallery_urls: [...formData.gallery_urls, ...successUrls]
    });
    setUploading(false);
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = formData.gallery_urls.filter((_, i) => i !== index);
    setFormData({ ...formData, gallery_urls: newGallery });
  };

  const handleCreate = async () => {
    const { error } = await supabase.from('projects').insert({
      ...formData,
      gallery_urls: formData.gallery_urls,
    });
    if (!error) {
      setCreating(false);
      resetForm();
      fetchProjects();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .update({
        ...formData,
        gallery_urls: formData.gallery_urls,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id);
    if (!error) {
      setEditing(null);
      resetForm();
      fetchProjects();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (!error) {
        fetchProjects();
      }
    }
  };

  const startEdit = (project: Project) => {
    setEditing(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      client_name: project.client_name,
      location: project.location,
      category: project.category,
      completion_year: project.completion_year || new Date().getFullYear(),
      thumbnail_url: project.thumbnail_url || '',
      gallery_urls: Array.isArray(project.gallery_urls) ? project.gallery_urls : [],
      is_featured: project.is_featured,
      display_order: project.display_order,
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      client_name: '',
      location: '',
      category: 'Transmission',
      completion_year: new Date().getFullYear(),
      thumbnail_url: '',
      gallery_urls: [],
      is_featured: false,
      display_order: 0,
    });
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading projects...</div>;
  }

  const renderForm = (onSubmit: () => void, onCancel: () => void, submitLabel: string) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
          <input
            type="text"
            value={formData.client_name}
            onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          >
            <option value="Transmission">Transmission</option>
            <option value="Distribution">Distribution</option>
            <option value="Substation">Substation</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Completion Year</label>
          <input
            type="number"
            value={formData.completion_year}
            onChange={(e) => setFormData({ ...formData, completion_year: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail Image</label>
          <div className="flex items-start gap-4">
            {formData.thumbnail_url && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={formData.thumbnail_url}
                  alt="Thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0047FF] hover:bg-blue-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {uploading ? (
                    <div className="text-[#0047FF] font-medium">Uploading...</div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">Click to upload thumbnail</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleThumbnailUpload(file);
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
          {formData.gallery_urls.length > 0 && (
            <div className="grid grid-cols-4 gap-4 mb-4">
              {formData.gallery_urls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#0047FF] hover:bg-blue-50 transition-colors">
            <div className="flex flex-col items-center justify-center">
              {uploading ? (
                <div className="text-[#0047FF] font-medium">Uploading...</div>
              ) : (
                <>
                  <Upload className="w-6 h-6 mb-1 text-gray-400" />
                  <p className="text-xs text-gray-600">Click to upload gallery images (multiple)</p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => {
                if (e.target.files) handleGalleryUpload(e.target.files);
              }}
              disabled={uploading}
            />
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-5 h-5 text-[#0047FF] rounded focus:ring-2 focus:ring-[#0047FF]"
            />
            <span className="text-sm font-medium text-gray-700">Featured Project</span>
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmit}
          disabled={uploading}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white rounded-lg font-semibold disabled:opacity-50"
        >
          <Save size={18} />
          {submitLabel}
        </motion.button>
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Projects Management</h1>
          <p className="text-gray-600">Manage your company projects</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setCreating(true);
            resetForm();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white rounded-lg font-semibold"
        >
          <Plus size={20} />
          Add Project
        </motion.button>
      </div>

      <AnimatePresence>
        {creating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Create New Project</h3>
              <button onClick={() => setCreating(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {renderForm(handleCreate, () => setCreating(false), 'Create')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            {editing === project.id ? (
              renderForm(() => handleUpdate(project.id), () => {
                setEditing(null);
                resetForm();
              }, 'Save')
            ) : (
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  {project.thumbnail_url ? (
                    <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <ImageIcon size={32} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      {project.is_featured && (
                        <span className="px-2 py-1 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Client:</span>
                        <p className="font-medium text-gray-900">{project.client_name}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="font-medium text-gray-900">{project.location}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Year:</span>
                        <p className="font-medium text-gray-900">{project.completion_year || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Order:</span>
                        <p className="font-medium text-gray-900">{project.display_order}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEdit(project)}
                    className="p-2 text-[#0047FF] hover:bg-blue-50 rounded-lg"
                  >
                    <Pencil size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(project.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
