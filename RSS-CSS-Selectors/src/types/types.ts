import type { EventEmitter } from 'events'

export interface DataItem {
  levelNumber: string
  selector: string
  taskDescription: string
  examples: string
  htmlField: string
  status: string
  correctAnswers: string | string[]
  nameHelpButton: string
  adviceHelpButton: string
  editorDescription: string
  gameHeader: string
  imgURL: string
  [key: string]: SerializableValue | SerializableValue[]
}

export type SerializablePrimitiveValue =
string |
number |
boolean |
null

export type SerializableValue =
SerializablePrimitiveValue |
SerializablePrimitiveValue [] |
Record<string, SerializablePrimitiveValue> |
{ toJSON: SerializableValue }

export type CallbackFn<T> = (data: T) => void

export interface IObserver {
  update: (value: string) => void
}

export interface ISubgect {
  subscribe: (observer: IObserver) => void
  unsubscribe: (observer: IObserver) => void
  notify: () => void
}

export interface IAppViewer {
  currentLevel: number
  data: DataItem[]
  drawLevel: (levelNumber: number, data: DataItem[]) => void
}

export interface ILevels {
  draw: (level: string, status: string, taskDescription: string, examples: string) => void
  addEventsListeners: () => void
  levelNumberAddEventListeners: (method: (level: number) => void) => void
}

export interface IHTMLViewer {
  draw: (htmlFieldContent: string) => void
}

export interface IGameSpace {
  draw: (htmlFieldContent: string) => void
}

export interface ICSSEditor {
  draw: (editorDescriptionContent: string) => void
}

export interface IController {
  emitter: EventEmitter
  initialize: (level: number, dataNew: DataItem[], emitterNew: EventEmitter) => void
}

export interface ILSFactory {
  set: (name: string, value: DataItem) => void
  get: <T extends DataItem>(name: string) => T | null
  remove: (name: string) => void
}

export interface IDataProvider {
  storedData: DataItem[]
  get: () => DataItem[]
  set: (level: number, key: keyof DataItem, value: string) => void
}

export interface IApp {
  start: () => void
}
