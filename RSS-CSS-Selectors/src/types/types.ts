export interface DataItem {
  levelNumber: string
  selector: string
  taskDescription: string
  examples: string
  htmlField: string
  status: string
  correctAnswers: string
  nameHelpButton: string
  adviceHelpButton: string
  editorDescription: string
  gameHeader: string
  imgURL: string
  [key: string]: SerializablePrimitiveValue
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
  drawLevel: (levelNumber: number) => void
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
