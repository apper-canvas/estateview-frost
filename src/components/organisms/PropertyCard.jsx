import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import PropertyStats from '@/components/molecules/PropertyStats'
import ApperIcon from '@/components/ApperIcon'
import { useSavedProperties } from '@/hooks/useSavedProperties'

const PropertyCard = ({ property, className }) => {
  const { savedProperties, toggleSavedProperty } = useSavedProperties()
  const isSaved = savedProperties.some(saved => saved.propertyId === property.Id)

  const handleSaveToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSavedProperty(property.Id)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "bg-white rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group",
        className
      )}
    >
      <Link to={`/property/${property.Id}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Status Badge */}
          <Badge 
            variant={property.status === 'For Sale' ? 'accent' : 'success'}
            className="absolute top-3 left-3 font-medium"
          >
            {property.status}
          </Badge>
          
          {/* Save Button */}
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "absolute top-3 right-3 bg-white/80 hover:bg-white/90 backdrop-blur-sm transition-all duration-200",
              isSaved ? "text-red-500" : "text-gray-600"
            )}
            onClick={handleSaveToggle}
          >
            <ApperIcon 
              name={isSaved ? "Heart" : "Heart"} 
              className={cn(
                "h-4 w-4 transition-all duration-200",
                isSaved ? "fill-current" : ""
              )}
            />
          </Button>
          
          {/* Images Count */}
          {property.images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
              <ApperIcon name="Camera" className="h-3 w-3 inline mr-1" />
              {property.images.length}
            </div>
          )}
        </div>
        
        <div className="p-6">
          {/* Price */}
          <div className="mb-3">
            <h3 className="text-2xl font-display font-bold text-gray-900 mb-1">
              {formatPrice(property.price)}
            </h3>
            <p className="text-sm text-gray-600">
              {property.address}, {property.city}, {property.state} {property.zipCode}
            </p>
          </div>
          
          {/* Property Title */}
          <h4 className="text-lg font-medium text-gray-900 mb-3 line-clamp-2">
            {property.title}
          </h4>
          
          {/* Property Stats */}
          <PropertyStats
            bedrooms={property.bedrooms}
            bathrooms={property.bathrooms}
            squareFeet={property.squareFeet}
            className="mb-4"
          />
          
          {/* Property Type & Year */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <ApperIcon name="Building" className="h-3 w-3" />
              {property.propertyType}
            </span>
            <span className="flex items-center gap-1">
              <ApperIcon name="Calendar" className="h-3 w-3" />
              Built {property.yearBuilt}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyCard