import type { Order } from '@/entities/order';
import type { OrderGateway } from '@/gateway/order.gateway';

export class CreateOrder {
  constructor (private readonly orderGateway: OrderGateway) {}

  async execute (): Promise<Order> {
    const currentOrder = await this.orderGateway.getCurrentOrder();

    if(currentOrder) {
      return currentOrder;
    }

    const orderCreated = await this.orderGateway.createOrder({
      date: new Date(),
    });

    return orderCreated;
  }
}
