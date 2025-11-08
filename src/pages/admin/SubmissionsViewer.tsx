import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, Calendar, Filter, Eye, X } from 'lucide-react';
import { supabase, FormSubmission } from '../../lib/supabase';

export function SubmissionsViewer() {
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedSubmission, setSelectedSubmission] = useState<FormSubmission | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const { data } = await supabase
      .from('form_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) {
      setSubmissions(data);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('form_submissions').update({ status }).eq('id', id);
    if (!error) {
      fetchSubmissions();
      if (selectedSubmission?.id === id) {
        setSelectedSubmission({ ...selectedSubmission, status });
      }
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const typeMatch = filter === 'all' || sub.form_type === filter;
    const statusMatch = statusFilter === 'all' || sub.status === statusFilter;
    return typeMatch && statusMatch;
  });

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    read: 'bg-yellow-100 text-yellow-700',
    contacted: 'bg-green-100 text-green-700',
    closed: 'bg-gray-100 text-gray-700',
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-600">Loading submissions...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Submissions</h1>
        <p className="text-gray-600">View and manage all form submissions</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          >
            <option value="all">All Types</option>
            <option value="contact">Contact</option>
            <option value="service_inquiry">Service Inquiry</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:border-transparent outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <div className="ml-auto">
            <span className="text-sm text-gray-600">
              {filteredSubmissions.length} submission{filteredSubmissions.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSubmissions.map((submission) => (
          <motion.div
            key={submission.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{submission.name}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${statusColors[submission.status]}`}>
                    {submission.status}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                    {submission.form_type === 'service_inquiry' ? 'Service Inquiry' : 'Contact'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#0047FF]" />
                    <span className="text-gray-700">{submission.email}</span>
                  </div>
                  {submission.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-[#00C853]" />
                      <span className="text-gray-700">{submission.phone}</span>
                    </div>
                  )}
                  {submission.company && (
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-[#7A00FF]" />
                      <span className="text-gray-700">{submission.company}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar size={14} />
                  {new Date(submission.created_at).toLocaleString()}
                </div>

                <p className="text-gray-700 mt-3 line-clamp-2">{submission.message}</p>
              </div>

              <div className="flex gap-2 ml-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSelectedSubmission(submission);
                    if (submission.status === 'new') {
                      updateStatus(submission.id, 'read');
                    }
                  }}
                  className="p-2 text-[#0047FF] hover:bg-blue-50 rounded-lg"
                >
                  <Eye size={20} />
                </motion.button>
              </div>
            </div>

            <div className="flex gap-2">
              {['new', 'read', 'contacted', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(submission.id, status)}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                    submission.status === status
                      ? statusColors[status]
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
          <p className="text-gray-600">No submissions found</p>
        </div>
      )}

      {selectedSubmission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedSubmission(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-sm font-semibold rounded ${statusColors[selectedSubmission.status]}`}>
                  {selectedSubmission.status}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded">
                  {selectedSubmission.form_type === 'service_inquiry' ? 'Service Inquiry' : 'Contact'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                  <p className="text-gray-900 font-medium">{selectedSubmission.name}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <p className="text-gray-900 font-medium">{selectedSubmission.email}</p>
                </div>

                {selectedSubmission.phone && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.phone}</p>
                  </div>
                )}

                {selectedSubmission.company && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.company}</p>
                  </div>
                )}

                {selectedSubmission.budget && (
                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Budget</label>
                    <p className="text-gray-900 font-medium">{selectedSubmission.budget}</p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Submitted</label>
                  <p className="text-gray-900 font-medium">
                    {new Date(selectedSubmission.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Message</label>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-900 whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Update Status</label>
                <div className="flex gap-2">
                  {['new', 'read', 'contacted', 'closed'].map((status) => (
                    <motion.button
                      key={status}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => updateStatus(selectedSubmission.id, status)}
                      className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                        selectedSubmission.status === status
                          ? statusColors[status]
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
