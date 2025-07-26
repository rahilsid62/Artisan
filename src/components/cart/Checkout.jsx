// components/cart/Checkout.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import api from '../../services/api'
import { CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline'

const Checkout = () => {
  const { cartItems, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    setIsLoading(true)
    try {
      await api.post('/payments/checkout', { items: cartItems })
      clearCart()
      navigate('/payment/success')
    } catch (error) {
      console.error('Checkout failed:', error)
      // Handle error appropriately
    } finally {
      setIsLoading(false)
    }
  }

  const isDisabled = cartItems.length === 0 || isLoading

  return (
    <div className="space-y-4">
      <button
        onClick={handleCheckout}
        disabled={isDisabled}
        className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <CreditCardIcon className="h-6 w-6" />
            <span>Proceed to Checkout</span>
          </>
        )}
      </button>

      {/* Security Badge */}
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
        <LockClosedIcon className="h-4 w-4" />
        <span>256-bit SSL secured</span>
      </div>

      {/* Payment Methods */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-2">We accept</p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center font-bold">
            VISA
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center font-bold">
            MC
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center font-bold">
            AMEX
          </div>
          <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center font-bold">
            PP
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
