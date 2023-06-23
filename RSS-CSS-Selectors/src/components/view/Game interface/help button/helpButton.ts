import './helpButton.css'

export class HelpButton {
  public draw (name: string, advice: string): void {
    const button = document.createElement('div')
    button.classList.add('help-button')
    button.textContent = name
    button.addEventListener('click', (e) => { this.openAdvice(e) })

    const description = document.createElement('div')

    description.classList.add('help-text')
    description.classList.add('hidden')
    description.textContent = advice
    button.append(description)

    const gameWrapper: HTMLElement | null = document.querySelector('.game-wrapper')
    if (gameWrapper !== null) {
      gameWrapper.append(button)
    }
  }

  private openAdvice (e: Event): void {
    const button: HTMLDivElement | null = document.querySelector('.help-button')
    const description: HTMLDivElement | null = document.querySelector('.help-text.hidden')

    if ((button !== null) && (description !== null)) {
      if (e.target === button) {
        description.classList.remove('hidden')
      } else {
        description.classList.add('hidden')
      }
    }
  }
}
