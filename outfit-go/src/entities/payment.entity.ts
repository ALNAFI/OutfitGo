import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paymentMethod: string; // e.g., 'Credit Card', 'PayPal', 'Cash on Delivery'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column()
  paymentStatus: string; // e.g., 'Paid', 'Pending', 'Failed'

  @ManyToOne(() => Order, (order) => order.payments, { onDelete: 'CASCADE' })
  order: Order;

  @CreateDateColumn()
  paymentDate: Date;
}
