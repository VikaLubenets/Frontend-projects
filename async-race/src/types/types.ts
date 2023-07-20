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
  totalPages: number | undefined
}

export type EngineStartStatus = 'started'

export type EngineStopStatus = 'stopped'

export type EngineStatus = EngineStartStatus | EngineStopStatus

export interface EngineDriveMode {
  'success': true
}

export interface startStopEngineResponse {
  velocity: number
  distance: number
}

export interface CarCoodinates {
  left: number
}

export interface Winner {
  id: number
  wins: number
  time: number
}

export type Winners = Winner[]

export interface WinnersResponse {
  winners: Winners
  totalCount: number
}

export type SortWinnersOption = 'id' | 'wins' | 'time'

export type OrderWinnersOption = 'ASC' | 'DESC'
