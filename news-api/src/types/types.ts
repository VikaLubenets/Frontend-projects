/* eslint-disable no-unused-vars */
export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

type ObjectSource = Pick<Source, 'id' | 'name'>;

export interface NewsItem {
    status: string;
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ObjectSource;
    title: string;
    url: string;
    urlToImage: string;
}

export interface GetNews {
    status: string;
    totalResults: number;
    articles: NewsItem[];
}

export interface GetSource {
    status: 'string';
    sources: Source[];
}

export interface NewsInterface {
    draw(data: NewsItem[]): void;
}

export interface SourceInterface {
    draw(data: Source[]): void;
}

export interface AppViewInterface {
    news: NewsInterface;
    sources: SourceInterface;
    drawNews(data: GetNews): void;
    drawSources(data: GetSource): void;
}
