import './helpButton.css'

export class HelpButton {
    name: string;
    advice: string;
  
    constructor(nameHelpButton: string, adviceHelpButton: string) {
      this.name = nameHelpButton;
      this.advice = adviceHelpButton;
    }
  
    public draw(data: string[]) {
      const button = document.createElement('div') as HTMLDivElement;
      if (button) {
        button.classList.add('help-button'); 
        button.textContent = this.name;
        button.addEventListener('click', (e) => this.openAdvice(e));
      }
  
      const description = document.createElement('div') as HTMLDivElement;
      if (description) {
        description.classList.add('help-text hidden');
        description.textContent = this.advice;
        button.append(description); 
      }
    }
  
    private openAdvice(e: Event) {
      const button: HTMLDivElement | null = document.querySelector('.help-button');
      const description: HTMLDivElement | null = document.querySelector('.help-text.hidden');
  
      if (button && description) {
        if (e.target === button) {
          description.classList.remove('hidden');
        } else {
          description.classList.add('hidden');
        }
      }
    }
  }