// components/payment/PaymentSuccess.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => (
  <div className="text-center py-20">
    <h1 className="text-3xl font-bold text-primary-600 mb-4">
      Payment successful!
    </h1>
    <p className="mb-6">Thank you for your purchase.</p>
    <Link to="/products" className="btn-primary">
      Continue shopping
    </Link>
  </div>
)

export default PaymentSuccess
