import { AppViewer } from '../view/appView'
import { CSSEditorController } from './gameMechanics/CSSEditorController'

class App {
  private readonly view: AppViewer
  private readonly controller: CSSEditorController

  constructor () {
    this.view = new AppViewer()
    this.controller = new CSSEditorController(this.view.currentLevel)
  }

  public start (): void {
    this.view.switchLevel(1)
  }
}

export default App
