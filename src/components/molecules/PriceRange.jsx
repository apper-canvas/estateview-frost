import React from 'react'
import { cn } from '@/utils/cn'
import FormField from '@/components/molecules/FormField'

const PriceRange = ({ 
  minPrice, 
  maxPrice, 
  onMinChange, 
  onMaxChange, 
  className 
}) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <FormField
        label="Min Price"
        type="input"
        inputType="number"
        value={minPrice}
        onChange={(e) => onMinChange(e.target.value)}
        placeholder="$0"
      />
      <FormField
        label="Max Price"
        type="input"
        inputType="number"
        value={maxPrice}
        onChange={(e) => onMaxChange(e.target.value)}
        placeholder="No limit"
      />
    </div>
  )
}

export default PriceRange