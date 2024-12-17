import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    // Check if a product with the same name exists
    const exists = await this.productRepository.findOneBy({ name: data.name });
    if (exists) {
      // Throw a ConflictException instead of a generic Error
      throw new ConflictException('Product with this name already exists');
    }
  
    // Create a new product and save it
    const product = this.productRepository.create(data);
    return this.productRepository.save(product);
  }
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }
  async update(id: number, data: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async showAllproducts() {
    const users = await this.productRepository.find();
    return { message: 'All Products are retrieved!', users };
  }


  async searchproducts(query: string) {
    const users = await this.productRepository.find({
      where: [
        { name: Like(`%${query}%`) },  
        { brand: Like(`%${query}%`) }, 
        { category: Like(`%${query}%`) }, 
      ],
    });

    return users.length > 0
      ? { message: 'Matching Products found!', users }
      : { message: 'No matching Products found!', users: [] };
}
}
