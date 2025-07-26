// components/artisan/ArtisanProfile.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../product/ProductCard'
import userService from '../../services/userService'
import productService from '../../services/productService'
import LoadingSpinner from '../common/LoadingSpinner'
import { useAuth } from '../../hooks/useAuth'

const ArtisanProfile = () => {
  const { id } = useParams()
  const [artisan, setArtisan] = useState(null)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const artisanData = await userService.getArtisanById(id)
        setArtisan(artisanData)
        const productsData = await productService.getAllProducts({ artisan: id })
        setProducts(productsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600 text-center py-10">{error}</div>
  if (!artisan) return <div className="text-center py-10">Artisan not found.</div>

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-100 via-white to-primary-50 rounded-3xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-primary-200 mb-8 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-200 rounded-full opacity-30 blur-2xl"></div>
      <img
        src={artisan.avatar || '/avatar-placeholder.png'}
        alt={artisan.name}
          className="h-40 w-40 object-cover rounded-full border-4 border-primary-300 shadow-lg mb-4 md:mb-0"
      />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">{artisan.name}</h1>
          <p className="text-primary-700 font-semibold mb-1 flex items-center justify-center md:justify-start gap-2">
            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {artisan.location || 'Unknown location'}
          </p>
          <p className="text-gray-600 mb-2 italic">{artisan.bio}</p>
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-md border-2 bg-primary-100 text-primary-700 border-primary-300 mt-2">Artisan</span>
      </div>
    </div>

      {/* Products Section */}
    <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-primary-400 rounded-full mr-2"></span>
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="text-gray-500">No products found.</div>
          ) : (
            products.map(p => (
              <ProductCard key={p._id} product={p} showActions={false} currentUser={user} />
            ))
          )}
      </div>
    </section>
  </div>
)
}

export default ArtisanProfile
