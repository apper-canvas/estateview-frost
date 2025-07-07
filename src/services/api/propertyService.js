export const propertyService = {
  async getAll() {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" }, "referenceField": { "field": { "Name": "Name" } } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "price" } },
          { "field": { "Name": "address" } },
          { "field": { "Name": "city" } },
          { "field": { "Name": "state" } },
          { "field": { "Name": "zip_code" } },
          { "field": { "Name": "property_type" } },
          { "field": { "Name": "bedrooms" } },
          { "field": { "Name": "bathrooms" } },
          { "field": { "Name": "square_feet" } },
          { "field": { "Name": "year_built" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "features" } },
          { "field": { "Name": "images" } },
          { "field": { "Name": "listing_date" } },
          { "field": { "Name": "status" } }
        ],
        "orderBy": [
          { "fieldName": "listing_date", "sorttype": "DESC" }
        ],
        "pagingInfo": { "limit": 50, "offset": 0 }
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.fetchRecords('property', params)

      if (!response.success) {
        console.error("Error fetching properties:", response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching properties:", error?.response?.data?.message)
      } else {
        console.error("Error fetching properties:", error.message)
      }
      throw error
    }
  },

  async getById(id) {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "Tags" } },
          { "field": { "Name": "Owner" }, "referenceField": { "field": { "Name": "Name" } } },
          { "field": { "Name": "title" } },
          { "field": { "Name": "price" } },
          { "field": { "Name": "address" } },
          { "field": { "Name": "city" } },
          { "field": { "Name": "state" } },
          { "field": { "Name": "zip_code" } },
          { "field": { "Name": "property_type" } },
          { "field": { "Name": "bedrooms" } },
          { "field": { "Name": "bathrooms" } },
          { "field": { "Name": "square_feet" } },
          { "field": { "Name": "year_built" } },
          { "field": { "Name": "description" } },
          { "field": { "Name": "features" } },
          { "field": { "Name": "images" } },
          { "field": { "Name": "listing_date" } },
          { "field": { "Name": "status" } }
        ]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.getRecordById('property', parseInt(id), params)

      if (!response.success) {
        console.error(`Error fetching property with ID ${id}:`, response.message)
        throw new Error(response.message)
      }

      return response.data
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching property with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(`Error fetching property with ID ${id}:`, error.message)
      }
      throw error
    }
  },

  async create(propertyData) {
    try {
      // Filter to only include Updateable fields
      const updateableData = {
        Name: propertyData.Name,
        Tags: propertyData.Tags || '',
        Owner: propertyData.Owner,
        title: propertyData.title,
        price: propertyData.price,
        address: propertyData.address,
        city: propertyData.city,
        state: propertyData.state,
        zip_code: propertyData.zip_code,
        property_type: propertyData.property_type,
        bedrooms: propertyData.bedrooms,
        bathrooms: propertyData.bathrooms,
        square_feet: propertyData.square_feet,
        year_built: propertyData.year_built,
        description: propertyData.description,
        features: propertyData.features || '',
        images: propertyData.images || '',
        listing_date: propertyData.listing_date || new Date().toISOString(),
        status: propertyData.status || 'For Sale'
      }

      const params = {
        records: [updateableData]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.createRecord('property', params)

      if (!response.success) {
        console.error("Error creating property:", response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to create property')
        }
        return response.results[0].data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating property:", error?.response?.data?.message)
      } else {
        console.error("Error creating property:", error.message)
      }
      throw error
    }
  },

  async update(id, propertyData) {
    try {
      // Filter to only include Updateable fields plus Id
      const updateableData = {
        Id: parseInt(id),
        ...(propertyData.Name !== undefined && { Name: propertyData.Name }),
        ...(propertyData.Tags !== undefined && { Tags: propertyData.Tags }),
        ...(propertyData.Owner !== undefined && { Owner: propertyData.Owner }),
        ...(propertyData.title !== undefined && { title: propertyData.title }),
        ...(propertyData.price !== undefined && { price: propertyData.price }),
        ...(propertyData.address !== undefined && { address: propertyData.address }),
        ...(propertyData.city !== undefined && { city: propertyData.city }),
        ...(propertyData.state !== undefined && { state: propertyData.state }),
        ...(propertyData.zip_code !== undefined && { zip_code: propertyData.zip_code }),
        ...(propertyData.property_type !== undefined && { property_type: propertyData.property_type }),
        ...(propertyData.bedrooms !== undefined && { bedrooms: propertyData.bedrooms }),
        ...(propertyData.bathrooms !== undefined && { bathrooms: propertyData.bathrooms }),
        ...(propertyData.square_feet !== undefined && { square_feet: propertyData.square_feet }),
        ...(propertyData.year_built !== undefined && { year_built: propertyData.year_built }),
        ...(propertyData.description !== undefined && { description: propertyData.description }),
        ...(propertyData.features !== undefined && { features: propertyData.features }),
        ...(propertyData.images !== undefined && { images: propertyData.images }),
        ...(propertyData.listing_date !== undefined && { listing_date: propertyData.listing_date }),
        ...(propertyData.status !== undefined && { status: propertyData.status })
      }

      const params = {
        records: [updateableData]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.updateRecord('property', params)

      if (!response.success) {
        console.error("Error updating property:", response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to update ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to update property')
        }
        return response.results[0].data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating property:", error?.response?.data?.message)
      } else {
        console.error("Error updating property:", error.message)
      }
      throw error
    }
  },

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.deleteRecord('property', params)

      if (!response.success) {
        console.error("Error deleting property:", response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to delete ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to delete property')
        }
        return { success: true }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting property:", error?.response?.data?.message)
      } else {
        console.error("Error deleting property:", error.message)
      }
      throw error
    }
  }
}