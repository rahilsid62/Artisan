// pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
    <p className="mb-6">Page not found.</p>
    <Link to="/" className="btn-primary">
      Go home
    </Link>
  </div>
)

export default NotFound
