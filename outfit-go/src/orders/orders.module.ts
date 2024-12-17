import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Product } from 'src/entities/product.entity';
import { Customer } from 'src/entities/customer.entity';
import { Order, OrderItem } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem, Payment, Customer, Product]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
