import type { ElementParams, EventCallback } from 'types';

export default class HTMLElementFactory {
  element: HTMLElement | null;

  constructor(params: ElementParams) {
    this.element = null;
    this.createElement(params);
  }

  getElement(): HTMLElement | null {
    return this.element;
  }

  private createElement(params: ElementParams): void {
    this.element = document.createElement(params.tag);

    if (params.classes != null) {
      this.setCSSClass(params.classes);
    }

    if (params.textContent !== null && params.textContent !== undefined) {
      this.setTextContent(params.textContent);
    }

    if (params.callback != null) {
      this.setCallback(params.callback);
    }

    if (params.parentSelector !== null && params.parentSelector !== undefined) {
      this.addParentNode(params.parentSelector);
    }

    if (params.attributes != null) {
      this.setAttributes(params.attributes);
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
      this.element.addEventListener('click', (event) => {
        callback(event);
      });
    }
  }

  private addParentNode(selector: string): void {
    const parentElement = document.querySelector(selector);

    if (this.element !== null && parentElement !== null) {
      parentElement.appendChild(this.element);
    }
  }

  private setAttributes(attributes: Record<string, string>): void {
    Object.keys(attributes).forEach((attr) => {
      if (this.element !== null) {
        this.element.setAttribute(attr, attributes[attr]);
      }
    });
  }
}
