import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: '98627e49b8bf465fa64623b6b7c4733d', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
