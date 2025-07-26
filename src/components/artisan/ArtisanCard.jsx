// components/artisan/ArtisanCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const ArtisanCard = ({ artisan }) => (
  <Link
    to={`/artisans/${artisan._id}`}
    className="card hover:shadow-lg transition-shadow block"
  >
    <img
      src={artisan.avatar || '/avatar-placeholder.png'}
      alt={artisan.name}
      className="h-40 w-full object-cover rounded-md mb-4"
    />
    <h3 className="text-lg font-semibold">{artisan.name}</h3>
    <p className="text-sm text-gray-600">{artisan.location}</p>
  </Link>
)

export default ArtisanCard
