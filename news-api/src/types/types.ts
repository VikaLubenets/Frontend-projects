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
