import News from './news/news';
import Sources from './sources/sources';
import { GetNews, GetSource, AppViewInterface, NewsInterface, SourceInterface } from '../../types/types';

export class AppView implements AppViewInterface {
    news: NewsInterface;

    sources: SourceInterface;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<GetNews>): void {
        const { articles = [] } = data;
        this.news.draw(articles);
    }

    public drawSources(data: Readonly<GetSource>): void {
        const { sources = [] } = data;
        this.sources.draw(sources);
    }
}

export default AppView;
