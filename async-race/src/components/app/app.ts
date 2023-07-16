import type { GarageResponse } from '../../types/types'
import DataProvider from '../data/data-provider'
import AppViewer from '../view/appView'

export default class App {
  view: AppViewer
  dataProvider: DataProvider
  carsData: GarageResponse | null

  constructor () {
    this.dataProvider = new DataProvider()
    this.carsData = null
    this.view = new AppViewer()
  }

  async start (): Promise<void> {
    this.carsData = await this.dataProvider.getCars()
    this.view.createView()
  }
}
