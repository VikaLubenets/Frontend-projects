import './helpButton.css'

export class HelpButton {
  name: string
  advice: string

  constructor (nameHelpButton: string, adviceHelpButton: string) {
    this.name = nameHelpButton
    this.advice = adviceHelpButton
  }

  public draw (name: string, advice: string): void {
    const button = document.createElement('div')
    button.classList.add('help-button')
    button.textContent = name
    button.addEventListener('click', (e) => { this.openAdvice(e) })

    const description = document.createElement('div')

    description.classList.add('help-text hidden')
    description.textContent = advice
    button.append(description)
  }

  private openAdvice (e: Event): void {
    const button: HTMLDivElement | null = document.querySelector('.help-button')
    const description: HTMLDivElement | null = document.querySelector('.help-text.hidden')

    if ((button != null) && (description != null)) {
      if (e.target === button) {
        description.classList.remove('hidden')
      } else {
        description.classList.add('hidden')
      }
    }
  }
}
