import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { CartItem } from './cart.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  @Column()
  confirmPassword:string;

 @Column()
  adress:string

  @CreateDateColumn()
  joinedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
  @OneToMany(() => CartItem, (cartItem) => cartItem.customer, { cascade: true })
  cartItems: CartItem[];
  
  @Column({ default: true })
  isActive: boolean;
}
