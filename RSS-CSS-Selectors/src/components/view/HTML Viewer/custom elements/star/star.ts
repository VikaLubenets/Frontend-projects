export class Star extends HTMLElement {
  connectedCallback (): void {
    this.innerHTML = '<img src="./star.png">'
  }
}
