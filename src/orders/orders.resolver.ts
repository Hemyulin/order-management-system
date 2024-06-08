import { Resolver, Query } from '@nestjs/graphql';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';

@Resolver((of) => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query((returns) => [Order])
  orders(): Promise<Order[]> {
    return this.ordersService.findAll();
  }
}
