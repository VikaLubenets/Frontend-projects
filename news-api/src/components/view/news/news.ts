import { NewsItem, QuerySelectorsEnum } from '../../../types/index';

import './news.css';

class News {
    draw(data: NewsItem[]) {
        const news: NewsItem[] = data.length >= 10 ? data.filter((_item: NewsItem, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector(QuerySelectorsEnum.NewsItemTemp) as HTMLTemplateElement;

        if (newsItemTemp) {
            news.forEach((item: NewsItem, idx: number): void => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) newsClone.querySelector(QuerySelectorsEnum.NewsItemAlt)?.classList.add('alt');

                const metaPhoto = newsClone.querySelector(QuerySelectorsEnum.NewsMetaPhoto) as HTMLTemplateElement;
                if (metaPhoto) {
                    metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                }

                const NewsMetaAuthor = newsClone.querySelector(
                    QuerySelectorsEnum.NewsMetaAuthor
                ) as HTMLTemplateElement;
                if (NewsMetaAuthor) {
                    NewsMetaAuthor.textContent = item.author || item.source.name;
                }

                const NewsMetaDate = newsClone.querySelector(QuerySelectorsEnum.NewsMetaDate) as HTMLTemplateElement;
                if (NewsMetaDate) {
                    NewsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
                }

                const NewsDescriptionTitle = newsClone.querySelector(
                    QuerySelectorsEnum.NewsDescriptionTitle
                ) as HTMLTemplateElement;
                if (NewsDescriptionTitle) {
                    NewsDescriptionTitle.textContent = item.title;
                }

                const NewsDescriptionSource = newsClone.querySelector(
                    QuerySelectorsEnum.NewsDescriptionSource
                ) as HTMLTemplateElement;
                if (NewsDescriptionSource) {
                    NewsDescriptionSource.textContent = item.source.name;
                }

                const NewsDescriptionContent = newsClone.querySelector(
                    QuerySelectorsEnum.NewsDescriptionContent
                ) as HTMLTemplateElement;
                if (NewsDescriptionContent) {
                    NewsDescriptionContent.textContent = item.description;
                }

                const NewsReadMoreLink = newsClone.querySelector(
                    QuerySelectorsEnum.NewsReadMoreLink
                ) as HTMLAnchorElement;
                if (NewsReadMoreLink) {
                    NewsReadMoreLink.setAttribute('href', item.url);
                }

                fragment.append(newsClone);
            });

            const NewsContainer = document.querySelector(QuerySelectorsEnum.NewsContainer) as HTMLTemplateElement;
            if (NewsContainer) {
                NewsContainer.innerHTML = '';
                NewsContainer.appendChild(fragment);
            }
        }
    }
}

export default News;
