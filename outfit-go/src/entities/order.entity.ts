import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, JoinColumn } from 'typeorm';
import { Customer } from './customer.entity';

import { Payment } from './payment.entity';
import { OrderItem } from './orderItems.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

  @Column({ default: 'Pending' })
  orderStatus: string;

  @Column()
  paymentMethod: string;

  @Column()
  shippingAddress: string;

  @OneToMany(() => Payment, (payment) => payment.order, { cascade: true })
  payments: Payment[];
}
export { OrderItem };

