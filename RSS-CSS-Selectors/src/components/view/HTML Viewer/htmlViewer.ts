import './htmlViewer.css';

export class HTMLViewer {
    draw(): void{

        const fragment: DocumentFragment = document.createDocumentFragment();
        const htmlContainer = document.querySelector('.html-viewer') as HTMLElement;

        if (htmlContainer) {
            htmlContainer.innerHTML = '';

            const headerContainer = document.createElement('div') as HTMLDivElement;
            if(headerContainer){
                headerContainer.classList.add('.section-header');
                headerContainer.textContent = "add text here";
                htmlContainer.append(headerContainer);
            }

            const lineNumber = document.createElement('div') as HTMLDivElement;
            if(lineNumber){
                lineNumber.classList.add('.html-viewer__line-number');
                htmlContainer.append(lineNumber);
                let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
                numbers.forEach((number: number, index: number) => {
                    if (index > 0) {
                        const lineBreak = document.createElement('br');
                        lineNumber.append(lineBreak);
                      }
                      const line = document.createElement('span');
                      line.textContent = number.toString();
                      lineNumber.append(line);
                })
            }

            const htmlField = document.createElement('div') as HTMLDivElement;
            if(htmlField){
                htmlField.classList.add('.html-viewer__field');
                htmlField.textContent = 'add some text here';
                htmlContainer.append(htmlField);
            }

        }

        fragment.append(htmlContainer);
    }
}