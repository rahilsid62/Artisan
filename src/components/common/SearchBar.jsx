// components/common/SearchBar.jsx
import React from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchBar = ({ value, onChange, placeholder = 'Search …' }) => (
  <div className="relative">
    <input
      className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-primary-500 focus:border-primary-500"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute top-2.5 left-3" />
  </div>
)

export default SearchBar
