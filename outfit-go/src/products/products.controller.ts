import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Post('/create')
  create(@Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.create(data);
  }

  @Patch('update/:id')
  update(@Param('id') id: number, @Body() data: Partial<Product>): Promise<Product> {
    return this.productsService.update(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
  
}
