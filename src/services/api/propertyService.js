import mockProperties from '@/services/mockData/properties.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const propertyService = {
  async getAll() {
    await delay(300)
    return [...mockProperties]
  },

  async getById(id) {
    await delay(200)
    const property = mockProperties.find(p => p.Id === id)
    if (!property) {
      throw new Error('Property not found')
    }
    return { ...property }
  },

  async create(propertyData) {
    await delay(400)
    const newProperty = {
      ...propertyData,
      Id: Math.max(...mockProperties.map(p => p.Id)) + 1,
      listingDate: new Date().toISOString(),
      status: 'For Sale'
    }
    mockProperties.push(newProperty)
    return { ...newProperty }
  },

  async update(id, propertyData) {
    await delay(300)
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    mockProperties[index] = { ...mockProperties[index], ...propertyData }
    return { ...mockProperties[index] }
  },

  async delete(id) {
    await delay(250)
    const index = mockProperties.findIndex(p => p.Id === id)
    if (index === -1) {
      throw new Error('Property not found')
    }
    mockProperties.splice(index, 1)
    return { success: true }
  }
}