import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/entities/cart.entity';
import { Customer } from 'src/entities/customer.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem) private readonly cartRepository: Repository<CartItem>,
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(customerId: number, productId: number, quantity: number) {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) throw new NotFoundException(`Customer not found`);

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException(`Product not found`);

    // Check if the product is already in the cart
    let cartItem = await this.cartRepository.findOne({
      where: { customer: { id: customerId }, product: { id: productId } },
    });

    if (cartItem) {
      // Update quantity if already exists
      cartItem.quantity += quantity;
    } else {
      // Add new product to cart
      cartItem = this.cartRepository.create({
        customer,
        product,
        quantity,
        price: product.price,
      });
    }

    await this.cartRepository.save(cartItem);
    return { message: 'Product added to cart successfully', cartItem };
  }

  async viewCart(customerId: number) {
    const cartItems = await this.cartRepository.find({
      where: { customer: { id: customerId } },
    });
    return { message: 'Cart retrieved successfully', cartItems };
  }

  async removeFromCart(cartItemId: number) {
    const result = await this.cartRepository.delete(cartItemId);
    if (result.affected === 0) throw new NotFoundException(`Cart item not found`);
    return { message: 'Cart item removed successfully' };
  }

  async clearCart(customerId: number) {
    await this.cartRepository.delete({ customer: { id: customerId } });
    return { message: 'Cart cleared successfully' };
  }
}
