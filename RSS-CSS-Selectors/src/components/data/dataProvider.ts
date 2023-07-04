import type { DataItem, IDataProvider } from '../../types/types'
import data from './levels/levels.json'
import lsFactory, { type LocalStorageFactory } from './storage/localStorageData'

export default class DataProvider implements IDataProvider {
  private readonly lsFactory: LocalStorageFactory
  private static instance: DataProvider | null = null
  storedData: DataItem[]

  private constructor () {
    this.lsFactory = lsFactory()
    this.storedData = []
  }

  private initialize (): void {
    const savedLSData: DataItem[] = []
    if (localStorage.length === 0) {
      const defaultData: DataItem[] = data.map((item) => {
        return {
          levelNumber: item.levelNumber,
          selector: item.selector,
          taskDescription: item.taskDescription,
          examples: item.examples,
          htmlField: item.htmlField,
          status: item.status,
          correctAnswers: item.correctAnswers,
          nameHelpButton: item.nameHelpButton,
          adviceHelpButton: item.adviceHelpButton,
          editorDescription: item.editorDescription,
          gameHeader: item.gameHeader,
          helpClicked: item.helpClicked
        }
      })

      defaultData.forEach((item) => {
        this.lsFactory.set(item.levelNumber, item)
      })

      this.storedData = defaultData
    } else {
      Object.keys(localStorage).forEach((key) => {
        const item = this.lsFactory.get<DataItem>(key)
        if (item !== null) {
          savedLSData.push(item)
        }
      })
    }
  }

  static getInstance (): DataProvider {
    if (this.instance == null) {
      this.instance = new DataProvider()
      this.instance.initialize()
    }
    return this.instance
  }

  get (): DataItem[] {
    const arr: DataItem[] = []
    Object.keys(localStorage).forEach((key) => {
      const item = this.lsFactory.get<DataItem>(key)
      if (item !== null) {
        arr.push(item)
      }
    })

    arr.sort((a, b) => {
      const first = parseInt(a.levelNumber.slice(13), 10)
      const second = parseInt(b.levelNumber.slice(13), 10)
      return first - second
    })

    this.storedData = arr
    return this.storedData
  }

  set (level: number, key: keyof DataItem, value: string): void {
    const LSDataKey = `Current level ${level}`
    const item = this.lsFactory.get<DataItem>(LSDataKey)

    if (item !== null) {
      const updatedItem: DataItem = {
        ...item,
        [key]: value
      }
      this.lsFactory.remove(LSDataKey)
      this.lsFactory.set(LSDataKey, updatedItem)
      console.log(this.lsFactory.get(LSDataKey))

      const levelDataIndex = this.storedData.findIndex(
        item => parseInt(item.levelNumber.slice(13), 10) ===
        level
      )
      this.storedData[levelDataIndex] = updatedItem
    }
  }

  reset (): void {
    if (
      this.storedData !== undefined &&
      this.storedData.length > 0
    ) {
      this.storedData.forEach(item => {
        this.lsFactory.remove(item.levelNumber)
      })
      this.storedData = []
      this.initialize()
    }
  }
}
