import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Customer } from '../entities/customer.entity';
  import { Product } from '../entities/product.entity';
  
  @Entity()
  export class Review {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    rating: number;
  
    @Column()
    comment: string;
  
    @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: 'CASCADE' })
    customer: Customer;
  
    @ManyToOne(() => Product, (product) => product.id, { onDelete: 'CASCADE' })
    product: Product;
    @Column({ type: 'float', default: 0 }) 
    averagerating: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  