// components/cart/CartSummary.jsx
import React from 'react'
import { useCart } from '../../hooks/useCart'
import { ShoppingBagIcon, TruckIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '../../utils/helpers'

const CartSummary = () => {
  const { getTotalItems, getTotalPrice } = useCart()

  const subtotal = getTotalPrice()
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
          <ShoppingBagIcon className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
          <p className="text-sm text-gray-600">{getTotalItems()} items</p>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-success-600">Free</span>
            ) : (
              formatPrice(shipping)
            )}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-primary-600">
              {formatPrice(total)}
            </span>
          </div>
        </div>
      </div>

      {/* Free Shipping Notice */}
      {subtotal < 50 && (
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <TruckIcon className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">
              Add {formatPrice(50 - subtotal)} more for free shipping
            </span>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <ShieldCheckIcon className="h-4 w-4" />
        <span>Secure checkout with SSL encryption</span>
      </div>
    </div>
  )
}

export default CartSummary
