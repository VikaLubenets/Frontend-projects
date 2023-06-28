import type { SerializableValue } from '../../../types/types'

export default function factory (): LocalStorageFactory {
  return new LocalStorageFactory()
}

export class LocalStorageFactory {
  set (name: string, value: SerializableValue): void {
    localStorage.setItem(name, JSON.stringify(value))
  }

  get<T extends SerializableValue>(name: string): T | null {
    const item = localStorage.getItem(name)
    return item !== null ? JSON.parse(item) : null
  }

  remove (name: string): void {
    localStorage.removeItem(name)
  }
}
