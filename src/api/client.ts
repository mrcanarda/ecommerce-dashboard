import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5209'

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Her istekte token ekle
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('orion_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 401 gelirse login'e yönlendir
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('orion_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default client