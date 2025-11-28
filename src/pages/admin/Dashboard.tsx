import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, FolderKanban, Users, FileText, TrendingUp, 
  Download, Calendar, IndianRupee, CheckCircle,
  PieChart, BarChart3, Activity
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { 
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Area, AreaChart
} from 'recharts';
import * as XLSX from 'xlsx';

interface Stats {
  services: number;
  projects: number;
  clients: number;
  submissions: number;
  activeServices: number;
  featuredProjects: number;
  newSubmissions: number;
  readSubmissions: number;
  contactedSubmissions: number;
  closedSubmissions: number;
  totalBudget: number;
  newBudget: number;
  readBudget: number;
  contactedBudget: number;
  closedBudget: number;
}

interface MonthlySubmission {
  month: string;
  count: number;
}

interface ServicePopularity {
  name: string;
  submissions: number;
}

interface ProjectCategory {
  category: string;
  count: number;
  [key: string]: string | number;
}

interface SubmissionStatus {
  status: string;
  count: number;
  budget: number;
  [key: string]: string | number;
}

interface BudgetRange {
  range: string;
  count: number;
  totalBudget: number;
  [key: string]: string | number;
}

interface MonthlyProject {
  month: string;
  projects: number;
}

const COLORS = ['#0047FF', '#7A00FF', '#00C853', '#FF6B00', '#FF0080', '#00D4FF'];

const STATUS_COLORS: Record<string, string> = {
  new: '#0047FF',
  read: '#00D4FF',
  contacted: '#FF6B00',
  closed: '#00C853',
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    services: 0,
    projects: 0,
    clients: 0,
    submissions: 0,
    activeServices: 0,
    featuredProjects: 0,
    newSubmissions: 0,
    readSubmissions: 0,
    contactedSubmissions: 0,
    closedSubmissions: 0,
    totalBudget: 0,
    newBudget: 0,
    readBudget: 0,
    contactedBudget: 0,
    closedBudget: 0,
  });
  const [monthlySubmissions, setMonthlySubmissions] = useState<MonthlySubmission[]>([]);
  const [servicePopularity, setServicePopularity] = useState<ServicePopularity[]>([]);
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus[]>([]);
  const [budgetRanges, setBudgetRanges] = useState<BudgetRange[]>([]);
  const [monthlyProjects, setMonthlyProjects] = useState<MonthlyProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch basic counts
        const [servicesRes, projectsRes, clientsRes, submissionsRes] = await Promise.all([
          supabase.from('services').select('*', { count: 'exact' }),
          supabase.from('projects').select('*', { count: 'exact' }),
          supabase.from('clients').select('id', { count: 'exact', head: true }),
          supabase.from('form_submissions').select('*', { count: 'exact' }),
        ]);

        const activeServices = servicesRes.data?.filter(s => s.is_active).length || 0;
        const featuredProjects = projectsRes.data?.filter(p => p.is_featured).length || 0;
        const newSubmissions = submissionsRes.data?.filter(s => s.status === 'new').length || 0;
        const readSubmissions = submissionsRes.data?.filter(s => s.status === 'read').length || 0;
        const contactedSubmissions = submissionsRes.data?.filter(s => s.status === 'contacted').length || 0;
        const closedSubmissions = submissionsRes.data?.filter(s => s.status === 'closed').length || 0;

        // Calculate budget amounts from budget field
        const parseBudget = (budgetStr: string | null): number => {
          if (!budgetStr) return 0;
          
          // Handle form budget options
          switch (budgetStr.toLowerCase()) {
            case 'under-50l':
              return 2500000; // Average: 25 lakhs
            case '50l-1cr':
              return 7500000; // Average: 75 lakhs
            case '1cr-10cr':
              return 55000000; // Average: 5.5 crores
            case 'above-10cr':
              return 150000000; // Estimate: 15 crores
            default:
              // Fallback for any custom entries
              const cleaned = budgetStr.replace(/[₹,\s]/g, '');
              
              // Handle ranges like "50000-100000"
              if (cleaned.includes('-')) {
                const parts = cleaned.split('-');
                const min = parseFloat(parts[0]) || 0;
                const max = parseFloat(parts[1]) || 0;
                return (min + max) / 2;
              }
              
              // Handle "crore" or "cr"
              if (budgetStr.toLowerCase().includes('crore') || budgetStr.toLowerCase().includes('cr')) {
                const num = parseFloat(cleaned) || 0;
                return num * 10000000;
              }
              
              // Handle "lakhs" or "lakh" or "l"
              if (budgetStr.toLowerCase().includes('lakh') || budgetStr.toLowerCase().includes('l')) {
                const num = parseFloat(cleaned) || 0;
                return num * 100000;
              }
              
              // Handle "k" for thousands
              if (budgetStr.toLowerCase().includes('k')) {
                const num = parseFloat(cleaned) || 0;
                return num * 1000;
              }
              
              return parseFloat(cleaned) || 0;
          }
        };

        let totalBudget = 0;
        let newBudget = 0;
        let readBudget = 0;
        let contactedBudget = 0;
        let closedBudget = 0;

        submissionsRes.data?.forEach((sub) => {
          const budget = parseBudget(sub.budget);
          totalBudget += budget;
          
          if (sub.status === 'new') newBudget += budget;
          else if (sub.status === 'read') readBudget += budget;
          else if (sub.status === 'contacted') contactedBudget += budget;
          else if (sub.status === 'closed') closedBudget += budget;
        });

        setStats({
          services: servicesRes.count || 0,
          projects: projectsRes.count || 0,
          clients: clientsRes.count || 0,
          submissions: submissionsRes.count || 0,
          activeServices,
          featuredProjects,
          newSubmissions,
          readSubmissions,
          contactedSubmissions,
          closedSubmissions,
          totalBudget,
          newBudget,
          readBudget,
          contactedBudget,
          closedBudget,
        });

        // Monthly submissions trend (last 6 months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        if (submissionsRes.data) {
          const recentSubmissions = submissionsRes.data.filter(
            sub => new Date(sub.created_at) >= sixMonthsAgo
          );

          const monthCounts: Record<string, number> = {};
          recentSubmissions.forEach((sub) => {
            const date = new Date(sub.created_at);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            monthCounts[monthKey] = (monthCounts[monthKey] || 0) + 1;
          });

          const chartData = Object.entries(monthCounts).map(([month, count]) => ({
            month,
            count,
          }));

          setMonthlySubmissions(chartData);

          // Submission status breakdown with budget
          const statusCounts: Record<string, { count: number; budget: number }> = {};
          submissionsRes.data.forEach((sub) => {
            const status = sub.status || 'new';
            const budget = parseBudget(sub.budget);
            
            if (!statusCounts[status]) {
              statusCounts[status] = { count: 0, budget: 0 };
            }
            statusCounts[status].count += 1;
            statusCounts[status].budget += budget;
          });

          const statusData = Object.entries(statusCounts).map(([status, data]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
            count: data.count,
            budget: data.budget,
          }));

          setSubmissionStatus(statusData);

          // Budget range analysis
          const budgetRangeData: Record<string, { count: number; total: number }> = {
            'Under ₹50L': { count: 0, total: 0 },
            '₹50L - 1Cr': { count: 0, total: 0 },
            '₹1Cr - 10Cr': { count: 0, total: 0 },
            'Above ₹10Cr': { count: 0, total: 0 },
          };

          submissionsRes.data?.forEach((sub) => {
            const budget = parseBudget(sub.budget);
            if (budget === 0) return;
            
            if (budget < 5000000) { // Under 50 lakhs
              budgetRangeData['Under ₹50L'].count += 1;
              budgetRangeData['Under ₹50L'].total += budget;
            } else if (budget < 10000000) { // 50L - 1Cr
              budgetRangeData['₹50L - 1Cr'].count += 1;
              budgetRangeData['₹50L - 1Cr'].total += budget;
            } else if (budget < 100000000) { // 1Cr - 10Cr
              budgetRangeData['₹1Cr - 10Cr'].count += 1;
              budgetRangeData['₹1Cr - 10Cr'].total += budget;
            } else { // Above 10Cr
              budgetRangeData['Above ₹10Cr'].count += 1;
              budgetRangeData['Above ₹10Cr'].total += budget;
            }
          });

          const budgetRangeArray = Object.entries(budgetRangeData)
            .filter(([_, data]) => data.count > 0)
            .map(([range, data]) => ({
              range,
              count: data.count,
              totalBudget: data.total,
            }));

          setBudgetRanges(budgetRangeArray);
        }

        // Service popularity (services with most submissions)
        if (servicesRes.data && submissionsRes.data) {
          const serviceCounts: Record<string, { name: string; count: number }> = {};
          
          submissionsRes.data.forEach((sub) => {
            if (sub.service_id) {
              if (!serviceCounts[sub.service_id]) {
                const service = servicesRes.data.find(s => s.id === sub.service_id);
                serviceCounts[sub.service_id] = {
                  name: service?.title || 'Unknown',
                  count: 0,
                };
              }
              serviceCounts[sub.service_id].count += 1;
            }
          });

          const popularityData = Object.values(serviceCounts)
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
            .map(item => ({
              name: item.name,
              submissions: item.count,
            }));

          setServicePopularity(popularityData);
        }

        // Project categories distribution
        if (projectsRes.data) {
          const categoryCounts: Record<string, number> = {};
          projectsRes.data.forEach((project) => {
            const category = project.category || 'Uncategorized';
            categoryCounts[category] = (categoryCounts[category] || 0) + 1;
          });

          const categoryData = Object.entries(categoryCounts).map(([category, count]) => ({
            category,
            count,
          }));

          setProjectCategories(categoryData);

          // Monthly projects (last 6 months)
          const recentProjects = projectsRes.data.filter(
            proj => new Date(proj.created_at) >= sixMonthsAgo
          );

          const projectMonthCounts: Record<string, number> = {};
          recentProjects.forEach((proj) => {
            const date = new Date(proj.created_at);
            const monthKey = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            projectMonthCounts[monthKey] = (projectMonthCounts[monthKey] || 0) + 1;
          });

          const projectChartData = Object.entries(projectMonthCounts).map(([month, projects]) => ({
            month,
            projects,
          }));

          setMonthlyProjects(projectChartData);
        }

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const downloadReport = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Helper function to format currency
    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
      }).format(amount);
    };

    // Sheet 1: Summary Overview
    const summaryData = [
      ['DASHBOARD ANALYTICS REPORT'],
      ['Generated Date:', new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })],
      [],
      ['OVERVIEW STATISTICS'],
      ['Metric', 'Total', 'Additional Info'],
      ['Total Services', stats.services, `Active: ${stats.activeServices}`],
      ['Total Projects', stats.projects, `Featured: ${stats.featuredProjects}`],
      ['Total Clients', stats.clients, 'Active Partnerships'],
      ['Total Form Submissions', stats.submissions, ''],
      [],
      ['SUBMISSION STATUS & BUDGET'],
      ['Status', 'Count', 'Total Budget (₹)'],
      ['New Submissions', stats.newSubmissions, formatCurrency(stats.newBudget)],
      ['Read Submissions', stats.readSubmissions, formatCurrency(stats.readBudget)],
      ['Contacted Submissions', stats.contactedSubmissions, formatCurrency(stats.contactedBudget)],
      ['Closed Submissions', stats.closedSubmissions, formatCurrency(stats.closedBudget)],
      [],
      ['TOTAL BUDGET VALUE', '', formatCurrency(stats.totalBudget)],
    ];
    const ws1 = XLSX.utils.aoa_to_sheet(summaryData);
    
    // Styling for summary sheet
    ws1['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 25 }];
    
    XLSX.utils.book_append_sheet(wb, ws1, 'Summary');

    // Sheet 2: Budget Range Analysis
    if (budgetRanges.length > 0) {
      const budgetData = [
        ['BUDGET RANGE ANALYSIS'],
        ['Budget Range', 'Number of Submissions', 'Total Budget (₹)', 'Average Budget (₹)'],
        ...budgetRanges.map(item => [
          item.range,
          item.count,
          formatCurrency(item.totalBudget),
          formatCurrency(item.totalBudget / item.count)
        ]),
        [],
        ['TOTAL', budgetRanges.reduce((sum, r) => sum + r.count, 0), formatCurrency(stats.totalBudget), '']
      ];
      const ws2 = XLSX.utils.aoa_to_sheet(budgetData);
      ws2['!cols'] = [{ wch: 20 }, { wch: 25 }, { wch: 20 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, ws2, 'Budget Analysis');
    }

    // Sheet 3: Monthly Submissions
    if (monthlySubmissions.length > 0) {
      const submissionsData = [
        ['MONTHLY SUBMISSION TRENDS'],
        ['Month', 'Number of Submissions'],
        ...monthlySubmissions.map(item => [item.month, item.count])
      ];
      const ws3 = XLSX.utils.aoa_to_sheet(submissionsData);
      ws3['!cols'] = [{ wch: 20 }, { wch: 25 }];
      XLSX.utils.book_append_sheet(wb, ws3, 'Monthly Submissions');
    }

    // Sheet 4: Service Popularity
    if (servicePopularity.length > 0) {
      const serviceData = [
        ['SERVICE POPULARITY REPORT'],
        ['Rank', 'Service Name', 'Total Requests', 'Percentage'],
        ...servicePopularity.map((item, index) => {
          const total = servicePopularity.reduce((sum, s) => sum + s.submissions, 0);
          const percentage = ((item.submissions / total) * 100).toFixed(2) + '%';
          return [index + 1, item.name, item.submissions, percentage];
        })
      ];
      const ws4 = XLSX.utils.aoa_to_sheet(serviceData);
      ws4['!cols'] = [{ wch: 8 }, { wch: 35 }, { wch: 18 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, ws4, 'Service Popularity');
    }

    // Sheet 5: Project Categories
    if (projectCategories.length > 0) {
      const categoryData = [
        ['PROJECT CATEGORIES DISTRIBUTION'],
        ['Category', 'Number of Projects', 'Percentage'],
        ...projectCategories.map(item => {
          const total = projectCategories.reduce((sum, c) => sum + c.count, 0);
          const percentage = ((item.count / total) * 100).toFixed(2) + '%';
          return [item.category, item.count, percentage];
        })
      ];
      const ws5 = XLSX.utils.aoa_to_sheet(categoryData);
      ws5['!cols'] = [{ wch: 25 }, { wch: 22 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, ws5, 'Project Categories');
    }

    // Sheet 6: Submission Status with Budget
    if (submissionStatus.length > 0) {
      const statusData = [
        ['SUBMISSION STATUS & BUDGET BREAKDOWN'],
        ['Status', 'Count', 'Total Budget (₹)', 'Average Budget (₹)', 'Percentage'],
        ...submissionStatus.map(item => {
          const total = submissionStatus.reduce((sum, s) => sum + s.count, 0);
          const percentage = ((item.count / total) * 100).toFixed(2) + '%';
          const avgBudget = item.count > 0 ? item.budget / item.count : 0;
          return [
            item.status, 
            item.count, 
            formatCurrency(item.budget),
            formatCurrency(avgBudget),
            percentage
          ];
        }),
        [],
        ['TOTAL', stats.submissions, formatCurrency(stats.totalBudget), '', '100%']
      ];
      const ws6 = XLSX.utils.aoa_to_sheet(statusData);
      ws6['!cols'] = [{ wch: 20 }, { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 }];
      XLSX.utils.book_append_sheet(wb, ws6, 'Status & Budget');
    }

    // Sheet 7: Monthly Projects
    if (monthlyProjects.length > 0) {
      const projectsData = [
        ['MONTHLY PROJECT CREATION'],
        ['Month', 'Projects Created'],
        ...monthlyProjects.map(item => [item.month, item.projects])
      ];
      const ws7 = XLSX.utils.aoa_to_sheet(projectsData);
      ws7['!cols'] = [{ wch: 20 }, { wch: 20 }];
      XLSX.utils.book_append_sheet(wb, ws7, 'Monthly Projects');
    }

    // Generate Excel file
    XLSX.writeFile(wb, `Dashboard_Analytics_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-xl text-gray-600">Loading analytics...</div>
        </div>
      </div>
    );
  }

  const statCards = [
    { icon: Briefcase, label: 'Total Services', value: stats.services, subValue: `${stats.activeServices} active`, color: '#0047FF' },
    { icon: FolderKanban, label: 'Total Projects', value: stats.projects, subValue: `${stats.featuredProjects} featured`, color: '#7A00FF' },
    { icon: Users, label: 'Total Clients', value: stats.clients, subValue: 'Active partnerships', color: '#00C853' },
    { icon: FileText, label: 'Form Submissions', value: stats.submissions, subValue: `${stats.newSubmissions} new`, color: '#FF6B00' },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive overview of your business metrics and performance</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadReport}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0047FF] to-[#7A00FF] text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          <Download size={20} />
          Download Excel Report
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <TrendingUp size={16} className="text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.label}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-xs text-gray-500">{card.subValue}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Submissions Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0047FF] to-[#7A00FF] flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Submission Trends</h2>
              <p className="text-sm text-gray-600">Last 6 months activity</p>
            </div>
          </div>
          {monthlySubmissions.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlySubmissions}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0047FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0047FF" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis tick={{ fill: '#666', fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="count" stroke="#0047FF" fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </motion.div>

        {/* Submission Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C853] to-[#00D4FF] flex items-center justify-center">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Submission Status</h2>
              <p className="text-sm text-gray-600">Current distribution</p>
            </div>
          </div>
          {submissionStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={submissionStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => `${props.status}: ${props.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {submissionStatus.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[item.status.toLowerCase()] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </motion.div>

        {/* Service Popularity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#7A00FF] to-[#FF0080] flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Service Popularity</h2>
              <p className="text-sm text-gray-600">Most requested services</p>
            </div>
          </div>
          {servicePopularity.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={servicePopularity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#666', fontSize: 12 }} width={120} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                />
                <Bar dataKey="submissions" fill="#7A00FF" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </motion.div>

        {/* Project Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF0080] flex items-center justify-center">
              <PieChart size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Project Categories</h2>
              <p className="text-sm text-gray-600">Portfolio distribution</p>
            </div>
          </div>
          {projectCategories.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <RePieChart>
                <Pie
                  data={projectCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => `${props.category}: ${props.count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {projectCategories.map((item, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">No data available</p>
          )}
        </motion.div>
      </div>

      {/* Budget Analysis Chart */}
      {budgetRanges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00C853] to-[#0047FF] flex items-center justify-center">
              <IndianRupee size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Budget Range Distribution</h2>
              <p className="text-sm text-gray-600">Project budget analysis</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={budgetRanges}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="range" tick={{ fill: '#666', fontSize: 12 }} />
              <YAxis tick={{ fill: '#666', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
                formatter={(value: number) => [
                  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value),
                  'Total Budget'
                ]}
              />
              <Bar dataKey="totalBudget" fill="#00C853" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Monthly Projects Chart */}
      {monthlyProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B00] to-[#FF0080] flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Project Creation Timeline</h2>
              <p className="text-sm text-gray-600">Monthly project additions</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyProjects}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fill: '#666', fontSize: 12 }} />
              <YAxis tick={{ fill: '#666', fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '8px' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="projects" 
                stroke="#FF6B00" 
                strokeWidth={3}
                dot={{ fill: '#FF6B00', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Financial Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="bg-gradient-to-r from-[#0047FF] to-[#7A00FF] p-8 rounded-xl shadow-lg text-white"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <IndianRupee size={32} />
            </div>
            <div>
              <p className="text-sm opacity-90">Total Budget Value</p>
              <p className="text-4xl font-bold">
                {new Intl.NumberFormat('en-IN', {
                  style: 'currency',
                  currency: 'INR',
                  maximumFractionDigits: 0,
                }).format(stats.totalBudget)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-6 border-t border-white/20">
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-xs opacity-75 mb-1">New</p>
            <p className="text-sm font-semibold">{stats.newSubmissions} submissions</p>
            <p className="text-lg font-bold mt-1">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stats.newBudget)}
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-xs opacity-75 mb-1">Read</p>
            <p className="text-sm font-semibold">{stats.readSubmissions} submissions</p>
            <p className="text-lg font-bold mt-1">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stats.readBudget)}
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-xs opacity-75 mb-1">Contacted</p>
            <p className="text-sm font-semibold">{stats.contactedSubmissions} submissions</p>
            <p className="text-lg font-bold mt-1">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stats.contactedBudget)}
            </p>
          </div>
          <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
            <p className="text-xs opacity-75 mb-1">Closed</p>
            <p className="text-sm font-semibold">{stats.closedSubmissions} submissions</p>
            <p className="text-lg font-bold mt-1">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                notation: 'compact',
                maximumFractionDigits: 1,
              }).format(stats.closedBudget)}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}