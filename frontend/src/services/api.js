import axios from 'axios'

// Base URL of the Spring Boot backend
const BASE_URL = 'http://localhost:8080'

// Create an axios instance with the base URL
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Before every request, attach the JWT token from localStorage (if present)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// --- Auth APIs ---
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data)
}

// --- Expense APIs ---
export const expenseAPI = {
  getAll: () => api.get('/api/expenses'),
  getById: (id) => api.get(`/api/expenses/${id}`),
  create: (data) => api.post('/api/expenses', data),
  update: (id, data) => api.put(`/api/expenses/${id}`, data),
  delete: (id) => api.delete(`/api/expenses/${id}`)
}

// --- Income APIs ---
export const incomeAPI = {
  getAll: () => api.get('/api/income'),
  getById: (id) => api.get(`/api/income/${id}`),
  create: (data) => api.post('/api/income', data),
  update: (id, data) => api.put(`/api/income/${id}`, data),
  delete: (id) => api.delete(`/api/income/${id}`)
}

// --- Budget APIs ---
export const budgetAPI = {
  get: (month, year) => api.get(`/api/budget?month=${month}&year=${year}`),
  set: (data) => api.post('/api/budget', data),
  update: (data) => api.put('/api/budget', data)
}

export default api
