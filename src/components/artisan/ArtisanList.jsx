// components/artisan/ArtisanList.jsx
import React from 'react'
import ArtisanCard from './ArtisanCard'

const ArtisanList = ({ artisans }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {artisans.map(a => (
      <ArtisanCard key={a._id} artisan={a} />
    ))}
  </div>
)

export default ArtisanList
