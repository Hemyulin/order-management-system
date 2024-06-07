import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order, OrderSchema } from '../models/order.schema';
import { OrderRepository } from '../repositories/order.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  providers: [
    OrderService,
    OrderResolver,
    { provide: 'IOrderRepository', useClass: OrderRepository },
  ],
  exports: [OrderService],
})
export class OrderModule {}
