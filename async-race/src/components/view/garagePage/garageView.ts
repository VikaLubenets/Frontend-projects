import type { ElementParams, Garage, GarageResponse } from '../../../types/types'
import MenuView from './menu/menu'
import ViewTemplate from '../../util/view-template'
import './garageView.css'
import CarView from './car/car'

export default class GarageView extends ViewTemplate {
  menu: HTMLElement | null
  data: GarageResponse
  cars: Garage

  constructor (dataGarage: GarageResponse) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['garage-container'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
    this.menu = new MenuView().getHTMLElement()
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
        const carView = new CarView(car)
        const carElement = carView.getHTMLElement()
        if (carElement !== null) {
          carsContainer.append(carElement)
        }
      }
    }
  }
}
