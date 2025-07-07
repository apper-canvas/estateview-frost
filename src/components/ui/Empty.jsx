import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No results found", 
  message = "Try adjusting your search criteria", 
  actionText = "Reset Filters",
  onAction,
  className 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex flex-col items-center justify-center py-12 px-4",
        className
      )}
    >
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-8 mb-6">
        <ApperIcon name="Home" className="h-16 w-16 text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 text-center mb-8 max-w-md">
        {message}
      </p>
      
      {onAction && (
        <Button
          onClick={onAction}
          variant="primary"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
          {actionText}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty