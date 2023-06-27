import './helpButton.css'
import { ModalConstructor } from '../modal constructor/modal'

export class HelpButton {
  public draw (name: string, advice: string): void {
    const button = document.createElement('div')
    button.classList.add('help-button')
    button.textContent = name
    button.addEventListener('click', (e) => { this.openAdvice(e, advice) })

    const gameWrapper: HTMLElement | null = document.querySelector('.game-wrapper')
    if (gameWrapper !== null) {
      gameWrapper.append(button)
    }
  }

  private openAdvice (e: MouseEvent, advice: string): void {
    const button: HTMLDivElement | null = document.querySelector('.help-button')

    if (button !== null) {
      if (e.target === button) {
        const helpModal = new ModalConstructor()
        helpModal.draw(advice)
      }
    }
  }
}
