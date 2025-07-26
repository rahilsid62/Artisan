// components/customer/Wishlist.jsx
import React from 'react'
import ProductCard from '../product/ProductCard'
import { useWishlist } from '../../context/WishlistContext'
import LoadingSpinner from '../common/LoadingSpinner'

const Wishlist = () => {
  const { wishlist, loading } = useWishlist()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-pink-400 rounded-full mr-2"></span>
        <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
        Wishlist
      </h2>
      {loading ? (
        <LoadingSpinner />
      ) : wishlist.length === 0 ? (
        <div className="text-gray-500 italic text-center py-8 bg-pink-50 rounded-xl shadow-inner">No items in your wishlist yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlist.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
