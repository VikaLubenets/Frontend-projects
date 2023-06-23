import data from '../../data/dataProvider'

export class CSSEditorController {
  private readonly winCondition: string
  private readonly levelNumber: number
  private readonly isWin: () => void

  constructor (levelNumber: number, isWin: () => void) {
    this.winCondition = data[levelNumber - 1].correctAnswers
    this.levelNumber = 1
    this.isWin = isWin
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
      this.isWin()
      console.log('you did it right!')
    } else {
      const editorWrapper: HTMLDivElement | null = document.querySelector('.editor')
      if (editorWrapper != null) {
        editorWrapper.classList.add('losing-animation')
        editorWrapper.addEventListener('animationend', this.deleteAnimation)
      }
      console.log('you did it wrong!')
    }
  }

  private readonly deleteAnimation = (event: AnimationEvent): void => {
    const editorWrapper = event.target as HTMLDivElement
    editorWrapper.classList.remove('losing-animation')
    editorWrapper.removeEventListener('animationend', this.deleteAnimation)
  }
}
