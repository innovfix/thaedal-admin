import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  ThumbsUp,
  Edit,
  Trash2,
  Video,
  Play,
} from 'lucide-react';

// Mock data
const mockVideos = [
  {
    id: '1',
    title: 'Stock Market Basics for Beginners',
    thumbnail: 'https://picsum.photos/seed/1/320/180',
    category: 'Share Market',
    creator: 'Finance Guru',
    views: 12500,
    likes: 890,
    duration: '15:30',
    status: 'published',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'How to Start Investing in 2024',
    thumbnail: 'https://picsum.photos/seed/2/320/180',
    category: 'Finance',
    creator: 'Stock Master',
    views: 8900,
    likes: 654,
    duration: '12:45',
    status: 'published',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'Start Your YouTube Channel Today',
    thumbnail: 'https://picsum.photos/seed/3/320/180',
    category: 'YouTube',
    creator: 'Thaedal Official',
    views: 15600,
    likes: 1200,
    duration: '20:00',
    status: 'published',
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Business Ideas for 2024',
    thumbnail: 'https://picsum.photos/seed/4/320/180',
    category: 'Business',
    creator: 'Business Coach',
    views: 7800,
    likes: 432,
    duration: '18:15',
    status: 'draft',
    createdAt: '2024-01-12',
  },
];

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setVideos(mockVideos);
      setLoading(false);
    }, 500);
  }, []);

  const filteredVideos = videos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this video?')) {
      setVideos(videos.filter((v) => v.id !== id));
    }
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Videos</h1>
          <p className="text-gray-400 mt-1">Manage all your video content</p>
        </div>
        <Link
          to="/videos/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gold-400 to-gold-500 text-navy-900 font-semibold rounded-xl hover:from-gold-500 hover:to-gold-600 transition-all"
        >
          <Plus size={20} />
          Add Video
        </Link>
      </div>

      {/* Filters */}
      <div className="glass rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search videos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gold-400"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-navy-700 border border-navy-600 rounded-xl text-white focus:outline-none focus:border-gold-400"
          >
            <option value="all">All Categories</option>
            <option value="Share Market">Share Market</option>
            <option value="Finance">Finance</option>
            <option value="YouTube">YouTube</option>
            <option value="Business">Business</option>
          </select>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="glass rounded-2xl overflow-hidden hover:border-gold-400/50 transition-all group"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button className="p-3 bg-gold-400 rounded-full">
                  <Play size={24} className="text-navy-900" fill="currentColor" />
                </button>
              </div>
              <span className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                {video.duration}
              </span>
              <span
                className={`absolute top-2 left-2 px-2 py-1 text-xs rounded ${
                  video.status === 'published'
                    ? 'bg-green-500/80 text-white'
                    : 'bg-yellow-500/80 text-white'
                }`}
              >
                {video.status}
              </span>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-white font-medium line-clamp-2 mb-2">{video.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{video.creator}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {video.views.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={14} />
                    {video.likes.toLocaleString()}
                  </span>
                </div>
                
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === video.id ? null : video.id)}
                    className="p-1 hover:bg-navy-700 rounded"
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {activeDropdown === video.id && (
                    <div className="absolute right-0 bottom-full mb-1 w-32 bg-navy-800 border border-navy-700 rounded-xl shadow-xl py-1 z-10">
                      <Link
                        to={`/videos/${video.id}/edit`}
                        className="flex items-center gap-2 px-3 py-2 text-gray-300 hover:bg-navy-700"
                      >
                        <Edit size={14} />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(video.id)}
                        className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-400/10 w-full"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <Video size={48} className="mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">No videos found</p>
        </div>
      )}
    </div>
  );
};

export default Videos;

