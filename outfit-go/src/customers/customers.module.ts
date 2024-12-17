import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../entities/customer.entity';
import { ProductsModule } from 'src/products/products.module';


@Module({
  imports: [TypeOrmModule.forFeature([Customer]),ProductsModule],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
