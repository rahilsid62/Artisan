// components/auth/ForgotPassword.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await authService.forgotPassword(email)
      setMessage('Reset link sent! Check your inbox.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-900">Forgot password</h2>
        {message && <p className="text-sm text-center text-primary-600">{message}</p>}
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Send reset link'}
        </button>
      </form>
    </div>
  )
}

export default ForgotPassword
