export const savedPropertyService = {
  async getAll(userId) {
    try {
      const params = {
        "fields": [
          { "field": { "Name": "Name" } },
          { "field": { "Name": "property_id" }, "referenceField": { "field": { "Name": "Name" } } },
          { "field": { "Name": "saved_date" } },
          { "field": { "Name": "notes" } }
        ],
        "where": [
          { "FieldName": "Owner", "Operator": "EqualTo", "Values": [userId] }
        ],
        "orderBy": [
          { "fieldName": "saved_date", "sorttype": "DESC" }
        ]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.fetchRecords('saved_property', params)

      if (!response.success) {
        console.error("Error fetching saved properties:", response.message)
        throw new Error(response.message)
      }

      return response.data || []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching saved properties:", error?.response?.data?.message)
      } else {
        console.error("Error fetching saved properties:", error.message)
      }
      throw error
    }
  },

  async create(userId, propertyId, notes = '') {
    try {
      const savedData = {
        Name: `Saved Property ${propertyId}`,
        property_id: parseInt(propertyId),
        saved_date: new Date().toISOString(),
        notes: notes,
        Owner: userId
      }

      const params = {
        records: [savedData]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const response = await apperClient.createRecord('saved_property', params)

      if (!response.success) {
        console.error("Error saving property:", response.message)
        throw new Error(response.message)
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success)
        if (failedRecords.length > 0) {
          console.error(`Failed to save ${failedRecords.length} records:${JSON.stringify(failedRecords)}`)
          throw new Error('Failed to save property')
        }
        return response.results[0].data
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error saving property:", error?.response?.data?.message)
      } else {
        console.error("Error saving property:", error.message)
      }
      throw error
    }
  },

  async delete(userId, propertyId) {
    try {
      // First find the saved property record
      const params = {
        "fields": [
          { "field": { "Name": "Id" } }
        ],
        "where": [
          { "FieldName": "Owner", "Operator": "EqualTo", "Values": [userId] },
          { "FieldName": "property_id", "Operator": "EqualTo", "Values": [parseInt(propertyId)] }
        ]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const fetchResponse = await apperClient.fetchRecords('saved_property', params)

      if (!fetchResponse.success) {
        console.error("Error finding saved property:", fetchResponse.message)
        throw new Error(fetchResponse.message)
      }

      if (!fetchResponse.data || fetchResponse.data.length === 0) {
        throw new Error('Saved property not found')
      }

      // Delete the found record
      const deleteParams = {
        RecordIds: [fetchResponse.data[0].Id]
      }

      const deleteResponse = await apperClient.deleteRecord('saved_property', deleteParams)

      if (!deleteResponse.success) {
        console.error("Error deleting saved property:", deleteResponse.message)
        throw new Error(deleteResponse.message)
      }

      return { success: true }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting saved property:", error?.response?.data?.message)
      } else {
        console.error("Error deleting saved property:", error.message)
      }
      throw error
    }
  },

  async deleteAll(userId) {
    try {
      // First find all saved property records for the user
      const params = {
        "fields": [
          { "field": { "Name": "Id" } }
        ],
        "where": [
          { "FieldName": "Owner", "Operator": "EqualTo", "Values": [userId] }
        ]
      }

      const { ApperClient } = window.ApperSDK
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      })

      const fetchResponse = await apperClient.fetchRecords('saved_property', params)

      if (!fetchResponse.success) {
        console.error("Error finding saved properties:", fetchResponse.message)
        throw new Error(fetchResponse.message)
      }

      if (!fetchResponse.data || fetchResponse.data.length === 0) {
        return { success: true } // Nothing to delete
      }

      // Delete all found records
      const recordIds = fetchResponse.data.map(record => record.Id)
      const deleteParams = {
        RecordIds: recordIds
      }

      const deleteResponse = await apperClient.deleteRecord('saved_property', deleteParams)

      if (!deleteResponse.success) {
        console.error("Error deleting saved properties:", deleteResponse.message)
        throw new Error(deleteResponse.message)
      }

      return { success: true }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting all saved properties:", error?.response?.data?.message)
      } else {
        console.error("Error deleting all saved properties:", error.message)
      }
      throw error
    }
  }
}