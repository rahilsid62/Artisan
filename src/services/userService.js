import api from './api'

const userService = {
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch profile')
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update profile')
    }
  },

  uploadAvatar: async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload avatar')
    }
  },

  getArtisans: async () => {
    try {
      const response = await api.get('/users/artisans')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch artisans')
    }
  },

  getArtisanById: async (id) => {
    try {
      const response = await api.get(`/users/artisans/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch artisan')
    }
  }
}

export default userService
