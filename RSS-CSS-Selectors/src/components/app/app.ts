import type { DataItem, IApp } from '../../types/types'
import DataProvider from '../data/dataProvider'
import { AppViewer } from '../view/appView'
import { Controller } from '../controller/controller'
import { EventEmitter } from 'events'
import { ModalConstructor } from '../view/Game interface/modal constructor/modal'

class App implements IApp {
  private readonly view: AppViewer
  private levelNumber: number
  private readonly controller: Controller
  private data: DataItem[]
  private readonly emitter: EventEmitter
  private readonly dataProvider: DataProvider

  constructor () {
    this.dataProvider = DataProvider.getInstance()
    this.data = DataProvider.getInstance().get()
    this.emitter = new EventEmitter()
    this.view = new AppViewer(this.data, this.emitter)
    this.levelNumber = 1
    this.controller = new Controller(this.levelNumber, this.data, this.emitter)
  }

  public start (): void {
    this.view.drawLevel(this.levelNumber, this.data, this.emitter)
    this.controller.initialize(this.levelNumber, this.data, this.emitter)
    this.emitter.on('levelCompleted', this.nextLevelAfterWin.bind(this))
    this.emitter.on('GameCompleted', this.showWinModal.bind(this))
    this.emitter.on('levelClicked', (clickedLevel) => {
      this.levelAfterClick(clickedLevel)
    })
    this.emitter.on('resetClicked', this.makeReset.bind(this))
    this.emitter.on('helpClicked', this.updateHelpClickStatus.bind(this))
  }

  private readonly nextLevelAfterWin = (): void => {
    this.dataProvider.set(this.levelNumber, 'status', 'completed')
    this.data = DataProvider.getInstance().get()
    if (this.levelNumber < this.data.length) {
      this.levelNumber++
      this.view.drawLevel(this.levelNumber, this.data, this.emitter)
      this.controller.initialize(this.levelNumber, this.data, this.emitter)
    }
  }

  private readonly levelAfterClick = (levelNumber: number): void => {
    this.levelNumber = levelNumber
    this.view.drawLevel(this.levelNumber, this.data, this.emitter)
    this.controller.initialize(this.levelNumber, this.data, this.emitter)
  }

  private makeReset (): void {
    this.dataProvider.reset()
    this.restartGame()
  }

  private restartGame (): void {
    const newApp = new App()
    newApp.start()
  }

  private showWinModal (): void {
    const modal = new ModalConstructor()
    modal.draw('Congratulations! You have completed all levels.')
  }

  private updateHelpClickStatus (): void {
    console.log('emiiter works')
    this.dataProvider.set(this.levelNumber, 'helpClicked', 'true')
  }
}

export default App
