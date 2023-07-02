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
  [key: string]: DataItemValue
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

type DataItemValue = SerializableValue | SerializableValue[]

export type CallbackFn<T> = (data: T) => void

export interface IAppViewer {
  drawLevel: (levelNumber: number, data: DataItem[], emitter: EventEmitter) => void
}

export interface ILevels {
  draw: (level: string, status: string, taskDescription: string, examples: string) => void
  burgerMenuAddEventsListeners: () => void
  levelNumberAddEventListeners: () => void
}

export interface IHTMLViewer {
  draw: (htmlFieldContent: string) => void
}

export interface IGameSpace {
  draw: (htmlFieldContent: string) => void
}

export interface IModalConstructor {
  draw: (modalContent: string) => void
}

export interface IHelpButton {
  emitter: EventEmitter
  status: string
  handleClick: () => void
  draw: (name: string, helpAdvice: string) => void
  removeEventsListeners: () => void
}

export interface ICSSEditor {
  draw: (editorDescriptionContent: string, levelStatus: string) => void
  updateInputAfterHelp: (content: string) => void
}

export interface IHelpPrint {
  draw: () => void
  animateText: (content: string) => void
}

export interface IController {
  emitter: EventEmitter
  initialize: (level: number, data: DataItem[], emitter: EventEmitter) => void
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
  reset: () => void
}

export interface IApp {
  start: () => void
}
