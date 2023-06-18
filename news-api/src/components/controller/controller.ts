import AppLoader from './appLoader';
import { AppControllerInterface, CallbackFn } from '../../types/types';

class AppController extends AppLoader implements AppControllerInterface {
    public getSources<T>(callback: CallbackFn<T>): void {
        super.getResponse(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    public getNews<T>(e: Event, callback: CallbackFn<T>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        if (target instanceof HTMLElement) {
            while (target !== newsContainer) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
                    if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResponse(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode as HTMLElement;
            }
        }
    }
}

export default AppController;
