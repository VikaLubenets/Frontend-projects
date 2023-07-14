export interface ElementParams {
  tag: string
  classes?: string[]
  textContent?: string
  callback?: EventCallback
  parentSelector?: string
}

export type EventCallback = (event: Event) => void
