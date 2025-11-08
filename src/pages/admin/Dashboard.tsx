import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, FolderKanban, Users, FileText, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  services: number;
  projects: number;
  clients: number;
  submissions: number;
}

interface MonthlySubmission {
  month: string;
  count: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    projects: 0,
    clients: 0,
    submissions: 0,
  });
  const [monthlyData, setMonthlyData] = useState<MonthlySubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [servicesRes, projectsRes, clientsRes, submissionsRes] = await Promise.all([
        supabase.from('services').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }),
        supabase.from('clients').select('id', { count: 'exact', head: true }),
        supabase.from('form_submissions').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        services: servicesRes.count || 0,
        projects: projectsRes.count || 0,
        clients: clientsRes.count || 0,
        submissions: submissionsRes.count || 0,
      });

      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

      const { data: submissions } = await supabase
        .from('form_submissions')
        .select('created_at')
        .gte('created_at', sixMonthsAgo.toISOString())
        .order('created_at', { ascending: true });

      if (submissions) {
        const monthCounts: Record<string, number> = {};
        submissions.forEach((sub) => {
          const date = new Date(sub.created_at);
          const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
          monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
        });

        const chartData = Object.entries(monthCounts).map(([month, count]) => ({
          month,
          count,
        }));

        setMonthlyData(chartData);
      }

      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      icon: Briefcase,
      label: 'Services',
      value: stats.services,
      color: '#0047FF',
    },
    {
      icon: FolderKanban,
      label: 'Projects',
      value: stats.projects,
      color: '#7A00FF',
    },
    {
      icon: Users,
      label: 'Clients',
      value: stats.clients,
      color: '#00C853',
    },
    {
      icon: FileText,
      label: 'Form Submissions',
      value: stats.submissions,
      color: '#0047FF',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const maxCount = Math.max(...monthlyData.map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Overview of your website content and submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0047FF] to-[#7A00FF] flex items-center justify-center">
            <TrendingUp size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Form Submissions</h2>
            <p className="text-sm text-gray-600">Last 6 months</p>
          </div>
        </div>

        {monthlyData.length > 0 ? (
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-24 text-sm text-gray-600 font-medium">{data.month}</div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-100 rounded-lg overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(data.count / maxCount) * 100}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="h-full bg-gradient-to-r from-[#0047FF] to-[#7A00FF] flex items-center justify-end pr-3"
                    >
                      <span className="text-white text-sm font-semibold">{data.count}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No submission data available</p>
        )}
      </motion.div>
    </div>
  );
}
