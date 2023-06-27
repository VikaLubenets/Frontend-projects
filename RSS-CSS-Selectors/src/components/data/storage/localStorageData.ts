import { type DataItem } from 'types/types'

export class LocalStorageData {
  set (data: DataItem): void {
    const key = data.levelNumber
    const value = JSON.stringify(data)
    localStorage.setItem(key, value)
  }

  get (key: string): DataItem | null {
    const value = localStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value) as DataItem
    } else {
      return null
    }
  }
}
