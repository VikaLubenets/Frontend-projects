import './modal.css'

export class ModalConstructor {
  private modalCover: HTMLElement | null
  private closeButton: HTMLButtonElement | null
  private modalContent: HTMLElement | null

  constructor () {
    this.modalCover = null
    this.closeButton = null
    this.modalContent = null
  }

  public draw (content: string): void {
    const fragment = document.createDocumentFragment()
    const modalTemp: HTMLTemplateElement | null = document.querySelector('.modal-template')

    if (modalTemp !== null) {
      const modalClone = modalTemp.content.cloneNode(true) as HTMLElement

      this.modalCover = modalClone.querySelector('.modal__cover')
      this.closeButton = modalClone.querySelector('.modal__button')
      this.modalContent = modalClone.querySelector('.modal')

      if (this.modalCover !== null && this.closeButton !== null && this.modalContent !== null) {
        this.modalCover.classList.add('open')
        this.addEventsListeners()
        this.modalContent.textContent = content
        this.modalContent.append(this.closeButton)

        fragment.append(modalClone)

        const body: HTMLBodyElement | null = document.querySelector('body')
        if (body !== null) {
          body.append(fragment)
        }
      }
    }
  }

  private addEventsListeners (): void {
    if (this.modalCover !== null && this.closeButton !== null) {
      this.modalCover.addEventListener('click', this.handleCoverClick)
      this.closeButton.addEventListener('click', this.handleCloseButtonClick)
    }
  }

  private removeEventsListeners (): void {
    if (this.modalCover !== null && this.closeButton !== null) {
      this.modalCover.removeEventListener('click', this.handleCoverClick)
      this.closeButton.removeEventListener('click', this.handleCloseButtonClick)
    }
  }

  private readonly handleCoverClick = (event: MouseEvent): void => {
    if (event.target === this.modalCover && event.target !== this.modalContent) {
      this.closeModal()
    }
  }

  private readonly handleCloseButtonClick = (event: MouseEvent): void => {
    const target = event.target as HTMLElement
    if (target === this.closeButton || target.closest('.modal__button') === this.closeButton) {
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
