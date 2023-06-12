/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import './sources.css';
import { Source } from '../../../types/types';

class Sources {
    public draw(sources: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        if (sourceItemTemp) {
            sources.forEach((item: Source): void => {
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

            fragment.querySelectorAll('.source__item').forEach((item: Element): void => {
                item.classList.add('hidden');
                sourcesContainer.appendChild(item);
            });

            this.setupAlphabetFilter(sources);
        }
    }

    private setupAlphabetFilter(sources: Source[]): void {
        const alphabetContainer = document.createElement('div') as HTMLDivElement;
        alphabetContainer.classList.add('alphabet');

        const alphabetLetters = new Set<string>();
        sources.forEach((source: Source) => {
            const firstLetter = source.name.charAt(0).toUpperCase();
            alphabetLetters.add(firstLetter);
        });

        Array.from(alphabetLetters).forEach((letter: string) => {
            const button = document.createElement('button') as HTMLButtonElement;
            button.textContent = letter;
            button.addEventListener('click', () => this.filterSourcesByLetter(letter));
            alphabetContainer.appendChild(button);
        });

        const sourcesContainer = document.querySelector('.alphabet-container') as HTMLElement;
        if (sourcesContainer) {
            sourcesContainer.insertBefore(alphabetContainer, sourcesContainer.firstChild);
        }
    }

    private filterSourcesByLetter(letter: string): void {
        const sourceItems = document.querySelectorAll('.source__item') as NodeListOf<HTMLElement>;
        sourceItems.forEach((item: HTMLElement) => {
            const itemName: string = item.querySelector('.source__item-name')?.textContent || '';
            const firstLetter: string = itemName.charAt(0).toUpperCase();

            if (firstLetter === letter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
}

export default Sources;
