import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save, Upload, Image as ImageIcon } from 'lucide-react';
import { supabase, Service } from '../../lib/supabase';
import { uploadFile, generateFileName } from '../../lib/storage';

export function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailed_description: '',
    icon: 'power',
    image_url: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('display_order');
    if (data) {
      setServices(data);
    }
    setLoading(false);
  };

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    const filePath = generateFileName('services', file);
    const result = await uploadFile('media', filePath, file);
    setUploading(false);

    if (result.error) {
      alert('Failed to upload image: ' + result.error.message);
      return;
    }

    setFormData({ ...formData, image_url: result.publicUrl });
  };

  const handleCreate = async () => {
    const { error } = await supabase.from('services').insert(formData);
    if (!error) {
      setCreating(false);
      resetForm();
      fetchServices();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase
      .from('services')
      .update({ ...formData, updated_at: new Date().toISOString() })
      .eq('id', id);
    if (!error) {
      setEditing(null);
      resetForm();
      fetchServices();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (!error) {
        fetchServices();
      }
    }
  };

  const startEdit = (service: Service) => {
    setEditing(service.id);
    setFormData({
      title: service.title,
      description: service.description,
      detailed_description: service.detailed_description,
      icon: service.icon,
      image_url: service.image_url || '',
      display_order: service.display_order,
      is_active: service.is_active,
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      detailed_description: '',
      icon: 'power',
      image_url: '',
      display_order: 0,
      is_active: true,
    });
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading services...</div>;
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          >
            <option value="power">Power</option>
            <option value="network">Network</option>
            <option value="building">Building</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description *</label>
          <textarea
            value={formData.detailed_description}
            onChange={(e) => setFormData({ ...formData, detailed_description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Service Image</label>
          <div className="flex items-start gap-4">
            {formData.image_url && (
              <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                <img
                  src={formData.image_url}
                  alt="Preview"
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
                      <p className="text-sm text-gray-600">Click to upload image</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
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

        <div>
          <label className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 text-[#0047FF] rounded focus:ring-2 focus:ring-[#0047FF]"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services Management</h1>
          <p className="text-gray-600">Manage your company services</p>
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
          Add Service
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
              <h3 className="text-xl font-bold text-gray-900">Create New Service</h3>
              <button onClick={() => setCreating(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {renderForm(handleCreate, () => setCreating(false), 'Create')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            {editing === service.id ? (
              renderForm(() => handleUpdate(service.id), () => {
                setEditing(null);
                resetForm();
              }, 'Save')
            ) : (
              <div className="flex items-start gap-4">
                {service.image_url && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={service.image_url}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {!service.image_url && (
                  <div className="w-24 h-24 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    {!service.is_active && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">{service.description}</p>
                  <p className="text-sm text-gray-500">Order: {service.display_order}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => startEdit(service)}
                    className="p-2 text-[#0047FF] hover:bg-blue-50 rounded-lg"
                  >
                    <Pencil size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(service.id)}
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
