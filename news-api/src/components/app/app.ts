import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { AppInterface, AppControllerInterface, AppViewInterface, GetNews, GetSource } from '../../types/types';

class App implements AppInterface {
    controller: AppControllerInterface;

    view: AppViewInterface;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (document.querySelector('.sources') as HTMLElement).addEventListener('click', (e: Event) => {
            this.controller.getNews(e, (data: GetNews) => this.view.drawNews(data));
        });

        this.controller.getSources((data: GetSource) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
