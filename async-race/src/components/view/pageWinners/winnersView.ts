import type EventEmitter from 'events';
import type { WinnersResponse, ElementParams, Winners, GarageResponse, Garage } from 'types';
import ViewTemplate from 'components/view/util/view-template';
import TableWinner from './tableWinners/tableWinners';
import './winnersView.css';

export default class WinnersView extends ViewTemplate {
  data: WinnersResponse;

  emitter: EventEmitter;

  winners: Winners;

  cars: Garage;

  table: TableWinner;

  constructor(dataWinners: WinnersResponse, garageData: GarageResponse, emitter: EventEmitter) {
    const params: ElementParams = {
      tag: 'div',
      classes: ['winners-container'],
      textContent: 'text',
      parentSelector: 'body',
    };
    super(params);
    this.emitter = emitter;
    this.data = dataWinners;
    this.winners = this.data.winnersData;
    this.cars = garageData.garage.garage;
    this.table = new TableWinner(this.cars, this.winners, this.emitter);
  }

  drawWinnersContainer(page = 1): void {
    const winnersContainer = document.querySelector('.winners-container') as HTMLDivElement;

    this.drawWinnersHeader(winnersContainer);
    this.drawPageNumber(winnersContainer, page);
    this.drawTable(winnersContainer);
    this.drawPageButtons(winnersContainer, page);
  }

  updateWinnersView(page = 1): void {
    const winnersContainer = document.querySelector('.winners-container') as HTMLDivElement;

    const winnersHeader = winnersContainer.querySelector('.winners-header') as HTMLHeadElement;
    const pageNum = winnersContainer.querySelector('.page-number') as HTMLDivElement;

    winnersHeader.textContent = `Winners: ${this.data.totalCount}`;
    pageNum.textContent = `Page: ${page}`;
    this.table.updateTable();
  }

  updateWinnersData(dataGarage: GarageResponse, dataWinners: WinnersResponse): void {
    this.data = dataWinners;
    this.winners = this.data.winnersData;
    this.cars = dataGarage.garage.garage;
    this.table.updateDataTable(this.cars, this.winners);
  }

  private drawWinnersHeader(container: HTMLDivElement): void {
    const winnersHeader = document.createElement('header');
    winnersHeader.classList.add('winners-header');
    winnersHeader.textContent = `Winners: ${this.data.totalCount}`;
    container.append(winnersHeader);
  }

  private drawPageNumber(container: HTMLDivElement, page: number): void {
    const pageNum = document.createElement('h2');
    pageNum.classList.add('page-number');
    pageNum.textContent = `Page: ${page}`;
    container.append(pageNum);
  }

  private drawTable(container: HTMLDivElement): void {
    const winnersTableContainer = document.createElement('div');
    winnersTableContainer.classList.add('table-container');
    container.append(winnersTableContainer);

    const tableHTML = this.table.getElement() as HTMLElement;
    winnersTableContainer.append(tableHTML);
  }

  private drawPageButtons(container: HTMLDivElement, page: number): void {
    const pageButtonsContainer = document.createElement('div');
    pageButtonsContainer.classList.add('pageButtons-container');
    container.append(pageButtonsContainer);

    const prevBtn = document.createElement('div');
    prevBtn.classList.add('prev-button');
    prevBtn.textContent = 'prev';
    prevBtn.addEventListener('click', () => this.emitter.emit('prevButtonWinnersClicked', page));
    pageButtonsContainer.append(prevBtn);

    const nextBtn = document.createElement('div');
    nextBtn.classList.add('next-button');
    nextBtn.textContent = 'next';
    nextBtn.addEventListener('click', () => this.emitter.emit('nextButtonWinnersClicked', page));
    pageButtonsContainer.append(nextBtn);
  }
}
