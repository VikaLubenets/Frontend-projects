import { type Car, type Garage, Endpoint, type GarageResponse } from '../../types/types'

export default class DataProvider {
  private readonly baseUrl: string

  constructor () {
    this.baseUrl = 'http://localhost:3000'
  }

  async getCars (page = 1, limit = 7): Promise<GarageResponse> {
    let url = `${this.baseUrl}${Endpoint.Garage}`
    if (page !== undefined && limit !== undefined) {
      url += `?_page=${page}&_limit=${limit}`
    }
    return await fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cars')
        }
        const totalCount = Number(response.headers.get('X-Total-Count'))
        const cars: Garage = await response.json()
        const totalPages = Math.ceil(totalCount / limit)
        return {
          garage: {
            garage: cars
          },
          totalCount,
          totalPages
        }
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  async getCar (id: number): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}${id}`
    return await fetch(url)
      .then(async response => {
        if (response.status === 404) {
          throw new Error('There is no such car')
        }
        if (!response.ok) {
          throw new Error('Failed to fetch car')
        }
        return await response.json()
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }

  async createCar (name: string, color: string): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}`
    const data = {
      name,
      color
    }

    return await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(async response => {
        return await response.json()
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }

  async deleteCar (id: number): Promise<void> {
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`

    await fetch(url, {
      method: 'DELETE'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete car')
        }
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }
}
