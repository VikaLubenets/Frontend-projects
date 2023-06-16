import './CSSEditor.css'

export class CSSEditor {
  draw (editorDescriptionContent: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const editorContainer: HTMLDivElement | null = document.querySelector('.editor')

    if (editorContainer !== null) {
      editorContainer.innerHTML = ''

      const headerContainer = document.createElement('div')
      headerContainer.classList.add('section-header')
      headerContainer.textContent = 'CSS Editor field'
      editorContainer.append(headerContainer)

      const editorField = document.createElement('div')
      editorField.classList.add('editor__field')
      editorContainer.append(editorField)

      const lineNumber = document.createElement('div')
      lineNumber.classList.add('editor__line-number')
      editorContainer.append(lineNumber)
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      numbers.forEach((number, index) => {
        if (index > 0) {
          const lineBreak = document.createElement('br')
          lineNumber.append(lineBreak)
        }
        const line = document.createElement('span')
        line.textContent = number.toString()
        lineNumber.append(line)
      })

      const inputRow = document.createElement('div')
      inputRow.classList.add('editor__input-row')
      editorContainer.append(inputRow)

      const inputItem = document.createElement('input')
      inputItem.classList.add('editor__input')
      inputRow.append(inputItem)

      const submitButton = document.createElement('div')
      submitButton.classList.add('editor__button')
      submitButton.textContent = 'Enter'
      inputRow.append(submitButton)

      const editorDescription = document.createElement('div')
      editorDescription.classList.add('editor__description')
      editorDescription.textContent = `${editorDescriptionContent !== '' ? editorDescriptionContent : ''}`
      editorContainer.append(editorDescription)

      fragment.append(editorContainer)
    }
  }
}
