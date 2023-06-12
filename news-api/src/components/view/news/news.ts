/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { NewsItem } from '../../../types/types';
import './news.css';
import noImagePlaceholder from './news_placeholder.png';

class News {
    public draw(data: NewsItem[]): void {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item: NewsItem, idx: number) => idx < 10) : data;
        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item: NewsItem, idx: number): void => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) (newsClone.querySelector('.news__item') as HTMLElement)?.classList.add('alt');

                const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || noImagePlaceholder})`;
                }

                const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                if (metaAuthor) {
                    metaAuthor.textContent = item.author || item.source.name;
                }

                const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                if (metaDate) {
                    metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                if (descriptionTitle) {
                    descriptionTitle.textContent = item.title;
                }

                const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                if (descriptionSource) {
                    descriptionSource.textContent = item.source.name;
                }

                const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                if (descriptionContent) {
                    descriptionContent.textContent = item.description;
                }

                const readMore = newsClone.querySelector('.news__read-more a') as HTMLAnchorElement;
                if (readMore) {
                    readMore.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });
        }

        const newsContainer = document.querySelector('.news') as HTMLElement;
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export default News;
