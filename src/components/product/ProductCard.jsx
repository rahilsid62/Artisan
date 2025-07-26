import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useWishlist } from '../../context/WishlistContext'
import { HeartIcon, ShoppingCartIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { formatPrice, getImageUrl } from '../../utils/helpers'

const ProductCard = ({ product, showActions = true, currentUser }) => {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [isHovered, setIsHovered] = useState(false)

  const isOwnProduct = currentUser && product.artisan && currentUser._id === product.artisan._id;

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
  }

  const handleWishlist = async (e) => {
    e.preventDefault()
    try {
      if (isInWishlist(product._id)) {
        await removeFromWishlist(product._id)
      } else {
        await addToWishlist(product._id)
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error)
    }
  }

  const averageRating = product.reviews?.length > 0 
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length 
    : 0

  return (
    <div 
      className="group bg-white rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={getImageUrl(product.images?.[0])}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay with actions */}
        {showActions && !isOwnProduct && (
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-2">
            <button
              onClick={handleWishlist}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all duration-200 hover:scale-110"
            >
              {isInWishlist(product._id) ? (
                <HeartIconSolid className="h-5 w-5 text-error-500" />
              ) : (
                <HeartIcon className="h-5 w-5 text-gray-600" />
              )}
            </button>
            <Link
                to={`/products/${product._id}`}
              className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-medium hover:bg-white transition-all duration-200 hover:scale-110"
            >
              <EyeIcon className="h-5 w-5 text-gray-600" />
            </Link>
          </div>
        </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.featured && (
            <span className="badge-primary text-xs font-bold px-2 py-1">
              Featured
            </span>
          )}
          {product.inventory <= 5 && (
            <span className="badge-error text-xs font-bold px-2 py-1">
              Low Stock
            </span>
          )}
        </div>

        {/* Rating */}
        {averageRating > 0 && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <StarIcon className="h-4 w-4 text-warning-500 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{averageRating.toFixed(1)}</span>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <Link to={`/products/${product._id}`}>
            <h3 className="text-lg font-bold text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {product.artisan?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              by {product.artisan?.name || 'Unknown Artisan'}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.inventory <= 5 && (
              <span className="text-sm text-error-600 font-medium">
                Only {product.inventory} left
              </span>
            )}
          </div>
          {showActions && !isOwnProduct && (
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2 px-4 py-2 text-sm"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
          )}
        </div>

        {/* Additional Info */}
        {product.category && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="badge-secondary text-xs">
              {product.category}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductCard
