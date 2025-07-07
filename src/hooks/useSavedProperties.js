import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useSavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('savedProperties')
    if (saved) {
      try {
        setSavedProperties(JSON.parse(saved))
      } catch (error) {
        console.error('Error parsing saved properties:', error)
      }
    }
  }, [])

  const saveSavedProperties = (properties) => {
    setSavedProperties(properties)
    localStorage.setItem('savedProperties', JSON.stringify(properties))
  }

  const toggleSavedProperty = (propertyId) => {
    const isCurrentlySaved = savedProperties.some(saved => saved.propertyId === propertyId)
    
    if (isCurrentlySaved) {
      const filtered = savedProperties.filter(saved => saved.propertyId !== propertyId)
      saveSavedProperties(filtered)
      toast.success('Property removed from saved list')
    } else {
      const newSaved = {
        propertyId,
        savedDate: new Date().toISOString(),
        notes: ''
      }
      saveSavedProperties([...savedProperties, newSaved])
      toast.success('Property saved for later!')
    }
  }

  const clearAllSavedProperties = () => {
    saveSavedProperties([])
    toast.success('All saved properties cleared')
  }

  return {
    savedProperties,
    toggleSavedProperty,
    clearAllSavedProperties
  }
}