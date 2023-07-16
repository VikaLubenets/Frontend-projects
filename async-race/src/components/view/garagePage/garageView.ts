import type { ElementParams } from '../../../types/types'
import MenuView from './menu/menu'
import ViewTemplate from '../../util/view-template'
import './garageView.css'
import CarView from './car/car'

export default class GarageView extends ViewTemplate {
  menu: HTMLElement | null

  constructor () {
    const params: ElementParams = {
      tag: 'div',
      classes: ['garage-container'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
    this.menu = new MenuView().getHTMLElement()
  }

  drawGarageContainer (): void {
    const garageContainer: HTMLDivElement | null = document.querySelector('.garage-container')
    if (
      garageContainer !== null &&
       this.menu !== null
    ) {
      garageContainer.append(this.menu)

      const garageHeader = document.createElement('header')
      garageHeader.classList.add('garage-header')
      garageHeader.textContent = 'Garage (add cars amount)'
      garageContainer.append(garageHeader)

      const pageNum = document.createElement('h2')
      pageNum.classList.add('page-number')
      pageNum.textContent = 'page (add num)'
      garageContainer.append(pageNum)

      const carsContainer = document.createElement('div')
      carsContainer.classList.add('cars-container')
      garageContainer.append(carsContainer)

      const car = new CarView().getHTMLElement()
      if (car !== null) {
        carsContainer.append(car)
      }
    }
  }
}
