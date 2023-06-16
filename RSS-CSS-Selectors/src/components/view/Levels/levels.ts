import './levels.css'

export class Levels {
  draw (level: string, status: string, taskDescription: string, examples: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const levelWrapper: HTMLDivElement | null = document.querySelector('.levels-wrapper')

    if (levelWrapper != null) {
      const levelHeader = document.createElement('div')

      levelHeader.classList.add('level-header')
      levelWrapper.append(levelHeader)

      const levelNumber = document.createElement('div')

      levelNumber.classList.add('level-number')
      levelNumber.textContent = level
      levelHeader.append(levelNumber)

      const levelStatus = document.createElement('div')

      levelHeader.append(levelStatus)
      if (status === 'completed') {
        levelStatus.classList.add('level-status')
        levelStatus.classList.add('completed')
      } else {
        levelStatus.classList.add('level-status')
        levelStatus.classList.add('uncompleted')
      }

      const buttonsContainer = document.createElement('div')

      buttonsContainer.classList.add('buttons-container')
      levelHeader.append(buttonsContainer)

      const leftButton = document.createElement('div')

      leftButton.classList.add('left-button')
      buttonsContainer.append(leftButton)

      const rightButton = document.createElement('div')

      rightButton.classList.add('right-button')
      buttonsContainer.append(rightButton)

      const burgerMenu = document.createElement('div')

      burgerMenu.classList.add('burger-menu')
      levelHeader.append(burgerMenu)

      for (let i = 0; i < 3; i++) {
        const line = document.createElement('span')
        line.classList.add('burger-line')
        burgerMenu.appendChild(line)
      }

      const levelDescriptrion = document.createElement('div')

      levelWrapper.append(levelDescriptrion)
      levelDescriptrion.classList.add('level-description')
      levelDescriptrion.textContent = taskDescription

      const levelExample = document.createElement('div')

      levelWrapper.append(levelExample)
      levelExample.classList.add('level-example')
      levelExample.textContent = examples

      fragment.append(levelWrapper)
    }

    const levelContainer: HTMLElement | null = document.querySelector('.levels-container')
    if (levelContainer !== null) {
      levelContainer.append(fragment)
    }
  }
}
