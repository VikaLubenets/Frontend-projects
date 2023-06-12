/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
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

    public drawNews(data: GetNews): void {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: GetSource): void {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
