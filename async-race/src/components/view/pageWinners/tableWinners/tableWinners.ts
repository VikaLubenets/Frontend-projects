import type EventEmitter from 'events';
import { TableColName } from 'types';
import type { Garage, TableRow, Winners, Car, OrderWinnersOption, SortWinnersOption } from 'types';
import renderCarIcon from '../../garagePage/car/helpers/renderCarIcon';
import './tableWinners.css';

export default class TableWinner {
  carData: Garage;

  winnersData: Winners;

  emitter: EventEmitter;

  element: HTMLElement | null;

  sortColumn: SortWinnersOption;

  sortDirection: OrderWinnersOption;

  constructor(garageData: Garage, winners: Winners, emitter: EventEmitter) {
    this.carData = garageData;
    this.winnersData = winners;
    this.emitter = emitter;
    this.element = this.drawTable();
    this.sortDirection = 'ASC';
    this.sortColumn = 'wins';
  }

  drawTable(): HTMLElement {
    const table = document.createElement('table');
    table.classList.add('table-winners');
    const dataTable: TableRow[] = this.getWinnersDataForTable();

    const headerRow = this.drawTableHeader(dataTable[0]);
    table.append(headerRow);

    dataTable.forEach((item) => {
      const row = this.drawTableContent(item);
      table.append(row);
    });

    return table;
  }

  updateTable(): void {
    const table = document.querySelector('table');

    if (table !== null) {
      const dataTable: TableRow[] = this.getWinnersDataForTable();

      while (table.rows.length > 1) {
        table.deleteRow(1);
      }

      dataTable.forEach((item) => {
        const row = this.drawTableContent(item);
        table.append(row);
      });
    }
  }

  updateDataTable(carsData: Garage, winners: Winners): void {
    this.carData = carsData;
    this.winnersData = winners;
  }

  getElement(): HTMLElement | undefined {
    if (this.element !== null) {
      return this.element;
    }
    return undefined;
  }

  handleSortClick(colName: TableColName, colHeader: HTMLTableCellElement): void {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';

    if (colName === 'Wins') {
      this.sortColumn = 'wins';
    } else {
      this.sortColumn = 'time';
    }

    if (this.sortDirection === 'ASC') {
      colHeader.classList.remove('down-arrow');
      colHeader.classList.add('up-arrow');
    } else if (this.sortDirection === 'DESC') {
      colHeader.classList.remove('up-arrow');
      colHeader.classList.add('down-arrow');
    }

    this.emitter.emit('handleSortTableClicked', this.sortColumn, this.sortDirection);
  }

  private drawTableHeader(item: TableRow): HTMLElement {
    const headerRow = document.createElement('tr');

    Object.keys(item).forEach((key) => {
      const th = document.createElement('th');
      th.textContent = TableColName[key as keyof TableRow];

      if (
        TableColName[key as keyof TableRow] === 'Wins' ||
        TableColName[key as keyof TableRow] === 'Best time (seconds)'
      ) {
        th.addEventListener('click', () => {
          this.handleSortClick(TableColName[key as keyof TableRow], th);
          console.log('sort is clicked');
        });
      }

      headerRow.append(th);
    });

    return headerRow;
  }

  private drawTableContent(item: TableRow): HTMLElement {
    const row = document.createElement('tr');

    (Object.keys(item) as Array<keyof TableRow>).forEach((key) => {
      const td = document.createElement('td');

      if (key === 'car') {
        td.appendChild(item[key] as SVGElement);
      } else {
        td.textContent = item[key];
      }

      row.append(td);
    });

    return row;
  }

  private getCarNameById(id: number): string {
    const car = this.carData.find((carEl) => carEl.id === id);
    return car?.name ?? '';
  }

  private getCarforSVG(id: number): Car | undefined {
    return this.carData.find((car) => car.id === id);
  }

  private getWinnersDataForTable(): TableRow[] {
    const carElements: SVGElement[] = [];

    this.winnersData.forEach((winner) => {
      const car = this.getCarforSVG(winner.id);

      if (car) {
        const carElement = renderCarIcon(car.color, car.id);

        if (carElement) {
          carElements.push(carElement);
        }
      }
    });

    return this.winnersData.map((winner, index) => {
      const carElement = carElements[index] ?? null;
      return {
        number: (index + 1).toString(),
        car: carElement ?? '',
        name: this.getCarNameById(winner.id),
        wins: winner.wins.toString(),
        bestTime: winner.time.toString(),
      };
    });
  }
}
