import { IsNotEmpty, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateReviewDTO {
  @IsInt()
  @IsNotEmpty()
  customerId: number;

  @IsInt()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
