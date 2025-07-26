// components/product/ProductDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import productService from '../../services/productService'
import LoadingSpinner from '../common/LoadingSpinner'
import { useCart } from '../../hooks/useCart'
import ReviewList from '../reviews/ReviewList'
import { formatPrice, getImageUrl } from '../../utils/helpers'
import { useAuth } from '../../hooks/useAuth'

const ProductDetail = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { addToCart } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setProduct(null);
      return;
    }
    productService
      .getProductById(id)
      .then(setProduct)
      .finally(() => setLoading(false))
  }, [id])

  const nextImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    }
  }

  if (loading) return <LoadingSpinner />
  if (!product) return <p className="text-center py-20">Product not found</p>

  const hasMultipleImages = product.images && product.images.length > 1

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Image Gallery */}
      <div className="relative">
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={getImageUrl(product.images?.[currentImageIndex])}
            alt={product.name}
            className="w-full h-auto max-h-96 object-contain bg-gray-50"
          />
          
          {/* Navigation arrows for multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Previous image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                aria-label="Next image"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          
          {/* Image counter */}
          {hasMultipleImages && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {product.images.length}
            </div>
          )}
        </div>

        {/* Thumbnail gallery */}
        {hasMultipleImages && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentImageIndex 
                    ? 'border-primary-500 shadow-lg' 
                    : 'border-gray-200 hover:border-primary-300'
                }`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="w-full h-full object-contain bg-gray-100"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-600 mb-4">by {product.artisan?.name}</p>
        <p className="text-2xl font-bold text-primary-600 mb-4">
          {formatPrice(product.price)}
        </p>
        <p className="mb-6">{product.description}</p>

        {/* Only show Add to Cart if user is not the artisan who owns the product */}
        {(!user || !product.artisan || user._id !== product.artisan._id) && (
          <button
            className="btn-primary mb-8"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        )}

        <ReviewList reviews={product.reviews || []} />
      </div>
    </div>
  )
}

export default ProductDetail
