/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { AppInterface, AppControllerInterface, AppViewInterface, GetNews, GetSource } from '../../types/types';

class App implements AppInterface {
    private controller: AppControllerInterface;

    private view: AppViewInterface;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sources = document.querySelector('.sources') as HTMLElement;
        if (sources) {
            sources.addEventListener('click', (e: Event) => {
                this.controller.getNews(e, (data: GetNews) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: GetSource) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
