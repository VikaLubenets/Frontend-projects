import type { DataItem } from '../../types/types'
import DataProvider from '../data/dataProvider'
import { AppViewer } from '../view/appView'
import { Controller } from './controller/controller'

class App {
  private readonly view: AppViewer
  private levelNumber: number
  private controller: Controller
  private readonly data: DataItem[]

  constructor () {
    this.data = DataProvider.getInstance().get()
    this.view = new AppViewer(this.data)
    this.levelNumber = 1
    this.controller = new Controller(this.levelNumber, this.nextLevel.bind(this), this.data)
  }

  public start (): void {
    this.view.switchLevel(this.levelNumber, this.nextLevelAfterClick.bind(this))
    this.controller.initialize()
  }

  private nextLevel (): void {
    this.levelNumber++
    this.view.switchLevel(this.levelNumber, this.nextLevelAfterClick.bind(this))
  }

  private readonly nextLevelAfterClick = (levelNumber: number): void => {
    this.levelNumber = levelNumber
    this.view.switchLevel(this.levelNumber, this.nextLevelAfterClick.bind(this))
    if (this.controller !== null) {
      this.controller = new Controller(
        this.levelNumber,
        this.nextLevel.bind(this),
        this.data
      )
      this.controller.initialize()
    }
  }
}

export default App
