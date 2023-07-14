import AppViewer from '../view/appView'


export default class App {
    view: AppViewer

    constructor(){
        this.view = new AppViewer()
    }

    start(): void {
       this.view.createView()
    }

}