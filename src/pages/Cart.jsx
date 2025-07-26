// pages/Cart.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart'
import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import Checkout from '../components/cart/Checkout'
import { ShoppingBagIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

const Cart = () => {
  const { cartItems } = useCart()

  return (
    <div className="container-responsive py-8">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Link 
          to="/products" 
          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-50 rounded-xl transition-all duration-200"
        >
          <ArrowLeftIcon className="h-6 w-6" />
        </Link>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <ShoppingBagIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cartItems.length} items</p>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like you haven't added any items to your cart yet. Start exploring our handcrafted products!
          </p>
          <Link to="/products" className="btn-primary text-lg px-8 py-4">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <CartSummary />
            <Checkout />
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
