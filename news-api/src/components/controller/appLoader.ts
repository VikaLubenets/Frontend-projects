/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://news-proxy.spanb4.shop/', {
            apiKey: '2a69021b08ef4dfe9c4d772e4d3f6bd1', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
