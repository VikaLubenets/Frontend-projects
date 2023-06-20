import { type DataItem } from 'types/types'
import jsonData from './levels/levels.json'

const data: DataItem[] = jsonData.map((item) => {
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

export default data
