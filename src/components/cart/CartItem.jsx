// components/cart/CartItem.jsx
import React from 'react'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useCart } from '../../hooks/useCart'
import { formatPrice, getImageUrl } from '../../utils/helpers'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
      return
    }
    updateQuantity(item.id, newQuantity)
  }

  return (
    <div className="card p-6 hover:shadow-medium transition-all duration-300">
      <div className="flex items-center gap-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
          <img
            src={getImageUrl(item.images?.[0])}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          {item.inventory <= 5 && (
            <div className="absolute top-1 left-1">
              <span className="badge-error text-xs px-2 py-1">
                Low Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {item.name}
          </h3>
          
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-5 h-5 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {item.artisan?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <span className="text-sm text-gray-600">
              by {item.artisan?.name || 'Unknown Artisan'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                >
                  <MinusIcon className="h-4 w-4 text-gray-600" />
                </button>
                
                <span className="w-12 text-center font-semibold text-gray-900">
                  {item.quantity}
                </span>
                
                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                >
                  <PlusIcon className="h-4 w-4 text-gray-600" />
                </button>
              </div>

              {/* Price */}
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">
                  {formatPrice(item.price * item.quantity)}
                </div>
                <div className="text-sm text-gray-500">
                  {formatPrice(item.price)} each
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
