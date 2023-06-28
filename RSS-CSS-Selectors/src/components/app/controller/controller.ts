import { ModalConstructor } from '../../view/Game interface/modal constructor/modal'
import type { DataItem } from '../../../types/types'
import type { EventEmitter } from 'events'

export class Controller {
  private readonly winCondition: string
  private readonly levelNumber: number
  private readonly data: DataItem[]
  emitter: EventEmitter

  constructor (levelNumber: number, data: DataItem[], emitter: EventEmitter) {
    this.winCondition = data[levelNumber - 1].correctAnswers
    this.levelNumber = levelNumber
    this.data = data
    this.emitter = emitter
  }

  public initialize (): void {
    this.addEventListeners()
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
    if (input.trim() === this.winCondition) {
      this.emitter.emit('levelCompleted', this.levelNumber)
    } else {
      const editorWrapper: HTMLDivElement | null = document.querySelector('.editor')
      if (editorWrapper != null) {
        editorWrapper.classList.add('losing-animation')
        editorWrapper.addEventListener('animationend', this.deleteAnimation)
      }
    }
  }

  private isSpecialCase (): void {
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
