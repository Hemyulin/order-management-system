import { Injectable, Inject } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order.repository.interface';
import { Order } from '../models/order.schema';
import { CreateOrderDto, UpdateOrderDto } from '../dto/create-order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @Inject('IOrderRepository')
    private readonly orderRepository: IOrderRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const order: Order = {
      customer: uuidv4(), // Assign a random customer ID
      state: 'OPEN',
      createdAt: new Date(),
      updatedAt: new Date(),
      assignedEmployee: '', // No employee assigned initially
      lineItems: createOrderDto.lineItems,
    };
    return this.orderRepository.create(order);
  }

  async updateOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const { state, ...rest } = updateOrderDto;

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new Error('Order not found');
    }

    // Validate state transition
    const validTransitions = {
      OPEN: ['IN_PROGRESS'],
      IN_PROGRESS: ['COMPLETED'],
    };

    if (state && !validTransitions[order.state].includes(state)) {
      throw new Error('Invalid state transition');
    }

    if (state === 'IN_PROGRESS' && !order.assignedEmployee) {
      rest['assignedEmployee'] = uuidv4(); // Assign a random employee ID
    }

    const updatedOrder = {
      ...order,
      ...rest,
      state: state || order.state,
      updatedAt: new Date(),
    };

    return this.orderRepository.update(id, updatedOrder);
  }

  async transitionOrderState(id: string, newState: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) throw new Error('Order not found');

    // Validate state transition
    const validTransitions = {
      OPEN: ['IN_PROGRESS'],
      IN_PROGRESS: ['COMPLETED'],
    };

    if (!validTransitions[order.state].includes(newState)) {
      throw new Error('Invalid state transition');
    }

    if (newState === 'IN_PROGRESS' && !order.assignedEmployee) {
      order.assignedEmployee = uuidv4(); // Assign a random employee ID
    }

    order.state = newState;
    order.updatedAt = new Date();
    return this.orderRepository.update(id, order);
  }
}
