import type { WinnersResponse, ElementParams, Winners, GarageResponse, Garage } from '../../../types/types'
import ViewTemplate from '../util/view-template'
import './winnersView.css'
import type EventEmitter from 'events'
import TableWinner from './tableWinners/tableWinners'

export default class WinnersView extends ViewTemplate {
  data: WinnersResponse
  emitter: EventEmitter
  winners: Winners
  cars: Garage

  constructor (dataWinners: WinnersResponse, garageData: GarageResponse, emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['winners-conteiner'],
      textContent: 'text',
      parentSelector: 'body'
    }
    super(params)
    this.emitter = emitter
    this.data = dataWinners
    this.winners = this.data.winnersData
    this.cars = garageData.garage.garage
  }

  drawWinnersContainer (page = 1): void {
    const winnersContainer: HTMLDivElement | null = document.querySelector('.winners-conteiner')

    if (winnersContainer !== null) {
      const winnersHeader = document.createElement('header')
      winnersHeader.classList.add('winners-header')
      winnersHeader.textContent = `Winners: ${this.data.totalCount}`
      winnersContainer.append(winnersHeader)

      const pageNum = document.createElement('h2')
      pageNum.classList.add('page-number')
      pageNum.textContent = `Page: ${page}`
      winnersContainer.append(pageNum)

      const winnersTableContainer = document.createElement('div')
      winnersTableContainer.classList.add('table-container')
      winnersContainer.append(winnersTableContainer)

      const table = new TableWinner(this.cars, this.winners, this.emitter)
      const tableHTML = table.getElement()
      if (tableHTML !== undefined) {
        winnersTableContainer.append(tableHTML)
      }

      const pageButtonsContainer = document.createElement('div')
      pageButtonsContainer.classList.add('pageButtons-container')
      winnersContainer.append(pageButtonsContainer)

      const prevBtn = document.createElement('div')
      prevBtn.classList.add('prev-button')
      prevBtn.textContent = 'prev'
      prevBtn.addEventListener('click', () => this.emitter.emit('prevButtonWinnersClicked', page))
      pageButtonsContainer.append(prevBtn)

      const nextBtn = document.createElement('div')
      nextBtn.classList.add('next-button')
      nextBtn.textContent = 'next'
      nextBtn.addEventListener('click', () => this.emitter.emit('nextButtonWinnersClicked', page))
      pageButtonsContainer.append(nextBtn)
    }
  }

  updateWinnersData (dataGarage: GarageResponse, dataWinners: WinnersResponse): void {
    this.data = dataWinners
    this.winners = this.data.winnersData
    this.cars = dataGarage.garage.garage
  }
}
