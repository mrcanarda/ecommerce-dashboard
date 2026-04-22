import client from './client'

export interface LoginCredentials {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  name: string
  email: string
  role: string
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await client.post('/api/auth/login', credentials)
    return response.data
  },

  me: async () => {
    const response = await client.get('/api/auth/me')
    return response.data
  },
}

export const setToken = (token: string) => {
  localStorage.setItem('orion_token', token)
  document.cookie = `orion_token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`
}

export const getToken = () => {
  return localStorage.getItem('orion_token')
}

export const removeToken = () => {
  localStorage.removeItem('orion_token')
  document.cookie = 'orion_token=; path=/; max-age=0'
}

export const isAuthenticated = () => {
  return !!getToken()
}