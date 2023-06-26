import './levels.css'
import data from '../../data/dataProvider'

export class Levels {
  draw (level: string, status: string, taskDescription: string, examples: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const levelWrapper: HTMLDivElement | null = document.querySelector('.levels-wrapper')

    if (levelWrapper != null) {
      const levelHeader = document.createElement('div')
      levelHeader.classList.add('level-header')
      levelWrapper.append(levelHeader)

      const cover = document.createElement('div')
      levelWrapper.append(cover)
      cover.classList.add('cover')

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

      const levelBlock = document.createElement('div')
      levelBlock.classList.add('level-block')
      levelBlock.textContent = 'Choose level'
      levelHeader.append(levelBlock)
      for (let i = 0; i < data.length; i++) {
        const numberLevel = document.createElement('div')
        numberLevel.classList.add('level-block__number')
        numberLevel.textContent = [i + 1].toString()
        levelBlock.appendChild(numberLevel)
      }

      fragment.append(levelWrapper)
    }

    const levelContainer: HTMLElement | null = document.querySelector('.levels-container')
    if (levelContainer !== null) {
      levelContainer.append(fragment)
    }
  }

  addEventsListeners (): void {
    const burgerMenu: HTMLDivElement | null = document.querySelector('.burger-menu')
    const body: HTMLBodyElement | null = document.querySelector('body')
    const cover: HTMLDivElement | null = document.querySelector('.cover')
    const header: HTMLDivElement | null = document.querySelector('.level-header')

    if (header !== null &&
        burgerMenu !== null &&
        cover !== null &&
        body !== null) {
      burgerMenu.addEventListener('click', (e) => {
        header.classList.toggle('open')
        console.log('event is added')
        if (header.classList.contains('open')) {
          body.style.overflow = 'hidden'
        } else {
          body.style.overflow = 'initial'
        }
      })

      const closeBurger = (e: Event): void => {
        if (e.target === cover) {
          header.classList.toggle('open')
          if (header.classList.contains('open')) {
            body.style.overflow = 'hidden'
          } else {
            body.style.overflow = 'initial'
          }
        }
      }
      cover.addEventListener('click', closeBurger)
    }
  }

  levelNumberAddEventListeners (method: (level: number) => void): void {
    const levelNumbers = document.querySelectorAll('.level-block__number')
    levelNumbers.forEach((levelNumber) => {
      levelNumber.addEventListener('click', () => {
        const clickedLevel = parseInt(levelNumber.textContent as string)
        if (!isNaN(clickedLevel)) {
          method(clickedLevel)
        }
      })
    })
  }
}
