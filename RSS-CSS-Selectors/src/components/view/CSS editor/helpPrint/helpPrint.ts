import './helpPrint.css'

export default class HelpPrint {
  draw (): void {
    const helpPrintContainer = document.createElement('div')
    helpPrintContainer.classList.add('help-print-container')

    const helpText = document.createElement('span')
    helpText.classList.add('help-print-text')
    helpPrintContainer.appendChild(helpText)

    const inputRow = document.querySelector('.editor__input-row')
    if (inputRow !== null) {
      inputRow.insertBefore(helpPrintContainer, inputRow.firstChild)
    }
  }

  animateText (content: string): void {
    const helpText = document.querySelector('.help-print-text')
    const helpPrintContainer = document.querySelector('.help-print-container')
    if (helpPrintContainer !== null && helpText !== null) {
      helpPrintContainer.classList.add('clicked')
      const text = content
      helpText.textContent = text[0]
      let index = 1
      const typing = setInterval(() => {
        if (index < text.length) {
          if (helpText.textContent !== null) {
            helpText.textContent = helpText.textContent.concat(text[index])
            index++
          }
        } else {
          clearInterval(typing)
          helpPrintContainer.classList.remove('clicked')
        }
      }, 200)
    }
  }
}
