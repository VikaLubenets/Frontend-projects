export class Planet extends HTMLElement {
  connectedCallback (): void {
    this.innerHTML = '<img src="./planet.png">'
  }
}
