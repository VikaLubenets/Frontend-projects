import './gameSpace.css'
import type { IGameSpace } from '../../../types/types'

export class GameSpace implements IGameSpace {
  draw (htmlFieldContent: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const gameWrapper: HTMLDivElement | null = document.querySelector('.game-wrapper')

    if (gameWrapper !== null) {
      const gameImage = document.createElement('div')
      gameImage.classList.add('game-image')
      gameImage.innerHTML = `${htmlFieldContent}`
      gameWrapper.append(gameImage)

      fragment.append(gameWrapper)
    }

    const gameContainer: HTMLElement | null = document.querySelector('.game-container')
    if (gameContainer !== null) {
      gameContainer.append(fragment)
    }
  }
}
