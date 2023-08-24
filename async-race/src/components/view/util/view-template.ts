import type { ElementParams } from 'types';
import HTMLElementFactory from './element-factory';

export default abstract class ViewTemplate {
  params: ElementParams;

  element: HTMLElement | null;

  constructor(params: ElementParams) {
    this.params = params;
    this.element = null;
    this.draw(this.params);
  }

  getHTMLElement(): HTMLElement | null {
    return this.element;
  }

  draw(params: ElementParams): void {
    const elementParams: ElementParams = {
      tag: params.tag,
      classes: params.classes,
    };

    const elementCreator = new HTMLElementFactory(elementParams);
    this.element = elementCreator.getElement();
  }
}
