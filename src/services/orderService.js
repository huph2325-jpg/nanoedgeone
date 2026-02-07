import api from './api'

export const orderService = {
  create: async (data) => {
    try {
      const response = await api.post('/orders', data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getAll: async (params = {}) => {
    try {
      const response = await api.get('/orders', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  update: async (id, data) => {
    try {
      const response = await api.put(`/orders/${id}`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  processPayment: async (orderId, paymentData) => {
    try {
      const response = await api.post(`/orders/${orderId}/payment`, paymentData)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}
