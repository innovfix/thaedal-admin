import axios from 'axios';

// Base URL for the API - update this for production
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
);

// API endpoints - All admin routes are under /admin prefix
export const authApi = {
  login: (data) => api.post('/admin/login', data),
  logout: () => api.post('/admin/logout'),
  profile: () => api.get('/admin/profile'),
};

export const dashboardApi = {
  getStats: () => api.get('/admin/stats'),
};

export const videoApi = {
  getAll: (params) => api.get('/admin/videos', { params }),
  getById: (id) => api.get(`/admin/videos/${id}`),
  create: (data) => api.post('/admin/videos', data),
  update: (id, data) => api.put(`/admin/videos/${id}`, data),
  delete: (id) => api.delete(`/admin/videos/${id}`),
};

export const categoryApi = {
  getAll: (params) => api.get('/admin/categories', { params }),
  getById: (id) => api.get(`/admin/categories/${id}`),
  create: (data) => api.post('/admin/categories', data),
  update: (id, data) => api.put(`/admin/categories/${id}`, data),
  delete: (id) => api.delete(`/admin/categories/${id}`),
};

export const userApi = {
  getAll: (params) => api.get('/admin/users', { params }),
  getById: (id) => api.get(`/admin/users/${id}`),
  delete: (id) => api.delete(`/admin/users/${id}`),
  toggleSubscription: (id) => api.post(`/admin/users/${id}/toggle-subscription`),
};

export const creatorApi = {
  getAll: (params) => api.get('/admin/creators', { params }),
  getById: (id) => api.get(`/admin/creators/${id}`),
};

export const subscriptionApi = {
  getPlans: () => api.get('/admin/subscriptions/plans'),
  getAll: (params) => api.get('/admin/subscriptions', { params }),
  getById: (id) => api.get(`/admin/subscriptions/${id}`),
  updateStatus: (id, status) => api.post(`/admin/subscriptions/${id}/status`, { status }),
};

export const paymentApi = {
  getAll: (params) => api.get('/admin/payments', { params }),
  getById: (id) => api.get(`/admin/payments/${id}`),
};

export const legalPageApi = {
  getAll: () => api.get('/admin/legal-pages'),
  getById: (pageType) => api.get(`/admin/legal-pages/${pageType}`),
  update: (pageType, data) => api.put(`/admin/legal-pages/${pageType}`, data),
};

export const notificationApi = {
  getHistory: () => api.get('/admin/notifications'),
  send: (data) => api.post('/admin/notifications/send', data),
};

export const paymentSettingsApi = {
  get: () => api.get('/admin/payment-settings'),
  update: (data) => api.put('/admin/payment-settings', data),
};

export default api;

