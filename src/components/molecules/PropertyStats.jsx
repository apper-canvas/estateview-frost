import React from 'react'
import { cn } from '@/utils/cn'
import ApperIcon from '@/components/ApperIcon'

const PropertyStats = ({ 
  bedrooms, 
  bathrooms, 
  squareFeet, 
  className 
}) => {
  const stats = [
    { icon: 'Bed', value: bedrooms, label: 'Beds' },
    { icon: 'Bath', value: bathrooms, label: 'Baths' },
    { icon: 'Square', value: squareFeet?.toLocaleString(), label: 'Sq Ft' }
  ]

  return (
    <div className={cn("flex items-center gap-6", className)}>
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center gap-2">
          <ApperIcon name={stat.icon} className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-gray-700">
            {stat.value} {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}

export default PropertyStats