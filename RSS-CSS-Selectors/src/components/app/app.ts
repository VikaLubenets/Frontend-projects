import { AppViewer } from '../view/appView'

class App {
  private readonly view

  constructor () {
    this.view = new AppViewer()
  }

  public start (): void {
    this.view.switchLevel(1)
  }
}

export default App
