import { CSSEditor } from './CSS editor/CSSEditor'
import { HTMLViewer } from './HTML Viewer/htmlViewer'
import { GameSpace } from './Game interface/gameSpace'
import { HelpButton } from './Game interface/help button/helpButton'
import { Levels } from './Levels/levels'
import type { DataItem, IAppViewer } from '../../types/types'
import type { EventEmitter } from 'events'
import HelpPrint from './CSS editor/helpPrint/helpPrint'

export class AppViewer implements IAppViewer {
  currentLevel: number
  data: DataItem[]
  emitter: EventEmitter

  constructor (data: DataItem[], emitter: EventEmitter) {
    this.currentLevel = 1
    this.data = data
    this.emitter = emitter
  }

  public drawLevel (levelNumber: number, data: DataItem[], emitter: EventEmitter): void {
    if (levelNumber >= 1 && levelNumber <= this.data.length) {
      this.currentLevel = levelNumber
      this.clearGameContainer()
      this.render(levelNumber, data, emitter)
      this.updateLevelStatusView(data)
      this.animateElements(levelNumber, data)
      this.addTitleToElements()
    } else {
      console.error('There is no such level.')
    }
  }

  private render (level: number, data: DataItem[], emitter: EventEmitter): void {
    const currentLevelData = data[level - 1]
    const helpButton = new HelpButton(emitter, currentLevelData.status)
    const editor = new CSSEditor()
    const helpPrint = new HelpPrint()
    const htmlViewer = new HTMLViewer()
    const gameSpace = new GameSpace()

    editor.draw(currentLevelData.editorDescription, currentLevelData.status)
    htmlViewer.draw(currentLevelData.htmlField)
    gameSpace.draw(currentLevelData.htmlField)
    helpButton.draw(currentLevelData.nameHelpButton, currentLevelData.adviceHelpButton)
    helpPrint.draw()
    this.emitter.once('helpClicked', (helpAdvice) => {
      helpButton.removeEventsListeners()
      helpPrint.animateText(helpAdvice)
      editor.updateInputAfterHelp(helpAdvice)
    })

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

  private animateElements (levelNumber: number, data: DataItem[]): void {
    const currentLevelData = data[levelNumber - 1]
    const applicableSelector = currentLevelData.selector
    const elements = document.querySelectorAll<HTMLElement>(`${applicableSelector}`)
    if (elements.length > 0) {
      elements.forEach(element => { element.classList.remove('roll-out') })
      elements.forEach(element => { element.classList.add('add-animation') })
    }
  }

  private addTitleToElements (): void {
    const container: HTMLDivElement | null = document.querySelector('.container')
    const HTMLField: HTMLElement | null = document.querySelector('.html-viewer__field')
    if (
      container !== null &&
      HTMLField !== null
    ) {
      const childrenElements = Array.from(container.querySelectorAll<HTMLElement>('*'))
      const htmlFieldElements = Array.from(HTMLField.querySelectorAll<HTMLElement>('*'))

      childrenElements.push(...htmlFieldElements)
      if (childrenElements.length > 0) {
        childrenElements.forEach(element => {
          const showTitile = (): void => {
            element.setAttribute('title', element.outerHTML)
          }
          element.addEventListener('mouseover', showTitile)
        })
      }
    }
  }

  private updateLevelStatusView (data: DataItem[]): void {
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
    } else if (completedLevels.length === 0) {
      const levelNumbers = document.querySelectorAll('.level-block__number')
      levelNumbers.forEach((levelNumber) => {
        const level = parseInt(levelNumber.textContent as string)
        if (completedLevels.includes(level)) {
          levelNumber.classList.remove('completed')
        }
      })
    }

    const helpedLevels: number[] = []
    data.forEach(item => {
      if (item.helpClicked === 'true') {
        helpedLevels.push(parseInt(item.levelNumber.slice(13), 10))
      }
    })
    if (helpedLevels.length > 0) {
      const levelNumbers = document.querySelectorAll('.level-block__number')
      levelNumbers.forEach((levelNumber) => {
        const level = parseInt(levelNumber.textContent as string)
        if (helpedLevels.includes(level)) {
          levelNumber.classList.add('helped')
        }
      })
    }
  }
}
