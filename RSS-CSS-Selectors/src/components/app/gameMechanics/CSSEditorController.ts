import data from '../../data/dataProvider'

export class CSSEditorController {
  private readonly winCondition: string
  private readonly levelNumber: number

  constructor (levelNumber: number) {
    this.winCondition = data[levelNumber - 1].correctAnswers
    this.levelNumber = levelNumber
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
      // Выполнение действий при правильном ответе
      console.log('you did it right!')
    } else {
      // Выполнение действий при неправильном ответе
      console.log('you did it wrong!')
    }
  }
}
