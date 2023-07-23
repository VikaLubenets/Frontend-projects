import './winModal.css'

export default class WinModal {
  private modalCover: HTMLElement | null
  private closeButton: HTMLButtonElement | null
  private modalContent: HTMLElement | null

  constructor () {
    this.modalCover = null
    this.closeButton = null
    this.modalContent = null
  }

  public draw (carName: string, time: number): void {
    const fragment = document.createDocumentFragment()
    this.modalCover = document.createElement('div')
    this.modalCover.classList.add('modal__cover')

    this.closeButton = document.createElement('button')
    this.closeButton?.classList.add('modal__button')

    this.modalContent = document.createElement('div')
    this.modalContent.classList.add('modal')

    this.modalCover.append(this.modalContent)

    this.modalCover.classList.add('open')
    this.addEventsListeners()
    this.modalContent.textContent = `Congratulations! The car ${carName} has won the game in ${time} seconds`
    this.modalContent.append(this.closeButton)

    fragment.append(this.modalCover)

    const body: HTMLBodyElement | null = document.querySelector('body')
    if (body !== null) {
      body.append(fragment)
    }
  }

  private addEventsListeners (): void {
    if (
      this.modalCover !== null &&
         this.closeButton !== null
    ) {
      this.modalCover.addEventListener('click', this.handleCoverClick)
      this.closeButton.addEventListener('click', this.handleCloseButtonClick)
    }
  }

  private removeEventsListeners (): void {
    if (
      this.modalCover !== null &&
        this.closeButton !== null
    ) {
      this.modalCover.removeEventListener('click', this.handleCoverClick)
      this.closeButton.removeEventListener('click', this.handleCloseButtonClick)
    }
  }

  private readonly handleCoverClick = (event: MouseEvent): void => {
    if (
      event.target === this.modalCover &&
        event.target !== this.modalContent
    ) {
      this.closeModal()
    }
  }

  private readonly handleCloseButtonClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (
      target === this.closeButton ||
        target.closest('.modal__button') === this.closeButton
    ) {
      this.closeModal()
    }
  }

  private closeModal (): void {
    if (this.modalCover !== null) {
      this.modalCover.classList.remove('open')
      this.removeEventsListeners()
    }
  }
}
