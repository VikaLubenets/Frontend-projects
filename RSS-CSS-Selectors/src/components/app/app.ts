import { AppViewer } from '../view/appView'
import { CSSEditorController } from './gameMechanics/CSSEditorController'

class App {
  private readonly view: AppViewer
  private levelNumber: number
  private controller: CSSEditorController | null

  constructor () {
    this.view = new AppViewer()
    this.controller = null
    this.levelNumber = 1
  }

  public start (): void {
    this.view.switchLevel(this.levelNumber)
    this.controller = new CSSEditorController(this.levelNumber, this.nextLevel.bind(this))
    this.controller.initialize()
  }

  private nextLevel (): void {
    this.levelNumber++
    this.view.switchLevel(this.levelNumber)
    if (this.controller !== null) {
      this.controller = new CSSEditorController(this.levelNumber, this.nextLevel.bind(this))
      this.controller.initialize()
    }
  }
}

export default App
