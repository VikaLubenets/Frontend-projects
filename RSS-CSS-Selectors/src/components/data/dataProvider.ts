import { type DataItem } from 'types/types'
import defaultData from './levels/levels.json'
import { LocalStorageData } from './storage/localStorageData'

const dataArr: DataItem[] = defaultData.map((item) => {
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

const localStorageData = new LocalStorageData()
dataArr.forEach((item) => {
  localStorageData.set(item)
})

const storedData: DataItem[] = []
dataArr.forEach((item) => {
  const storedItem = localStorageData.get(item.levelNumber)
  if (storedItem !== null) {
    storedData.push(storedItem)
  }
})

export default storedData
