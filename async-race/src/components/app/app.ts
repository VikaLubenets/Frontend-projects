import type { GarageResponse, WinnersResponse } from '../../types/types'
import DataProvider from '../data/data-provider'
import AppViewer from '../view/appView'
import EventEmitter from 'events'
import Controller from '../controller/controller'

export default class App {
  view: AppViewer | null
  dataProvider: DataProvider
  carsData: GarageResponse | null
  emitter: EventEmitter
  controller: Controller | null
  currentPage: number
  winnersData: WinnersResponse | null

  constructor () {
    this.dataProvider = new DataProvider()
    this.emitter = new EventEmitter()
    this.currentPage = 1
    this.carsData = null
    this.winnersData = null
    this.view = null
    this.controller = null
    this.emitter.on('dataUpdated', () => {
      this.updateApp().catch(error => {
        console.error('Error with update view', error)
      })
    })
    this.emitter.on('prevButtonGarageClicked', () => {
      this.prevPage().catch(error => {
        console.error('Error with prev page view', error)
      })
    })
    this.emitter.on('nextButtonGarageClicked', () => {
      this.nextPage().catch(error => {
        console.error('Error with next page view', error)
      })
    })
  }

  async start (): Promise<void> {
    this.carsData = await this.dataProvider.getCars(this.currentPage, 7)
    this.winnersData = await this.dataProvider.getWinners(this.currentPage, 3)
    this.view = new AppViewer(this.carsData, this.emitter, this.winnersData)
    this.view.createView()
    this.controller = new Controller(this.dataProvider, this.emitter)
  }

  private async updateApp (): Promise<void> {
    try {
      this.carsData = await this.dataProvider.getCars(this.currentPage, 7)
      if (this.view !== null) {
        this.view.updateView(this.carsData, this.currentPage)
      }
    } catch (error) {
      console.error('Error with update view', error)
    }
  }

  private async nextPage (): Promise<void> {
    if (
      this.carsData !== null &&
      (this.view != null)
    ) {
      const totalPages = Math.ceil(this.carsData.totalCount / 7)
      if (this.currentPage < totalPages) {
        this.currentPage += 1
        this.carsData = await this.dataProvider.getCars(this.currentPage, 7)
        this.view.updateView(this.carsData, this.currentPage)
      }
    }
  }

  private async prevPage (): Promise<void> {
    if (
      this.carsData !== null &&
      (this.view != null)
    ) {
      if (this.currentPage > 1) {
        this.currentPage -= 1
        this.carsData = await this.dataProvider.getCars(this.currentPage, 7)
        this.view.updateView(this.carsData, this.currentPage)
      }
    }
  }
}
