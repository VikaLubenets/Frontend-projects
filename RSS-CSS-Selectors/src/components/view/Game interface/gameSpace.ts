import './gameSpace.css'

export class GameSpace {
  draw (header: string, imgURL: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const gameWrapper: HTMLDivElement | null = document.querySelector('.game-wrapper')

    if (gameWrapper !== null) {
      const gameHeader = document.createElement('div')
      gameHeader.classList.add('game-header')
      gameHeader.textContent = header
      gameWrapper.append(gameHeader)

      const helpButton = document.querySelector('.help-button') as HTMLDivElement
      gameWrapper.append(helpButton)

      const gameImage = document.createElement('img')
      gameImage.classList.add('game-image')
      gameImage.setAttribute('src', `./assets/${imgURL}`)
      gameWrapper.append(gameImage)

      fragment.append(gameWrapper)
    }

    const gameContainer: HTMLElement | null = document.querySelector('.game-container')
    if (gameContainer !== null) {
      gameContainer.append(fragment)
    }
  }
}
