import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dto/create-order.dto';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Query(() => [Order])
  async orders() {
    return this.orderService.findAll();
  }

  @Mutation(() => Order)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderDto,
  ) {
    return this.orderService.createOrder(createOrderInput);
  }

  @Mutation(() => Order)
  async updateOrder(
    @Args('updateOrderInput') updateOrderInput: UpdateOrderDto,
  ) {
    return this.orderService.updateOrder(updateOrderInput.id, updateOrderInput);
  }

  @Mutation(() => Order)
  async transitionOrderState(
    @Args('id') id: string,
    @Args('newState') newState: string,
  ) {
    return this.orderService.transitionOrderState(id, newState);
  }
}
