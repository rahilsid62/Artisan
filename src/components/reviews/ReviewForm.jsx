// components/reviews/ReviewForm.jsx
import React, { useState } from 'react'
import productService from '../../services/productService'
import { useParams } from 'react-router-dom'

const ReviewForm = ({ onSubmit }) => {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { id: productId } = useParams()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const product = await productService.postReview({ productId, rating, comment })
      onSubmit(product)
      setRating(5)
      setComment('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        Rating:
        <select
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
          className="ml-2 border rounded"
        >
          {[5, 4, 3, 2, 1].map(r => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      <textarea
        required
        placeholder="Write a review…"
        value={comment}
        onChange={e => setComment(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 h-24"
      />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button className="btn-primary" disabled={loading}>{loading ? 'Submitting...' : 'Submit review'}</button>
    </form>
  )
}

export default ReviewForm
