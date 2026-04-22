import client from './client'

export const customersApi = {
  getAll: async (status?: string) => {
    const params: Record<string, string> = {}
    if (status) params.status = status
    const response = await client.get('/api/customers', { params })
    return response.data
  },

  getById: async (id: number) => {
    const response = await client.get(`/api/customers/${id}`)
    return response.data
  },
}