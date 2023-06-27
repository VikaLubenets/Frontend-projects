export class Comet extends HTMLElement {
  connectedCallback (): void {
    this.innerHTML = '<img src="./comet.png">'
  }
}
