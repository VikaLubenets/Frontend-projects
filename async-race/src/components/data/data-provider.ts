import { Endpoint } from 'types';
import type {
  Car,
  Garage,
  GarageResponse,
  EngineStatus,
  StartStopEngineResponse,
  EngineDriveMode,
  WinnersResponse,
  SortWinnersOption,
  OrderWinnersOption,
  Winners,
  Winner,
  UpdatedData,
} from 'types';

export default class DataProvider {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = 'http://localhost:3000';
  }

  async getCars(page?: number, limit?: number): Promise<GarageResponse> {
    let url = `${this.baseUrl}${Endpoint.Garage}`;

    if (page && limit) {
      url += `?_page=${page}&_limit=${limit}`;
    }

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch cars');
      }

      const totalCount = Number(response.headers.get('X-Total-Count'));
      const cars: Garage = await response.json();
      let totalPages;

      if (limit) {
        totalPages = Math.ceil(totalCount / limit);
      }

      return {
        garage: {
          garage: cars,
        },
        totalCount,
        totalPages,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getCar(id: number): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`;

    try {
      const response = await fetch(url);

      if (response.status === 404) {
        throw new Error('There is no such car');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch car');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createCar(name: string, color: string): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}`;
    const data = {
      name,
      color,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create car');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteCar(id: number): Promise<void> {
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete car');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateCar(id: number, name: string, color: string): Promise<Car> {
    const url = `${this.baseUrl}${Endpoint.Garage}/${id}`;
    const data = {
      name,
      color,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        throw new Error('There is no such car');
      }

      if (!response.ok) {
        throw new Error('Failed to update car');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async startStopCarEngine(id: number, status: EngineStatus): Promise<StartStopEngineResponse> {
    const url = `${this.baseUrl}${Endpoint.Engine}?id=${id}&status=${status}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });

      if (response.status === 404) {
        throw new Error('Car with such id was not found in the garage.');
      }

      if (response.status === 400) {
        throw new Error(
          'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
        );
      }

      if (!response.ok) {
        throw new Error('Failed to start or stop engine');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async switchEngineToDriveMode(id: number, status = 'drive'): Promise<EngineDriveMode> {
    const url = `${this.baseUrl}${Endpoint.Engine}?id=${id}&status=${status}`;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
      });

      if (response.status === 404) {
        throw new Error('Car with such id was not found in the garage.');
      }

      if (response.status === 400) {
        throw new Error(
          'Wrong parameters: "id" should be any positive number, "status" should be "started", "stopped" or "drive"'
        );
      }

      if (response.status === 429) {
        throw new Error(
          "Drive already in progress. You can't run drive for the same car twice while it's not stopped."
        );
      }

      if (response.status === 500) {
        throw new Error("Car has been stopped suddenly. It's engine was broken down.");
      }

      if (!response.ok) {
        throw new Error('Failed switch engine to drive mode.');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWinners(
    page?: number,
    limit?: number,
    sort?: SortWinnersOption,
    order?: OrderWinnersOption
  ): Promise<WinnersResponse> {
    let url = `${this.baseUrl}${Endpoint.Winners}`;
    const queryParams = [];

    if (page && limit) {
      queryParams.push(`_page=${page}`);
      queryParams.push(`_limit=${limit}`);
    }

    if (sort && order) {
      queryParams.push(`_sort=${sort}`);
      queryParams.push(`_order=${order}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch winners');
      }

      const totalCount = Number(response.headers.get('X-Total-Count'));
      const winners: Winners = await response.json();
      return {
        winnersData: winners,
        totalCount,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getWinner(id: number): Promise<Winner> {
    const url = `${this.baseUrl}${Endpoint.Winners}/${id}`;

    try {
      const response = await fetch(url);

      if (response.status === 404) {
        throw new Error('There is no such winner');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch winner');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async createWinner(data: Winner): Promise<Winner> {
    const url = `${this.baseUrl}${Endpoint.Winners}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 500) {
        throw new Error('Error: Insert failed, duplicate id');
      }

      if (!response.ok) {
        throw new Error('Failed to create winner');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async deleteWinner(id: number): Promise<void> {
    const url = `${this.baseUrl}${Endpoint.Winners}/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.status === 404) {
        throw new Error('NOT FOUND');
      }

      if (!response.ok) {
        throw new Error('Failed to delete winner');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateWinner(id: number, winsNew: number, timeNew: number): Promise<Winner> {
    const url = `${this.baseUrl}${Endpoint.Winners}/${id}`;
    const data: UpdatedData = {
      wins: winsNew,
      time: timeNew,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        throw new Error('There is no such winner');
      }

      if (!response.ok) {
        throw new Error('Failed to update winner');
      }

      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
