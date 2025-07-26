// components/artisan/ArtisanDashboard.jsx
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import productService from '../../services/productService'
import ProductCard from '../product/ProductCard'
import LoadingSpinner from '../common/LoadingSpinner'
import ProductForm from '../product/ProductForm'

const ArtisanDashboard = () => {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)

  const fetch = () =>
    productService.getAllProducts({ artisan: user._id }).then(setProducts)

  useEffect(() => {
    fetch().finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-10">
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        {!editingProduct && <ProductForm onSuccess={fetch} />}
        {editingProduct && (
          <div className="mb-8">
            <ProductForm
              initialValues={editingProduct}
              editing={true}
              onSuccess={() => {
                setEditingProduct(null)
                fetch()
              }}
              onSubmit={() => setEditingProduct(null)}
            />
            <button className="btn-secondary mt-2" onClick={() => setEditingProduct(null)}>Cancel</button>
          </div>
        )}
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <span className="inline-block w-2 h-6 bg-primary-400 rounded-full mr-2"></span>
          Your products
        </h2>
        {products.length === 0 ? (
          <p className="text-gray-500">No products yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => (
              <div key={p._id} className="relative group transition-transform hover:-translate-y-1">
                <ProductCard product={p} showActions={false} currentUser={user} />
                <button
                  className="absolute top-2 right-2 btn-secondary btn-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => setEditingProduct(p)}
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ArtisanDashboard
