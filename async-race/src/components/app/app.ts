import EventEmitter from 'events';
import DataProvider from 'components/data/data-provider';
import AppViewer from 'components/view/appView';
import Controller from 'components/controller/controller';
import type { GarageResponse, OrderWinnersOption, SortWinnersOption, WinnersResponse } from 'types';

export default class App {
  view: AppViewer | null;

  dataProvider: DataProvider;

  carsData: GarageResponse | null;

  emitter: EventEmitter;

  controller: Controller | null;

  currentPageGarage: number;

  currentPageWinners: number;

  winnersData: WinnersResponse | null;

  maxCarsOnPage: number;

  maxWinnersOnPage: number;

  constructor() {
    this.dataProvider = new DataProvider();
    this.emitter = new EventEmitter();
    this.maxCarsOnPage = 7;
    this.maxWinnersOnPage = 10;
    this.currentPageGarage = 1;
    this.currentPageWinners = 1;
    this.carsData = null;
    this.winnersData = null;
    this.view = null;
    this.controller = null;
    this.emitter.on('dataCarsUpdated', this.updateApp.bind(this));
    this.emitter.on('dataWinnerUpdated', this.updateAppWinners.bind(this));
    this.emitter.on('prevButtonGarageClicked', this.prevPageGarage.bind(this));
    this.emitter.on('nextButtonGarageClicked', this.nextPageGarage.bind(this));
    this.emitter.on('prevButtonWinnersClicked', this.prevPageWinners.bind(this));
    this.emitter.on('nextButtonWinnersClicked', this.nextPageWinners.bind(this));
    this.emitter.on('handleSortTableClicked', (sort: SortWinnersOption, order: OrderWinnersOption) => {
      this.handleSortWinnersTable(sort, order);
    });
  }

  async start(): Promise<void> {
    try {
      this.carsData = await this.dataProvider.getCars(this.currentPageGarage, this.maxCarsOnPage);
      this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage);
      this.view = new AppViewer(this.carsData, this.emitter, this.winnersData);
      this.view.createView();
      this.controller = new Controller(this.dataProvider, this.emitter);
    } catch (error) {
      console.log('An error occurred during starting the app:', error);
    }
  }

  private async updateApp(): Promise<void> {
    this.carsData = await this.dataProvider.getCars(this.currentPageGarage, this.maxCarsOnPage);
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage);
    this.view?.updateGarageView(this.carsData, this.currentPageGarage);
  }

  private async updateAppWinners(): Promise<void> {
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage);
    this.view?.updateWinnersView(this.winnersData, this.currentPageWinners);
  }

  private async nextPageGarage(): Promise<void> {
    if (!this.carsData) {
      return;
    }
    const totalPages = Math.ceil(this.carsData.totalCount / this.maxCarsOnPage);
    if (this.currentPageGarage >= totalPages) {
      return;
    }
    this.currentPageGarage += 1;
    this.carsData = await this.dataProvider.getCars(this.currentPageGarage, this.maxCarsOnPage);
    this.view?.updateGarageView(this.carsData, this.currentPageGarage);
  }

  private async prevPageGarage(): Promise<void> {
    if (this.currentPageGarage <= 1) {
      return;
    }
    this.currentPageGarage -= 1;
    this.carsData = await this.dataProvider.getCars(this.currentPageGarage, this.maxCarsOnPage);
    this.view?.updateGarageView(this.carsData, this.currentPageGarage);
  }

  private async nextPageWinners(): Promise<void> {
    if (!this.winnersData) {
      return;
    }
    const totalPages = Math.ceil(this.winnersData.totalCount / this.maxWinnersOnPage);
    if (this.currentPageWinners >= totalPages) {
      return;
    }
    this.currentPageWinners += 1;
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage);
    this.view?.updateWinnersView(this.winnersData, this.currentPageWinners);
  }

  private async prevPageWinners(): Promise<void> {
    if (this.currentPageWinners <= 1) {
      return;
    }
    this.currentPageWinners -= 1;
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage);
    this.view?.updateWinnersView(this.winnersData, this.currentPageWinners);
  }

  private async handleSortWinnersTable(sort: SortWinnersOption, order: OrderWinnersOption): Promise<void> {
    this.winnersData = await this.dataProvider.getWinners(this.currentPageWinners, this.maxWinnersOnPage, sort, order);
    this.view?.updateWinnersView(this.winnersData, this.currentPageWinners);
  }
}
