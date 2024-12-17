import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Customer } from './customer.entity';
import { Product } from './product.entity';


@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.cartItems, { onDelete: 'CASCADE' })
  customer: Customer;

  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // Price at the time of adding to the cart
}
