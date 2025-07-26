// pages/Contact.jsx
import React, { useState } from 'react'

const Contact = () => {
  const [msg, setMsg] = useState('')
  const handleSubmit = e => {
    e.preventDefault()
    setMsg('Thank you! We will reply soon.')
    e.target.reset()
  }

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {msg && <p className="text-primary-600 mb-4">{msg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          placeholder="Name"
          className="w-full border rounded-lg px-4 py-2"
        />
        <input
          required
          type="email"
          placeholder="Email"
          className="w-full border rounded-lg px-4 py-2"
        />
        <textarea
          required
          placeholder="Message"
          className="w-full border rounded-lg px-4 py-2 h-32"
        />
        <button className="btn-primary">Send</button>
      </form>
    </div>
  )
}

export default Contact
