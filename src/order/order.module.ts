// user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './order.service';
import { UserResolver } from './order.resolver';
import { userProviders } from './order.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [OrderService, OrderResolver, ...OrderProviders],
  exports: [OrderService],
})
export class UserModule {}
