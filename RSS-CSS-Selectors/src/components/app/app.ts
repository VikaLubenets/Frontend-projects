import type { DataItem } from '../../types/types'
import DataProvider from '../data/dataProvider'
import { AppViewer } from '../view/appView'
import { Controller } from './controller/controller'
import { EventEmitter } from 'events'
import { ModalConstructor } from '../view/Game interface/modal constructor/modal'

class App {
  private readonly view: AppViewer
  private levelNumber: number
  private readonly controller: Controller
  private data: DataItem[]
  private readonly emitter: EventEmitter
  private readonly dataProvider: DataProvider

  constructor () {
    this.emitter = new EventEmitter()
    this.data = DataProvider.getInstance().get()
    this.dataProvider = DataProvider.getInstance()
    this.view = new AppViewer(this.data, this.emitter)
    this.levelNumber = 1
    this.controller = new Controller(this.levelNumber, this.data, this.emitter)
  }

  public start (): void {
    this.view.drawLevel(this.levelNumber)
    this.controller.initialize()
    this.emitter.on('levelCompleted', this.nextLevelAfterWin.bind(this))
    this.emitter.on('GameCompleted', this.showWinModal.bind(this))
    this.emitter.on('levelClicked', (clickedLevel) => {
      this.levelAfterClick(clickedLevel)
    })
  }

  private readonly nextLevelAfterWin = (): void => {
    this.dataProvider.set(this.levelNumber, 'status', 'completed')
    this.data = DataProvider.getInstance().get()
    if (this.levelNumber <= this.data.length) {
      this.levelNumber++
      this.view.drawLevel(this.levelNumber)
    }
  }

  private readonly levelAfterClick = (levelNumber: number): void => {
    this.data = DataProvider.getInstance().get()
    this.levelNumber = levelNumber
    this.view.drawLevel(this.levelNumber)
  }

  private showWinModal (): void {
    const modal = new ModalConstructor()
    modal.draw('Congratulations! You have completed all levels.')
  }
}

export default App
