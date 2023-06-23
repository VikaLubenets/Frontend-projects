import { CSSEditor } from './CSS editor/CSSEditor'
import { HTMLViewer } from './HTML Viewer/htmlViewer'
import data from '../data/dataProvider'
import { GameSpace } from './Game interface/gameSpace'
import { HelpButton } from './Game interface/help button/helpButton'
import { Levels } from './Levels/levels'

export class AppViewer {
  currentLevel: number

  constructor () {
    this.currentLevel = 1
  }

  private render (level: number): void {
    const currentLevelData = data[level - 1]
    const helpButton = new HelpButton()
    const editor = new CSSEditor()
    const htmlViewer = new HTMLViewer()
    const gameSpace = new GameSpace()

    editor.draw(currentLevelData.editorDescription)
    htmlViewer.draw(currentLevelData.htmlField)
    gameSpace.draw()
    helpButton.draw(currentLevelData.nameHelpButton, currentLevelData.adviceHelpButton)

    const levelField = new Levels()
    levelField.draw(currentLevelData.levelNumber,
      currentLevelData.status,
      currentLevelData.taskDescription,
      currentLevelData.examples)
    levelField.addEventsListeners()
  }

  public switchLevel (levelNumber: number): void {
    if (levelNumber >= 1 && levelNumber <= data.length) {
      this.currentLevel = levelNumber
      this.render(levelNumber)
    } else {
      console.error('There is no such level.')
    }
  }
}
