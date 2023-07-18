import type DataProvider from '../data/data-provider'
import type EventEmitter from 'events'

export default class Controller {
  emitter: EventEmitter
  dataProvider: DataProvider
  selectedCarId: number | null

  constructor (dataProvider: DataProvider, emitter: EventEmitter) {
    this.emitter = emitter
    this.dataProvider = dataProvider
    this.selectedCarId = null
    this.emitter.on('createCarClicked', this.handleCreateCar.bind(this))
    this.emitter.on('removeCarClicked', this.handleRemoveCar.bind(this))
    this.emitter.on('selectCarClicked', this.handleSelectCar.bind(this))
    this.emitter.on('updateCarClicked', this.handleUpdateCar.bind(this))
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

  handleSelectCar (id: number): void {
    console.log('handleSelector is working')
    Promise.resolve(this.dataProvider.getCar(id))
      .then((data) => {
        const updateInput: HTMLInputElement | null = document.querySelector('.update-input')
        const colorInput: HTMLInputElement | null = document.querySelector('.color-car-update')
        if (updateInput !== null) {
          updateInput.value = data.name
        }
        if (colorInput !== null) {
          colorInput.value = data.color
        }
        this.selectedCarId = data.id
        console.log('Car selected successfully')
      })
      .catch((error) => {
        console.error('Failed to select car:', error)
      })
  }

  handleUpdateCar (name: string, color: string): void {
    if (this.selectedCarId !== null) {
      Promise.resolve(this.dataProvider.updateCar(this.selectedCarId, name, color))
        .then(() => {
          console.log('Car updated successfully')
          const updateInput: HTMLInputElement | null = document.querySelector('.update-input')
          const colorInput: HTMLInputElement | null = document.querySelector('.color-car-update')
          if (updateInput !== null) {
            updateInput.value = ''
          }
          if (colorInput !== null) {
            colorInput.value = 'white'
          }
          this.emitter.emit('dataUpdated')
        })
        .catch((error) => {
          console.error('Failed to update car:', error)
        })
    } else {
      console.error('No car selected')
    }
  }
}
