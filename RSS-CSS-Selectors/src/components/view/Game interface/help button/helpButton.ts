import './helpButton.css'
import type { EventEmitter } from 'events'

export class HelpButton {
  emitter: EventEmitter
  handleClick: () => void
  status: string

  constructor (emitter: EventEmitter, status: string) {
    this.emitter = emitter
    this.handleClick = () => { this.emitter.emit('helpClicked') }
    this.status = status
  }

  public draw (name: string, helpAdvice: string): void {
    const button = document.createElement('div')
    this.handleClick = (): void => {
      this.emitter.emit('helpClicked', helpAdvice)
    }
    button.classList.add('help-button')
    button.textContent = name
    if (this.status === 'completed') {
      button.style.pointerEvents = 'none'
    } else {
      button.addEventListener('click', this.handleClick)
    }
    const gameWrapper: HTMLElement | null = document.querySelector('.game-wrapper')
    if (gameWrapper !== null) {
      gameWrapper.append(button)
    }
  }

  public removeEventsListeners (): void {
    const button: HTMLDivElement | null = document.querySelector('.help-button')
    if (button !== null) {
      button.removeEventListener('click', this.handleClick)
      button.style.pointerEvents = 'none'
    }
  }
}
