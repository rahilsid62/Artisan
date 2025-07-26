import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import ProductFilters from '../components/product/ProductFilters'
import LoadingSpinner from '../components/common/LoadingSpinner'
import SearchBar from '../components/common/SearchBar'
import { useAuth } from '../hooks/useAuth'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    priceRange: searchParams.get('priceRange') || '',
    sortBy: searchParams.get('sortBy') || 'newest',
    search: searchParams.get('search') || ''
  })

  const { products, loading, error } = useProducts(filters)
  const { user } = useAuth()

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
    // Update URL params
    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    setSearchParams(params)
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Handcrafted Products
        </h1>
        <p className="text-lg text-gray-600">
          Discover unique, handmade items from local artisans
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:w-3/4">
          <div className="mb-6">
            <SearchBar
              value={filters.search}
              onChange={(search) => handleFilterChange({ ...filters, search })}
              placeholder="Search products..."
            />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              Showing {products.length} products
            </p>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
              className="border border-gray-300 rounded-lg px-4 py-2"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} currentUser={user} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
