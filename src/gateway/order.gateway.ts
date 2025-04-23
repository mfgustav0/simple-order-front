import { type Order } from '@/entities/order';
import type { Axios } from 'axios';

export interface OrderGateway {
  withToken(token: string): OrderGateway;

  getAll (): Promise<Order[]>;

  getAllByStatus(status: string): Promise<Order[]>;

  getById(id: string): Promise<Order>;
}

export class OrderGatewayAxios implements OrderGateway {
  private token: string = '';

  constructor (private readonly httpClient: Axios) {}

  withToken (token: string): OrderGateway {
    this.token = token;

    return this;
  }

  async getAll (): Promise<Order[]> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.get('/orders', {
      headers,
    });

    return response.data;
  }

  async getAllByStatus (status: string): Promise<Order[]> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.get(`/orders?status=${status}`, {
      headers,
    });

    return response.data;
  }

  async getById (id: string): Promise<Order> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.get(`/orders/${id}`, {
      headers,
    });

    return response.data as Order;
  }
}
