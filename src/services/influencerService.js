import api from './api'

export const influencerService = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/influencers', { params })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/influencers/${id}`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  search: async (query) => {
    try {
      const response = await api.get('/influencers/search', { params: { q: query } })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getPortfolio: async (id) => {
    try {
      const response = await api.get(`/influencers/${id}/portfolio`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  getReviews: async (id) => {
    try {
      const response = await api.get(`/influencers/${id}/reviews`)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  updateProfile: async (id, data) => {
    try {
      const response = await api.put(`/influencers/${id}/profile`, data)
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}
