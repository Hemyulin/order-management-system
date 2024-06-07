import { Order } from '../models/order.schema';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
  findById(id: string): Promise<Order>;
  findAll(): Promise<Order[]>; // Ensure this method is included in the interface
  update(id: string, order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<void>;
}
