import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ArtisanMarket</h3>
            <p className="text-gray-300">
              Supporting local artisans and preserving traditional crafts through 
              our online marketplace.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/artisans" className="text-gray-300 hover:text-white">
                  Artisans
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=pottery" className="text-gray-300 hover:text-white">
                  Pottery
                </Link>
              </li>
              <li>
                <Link to="/products?category=textiles" className="text-gray-300 hover:text-white">
                  Textiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-gray-300 hover:text-white">
                  Jewelry
                </Link>
              </li>
              <li>
                <Link to="/products?category=woodwork" className="text-gray-300 hover:text-white">
                  Woodwork
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 ArtisanMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
