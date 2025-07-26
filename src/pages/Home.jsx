import React from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../hooks/useProducts'
import ProductCard from '../components/product/ProductCard'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { SparklesIcon, HeartIcon, StarIcon, TruckIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const { products, loading, error } = useProducts({ featured: true, limit: 8 })
  const { user } = useAuth()

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-error-600">Error: {error}</div>

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-soft"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
        
        <div className="container-responsive relative z-10 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8 animate-fade-in-down">
              <SparklesIcon className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Discover Local Artisans</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-white mb-8 hero-text-shadow animate-fade-in-up">
              Handcrafted with{' '}
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Love
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Support local craftsmanship and find unique handmade products 
              from talented artisans in your community.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/products"
                className="btn-primary text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
              >
                Explore Products
              </Link>
              <Link
                to="/artisans"
                className="btn-secondary text-lg px-8 py-4"
              >
                Meet Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container-responsive">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { number: '500+', label: 'Artisans', icon: HeartIcon },
            { number: '2000+', label: 'Products', icon: StarIcon },
            { number: '10k+', label: 'Happy Customers', icon: SparklesIcon },
            { number: '24/7', label: 'Support', icon: TruckIcon },
          ].map((stat, index) => (
            <div key={stat.label} className="stats-card text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <stat.icon className="h-8 w-8 text-primary-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-primary-700 mb-1">{stat.number}</div>
              <div className="text-sm text-primary-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked items from our most talented artisans, crafted with passion and attention to detail
          </p>
        </div>
        
        <div className="product-grid">
          {products.map((product, index) => (
            <div key={product._id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ProductCard product={product} currentUser={user} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Link
            to="/products"
            className="btn-primary text-lg px-8 py-4"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="container-responsive">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of handcrafted products across different categories
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              name: 'Pottery', 
              image: 'https://www.jesvenues.com/images/services/clay-molding.jpg', 
              link: '/products?category=pottery',
              description: 'Handcrafted ceramics and pottery'
            },
            { 
              name: 'Textiles', 
              image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1IVHsrS1kl7IFQZuc1qQydLWYxy3YfPX7w&s', 
              link: '/products?category=textiles',
              description: 'Woven fabrics and handmade textiles'
            },
            { 
              name: 'Jewelry', 
              image: 'https://aashirs.com/cdn/shop/files/KalamkariFabricNecklacewithEarring.jpg?v=1747851244', 
              link: '/products?category=jewelry',
              description: 'Unique handmade jewelry pieces'
            },
            { 
              name: 'Woodwork', 
              image: 'https://images.squarespace-cdn.com/content/v1/571def984d088eb303dd0f0b/00050643-f618-4749-8b4c-c1ed5e928adf/A+Beginners+Guide+To+Woodworking+Projects.jpg', 
              link: '/products?category=woodwork',
              description: 'Beautiful wooden crafts and furniture'
            }
          ].map((category, index) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative overflow-hidden rounded-2xl aspect-square animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className="container-responsive">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-12 lg:p-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-8">
              Supporting Local Artisans
            </h2>
            <p className="text-xl text-gray-700 mb-12 leading-relaxed">
              Our marketplace connects talented local artisans with customers who 
              appreciate authentic, handcrafted products. Every purchase supports 
              traditional craftsmanship and helps preserve cultural heritage while 
              providing sustainable income for skilled creators.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/about"
                className="btn-primary text-lg px-8 py-4"
              >
                Learn More About Us
              </Link>
              <Link
                to="/artisans"
                className="btn-secondary text-lg px-8 py-4"
              >
                Meet Our Artisans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
