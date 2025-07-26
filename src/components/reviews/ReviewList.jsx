// components/reviews/ReviewList.jsx
import React, { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewForm from './ReviewForm'

const ReviewList = ({ reviews: initialReviews }) => {
  const [reviews, setReviews] = useState(initialReviews)

  const handleReviewSubmit = (product) => {
    setReviews(product.reviews)
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Reviews</h3>
      <ReviewForm onSubmit={handleReviewSubmit} />
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((r, i) => <ReviewCard key={i} review={r} />)
      )}
    </div>
  )
}

export default ReviewList
