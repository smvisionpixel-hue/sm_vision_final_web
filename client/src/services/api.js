/**
 * API Client for SM Vision Pixel
 * Supports both development proxy and direct configured backend URL
 */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    ...(options.headers || {})
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.error || (data?.errors && data.errors.join(', ')) || `Request failed with status ${res.status}`;
      const error = new Error(errorMessage);
      error.status = res.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.status) throw err;
    // Network / connection error
    throw new Error('Unable to connect to SM Vision Pixel server. Please check your internet connection or backend status.');
  }
}

export const api = {
  // Public APIs
  checkHealth: () => request('/health', { method: 'GET' }),
  getServices: () => request('/services', { method: 'GET' }),
  submitContact: (formData) => request('/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),
  submitQuote: (formData) => request('/quote', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),

  // Client Portal API
  clientLookup: (identifier) => request('/client/lookup', {
    method: 'POST',
    body: JSON.stringify({ identifier })
  }),

  // Admin APIs
  adminLogin: (credentials) => request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  adminGetMe: (token) => request('/admin/me', {
    method: 'GET',
    token
  }),
  adminGetInquiries: (token, params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/admin/inquiries${query ? `?${query}` : ''}`, {
      method: 'GET',
      token
    });
  },
  adminUpdateStatus: (token, id, status) => request(`/admin/inquiries/${id}/status`, {
    method: 'PATCH',
    token,
    body: JSON.stringify({ status })
  }),
  adminDeleteInquiry: (token, id) => request(`/admin/inquiries/${id}`, {
    method: 'DELETE',
    token
  })
};

export default api;
