import './gameSpace.css'

export class GameSpace {
  draw (header: string, imgURL: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const gameContainer: HTMLDivElement | null = document.querySelector('.game-wrapper')

    if (gameContainer !== null) {
      gameContainer.innerHTML = ''

      const gameHeader = document.createElement('div')
      gameHeader.classList.add('game-header')
      gameHeader.textContent = header
      gameContainer.append(gameHeader)

      const helpButton = document.querySelector('.help-button') as HTMLDivElement
      gameContainer.append(helpButton)

      const gameImage = document.createElement('img')
      gameImage.classList.add('game-image')
      gameImage.setAttribute('src', imgURL)
      gameContainer.append(gameImage)

      fragment.append(gameContainer)
    }
  }
}
