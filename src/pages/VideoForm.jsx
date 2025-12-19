import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Loader2, Video, Link as LinkIcon } from 'lucide-react';

const VideoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    videoType: 'youtube',
    thumbnailUrl: '',
    categoryId: '',
    creatorId: '',
    isPremium: false,
    isPublished: true,
    duration: 0,
  });

  const categories = [
    { id: '1', name: 'Share Market' },
    { id: '2', name: 'Finance' },
    { id: '3', name: 'Part Time Income' },
    { id: '4', name: 'YouTube' },
    { id: '5', name: 'Business' },
  ];

  const creators = [
    { id: '1', name: 'Thaedal Official' },
    { id: '2', name: 'Finance Guru' },
    { id: '3', name: 'Stock Master' },
    { id: '4', name: 'Business Coach' },
  ];

  useEffect(() => {
    if (isEdit) {
      // Fetch video data
      setLoading(true);
      setTimeout(() => {
        setFormData({
          title: 'Stock Market Basics for Beginners',
          description: 'Learn the fundamentals of stock market investing in this comprehensive guide.',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          videoType: 'youtube',
          thumbnailUrl: 'https://picsum.photos/seed/1/640/360',
          categoryId: '1',
          creatorId: '2',
          isPremium: false,
          isPublished: true,
          duration: 930,
        });
        setLoading(false);
      }, 500);
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      navigate('/videos');
    }, 1000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-gold-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/videos')}
          className="p-2 hover:bg-navy-700 rounded-xl transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-400" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Video' : 'Add New Video'}
          </h1>
          <p className="text-gray-400 mt-1">
            {isEdit ? 'Update video details' : 'Upload a new video to your platform'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6 space-y-6">
          {/* Basic Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter video title"
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter video description"
                  rows={4}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Creator *
                </label>
                <select
                  name="creatorId"
                  value={formData.creatorId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
                  required
                >
                  <option value="">Select creator</option>
                  {creators.map((creator) => (
                    <option key={creator.id} value={creator.id}>
                      {creator.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Video Source */}
          <div className="border-t border-navy-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Video Source</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video Type
                </label>
                <div className="flex gap-4">
                  {['youtube', 'hosted', 'vimeo'].map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${
                        formData.videoType === type
                          ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30'
                          : 'bg-navy-700 text-gray-400 border border-navy-600 hover:border-navy-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="videoType"
                        value={type}
                        checked={formData.videoType === type}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video URL *
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="url"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full pl-10 pr-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Thumbnail URL
                </label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="flex-1 px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                  />
                  {formData.thumbnailUrl && (
                    <img
                      src={formData.thumbnailUrl}
                      alt="Thumbnail preview"
                      className="w-24 h-16 object-cover rounded-lg"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Duration (seconds)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-3 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="border-t border-navy-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Settings</h3>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPremium"
                  checked={formData.isPremium}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400 focus:ring-gold-400 focus:ring-offset-navy-800"
                />
                <span className="text-gray-300">Premium Content</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-navy-600 bg-navy-700 text-gold-400 focus:ring-gold-400 focus:ring-offset-navy-800"
                />
                <span className="text-gray-300">Published</span>
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/videos')}
            className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Saving...
              </>
            ) : (
              <>{isEdit ? 'Update Video' : 'Create Video'}</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VideoForm;

