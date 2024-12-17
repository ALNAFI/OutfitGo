import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from '../entities/review.entity';
import { Product } from '../entities/product.entity';
import { Customer } from '../entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, Product, Customer])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [TypeOrmModule],
})
export class ReviewsModule {}
