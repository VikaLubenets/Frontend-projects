import type { GarageResponse } from '../../types/types'
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

  constructor () {
    this.dataProvider = new DataProvider()
    this.carsData = null
    this.view = null
    this.emitter = new EventEmitter()
    this.controller = null
    this.emitter.on('dataUpdated', () => {
      this.updateApp().catch(error => {
        console.error('Error with update view', error)
      })
    })
  }

  async start (): Promise<void> {
    this.carsData = await this.dataProvider.getCars()
    this.view = new AppViewer(this.carsData, this.emitter)
    this.view.createView()
    this.controller = new Controller(this.dataProvider, this.emitter)
  }

  private async updateApp (): Promise<void> {
    try {
      this.carsData = await this.dataProvider.getCars()
      if (this.view !== null) {
        this.view.updateView(this.carsData)
      }
    } catch (error) {
      console.error('Error with update view', error)
    }
  }
}
