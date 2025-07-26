// components/customer/OrderHistory.jsx
import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import LoadingSpinner from '../common/LoadingSpinner'
import { formatPrice } from '../../utils/helpers'

const OrderHistory = () => {
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data))
  }, [])

  if (!orders) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span className="inline-block w-2 h-6 bg-primary-400 rounded-full mr-2"></span>
        <svg className="w-6 h-6 text-primary-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 16h6" /></svg>
        Order History
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(o => (
          <div
            key={o._id}
              className="border-2 border-primary-100 rounded-xl p-5 bg-white shadow-sm hover:shadow-lg transition-shadow duration-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
              <div>
                <p className="font-semibold text-primary-700 mb-1 flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M9 16h6" /></svg>
                  Order #{o._id}
                </p>
                <p className="text-gray-500 text-sm">{new Date(o.orderDate).toLocaleDateString()}</p>
                <p className="text-primary-600 font-semibold text-lg mt-1">
                  {formatPrice(o.totalAmount)}
                </p>
                <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow border-2 ${o.status === 'delivered' ? 'bg-green-100 text-green-700 border-green-300' : o.status === 'pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-gray-100 text-gray-700 border-gray-300'}`}>{o.status}</span>
              </div>
            </div>
          ))}
          </div>
      )}
    </div>
  )
}

export default OrderHistory
