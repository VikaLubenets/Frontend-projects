import { CSSEditor } from './CSS editor/CSSEditor'
import { HTMLViewer } from './HTML Viewer/htmlViewer'
import { GameSpace } from './Game interface/gameSpace'
import { HelpButton } from './Game interface/help button/helpButton'
import { Levels } from './Levels/levels'
import type { DataItem, IAppViewer } from '../../types/types'
import type { EventEmitter } from 'events'

export class AppViewer implements IAppViewer {
  currentLevel: number
  data: DataItem[]
  emitter: EventEmitter

  constructor (data: DataItem[], emitter: EventEmitter) {
    this.currentLevel = 1
    this.data = data
    this.emitter = emitter
  }

  private render (level: number): void {
    const currentLevelData = this.data[level - 1]
    const helpButton = new HelpButton()
    const editor = new CSSEditor()
    const htmlViewer = new HTMLViewer()
    const gameSpace = new GameSpace()

    editor.draw(currentLevelData.editorDescription)
    htmlViewer.draw(currentLevelData.htmlField)
    gameSpace.draw(currentLevelData.htmlField)
    helpButton.draw(currentLevelData.nameHelpButton, currentLevelData.adviceHelpButton)

    const levelField = new Levels(this.emitter, this.data)
    levelField.draw(
      currentLevelData.levelNumber,
      currentLevelData.status,
      currentLevelData.taskDescription,
      currentLevelData.examples
    )
    levelField.addEventsListeners()
    levelField.levelNumberAddEventListeners()
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

  public drawLevel (levelNumber: number): void {
    if (levelNumber >= 1 && levelNumber <= this.data.length) {
      this.currentLevel = levelNumber
      this.clearGameContainer()
      this.render(levelNumber)
    } else {
      console.error('There is no such level.')
    }
  }

  public updateLevelStatusView (data: DataItem[]): void {
    const completedLevels: number[] = []
    data.forEach(item => {
      if (item.status === 'completed') {
        completedLevels.push(parseInt(item.levelNumber.slice(13), 10))
      }
    })
    if (completedLevels.length > 0) {
      const levelNumbers = document.querySelectorAll('.level-block__number')
      levelNumbers.forEach((levelNumber) => {
        const level = parseInt(levelNumber.textContent as string)
        if (completedLevels.includes(level)) {
          levelNumber.classList.add('completed')
        }
      })
    }

    if (completedLevels.length === 0) {
      const levelNumbers = document.querySelectorAll('.level-block__number')
      levelNumbers.forEach((levelNumber) => {
        const level = parseInt(levelNumber.textContent as string)
        if (completedLevels.includes(level)) {
          levelNumber.classList.remove('completed')
        }
      })
    }
  }
}
