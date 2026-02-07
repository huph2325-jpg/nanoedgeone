import api from './api'

export const authService = {
  register: async (data) => {
    try {
      const response = await api.post('/auth/register', data)
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token)
      }
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token')
  },

  verifyEmail: async (email, otp) => {
    try {
      const response = await api.post('/auth/verify-email', { email, otp })
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },
}
