import React, { createContext, useContext, useState, useEffect } from 'react'
import wishlistService from '../services/wishlistService'
import { useAuth } from '../hooks/useAuth'

export const WishlistContext = createContext(null)

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  // Fetch wishlist when user logs in
  useEffect(() => {
    if (user) {
      fetchWishlist()
    } else {
      setWishlist([])
    }
  }, [user])

  const fetchWishlist = async () => {
    if (!user) return
    setLoading(true)
    try {
      const data = await wishlistService.getWishlist()
      setWishlist(data)
    } catch (error) {
      console.error('Failed to fetch wishlist:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToWishlist = async (productId) => {
    if (!user) {
      // If not logged in, show login prompt or handle accordingly
      console.log('User must be logged in to add to wishlist')
      return
    }
    try {
      const updatedWishlist = await wishlistService.addToWishlist(productId)
      setWishlist(updatedWishlist)
    } catch (error) {
      console.error('Failed to add to wishlist:', error)
      throw error
    }
  }

  const removeFromWishlist = async (productId) => {
    if (!user) return
    try {
      const updatedWishlist = await wishlistService.removeFromWishlist(productId)
      setWishlist(updatedWishlist)
    } catch (error) {
      console.error('Failed to remove from wishlist:', error)
      throw error
    }
  }

  const isInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId)
  }

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    refreshWishlist: fetchWishlist
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
} 