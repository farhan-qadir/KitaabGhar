const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper
const fetchAPI = async (endpoint, options = {}) => {
  const { method = 'GET', body = null, headers = {} } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body) config.body = JSON.stringify(body);

  // Add auth token if exists
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'An error occurred',
        errors: data.errors
      };
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ===== BOOKS API =====
export const bookAPI = {
  getAll: (page = 1, limit = 10, filters = {}) => {
    const params = new URLSearchParams({ page, limit, ...filters });
    return fetchAPI(`/books?${params}`);
  },

  getById: (id) => fetchAPI(`/books/${id}`),

  create: (bookData) => fetchAPI('/books', { method: 'POST', body: bookData }),

  update: (id, bookData) => fetchAPI(`/books/${id}`, { method: 'PUT', body: bookData }),

  delete: (id) => fetchAPI(`/books/${id}`, { method: 'DELETE' }),

  getCategories: () => fetchAPI('/books/categories')
};

// ===== USER API =====
export const userAPI = {
  register: (userData) => fetchAPI('/users/register', { method: 'POST', body: userData }),

  login: (credentials) => fetchAPI('/users/login', { method: 'POST', body: credentials }),

  getProfile: (userId) => fetchAPI(`/users/profile/${userId}`),

  updateProfile: (userId, profileData) => fetchAPI(`/users/profile/${userId}`, {
    method: 'PUT',
    body: profileData
  })
};

// ===== CART API =====
export const cartAPI = {
  getCart: (userId) => fetchAPI('/cart', { method: 'GET' }),

  addToCart: (userId, bookId, quantity) => fetchAPI('/cart/add', {
    method: 'POST',
    body: { userId, bookId, quantity }
  }),

  updateItem: (userId, bookId, quantity) => fetchAPI('/cart/update', {
    method: 'PUT',
    body: { userId, bookId, quantity }
  }),

  removeItem: (userId, bookId) => fetchAPI('/cart/remove', {
    method: 'DELETE',
    body: { userId, bookId }
  }),

  clearCart: (userId) => fetchAPI('/cart/clear', {
    method: 'DELETE',
    body: { userId }
  })
};

export default fetchAPI;
