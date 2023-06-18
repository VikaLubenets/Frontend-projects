import './sources.css';
import { Source } from '../../../types/types';

class Sources {
    public draw(sources: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (sourceItemTemp) {
            sources.forEach((item): void => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
                if (itemName) {
                    itemName.textContent = item.name || '';
                }

                const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
                if (sourceItem) {
                    sourceItem.setAttribute('data-source-id', item.id);
                }

                fragment.append(sourceClone);
            });

            const sourcesContainer = document.querySelector('.sources') as HTMLElement;
            if (sourcesContainer) {
                sourcesContainer.innerHTML = '';
            }

            fragment.querySelectorAll('.source__item').forEach((item): void => {
                item.classList.add('hidden');
                sourcesContainer.appendChild(item);
            });

            this.doAlphabeticalContainer(sources);
        }
    }

    private doAlphabeticalContainer(sources: Source[]): void {
        const lettersContainer = document.createElement('div');
        lettersContainer.classList.add('alphabet');

        const letters = new Set<string>();
        sources.forEach((source) => {
            const firstLetter = source.name.charAt(0).toUpperCase();
            letters.add(firstLetter);
        });

        Array.from(letters).forEach((letter) => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => this.filterSources(letter));
            lettersContainer.appendChild(button);
        });

        const sourcesContainer = document.querySelector('.alphabet-container') as HTMLElement;
        if (sourcesContainer) {
            sourcesContainer.insertBefore(lettersContainer, sourcesContainer.firstChild);
        }
    }

    private filterSources(letter: string): void {
        const sourceItems = document.querySelectorAll('.source__item') as NodeListOf<HTMLElement>;

        if (sourceItems) {
            sourceItems.forEach((item) => {
                const itemName = item.querySelector('.source__item-name')?.textContent || '';
                const firstLetter = itemName.charAt(0).toUpperCase();

                if (firstLetter === letter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        }
    }
}

export default Sources;
