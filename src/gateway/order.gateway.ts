/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Order } from '@/entities/order';
import type { Axios } from 'axios';

export interface OrderGateway {
  withToken(token: string | null): OrderGateway;

  getAll (): Promise<Order[]>;

  getCurrentOrder(): Promise<Order | null>;

  getAllByStatus(status: string): Promise<Order[]>;

  getById(id: string): Promise<Order>;

  createOrder(input: any): Promise<Order>;

  finish(input: { orderId: string }): Promise<Order>;

  addItem(input: { orderId: string; productId: string; quantity: number }): Promise<{ id: string }>;

  removeItem(input: { orderId: string; itemId: string; }): Promise<void>;
}

export class OrderGatewayAxios implements OrderGateway {
  private token: string | null = '';

  constructor (private readonly httpClient: Axios) {}

  withToken (token: string | null): OrderGateway {
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

  async getCurrentOrder (): Promise<Order | null> {
    const [order] = await this.getAllByStatus('pendent');
    if(!order) {
      return null;
    }

    return order;
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

  async createOrder (input: any): Promise<Order> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.post('/orders', JSON.stringify(input), {
      headers,
    });

    return response.data as Order;
  }

  async finish (input: { orderId: string; }): Promise<Order> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.patch(`/orders/${input.orderId}/finish`, {}, {
      headers,
    });

    return response.data;
  }

  async addItem (input: { orderId: string; productId: string; quantity: number }): Promise<{ id: string }> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.post('/orders-items', JSON.stringify(input), {
      headers,
    });

    return response.data;
  }

  async removeItem (input: { orderId: string; itemId: string; }): Promise<void> {
    const headers: any = {};
    if(this.token) {
      headers['Authorization'] = 'Bearer ' + this.token;
    }

    const response = await this.httpClient.delete(`/orders-items/${input.orderId}/${input.itemId}`, {
      headers,
    });

    return response.data;
  }
}
