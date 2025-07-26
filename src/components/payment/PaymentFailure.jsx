// components/payment/PaymentFailure.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentFailure = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold text-red-600 mb-4">Payment failed</h1>
    <p className="mb-6">Something went wrong. Please try again.</p>
    <Link to="/cart" className="btn-primary">
      Return to cart
    </Link>
  </div>
)

export default PaymentFailure
