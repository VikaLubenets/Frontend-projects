import { type DataItem } from 'types/types'
import data from './levels/levels.json'
import lsFactory, { type LocalStorageFactory } from './storage/localStorageData'

export default class DataProvider {
  private readonly defaultData: DataItem[]
  private storedData: DataItem[]
  private readonly lsFactory: LocalStorageFactory
  private static readonly instance = new DataProvider()

  private constructor () {
    this.defaultData = data.map((item) => {
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
        imgURL: item.imgURL
      }
    })

    this.storedData = []
    this.lsFactory = lsFactory('level')
  }

  private initialize (): void {
    this.defaultData.forEach((item) => {
      const { levelNumber, ...dataToStore } = item
      dataToStore.levelNumber = levelNumber
      this.lsFactory.set(levelNumber, dataToStore)
    })

    this.defaultData.forEach((item) => {
      const storedItem: DataItem | null = this.lsFactory.get<DataItem>(item.levelNumber)
      if (storedItem !== null) {
        this.storedData.push(storedItem)
      }
    })
  }

  static getInstance (): DataProvider {
    this.instance.initialize()
    return this.instance
  }

  get (): DataItem[] {
    return this.storedData
  }

  set (data: DataItem[]): void {
    this.storedData = data
    this.saveData()
  }

  remove (): void {
    this.storedData = []
    this.saveData()
  }

  private saveData (): void {
    this.storedData.forEach((item) => {
      const { levelNumber, ...dataToStore } = item
      dataToStore.levelNumber = levelNumber
      this.lsFactory.set(levelNumber, dataToStore)
    })
  }
}
