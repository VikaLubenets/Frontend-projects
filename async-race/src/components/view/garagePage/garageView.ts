import type { ElementParams, Garage, GarageResponse } from '../../../types/types'
import MenuView from './menu/menu'
import ViewTemplate from '../../util/view-template'
import './garageView.css'
import CarView from './car/car'
import type EventEmitter from 'events'

export default class GarageView extends ViewTemplate {
  menu: HTMLElement | null
  data: GarageResponse
  cars: Garage
  emitter: EventEmitter

  constructor (dataGarage: GarageResponse, emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['garage-container'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
    this.emitter = emitter
    this.menu = new MenuView(this.emitter).getHTMLElement()
    this.data = dataGarage
    this.cars = this.data.garage.garage
  }

  drawGarageContainer (page = 1): void {
    const garageContainer: HTMLDivElement | null = document.querySelector('.garage-container')
    if (
      garageContainer !== null &&
       this.menu !== null
    ) {
      garageContainer.append(this.menu)

      const garageHeader = document.createElement('header')
      garageHeader.classList.add('garage-header')
      garageHeader.textContent = `Garage: ${this.data.totalCount}`
      garageContainer.append(garageHeader)

      const pageNum = document.createElement('h2')
      pageNum.classList.add('page-number')
      pageNum.textContent = `Page: ${page}`
      garageContainer.append(pageNum)

      const carsContainer = document.createElement('div')
      carsContainer.classList.add('cars-container')
      garageContainer.append(carsContainer)

      for (const car of this.cars) {
        const carView = new CarView(car, this.emitter)
        const carElement = carView.getHTMLElement()
        if (carElement !== null) {
          carsContainer.append(carElement)
        }
      }

      const pageButtonsContainer = document.createElement('div')
      pageButtonsContainer.classList.add('pageButtons-container')
      garageContainer.append(pageButtonsContainer)

      const prevBtn = document.createElement('div')
      prevBtn.classList.add('prev-button')
      prevBtn.textContent = 'prev'
      prevBtn.addEventListener('click', () => this.emitter.emit('prevButtonClicked', page))
      pageButtonsContainer.append(prevBtn)

      const nextBtn = document.createElement('div')
      nextBtn.classList.add('next-button')
      nextBtn.textContent = 'next'
      nextBtn.addEventListener('click', () => this.emitter.emit('nextButtonClicked', page))
      pageButtonsContainer.append(nextBtn)
    }
  }

  updateGarageData (dataGarage: GarageResponse): void {
    this.data = dataGarage
    this.cars = this.data.garage.garage
  }
}
