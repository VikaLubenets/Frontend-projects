import type EventEmitter from 'events';
import type { GarageResponse, WinnersResponse } from '../../types/types';
import GarageView from './garagePage/garageView';
import WinnersView from './pageWinners/winnersView';

export default class AppViewer {
  garageView: GarageView;

  winnersView: WinnersView;

  garageElement: HTMLElement | null;

  winnersElement: HTMLElement | null;

  dataGarage: GarageResponse;

  dataWinners: WinnersResponse;

  emitter: EventEmitter;

  garageContainer: HTMLElement | null;

  constructor(dataGarage: GarageResponse, emitter: EventEmitter, dataWinners: WinnersResponse) {
    this.dataGarage = dataGarage;
    this.dataWinners = dataWinners;
    this.emitter = emitter;
    this.garageView = new GarageView(this.dataGarage, this.emitter);
    this.winnersView = new WinnersView(this.dataWinners, this.dataGarage, this.emitter);
    this.garageElement = this.garageView.getHTMLElement();
    this.winnersElement = this.winnersView.getHTMLElement();
    this.garageContainer = null;
  }

  createView(): void {
    const body: HTMLBodyElement | null = document.querySelector('body');
    const fragment: DocumentFragment = document.createDocumentFragment();

    if (body !== null) {
      const garageButton = document.createElement('button');
      garageButton.textContent = 'Garage';
      garageButton.classList.add('garage-button');
      garageButton.addEventListener('click', () => {
        this.openGarageView();
      });
      fragment.appendChild(garageButton);

      const winnersButton = document.createElement('button');
      winnersButton.textContent = 'Winners';
      winnersButton.classList.add('winners-button');
      winnersButton.addEventListener('click', () => {
        this.openWinnersView();
      });
      fragment.appendChild(winnersButton);

      if (this.garageContainer === null) {
        this.garageContainer = document.createElement('div');
        this.garageContainer.classList.add('garage-container');
        fragment.append(this.garageContainer);
      } else {
        this.garageContainer.innerHTML = '';
      }

      if (this.garageElement !== null) {
        this.garageContainer.append(this.garageElement);
      }

      if (this.winnersElement !== null) {
        fragment.append(this.winnersElement);
        this.winnersElement.style.visibility = 'hidden';
      }

      body.append(fragment);
      this.garageView.drawGarageContainer();
      this.winnersView.drawWinnersContainer();
    }
  }

  updateGarageView(carsData: GarageResponse, pageGarage: number): void {
    this.dataGarage = carsData;
    this.garageView.updateGarageData(this.dataGarage);

    if (this.garageElement !== null) {
      const garageContainer = document.querySelector('.garage-container');

      if (garageContainer !== null) {
        while (garageContainer.firstChild !== null) {
          garageContainer.removeChild(garageContainer.firstChild);
        }
      }
    }

    this.garageView.drawGarageContainer(pageGarage);
  }

  updateWinnersView(winnersData: WinnersResponse, pageWinners: number): void {
    this.dataWinners = winnersData;
    this.winnersView.updateWinnersData(this.dataGarage, this.dataWinners);
    this.winnersView.updateWinnersView(pageWinners);
  }

  private openGarageView(): void {
    const garageContainer: HTMLElement | null = document.querySelector('.garage-container');
    const winnersContainer: HTMLElement | null = document.querySelector('.winners-container');

    if (garageContainer !== null && winnersContainer !== null) {
      garageContainer.style.visibility = 'visible';
      winnersContainer.style.visibility = 'hidden';
    }
  }

  private openWinnersView(): void {
    const garageContainer: HTMLElement | null = document.querySelector('.garage-container');
    const winnersContainer: HTMLElement | null = document.querySelector('.winners-container');

    if (garageContainer !== null && winnersContainer !== null) {
      garageContainer.style.visibility = 'hidden';
      winnersContainer.style.visibility = 'visible';
    }
  }
}
