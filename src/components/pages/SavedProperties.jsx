import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useSavedProperties } from '@/hooks/useSavedProperties'
import { propertyService } from '@/services/api/propertyService'

const SavedProperties = () => {
  const [savedPropertiesData, setSavedPropertiesData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { savedProperties, clearAllSavedProperties } = useSavedProperties()

  useEffect(() => {
    loadSavedProperties()
  }, [savedProperties])

  const loadSavedProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      
      if (savedProperties.length === 0) {
        setSavedPropertiesData([])
        return
      }

const allProperties = await propertyService.getAll()
      const filtered = allProperties.filter(property => 
        savedProperties.some(saved => saved.property_id === property.Id)
      )
      
      setSavedPropertiesData(filtered)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClearAll = () => {
    clearAllSavedProperties()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">
              {savedProperties.length} properties saved for later review
            </p>
          </div>
          
          {savedProperties.length > 0 && (
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="text-error border-error hover:bg-error hover:text-white"
            >
              <ApperIcon name="Trash2" className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Saved Properties Grid */}
      <PropertyGrid
        properties={savedPropertiesData}
        loading={loading}
        error={error}
        onRetry={loadSavedProperties}
      />
    </div>
  )
}

export default SavedProperties