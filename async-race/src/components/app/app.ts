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
  currentPageGarage: number
  currentPageWinners: number
  winnersData: WinnersResponse | null

  constructor () {
    this.dataProvider = new DataProvider()
    this.emitter = new EventEmitter()
    this.currentPageGarage = 1
    this.currentPageWinners = 1
    this.carsData = null
    this.winnersData = null
    this.view = null
    this.controller = null
    this.emitter.on('dataCarsUpdated', () => {
      this.updateApp().catch(error => {
        console.error('Error with update view', error)
      })
    })
    this.emitter.on('dataWinnerUpdated', () => {
      this.updateAppWinners().catch(error => {
        console.error('Error with update view', error)
      })
    })
    this.emitter.on('prevButtonGarageClicked', () => {
      this.prevPageGarage().catch(error => {
        console.error('Error with prev page view', error)
      })
    })
    this.emitter.on('nextButtonGarageClicked', () => {
      this.nextPageGarage().catch(error => {
        console.error('Error with next page view', error)
      })
    })
    this.emitter.on('prevButtonWinnersClicked', () => {
      this.prevPageWinners().catch(error => {
        console.error('Error with prev page view', error)
      })
    })
    this.emitter.on('nextButtonWinnersClicked', () => {
      this.nextPageWinners().catch(error => {
        console.error('Error with next page view', error)
      })
    })
  }

  async start (): Promise<void> {
    this.carsData = await this.dataProvider.getCars(this.currentPageGarage, 7)
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, 10)
    this.view = new AppViewer(this.carsData, this.emitter, this.winnersData)
    this.view.createView()
    this.controller = new Controller(this.dataProvider, this.emitter)
  }

  private async updateApp (): Promise<void> {
    try {
      this.carsData = await this.dataProvider.getCars(this.currentPageGarage, 7)
      this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, 10)
      if (this.view !== null) {
        this.view.updateView(this.carsData, this.currentPageGarage)
      }
    } catch (error) {
      console.error('Error with update view', error)
    }
  }

  private async updateAppWinners (): Promise<void> {
    try {
      this.carsData = await this.dataProvider.getCars(this.currentPageGarage, 7)
      this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, 10)
      if (this.view !== null) {
        this.view.updateWinnersView(this.winnersData, this.currentPageGarage)
      }
    } catch (error) {
      console.error('Error with update view', error)
    }
  }

  private async nextPageGarage (): Promise<void> {
    if (
      this.carsData !== null &&
      this.view !== null &&
      this.winnersData !== null
    ) {
      const totalPages = Math.ceil(this.carsData.totalCount / 7)
      if (this.currentPageGarage < totalPages) {
        this.currentPageGarage += 1
        this.carsData = await this.dataProvider.getCars(this.currentPageGarage, 7)
        this.view.updateView(this.carsData, this.currentPageGarage)
      }
    }
  }

  private async prevPageGarage (): Promise<void> {
    if (
      this.carsData !== null &&
      this.view !== null &&
      this.winnersData !== null
    ) {
      if (this.currentPageGarage > 1) {
        this.currentPageGarage -= 1
        this.carsData = await this.dataProvider.getCars(this.currentPageGarage, 7)
        this.view.updateView(this.carsData, this.currentPageGarage)
      }
    }
  }

  private async nextPageWinners (): Promise<void> {
    if (
      this.view !== null &&
      this.winnersData !== null
    ) {
      const totalPages = Math.ceil(this.winnersData.totalCount / 10)
      if (this.currentPageWinners < totalPages) {
        this.currentPageWinners += 1
        this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, 10)
        this.view.updateWinnersView(this.winnersData, this.currentPageWinners)
      }
    }
  }

  private async prevPageWinners (): Promise<void> {
    if (
      this.view !== null &&
      this.winnersData !== null
    ) {
      if (this.currentPageWinners > 1) {
        this.currentPageWinners -= 1
        this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, 10)
        this.view.updateWinnersView(this.winnersData, this.currentPageWinners)
      }
    }
  }
}
