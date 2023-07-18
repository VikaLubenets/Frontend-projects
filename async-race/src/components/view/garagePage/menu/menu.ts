import ViewTemplate from '../../../util/view-template'
import type { ElementParams } from '../../../../types/types'
import './menu.css'
import HTMLElementFactory from '../../../util/element-factory'
import type EventEmitter from 'events'

export default class MenuView extends ViewTemplate {
  emitter: EventEmitter

  constructor (emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['menu-container'],
      textContent: 'text'
    }
    super(params)
    this.emitter = emitter
    this.createCarCreationView()
    this.createCarUpdateView()
    this.createButtonsView()
  }

  createCarCreationView (): void {
    const inputContainerParams = {
      tag: 'div',
      classes: ['input-container'],
      parentSelector: '.menu-container'
    }
    const carInputContainer = new HTMLElementFactory(inputContainerParams).getElement()

    const inputParams = {
      tag: 'input',
      classes: ['car-input'],
      parentSelector: '.input-container'
    }
    const carInput = new HTMLElementFactory(inputParams).getElement() as HTMLInputElement

    const colorParams = {
      tag: 'input',
      classes: ['color-car', 'button'],
      textContent: 'color'
    }
    const colorSelection = new HTMLElementFactory(colorParams).getElement() as HTMLInputElement
    if (colorSelection !== null) {
      colorSelection.setAttribute('type', 'color')
    }

    const createBtnParams = {
      tag: 'div',
      classes: ['button'],
      textContent: 'create',
      callback: () => this.emitter.emit('createCarClicked', carInput.value, colorSelection.value)
    }
    const createBtn = new HTMLElementFactory(createBtnParams).getElement()

    if (
      carInputContainer !== null &&
      carInput !== null &&
      colorSelection !== null &&
      createBtn !== null
    ) {
      carInputContainer.append(carInput, colorSelection, createBtn)
      const menuContainer = this.getHTMLElement()
      if (menuContainer !== null) {
        menuContainer.append(carInputContainer)
      }
    }
  }

  createCarUpdateView (): void {
    const inputContainerParams = {
      tag: 'div',
      classes: ['input-container'],
      parentSelector: '.menu-container'
    }
    const carUpdateContainer = new HTMLElementFactory(inputContainerParams).getElement()

    const inputParams = {
      tag: 'input',
      classes: ['update-input'],
      parentSelector: '.input-container'
    }
    const carInput = new HTMLElementFactory(inputParams).getElement() as HTMLInputElement

    const colorParams = {
      tag: 'input',
      classes: ['color-car-update', 'button'],
      textContent: 'color'
    }
    const colorSelection = new HTMLElementFactory(colorParams).getElement() as HTMLInputElement
    if (colorSelection !== null) {
      colorSelection.setAttribute('type', 'color')
    }

    const updateBtnParams = {
      tag: 'div',
      classes: ['button'],
      textContent: 'update',
      callback: () => this.emitter.emit('updateCarClicked', carInput.value, colorSelection.value)
    }
    const updateBtn = new HTMLElementFactory(updateBtnParams).getElement()

    if (
      carUpdateContainer !== null &&
      carInput !== null &&
      colorSelection !== null &&
      updateBtn !== null
    ) {
      carUpdateContainer.append(carInput, colorSelection, updateBtn)
      const menuContainer = this.getHTMLElement()
      if (menuContainer !== null) {
        menuContainer.append(carUpdateContainer)
      }
    }
  }

  createButtonsView (): void {
    const BtnParams = {
      tag: 'div',
      classes: ['button-container'],
      parentSelector: '.menu-container'
    }
    const buttonContainer = new HTMLElementFactory(BtnParams).getElement()

    const raceBtnParams = {
      tag: 'div',
      classes: ['button', 'race-button'],
      textContent: 'race'
    }
    const raceBtn = new HTMLElementFactory(raceBtnParams).getElement()

    const resetBtnParams = {
      tag: 'div',
      classes: ['button', 'race-button'],
      textContent: 'reset'
    }
    const resetBtn = new HTMLElementFactory(resetBtnParams).getElement()

    const generateCarsBtnParams = {
      tag: 'div',
      classes: ['button', 'generate-button'],
      textContent: 'generate cars'
    }
    const generateCarsBtn = new HTMLElementFactory(generateCarsBtnParams).getElement()

    if (
      buttonContainer !== null &&
      raceBtn !== null &&
      resetBtn !== null &&
      generateCarsBtn !== null
    ) {
      buttonContainer.append(raceBtn, resetBtn, generateCarsBtn)
      const menuContainer = this.getHTMLElement()
      if (menuContainer !== null) {
        menuContainer.append(buttonContainer)
      }
    }
  }
}
