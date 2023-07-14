import GarageView from './garagePage/garageView'
import WinnersView from './winnersPage/winnersView'

export default class AppViewer {
  garageView: GarageView
  winnersView: WinnersView

  constructor () {
    this.garageView = new GarageView()
    this.winnersView = new WinnersView()
  }

  createView (): void {
    const body: HTMLBodyElement | null = document.querySelector('body')
    const fragment: DocumentFragment = document.createDocumentFragment()
    if (body !== null) {
      const garageElement = this.garageView.getHTMLElement()
      const winnersElement = this.winnersView.getHTMLElement()

      if (garageElement !== null) {
        fragment.append(garageElement)
      }

      if (winnersElement !== null) {
        fragment.append(winnersElement)
      }
      body.append(fragment)
    }
  }
}
