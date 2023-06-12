import './sources.css';
import { Source } from '../../../types/types';

class Sources {
    draw(sources: Source[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        sources.forEach((item: Source): void => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesContainer = document.querySelector('.sources') as HTMLElement;
        sourcesContainer.innerHTML = '';
        fragment.querySelectorAll('.source__item').forEach((item: Element): void => {
            item.classList.add('hidden');
            sourcesContainer.appendChild(item);
        });

        this.setupAlphabetFilter(sources);
    }

    private setupAlphabetFilter(sources: Source[]): void {
        const alphabetContainer = document.createElement('div');
        alphabetContainer.classList.add('alphabet');

        const alphabetLetters = new Set<string>();
        sources.forEach((source: Source) => {
            const firstLetter = source.name.charAt(0).toUpperCase();
            alphabetLetters.add(firstLetter);
        });

        Array.from(alphabetLetters).forEach((letter: string) => {
            const button = document.createElement('button');
            button.textContent = letter;
            button.addEventListener('click', () => this.filterSourcesByLetter(letter));
            alphabetContainer.appendChild(button);
        });

        const sourcesContainer = document.querySelector('.alphabet-container') as HTMLElement;
        sourcesContainer.insertBefore(alphabetContainer, sourcesContainer.firstChild);
    }

    private filterSourcesByLetter(letter: string): void {
        const sourceItems = document.querySelectorAll('.source__item') as NodeListOf<HTMLElement>;
        sourceItems.forEach((item: HTMLElement) => {
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

export default Sources;
