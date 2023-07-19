import type DataProvider from '../data/data-provider'
import type EventEmitter from 'events'
import type { EngineStartStatus, EngineStopStatus } from '../../types/types'
import CarAnimation from '../view/garagePage/car/carAnimation/carAnimation'

export default class Controller {
  emitter: EventEmitter
  dataProvider: DataProvider
  selectedCarId: number | null
  animatedCars: Record<number, CarAnimation | undefined>

  constructor (dataProvider: DataProvider, emitter: EventEmitter) {
    this.emitter = emitter
    this.dataProvider = dataProvider
    this.selectedCarId = null
    this.animatedCars = {}
    this.emitter.on('createCarClicked', this.handleCreateCar.bind(this))
    this.emitter.on('removeCarClicked', this.handleRemoveCar.bind(this))
    this.emitter.on('selectCarClicked', this.handleSelectCar.bind(this))
    this.emitter.on('updateCarClicked', this.handleUpdateCar.bind(this))
    this.emitter.on('generateCarsButtonClicked', this.handleGenerateCars.bind(this))
    this.emitter.on('startEngineClicked', this.handleStartEngine.bind(this))
    this.emitter.on('stopEngineClicked', this.handleStopEngine.bind(this))
  }

  handleCreateCar (name: string, color: string): void {
    Promise.resolve(this.dataProvider.createCar(name, color))
      .then(() => {
        console.log('Car created successfully')
        const createInput: HTMLInputElement | null = document.querySelector('.car-input')
        const colorInput: HTMLInputElement | null = document.querySelector('.color-car')
        if (createInput !== null) {
          createInput.value = ''
        }
        if (colorInput !== null) {
          colorInput.value = 'white'
        }
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

  handleGenerateCars (): void {
    const firstPartOfName = ['Ford', 'Tesla', 'Mersedes', 'Nissan', 'Toyota', 'Kia', 'Mazda', 'BMW', 'Audi', 'Porche', 'Asten Martin', 'Ferrari', 'Hammer', 'Lexus', 'Subaru']
    const secondPartOfName = ['911', 'modal Y', 'modal X', 'M3', 'Supra', 'R8', 'GT', 'RX-8', 'Eclipse', 'Viper', 'Mustang', 'Rio', 'GTO', 'X5', 'GT 500']

    const generateRandomName = (): string => {
      const randomNumFirst = Math.floor(Math.random() * firstPartOfName.length)
      const randomNumSecond = Math.floor(Math.random() * secondPartOfName.length)

      return `${firstPartOfName[randomNumFirst]} ${secondPartOfName[randomNumSecond]}`
    }

    const generateRandomColor = (): string => {
      const letters = '0123456789ABCDEF'
      let color = '#'
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }

    const generateRandomCar = (): { name: string, color: string } => {
      return {
        name: generateRandomName(),
        color: generateRandomColor()
      }
    }

    let neededCarsNum = 100
    while (neededCarsNum > 0) {
      const generatedCar = generateRandomCar()
      this.handleCreateCar(generatedCar.name, generatedCar.color)
      neededCarsNum--
    }
  }

  handleStartEngine (id: number, status: EngineStartStatus): void {
    Promise.resolve(this.dataProvider.startStopCarEngine(id, status))
      .then(async (response) => {
        try {
          const animatedCar = new CarAnimation(id, response.velocity)
          this.animatedCars[id] = animatedCar
          animatedCar.animateCar()
          await this.dataProvider.switchEngineToDriveMode(id)
        } catch (error) {
          console.error('Failed to start car engine:', error)
          if (error instanceof Error && error.message === "Car has been stopped suddenly. It's engine was broken down.") {
            const animatedCar = this.animatedCars[id]
            if (animatedCar !== undefined) {
              animatedCar.stopCarAfterEngineBroken()
            }
          }
        }
      })
      .catch((error) => {
        console.error('Failed to start car engine:', error)
      })
  }

  handleStopEngine (id: number, status: EngineStopStatus): void {
    Promise.resolve(this.dataProvider.startStopCarEngine(id, status))
      .then(() => {
        const animatedCar = this.animatedCars[id]
        if (animatedCar !== undefined) {
          animatedCar.resetCarPosition()
        }
        console.log('Car engine has been stopped successfully')
      })
      .catch((error) => {
        console.error('Failed to stop car engine:', error)
      })
  }
}
