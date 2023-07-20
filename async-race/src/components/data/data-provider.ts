import {
  type Car,
  type Garage,
  Endpoint,
  type GarageResponse,
  type EngineStatus,
  type startStopEngineResponse,
  type EngineDriveMode,
  type WinnersResponse,
  type SortWinnersOption,
  type OrderWinnersOption,
  type Winners,
  type Winner
} from '../../types/types'

export default class DataProvider {
  private readonly baseUrl: string

  constructor () {
    this.baseUrl = 'http://localhost:3000'
  }

  async getCars (page?: number, limit?: number): Promise<GarageResponse> {
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
        let totalPages
        if (limit !== undefined) {
          totalPages = Math.ceil(totalCount / limit)
        }
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
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`
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

  async updateCar (id: number, name: string, color: string): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`
    const data = {
      name,
      color
    }

    return await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(async response => {
        if (response.status === 404) {
          throw new Error('There is no such car')
        }
        if (!response.ok) {
          throw new Error('Failed to update car')
        }
        return await response.json()
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }

  async startStopCarEngine (id: number, status: EngineStatus): Promise<startStopEngineResponse> {
    const url = `${this.baseUrl}${Endpoint.Engine}?id=${id}&status=${status}`

    return await fetch(url, {
      method: 'PATCH'
    })
      .then(async (response) => {
        if (response.status === 404) {
          throw new Error('Car with such id was not found in the garage.')
        }
        if (response.status === 400) {
          throw new Error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"')
        }
        return await response.json()
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  async switchEngineToDriveMode (id: number, status = 'drive'): Promise<EngineDriveMode> {
    const url = `${this.baseUrl}${Endpoint.Engine}?id=${id}&status=${status}`

    return await fetch(url, {
      method: 'PATCH'
    })
      .then(async (response) => {
        if (response.status === 404) {
          throw new Error('Car with such id was not found in the garage.')
        }
        if (response.status === 400) {
          throw new Error('Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"')
        }
        if (response.status === 429) {
          throw new Error("Drive already in progress. You can't run drive for the same car twice while it's not stopped.")
        }
        if (response.status === 500) {
          throw new Error("Car has been stopped suddenly. It's engine was broken down.")
        }
        return await response.json()
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  async getWinners (
    page?: number,
    limit?: number,
    sort?: SortWinnersOption,
    order?: OrderWinnersOption
  ): Promise<WinnersResponse> {
    let url = `${this.baseUrl}${Endpoint.Winners}`
    const queryParams = []

    if (page !== undefined && limit !== undefined) {
      queryParams.push(`_page=${page}`)
      queryParams.push(`_limit=${limit}`)
    }

    if (sort !== undefined) {
      queryParams.push(`_sort=${sort}`)
    }

    if (order !== undefined) {
      queryParams.push(`_order=${order}`)
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`
    }
    return await fetch(url)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch winners')
        }
        const totalCount = Number(response.headers.get('X-Total-Count'))
        const winners: Winners = await response.json()
        return {
          winners,
          totalCount
        }
      })
      .catch((error) => {
        console.error(error)
        throw error
      })
  }

  async getWinner (id: number): Promise<Winner> {
    const url = `${this.baseUrl}${Endpoint.Winners}/${id}`
    return await fetch(url)
      .then(async response => {
        if (response.status === 404) {
          throw new Error('There is no such winner')
        }
        return await response.json()
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  }
}
