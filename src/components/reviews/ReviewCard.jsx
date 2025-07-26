// components/reviews/ReviewCard.jsx
import React from 'react'

const ReviewCard = ({ review }) => (
  <div className="border border-gray-200 rounded-lg p-4 space-y-1">
    <p className="font-semibold">{review.user?.name}</p>
    <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
    <p>{review.comment}</p>
    <p className="text-xs text-gray-500">
      {review.date ? new Date(review.date).toLocaleDateString() : new Date().toLocaleDateString()}
    </p>
  </div>
)

export default ReviewCard
