import './gameSpace.css';

export class GameSpace {

    draw():void {

        const fragment: DocumentFragment = document.createDocumentFragment();
        const gameContainer = document.querySelector('.game-wrapper') as HTMLDivElement;

        if(gameContainer){

            const gameHeader = document.createElement('div') as HTMLDivElement;
            if (gameHeader) {
                gameHeader.classList.add('geme-header');
                gameHeader.textContent = 'add some variable here from json';
                gameContainer.append(gameHeader);
            }

            const helpButton = document.querySelector('help-button') as HTMLDivElement;
            if (helpButton) {
                gameContainer.append(helpButton);
            }

            const gameImage = document.createElement('img') as HTMLImageElement;
            if (gameImage) {
                gameImage.classList.add('game-image');
                gameImage.setAttribute("src", "./image-placeholder.png");
            }

        }

        fragment.append(gameContainer);

    }

}