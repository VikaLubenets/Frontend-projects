import type { DataItem } from 'types/types'
import data from './levels/levels.json'
import lsFactory, { type LocalStorageFactory } from './storage/localStorageData'

export default class DataProvider {
  private readonly lsFactory: LocalStorageFactory
  private static readonly instance = new DataProvider()
  storedData: DataItem[]

  private constructor () {
    this.lsFactory = lsFactory()
    this.storedData = []
  }

  private initialize (): void {
    const defaultData: DataItem[] = data.map((item) => ({ ...item }))

    defaultData.forEach((item) => {
      this.lsFactory.set(item.levelNumber, item)
    })
  }

  get (): DataItem[] {
    Object.keys(localStorage).forEach((key) => {
      const item = this.lsFactory.get<DataItem>(key)
      if (item !== null && !this.storedData.some((storedItem) => storedItem.levelNumber === item.levelNumber)) {
        this.storedData.push(item)
      }
    })

    this.storedData.sort((a, b) => {
      const first = parseInt(a.levelNumber.slice(13), 10)
      const second = parseInt(b.levelNumber.slice(13), 10)
      return first - second
    })

    return this.storedData
  }

  static getInstance (): DataProvider {
    this.instance.initialize()
    return this.instance
  }

  set (level: number, key: keyof DataItem, value: string): void {
    const levelDataIndex = this.storedData.findIndex(
      item => parseInt(item.levelNumber.slice(13), 10) ===
      level
    )
    if (levelDataIndex !== -1) {
      const updatedItem: DataItem = {
        ...this.storedData[levelDataIndex],
        [key]: value
      }
      this.storedData[levelDataIndex] = updatedItem
    }
  }
}
