import type { ILSFactory, DataItem } from '../../../types/types'

export default function factory (): LocalStorageFactory {
  return new LocalStorageFactory()
}

export class LocalStorageFactory implements ILSFactory {
  set (name: string, value: DataItem): void {
    localStorage.setItem(name, JSON.stringify(value))
  }

  get<T extends DataItem >(name: string): T | null {
    const item = localStorage.getItem(name)
    return item !== null ? JSON.parse(item) : null
  }

  remove (name: string): void {
    localStorage.removeItem(name)
  }
}
