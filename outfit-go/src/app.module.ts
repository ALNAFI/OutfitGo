import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SupportService } from './support/support.service';
import { SupportModule } from './support/support.module';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [CustomersModule,
    TypeOrmModule.forRoot({
      type: 'postgres', 
      host: 'localhost',
      port: 8778, 
      username: 'postgres', 
      password: 'ALNAFI', 
      database: 'Outfit GO',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductsModule,
    SupportModule,
    ReviewsModule,
    OrdersModule,
    CartModule,],
  controllers: [AppController, ReviewsController],
  providers: [AppService, SupportService, ReviewsService, OrdersService],
})
export class AppModule {}
