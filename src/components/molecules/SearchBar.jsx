import React, { useState } from 'react'
import { cn } from '@/utils/cn'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const SearchBar = ({ 
  placeholder = "Search by location, address, or property ID...", 
  onSearch, 
  className,
  ...props 
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
      <div className="relative flex-1">
        <ApperIcon 
          name="Search" 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" 
        />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          {...props}
        />
      </div>
      <Button type="submit" variant="primary">
        <ApperIcon name="Search" className="h-4 w-4" />
      </Button>
    </form>
  )
}

export default SearchBar