import React, { useState, useEffect } from 'react'
import productService from '../../services/productService'
import { getImageUrl } from '../../utils/helpers'

const ProductForm = ({ initialValues = {}, onSubmit, onSuccess, editing = false }) => {
  const [form, setForm] = useState({
    name: initialValues.name || '',
    description: initialValues.description || '',
    price: initialValues.price || '',
    category: initialValues.category || '',
    images: [], // new images to upload
    existingImages: initialValues.images || [], // already uploaded images
  })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    setForm({
      name: initialValues.name || '',
      description: initialValues.description || '',
      price: initialValues.price || '',
      category: initialValues.category || '',
      images: [],
      existingImages: initialValues.images || [],
    })
  }, [initialValues.name, initialValues.description, initialValues.price, initialValues.category, initialValues.images])

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleFiles = e => {
    const files = Array.from(e.target.files)
    setForm({ ...form, images: [...form.images, ...files] })
  }

  const removeNewImage = (index) => {
    setForm({ ...form, images: form.images.filter((_, i) => i !== index) })
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
    setForm({ ...form, images: [...form.images, ...files] })
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleRemoveExistingImage = (img) => {
    setForm({ ...form, existingImages: form.existingImages.filter(i => i !== img) })
  }

  const handleMoveImage = (idx, direction) => {
    const arr = [...form.existingImages]
    if (direction === 'up' && idx > 0) {
      [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
    } else if (direction === 'down' && idx < arr.length - 1) {
      [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]]
    }
    setForm({ ...form, existingImages: arr })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const data = new FormData()
    data.append('name', form.name)
    data.append('description', form.description)
    data.append('price', form.price)
    data.append('category', form.category)
    // Existing images to keep
    form.existingImages.forEach(img => data.append('existingImages', img))
    // New images to upload
    form.images.forEach(f => data.append('images', f))
    setLoading(true)
    try {
      if (editing && initialValues._id) {
        await productService.updateProduct(initialValues._id, data)
        setMsg('Product updated!')
      } else {
        await productService.createProduct(data)
        setMsg('Product created!')
      }
      onSuccess?.()
      setForm({
        name: '',
        description: '',
        price: '',
        category: '',
        images: [],
        existingImages: [],
      })
    } catch (err) {
      setMsg(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <h3 className="text-xl font-semibold">{editing ? 'Edit product' : 'Add new product'}</h3>
      {msg && <p className="text-sm text-primary-600">{msg}</p>}
      <input
        name="name"
        required
        placeholder="Product name"
        value={form.name}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white"
      />
      <textarea
        name="description"
        required
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 h-28 text-gray-900 bg-white"
      />
      <input
        name="price"
        type="number"
        min="0"
        step="0.01"
        required
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white"
      />
      <input
        name="category"
        required
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white"
      />
      {/* Existing images */}
      {editing && form.existingImages.length > 0 && (
        <div className="flex flex-wrap gap-4 mb-2">
          {form.existingImages.map((img, idx) => (
            <div key={img} className="relative group">
              <img src={getImageUrl(img)} alt="Product" className="w-24 h-24 object-cover rounded-lg border" />
              <div className="absolute top-1 left-1 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleMoveImage(idx, 'up')}
                  disabled={idx === 0}
                  className="bg-white/80 text-primary-600 rounded-full p-1 text-xs shadow hover:bg-primary-100 disabled:opacity-40"
                  title="Move up"
                >↑</button>
                <button
                  type="button"
                  onClick={() => handleMoveImage(idx, 'down')}
                  disabled={idx === form.existingImages.length - 1}
                  className="bg-white/80 text-primary-600 rounded-full p-1 text-xs shadow hover:bg-primary-100 disabled:opacity-40"
                  title="Move down"
                >↓</button>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveExistingImage(img)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100"
                title="Remove image"
              >
                ×
              </button>
              {idx === 0 && <span className="absolute bottom-1 left-1 bg-primary-500 text-white text-xs px-2 py-0.5 rounded shadow">Main</span>}
            </div>
          ))}
        </div>
      )}
      <div className="space-y-4">
        <div 
          className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex items-center gap-4 mb-4">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 bg-white"
              id="product-images"
            />
            <label htmlFor="product-images" className="btn-secondary cursor-pointer">
              Choose Images
            </label>
          </div>
          <p className="text-gray-500 text-sm">
            Or drag and drop multiple images here
          </p>
        </div>
        
        {/* Preview of new images to be uploaded */}
        {form.images.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-gray-600">New images to upload ({form.images.length}):</p>
            <div className="flex flex-wrap gap-4">
              {form.images.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs opacity-80 group-hover:opacity-100 transition-opacity"
                    title="Remove image"
                  >
                    ×
                  </button>
                  <span className="absolute bottom-1 left-1 bg-blue-500 text-white text-xs px-2 py-0.5 rounded shadow">New</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        disabled={loading}
        className="btn-primary disabled:opacity-50"
      >
        {loading ? (editing ? 'Updating…' : 'Uploading…') : (editing ? 'Update Product' : 'Create Product')}
      </button>
    </form>
  )
}

export default ProductForm
