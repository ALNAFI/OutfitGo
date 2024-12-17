import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class SupportTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  customerId: number;

  @Column()
  subject: string;

  @Column('text')
  message: string;

  @Column({ default: 'Pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
