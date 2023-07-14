import type { ElementParams, EventCallback } from '../../types/types';

export default class HTMLElementFactory {
  element: HTMLElement | null;

  constructor(params: ElementParams) {
    this.element = null;
    this.createElement(params);
  }

  getElement() {
    return this.element;
  }

  private createElement(params: ElementParams): void {
    this.element = document.createElement(params.tag);
    if (params.classes) {
      this.setCSSClass(params.classes);
    }
    if (params.textContent) {
      this.setTextContent(params.textContent);
    }
    if (params.callback) {
      this.setCallback(params.callback);
    }
    if (params.parentSelector){
      this.addParentNode(params.parentSelector)
    }
  }

  private setCSSClass(classes: string[]): void {
    classes.forEach((cssClass) => {
      if (this.element !== null) {
        this.element.classList.add(cssClass);
      }
    });
  }

  private setTextContent(text: string): void {
    if (this.element !== null) {
      this.element.textContent = text;
    }
  }

  private setCallback(callback: EventCallback): void {
    if (this.element !== null && typeof callback === 'function') {
      this.element.addEventListener('click', (event) => callback(event));
    }
  }

  private addParentNode(selector: string): void {
    const parentElement = document.querySelector(`${selector}`)
    
    if (
      this.element !== null &&
      parentElement !== null
      ) {
      parentElement.append(this.element)
    }
  }
}