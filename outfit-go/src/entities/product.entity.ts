import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  brand: string;
  @Column()
  category: string;
  @Column()
  size: string;
  @Column()
  color: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  @Column('int')
  stock: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
