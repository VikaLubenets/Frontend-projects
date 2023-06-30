import './helpButton.css'
import type { EventEmitter } from 'events'

export class HelpButton {
  emitter: EventEmitter
  handleClick: () => void
  status: string

  constructor (emitter: EventEmitter, status: string) {
    this.emitter = emitter
    this.handleClick = () => {}
    this.status = status
  }

  public draw (name: string, helpAdvice: string): void {
    const button = document.createElement('div')
    button.classList.add('help-button')
    button.textContent = name
    this.handleClick = (): void => {
      this.emitter.emit('helpClicked', helpAdvice)
    }
    if (this.status === 'completed') {
      this.removeEventsListeners()
    } else {
      this.removeEventsListeners()
      button.addEventListener('click', this.handleClick, { once: true })
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
