import './htmlViewer.css'

export class HTMLViewer {
  draw (htmlFieldContent: string): void {
    const fragment: DocumentFragment = document.createDocumentFragment()
    const htmlWrapper: HTMLDivElement | null = document.querySelector('.html-viewer')

    if (htmlWrapper != null) {
      const headerContainer = document.createElement('div')

      headerContainer.classList.add('section-header')
      headerContainer.textContent = 'HTML Viewer'
      htmlWrapper.append(headerContainer)

      const lineNumber = document.createElement('div')

      lineNumber.classList.add('html-viewer__line-number')
      htmlWrapper.append(lineNumber)
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      numbers.forEach((number: number, index: number) => {
        const line = document.createElement('span')
        line.textContent = number.toString()
        lineNumber.append(line)
      })

      const htmlField = document.createElement('pre')
      htmlField.classList.add('html-viewer__field')
      const textNode = document.createTextNode(htmlFieldContent)
      htmlField.appendChild(textNode)
      htmlWrapper.append(htmlField)

      fragment.append(htmlWrapper)
    }

    const htmlCSSContainer: HTMLElement | null = document.querySelector('.css-html-container')
    if (htmlCSSContainer !== null) {
      htmlCSSContainer.append(fragment)
    }
  }
}
