import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import PropertyStats from '@/components/molecules/PropertyStats'
import ImageGallery from '@/components/molecules/ImageGallery'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'
import { useSavedProperties } from '@/hooks/useSavedProperties'

const PropertyDetail = () => {
  const { id } = useParams()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { savedProperties, toggleSavedProperty } = useSavedProperties()

  useEffect(() => {
    loadProperty()
  }, [id])

  const loadProperty = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getById(parseInt(id))
      setProperty(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveToggle = () => {
    toggleSavedProperty(parseInt(id))
  }

  const handleContact = () => {
    toast.success("Contact information sent! An agent will reach out to you soon.")
  }

  const handleScheduleTour = () => {
    toast.success("Tour request submitted! We'll contact you to schedule a viewing.")
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message={error} onRetry={loadProperty} />
      </div>
    )
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Error message="Property not found" />
      </div>
    )
  }

  const isSaved = savedProperties.some(saved => saved.propertyId === parseInt(id))

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="h-4 w-4 mr-2" />
          Back to Properties
        </Link>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <ImageGallery images={property.images} />

          {/* Property Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-card p-6"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge 
                    variant={property.status === 'For Sale' ? 'accent' : 'success'}
                    className="text-sm font-medium"
                  >
                    {property.status}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    Listed on {formatDate(property.listingDate)}
                  </span>
                </div>
                
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                
                <p className="text-lg text-gray-600 mb-4">
                  {property.address}, {property.city}, {property.state} {property.zipCode}
                </p>
                
                <div className="text-4xl font-display font-bold text-primary mb-4">
                  {formatPrice(property.price)}
                </div>
                
                <PropertyStats
                  bedrooms={property.bedrooms}
                  bathrooms={property.bathrooms}
                  squareFeet={property.squareFeet}
                />
              </div>
              
              <Button
                variant={isSaved ? 'accent' : 'ghost'}
                onClick={handleSaveToggle}
                className="flex-shrink-0"
              >
                <ApperIcon 
                  name="Heart" 
                  className={`h-5 w-5 mr-2 ${isSaved ? 'fill-current' : ''}`}
                />
                {isSaved ? 'Saved' : 'Save'}
              </Button>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-card p-6"
          >
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              About This Property
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {property.description}
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-card p-6"
          >
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Features & Amenities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ApperIcon name="Check" className="h-4 w-4 text-success" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Property Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-card p-6"
          >
            <h2 className="text-xl font-display font-semibold text-gray-900 mb-4">
              Property Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-medium">{property.yearBuilt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms</span>
                  <span className="font-medium">{property.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bathrooms</span>
                  <span className="font-medium">{property.bathrooms}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Square Feet</span>
                  <span className="font-medium">{property.squareFeet.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per Sq Ft</span>
                  <span className="font-medium">
                    ${Math.round(property.price / property.squareFeet)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium">{property.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Listed Date</span>
                  <span className="font-medium">{formatDate(property.listingDate)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-card p-6 space-y-4"
            >
              <h3 className="text-lg font-display font-semibold text-gray-900">
                Interested in this property?
              </h3>
              
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleScheduleTour}
                >
                  <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
                  Schedule a Tour
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleContact}
                >
                  <ApperIcon name="Phone" className="h-4 w-4 mr-2" />
                  Contact Agent
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={handleSaveToggle}
                >
                  <ApperIcon 
                    name="Heart" 
                    className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current text-red-500' : ''}`}
                  />
                  {isSaved ? 'Remove from Saved' : 'Save Property'}
                </Button>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Share this property</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <ApperIcon name="Share" className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <ApperIcon name="Mail" className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <ApperIcon name="Copy" className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail