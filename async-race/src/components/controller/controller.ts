import CarAnimation from 'components/view/garagePage/car/carAnimation/carAnimation';
import WinModal from 'components/view/garagePage/winModal/winModal';
import type EventEmitter from 'events';
import type { EngineStartStatus, EngineStopStatus, Winner } from 'types';
import type DataProvider from 'components/data/data-provider';
import { firstPartOfGeneratedCarName, secondPartOfGeneratedCarName } from 'components/data/constants';

export default class Controller {
  emitter: EventEmitter;

  dataProvider: DataProvider;

  selectedCarId: number | null;

  animatedCars: Record<number, CarAnimation | undefined>;

  constructor(dataProvider: DataProvider, emitter: EventEmitter) {
    this.emitter = emitter;
    this.dataProvider = dataProvider;
    this.selectedCarId = null;
    this.animatedCars = {};
    this.emitter.on('createCarClicked', this.handleCreateCar.bind(this));
    this.emitter.on('removeCarClicked', this.handleRemoveCar.bind(this));
    this.emitter.on('selectCarClicked', this.handleSelectCar.bind(this));
    this.emitter.on('updateCarClicked', this.handleUpdateCar.bind(this));
    this.emitter.on('generateCarsButtonClicked', this.handleGenerateCars.bind(this));
    this.emitter.on('startEngineClicked', this.handleStartEngine.bind(this));
    this.emitter.on('stopEngineClicked', this.handleStopEngine.bind(this));
    this.emitter.on('raceButtonClicked', this.handleRace.bind(this));
    this.emitter.on('resetButtonClicked', this.handleReset.bind(this));
  }

  async handleCreateCar(name: string, color: string): Promise<void> {
    try {
      await this.dataProvider.createCar(name, color);

      const createInput: HTMLInputElement | null = document.querySelector('.car-input');
      const colorInput: HTMLInputElement | null = document.querySelector('.color-car');

      if (createInput !== null) {
        createInput.value = '';
      }

      if (colorInput !== null) {
        colorInput.value = 'white';
      }

      this.emitter.emit('dataCarsUpdated');
    } catch (error) {
      console.error('Failed to create car:', error);
    }
  }

  async handleRemoveCar(id: number): Promise<void> {
    try {
      const winners = await this.dataProvider.getWinners();
      const winner = winners.winnersData.find((car) => car.id === id);

      if (winner) {
        await this.dataProvider.deleteWinner(winner.id);
      }

      await this.dataProvider.deleteCar(id);
      this.emitter.emit('dataCarsUpdated');
      this.emitter.emit('dataWinnerUpdated');
    } catch (error) {
      console.error('Failed to delete car:', error);
    }
  }

  async handleSelectCar(id: number): Promise<void> {
    try {
      const data = await this.dataProvider.getCar(id);
      const updateInput: HTMLInputElement | null = document.querySelector('.update-input');
      const colorInput: HTMLInputElement | null = document.querySelector('.color-car-update');

      if (updateInput) {
        updateInput.value = data.name;
      }

      if (colorInput) {
        colorInput.value = data.color;
      }

      this.selectedCarId = data.id;
    } catch (error) {
      console.error('Failed to select car:', error);
    }
  }

  async handleUpdateCar(name: string, color: string): Promise<void> {
    if (!this.selectedCarId) {
      console.error('No car selected');
      return;
    }

    try {
      await this.dataProvider.updateCar(this.selectedCarId, name, color);
      const updateInput: HTMLInputElement | null = document.querySelector('.update-input');
      const colorInput: HTMLInputElement | null = document.querySelector('.color-car-update');

      if (updateInput) {
        updateInput.value = '';
      }

      if (colorInput) {
        colorInput.value = 'white';
      }

      this.emitter.emit('dataCarsUpdated');
      this.emitter.emit('dataWinnerUpdated');
    } catch (error) {
      console.error('Failed to update car:', error);
    }
  }

  handleGenerateCars(): void {
    const generateRandomName = (): string => {
      const randomNumFirst = Math.floor(Math.random() * firstPartOfGeneratedCarName.length);
      const randomNumSecond = Math.floor(Math.random() * secondPartOfGeneratedCarName.length);

      return `${firstPartOfGeneratedCarName[randomNumFirst]} ${secondPartOfGeneratedCarName[randomNumSecond]}`;
    };

    const generateRandomColor = (): string => {
      const letters = '0123456789ABCDEF';
      let color = '#';

      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }

      return color;
    };

    const generateRandomCar = (): { name: string; color: string } => {
      return {
        name: generateRandomName(),
        color: generateRandomColor(),
      };
    };

    let neededCarsNum = 100;

    while (neededCarsNum > 0) {
      const generatedCar = generateRandomCar();
      this.handleCreateCar(generatedCar.name, generatedCar.color);
      neededCarsNum -= 1;
    }
  }

  async handleStartEngine(id: number, status: EngineStartStatus): Promise<void> {
    try {
      const response = await this.dataProvider.startStopCarEngine(id, status);

      const animatedCar = new CarAnimation(id, this.emitter, response.velocity, response.distance);
      this.animatedCars[id] = animatedCar;
      animatedCar.animateCar();

      await this.dataProvider.switchEngineToDriveMode(id);
    } catch (error) {
      console.error('Failed to start car engine:', error);

      if (error instanceof Error && error.message === "Car has been stopped suddenly. It's engine was broken down.") {
        const animatedCar = this.animatedCars[id];
        animatedCar?.stopCarAfterEngineBroken();
      }
    }
  }

  async handleStopEngine(id: number, status: EngineStopStatus): Promise<void> {
    try {
      await this.dataProvider.startStopCarEngine(id, status);
      const animatedCar = this.animatedCars[id];
      animatedCar?.resetCarPosition();
    } catch (error) {
      console.error('Failed to stop car engine:', error);
    }
  }

  async handleRace(): Promise<void> {
    try {
      const allCars = await this.dataProvider.getCars();
      this.emitter.once('carAnimationEnds', this.handleWinRace.bind(this));

      allCars.garage.garage.forEach((car) => {
        this.handleStartEngine(car.id, 'started');
      });
    } catch (error) {
      console.error('Failed to start race:', error);
    }
  }

  async handleReset(): Promise<void> {
    try {
      const allCars = await this.dataProvider.getCars();

      allCars.garage.garage.forEach((car) => {
        this.handleStopEngine(car.id, 'stopped');
      });
    } catch (error) {
      console.error('Failed to start race:', error);
    }
  }

  async handleWinRace(id: number, time: number): Promise<void> {
    try {
      const car = await this.dataProvider.getCar(id);
      const carName = car.name;
      const winModal = new WinModal();
      winModal.draw(carName, time);

      const winners = await this.dataProvider.getWinners();
      const existingWinner = winners.winnersData.find((winner) => winner.id === id);

      if (existingWinner) {
        const bestTime = time >= existingWinner.time ? existingWinner.time : time;
        await this.dataProvider.updateWinner(id, existingWinner.wins + 1, bestTime);
      } else {
        const winner: Winner = {
          wins: 1,
          time,
          id,
        };
        await this.dataProvider.createWinner(winner);
        this.emitter.emit('dataWinnerUpdated');
      }
    } catch (error) {
      console.error('Failed to handle race win:', error);
    }
  }
}
