import client from './client'

export const ordersApi = {
  getAll: async (params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }) => {
    const response = await client.get('/api/orders', { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await client.get(`/api/orders/${id}`)
    return response.data
  },

  create: async (data: {
    customerId: string
    customerName: string
    customerEmail: string
    customerLocation: string
    items: {
      productName: string
      quantity: number
      price: number
    }[]
  }) => {
    const response = await client.post('/api/orders', data)
    return response.data
  },

  updateStatus: async (id: number, status: string) => {
    const response = await client.patch(`/api/orders/${id}/status`, { status })
    return response.data
  },
}