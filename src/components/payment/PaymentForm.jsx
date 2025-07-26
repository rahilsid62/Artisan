// components/payment/PaymentForm.jsx
import React from 'react'

const PaymentForm = () => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4">Payment (demo)</h2>
    <p className="text-sm mb-4">
      Integrate Stripe / Razorpay here. This placeholder button simulates a
      successful payment.
    </p>
    <button
      onClick={() => (window.location.href = '/payment/success')}
      className="btn-primary"
    >
      Pay now
    </button>
  </div>
)

export default PaymentForm
