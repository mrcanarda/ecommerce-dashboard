import client from './client'

export const productsApi = {
  getAll: async (status?: string, category?: string) => {
    const params: Record<string, string> = {}
    if (status) params.status = status
    if (category) params.category = category
    const response = await client.get('/api/products', { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await client.get(`/api/products/${id}`)
    return response.data
  },

  create: async (data: {
    name: string
    category: string
    price: number
    stock: number
    status: string
    image: string
  }) => {
    const response = await client.post('/api/products', data)
    return response.data
  },

  update: async (id: number, data: {
    name?: string
    category?: string
    price?: number
    stock?: number
    status?: string
    image?: string
  }) => {
    const response = await client.put(`/api/products/${id}`, data)
    return response.data
  },

  delete: async (id: number) => {
    const response = await client.delete(`/api/products/${id}`)
    return response.data
  },
}