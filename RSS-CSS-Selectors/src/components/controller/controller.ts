import ModalConstructor from '../view/Game interface/modal constructor/modal'
import type { DataItem, IController } from '../../types/types'
import type { EventEmitter } from 'events'

export default class Controller implements IController {
  private winCondition: string[]
  private levelNumber: number
  private data: DataItem[]
  emitter: EventEmitter

  constructor (levelNumber: number, data: DataItem[], emitter: EventEmitter) {
    this.data = data
    this.emitter = emitter
    this.levelNumber = levelNumber
    this.winCondition = [...this.data[this.levelNumber - 1].correctAnswers]
  }

  public initialize (level: number, dataNew: DataItem[], emitterNew: EventEmitter): void {
    this.addEventListeners()
    this.levelNumber = level
    this.data = dataNew
    this.emitter = emitterNew
    this.winCondition = [...this.data[this.levelNumber - 1].correctAnswers]
  }

  private addEventListeners (): void {
    const inputItem: HTMLInputElement | null = document.querySelector('.editor__input')
    const submitButton: HTMLDivElement | null = document.querySelector('.editor__button')

    if (submitButton !== null && inputItem !== null) {
      submitButton.addEventListener('click', () => {
        this.checkCondition(inputItem.value)
        this.isSpecialCase()
      })

      inputItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkCondition(inputItem.value)
          this.isSpecialCase()
        }
      })
    }
  }

  private checkCondition (input: string): void {
    if (this.winCondition.includes(input.trim())) {
      const animatedElements = document.querySelectorAll<HTMLElement>('.add-animation')
      let count = animatedElements.length

      if (animatedElements !== null && count > 0) {
        animatedElements.forEach((element) => {
          element.classList.remove('add-animation')
          element.classList.add('roll-out')
          element.addEventListener('animationend', () => {
            count--
            if (count === 0) {
              this.emitter.emit('levelCompleted')
            }
          }, { once: true })
        })
      }
    } else {
      const editorWrapper: HTMLDivElement | null = document.querySelector('.editor')
      if (editorWrapper != null) {
        editorWrapper.classList.add('losing-animation')
        editorWrapper.addEventListener('animationend', this.deleteAnimation)
      }
    }
  }

  isSpecialCase (): void {
    if (this.isGameCompleted()) {
      this.emitter.emit('GameCompleted')
    } else if (
      this.isLastLevelCompleted() &&
      this.levelNumber === this.data.length
    ) {
      const notCompletedLevels = this.data
        .filter((item) => item.status !== 'completed')
        .map((item) => item.levelNumber)
        .toString()
      const modal = new ModalConstructor()
      modal.draw(`The following levels are not completed: ${notCompletedLevels}`)
    }
  }

  private isGameCompleted (): boolean {
    return this.data.every((item) => item.status === 'completed')
  }

  private isLastLevelCompleted (): boolean {
    const lastLevelNumber = this.data.length
    return this.data[lastLevelNumber - 1].status === 'completed'
  }

  private readonly deleteAnimation = (event: AnimationEvent): void => {
    const editorWrapper = event.target as HTMLDivElement
    editorWrapper.classList.remove('losing-animation')
    editorWrapper.removeEventListener('animationend', this.deleteAnimation)
  }
}
