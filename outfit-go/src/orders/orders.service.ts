import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDTO } from 'src/DTO/order.dto';
import { Customer } from 'src/entities/customer.entity';
import { Order, OrderItem } from 'src/entities/order.entity';
import { Payment } from 'src/entities/payment.entity';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Payment) private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async placeOrder(createOrderDTO: CreateOrderDTO) {
    const { customerId, items, paymentMethod, shippingAddress } = createOrderDTO;

    // Find customer
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    // Calculate total amount and prepare order items
    let totalAmount = 0;
    const orderItems: OrderItem[] = [];
    for (const item of items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.name}`);
      }

      // Deduct stock
      product.stock -= item.quantity;
      await this.productRepository.save(product);

      const orderItem = this.orderItemRepository.create({
        product,
        quantity: item.quantity,
        price: product.price,
      });
      orderItems.push(orderItem);

      totalAmount += product.price * item.quantity;
    }

    // Create and save order
    const order = this.orderRepository.create({
      customer,
      items: orderItems,
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    await this.orderRepository.save(order);

    return { message: 'Order placed successfully', order };
  }
  async placeOrde(customerId: number, items: { productId: number; quantity: number }[], paymentMethod: string) {
    const customer = await this.customerRepository.findOne({ where: { id: customerId } });
    if (!customer) throw new NotFoundException(`Customer not found`);

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    // Create order items and calculate total amount
    for (const item of items) {
      const product = await this.productRepository.findOne({ where: { id: item.productId } });
      if (!product) throw new NotFoundException(`Product with ID ${item.productId} not found`);

      const orderItem = this.orderItemRepository.create({
        product,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
      orderItems.push(orderItem);
    }

    // Save order
    const order = this.orderRepository.create({
      customer,
      items: orderItems,
      totalAmount,
      orderStatus: 'Pending',
    });

    await this.orderRepository.save(order);

    // Record payment
    const payment = this.paymentRepository.create({
      order,
      paymentMethod,
      amount: totalAmount,
      paymentStatus: 'Paid',
    });

    await this.paymentRepository.save(payment);

    return { message: 'Order placed successfully!', orderId: order.id, totalAmount };
  }
  
}
