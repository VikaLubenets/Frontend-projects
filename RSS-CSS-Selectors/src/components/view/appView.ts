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

  private render (level: number, method: (level: number) => void): void {
    const currentLevelData = data[level - 1]
    const helpButton = new HelpButton()
    const editor = new CSSEditor()
    const htmlViewer = new HTMLViewer()
    const gameSpace = new GameSpace()

    editor.draw(currentLevelData.editorDescription)
    htmlViewer.draw(currentLevelData.htmlField)
    gameSpace.draw(currentLevelData.htmlField)
    helpButton.draw(currentLevelData.nameHelpButton, currentLevelData.adviceHelpButton)

    const levelField = new Levels()
    levelField.draw(
      currentLevelData.levelNumber,
      currentLevelData.status,
      currentLevelData.taskDescription,
      currentLevelData.examples
    )
    levelField.addEventsListeners()
    levelField.levelNumberAddEventListeners(method)
  }

  private clearGameContainer (): void {
    const editorWrapper: HTMLDivElement | null = document.querySelector('.editor')
    const htmlViewerWrapper: HTMLDivElement | null = document.querySelector('.html-viewer')
    const levelsWrapper: HTMLDivElement | null = document.querySelector('.levels-wrapper')
    const gameWrapper: HTMLDivElement | null = document.querySelector('.game-wrapper')

    if (editorWrapper !== null) {
      editorWrapper.innerHTML = ''
    }

    if (htmlViewerWrapper !== null) {
      htmlViewerWrapper.innerHTML = ''
    }

    if (levelsWrapper !== null) {
      levelsWrapper.innerHTML = ''
    }

    if (gameWrapper !== null) {
      gameWrapper.innerHTML = ''
    }
  }

  public switchLevel (levelNumber: number, method: (level: number) => void): void {
    if (levelNumber >= 1 && levelNumber <= data.length) {
      this.currentLevel = levelNumber
      this.clearGameContainer()
      this.render(levelNumber, method)
    } else {
      console.error('There is no such level.')
    }
  }
}
