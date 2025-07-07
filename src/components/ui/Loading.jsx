import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const Loading = ({ className }) => {
  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-card overflow-hidden"
          >
            {/* Image skeleton */}
            <div className="aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer relative">
              <div className="absolute top-3 left-3 w-16 h-6 bg-gray-300 rounded"></div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Price skeleton */}
              <div className="space-y-2">
                <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-32"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-48"></div>
              </div>
              
              {/* Title skeleton */}
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-full"></div>
              
              {/* Stats skeleton */}
              <div className="flex gap-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-16"></div>
                ))}
              </div>
              
              {/* Bottom info skeleton */}
              <div className="flex justify-between">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-20"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200px_100%] animate-shimmer rounded w-16"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Loading