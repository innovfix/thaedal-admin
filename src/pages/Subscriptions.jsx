import { useState, useEffect } from 'react';
import {
  CreditCard,
  Crown,
  Calendar,
  TrendingUp,
  Edit,
  Plus,
  Loader2,
} from 'lucide-react';

const mockPlans = [
  { id: '1', name: 'Monthly', price: 99, duration: 30, features: ['All Videos', 'HD Quality', 'Offline Download'], isActive: true, subscribersCount: 1250 },
  { id: '2', name: 'Quarterly', price: 249, duration: 90, features: ['All Videos', 'HD Quality', 'Offline Download', 'Priority Support'], isActive: true, subscribersCount: 890 },
  { id: '3', name: 'Yearly', price: 799, duration: 365, features: ['All Videos', 'HD Quality', 'Offline Download', 'Priority Support', 'Exclusive Content'], isActive: true, subscribersCount: 456 },
];

const mockSubscriptions = [
  { id: '1', user: 'Arun Kumar', plan: 'Yearly', startDate: '2024-01-15', endDate: '2025-01-15', amount: 799, status: 'active' },
  { id: '2', user: 'Priya Sharma', plan: 'Monthly', startDate: '2024-01-20', endDate: '2024-02-20', amount: 99, status: 'active' },
  { id: '3', user: 'Ravi Chandran', plan: 'Quarterly', startDate: '2023-12-01', endDate: '2024-03-01', amount: 249, status: 'active' },
  { id: '4', user: 'Karthik Raja', plan: 'Monthly', startDate: '2023-12-15', endDate: '2024-01-15', amount: 99, status: 'expired' },
];

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    duration: '',
    features: '',
    isActive: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setPlans(mockPlans);
      setSubscriptions(mockSubscriptions);
      setLoading(false);
    }, 500);
  }, []);

  const totalRevenue = subscriptions.reduce((acc, sub) => acc + sub.amount, 0);
  const activeSubscribers = subscriptions.filter((s) => s.status === 'active').length;

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      duration: plan.duration.toString(),
      features: plan.features.join('\n'),
      isActive: plan.isActive,
    });
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      const planData = {
        name: formData.name,
        price: parseInt(formData.price),
        duration: parseInt(formData.duration),
        features: formData.features.split('\n').filter((f) => f.trim()),
        isActive: formData.isActive,
      };

      if (editingPlan) {
        setPlans(plans.map((p) => 
          p.id === editingPlan.id ? { ...p, ...planData } : p
        ));
      } else {
        setPlans([...plans, { id: Date.now().toString(), ...planData, subscribersCount: 0 }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingPlan(null);
      setFormData({ name: '', price: '', duration: '', features: '', isActive: true });
    }, 500);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Subscriptions</h1>
          <p className="text-gray-400 mt-1">Manage subscription plans and subscribers</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all"
        >
          <Plus size={20} />
          Add Plan
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-400/20 rounded-lg">
              <Crown size={20} className="text-gold-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{activeSubscribers}</p>
              <p className="text-gray-400 text-sm">Active Subscribers</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Total Revenue</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <CreditCard size={20} className="text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{plans.length}</p>
              <p className="text-gray-400 text-sm">Active Plans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Subscription Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass rounded-2xl p-6 relative overflow-hidden ${
                plan.name === 'Yearly' ? 'border-gold-400/50' : ''
              }`}
            >
              {plan.name === 'Yearly' && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-gold-400 text-navy-900 text-xs font-semibold rounded">
                  Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <div className="mt-4">
                <span className="text-3xl font-bold gold-text">₹{plan.price}</span>
                <span className="text-gray-400">/{plan.duration} days</span>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-navy-700 flex items-center justify-between">
                <span className="text-gray-400 text-sm">{plan.subscribersCount} subscribers</span>
                <button
                  onClick={() => handleEditPlan(plan)}
                  className="p-2 text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 rounded-lg"
                >
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Subscriptions */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Recent Subscriptions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-navy-700">
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Plan</th>
                <th className="pb-3 font-medium">Period</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr key={sub.id} className="border-b border-navy-700/50">
                  <td className="py-4 text-white">{sub.user}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-gold-400/10 text-gold-400 rounded text-sm">
                      {sub.plan}
                    </span>
                  </td>
                  <td className="py-4 text-gray-400">
                    {new Date(sub.startDate).toLocaleDateString()} - {new Date(sub.endDate).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-white">₹{sub.amount}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      sub.status === 'active'
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingPlan ? 'Edit Plan' : 'Add Plan'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration (days) *</label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Features (one per line)</label>
                <textarea
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400 resize-none"
                  placeholder="All Videos&#10;HD Quality&#10;Offline Download"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400"
                />
                <span className="text-gray-300">Active</span>
              </label>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); setEditingPlan(null); }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-gold-400 text-navy-900 font-semibold rounded-xl hover:bg-gold-500 disabled:opacity-50 flex items-center gap-2"
                >
                  {saving && <Loader2 className="animate-spin" size={16} />}
                  {editingPlan ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;

