export type ObjectSource = Pick<Source, 'id' | 'name'>

export interface Source {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

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

export enum QuerySelectorsEnum {
    NewsItemTemp = '#newsItemTemp',
    NewsMetaPhoto = '.news__meta-photo',
    NewsMetaAuthor = '.news__meta-author',
    NewsMetaDate = '.news__meta-date',
    NewsDescriptionTitle = '.news__description-title',
    NewsDescriptionSource = '.news__description-source',
    NewsDescriptionContent = '.news__description-content',
    NewsReadMoreLink = '.news__read-more a',
    NewsItemAlt = '.news__item',
    NewsContainer = '.news',
}
