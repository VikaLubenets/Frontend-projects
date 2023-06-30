import './helpButton.css'
import type { EventEmitter } from 'events'

export class HelpButton {
  emitter: EventEmitter

  constructor (emitter: EventEmitter) {
    this.emitter = emitter
  }

  public draw (name: string, helpAdvice: string): void {
    const button = document.createElement('div')
    button.classList.add('help-button')
    button.textContent = name
    button.addEventListener('click', () => { this.emitter.emit('helpClicked', helpAdvice) })

    const gameWrapper: HTMLElement | null = document.querySelector('.game-wrapper')
    if (gameWrapper !== null) {
      gameWrapper.append(button)
    }
  }
}
