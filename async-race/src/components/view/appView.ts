import GarageView from './garagePage/garageView'
import WinnersView from './winnersPage/winnersView'

export default class AppViewer {
  garageView: GarageView
  winnersView: WinnersView
  garageElement: HTMLElement | null
  winnersElement: HTMLElement | null

  constructor () {
    this.garageView = new GarageView()
    this.winnersView = new WinnersView()
    this.garageElement = this.garageView.getHTMLElement()
    this.winnersElement = this.winnersView.getHTMLElement()
  }

  createView (): void {
    const body: HTMLBodyElement | null = document.querySelector('body')
    const fragment: DocumentFragment = document.createDocumentFragment()
    if (body !== null) {
      const garageButton = document.createElement('button')
      garageButton.textContent = 'Garage'
      garageButton.classList.add('garage-button')
      garageButton.addEventListener('click', () => {
        this.openGarageView()
      })
      fragment.appendChild(garageButton)

      const winnersButton = document.createElement('button')
      winnersButton.textContent = 'Winners'
      garageButton.classList.add('winners-button')
      winnersButton.addEventListener('click', () => {
        this.openWinnersView()
      })
      fragment.appendChild(winnersButton)

      if (this.garageElement !== null) {
        fragment.append(this.garageElement)
      }

      if (this.winnersElement !== null) {
        fragment.append(this.winnersElement)
        this.winnersElement.style.display = 'none'
      }
      body.append(fragment)
      this.garageView.drawGarageContainer()
    }
  }

  private openGarageView (): void {
    if (this.garageElement !== null &&
      this.winnersElement !== null) {
      this.garageElement.style.display = 'block'
      this.winnersElement.style.display = 'none'
    }
  }

  private openWinnersView (): void {
    if (this.garageElement !== null &&
      this.winnersElement !== null) {
      this.garageElement.style.display = 'none'
      this.winnersElement.style.display = 'block'
    }
  }
}
