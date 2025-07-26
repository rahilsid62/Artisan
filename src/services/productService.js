import api from './api'

const productService = {
  getAllProducts: async (filters = {}) => {
    try {
      const response = await api.get('/products', { params: filters })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products')
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Product not found')
    }
  },

  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create product')
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update product')
    }
  },

  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`)
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete product')
    }
  },

  searchProducts: async (query) => {
    try {
      const response = await api.get('/products/search', { params: { q: query } })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Search failed')
    }
  },

  postReview: async ({ productId, rating, comment }) => {
    try {
      const response = await api.post('/reviews', { productId, rating, comment })
      return response.data
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to post review')
    }
  }
}

export default productService
