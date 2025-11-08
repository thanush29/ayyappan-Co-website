import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import { supabase, Client } from '../../lib/supabase';

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    logo_url: '',
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    const { data } = await supabase.from('clients').select('*').order('display_order');
    if (data) {
      setClients(data);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    const { error } = await supabase.from('clients').insert(formData);
    if (!error) {
      setCreating(false);
      resetForm();
      fetchClients();
    }
  };

  const handleUpdate = async (id: string) => {
    const { error } = await supabase.from('clients').update(formData).eq('id', id);
    if (!error) {
      setEditing(null);
      resetForm();
      fetchClients();
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this client?')) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (!error) {
        fetchClients();
      }
    }
  };

  const startEdit = (client: Client) => {
    setEditing(client.id);
    setFormData({
      name: client.name,
      logo_url: client.logo_url,
      display_order: client.display_order,
      is_active: client.is_active,
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo_url: '',
      display_order: 0,
      is_active: true,
    });
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading clients...</div>;
  }

  const renderForm = (onSubmit: () => void, onCancel: () => void, submitLabel: string) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL *</label>
          <input
            type="url"
            value={formData.logo_url}
            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
            placeholder="https://example.com/logo.png"
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
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white rounded-lg font-semibold"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Clients Management</h1>
          <p className="text-gray-600">Manage your valued clients</p>
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
          Add Client
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
              <h3 className="text-xl font-bold text-gray-900">Add New Client</h3>
              <button onClick={() => setCreating(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {renderForm(handleCreate, () => setCreating(false), 'Create')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            {editing === client.id ? (
              <div>
                {renderForm(() => handleUpdate(client.id), () => {
                  setEditing(null);
                  resetForm();
                }, 'Save')}
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="w-32 h-20 bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {client.logo_url ? (
                        <img
                          src={client.logo_url}
                          alt={client.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-gray-400 text-center">
                          <div className="text-2xl font-bold">{client.name.charAt(0)}</div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{client.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-500">Order: {client.display_order}</span>
                      {!client.is_active && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => startEdit(client)}
                      className="p-2 text-[#0047FF] hover:bg-blue-50 rounded-lg"
                    >
                      <Pencil size={18} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(client.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
