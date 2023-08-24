import ViewTemplate from 'components/view/util/view-template';
import HTMLElementFactory from 'components/view/util/element-factory';
import type EventEmitter from 'events';
import type { Car, ElementParams } from 'types';
import renderCarIcon from './helpers/renderCarIcon';
import './car.css';

export default class CarView extends ViewTemplate {
  data: Car;

  emitter: EventEmitter;

  constructor(data: Car, emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['track-wrapper'],
    };
    super(params);
    this.data = data;
    this.drawCarTrack();
    this.emitter = emitter;
  }

  drawCarTrack(): void {
    this.createButtonsLine(this.data.name);
    const startEndBtn = this.createStartEndBtns();
    const car = renderCarIcon(this.data.color, this.data.id);

    const trackContainerParams = {
      tag: 'div',
      classes: ['car-track'],
    };
    const trackContainer = new HTMLElementFactory(trackContainerParams).getElement();

    const startContainerParams = {
      tag: 'div',
      classes: ['start-container'],
    };
    const startContainer = new HTMLElementFactory(startContainerParams).getElement();

    if (startContainer !== null && startEndBtn !== null && car !== null) {
      startContainer.append(startEndBtn, car);
    }

    const flagParams = {
      tag: 'div',
      classes: ['flag'],
      textContent: '',
    };
    const flag = new HTMLElementFactory(flagParams).getElement();

    if (trackContainer !== null && startContainer !== null && flag !== null) {
      trackContainer.append(startContainer, flag);
      const trackWrapper = this.getHTMLElement();

      if (trackWrapper !== null) {
        trackWrapper.append(trackContainer);
      }
    }
  }

  private createButtonsLine(model: string): void {
    const BtnParams = {
      tag: 'div',
      classes: ['car-buttons'],
    };
    const buttonContainer = new HTMLElementFactory(BtnParams).getElement();

    const selectBtnParams = {
      tag: 'div',
      classes: ['button', 'select-button'],
      textContent: 'select',
      callback: () => this.emitter.emit('selectCarClicked', this.data.id),
    };
    const selectBtn = new HTMLElementFactory(selectBtnParams).getElement();

    const removeBtnParams = {
      tag: 'div',
      classes: ['button', 'remove-button'],
      textContent: 'remove',
      callback: () => this.emitter.emit('removeCarClicked', this.data.id),
    };
    const removeBtn = new HTMLElementFactory(removeBtnParams).getElement();

    const carModelParams = {
      tag: 'div',
      classes: ['car-model'],
      textContent: `${model}`,
    };
    const carModalInfo = new HTMLElementFactory(carModelParams).getElement();

    if (buttonContainer !== null && selectBtn !== null && removeBtn !== null && carModalInfo !== null) {
      buttonContainer.append(selectBtn, removeBtn, carModalInfo);
      const trackWrapper = this.getHTMLElement();

      if (trackWrapper !== null) {
        trackWrapper.append(buttonContainer);
      }
    }
  }

  private createStartEndBtns(): HTMLElement | null {
    const BtnContainerParams = {
      tag: 'div',
      classes: ['btns-container'],
    };
    const buttonContainer = new HTMLElementFactory(BtnContainerParams).getElement();

    const BtnStartParams = {
      tag: 'div',
      classes: ['button-start'],
      textContent: 'A',
      callback: (event: Event) => {
        this.updateStartEndButtons(event);
      },
      attributes: { 'data-id': this.data.id.toString() },
    };
    const buttonStart = new HTMLElementFactory(BtnStartParams).getElement();

    const BtnEndParams = {
      tag: 'div',
      classes: ['button-end', 'disabled-button'],
      textContent: 'B',
      callback: (event: Event) => {
        this.updateStartEndButtons(event);
      },
      attributes: { 'data-id': this.data.id.toString() },
    };
    const buttonEnd = new HTMLElementFactory(BtnEndParams).getElement();

    if (buttonContainer !== null && buttonStart !== null && buttonEnd !== null) {
      buttonContainer.append(buttonStart, buttonEnd);
      return buttonContainer;
    }

    return null;
  }

  private updateStartEndButtons(event: Event): void {
    const clickedButton = event.target as HTMLElement | null;
    if (clickedButton == null) return;

    const container = clickedButton.closest('.track-wrapper');
    if (container == null) return;

    const carId = clickedButton.dataset.id;

    if (carId != null) {
      const startButton = container.querySelector(`[data-id="${carId}"].button-start`);
      const endButton = container.querySelector(`[data-id="${carId}"].button-end`);

      if (startButton != null && endButton != null) {
        if (clickedButton.classList.contains('button-start')) {
          startButton.classList.add('disabled-button');
          endButton.classList.remove('disabled-button');
          this.emitter.emit('startEngineClicked', this.data.id, 'started');
        } else if (clickedButton.classList.contains('button-end')) {
          endButton.classList.add('disabled-button');
          startButton.classList.remove('disabled-button');
          this.emitter.emit('stopEngineClicked', this.data.id, 'stopped');
        }
      }
    }
  }
}
