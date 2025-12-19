import { useState, useEffect } from 'react';
import {
  Search,
  Download,
  CreditCard,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';

const mockPayments = [
  { id: '1', user: 'Arun Kumar', amount: 799, plan: 'Yearly', method: 'UPI', transactionId: 'TXN123456789', status: 'success', date: '2024-01-15T10:30:00' },
  { id: '2', user: 'Priya Sharma', amount: 99, plan: 'Monthly', method: 'Card', transactionId: 'TXN123456790', status: 'success', date: '2024-01-14T15:45:00' },
  { id: '3', user: 'Ravi Chandran', amount: 249, plan: 'Quarterly', method: 'UPI', transactionId: 'TXN123456791', status: 'success', date: '2024-01-13T09:20:00' },
  { id: '4', user: 'Lakshmi Devi', amount: 99, plan: 'Monthly', method: 'Card', transactionId: 'TXN123456792', status: 'failed', date: '2024-01-12T18:10:00' },
  { id: '5', user: 'Karthik Raja', amount: 799, plan: 'Yearly', method: 'Net Banking', transactionId: 'TXN123456793', status: 'pending', date: '2024-01-11T11:55:00' },
  { id: '6', user: 'Meena Kumari', amount: 249, plan: 'Quarterly', method: 'UPI', transactionId: 'TXN123456794', status: 'success', date: '2024-01-10T14:30:00' },
];

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setTimeout(() => {
      setPayments(mockPayments);
      setLoading(false);
    }, 500);
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch = 
      payment.user.toLowerCase().includes(search.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = payments.filter((p) => p.status === 'success').reduce((acc, p) => acc + p.amount, 0);
  const successCount = payments.filter((p) => p.status === 'success').length;
  const failedCount = payments.filter((p) => p.status === 'failed').length;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-green-400" />;
      case 'failed':
        return <XCircle size={16} className="text-red-400" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-400" />;
      default:
        return null;
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'success':
        return 'bg-green-500/10 text-green-400';
      case 'failed':
        return 'bg-red-500/10 text-red-400';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400';
      default:
        return '';
    }
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
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-gray-400 mt-1">Track all payment transactions</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-navy-700 border border-navy-600 text-white rounded-xl hover:bg-navy-600 transition-all">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gold-400/20 rounded-lg">
              <TrendingUp size={20} className="text-gold-400" />
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
              <p className="text-2xl font-bold text-white">{payments.length}</p>
              <p className="text-gray-400 text-sm">Total Transactions</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle size={20} className="text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{successCount}</p>
              <p className="text-gray-400 text-sm">Successful</p>
            </div>
          </div>
        </div>
        <div className="glass rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <XCircle size={20} className="text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{failedCount}</p>
              <p className="text-gray-400 text-sm">Failed</p>
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
              placeholder="Search by user or transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'success', 'pending', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                    : 'bg-navy-700 text-gray-400 border border-navy-600 hover:border-navy-500'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-navy-700">
                <th className="p-4 font-medium">Transaction ID</th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Plan</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Method</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-navy-700/50 hover:bg-navy-700/30">
                  <td className="p-4">
                    <span className="text-gold-400 font-mono text-sm">{payment.transactionId}</span>
                  </td>
                  <td className="p-4 text-white">{payment.user}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-navy-700 text-gray-300 rounded text-sm">
                      {payment.plan}
                    </span>
                  </td>
                  <td className="p-4 text-white font-semibold">₹{payment.amount}</td>
                  <td className="p-4 text-gray-400">{payment.method}</td>
                  <td className="p-4 text-gray-400">
                    {new Date(payment.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${getStatusStyle(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No payments found</p>
        </div>
      )}
    </div>
  );
};

export default Payments;

