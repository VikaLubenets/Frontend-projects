export interface ElementParams {
  tag: string
  classes?: string[]
  textContent?: string
  callback?: EventCallback
  parentSelector?: string
}

export type EventCallback = (event: Event) => void

export interface Car {
  name: string
  color: string
  id: number
}

export interface Garage extends Array<Car> {}

export enum Endpoint {
  Garage = '/garage',
  Engine = '/engine',
  Winners = '/winners'
}

export interface GarageResponse {
  garage: {
    garage: Garage
  }
  totalCount: number
  totalPages: number
}
