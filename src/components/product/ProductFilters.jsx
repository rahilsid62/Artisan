import React from 'react'

const ProductFilters = ({ filters, onFilterChange }) => {
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'pottery', label: 'Pottery' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'woodwork', label: 'Woodwork' },
    { value: 'metalwork', label: 'Metalwork' },
    { value: 'glasswork', label: 'Glasswork' }
  ]

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-25', label: 'Under ₹25' },
    { value: '25-50', label: '₹25 - ₹50' },
    { value: '50-100', label: '₹50 - ₹100' },
    { value: '100-200', label: '₹100 - ₹200' },
    { value: '200-500', label: '₹200 - ₹500' },
    { value: '500+', label: '₹500+' }
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <select
          value={filters.priceRange}
          onChange={(e) => onFilterChange({ ...filters, priceRange: e.target.value })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          {priceRanges.map((range) => (
            <option key={range.value} value={range.value}>
              {range.label}
            </option>
          ))}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Availability
        </label>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
              className="mr-2"
            />
            In Stock
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={filters.customizable}
              onChange={(e) => onFilterChange({ ...filters, customizable: e.target.checked })}
              className="mr-2"
            />
            Customizable
          </label>
        </div>
      </div>
      
      <button
        onClick={() => onFilterChange({
          category: '',
          priceRange: '',
          sortBy: 'newest',
          search: '',
          inStock: false,
          customizable: false
        })}
        className="w-full btn-secondary"
      >
        Clear Filters
      </button>
    </div>
  )
}

export default ProductFilters
