import GarageView from "./garagePage/garageView";
import WinnersView from "./winnersPage/winnersView";

export default class AppViewer {
  garageView: GarageView;
  winnersView: WinnersView

  constructor(){
    this.garageView = new GarageView();
    this.winnersView = new WinnersView()
  }

  createView(): void {
    const body = document.querySelector('body')
    const fragment: DocumentFragment = document.createDocumentFragment()
    if (body !== null) {
      body.innerHTML = ''
      const container = document.createElement('div')
      container.classList.add('.winners-conteiner')
      fragment.append(container)
      body.append(fragment)
    }
  }
}
  