import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Video,
  FolderOpen,
  Users,
  UserCircle,
  CreditCard,
  Receipt,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Bell,
  ChevronDown,
} from 'lucide-react';

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/videos', icon: Video, label: 'Videos' },
  { path: '/categories', icon: FolderOpen, label: 'Categories' },
  { path: '/creators', icon: UserCircle, label: 'Creators' },
  { path: '/users', icon: Users, label: 'Users' },
  { path: '/subscriptions', icon: CreditCard, label: 'Subscriptions' },
  { path: '/payments', icon: Receipt, label: 'Payments' },
  { path: '/settings', icon: Settings, label: 'Settings' },
];

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-navy-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full bg-navy-800 border-r border-navy-700">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-navy-700">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                <span className="text-navy-900 font-bold text-lg">த</span>
              </div>
              {sidebarOpen && (
                <span className="gold-text font-bold text-xl">Thaedal</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:block text-gray-400 hover:text-white"
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                      : 'text-gray-400 hover:bg-navy-700 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User */}
          <div className="p-4 border-t border-navy-700">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-3 py-3 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
            >
              <LogOut size={20} />
              {sidebarOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-navy-800 border-b border-navy-700 flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white hover:bg-navy-700 rounded-xl">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-gold-400 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 p-2 hover:bg-navy-700 rounded-xl"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                  <span className="text-navy-900 font-semibold text-sm">A</span>
                </div>
                <span className="hidden md:block text-white font-medium">{user?.name}</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-navy-800 border border-navy-700 rounded-xl shadow-xl py-2 z-50">
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-gray-400 hover:text-white hover:bg-navy-700"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-400/10"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

