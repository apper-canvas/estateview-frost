import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SearchBar from '@/components/molecules/SearchBar'
import PropertyFilters from '@/components/organisms/PropertyFilters'
import PropertyGrid from '@/components/organisms/PropertyGrid'
import Button from '@/components/atoms/Button'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'
import { propertyService } from '@/services/api/propertyService'

const Browse = () => {
  const [properties, setProperties] = useState([])
  const [filteredProperties, setFilteredProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyTypes: [],
    bedroomsMin: 0,
    bathroomsMin: 0,
    squareFeetMin: '',
    yearBuiltMin: ''
  })

  useEffect(() => {
    loadProperties()
  }, [])

  useEffect(() => {
    applyFiltersAndSearch()
  }, [properties, filters, searchTerm, sortBy])

  const loadProperties = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await propertyService.getAll()
      setProperties(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSearch = () => {
    let filtered = [...properties]

    // Apply search
    if (searchTerm) {
      const search = searchTerm.toLowerCase()
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(search) ||
        property.address.toLowerCase().includes(search) ||
        property.city.toLowerCase().includes(search) ||
        property.state.toLowerCase().includes(search) ||
        property.zipCode.includes(search) ||
        property.Id.toString().includes(search)
      )
    }

    // Apply filters
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax))
    }
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => filters.propertyTypes.includes(property.propertyType))
    }
    if (filters.bedroomsMin > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedroomsMin)
    }
    if (filters.bathroomsMin > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathroomsMin)
    }
    if (filters.squareFeetMin) {
      filtered = filtered.filter(property => property.squareFeet >= parseInt(filters.squareFeetMin))
    }
    if (filters.yearBuiltMin) {
      filtered = filtered.filter(property => property.yearBuilt >= parseInt(filters.yearBuiltMin))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.listingDate) - new Date(a.listingDate)
        case 'oldest':
          return new Date(a.listingDate) - new Date(b.listingDate)
        case 'sqft-high':
          return b.squareFeet - a.squareFeet
        case 'sqft-low':
          return a.squareFeet - b.squareFeet
        default:
          return 0
      }
    })

    setFilteredProperties(filtered)
  }

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleClearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyTypes: [],
      bedroomsMin: 0,
      bathroomsMin: 0,
      squareFeetMin: '',
      yearBuiltMin: ''
    })
    setSearchTerm('')
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest Listed' },
    { value: 'oldest', label: 'Oldest Listed' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'sqft-high', label: 'Size: Largest First' },
    { value: 'sqft-low', label: 'Size: Smallest First' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Browse Properties
        </h1>
        <p className="text-gray-600">
          Discover your dream home from our curated collection of premium properties
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-8 space-y-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by location, address, or property ID..."
        />
        
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <ApperIcon name="Filter" className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <ApperIcon name="Grid3x3" className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <ApperIcon name="List" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-48"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            
            <span className="text-sm text-gray-600">
              {filteredProperties.length} properties found
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 flex-shrink-0`}>
          <div className="sticky top-24">
            <PropertyFilters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        </div>

        {/* Properties Grid */}
        <div className="flex-1 min-w-0">
          <PropertyGrid
            properties={filteredProperties}
            loading={loading}
            error={error}
            onRetry={loadProperties}
            className={viewMode === 'list' ? 'grid-cols-1' : ''}
          />
        </div>
      </div>
    </div>
  )
}

export default Browse