import type { GarageResponse } from '../../types/types'
import DataProvider from '../data/data-provider'
import AppViewer from '../view/appView'

export default class App {
  view: AppViewer | null
  dataProvider: DataProvider
  carsData: GarageResponse | null

  constructor () {
    this.dataProvider = new DataProvider()
    this.carsData = null
    this.view = null
  }

  async start (): Promise<void> {
    this.carsData = await this.dataProvider.getCars()
    this.view = new AppViewer(this.carsData)
    this.view.createView()
  }
}
