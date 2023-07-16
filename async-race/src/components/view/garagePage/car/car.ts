import ViewTemplate from '../../../util/view-template'
import type { ElementParams } from '../../../../types/types'
import './car.css'
import HTMLElementFactory from '../../../util/element-factory'

export default class CarView extends ViewTemplate {
  constructor () {
    const params: ElementParams = {
      tag: 'div',
      classes: ['track-wrapper']
    }
    super(params)
    this.drawCarTrack()
  }

  drawCarTrack (): void {
    this.createButtonsLine()
    const startEndBtn = this.createStartEndBtns()

    const trackContainerParams = {
      tag: 'div',
      classes: ['car-track']
    }
    const trackContainer = new HTMLElementFactory(trackContainerParams).getElement()

    const carParams = {
      tag: 'div',
      classes: ['car']
    }
    const car = new HTMLElementFactory(carParams).getElement()

    const startContainerParams = {
      tag: 'div',
      classes: ['start-container']
    }
    const startContainer = new HTMLElementFactory(startContainerParams).getElement()
    if (
      startContainer !== null &&
        startEndBtn !== null &&
        car !== null
    ) {
      startContainer.append(startEndBtn, car)
    }

    const flagParams = {
      tag: 'div',
      classes: ['flag'],
      textContent: ''
    }
    const flag = new HTMLElementFactory(flagParams).getElement()

    if (
      trackContainer !== null &&
        startContainer !== null &&
        flag !== null
    ) {
      trackContainer.append(startContainer, flag)
      const trackWrapper = this.getHTMLElement()
      if (trackWrapper !== null) {
        trackWrapper.append(trackContainer)
      }
    }
  }

  private createButtonsLine (): void {
    const BtnParams = {
      tag: 'div',
      classes: ['car-buttons']
    }
    const buttonContainer = new HTMLElementFactory(BtnParams).getElement()

    const selectBtnParams = {
      tag: 'div',
      classes: ['button', 'select-button'],
      textContent: 'select'
    }
    const selectBtn = new HTMLElementFactory(selectBtnParams).getElement()

    const removeBtnParams = {
      tag: 'div',
      classes: ['button', 'remove-button'],
      textContent: 'remove'
    }
    const removeBtn = new HTMLElementFactory(removeBtnParams).getElement()

    const carModelParams = {
      tag: 'div',
      classes: ['car-model'],
      textContent: 'add car modal here'
    }
    const carModalInfo = new HTMLElementFactory(carModelParams).getElement()

    if (
      buttonContainer !== null &&
        selectBtn !== null &&
        removeBtn !== null &&
        carModalInfo !== null
    ) {
      buttonContainer.append(selectBtn, removeBtn, carModalInfo)
      const trackWrapper = this.getHTMLElement()
      if (trackWrapper !== null) {
        trackWrapper.append(buttonContainer)
      }
    }
  }

  private createStartEndBtns (): HTMLElement | null {
    const BtnContainerParams = {
      tag: 'div',
      classes: ['btns-container']
    }
    const buttonContainer = new HTMLElementFactory(BtnContainerParams).getElement()

    const BtnStartParams = {
      tag: 'div',
      classes: ['button-start'],
      textContent: 'A'
    }
    const buttonStart = new HTMLElementFactory(BtnStartParams).getElement()

    const BtnEndParams = {
      tag: 'div',
      classes: ['button-end'],
      textContent: 'B'
    }
    const buttonEnd = new HTMLElementFactory(BtnEndParams).getElement()

    if (
      buttonContainer !== null &&
        buttonStart !== null &&
        buttonEnd !== null
    ) {
      buttonContainer.append(buttonStart, buttonEnd)
      return buttonContainer
    }
    return null
  }
}
