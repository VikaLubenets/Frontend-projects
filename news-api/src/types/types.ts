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

export type LoaderOptions = { [prop: string]: string };

export type callbackFn<T> = (data: T) => void;

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
    getResponse: <T>(object: GetRespObject, callback: callbackFn<T>) => void;
    errorHandler(res: Response): Response;
    makeUrl(options: LoaderOptions, endpoint: string): string;
    load<T>(method: string, endpoint: string, callback: callbackFn<T>, options: LoaderOptions): void;
}

export interface AppControllerInterface {
    getSources<T>(callback?: callbackFn<T>): void;
    getNews<T>(e: Event, callback?: callbackFn<T>): void;
}

export interface AppInterface {
    controller: AppControllerInterface;
    view: AppViewInterface;
    start(): void;
}
