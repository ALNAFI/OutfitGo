import { IsNotEmpty, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class CreateOrderDTO {
  @IsNumber()
  @IsNotEmpty()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];

  @Column({ nullable: false })
  paymentMethod: string;
  

  @IsNotEmpty()
  shippingAddress: string; // Optional: Add if needed
}

export class OrderItemDTO {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
