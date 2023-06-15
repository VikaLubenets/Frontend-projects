import './editor.css';

export class Editor {

    draw():void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const editorContainer = document.querySelector('.editor') as HTMLElement;

        if(editorContainer){
            const headerContainer = document.createElement('div') as HTMLDivElement;
            if(headerContainer){
                headerContainer.classList.add('.section-header');
                headerContainer.textContent = "add text here";
                editorContainer.append(headerContainer);
            }

            const editorField = document.createElement('div') as HTMLDivElement;
            if(editorField){
                editorField.classList.add('.editor__field');
                editorContainer.append(editorField);
            }

            const lineNumber = document.createElement('div') as HTMLDivElement;
            if(lineNumber){
                lineNumber.classList.add('.editor__line-number');
                editorContainer.append(lineNumber);
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

            const inputRow = document.createElement('div') as HTMLDivElement;
            if (inputRow) {
                inputRow.classList.add('.editor__input-row');
                editorContainer.append(inputRow);
            }

            const inputItem = document.createElement('input') as HTMLInputElement;
            if (inputItem) {
                inputItem.classList.add('.editor__input');
                inputRow.append(inputItem);
            }

            const submitButton = document.createElement('div') as HTMLDivElement;
            if (submitButton) {
                submitButton.classList.add('.editor__button');
                submitButton.textContent = 'Enter';
                inputRow.append(submitButton);
            }

            const editorDescription = document.createElement('div') as HTMLDivElement;
            if (editorDescription) {
                editorDescription.classList.add('.editor__description');
                editorDescription.textContent = 'add some text here';
                editorContainer.append(editorDescription);
            }

        }
    }

}
