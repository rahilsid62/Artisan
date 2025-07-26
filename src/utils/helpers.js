export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
      style: 'currency',
    currency: 'INR'
    }).format(price)
  }
  
  export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  }
  
  export const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }
  
  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  
  export const validatePassword = (password) => {
    return password.length >= 8
  }
  
  export const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  
  export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  export const getImageUrl = (path) => {
    if (!path) return '/placeholder.jpg';
    if (path.startsWith('http')) return path;
    return `http://localhost:8000/${path.replace(/^\\?/, '')}`;
  };
  