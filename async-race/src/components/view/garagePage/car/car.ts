import ViewTemplate from '../../../util/view-template'
import type { Car, ElementParams } from '../../../../types/types'
import './car.css'
import HTMLElementFactory from '../../../util/element-factory'
import type EventEmitter from 'events'

export default class CarView extends ViewTemplate {
  data: Car
  emitter: EventEmitter

  constructor (data: Car, emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['track-wrapper']
    }
    super(params)
    this.data = data
    this.drawCarTrack()
    this.emitter = emitter
  }

  drawCarTrack (): void {
    this.createButtonsLine(this.data.name)
    const startEndBtn = this.createStartEndBtns()
    const car = this.createCarSvg(this.data.color)

    const trackContainerParams = {
      tag: 'div',
      classes: ['car-track']
    }
    const trackContainer = new HTMLElementFactory(trackContainerParams).getElement()

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

  private createButtonsLine (model: string): void {
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
      textContent: 'remove',
      callback: () => this.emitter.emit('removeCarClicked', this.data.id)
    }
    const removeBtn = new HTMLElementFactory(removeBtnParams).getElement()

    const carModelParams = {
      tag: 'div',
      classes: ['car-model'],
      textContent: `${model}`
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

  private createCarSvg (color: string): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.setAttribute('width', '50')
    svg.setAttribute('height', '50')
    svg.setAttribute('class', 'icon')
    svg.setAttribute('viewBox', '0 0 1024 1024')

    const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path1.setAttribute('fill', '#AEBCC3')
    path1.setAttribute('d', 'M766.976 508.736c80.576 0 152.448 32.128 199.232 82.176')

    const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path2.setAttribute('fill', color)
    path2.setAttribute('d', 'M64.704 684.992c10.816 19.2 32.064 32.192 56.576 32.192h784.64c35.84 0 64.832-27.648 64.832-61.76v-17.408h-36.608a15.744 15.744 0 0 1-16.064-15.296v-71.808a277.568 277.568 0 0 0-150.144-44.16h1.6l-55.04-.256c-53.632-115.2-157.504-210.752-294.208-210.752-136.512 0-251.008 89.728-282.176 210.688H121.28c-35.456 0-56.128 27.392-56.128 61.184')

    const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path3.setAttribute('fill', '#F5BB1D')
    path3.setAttribute('d', 'M64.704 654.464h13.76a39.168 39.168 0 0 0 40.064-38.272v-17.6c0-21.12-17.92-38.208-40.064-38.208H65.088')

    const path4 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path4.setAttribute('fill', '#455963')
    path4.setAttribute('d', 'M160 684.992a101.632 96.832 0 1 0 203.264 0 101.632 96.832 0 1 0-203.264 0Z')

    const path5 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path5.setAttribute('fill', '#AEBCC3')
    path5.setAttribute('d', 'M218.88 684.992a42.752 40.768 0 1 0 85.504 0 42.752 40.768 0 1 0-85.504 0Z')

    const path6 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path6.setAttribute('fill', '#455963')
    path6.setAttribute('d', 'M652.032 684.992a101.568 96.832 0 1 0 203.136 0 101.568 96.832 0 1 0-203.136 0Z')

    const path7 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path7.setAttribute('fill', '#AEBCC3')
    path7.setAttribute('d', 'M710.912 684.992a42.752 40.768 0 1 0 85.504 0 42.752 40.768 0 1 0-85.504 0Z')

    const path8 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path8.setAttribute('fill', '#F5BB1D')
    path8.setAttribute('d', 'M966.272 591.104v-.192a257.92 257.92 0 0 0-48.192-40v71.808c0 8.448 7.232 15.296 16.064 15.296h36.608v-42.304l-4.48-4.608z')

    const path9 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    path9.setAttribute('fill', '#631536')
    path9.setAttribute('d', 'M405.568 335.616c-104.896 6.336-191.296 76.8-216.64 170.816h216.64V335.616zm40.128 170.816h216.64c-41.216-86.848-117.12-159.616-216.64-170.048v170.048z')

    svg.appendChild(path1)
    svg.appendChild(path2)
    svg.appendChild(path3)
    svg.appendChild(path4)
    svg.appendChild(path5)
    svg.appendChild(path6)
    svg.appendChild(path7)
    svg.appendChild(path8)
    svg.appendChild(path9)

    return svg
  }
}
