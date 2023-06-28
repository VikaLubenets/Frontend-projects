import type { SerializableValue } from '../../../types/types'

export default function factory (namespace: string): LocalStorageFactory {
  return new LocalStorageFactory(namespace)
}

export class LocalStorageFactory {
  readonly namespace: string

  constructor (namespace: string) {
    this.namespace = namespace
  }

  #getKey (key: string): string {
    return `[[${this.namespace}]]-${key}`
  }

  set (name: string, value: SerializableValue): void {
    localStorage.setItem(this.#getKey(name), JSON.stringify(value))
  }

  get<T extends SerializableValue>(name: string): T | null {
    const item = localStorage.getItem(this.#getKey(name))
    return item !== null ? JSON.parse(item) : null
  }

  remove (name: string): void {
    localStorage.removeItem(this.#getKey(name))
  }
}
