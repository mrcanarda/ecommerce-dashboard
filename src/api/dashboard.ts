import client from './client'

export const dashboardApi = {
  getSummary: async () => {
    const response = await client.get('/api/dashboard/summary')
    return response.data
  },

  getRevenue: async () => {
    const response = await client.get('/api/dashboard/revenue')
    return response.data
  },

  getCategories: async () => {
    const response = await client.get('/api/dashboard/categories')
    return response.data
  },
}