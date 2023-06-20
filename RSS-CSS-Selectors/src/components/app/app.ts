import { AppViewer } from '../view/appView'
import { CSSEditorController } from './gameMechanics/CSSEditorController'

class App {
  private readonly view: AppViewer
  private controller: CSSEditorController | null

  constructor () {
    this.view = new AppViewer()
    this.controller = null
  }

  public start (): void {
    this.view.switchLevel(1)
    this.controller = new CSSEditorController(1)
    this.controller.initialize()
  }
}

export default App
