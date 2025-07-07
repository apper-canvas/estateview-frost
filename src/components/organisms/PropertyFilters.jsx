import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import FormField from '@/components/molecules/FormField'
import PriceRange from '@/components/molecules/PriceRange'
import ApperIcon from '@/components/ApperIcon'

const PropertyFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters,
  className 
}) => {
  const propertyTypes = [
    'Single Family',
    'Townhouse',
    'Condo',
    'Multi-Family',
    'Land',
    'Commercial'
  ]

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = filters.propertyTypes || []
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type]
    
    handleFilterChange('propertyTypes', newTypes)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        "bg-white rounded-lg shadow-card p-6 space-y-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-display font-semibold text-gray-900">
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <ApperIcon name="X" className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Price Range</h4>
        <PriceRange
          minPrice={filters.priceMin || ''}
          maxPrice={filters.priceMax || ''}
          onMinChange={(value) => handleFilterChange('priceMin', value)}
          onMaxChange={(value) => handleFilterChange('priceMax', value)}
        />
      </div>

      {/* Property Types */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Property Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((type) => (
            <Button
              key={type}
              variant={filters.propertyTypes?.includes(type) ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handlePropertyTypeToggle(type)}
              className="justify-start text-sm"
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      {/* Bedrooms */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Minimum Bedrooms</h4>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.bedroomsMin === num ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange('bedroomsMin', num)}
              className="w-12 h-12 p-0"
            >
              {num === 0 ? 'Any' : num}
            </Button>
          ))}
        </div>
      </div>

      {/* Bathrooms */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Minimum Bathrooms</h4>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((num) => (
            <Button
              key={num}
              variant={filters.bathroomsMin === num ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleFilterChange('bathroomsMin', num)}
              className="w-12 h-12 p-0"
            >
              {num === 0 ? 'Any' : num}
            </Button>
          ))}
        </div>
      </div>

      {/* Square Footage */}
      <FormField
        label="Minimum Square Feet"
        type="input"
        inputType="number"
        value={filters.squareFeetMin || ''}
        onChange={(e) => handleFilterChange('squareFeetMin', e.target.value)}
        placeholder="Any"
      />

      {/* Year Built */}
      <FormField
        label="Minimum Year Built"
        type="input"
        inputType="number"
        value={filters.yearBuiltMin || ''}
        onChange={(e) => handleFilterChange('yearBuiltMin', e.target.value)}
        placeholder="Any"
      />
    </motion.div>
  )
}

export default PropertyFilters