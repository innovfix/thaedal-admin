import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
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

// API endpoints
export const authApi = {
  login: (data) => api.post('/admin/login', data),
  logout: () => api.post('/admin/logout'),
};

export const videoApi = {
  getAll: (params) => api.get('/videos', { params }),
  getById: (id) => api.get(`/videos/${id}`),
  create: (data) => api.post('/videos', data),
  update: (id, data) => api.put(`/videos/${id}`, data),
  delete: (id) => api.delete(`/videos/${id}`),
};

export const categoryApi = {
  getAll: () => api.get('/categories'),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

export const userApi = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

export const creatorApi = {
  getAll: (params) => api.get('/creators', { params }),
  getById: (id) => api.get(`/creators/${id}`),
  create: (data) => api.post('/creators', data),
  update: (id, data) => api.put(`/creators/${id}`, data),
  delete: (id) => api.delete(`/creators/${id}`),
};

export const subscriptionApi = {
  getPlans: () => api.get('/subscriptions/plans'),
  getAll: (params) => api.get('/subscriptions', { params }),
};

export const paymentApi = {
  getAll: (params) => api.get('/payments', { params }),
};

export const dashboardApi = {
  getStats: () => api.get('/admin/stats'),
};

export default api;

