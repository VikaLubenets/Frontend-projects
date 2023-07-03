import { CSSEditor } from './CSS editor/CSSEditor'
import { HTMLViewer } from './HTML Viewer/htmlViewer'
import { GameSpace } from './Game interface/gameSpace'
import { HelpButton } from './Game interface/help button/helpButton'
import { Levels } from './Levels/levels'
import type { DataItem, IAppViewer } from '../../types/types'
import type { EventEmitter } from 'events'
import HelpPrint from './CSS editor/helpPrint/helpPrint'

export default class AppViewer implements IAppViewer {
  public drawLevel (levelNumber: number, data: DataItem[], emitter: EventEmitter): void {
    if (levelNumber >= 1 && levelNumber <= data.length) {
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
    emitter.removeAllListeners('helpClicked')
    emitter.once('helpClicked', (helpAdvice) => {
      helpButton.removeEventsListeners()
      helpPrint.animateText(helpAdvice)
      editor.updateInputAfterHelp(helpAdvice)
    })

    const levelField = new Levels(emitter, data)
    levelField.draw(
      currentLevelData.levelNumber,
      currentLevelData.status,
      currentLevelData.taskDescription,
      currentLevelData.examples
    )
    levelField.burgerMenuAddEventsListeners()
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
    const container: HTMLDivElement | null = document.querySelector('.game-image')
    const HTMLField: HTMLElement | null = document.querySelector('.html-viewer__field')
    if (container !== null && HTMLField !== null) {
      const childrenElements = this.getAllNestedElements(container)
      console.log(childrenElements)
      const htmlFieldElements = Array.from(HTMLField.querySelectorAll<HTMLElement>('*'))

      if (childrenElements.length > 0 && htmlFieldElements.length > 0) {
        childrenElements.forEach((element, index) => {
          const content = htmlFieldElements[index]

          const showTitle = (): void => {
            this.updateTitle(element, content, true)
            toggleVisibility()
          }

          const removeTitle = (): void => {
            this.updateTitle(element, content, false)
            toggleVisibility()
          }

          const toggleVisibility = (): void => {
            element.classList.toggle('visible')
            content.classList.toggle('visible')
          }

          element.addEventListener('mouseover', showTitle)
          element.addEventListener('mouseleave', removeTitle)
          content.addEventListener('mouseover', showTitle)
          content.addEventListener('mouseleave', removeTitle)
        })
      }
    }
  }

  private getAllNestedElements (parent: HTMLElement): HTMLElement[] {
    const elements: HTMLElement[] = []
    const children = Array.from(parent.children) as HTMLElement[]

    for (const el of children) {
      elements.push(el)
      if (el.children.length > 0) {
        const nestedElements = this.getAllNestedElements(el)
        elements.push(...nestedElements)
      }
    }

    return elements
  }

  private updateTitle (element: HTMLElement, content: HTMLElement, show: boolean): void {
    if (show && content.textContent !== null) {
      element.setAttribute('data-title', content.textContent)
      content.setAttribute('data-title', content.textContent)
    } else {
      element.removeAttribute('data-title')
      content.removeAttribute('data-title')
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
