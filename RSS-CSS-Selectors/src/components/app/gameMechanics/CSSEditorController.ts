import { ModalConstructor } from '../../view/Game interface/modal constructor/modal'
import data from '../../data/dataProvider'

export class CSSEditorController {
  private readonly winCondition: string
  private readonly levelNumber: number
  private readonly isWin: () => void

  constructor (levelNumber: number, nextLevel: () => void) {
    this.winCondition = data[levelNumber - 1].correctAnswers
    this.levelNumber = levelNumber
    this.isWin = nextLevel
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
      })

      inputItem.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          this.checkCondition(inputItem.value)
        }
      })
    }
  }

  private checkCondition (input: string): void {
    if (input.trim() === this.winCondition) {
      this.setCompletedStatus()
      if (this.isGameCompleted()) {
        this.showModal()
      } else if (this.isLastLevelCompleted() &&
      this.levelNumber === data.length) {
        const notCompletedLevels = data
          .filter((item) => item.status !== 'completed')
          .map((item) => item.levelNumber)
          .toString()
        const modal = new ModalConstructor()
        modal.draw(`The following levels are not completed: ${notCompletedLevels}`)
      } else {
        this.isWin()
      }
    } else {
      const editorWrapper: HTMLDivElement | null = document.querySelector('.editor')
      if (editorWrapper != null) {
        editorWrapper.classList.add('losing-animation')
        editorWrapper.addEventListener('animationend', this.deleteAnimation)
      }
    }
  }

  private setCompletedStatus (): void {
    const item = data[this.levelNumber - 1]
    item.status = 'completed'
  }

  private isGameCompleted (): boolean {
    return data.every((item) => item.status === 'completed')
  }

  private isLastLevelCompleted (): boolean {
    const lastLevelNumber = data.length
    return data[lastLevelNumber - 1].status === 'completed'
  }

  private showModal (): void {
    const modal = new ModalConstructor()
    modal.draw('Congratulations! You have completed all levels.')
  }

  private readonly deleteAnimation = (event: AnimationEvent): void => {
    const editorWrapper = event.target as HTMLDivElement
    editorWrapper.classList.remove('losing-animation')
    editorWrapper.removeEventListener('animationend', this.deleteAnimation)
  }
}
