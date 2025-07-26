import api from './api'

const wishlistService = {
  getWishlist: async () => {
    try {
      const response = await api.get('/users/wishlist')
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch wishlist')
    }
  },

  addToWishlist: async (productId) => {
    try {
      const response = await api.post('/users/wishlist', { productId })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to add to wishlist')
    }
  },

  removeFromWishlist: async (productId) => {
    try {
      const response = await api.delete(`/users/wishlist/${productId}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to remove from wishlist')
    }
  }
}

export default wishlistService 