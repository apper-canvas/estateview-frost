import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { savedPropertyService } from '@/services/api/savedPropertyService'

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([])
  const [loading, setLoading] = useState(false)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  useEffect(() => {
    if (isAuthenticated && user) {
      loadSavedProperties()
    } else {
      setSavedProperties([])
    }
  }, [isAuthenticated, user])

  const loadSavedProperties = async () => {
    if (!user?.userId) return

    try {
      setLoading(true)
      const data = await savedPropertyService.getAll(user.userId)
      setSavedProperties(data)
    } catch (error) {
      console.error('Error loading saved properties:', error.message)
      setSavedProperties([])
    } finally {
      setLoading(false)
    }
  }

  const toggleSavedProperty = async (propertyId) => {
    if (!isAuthenticated || !user?.userId) {
      toast.error('Please log in to save properties')
      return
    }

    const isCurrentlySaved = savedProperties.some(saved => saved.property_id === propertyId)
    
    try {
      if (isCurrentlySaved) {
        await savedPropertyService.delete(user.userId, propertyId)
        setSavedProperties(prev => prev.filter(saved => saved.property_id !== propertyId))
        toast.success('Property removed from saved list')
      } else {
        await savedPropertyService.create(user.userId, propertyId)
        await loadSavedProperties() // Reload to get the complete saved property data
        toast.success('Property saved for later!')
      }
    } catch (error) {
      console.error('Error toggling saved property:', error.message)
      toast.error('Failed to update saved property')
    }
  }

  const clearAllSavedProperties = async () => {
    if (!isAuthenticated || !user?.userId) {
      toast.error('Please log in to manage saved properties')
      return
    }

    try {
      await savedPropertyService.deleteAll(user.userId)
      setSavedProperties([])
      toast.success('All saved properties cleared')
    } catch (error) {
      console.error('Error clearing saved properties:', error.message)
      toast.error('Failed to clear saved properties')
    }
  }

  return {
    savedProperties,
    loading,
    toggleSavedProperty,
    clearAllSavedProperties
  }
}