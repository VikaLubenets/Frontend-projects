import './htmlViewer.css'

export class HTMLViewer {
  draw (htmlFieldContent: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const htmlContainer: HTMLDivElement | null = document.querySelector('.html-viewer')

    if (htmlContainer != null) {
      htmlContainer.innerHTML = ''

      const headerContainer = document.createElement('div')

      headerContainer.classList.add('section-header')
      headerContainer.textContent = 'HTML Viewer'
      htmlContainer.append(headerContainer)

      const lineNumber = document.createElement('div')

      lineNumber.classList.add('html-viewer__line-number')
      htmlContainer.append(lineNumber)
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      numbers.forEach((number: number, index: number) => {
        if (index > 0) {
          const lineBreak = document.createElement('br')
          lineNumber.append(lineBreak)
        }
        const line = document.createElement('span')
        line.textContent = number.toString()
        lineNumber.append(line)
      })

      const htmlField = document.createElement('div')

      htmlField.classList.add('html-viewer__field')
      htmlField.textContent = htmlFieldContent
      htmlContainer.append(htmlField)

      fragment.append(htmlContainer)
    }
  }
}
