import type DataProvider from '../data/data-provider'
import type EventEmitter from 'events'

export default class Controller {
  emitter: EventEmitter
  dataProvider: DataProvider

  constructor (dataProvider: DataProvider, emitter: EventEmitter) {
    this.emitter = emitter
    this.dataProvider = dataProvider
    this.emitter.on('createCarClicked', this.handleCreateCar.bind(this))
    this.emitter.on('removeCarClicked', this.handleRemoveCar.bind(this))
  }

  handleCreateCar (name: string, color: string): void {
    Promise.resolve(this.dataProvider.createCar(name, color))
      .then(() => {
        console.log('Car created successfully')
        this.emitter.emit('dataUpdated')
      })
      .catch((error) => {
        console.error('Failed to create car:', error)
      })
  }

  handleRemoveCar (id: number): void {
    Promise.resolve(this.dataProvider.deleteCar(id))
      .then(() => {
        console.log('Car deleted successfully')
        this.emitter.emit('dataUpdated')
      })
      .catch((error) => {
        console.error('Failed to delete car:', error)
      })
  }
}
