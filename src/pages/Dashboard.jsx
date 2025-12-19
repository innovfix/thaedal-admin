import { useState, useEffect } from 'react';
import {
  Video,
  Users,
  CreditCard,
  TrendingUp,
  Eye,
  ThumbsUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const statsData = [
  { name: 'Jan', views: 4000, users: 240, revenue: 24000 },
  { name: 'Feb', views: 3000, users: 139, revenue: 22100 },
  { name: 'Mar', views: 2000, users: 980, revenue: 22900 },
  { name: 'Apr', views: 2780, users: 390, revenue: 20000 },
  { name: 'May', views: 1890, users: 480, revenue: 21800 },
  { name: 'Jun', views: 2390, users: 380, revenue: 25000 },
  { name: 'Jul', views: 3490, users: 430, revenue: 21000 },
];

const recentVideos = [
  { id: 1, title: 'Stock Market Basics', views: 12500, likes: 890, category: 'Share Market' },
  { id: 2, title: 'Personal Finance Tips', views: 8900, likes: 654, category: 'Finance' },
  { id: 3, title: 'Start Your YouTube Channel', views: 15600, likes: 1200, category: 'YouTube' },
  { id: 4, title: 'Business Ideas 2024', views: 7800, likes: 432, category: 'Business' },
];

const StatCard = ({ icon: Icon, label, value, change, changeType, color }) => (
  <div className="glass rounded-2xl p-6 hover:border-gold-400/50 transition-all duration-300">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-gray-400 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        <div className={`flex items-center gap-1 mt-2 text-sm ${
          changeType === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {changeType === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
          <span>{change}% from last month</span>
        </div>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with Thaedal.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Video}
          label="Total Videos"
          value="1,234"
          change="12"
          changeType="up"
          color="bg-gradient-to-br from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Users}
          label="Total Users"
          value="45,678"
          change="8"
          changeType="up"
          color="bg-gradient-to-br from-green-500 to-green-600"
        />
        <StatCard
          icon={CreditCard}
          label="Active Subscriptions"
          value="2,456"
          change="5"
          changeType="up"
          color="bg-gradient-to-br from-gold-400 to-gold-600"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue (₹)"
          value="₹12.5L"
          change="15"
          changeType="up"
          color="bg-gradient-to-br from-purple-500 to-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Views Chart */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Views Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={statsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4A853" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#D4A853" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3058" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F1F3D',
                  border: '1px solid #1A3058',
                  borderRadius: '12px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="#D4A853"
                fillOpacity={1}
                fill="url(#colorViews)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Chart */}
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A3058" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F1F3D',
                  border: '1px solid #1A3058',
                  borderRadius: '12px',
                }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="revenue" fill="#D4A853" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Videos</h3>
          <a href="/videos" className="text-gold-400 hover:text-gold-300 text-sm font-medium">
            View All →
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-navy-700">
                <th className="pb-3 font-medium">Video</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Views</th>
                <th className="pb-3 font-medium">Likes</th>
              </tr>
            </thead>
            <tbody>
              {recentVideos.map((video) => (
                <tr key={video.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-navy-700 rounded-lg flex items-center justify-center">
                        <Video size={16} className="text-gray-500" />
                      </div>
                      <span className="text-white font-medium">{video.title}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-3 py-1 bg-gold-400/10 text-gold-400 rounded-full text-sm">
                      {video.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <Eye size={14} />
                      {video.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-1 text-gray-300">
                      <ThumbsUp size={14} />
                      {video.likes.toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

