import { CSSEditor } from './CSS editor/CSSEditor'
import { HTMLViewer } from './HTML Viewer/htmlViewer'
import data from '../levels/data'
import { GameSpace } from './Game interface/gameSpace'
import { HelpButton } from './Game interface/help button/helpButton'
import { Levels } from './Levels/levels'

export class AppViewer {
  private currentLevel: number

  constructor () {
    this.currentLevel = 1
  }

  private render (): void {
    const currentLevelData = data[this.currentLevel - 1]

    const editor = new CSSEditor()
    const htmlViewer = new HTMLViewer()
    const gameSpace = new GameSpace()
    const helpButton = new HelpButton(
      currentLevelData.nameHelpButton,
      currentLevelData.adviceHelpButton
    )

    editor.draw(currentLevelData.editorDescription)
    htmlViewer.draw(currentLevelData.htmlField)
    gameSpace.draw(currentLevelData.gameHeader, currentLevelData.imgURL)
    helpButton.draw(currentLevelData.nameHelpButton, currentLevelData.adviceHelpButton)

    const level = new Levels(
      currentLevelData.levelNumber,
      currentLevelData.status,
      currentLevelData.taskDescription,
      currentLevelData.examples
    )
    level.draw()
  }

  public switchLevel (levelNumber: number): void {
    if (levelNumber >= 1 && levelNumber <= data.length) {
      this.currentLevel = levelNumber
      this.render()
    } else {
      console.error('There is no such level.')
    }
  }
}
