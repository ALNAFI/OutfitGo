import { Controller, Post, Body, Param, Get, Delete, Patch, Query } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDTO } from 'src/DTO/review.dto';
import { Review } from 'src/entities/review.entity';
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post('/reviewCreate')
  async createReview(@Body() data: CreateReviewDTO) {
    return this.reviewsService.createReview(data);
  }

  @Get('/reviewProduct/:productId')
  async getReviewsByProduct(@Param('productId') productId: number) {
    return this.reviewsService.getReviewsByProduct(productId);
  }

  @Delete('/reviewDelete/:id')
  async deleteReview(@Param('id') id: number) {
    return this.reviewsService.deleteReview(id);
  }
  @Patch('/reviewUpdate/:id')
  async updateReview(@Param('id') id: number, @Body() updatedData: Partial<Review>) {
  return this.reviewsService.updateReview(id, updatedData);
}
@Get('/product/averageRating/:productId')
async getAverageRating(@Param('productId') productId: number) {
  return this.reviewsService.getAverageRating(productId);
}
@Get('/products/topRated')
async getTopRatedProducts(@Query('limit') limit: number) {
  return this.reviewsService.getTopRatedProducts(limit);
}

}
