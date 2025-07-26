// components/auth/ResetPassword.jsx
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import authService from '../../services/authService'

const ResetPassword = () => {
  const { token } = useParams()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    if (password !== confirm) return setMsg('Passwords do not match')
    setLoading(true)
    try {
      await authService.resetPassword(token, password)
      navigate('/login')
    } catch (err) {
      setMsg(err.message)
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
        <h2 className="text-2xl font-bold text-gray-900">Set new password</h2>
        {msg && <p className="text-sm text-center text-red-600">{msg}</p>}
        <input
          type="password"
          required
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <input
          type="password"
          required
          placeholder="Confirm password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50"
        >
          {loading ? 'Resetting…' : 'Reset password'}
        </button>
      </form>
    </div>
  )
}

export default ResetPassword
