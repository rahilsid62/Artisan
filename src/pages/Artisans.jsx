// pages/Artisans.jsx
import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ArtisanList from '../components/artisan/ArtisanList'

const Artisans = () => {
  const [artisans, setArtisans] = useState(null)

  useEffect(() => {
    userService.getArtisans().then(setArtisans)
  }, [])

  if (!artisans) return <LoadingSpinner />

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 text-center">
        Local Artisans
      </h1>
      <ArtisanList artisans={artisans} />
    </div>
  )
}

export default Artisans
