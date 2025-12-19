import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderOpen, Video, Loader2 } from 'lucide-react';

const mockCategories = [
  { id: '1', name: 'Share Market', nameTamil: 'பங்கு சந்தை', slug: 'share-market', icon: 'trending_up', color: '#4CAF50', videosCount: 45, isActive: true },
  { id: '2', name: 'Finance', nameTamil: 'நிதி', slug: 'finance', icon: 'account_balance', color: '#2196F3', videosCount: 32, isActive: true },
  { id: '3', name: 'Part Time Income', nameTamil: 'பகுதி நேர வருமானம்', slug: 'part-time-income', icon: 'work', color: '#FF9800', videosCount: 28, isActive: true },
  { id: '4', name: 'YouTube', nameTamil: 'யூடியூப்', slug: 'youtube', icon: 'play_circle', color: '#F44336', videosCount: 56, isActive: true },
  { id: '5', name: 'Business', nameTamil: 'வணிகம்', slug: 'business', icon: 'business', color: '#607D8B', videosCount: 41, isActive: true },
  { id: '6', name: 'Instagram', nameTamil: 'இன்ஸ்டாகிராம்', slug: 'instagram', icon: 'photo_camera', color: '#E91E63', videosCount: 23, isActive: false },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nameTamil: '',
    icon: '',
    color: '#D4A853',
    isActive: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      nameTamil: category.nameTamil,
      icon: category.icon,
      color: category.color,
      isActive: category.isActive,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      if (editingCategory) {
        setCategories(categories.map((c) => 
          c.id === editingCategory.id ? { ...c, ...formData } : c
        ));
      } else {
        setCategories([...categories, { 
          id: Date.now().toString(), 
          ...formData, 
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          videosCount: 0 
        }]);
      }
      setSaving(false);
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', nameTamil: '', icon: '', color: '#D4A853', isActive: true });
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
          <h1 className="text-2xl font-bold text-white">Categories</h1>
          <p className="text-gray-400 mt-1">Organize your video content</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="glass rounded-2xl p-6 hover:border-gold-400/50 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <FolderOpen size={24} style={{ color: category.color }} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{category.name}</h3>
                  <p className="text-gray-400 text-sm font-tamil">{category.nameTamil}</p>
                </div>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  category.isActive
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {category.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-gray-400">
                <Video size={16} />
                <span>{category.videosCount} videos</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-gray-400 hover:text-gold-400 hover:bg-gold-400/10 rounded-lg transition-all"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-6 w-full max-w-md animate-fade-in">
            <h2 className="text-xl font-bold text-white mb-6">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name (English) *
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
                  Name (Tamil)
                </label>
                <input
                  type="text"
                  value={formData.nameTamil}
                  onChange={(e) => setFormData({ ...formData, nameTamil: e.target.value })}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400 font-tamil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Color
                </label>
                <input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-full h-12 bg-navy-700 border border-navy-600 rounded-xl cursor-pointer"
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
                  onClick={() => {
                    setShowModal(false);
                    setEditingCategory(null);
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
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;

