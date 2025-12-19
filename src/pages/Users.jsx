import { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MoreVertical,
  Eye,
  Ban,
  CheckCircle,
  Users as UsersIcon,
  Crown,
  Calendar,
  Phone,
} from 'lucide-react';

const mockUsers = [
  { id: '1', name: 'Arun Kumar', phone: '+91 98765 43210', email: 'arun@email.com', isSubscribed: true, isTrialActive: false, subscriptionEndDate: '2024-03-15', createdAt: '2023-06-15', status: 'active' },
  { id: '2', name: 'Priya Sharma', phone: '+91 87654 32109', email: 'priya@email.com', isSubscribed: false, isTrialActive: true, subscriptionEndDate: '2024-02-01', createdAt: '2024-01-15', status: 'active' },
  { id: '3', name: 'Ravi Chandran', phone: '+91 76543 21098', email: 'ravi@email.com', isSubscribed: true, isTrialActive: false, subscriptionEndDate: '2024-04-20', createdAt: '2023-09-10', status: 'active' },
  { id: '4', name: 'Lakshmi Devi', phone: '+91 65432 10987', email: 'lakshmi@email.com', isSubscribed: false, isTrialActive: false, subscriptionEndDate: null, createdAt: '2024-01-20', status: 'inactive' },
  { id: '5', name: 'Karthik Raja', phone: '+91 54321 09876', email: 'karthik@email.com', isSubscribed: true, isTrialActive: false, subscriptionEndDate: '2024-05-10', createdAt: '2023-04-05', status: 'active' },
];

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setUsers(mockUsers);
      setLoading(false);
    }, 500);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'subscribed') return matchesSearch && user.isSubscribed;
    if (filter === 'trial') return matchesSearch && user.isTrialActive;
    if (filter === 'free') return matchesSearch && !user.isSubscribed && !user.isTrialActive;
    return matchesSearch;
  });

  const toggleUserStatus = (id) => {
    setUsers(users.map((u) => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
    setActiveDropdown(null);
  };

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
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-400 mt-1">Manage your platform users</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <UsersIcon size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{users.length}</p>
              <p className="text-gray-400 text-sm">Total Users</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-400/20 rounded-lg">
              <Crown size={20} className="text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{users.filter((u) => u.isSubscribed).length}</p>
              <p className="text-gray-400 text-sm">Subscribed</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Calendar size={20} className="text-purple-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{users.filter((u) => u.isTrialActive).length}</p>
              <p className="text-gray-400 text-sm">On Trial</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <UsersIcon size={20} className="text-gray-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{users.filter((u) => !u.isSubscribed && !u.isTrialActive).length}</p>
              <p className="text-gray-400 text-sm">Free Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'subscribed', 'trial', 'free'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                    : 'bg-navy-700 text-gray-400 border border-navy-600 hover:border-navy-500'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-navy-700">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Subscription</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Joined</th>
                <th className="p-4 font-medium w-12"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <span className="text-navy-900 font-semibold">{user.name.charAt(0)}</span>
                      </div>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Phone size={14} />
                        {user.phone}
                      </div>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    {user.isSubscribed ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold-400/10 text-gold-400 rounded-full text-sm">
                        <Crown size={14} />
                        Premium
                      </span>
                    ) : user.isTrialActive ? (
                      <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                        Trial
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-full text-sm">
                        Free
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      user.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                        className="p-1 hover:bg-navy-700 rounded"
                      >
                        <MoreVertical size={18} className="text-gray-400" />
                      </button>
                      {activeDropdown === user.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-navy-800 border border-navy-700 rounded-xl shadow-xl py-1 z-10">
                          <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-navy-700 w-full">
                            <Eye size={14} />
                            View Details
                          </button>
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`flex items-center gap-2 px-4 py-2 w-full ${
                              user.status === 'active'
                                ? 'text-red-400 hover:bg-red-400/10'
                                : 'text-green-400 hover:bg-green-400/10'
                            }`}
                          >
                            {user.status === 'active' ? <Ban size={14} /> : <CheckCircle size={14} />}
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default Users;

