import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import PropertyCard from '@/components/organisms/PropertyCard'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'

const PropertyGrid = ({ 
  properties, 
  loading, 
  error, 
  onRetry,
  className 
}) => {
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={onRetry} />
  }

  if (!properties || properties.length === 0) {
    return (
      <Empty
        title="No Properties Found"
        message="We couldn't find any properties matching your criteria. Try adjusting your filters or search terms."
        actionText="Clear Filters"
        onAction={onRetry}
      />
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard property={property} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default PropertyGrid