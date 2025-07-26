export const API_ENDPOINTS = {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      VALIDATE: '/auth/validate'
    },
    PRODUCTS: {
      ALL: '/products',
      BY_ID: (id) => `/products/${id}`,
      SEARCH: '/products/search',
      CREATE: '/products',
      UPDATE: (id) => `/products/${id}`,
      DELETE: (id) => `/products/${id}`
    },
    USERS: {
      PROFILE: '/users/profile',
      UPDATE: '/users/profile',
      ARTISANS: '/users/artisans'
    }
  }
  
  export const PRODUCT_CATEGORIES = [
    'pottery',
    'textiles',
    'jewelry',
    'woodwork',
    'metalwork',
    'glasswork'
  ]
  
  export const USER_ROLES = {
    CUSTOMER: 'customer',
    ARTISAN: 'artisan',
    ADMIN: 'admin'
  }
  
  export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  }
  