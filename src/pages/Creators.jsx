import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Video, Eye, UserCircle, Loader2 } from 'lucide-react';

const mockCreators = [
  { id: '1', name: 'Thaedal Official', avatar: 'https://picsum.photos/seed/c1/100/100', bio: 'Official Thaedal channel', videosCount: 156, totalViews: 1250000, isVerified: true },
  { id: '2', name: 'Finance Guru', avatar: 'https://picsum.photos/seed/c2/100/100', bio: 'Expert in personal finance', videosCount: 89, totalViews: 890000, isVerified: true },
  { id: '3', name: 'Stock Master', avatar: 'https://picsum.photos/seed/c3/100/100', bio: 'Stock market analyst', videosCount: 67, totalViews: 560000, isVerified: true },
  { id: '4', name: 'Business Coach', avatar: 'https://picsum.photos/seed/c4/100/100', bio: 'Helping entrepreneurs grow', videosCount: 45, totalViews: 340000, isVerified: false },
];

const Creators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCreator, setEditingCreator] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    avatar: '',
    isVerified: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setCreators(mockCreators);
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = (creator) => {
    setEditingCreator(creator);
    setFormData({
      name: creator.name,
      bio: creator.bio,
      avatar: creator.avatar,
      isVerified: creator.isVerified,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this creator?')) {
      setCreators(creators.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (editingCreator) {
        setCreators(creators.map((c) => 
          c.id === editingCreator.id ? { ...c, ...formData } : c
        ));
      } else {
        setCreators([...creators, { 
          id: Date.now().toString(), 
          ...formData, 
          videosCount: 0,
          totalViews: 0
        }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingCreator(null);
      setFormData({ name: '', bio: '', avatar: '', isVerified: false });
    }, 500);
  };

  const formatViews = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
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
          <h1 className="text-2xl font-bold text-white">Creators</h1>
          <p className="text-gray-400 mt-1">Manage content creators</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all"
        >
          <Plus size={20} />
          Add Creator
        </button>
      </div>

      {/* Creators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="glass rounded-2xl p-6 hover:border-gold-400/50 transition-all text-center"
          >
            <div className="relative inline-block">
              <img
                src={creator.avatar}
                alt={creator.name}
                className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-gold-400/30"
              />
              {creator.isVerified && (
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-gold-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-navy-900" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            
            <h3 className="text-white font-semibold mt-4">{creator.name}</h3>
            <p className="text-gray-400 text-sm mt-1 line-clamp-2">{creator.bio}</p>

            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="text-center">
                <div className="flex items-center gap-1 text-gold-400">
                  <Video size={14} />
                  <span className="font-semibold">{creator.videosCount}</span>
                </div>
                <p className="text-gray-500 text-xs">Videos</p>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1 text-gold-400">
                  <Eye size={14} />
                  <span className="font-semibold">{formatViews(creator.totalViews)}</span>
                </div>
                <p className="text-gray-500 text-xs">Views</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-4 pt-4 border-t border-navy-700">
              <button
                onClick={() => handleEdit(creator)}
                className="flex-1 py-2 text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 rounded-lg transition-all flex items-center justify-center gap-1"
              >
                <Edit size={14} />
                Edit
              </button>
              <button
                onClick={() => handleDelete(creator.id)}
                className="flex-1 py-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all flex items-center justify-center gap-1"
              >
                <Trash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingCreator ? 'Edit Creator' : 'Add Creator'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Avatar URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isVerified}
                  onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                  className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400"
                />
                <span className="text-gray-300">Verified Creator</span>
              </label>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCreator(null);
                  }}
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
                  {editingCreator ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creators;

