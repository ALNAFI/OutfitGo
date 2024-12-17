import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Customer } from '../entities/customer.entity';
import { CreateReviewDTO } from 'src/DTO/review.dto';
import { Review } from 'src/entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async createReview(data: CreateReviewDTO) {
    const product = await this.productRepository.findOne({ where: { id: data.productId } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${data.productId} not found.`);
    }

    const customer = await this.customerRepository.findOne({ where: { id: data.customerId } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${data.customerId} not found.`);
    }

    const newReview = this.reviewRepository.create({ ...data, product, customer });
    return this.reviewRepository.save(newReview);
  }

  async getReviewsByProduct(productId: number) {
    return this.reviewRepository.find({
      where: { product: { id: productId } },
      relations: ['customer'],
    });
  }

  async deleteReview(id: number) {
    const result = await this.reviewRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
    return { message: 'Review deleted successfully' };
  }
  async updateReview(id: number, updatedData: Partial<Review>) {
    const review = await this.reviewRepository.findOne({ where: { id } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found.`);
    }
  
    if (updatedData.rating) {
      review.rating = updatedData.rating;
    }
    if (updatedData.comment) {
      review.comment = updatedData.comment;
    }
  
    await this.reviewRepository.save(review);
    return { message: 'Review updated successfully!', review };
  }
  async getAverageRating(productId: number) {
    const reviews = await this.reviewRepository.find({
      where: { product: { id: productId } },
    });
  
    if (reviews.length === 0) {
      return { message: 'No reviews found for this product.', averageRating: null };
    }
  
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;
  
    return { message: 'Average rating calculated.', averageRating };
  }
  async getTopRatedProducts(limit: number = 10) {
    return this.reviewRepository
      .createQueryBuilder('review')
      .select('review.productId')
      .addSelect('AVG(review.rating)', 'averageRating')
      .groupBy('review.productId')
      .orderBy('averageRating', 'DESC')
      .limit(limit)
      .getRawMany();
  }
  
  
}
