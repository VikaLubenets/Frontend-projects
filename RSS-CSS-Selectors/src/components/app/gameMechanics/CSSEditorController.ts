import data from '../../data/dataProvider'

export class CSSEditorController {
  private readonly winCondition: string

  constructor (levelNumber: number) {
    this.winCondition = data[levelNumber].correctAnswers
  }

  private addEventsListeners (): void {
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
    if (input === this.winCondition) {
      // Выполнение действий при правильном ответе
    } else {
      // Выполнение действий при неправильном ответе
    }
  }
}
