import { type Garage, type TableRow, type Winners, TableColName, type Car } from '../../../../types/types'
import type EventEmitter from 'events'
import './tableWinners.css'
import CarView from '../../../view/garagePage/car/car'

export default class TableWinner {
  carData: Garage
  winnersData: Winners
  emitter: EventEmitter
  element: HTMLElement | null

  constructor (garageData: Garage, winners: Winners, emitter: EventEmitter) {
    this.carData = garageData
    this.winnersData = winners
    this.emitter = emitter
    this.element = this.drawTable()
  }

  drawTable (): HTMLElement {
    const table = document.createElement('table')
    table.classList.add('table-winners')
    const dataTable: TableRow[] = this.getWinnersDataForTable()

    const headerRow = document.createElement('tr')
    for (const key of Object.keys(dataTable[0])) {
      const th = document.createElement('th')
      th.textContent = TableColName[key as keyof TableRow]
      headerRow.append(th)
    }
    table.append(headerRow)

    for (const item of dataTable) {
      const row = document.createElement('tr')
      for (const key of Object.keys(item) as Array<keyof TableRow>) {
        const td = document.createElement('td')
        if (key === 'car') {
          td.appendChild(item[key] as SVGElement)
        } else {
          td.textContent = item[key]
        }
        row.append(td)
      }
      table.append(row)
    }

    return table
  }

  getElement (): HTMLElement | undefined {
    if (this.element !== null) {
      return this.element
    }
  }

  private getCarNameById (id: number): string {
    const car = this.carData.find((car) => car.id === id)
    return (car != null) ? car.name : ''
  }

  private getCarforSVG (id: number): Car | undefined {
    const car = this.carData.find((car) => car.id === id)
    return (car != null) ? car : undefined
  }

  private getWinnersDataForTable (): TableRow[] {
    const carElements: SVGElement[] = []

    this.winnersData.forEach((winner) => {
      const car = this.getCarforSVG(winner.id)
      if (car !== null && car !== undefined) {
        const carView = new CarView(car, this.emitter)
        const carElement = carView.createCarSvg(car.color, car.id)
        if (carElement !== null) {
          carElements.push(carElement)
        }
      }
    })

    return this.winnersData.map((winner, index) => {
      const carElement = carElements[index] ?? null
      return {
        number: (index + 1).toString(),
        car: carElement ?? '',
        name: this.getCarNameById(winner.id),
        wins: winner.wins.toString(),
        bestTime: winner.time.toString()
      }
    })
  }
}
