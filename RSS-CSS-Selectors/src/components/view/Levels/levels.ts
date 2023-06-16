import './levels.css'

export class Levels {
  level: string
  status: string
  description: string
  examples: string

  constructor (levelNumber: string, status: string, taskDescription: string, examples: string) {
    this.level = levelNumber
    this.status = status
    this.description = taskDescription
    this.examples = examples
  }

  draw (): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const levelContainer: HTMLDivElement | null = document.querySelector('.levels-wrapper')

    if (levelContainer != null) {
      levelContainer.innerHTML = ''
      const levelHeader = document.createElement('div')

      levelHeader.classList.add('level-header')
      levelContainer.append(levelHeader)

      const levelNumber = document.createElement('div')

      levelNumber.classList.add('level-number')
      levelNumber.textContent = this.level
      levelHeader.append(levelNumber)

      const levelStatus = document.createElement('div')

      levelHeader.append(levelStatus)
      if (this.status === 'completed') {
        levelStatus.classList.add('level-status completed')
      } else {
        levelStatus.classList.add('level-status uncompleted')
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

      levelContainer.append(levelDescriptrion)
      levelDescriptrion.classList.add('level-description')
      levelDescriptrion.textContent = this.description

      const levelExample = document.createElement('div')

      levelContainer.append(levelExample)
      levelExample.classList.add('level-example')
      levelExample.textContent = this.examples

      fragment.append(levelContainer)
    }
  }
}
