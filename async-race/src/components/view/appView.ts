import type { GarageResponse } from '../../types/types'
import GarageView from './garagePage/garageView'
import WinnersView from './winnersPage/winnersView'
import type EventEmitter from 'events'

export default class AppViewer {
  garageView: GarageView
  winnersView: WinnersView
  garageElement: HTMLElement | null
  winnersElement: HTMLElement | null
  dataGarage: GarageResponse
  emitter: EventEmitter
  garageContainer: HTMLElement | null

  constructor (dataGarage: GarageResponse, emitter: EventEmitter) {
    this.dataGarage = dataGarage
    this.emitter = emitter
    this.garageView = new GarageView(this.dataGarage, this.emitter)
    this.winnersView = new WinnersView()
    this.garageElement = this.garageView.getHTMLElement()
    this.winnersElement = this.winnersView.getHTMLElement()
    this.garageContainer = null
  }

  createView (): void {
    const body: HTMLBodyElement | null = document.querySelector('body')
    const fragment: DocumentFragment = document.createDocumentFragment()
    if (body !== null) {
      const garageButton = document.createElement('button')
      garageButton.textContent = 'Garage'
      garageButton.classList.add('garage-button')
      garageButton.addEventListener('click', () => {
        this.openGarageView()
      })
      fragment.appendChild(garageButton)

      const winnersButton = document.createElement('button')
      winnersButton.textContent = 'Winners'
      winnersButton.classList.add('winners-button')
      winnersButton.addEventListener('click', () => {
        this.openWinnersView()
      })
      fragment.appendChild(winnersButton)

      if (this.garageContainer === null) {
        this.garageContainer = document.createElement('div')
        this.garageContainer.classList.add('garage-container')
        fragment.append(this.garageContainer)
      } else {
        this.garageContainer.innerHTML = ''
      }

      if (this.garageElement !== null) {
        this.garageContainer.append(this.garageElement)
      }

      if (this.winnersElement !== null) {
        fragment.append(this.winnersElement)
        this.winnersElement.style.display = 'none'
      }
      body.append(fragment)
      this.garageView.drawGarageContainer()
    }
  }

  private openGarageView (): void {
    if (this.garageElement !== null && this.winnersElement !== null) {
      this.garageElement.style.display = 'block'
      this.winnersElement.style.display = 'none'
    }
  }

  private openWinnersView (): void {
    if (this.garageElement !== null && this.winnersElement !== null) {
      this.garageElement.style.display = 'none'
      this.winnersElement.style.display = 'block'
    }
  }

  updateView (carsData: GarageResponse): void {
    this.dataGarage = carsData
    this.garageView.updateGarageData(this.dataGarage)
    if (this.garageElement !== null) {
      const garageContainer = document.querySelector('.garage-container')
      if (garageContainer !== null) {
        while (garageContainer.firstChild !== null) {
          garageContainer.removeChild(garageContainer.firstChild)
        }
      }
    }
    this.garageView.drawGarageContainer()
  }
}
