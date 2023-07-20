import { type Garage, type TableRow, type Winners, TableColName } from '../../../../types/types'
import type EventEmitter from 'events'
import './tableWinners.css'

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
    const dataTable: TableRow[] = [
      { number: '1', car: 'tesla', name: 'tesla', wins: '1', bestTime: '2.5' },
      { number: '2', car: 'Kia', name: 'tesla', wins: '1', bestTime: '3.5' }
    ]

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

        td.textContent = item[key]
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
}
