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

export type Data = GetNews | GetSource;

export type LoaderOptions = { [prop: string]: string };

export type callbackFn = (data: unknown) => void;

export type OptionsType = {
    [prop: string]: string;
};

export interface GetRespObject {
    endpoint: string;
    options?: OptionsType;
}

export interface LoaderInterface {
    baseLink: string;
    options: LoaderOptions;
    getResponse: (object: GetRespObject, callback: callbackFn) => void;
    errorHandler(res: Response): Response;
    makeUrl(options: LoaderOptions, endpoint: string): string;
    load(method: string, endpoint: string, callback: callbackFn, options: LoaderOptions): void;
}

export interface AppControllerInterface {
    getSources(callback: callbackFn): void;
    getNews(e: Event, callback: callbackFn): void;
}
