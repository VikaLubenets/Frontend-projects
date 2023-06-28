import type { DataItem } from 'types/types'
import data from './levels/levels.json'
import lsFactory, { type LocalStorageFactory } from './storage/localStorageData'

export default class DataProvider {
  private readonly lsFactory: LocalStorageFactory
  private static readonly instance = new DataProvider()

  private constructor () {
    this.lsFactory = lsFactory()
  }

  private initialize (): void {
    const defaultData: DataItem[] = data.map((item) => ({ ...item }))

    defaultData.forEach((item) => {
      this.lsFactory.set(item.levelNumber, item)
    })
  }

  private updateData (item: DataItem): void {
    this.lsFactory.set(item.levelNumber, item)
  }

  get (): DataItem[] {
    const storedData: DataItem[] = []

    Object.keys(localStorage).forEach((key) => {
      const item = this.lsFactory.get<DataItem>(key)
      if (item !== null) {
        storedData.push(item)
      }
    })

    storedData.sort((a, b) => {
      const first = parseInt(a.levelNumber.slice(13), 10)
      const second = parseInt(b.levelNumber.slice(13), 10)
      return first - second
    })

    return storedData
  }

  static getInstance (): DataProvider {
    this.instance.initialize()
    return this.instance
  }

  getKV (level: number, key: keyof DataItem): DataItem[keyof DataItem] | null {
    const storedData: DataItem[] = this.get()
    const levelData = storedData.find(item => parseInt(item.levelNumber.slice(13), 10) === level)
    if (levelData != null) {
      return levelData[key] ?? null
    }
    return null
  }

  set (level: number, key: keyof DataItem, value: string): void {
    const storedData: DataItem[] = this.get()
    const levelDataIndex = storedData.findIndex(item => parseInt(item.levelNumber.slice(13), 10) === level)
    if (levelDataIndex !== -1) {
      const updatedItem: DataItem = {
        ...storedData[levelDataIndex],
        [key]: value
      }
      this.updateData(updatedItem)
    }
  }
}
