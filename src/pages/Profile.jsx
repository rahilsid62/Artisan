// pages/Profile.jsx
import React from 'react'
import { useAuth } from '../hooks/useAuth'
import ArtisanDashboard from '../components/artisan/ArtisanDashboard'
import OrderHistory from '../components/customer/OrderHistory'
import Wishlist from '../components/customer/Wishlist'

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-r from-primary-100 via-white to-primary-50 rounded-3xl shadow-xl p-8 mb-10 flex flex-col items-center border border-primary-200">
        <div className="flex items-center gap-4 mb-4">
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md border-2 ${user.role === 'artisan' ? 'bg-primary-100 text-primary-700 border-primary-300' : 'bg-green-100 text-green-700 border-green-300'}`}> 
            {user.role === 'artisan' ? 'Artisan Profile' : 'Customer Profile'}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Welcome, {user.name}</h1>
        <p className="text-gray-500 text-lg mb-2">{user.email}</p>
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg mb-2">
          {user.name?.charAt(0) || 'U'}
        </div>
      </div>
      <div className="divide-y divide-primary-100 bg-white rounded-2xl shadow-lg p-6">
      {user.role === 'artisan' ? (
        <ArtisanDashboard />
      ) : (
          <div className="grid md:grid-cols-2 gap-10 pt-4">
            <div>
          <OrderHistory />
            </div>
            <div>
          <Wishlist />
            </div>
          </div>
      )}
      </div>
    </div>
  )
}

export default Profile
