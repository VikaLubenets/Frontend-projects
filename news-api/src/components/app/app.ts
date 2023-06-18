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
            sources.addEventListener('click', (e) => {
                this.controller.getNews<GetNews>(e, (data) => this.view.drawNews(data));
            });
        }

        this.controller.getSources<GetSource>((data) => {
            this.view.drawSources(data);
        });
    }
}

export default App;
