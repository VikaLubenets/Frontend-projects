/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import News from './news/news';
import Sources from './sources/sources';
import {
    GetNews,
    GetSource,
    AppViewInterface,
    NewsInterface,
    SourceInterface,
    NewsItem,
    Source,
} from '../../types/types';

export class AppView implements AppViewInterface {
    news: NewsInterface;

    sources: SourceInterface;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<GetNews>): void {
        const values: NewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Readonly<GetSource>): void {
        const values: Source[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
