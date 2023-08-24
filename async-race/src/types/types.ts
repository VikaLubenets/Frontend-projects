export interface ElementParams {
  tag: string;
  classes?: string[];
  textContent?: string;
  callback?: EventCallback;
  parentSelector?: string;
  attributes?: AttributesMap;
}

export type AttributesMap = Record<string, string>;

export type EventCallback = (event: Event) => void;

export interface Car {
  name: string;
  color: string;
  id: number;
}

export type Garage = Array<Car>;

export enum Endpoint {
  Garage = '/garage',
  Engine = '/engine',
  Winners = '/winners',
}

export interface GarageResponse {
  garage: {
    garage: Garage;
  };
  totalCount: number;
  totalPages: number | undefined;
}

export type EngineStartStatus = 'started';

export type EngineStopStatus = 'stopped';

export type EngineStatus = EngineStartStatus | EngineStopStatus;

export interface EngineDriveMode {
  success: true;
}

export interface StartStopEngineResponse {
  velocity: number;
  distance: number;
}

export interface CarCoodinates {
  left: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type Winners = Winner[];

export interface WinnersResponse {
  winnersData: Winners;
  totalCount: number;
}

export type SortWinnersOption = 'id' | 'wins' | 'time';

export type OrderWinnersOption = 'ASC' | 'DESC';

export interface UpdatedData {
  wins: number;
  time: number;
}

export interface TableRow {
  number: string;
  car: SVGElement | null;
  name: string;
  wins: string;
  bestTime: string;
}

export enum TableColName {
  number = 'No',
  car = 'Car',
  name = 'Name',
  wins = 'Wins',
  bestTime = 'Best time (seconds)',
}
