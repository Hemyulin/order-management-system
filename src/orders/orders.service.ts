import { Injectable } from '@nestjs/common';
import { Order } from './orders.entity';

@Injectable()
export class OrdersService {
  async findAll(): Promise<Order[]> {
    const order = new Order();
    order.id = 1;
    order.currentState = 'OPEN';

    return [order];
  }
}
